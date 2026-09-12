import type { ParametrosDeVoz, PerfilIdiolectalDatos } from './tipos';

/** Cadencia de referencia del español mexicano hablado, en palabras por minuto. */
export const TEMPO_BASE_PPM = 150;
/** Frecuencia fundamental de referencia para la voz sintética, en hertz. */
export const PITCH_BASE_HZ = 120;

const RATE_MIN = 0.6;
const RATE_MAX = 1.6;
const PITCH_MIN = 0.5;
const PITCH_MAX = 1.8;

function acotar(valor: number, minimo: number, maximo: number): number {
  if (!Number.isFinite(valor)) return 1;
  return Math.min(maximo, Math.max(minimo, valor));
}

/**
 * Perfil idiolecto-acústico del hablante: cómo habla, no qué dice.
 *
 * Sirve para dos cosas y nada más: ajustar la voz sintética a la cadencia de
 * la persona, y decirle al traductor que conserve sus modismos. **No influye
 * en la decisión de publicar**: eso lo resuelve `GuardiaPreEnvio` con el
 * estatus del registro. Un perfil muy detallado no vuelve confiable una
 * traducción que nadie revisó.
 */
export class PerfilIdiolectal {
  readonly pitchHz: number;
  readonly tempoPpm: number;
  readonly terminosLocales: readonly string[];

  constructor({ pitchHz, tempoPpm, terminosLocales }: PerfilIdiolectalDatos) {
    if (!Number.isFinite(pitchHz) || pitchHz <= 0) {
      throw new Error(`PITCH_INVALIDO:${pitchHz}`);
    }
    if (!Number.isFinite(tempoPpm) || tempoPpm <= 0) {
      throw new Error(`TEMPO_INVALIDO:${tempoPpm}`);
    }
    this.pitchHz = pitchHz;
    this.tempoPpm = tempoPpm;
    this.terminosLocales = [...terminosLocales];
  }

  /** Instrucción de estilo que acompaña al borrador de traducción. */
  aContextoDePrompt(): string {
    const modismos = this.terminosLocales.length
      ? ` Conserva los modismos del hablante: ${this.terminosLocales.join(', ')}.`
      : '';
    return (
      `Mantén una cadencia de ${this.tempoPpm} palabras por minuto ` +
      `y una frecuencia fundamental cercana a ${this.pitchHz} Hz.${modismos}`
    );
  }

  /**
   * Parámetros para `SpeechSynthesisUtterance`. La Web Speech API no acepta
   * hertz ni palabras por minuto: espera multiplicadores relativos a la voz
   * del navegador, así que el perfil se normaliza contra la referencia.
   */
  aParametrosDeVoz(): ParametrosDeVoz {
    return {
      rate: Number(acotar(this.tempoPpm / TEMPO_BASE_PPM, RATE_MIN, RATE_MAX).toFixed(2)),
      pitch: Number(acotar(this.pitchHz / PITCH_BASE_HZ, PITCH_MIN, PITCH_MAX).toFixed(2)),
    };
  }
}

/** Perfil neutro: el que se usa cuando no se ha medido a nadie. */
export const PERFIL_NEUTRO = new PerfilIdiolectal({
  pitchHz: PITCH_BASE_HZ,
  tempoPpm: TEMPO_BASE_PPM,
  terminosLocales: [],
});
