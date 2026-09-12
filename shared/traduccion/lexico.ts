import type { EntradaLexica } from './tipos';

/**
 * Léxico de interfaz en lenguas originarias.
 *
 * Este archivo es el **único** lugar donde puede vivir una cadena en náayeri
 * o wixárika. Antes vivían incrustadas en `CitizenApp.tsx` y `C5Dashboard.tsx`
 * sin autor, sin fecha y sin manera de saber si eran correctas; la Guardia de
 * regresiones (R9) ahora impide que vuelvan ahí.
 *
 * Reglas para editarlo:
 *
 * - `estado: 'VERIFICADO'` exige `origen: 'HABLANTE_NATIVO'` o
 *   `'FUENTE_DOCUMENTAL'`, `fuente` identificable y `revisadoEn`. Es lo único
 *   que se le muestra a un ciudadano sin etiqueta.
 * - `estado: 'POR_VERIFICAR'` se muestra con la etiqueta SIN VERIFICAR.
 * - `estado: 'RECHAZADO'` no se borra: queda asentado con el motivo y la
 *   interfaz cae a español. Igual que las actas, aquí se corrige, no se borra.
 *
 * Hoy **ninguna** entrada está VERIFICADA. Ese es el estado real: las cadenas
 * heredadas nunca pasaron por un hablante. Poner VERIFICADO sin revisión de
 * hablante es exactamente la falta que este subsistema existe para impedir.
 */

const HEREDADO = 'Cadena heredada de la interfaz (push de AI Studio); sin autoría ni revisión registrada.';

