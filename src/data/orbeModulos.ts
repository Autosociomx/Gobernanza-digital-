/**
 * Datos del Orbe Central — copia de UI de docs/orbe/modulos.json.
 * Con 9 módulos, mantener ambos a mano es aceptable; no se automatiza
 * la sincronización. Este archivo agrega lo que la UI necesita y el JSON
 * de docs no tiene: descripción, archivos reales, pendientes y keywords
 * para el enrutador local del chat.
 */

export type EstadoModulo =
  | 'disenado'
  | 'propuesta'
  | 'en_construccion'
  | 'piloto'
  | 'desplegado';

export const ESTADOS: Record<EstadoModulo, { etiqueta: string; color: string }> = {
  disenado: { etiqueta: 'Diseñado', color: '#7FA8B8' },
  propuesta: { etiqueta: 'Propuesta', color: '#D8B45C' },
  en_construccion: { etiqueta: 'En construcción', color: '#E0985A' },
  piloto: { etiqueta: 'Piloto', color: '#6EC6E8' },
  desplegado: { etiqueta: 'Desplegado', color: '#5FD68A' },
};

export interface ArchivoModulo {
  ruta: string;
  descripcion: string;
}

export interface Modulo {
  id: string;
  icono: string;
  nombreCorto: string;
  nombreCompleto: string;
  estado: EstadoModulo;
  descripcion: string;
  keywords: string[];
  archivos: ArchivoModulo[];
  pendientes: string[];
  conexiones: string[];
}

export const NUCLEO = {
  id: 'aura',
  icono: '🧠',
  nombreCorto: 'Aura',
  nombreCompleto: 'Orbe Central — Aura, atención ciudadana',
  estado: 'en_construccion' as EstadoModulo,
  descripcion:
    'El primer contacto con cualquier ciudadano: Aura conoce todos los círculos del Orbe y canaliza cada necesidad — un pago, una cita, un reporte, una denuncia — al módulo que la atiende.',
  archivos: [
    { ruta: 'docs/orbe/README.md', descripcion: 'mapa del Orbe' },
    { ruta: 'docs/orbe/modulos.json', descripcion: 'registro de módulos' },
    { ruta: 'docs/orbe/modulos/ORBE_NUCLEO.md', descripcion: 'ficha del núcleo' },
    { ruta: 'src/hooks/useAuraChat.ts', descripcion: 'motor de chat' },
    { ruta: 'src/hooks/useAuraVoice.ts', descripcion: 'motor de voz' },
  ] as ArchivoModulo[],
  pendientes: [
    'Bus de eventos formal entre círculos',
    'Documentar intents de Aura por módulo',
  ],
};

