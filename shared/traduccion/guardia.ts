import type {
  DecisionGuardia,
  EstadoTraduccion,
  ResultadoGuardia,
  UnidadTraducida,
} from './tipos';

/**
 * Umbral de deriva semántica por defecto. Por debajo de esta similitud coseno
 * entre el vector del texto fuente y el del borrador, la traducción se trata
 * como alucinación y se descarta el borrador.
 */
export const UMBRAL_DERIVA_POR_DEFECTO = 0.85;

export const ETIQUETA_SIN_VERIFICAR = 'SIN VERIFICAR';

export interface MedicionDeriva {
  similitud: number;
  aprueba: boolean;
  razones: string[];
}

/**
 * Similitud coseno entre dos vectores de la misma dimensión.
 * Devuelve 0 —no lanza— cuando algún vector es nulo o degenerado: un
 * embedding vacío no puede "aprobar" nada por accidente.
 */
export function similitudCoseno(a: readonly number[], b: readonly number[]): number {
  if (a.length === 0 || a.length !== b.length) return 0;

  let producto = 0;
  let normaA = 0;
  let normaB = 0;
  for (let i = 0; i < a.length; i += 1) {
    producto += a[i] * b[i];
    normaA += a[i] * a[i];
    normaB += b[i] * b[i];
  }

  const denominador = Math.sqrt(normaA) * Math.sqrt(normaB);
  if (!Number.isFinite(denominador) || denominador === 0) return 0;

  const similitud = producto / denominador;
  return Number.isFinite(similitud) ? similitud : 0;
}

/**
 * Guardia previa al envío.
 *
 * Tiene dos competencias que **no se mezclan**, y esa separación es la regla
 * dura del subsistema:
 *
 * 1. `medirDeriva` — heurística. Compara vectores y detecta que un borrador
 *    de máquina se fue por otro lado. Puede equivocarse.
 * 2. `evaluarPublicacion` — política. Decide si un texto se le muestra a un
 *    ciudadano. Es determinística, depende **solo** del estatus declarado en
 *    el registro y jamás recibe un embedding ni una salida de modelo.
 *
 * Consecuencia: un puntaje de similitud alto nunca convierte una traducción
 * en publicable. Solo un hablante identificable, asentado en el registro,
 * puede hacerlo. Es el mismo principio que en `contextos/`: la política es
 * determinística y ningún LLM la decide.
 */
export class GuardiaPreEnvio {
  readonly umbralDeriva: number;

  constructor(umbralDeriva: number = UMBRAL_DERIVA_POR_DEFECTO) {
    if (!Number.isFinite(umbralDeriva) || umbralDeriva <= 0 || umbralDeriva > 1) {
      throw new Error(`UMBRAL_DERIVA_INVALIDO:${umbralDeriva}`);
    }
    this.umbralDeriva = umbralDeriva;
  }

  medirDeriva(
    vectorFuente: readonly number[],
    vectorSalida: readonly number[],
  ): MedicionDeriva {
    const similitud = similitudCoseno(vectorFuente, vectorSalida);
    const aprueba = similitud >= this.umbralDeriva;
    return {
      similitud,
      aprueba,
      razones: aprueba
        ? ['DERIVA_SEMANTICA_DENTRO_DE_UMBRAL']
        : ['DERIVA_SEMANTICA_FUERA_DE_UMBRAL'],
    };
  }

  /**
   * Política de publicación. Recibe la unidad tal como está registrada
   * (o `undefined` si la clave no tiene traducción para esa lengua) y
   * devuelve qué hacer en pantalla.
   */
  evaluarPublicacion(unidad: UnidadTraducida | undefined): ResultadoGuardia {
    if (!unidad) {
      return { decision: 'RETENER', razones: ['TRADUCCION_INEXISTENTE'] };
    }

    if (!unidad.texto.trim()) {
      return { decision: 'RETENER', razones: ['TRADUCCION_VACIA'] };
    }

    const decision = DECISION_POR_ESTADO[unidad.estado];
    if (decision === 'RETENER') {
      return { decision, razones: [`ESTADO_NO_PUBLICABLE:${unidad.estado}`] };
    }

    if (decision === 'PUBLICAR') {
      return {
        decision,
        razones: ['ESTADO_VERIFICADO', `ORIGEN:${unidad.origen}`],
      };
    }

    return {
      decision,
      etiqueta: ETIQUETA_SIN_VERIFICAR,
      razones: ['ESTADO_POR_VERIFICAR', `ORIGEN:${unidad.origen}`],
    };
  }
}

const DECISION_POR_ESTADO: Record<EstadoTraduccion, DecisionGuardia> = {
  VERIFICADO: 'PUBLICAR',
  POR_VERIFICAR: 'PUBLICAR_ETIQUETADO',
  RECHAZADO: 'RETENER',
};

export const GUARDIA_POR_DEFECTO = new GuardiaPreEnvio();
