/**
 * Lenguas que la interfaz ofrece en el selector.
 *
 * Las claves conservan la forma que ya usaban `CitizenApp` y `C5Dashboard`
 * (`cora`, no `nayeri`) para no romper el estado guardado ni los enlaces
 * profundos; el autónimo correcto — náayeri — se declara aparte y es lo que
 * se pinta en pantalla. Que el código diga "cora" y la pantalla diga
 * "náayeri" es intencional, no una inconsistencia.
 */
export const LENGUAS_CLAVES = ['es', 'cora', 'wixarika'] as const;

export type LenguaClave = (typeof LENGUAS_CLAVES)[number];

export interface DescriptorLengua {
  clave: LenguaClave;
  /** Autónimo: como la nombran sus propios hablantes. */
  autonimo: string;
  /** Nombre completo para prosa y documentación. */
  nombre: string;
  /** Etiqueta corta del botón del selector. */
  etiquetaBoton: string;
  /**
   * Locale para Web Speech API. Náayeri y wixárika no tienen voz sintética
   * en ningún navegador: se lee en es-MX y así se declara, en vez de fingir
   * que la plataforma habla la lengua.
   */
  localeVoz: string;
  /** `true` solo si la lengua tiene voz sintética propia. Hoy: ninguna salvo español. */
  vozNativa: boolean;
}

export const LENGUAS: readonly DescriptorLengua[] = [
  {
    clave: 'es',
    autonimo: 'Español',
    nombre: 'español',
    etiquetaBoton: 'ES',
    localeVoz: 'es-MX',
    vozNativa: true,
  },
  {
    clave: 'cora',
    autonimo: 'Náayeri',
    nombre: 'náayeri (cora)',
    etiquetaBoton: 'NÁAYERI',
    localeVoz: 'es-MX',
    vozNativa: false,
  },
  {
    clave: 'wixarika',
    autonimo: 'Wixárika',
    nombre: 'wixárika',
    etiquetaBoton: 'WIXÁRIKA',
    localeVoz: 'es-MX',
    vozNativa: false,
  },
];

export function esLenguaSoportada(valor: string): valor is LenguaClave {
  return (LENGUAS_CLAVES as readonly string[]).includes(valor);
}

export function descriptorLengua(clave: LenguaClave): DescriptorLengua {
  const descriptor = LENGUAS.find((candidata) => candidata.clave === clave);
  if (!descriptor) throw new Error(`LENGUA_NO_REGISTRADA:${clave}`);
  return descriptor;
}