export const MODULOS: Modulo[] = [
  {
    id: 'llave-identidad',
    icono: '🔑',
    nombreCorto: 'Nayarit ID · Llave',
    nombreCompleto: 'Llave e Identidad — Llave MX + Llave Infantil',
    estado: 'propuesta',
    descripcion:
      'El círculo de identidad: el tutor se autentica con Llave MX (CURP) y de ella cuelga la Llave Infantil (SINISI) con doble anonimato frente a plataformas.',
    keywords: [
      'llave', 'identidad', 'nayarit id', 'id nayarit', 'id ciudadana', 'curp',
      'soberania', 'infantil', 'sinisi', 'consentimiento', 'verificacion',
      'edad', 'tutor', 'doble anonimato',
    ],
    archivos: [
      { ruta: 'docs/orbe/modulos/LLAVE_IDENTIDAD.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/marco/soberania-digital-infantil/README.md', descripcion: 'propuesta completa' },
      { ruta: 'docs/marco/soberania-digital-infantil/FICHA_LEGISLATIVA.md', descripcion: 'articulado legal' },
      { ruta: 'docs/marco/soberania-digital-infantil/DIAGRAMA_VERIFICACION.md', descripcion: 'flujos' },
      { ruta: 'src/components/LoginView.tsx', descripcion: 'login puente actual' },
    ],
    pendientes: [
      'Protocolo técnico del token (firma, rotación, no correlación)',
      'Integración real con Llave MX (sandbox ATDT)',
      'Prototipo de la app del tutor',
    ],
    conexiones: [
      'Expediente Familiar — la llave del tutor abre el expediente del menor',
      'Protección Digital — revocación dispara suspensión en 24 h',
      'Aura — sesión única del tutor en todos los círculos',
    ],
  },
  {
    id: 'expediente-familiar',
    icono: '📋',
    nombreCorto: 'Expediente Familiar',
    nombreCompleto: 'Expediente Digital Familiar — padres y niños, CURP',
    estado: 'piloto',
    descripcion:
      'Expediente de salud ligado al CURP: perfil, consultas, documentos y citas del hospital central. En modo pediátrico, solo se abre con la llave del tutor.',
    keywords: [
      'expediente', 'hospital', 'citas', 'cita', 'medico', 'paciente',
      'cartilla', 'vacun', 'pediatr', 'documentos', 'salud curp', 'rayos',
      'estudios', 'laboratorio',
    ],
    archivos: [
      { ruta: 'docs/orbe/modulos/EXPEDIENTE_FAMILIAR.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/marco/MODULO_SALUD_CURP.md', descripcion: 'documento técnico' },
      { ruta: 'firestore.rules', descripcion: 'reglas de acceso (8/8 tests)' },
      { ruta: 'src/components/SaludNayaritID.tsx', descripcion: 'componente principal' },
    ],
    pendientes: [
      'Modo pediátrico: expediente de menor exige llave del tutor',
      'Habilitar Cloud Storage (consola Firebase)',
      'Sembrar códigos de personal',
      'Cartilla de vacunación digital',
    ],
    conexiones: [
      'Nayarit ID · Llave — consentimiento del tutor',
      'TEPICTU Salud — el triaje deriva a cita',
      'Bienestar — casos vulnerables al DIF',
    ],
  },
  {
    id: 'tepictu-salud',
    icono: '🩺',
    nombreCorto: 'TEPICTU Salud',
    nombreCompleto: 'TEPICTU Salud — triaje con IA sin internet',
    estado: 'disenado',
    descripcion:
      'Chat de orientación médica offline para colonias y sierra: síntomas → urgencia → recomendación (casa, centro de salud u hospital). Para DIF y escuelas.',
    keywords: [
      'tepictu', 'triage', 'triaje', 'sintoma', 'urgencia', 'offline',
      'orientacion', 'medica', 'fiebre', 'enfermo', 'enferma', 'dolor',
      'doctor', 'me siento mal',
    ],
    archivos: [
      { ruta: 'docs/orbe/modulos/TEPICTU_SALUD.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/interno/NAYARIT_DIGITAL_V2.md', descripcion: 'visión §4' },
    ],
    pendientes: [
      'Elegir modelo de IA offline (Edge AI)',
      'Protocolo triaje → cita en hospital central',
      'Versión para menores: notifica al tutor vía su llave',
    ],
    conexiones: [
      'Expediente Familiar — consulta queda en el perfil CURP',
      'Bienestar — alertas de brotes y desnutrición',
      'Aura — el triaje es conversación offline',
    ],
  },
  {
    id: 'tesoreria',
    icono: '💰',
    nombreCorto: 'Tesorería',
    nombreCompleto: 'Tesorería Digital',
    estado: 'disenado',
    descripcion:
      'Predial, agua, multas y licencias 100% en línea, con recordatorios, líneas de captura y recibos fiscales.',
    keywords: ['tesoreria', 'predial', 'pago', 'agua', 'multa', 'licencia', 'recibo', 'impuesto'],
    archivos: [
      { ruta: 'docs/orbe/modulos/TESORERIA.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/interno/NAYARIT_DIGITAL_V2.md', descripcion: 'visión §1' },
    ],
    pendientes: ['Definir pasarela de pagos y conciliación'],
    conexiones: [
      'Servicios Públicos — reportes con costo generan pago',
      'Obras — pagado vs. avance real',
      'Bienestar — validación de beneficiarios',
    ],
  },
  {
    id: 'obras',
    icono: '🏗️',
    nombreCorto: 'Obras',
    nombreCompleto: 'Trazabilidad de Obras',
    estado: 'disenado',
    descripcion:
      'Cada obra con su ficha (contrato, empresa, monto), avance semanal con fotos y alertas por retraso o sobrecosto.',
    keywords: ['obra', 'contrato', 'avance', 'sobrecosto', 'puente', 'construccion'],
    archivos: [
      { ruta: 'docs/orbe/modulos/OBRAS.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/interno/NAYARIT_DIGITAL_V2.md', descripcion: 'visión §2' },
      { ruta: 'src/components/NayaritMap.tsx', descripcion: 'mapa' },
    ],
    pendientes: ['Esquema de datos de la ficha de obra'],
    conexiones: [
      'Servicios Públicos — obra mayor entra como solicitud',
      'Tesorería — control cruzado de pagos',
    ],
  },
  {
    id: 'servicios-publicos',
    icono: '🔧',
    nombreCorto: 'Servicios Públicos',
    nombreCompleto: 'Servicios Públicos Inteligente',
    estado: 'disenado',
    descripcion:
      'Reporte ciudadano por WhatsApp, chat o app; la IA clasifica (bache, luminaria, fuga…) y da seguimiento en tiempo real con notificaciones.',
    keywords: [
      'bache', 'luminaria', 'basura', 'fuga', 'poda', 'reporte', 'servicios',
      'whatsapp', 'bot tepic',
    ],
    archivos: [
      { ruta: 'docs/orbe/modulos/SERVICIOS_PUBLICOS.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/interno/NAYARIT_DIGITAL_V2.md', descripcion: 'visión §3' },
      { ruta: 'src/components/UrbanReportMapView.tsx', descripcion: 'mapa de reportes' },
    ],
    pendientes: ['Canal WhatsApp (Bot Tepic) y clasificador IA'],
    conexiones: [
      'Obras — reporte mayor se eleva',
      'Tesorería — reporte con costo',
      'TEPICTU — síntomas se derivan a triaje',
    ],
  },
  {
    id: 'bienestar',
    icono: '🤝',
    nombreCorto: 'Bienestar',
    nombreCompleto: 'Bienestar Social',
    estado: 'disenado',
    descripcion:
      'Panel para trabajadores sociales y DIF: programas (despensas, becas, apoyos) y seguimiento de casos vulnerables detectados por otros círculos.',
    keywords: ['bienestar', 'dif', 'despensa', 'apoyo', 'vulnerable', 'social', 'beca'],
    archivos: [
      { ruta: 'docs/orbe/modulos/BIENESTAR.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/interno/NAYARIT_DIGITAL_V2.md', descripcion: 'visión §6' },
    ],
    pendientes: ['Definir el panel DIF y su modelo de casos'],
    conexiones: [
      'TEPICTU — alertas de salud pública',
      'Nayarit ID · Llave — vínculo tutor-menor de Becas',
      'Tesorería — validación indirecta',
    ],
  },
  {
    id: 'pulso-nayarit',
    icono: '📊',
    nombreCorto: 'Pulso Nayarit',
    nombreCompleto: 'Pulso Nayarit — auditoría cívica',
    estado: 'desplegado',
    descripcion:
      'Preferencia electoral ciudadana en tiempo real con libro mayor encadenado y auditable. Backend Supabase/Postgres desplegado, demo activa.',
    keywords: ['pulso', 'auditoria', 'electoral', 'encuesta', 'ledger', 'preferencia', 'votos'],
    archivos: [
      { ruta: 'docs/orbe/modulos/PULSO_NAYARIT.md', descripcion: 'ficha del módulo' },
      { ruta: 'pulso-nayarit/README.md', descripcion: 'módulo completo' },
    ],
    pendientes: ['Documentar enlace público del dashboard demo'],
    conexiones: [
      'Aura — consulta conversacional de agregados',
      'Aislamiento deliberado: participación anónima por diseño',
    ],
  },
  {
    id: 'proteccion-digital',
    icono: '🛡️',
    nombreCorto: 'Protección Digital',
    nombreCompleto: 'Protección Digital — denuncia 24/7',
    estado: 'propuesta',
    descripcion:
      'Denuncia 24/7 (grooming, ciberacoso, extorsión), retiro de contenido en 24 h y enlace con fiscalías — modelo eSafety Australia.',
    keywords: [
      'proteccion', 'proteger', 'denuncia', 'denunciar', 'grooming',
      'ciberacoso', 'extorsion', 'fiscalia', 'retiro', 'acoso', 'molestando',
      'amenaza', 'hijos en linea', 'en linea', 'internet', 'redes sociales',
    ],
    archivos: [
      { ruta: 'docs/orbe/modulos/PROTECCION_DIGITAL.md', descripcion: 'ficha del módulo' },
      { ruta: 'docs/marco/soberania-digital-infantil/FICHA_LEGISLATIVA.md', descripcion: 'art. 4' },
      { ruta: 'docs/marco/soberania-digital-infantil/DIAGRAMA_VERIFICACION.md', descripcion: 'flujo de denuncia §4' },
    ],
    pendientes: [
      'Protocolo de recepción de denuncias',
      'Convenios tipo con fiscalías estatales',
    ],
    conexiones: [
      'Nayarit ID · Llave — revocación del tutor',
      'Bienestar — acompañamiento social del menor',
    ],
  },
];

const normalizar = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Enrutador local por palabras clave — respuesta instantánea mientras Gemini responde. */
export function matchModuleByText(texto: string): Modulo | null {
  const q = normalizar(texto);
  let mejor: Modulo | null = null;
  let mejorPuntaje = 0;

  for (const modulo of MODULOS) {
    let puntaje = 0;
    for (const kw of modulo.keywords) {
      if (q.includes(normalizar(kw))) puntaje += kw.length;
    }
    for (const palabra of modulo.nombreCorto.split(' ')) {
      if (palabra.length > 3 && q.includes(normalizar(palabra))) puntaje += 4;
    }
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejor = modulo;
    }
  }

  return mejorPuntaje >= 4 ? mejor : null;
}

export const GITHUB_BASE =
  'https://github.com/Autosociomx/Gobernanza-digital-/blob/main/';
