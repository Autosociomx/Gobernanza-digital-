import type { LucideIcon } from 'lucide-react';
import {
  Anchor, Sprout, Wheat, Receipt, Construction, Activity,
  HeartPulse, Bot, HandHeart, TrendingUp, ShieldCheck, Church, Plane,
  Ship, Droplets,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────
// Despliegue municipal del ecosistema Nayarit Digital.
//
// Cada municipio es una CONFIGURACIÓN, no un componente: la vista
// genérica MunicipioDigital.tsx renderiza cualquiera de estas entradas.
// Para sumar el municipio 6..20 basta con añadir su config aquí y su
// tarjeta en PlatformLanding — sin tocar la vista.
// ─────────────────────────────────────────────────────────────────────

export type MunicipioId = 'bahia' | 'compostela' | 'xalisco' | 'santiago';

export type AppView = 'landing' | 'c5' | 'citizen' | 'dev' | 'executive' | 'autopista' | MunicipioId;

export interface Localidad {
  nombre: string;
  rol: string;
}

export interface ModuloMunicipal {
  icon: LucideIcon;
  color: string;
  nombre: string;
  detalle: string;
}

export interface CasoCard {
  icon: LucideIcon;
  color: string;
  titulo: string;
  texto: string;
}

export interface Chip {
  texto: string;
  color: string;      // color base de la familia wixárika
  colorTexto: string; // variante clara para texto sobre tinta
}

export interface MunicipioConfig {
  id: MunicipioId;
  numero: number;          // posición en la secuencia de despliegue (Tepic = 1)
  marca: string;           // "Bahía Digital"
  municipio: string;       // "Bahía de Banderas"
  icono: LucideIcon;
  color: string;           // acento principal
  colorTexto: string;      // acento claro para texto sobre tinta
  gradiente: [string, string];
  tituloLinea1: string;
  tituloEm: string;
  descripcionHero: string;
  resumen: string;         // una línea para la tarjeta en PlatformLanding
  chips: Chip[];
  caso: {
    kicker: string;
    titulo: string;        // admite salto con \n
    parrafo: string;
    cards: CasoCard[];
  };
  panelLocalidades: {
    titulo: string;
    parrafo: string;
  };
  localidades: Localidad[];
  modulosIntro: string;
  modulos: ModuloMunicipal[];
}

// Paleta de la banda wixárika — la familia cromática compartida.
const ROSA = '#D81E5B';
const SOLAR = '#F5A623';
const TEAL = '#0FA3B1';
const VERDE = '#4C9F70';
const NARANJA = '#E85D04';
const OCRE = '#8F5E06';

const TEAL_CLARO = '#7EE8F2';
const VERDE_CLARO = '#7DE3A8';
const SOLAR_CLARO = '#FFC96A';
const ROSA_CLARO = '#FF8AB8';
const NARANJA_CLARO = '#FFB27A';

export const SECUENCIA_DESPLIEGUE: ReadonlyArray<{
  id: MunicipioId | 'tepic';
  marca: string;
  estado: 'Activo' | 'En despliegue';
}> = [
  { id: 'tepic', marca: 'Tepic Digital', estado: 'Activo' },
  { id: 'bahia', marca: 'Bahía Digital', estado: 'En despliegue' },
  { id: 'compostela', marca: 'Compostela Digital', estado: 'En despliegue' },
  { id: 'xalisco', marca: 'Xalisco Digital', estado: 'En despliegue' },
  { id: 'santiago', marca: 'Santiago Digital', estado: 'En despliegue' },
];

// Las 20 "salidas" de la Autopista Digital: todos los municipios de
// Nayarit. Los que ya tienen portal enlazan a su vista; el resto
// aparece como salida "próxima" hasta que se sume su config.
export const SALIDAS_NAYARIT: ReadonlyArray<{
  nombre: string;
  portal?: MunicipioId | 'tepic';
}> = [
  { nombre: 'Acaponeta' },
  { nombre: 'Ahuacatlán' },
  { nombre: 'Amatlán de Cañas' },
  { nombre: 'Bahía de Banderas', portal: 'bahia' },
  { nombre: 'Compostela', portal: 'compostela' },
  { nombre: 'Del Nayar' },
  { nombre: 'Huajicori' },
  { nombre: 'Ixtlán del Río' },
  { nombre: 'Jala' },
  { nombre: 'La Yesca' },
  { nombre: 'Rosamorada' },
  { nombre: 'Ruiz' },
  { nombre: 'San Blas' },
  { nombre: 'San Pedro Lagunillas' },
  { nombre: 'Santa María del Oro' },
  { nombre: 'Santiago Ixcuintla', portal: 'santiago' },
  { nombre: 'Tecuala' },
  { nombre: 'Tepic', portal: 'tepic' },
  { nombre: 'Tuxpan' },
  { nombre: 'Xalisco', portal: 'xalisco' },
];

export const MUNICIPIOS: Record<MunicipioId, MunicipioConfig> = {
  // ───────────────────────────── 2 · BAHÍA DE BANDERAS ─────────────
  bahia: {
    id: 'bahia',
    numero: 2,
    marca: 'Bahía Digital',
    municipio: 'Bahía de Banderas',
    icono: Anchor,
    color: TEAL,
    colorTexto: TEAL_CLARO,
    gradiente: [TEAL, VERDE],
    tituloLinea1: 'El gobierno digital',
    tituloEm: 'llega a la bahía',
    descripcionHero:
      'Después de Tepic Digital, el ecosistema ConnectX aterriza en el motor turístico de Nayarit: una sola cuenta ciudadana para pagar, reportar y ser atendido — de Valle de Banderas a Punta de Mita.',
    resumen:
      'Bahía de Banderas — el motor turístico del estado. Riviera Nayarit, valle agrícola y 10 localidades clave en la misma cuenta ciudadana.',
    chips: [
      { texto: '6 Módulos del Ecosistema', color: TEAL, colorTexto: TEAL_CLARO },
      { texto: '≈200 mil habitantes', color: VERDE, colorTexto: VERDE_CLARO },
      { texto: '10 Localidades clave', color: SOLAR, colorTexto: SOLAR_CLARO },
      { texto: 'Riviera Nayarit', color: ROSA, colorTexto: ROSA_CLARO },
      { texto: 'LlaveMx Art. 74', color: TEAL, colorTexto: TEAL_CLARO },
    ],
    caso: {
      kicker: 'El caso Bahía de Banderas',
      titulo: 'El municipio que más crece\nmerece el gobierno más ágil.',
      parrafo:
        'Creado en 1989, Bahía de Banderas es el municipio más joven de Nayarit y su motor económico: la Riviera Nayarit recibe millones de visitantes al año mientras el valle sostiene la agricultura. Un gobierno en papel no puede administrar dos economías a la vez — el ecosistema digital sí.',
      cards: [
        {
          icon: TrendingUp,
          color: TEAL,
          titulo: 'Doble economía, una tesorería',
          texto:
            'Predial turístico, ZOFEMAT, licencias de construcción y comercio: los conceptos de mayor recaudación del estado, hoy dispersos en ventanillas, unificados en línea.',
        },
        {
          icon: ShieldCheck,
          color: VERDE,
          titulo: 'Mismo estándar que Tepic',
          texto:
            'Identidad LlaveMx, expediente ciudadano único y datos abiertos por diseño. Bahía no estrena software experimental: hereda la plataforma ya validada en la capital.',
        },
      ],
    },
    panelLocalidades: {
      titulo: 'Localidad por localidad',
      parrafo:
        'El modelo "Colonia Inteligente" probado en Tepic se replica aquí como despliegue por localidad: cada una con su mapa de calor de reportes, sus obras trazables y su ventanilla digital.',
    },
    localidades: [
      { nombre: 'Valle de Banderas', rol: 'Cabecera municipal' },
      { nombre: 'Bucerías', rol: 'Corredor turístico' },
      { nombre: 'Nuevo Vallarta', rol: 'Zona hotelera' },
      { nombre: 'Mezcales', rol: 'Centro logístico' },
      { nombre: 'San Vicente', rol: 'Núcleo habitacional' },
      { nombre: 'San Juan de Abajo', rol: 'Valle agrícola' },
      { nombre: 'La Cruz de Huanacaxtle', rol: 'Puerto y marina' },
      { nombre: 'Punta de Mita', rol: 'Turismo premium' },
      { nombre: 'Sayulita', rol: 'Pueblo Mágico' },
      { nombre: 'Jarretaderas', rol: 'Frontera con Vallarta' },
    ],
    modulosIntro:
      'Una sola cuenta ciudadana — CURP o teléfono — para todo el ecosistema. Lo que en Tepic se llama trámite, en Bahía también atiende al turismo, al puerto y al campo.',
    modulos: [
      {
        icon: Receipt,
        color: TEAL,
        nombre: 'Tesorería Digital',
        detalle:
          'Predial, agua, licencias y ZOFEMAT 100% en línea. Recaudación turística trazable: cada peso de la Riviera Nayarit queda auditado.',
      },
      {
        icon: Construction,
        color: SOLAR,
        nombre: 'Trazabilidad de Obras',
        detalle:
          'Cada obra con ficha pública: contrato, empresa, monto y avance semanal con fotos — de la carretera federal a los caminos sacacosechas.',
      },
      {
        icon: Activity,
        color: ROSA,
        nombre: 'Servicios Públicos Inteligente',
        detalle:
          'Reportes por WhatsApp con IA: bacheo, luminarias, basura y fugas. Seguimiento Recibido → Asignado → Resuelto en tiempo real.',
      },
      {
        icon: HeartPulse,
        color: VERDE,
        nombre: 'Salud Digital',
        detalle:
          'Triaje médico con IA que funciona sin internet — para las colonias del valle y las comunidades de la costa norte.',
      },
      {
        icon: Bot,
        color: NARANJA,
        nombre: 'Asistente IA Ciudadano',
        detalle:
          'Atiende 24/7 en español, wixárika, náayeri e inglés — porque en Bahía el vecino y el visitante conviven en la misma ventanilla.',
      },
      {
        icon: HandHeart,
        color: OCRE,
        nombre: 'Bienestar Social',
        detalle:
          'Panel para DIF y trabajadores sociales: despensas, becas y seguimiento de casos vulnerables detectados por el propio ecosistema.',
      },
    ],
  },

  // ───────────────────────────── 3 · COMPOSTELA ────────────────────
  compostela: {
    id: 'compostela',
    numero: 3,
    marca: 'Compostela Digital',
    municipio: 'Compostela',
    icono: Church,
    color: VERDE,
    colorTexto: VERDE_CLARO,
    gradiente: [VERDE, TEAL],
    tituloLinea1: 'La capital más antigua',
    tituloEm: 'estrena el gobierno más nuevo',
    descripcionHero:
      'Compostela fue capital de la Nueva Galicia en el siglo XVI. Casi 500 años después, su segunda fundación es digital: una sola cuenta ciudadana del centro histórico al corredor de Guayabitos.',
    resumen:
      'Compostela — patrimonio de cinco siglos y costa que recauda: Guayabitos, La Peñita y Chacala con café de altura en la sierra.',
    chips: [
      { texto: '6 Módulos del Ecosistema', color: VERDE, colorTexto: VERDE_CLARO },
      { texto: '≈75 mil habitantes', color: TEAL, colorTexto: TEAL_CLARO },
      { texto: 'Guayabitos · La Peñita', color: SOLAR, colorTexto: SOLAR_CLARO },
      { texto: 'Café de altura', color: ROSA, colorTexto: ROSA_CLARO },
      { texto: 'LlaveMx Art. 74', color: VERDE, colorTexto: VERDE_CLARO },
    ],
    caso: {
      kicker: 'El caso Compostela',
      titulo: 'Patrimonio de cinco siglos,\ntrámites de cinco minutos.',
      parrafo:
        'Compostela vive dos vocaciones a la vez: el turismo familiar de su costa — Rincón de Guayabitos, La Peñita, Chacala — y el campo del valle y la sierra, con café de altura, mango y ganadería. Ambas dependen hoy de ventanillas presenciales en la cabecera; el ecosistema digital las atiende donde están.',
      cards: [
        {
          icon: TrendingUp,
          color: VERDE,
          titulo: 'La costa que recauda',
          texto:
            'El corredor Guayabitos–La Peñita concentra hospedaje, comercio y ZOFEMAT. Licencias, predial y derechos en línea significan temporada alta sin filas — y recaudación trazable.',
        },
        {
          icon: ShieldCheck,
          color: TEAL,
          titulo: 'Mismo estándar que Tepic',
          texto:
            'Identidad LlaveMx, expediente ciudadano único y datos abiertos por diseño. Compostela hereda la plataforma ya validada en la capital y en Bahía.',
        },
      ],
    },
    panelLocalidades: {
      titulo: 'Del centro histórico a la costa',
      parrafo:
        'El despliegue cubre las dos Compostelas: la del valle cafetalero y la del corredor turístico costero. Cada localidad con su mapa de reportes, sus obras trazables y su ventanilla digital.',
    },
    localidades: [
      { nombre: 'Compostela', rol: 'Cabecera histórica' },
      { nombre: 'Las Varas', rol: 'Centro comercial' },
      { nombre: 'La Peñita de Jaltemba', rol: 'Corredor costero' },
      { nombre: 'Rincón de Guayabitos', rol: 'Turismo familiar' },
      { nombre: 'Los Ayala', rol: 'Playa y hospedaje' },
      { nombre: 'Chacala', rol: 'Puerto ecoturístico' },
      { nombre: 'Zacualpan', rol: 'Tradición agrícola' },
      { nombre: 'Ixtapa de la Concepción', rol: 'Valle agrícola' },
    ],
    modulosIntro:
      'Una sola cuenta ciudadana — CURP o teléfono — para todo el ecosistema. En Compostela el mismo sistema atiende al hotelero de Guayabitos y al cafetalero de la sierra.',
    modulos: [
      {
        icon: Receipt,
        color: VERDE,
        nombre: 'Tesorería Digital',
        detalle:
          'Predial, agua, ZOFEMAT y licencias del corredor turístico 100% en línea. El comerciante de La Peñita renueva sin viajar a la cabecera.',
      },
      {
        icon: Construction,
        color: SOLAR,
        nombre: 'Trazabilidad de Obras',
        detalle:
          'Cada obra con ficha pública: de la carretera costera a los caminos cafetaleros de la sierra, con avance semanal en fotos.',
      },
      {
        icon: Activity,
        color: ROSA,
        nombre: 'Servicios Públicos Inteligente',
        detalle:
          'Reportes por WhatsApp con IA, dimensionados para temporada alta: basura, luminarias y agua en la costa se disparan en vacaciones — el sistema lo sabe.',
      },
      {
        icon: HeartPulse,
        color: TEAL,
        nombre: 'Salud Digital',
        detalle:
          'Triaje médico con IA sin internet para las comunidades del valle y la sierra — donde la señal se corta, el sistema sigue.',
      },
      {
        icon: Bot,
        color: NARANJA,
        nombre: 'Asistente IA Ciudadano',
        detalle:
          'Atiende 24/7 en español e inglés — el visitante de Guayabitos y el vecino de Zacualpan usan la misma ventanilla.',
      },
      {
        icon: HandHeart,
        color: OCRE,
        nombre: 'Bienestar Social',
        detalle:
          'Panel para DIF y trabajadores sociales, con foco en jornaleros agrícolas y adultos mayores de las comunidades rurales.',
      },
    ],
  },

  // ───────────────────────────── 4 · XALISCO ───────────────────────
  xalisco: {
    id: 'xalisco',
    numero: 4,
    marca: 'Xalisco Digital',
    municipio: 'Xalisco',
    icono: Sprout,
    color: SOLAR,
    colorTexto: SOLAR_CLARO,
    gradiente: [SOLAR, NARANJA],
    tituloLinea1: 'La tierra del elote',
    tituloEm: 'entra a la era digital',
    descripcionHero:
      'Xalisco — "lugar junto al arenal" — es la puerta aérea del estado y el vecino inseparable de la capital. Su gobierno digital nace conectado: una sola cuenta ciudadana para toda la zona metropolitana.',
    resumen:
      'Xalisco — la puerta aérea del estado y la otra mitad de la zona metropolitana: el trámite ya no distingue de qué lado de la avenida vives.',
    chips: [
      { texto: '6 Módulos del Ecosistema', color: SOLAR, colorTexto: SOLAR_CLARO },
      { texto: '≈60 mil habitantes', color: VERDE, colorTexto: VERDE_CLARO },
      { texto: 'Aeropuerto de Tepic', color: TEAL, colorTexto: TEAL_CLARO },
      { texto: 'Feria del Elote', color: ROSA, colorTexto: ROSA_CLARO },
      { texto: 'LlaveMx Art. 74', color: SOLAR, colorTexto: SOLAR_CLARO },
    ],
    caso: {
      kicker: 'El caso Xalisco',
      titulo: 'Una ciudad, dos municipios:\nel trámite no distingue frontera.',
      parrafo:
        'Xalisco y Tepic son una sola mancha urbana: miles de personas viven en un municipio y trabajan en el otro. Que la capital sea digital y su vecino no, obliga al ciudadano a vivir en dos épocas a la vez. Xalisco Digital cierra esa brecha — y suma el aeropuerto internacional, en Pantanal, a la red.',
      cards: [
        {
          icon: Plane,
          color: SOLAR,
          titulo: 'La puerta aérea del estado',
          texto:
            'El aeropuerto internacional de Tepic está en territorio xalisquense. Licencias, comercio y desarrollo alrededor de esa puerta merecen trámites a la altura: en línea y trazables.',
        },
        {
          icon: ShieldCheck,
          color: VERDE,
          titulo: 'Mismo estándar que Tepic',
          texto:
            'Identidad LlaveMx, expediente ciudadano único y datos abiertos por diseño. Para el ciudadano metropolitano, cruzar la avenida ya no significa cambiar de época.',
        },
      ],
    },
    panelLocalidades: {
      titulo: 'Del arenal a la sierra',
      parrafo:
        'El despliegue cubre la cabecera conurbada, la zona del aeropuerto y las comunidades del pie de sierra — cada una con su mapa de reportes y su ventanilla digital.',
    },
    localidades: [
      { nombre: 'Xalisco', rol: 'Cabecera municipal' },
      { nombre: 'Pantanal', rol: 'Zona aeroportuaria' },
      { nombre: 'Testerazo', rol: 'Puerta de la sierra' },
      { nombre: 'Emiliano Zapata', rol: 'Valle agrícola' },
    ],
    modulosIntro:
      'Una sola cuenta ciudadana — CURP o teléfono — para todo el ecosistema. El estudiante, el ejidatario y el comerciante de Xalisco usan la misma que en Tepic.',
    modulos: [
      {
        icon: Receipt,
        color: SOLAR,
        nombre: 'Tesorería Digital',
        detalle:
          'Predial, agua y licencias 100% en línea, con recordatorios por WhatsApp. El crecimiento habitacional del corredor se registra y recauda sin filas.',
      },
      {
        icon: Construction,
        color: TEAL,
        nombre: 'Trazabilidad de Obras',
        detalle:
          'Cada obra con ficha pública: pavimentaciones del corredor metropolitano y caminos rurales hacia la sierra, con avance semanal en fotos.',
      },
      {
        icon: Activity,
        color: ROSA,
        nombre: 'Servicios Públicos Inteligente',
        detalle:
          'Reportes por WhatsApp con IA: bacheo, luminarias, basura y fugas en colonias que crecen más rápido que el padrón — el mapa de calor los encuentra.',
      },
      {
        icon: HeartPulse,
        color: VERDE,
        nombre: 'Salud Digital',
        detalle:
          'Triaje médico con IA sin internet para las comunidades del pie de sierra, coordinado con los servicios de la capital vecina.',
      },
      {
        icon: Bot,
        color: NARANJA,
        nombre: 'Asistente IA Ciudadano',
        detalle:
          'Atiende 24/7 en español y wixárika. Sabe de trámites de ambos municipios: si el asunto es de Tepic, canaliza — el ciudadano no tiene que adivinar.',
      },
      {
        icon: HandHeart,
        color: OCRE,
        nombre: 'Bienestar Social',
        detalle:
          'Panel para DIF y trabajadores sociales, con foco en productores del campo — la Feria del Elote es identidad, y el maíz, economía familiar.',
      },
    ],
  },

  // ───────────────────────────── 5 · SANTIAGO IXCUINTLA ────────────
  santiago: {
    id: 'santiago',
    numero: 5,
    marca: 'Santiago Digital',
    municipio: 'Santiago Ixcuintla',
    icono: Wheat,
    color: NARANJA,
    colorTexto: NARANJA_CLARO,
    gradiente: [NARANJA, SOLAR],
    tituloLinea1: 'La cuna de la mexicanidad',
    tituloEm: 'estrena gobierno digital',
    descripcionHero:
      'Del delta del río Santiago salió la leyenda de Aztlán; de sus campos, el tabaco que dio nombre al norte de Nayarit. El gigante agrícola del estado se conecta al ecosistema con una sola cuenta ciudadana.',
    resumen:
      'Santiago Ixcuintla — el gigante agrícola del norte, con Mexcaltitán Pueblo Mágico y el delta del río Santiago bajo alerta temprana.',
    chips: [
      { texto: '6 Módulos del Ecosistema', color: NARANJA, colorTexto: NARANJA_CLARO },
      { texto: '≈90 mil habitantes', color: VERDE, colorTexto: VERDE_CLARO },
      { texto: 'Mexcaltitán · Pueblo Mágico', color: ROSA, colorTexto: ROSA_CLARO },
      { texto: 'Capital del tabaco', color: SOLAR, colorTexto: SOLAR_CLARO },
      { texto: 'LlaveMx Art. 74', color: NARANJA, colorTexto: NARANJA_CLARO },
    ],
    caso: {
      kicker: 'El caso Santiago Ixcuintla',
      titulo: 'El gigante agrícola del norte\nno puede seguir en papel.',
      parrafo:
        'Santiago Ixcuintla es el corazón productivo del norte de Nayarit: tabaco, frijol, chile y mango sobre el delta más fértil del Pacífico mexicano. Su territorio es extenso, sus localidades están dispersas y su río es tan generoso como riesgoso — exactamente el escenario donde un gobierno digital rinde más.',
      cards: [
        {
          icon: Droplets,
          color: NARANJA,
          titulo: 'El río como sistema de alerta',
          texto:
            'Las crecidas del Santiago se anticipan con datos: reportes ciudadanos georreferenciados, obras de protección trazables y alertas tempranas a las localidades ribereñas.',
        },
        {
          icon: Ship,
          color: TEAL,
          titulo: 'Mexcaltitán en el mapa digital',
          texto:
            'La isla Pueblo Mágico — la "Venecia mexicana" — merece que su trámite viaje por la red y no por lancha: constancias, pagos y reportes desde la isla misma.',
        },
      ],
    },
    panelLocalidades: {
      titulo: 'Del delta a la playa',
      parrafo:
        'El despliegue recorre el municipio como el río: cabecera, valle tabacalero, marismas y costa. Cada localidad con su mapa de reportes, sus obras trazables y su ventanilla digital.',
    },
    localidades: [
      { nombre: 'Santiago Ixcuintla', rol: 'Cabecera municipal' },
      { nombre: 'Mexcaltitán', rol: 'Pueblo Mágico' },
      { nombre: 'Villa Hidalgo', rol: 'Centro agrícola' },
      { nombre: 'Villa Juárez', rol: 'Valle del tabaco' },
      { nombre: 'Sentispac', rol: 'Pueblo histórico' },
      { nombre: 'Yago', rol: 'Campo cañero' },
      { nombre: 'Pozo de Ibarra', rol: 'Comercio rural' },
      { nombre: 'Amapa', rol: 'Campo tabacalero' },
      { nombre: 'La Presa', rol: 'Ribera del Santiago' },
      { nombre: 'Los Corchos', rol: 'Playa y pesca' },
    ],
    modulosIntro:
      'Una sola cuenta ciudadana — CURP o teléfono — para todo el ecosistema. El productor de Villa Juárez y el pescador de Los Corchos usan la misma ventanilla que la capital.',
    modulos: [
      {
        icon: Receipt,
        color: NARANJA,
        nombre: 'Tesorería Digital',
        detalle:
          'Predial rústico y urbano, agua y licencias 100% en línea — pensado para un municipio extenso donde ir a la cabecera cuesta medio día de trabajo.',
      },
      {
        icon: Construction,
        color: SOLAR,
        nombre: 'Trazabilidad de Obras',
        detalle:
          'Cada obra con ficha pública: defensas ribereñas, caminos sacacosechas y puentes del delta, con avance semanal en fotos.',
      },
      {
        icon: Activity,
        color: ROSA,
        nombre: 'Servicios Públicos Inteligente',
        detalle:
          'Reportes por WhatsApp con IA en cabecera y riberas. En temporada de lluvias, los reportes de nivel de agua alimentan la alerta temprana.',
      },
      {
        icon: HeartPulse,
        color: VERDE,
        nombre: 'Salud Digital',
        detalle:
          'Triaje médico con IA sin internet — diseñado para marismas y comunidades donde la señal llega a ratos y el centro de salud queda lejos.',
      },
      {
        icon: Bot,
        color: TEAL,
        nombre: 'Asistente IA Ciudadano',
        detalle:
          'Atiende 24/7 en español y náayeri. Sabe de apoyos al campo, constancias y pagos — y ejecuta: "reporta que el camino a Yago está anegado".',
      },
      {
        icon: HandHeart,
        color: OCRE,
        nombre: 'Bienestar Social',
        detalle:
          'Panel para DIF y trabajadores sociales, con foco en jornaleros del tabaco y familias ribereñas en zona de riesgo por crecidas.',
      },
    ],
  },
};
