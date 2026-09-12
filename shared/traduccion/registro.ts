import { GUARDIA_POR_DEFECTO, GuardiaPreEnvio } from './guardia';
import { LEXICO_INTERFAZ } from './lexico';
import { type LenguaClave, LENGUAS } from './lenguas';
import {
  REGISTRO_TRADUCCION_VERSION,
  type EntradaLexica,
  type TextoResuelto,
  type UnidadTraducida,
} from './tipos';

const PLACEHOLDER = /\{([a-zA-Z0-9_]+)\}/g;

export interface ResultadoValidacionRegistro {
  valid: boolean;
  errors: string[];
}

function marcadores(texto: string): Set<string> {
  const encontrados = new Set<string>();
  for (const coincidencia of texto.matchAll(PLACEHOLDER)) encontrados.add(coincidencia[1]);
  return encontrados;
}

/**
 * Validación estructural del léxico. Corre al importar el módulo y revienta
 * el arranque si algo está mal: un registro que miente sobre su propio
 * estatus es peor que no tener registro.
 */
export function validarRegistroTraduccion(
  entradas: readonly EntradaLexica[] = LEXICO_INTERFAZ,
): ResultadoValidacionRegistro {
  const errors: string[] = [];
  const claves = new Set<string>();
  const clavesDeLengua = new Set(
    LENGUAS.filter((lengua) => lengua.clave !== 'es').map((lengua) => lengua.clave),
  );

  for (const entrada of entradas) {
    if (!entrada.clave.trim()) errors.push('CLAVE_REQUERIDA');
    if (claves.has(entrada.clave)) errors.push(`CLAVE_DUPLICADA:${entrada.clave}`);
    claves.add(entrada.clave);

    if (!entrada.es.trim()) errors.push(`ESPANOL_REQUERIDO:${entrada.clave}`);
    if (!entrada.glosa.trim()) errors.push(`GLOSA_REQUERIDA:${entrada.clave}`);

    const marcadoresBase = marcadores(entrada.es);

    for (const [lengua, unidad] of Object.entries(entrada.traducciones) as Array<
      [LenguaClave, UnidadTraducida]
    >) {
      if (!clavesDeLengua.has(lengua as Exclude<LenguaClave, 'es'>)) {
        errors.push(`LENGUA_NO_REGISTRADA:${entrada.clave}:${lengua}`);
      }
      if (!unidad.texto.trim()) errors.push(`TEXTO_VACIO:${entrada.clave}:${lengua}`);
      if (!unidad.fuente.trim()) errors.push(`FUENTE_REQUERIDA:${entrada.clave}:${lengua}`);

      // Solo un hablante o un documento identificable pueden verificar; una
      // máquina o una cadena sin autor jamás alcanzan estatus VERIFICADO.
      if (unidad.estado === 'VERIFICADO') {
        if (unidad.origen === 'MAQUINA' || unidad.origen === 'SIN_TRAZABILIDAD') {
          errors.push(`VERIFICADO_SIN_REVISION_HUMANA:${entrada.clave}:${lengua}`);
        }
        if (!unidad.revisadoEn) {
          errors.push(`VERIFICADO_SIN_FECHA:${entrada.clave}:${lengua}`);
        }
      }

      // Rechazar sin dejar constancia sería borrar en silencio. Aquí se
      // corrige con motivo y fecha, como las actas.
      if (unidad.estado === 'RECHAZADO' && !unidad.revisadoEn) {
        errors.push(`RECHAZADO_SIN_FECHA:${entrada.clave}:${lengua}`);
      }

      // Un marcador inventado se pintaría literal en pantalla ("{monto}").
      for (const marcador of marcadores(unidad.texto)) {
        if (!marcadoresBase.has(marcador)) {
          errors.push(`MARCADOR_DESCONOCIDO:${entrada.clave}:${lengua}:${marcador}`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export const SALUD_REGISTRO_TRADUCCION = validarRegistroTraduccion();

if (!SALUD_REGISTRO_TRADUCCION.valid) {
  throw new Error(
    `REGISTRO_TRADUCCION_INVALIDO:${SALUD_REGISTRO_TRADUCCION.errors.join(',')}`,
  );
}

export function getEntradasLexicas(): readonly EntradaLexica[] {
  return LEXICO_INTERFAZ;
}

export function buscarEntradaLexica(clave: string): EntradaLexica | undefined {
  return LEXICO_INTERFAZ.find((entrada) => entrada.clave === clave);
}

export function interpolar(plantilla: string, valores: Record<string, string> = {}): string {
  return plantilla.replace(PLACEHOLDER, (_coincidencia, clave: string) =>
    valores[clave] ?? `{${clave}}`,
  );
}

export interface OpcionesResolucion {
  valores?: Record<string, string>;
  guardia?: GuardiaPreEnvio;
}

/**
 * Punto de entrada de la interfaz: dado una clave y la lengua elegida,
 * devuelve el texto que se debe pintar, en qué lengua quedó realmente y si
 * hay que acompañarlo de una etiqueta.
 *
 * El repliegue a español nunca es un error silencioso: viaja en
 * `lenguaEfectiva` y en `razones` para que la interfaz pueda decirlo.
 */
export function resolverTexto(
  clave: string,
  lengua: LenguaClave,
  opciones: OpcionesResolucion = {},
): TextoResuelto {
  const { valores, guardia = GUARDIA_POR_DEFECTO } = opciones;
  const entrada = buscarEntradaLexica(clave);

  if (!entrada) {
    return {
      texto: clave,
      lenguaEfectiva: 'es',
      lenguaSolicitada: lengua,
      estado: 'RECHAZADO',
      origen: 'SIN_TRAZABILIDAD',
      decision: 'RETENER',
      razones: [`CLAVE_INEXISTENTE:${clave}`],
    };
  }

  const enEspanol = (razones: string[]): TextoResuelto => ({
    texto: interpolar(entrada.es, valores),
    lenguaEfectiva: 'es',
    lenguaSolicitada: lengua,
    estado: 'VERIFICADO',
    origen: 'FUENTE_DOCUMENTAL',
    decision: 'PUBLICAR',
    razones,
  });

  if (lengua === 'es') return enEspanol(['LENGUA_BASE']);

  const unidad = entrada.traducciones[lengua];
  const veredicto = guardia.evaluarPublicacion(unidad);

  if (veredicto.decision === 'RETENER' || !unidad) {
    return enEspanol(['REPLIEGUE_A_ESPANOL', ...veredicto.razones]);
  }

  return {
    texto: interpolar(unidad.texto, valores),
    lenguaEfectiva: lengua,
    lenguaSolicitada: lengua,
    estado: unidad.estado,
    origen: unidad.origen,
    decision: veredicto.decision,
    etiqueta: veredicto.etiqueta,
    razones: veredicto.razones,
  };
}

export interface CoberturaLengua {
  lengua: Exclude<LenguaClave, 'es'>;
  total: number;
  verificadas: number;
  porVerificar: number;
  rechazadas: number;
  sinTraduccion: number;
}

/**
 * Cobertura real por lengua. Es el dato que la interfaz y la documentación
 * deben citar en vez de afirmar que "la plataforma opera en tres lenguas".
 */
export function coberturaPorLengua(
  entradas: readonly EntradaLexica[] = LEXICO_INTERFAZ,
): CoberturaLengua[] {
  return LENGUAS.filter((lengua) => lengua.clave !== 'es').map((lengua) => {
    const clave = lengua.clave as Exclude<LenguaClave, 'es'>;
    const unidades = entradas.map((entrada) => entrada.traducciones[clave]);
    return {
      lengua: clave,
      total: entradas.length,
      verificadas: unidades.filter((unidad) => unidad?.estado === 'VERIFICADO').length,
      porVerificar: unidades.filter((unidad) => unidad?.estado === 'POR_VERIFICAR').length,
      rechazadas: unidades.filter((unidad) => unidad?.estado === 'RECHAZADO').length,
      sinTraduccion: unidades.filter((unidad) => !unidad).length,
    };
  });
}

export { REGISTRO_TRADUCCION_VERSION };
