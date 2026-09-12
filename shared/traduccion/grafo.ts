import { GuardiaPreEnvio, UMBRAL_DERIVA_POR_DEFECTO } from './guardia';
import type { LenguaClave } from './lenguas';
import { PERFIL_NEUTRO, type PerfilIdiolectal } from './perfil';
import type { CandidatoTraduccion } from './tipos';

/** Vectoriza un texto. La implementación real vive en el servidor, nunca en `src/`. */
export type FuncionEmbedding = (texto: string) => Promise<readonly number[]> | readonly number[];

/** Produce un borrador de traducción. Igual: la llamada al modelo vive en el servidor. */
export type FuncionTraduccion = (
  textoFuente: string,
  instruccionDeEstilo: string,
  opciones: { temperatura: number },
) => Promise<string> | string;

export interface EntradaGrafo {
  textoFuente: string;
  lengua: Exclude<LenguaClave, 'es'>;
  embed: FuncionEmbedding;
  traducir: FuncionTraduccion;
  /** Clave del léxico a la que aspira el candidato, si se está preparando una. */
  clave?: string;
  perfil?: PerfilIdiolectal;
}

const INSTRUCCION_LITERAL = 'Traducción literal estricta, sin agregados ni paráfrasis.';

/**
 * Grafo de traducción a lengua originaria.
 *
 * Orquesta: inyección de estilo → borrador → vectorización → filtro de
 * deriva → repliegue literal. Es la herramienta con la que se **preparan**
 * candidatos para que un hablante los revise; no es un camino de publicación.
 *
 * Dos decisiones deliberadas:
 *
 * - `embed` y `traducir` se inyectan. Así este archivo no crea ningún cliente
 *   de IA y puede vivir en `shared/`, importable desde el navegador sin violar
 *   la regla dura 2 del proyecto (ninguna llave viaja al cliente).
 * - `aptoParaPublicacion` es del tipo `false`, no `boolean`. El compilador
 *   impide que alguien, más adelante, haga que una salida de máquina se
 *   publique sola. Los modelos de hoy no tienen competencia demostrada en
 *   náayeri ni en wixárika: la similitud coseno detecta que un borrador se
 *   fue por otro lado, no que esté bien dicho.
 */
export class GrafoTraduccionNativa {
  readonly guardia: GuardiaPreEnvio;

  constructor(umbralDeriva: number = UMBRAL_DERIVA_POR_DEFECTO) {
    this.guardia = new GuardiaPreEnvio(umbralDeriva);
  }

  async ejecutar({
    textoFuente,
    lengua,
    embed,
    traducir,
    clave,
    perfil = PERFIL_NEUTRO,
  }: EntradaGrafo): Promise<CandidatoTraduccion> {
    const fuente = textoFuente.trim();
    if (!fuente) throw new Error('TEXTO_FUENTE_VACIO');

    const razones: string[] = [];

    // 1 · Inyección de contexto estilístico y acústico
    const instruccionDeEstilo = perfil.aContextoDePrompt();

    // 2 · Borrador con estilo
    const borrador = (await traducir(fuente, instruccionDeEstilo, { temperatura: 0.1 })).trim();
    if (!borrador) razones.push('BORRADOR_VACIO');

    // 3 · Vectorización y 4 · filtro de deriva previo al envío
    const medicion = borrador ? await this.medir(embed, fuente, borrador) : undefined;
    if (medicion) razones.push(...medicion.razones);
    else if (borrador) razones.push('DERIVA_NO_MEDIBLE');

    const borradorAprobado = medicion?.aprueba === true;

    if (borradorAprobado) {
      return this.candidato({
        clave,
        lengua,
        fuente,
        salida: borrador,
        similitud: medicion?.similitud,
        aprobó: true,
        replegado: false,
        razones,
      });
    }

    // 5 · Repliegue: decodificación literal estricta, sin estilo ni temperatura
    const literal = (await traducir(fuente, INSTRUCCION_LITERAL, { temperatura: 0 })).trim();
    razones.push('REPLIEGUE_A_TRADUCCION_LITERAL');
    if (!literal) {
      razones.push('REPLIEGUE_VACIO');
      return this.candidato({
        clave,
        lengua,
        fuente,
        salida: '',
        similitud: undefined,
        aprobó: false,
        replegado: true,
        razones,
      });
    }

    const medicionLiteral = await this.medir(embed, fuente, literal);
    if (medicionLiteral) razones.push(...medicionLiteral.razones.map((r) => `LITERAL_${r}`));
    else razones.push('LITERAL_DERIVA_NO_MEDIBLE');

    return this.candidato({
      clave,
      lengua,
      fuente,
      salida: literal,
      similitud: medicionLiteral?.similitud,
      aprobó: medicionLiteral?.aprueba === true,
      replegado: true,
      razones,
    });
  }

  /** Mide la deriva. Un fallo del vectorizador nunca aprueba: devuelve `undefined`. */
  private async medir(
    embed: FuncionEmbedding,
    fuente: string,
    salida: string,
  ): Promise<{ similitud: number; aprueba: boolean; razones: string[] } | undefined> {
    try {
      const [vectorFuente, vectorSalida] = await Promise.all([embed(fuente), embed(salida)]);
      return this.guardia.medirDeriva(vectorFuente, vectorSalida);
    } catch {
      return undefined;
    }
  }

  private candidato(datos: {
    clave?: string;
    lengua: Exclude<LenguaClave, 'es'>;
    fuente: string;
    salida: string;
    similitud?: number;
    aprobó: boolean;
    replegado: boolean;
    razones: string[];
  }): CandidatoTraduccion {
    return {
      clave: datos.clave,
      lengua: datos.lengua,
      textoFuente: datos.fuente,
      textoSalida: datos.salida,
      similitud: datos.similitud,
      aprobóFiltroDeriva: datos.aprobó,
      replegado: datos.replegado,
      // Invariante del subsistema: ninguna salida de máquina se publica sola.
      aptoParaPublicacion: false,
      estadoPropuesto: 'POR_VERIFICAR',
      razones: datos.razones,
    };
  }
}
