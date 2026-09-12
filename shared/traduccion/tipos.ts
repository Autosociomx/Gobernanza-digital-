import type { LenguaClave } from './lenguas';

export const REGISTRO_TRADUCCION_VERSION = 'orbe.native-translation-registry.v0.1' as const;

/**
 * Estatus de una unidad traducida. Vocabulario deliberadamente igual al de
 * `docs/marco/BIBLIOTECA_LEGAL.md`: en este proyecto "VERIFICADO" significa
 * que alguien identificable lo revisó y quedó asentado, no que "se ve bien".
 */
export type EstadoTraduccion = 'VERIFICADO' | 'POR_VERIFICAR' | 'RECHAZADO';

/**
 * De dónde salió el texto. `SIN_TRAZABILIDAD` es el caso real de las cadenas
 * que ya vivían incrustadas en los componentes: nadie sabe quién las escribió.
 */
export type OrigenTraduccion =
  | 'HABLANTE_NATIVO'
  | 'FUENTE_DOCUMENTAL'
  | 'MAQUINA'
  | 'SIN_TRAZABILIDAD';

export interface UnidadTraducida {
  texto: string;
  estado: EstadoTraduccion;
  origen: OrigenTraduccion;
  /** Quién o qué respalda el texto. Institución o documento, nunca una persona física. */
  fuente: string;
  /** ISO-8601 de la revisión que produjo el estatus actual, si la hubo. */
  revisadoEn?: string;
}

export interface EntradaLexica {
  /** Identificador estable que usa la interfaz. No se traduce ni se renombra. */
  clave: string;
  /** Texto en español: siempre existe y siempre es publicable. */
  es: string;
  /** Para qué sirve la cadena; le da contexto a quien la verifique. */
  glosa: string;
  traducciones: Partial<Record<Exclude<LenguaClave, 'es'>, UnidadTraducida>>;
}

/**
 * Decisión de la guardia previa al envío.
 *
 * - `PUBLICAR`            → texto verificado, se muestra sin adorno.
 * - `PUBLICAR_ETIQUETADO` → se muestra pero acompañado de etiqueta visible.
 * - `RETENER`             → no se muestra; se cae a español.
 */
export type DecisionGuardia = 'PUBLICAR' | 'PUBLICAR_ETIQUETADO' | 'RETENER';

export interface ResultadoGuardia {
  decision: DecisionGuardia;
  /** Etiqueta obligatoria en pantalla cuando la decisión es PUBLICAR_ETIQUETADO. */
  etiqueta?: string;
  razones: string[];
}

export interface TextoResuelto {
  /** Lo que la interfaz debe pintar. */
  texto: string;
  /** Lengua realmente entregada: puede diferir de la pedida si hubo repliegue. */
  lenguaEfectiva: LenguaClave;
  lenguaSolicitada: LenguaClave;
  estado: EstadoTraduccion;
  origen: OrigenTraduccion;
  decision: DecisionGuardia;
  etiqueta?: string;
  razones: string[];
}

/**
 * Perfil idiolecto-acústico del hablante. Describe *cómo* habla la persona
 * (frecuencia, cadencia, modismos); nunca *qué* dice, y nunca decide si un
 * texto es publicable — eso es competencia exclusiva de la guardia.
 */
export interface PerfilIdiolectalDatos {
  /** Frecuencia fundamental (f0) medida, en hertz. */
  pitchHz: number;
  /** Cadencia de habla en palabras por minuto. */
  tempoPpm: number;
  /** Modismos y vocabulario frecuente del hablante. */
  terminosLocales: string[];
}

/** Parámetros para `SpeechSynthesisUtterance` derivados del perfil. */
export interface ParametrosDeVoz {
  rate: number;
  pitch: number;
}

export interface CandidatoTraduccion {
  clave?: string;
  lengua: Exclude<LenguaClave, 'es'>;
  textoFuente: string;
  textoSalida: string;
  /** Similitud coseno fuente↔salida; `undefined` si no se pudo medir. */
  similitud?: number;
  /** `false` cuando la similitud cayó bajo el umbral o no se pudo medir. */
  aprobóFiltroDeriva: boolean;
  /** `true` si se descartó el borrador con estilo y se emitió la versión literal. */
  replegado: boolean;
  /** Invariante: siempre `false`. Ninguna salida de máquina se publica sola. */
  aptoParaPublicacion: false;
  estadoPropuesto: Extract<EstadoTraduccion, 'POR_VERIFICAR'>;
  razones: string[];
}