export const LEXICO_INTERFAZ: readonly EntradaLexica[] = [
  {
    clave: 'app.saludo',
    es: 'Hola, {nombre}',
    glosa: 'Saludo del encabezado de la App Ciudadana. {nombre} es el primer nombre del perfil.',
    traducciones: {
      cora: { texto: "Tyu'un, {nombre}", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
      wixarika: { texto: 'Haux {nombre}', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
    },
  },
  {
    clave: 'app.aura.saludo',
    es: '¡Hola {nombre}! Soy tu Asistente de Nayarit Digital (prototipo). Puedo ayudarte con reportes, salud preventiva o dudas sobre Comités Ciudadanos. ¿En qué te puedo apoyar hoy?',
    glosa: 'Primer mensaje del asistente Aura en la App Ciudadana.',
    traducciones: {
      cora: {
        texto: "Pue'en {nombre}! Ne'ij tyu'iti'in Nayarit Digital. Ne'ij amu'u ne'itye tyu'uti'in...",
        estado: 'POR_VERIFICAR',
        origen: 'SIN_TRAZABILIDAD',
        fuente: `${HEREDADO} Además está truncada con puntos suspensivos y no cubre el contenido del original.`,
      },
      wixarika: {
        texto: "¡Ke tsi' kaniu {nombre}! Ne keniu Asistente Nayarit Digital. ¿Kewa pikanetsi'iwau?",
        estado: 'POR_VERIFICAR',
        origen: 'SIN_TRAZABILIDAD',
        fuente: `${HEREDADO} No cubre el contenido del original (reportes, salud preventiva, comités).`,
      },
    },
  },
  {
    clave: 'nav.inicio',
    es: 'Inicio',
    glosa: 'Pestaña de inicio de la barra inferior.',
    traducciones: {
      cora: { texto: "Tyu'un", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
      wixarika: { texto: 'Haux', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
    },
  },
  {
    clave: 'nav.campana',
    es: 'Campaña',
    glosa: 'Pestaña del foro ciudadano.',
    traducciones: {
      cora: { texto: "Tyu'uchal", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
      wixarika: { texto: 'Chime', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
    },
  },
  {
    clave: 'nav.redes',
    es: 'Redes',
    glosa: 'Pestaña de redes ciudadanas.',
    traducciones: {
      cora: {
        texto: "Tyu'uredes",
        estado: 'POR_VERIFICAR',
        origen: 'SIN_TRAZABILIDAD',
        fuente: `${HEREDADO} Aparente calco: prefijo tyu'u- sobre la palabra española "redes".`,
      },
      wixarika: {
        texto: "Tyu'uredes",
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Es la cadena náayeri copiada al bloque wixárika en CitizenApp.tsx. No es wixárika; se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
    },
  },
  {
    clave: 'nav.tesoreria',
    es: 'Tesorería',
    glosa: 'Pestaña de pagos y tesorería municipal.',
    traducciones: {
      cora: { texto: "Tyu'upay", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: `${HEREDADO} Aparente calco sobre el inglés "pay".` },
      wixarika: { texto: 'Paka', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
    },
  },
  {
    clave: 'nav.gobierno',
    es: 'Gobierno',
    glosa: 'Pestaña de servicios y trámites de gobierno.',
    traducciones: {
      cora: { texto: "Tyu'useve", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: `${HEREDADO} Aparente calco sobre "servicios".` },
      wixarika: { texto: 'Yereta', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: HEREDADO },
    },
  },
  {
    clave: 'nav.perfil',
    es: 'Mi NayaritID',
    glosa: 'Pestaña de identidad digital del ciudadano. "NayaritID" es nombre propio y no se traduce.',
    traducciones: {
      cora: { texto: "Pēfi'i", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: `${HEREDADO} Pierde el nombre propio NayaritID.` },
      wixarika: { texto: 'Kewita', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: `${HEREDADO} Pierde el nombre propio NayaritID.` },
    },
  },
  {
    clave: 'app.asistente_en_linea',
    es: 'En línea · Soporte Regional',
    glosa: 'Indicador de estado del asistente cuando hay conexión con el servidor.',
    traducciones: {
      cora: {
        texto: 'Online · Cora Support',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Está en inglés, no en náayeri, y usa el exónimo "Cora" en lugar del autónimo. Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
      wixarika: {
        texto: 'Online · Wixárika Support',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Está en inglés, no en wixárika. Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
    },
  },
  {
    clave: 'accion.pagar_predial',
    es: 'Pagar Predial',
    glosa: 'Acción rápida del asistente: pago del impuesto predial.',
    traducciones: {
      cora: { texto: "Tyu'upay", estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: `${HEREDADO} Pierde la especificidad "predial".` },
      wixarika: { texto: 'Paka', estado: 'POR_VERIFICAR', origen: 'SIN_TRAZABILIDAD', fuente: `${HEREDADO} Pierde la especificidad "predial".` },
    },
  },
  {
    clave: 'accion.reportar_bache',
    es: 'Reportar Bache',
    glosa: 'Acción rápida del asistente: reporte de bache.',
    traducciones: {
      cora: {
        texto: 'Reportar',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Es español, no náayeri, y además pierde "bache". Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
      wixarika: {
        texto: 'Reportar',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Es español, no wixárika, y además pierde "bache". Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
    },
  },
  {
    clave: 'accion.mapa_obras',
    es: 'Mapa de Obras',
    glosa: 'Acción rápida del asistente: mapa de obra pública.',
    traducciones: {
      cora: {
        texto: 'Mapa',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Es español, no náayeri. Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
      wixarika: {
        texto: 'Mapa',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Es español, no wixárika. Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
    },
  },
  {
    clave: 'accion.ayuda',
    es: 'Ayuda',
    glosa: 'Acción rápida del asistente: ayuda general.',
    traducciones: {
      cora: {
        texto: 'Ayuda',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Idéntica al español: no hay traducción. Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
      wixarika: {
        texto: 'Ayuda',
        estado: 'RECHAZADO',
        origen: 'SIN_TRAZABILIDAD',
        fuente: 'Idéntica al español: no hay traducción. Se retiene y la interfaz cae a español.',
        revisadoEn: '2026-09-12',
      },
    },
  },
  {
    clave: 'c5.aura.saludo',
    es: 'El Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?',
    glosa: 'Primer mensaje del asistente Aura en el panel de gobierno (C5).',
    traducciones: {
      cora: {
        texto: "ConnectX IA amu'u tyu'un. ¿Tyu'un ne'ij tyu'uti'in Tepic?",
        estado: 'POR_VERIFICAR',
        origen: 'SIN_TRAZABILIDAD',
        fuente: `${HEREDADO} No cubre el contenido del original.`,
      },
      wixarika: {
        texto: "ConnectX IA keniu. ¿Kewa pikanetsi'iwau Tepic?",
        estado: 'POR_VERIFICAR',
        origen: 'SIN_TRAZABILIDAD',
        fuente: `${HEREDADO} No cubre el contenido del original.`,
      },
    },
  },
];
