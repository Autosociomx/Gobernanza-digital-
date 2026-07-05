import {
  Coins, Droplets, HardHat, ShoppingBag, Car, Package,
  FileText, Ticket, Hotel, Leaf, Layers, Landmark,
} from 'lucide-react';

export type GrupoPago =
  | 'impuestos' | 'agua' | 'obras' | 'comercio' | 'transito'
  | 'servicios' | 'tramites' | 'espectaculos' | 'hospedaje'
  | 'ambiente' | 'otros' | 'estatal';

export type PagoStatus = 'disponible' | 'proximo';

export interface PagoConcepto {
  id: string;
  nombre: string;
  descripcion: string;
  dependencia: string;
  monto: string;
  periodicidad: string;
  status: PagoStatus;
  grupo: GrupoPago;
  categoria: 'municipal' | 'estatal';
  tag?: string;
}

export interface GrupoMeta {
  label: string;
  icon: React.ElementType;
  color: string;
  ingresoPotencialMDP: number;
}

export const GRUPOS: Record<GrupoPago, GrupoMeta> = {
  impuestos: { label: 'Impuestos', icon: Coins, color: 'text-emerald-400', ingresoPotencialMDP: 450 },
  agua: { label: 'Agua y Saneamiento', icon: Droplets, color: 'text-blue-400', ingresoPotencialMDP: 280 },
  obras: { label: 'Obras Públicas', icon: HardHat, color: 'text-orange-400', ingresoPotencialMDP: 85 },
  comercio: { label: 'Licencias y Comercio', icon: ShoppingBag, color: 'text-amber-400', ingresoPotencialMDP: 120 },
  transito: { label: 'Tránsito y Vialidad', icon: Car, color: 'text-rose-400', ingresoPotencialMDP: 45 },
  servicios: { label: 'Servicios Públicos', icon: Package, color: 'text-cyan-400', ingresoPotencialMDP: 180 },
  tramites: { label: 'Trámites y Certificados', icon: FileText, color: 'text-indigo-400', ingresoPotencialMDP: 25 },
  espectaculos: { label: 'Espectáculos y Eventos', icon: Ticket, color: 'text-pink-400', ingresoPotencialMDP: 15 },
  hospedaje: { label: 'Hospedaje y Turismo', icon: Hotel, color: 'text-fuchsia-400', ingresoPotencialMDP: 35 },
  ambiente: { label: 'Medio Ambiente', icon: Leaf, color: 'text-lime-400', ingresoPotencialMDP: 10 },
  otros: { label: 'Otros Ingresos', icon: Layers, color: 'text-slate-400', ingresoPotencialMDP: 55 },
  estatal: { label: 'Estatal (hoja de ruta)', icon: Landmark, color: 'text-violet-300', ingresoPotencialMDP: 0 },
};

const DEP_IMPUESTOS = 'Tesorería Municipal / Catastro';
const DEP_AGUA = 'Sistema Municipal de Agua Potable y Alcantarillado';
const DEP_OBRAS = 'Obras Públicas y Desarrollo Urbano';
const DEP_COMERCIO = 'Desarrollo Económico y Comercio';
const DEP_TRANSITO = 'Seguridad Pública y Vialidad';
const DEP_SERVICIOS = 'Servicios Públicos Municipales';
const DEP_TRAMITES = 'Catastro y Secretaría del Ayuntamiento';
const DEP_ESPECTACULOS = 'Secretaría del Ayuntamiento';
const DEP_HOSPEDAJE = 'Tesorería Municipal / Turismo';
const DEP_AMBIENTE = 'Ecología y Medio Ambiente';
const DEP_OTROS = 'Tesorería Municipal';

export const CATALOGO_PAGOS: PagoConcepto[] = [
  // ── 1. IMPUESTOS ──────────────────────────────────────────────
  { id: 'predial-urbano', nombre: 'Impuesto Predial Urbano', descripcion: 'Anual sobre propiedades en zona urbana', dependencia: DEP_IMPUESTOS, monto: 'Según valor catastral', periodicidad: 'Semestral', status: 'disponible', grupo: 'impuestos', categoria: 'municipal', tag: 'Más pagado' },
  { id: 'predial-rustico', nombre: 'Impuesto Predial Rústico', descripcion: 'Anual sobre propiedades en zona rural', dependencia: DEP_IMPUESTOS, monto: 'Según valor catastral rural', periodicidad: 'Semestral', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },
  { id: 'predial-suburbano', nombre: 'Impuesto Predial Suburbano', descripcion: 'Zonas de transición urbano-rural', dependencia: DEP_IMPUESTOS, monto: 'Según valor catastral', periodicidad: 'Semestral', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },
  { id: 'recargos-predial', nombre: 'Recargos por pago extemporáneo predial', descripcion: 'Recargo por atraso en el pago del predial', dependencia: DEP_IMPUESTOS, monto: '2% mensual', periodicidad: 'Por atraso', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },
  { id: 'actualizacion-catastral', nombre: 'Actualización de valores catastrales', descripcion: 'Revalúo de predios cada 2-3 años', dependencia: DEP_IMPUESTOS, monto: 'Tarifa por avalúo', periodicidad: 'Cada 2-3 años', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },
  { id: 'isai', nombre: 'Impuesto sobre Adquisición de Inmuebles (ISAI)', descripcion: 'Impuesto por compraventa de bienes inmuebles', dependencia: DEP_IMPUESTOS, monto: '2%-4% del valor', periodicidad: 'Por operación', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },
  { id: 'reparto-bienes', nombre: 'Impuesto sobre Reparto de Bienes', descripcion: 'Herencias y legados', dependencia: DEP_IMPUESTOS, monto: 'Según valor heredado', periodicidad: 'Por trámite', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },
  { id: 'enajenacion-inmuebles', nombre: 'Impuesto sobre Enajenación de Bienes Inmuebles', descripcion: 'Ventas de propiedades', dependencia: DEP_IMPUESTOS, monto: 'Según valor de venta', periodicidad: 'Por operación', status: 'proximo', grupo: 'impuestos', categoria: 'municipal' },

  // ── 2. AGUA POTABLE Y SANEAMIENTO ────────────────────────────
  { id: 'conexion-agua', nombre: 'Cuota de conexión de agua potable', descripcion: 'Nueva toma domiciliaria', dependencia: DEP_AGUA, monto: 'Tarifa fija por toma nueva', periodicidad: 'Por trámite', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'agua-domestica', nombre: 'Tarifa mensual doméstica', descripcion: 'Agua y drenaje — consumo residencial escalonado por m³', dependencia: DEP_AGUA, monto: 'Por consumo (m³)', periodicidad: 'Bimestral', status: 'disponible', grupo: 'agua', categoria: 'municipal', tag: 'Alta demanda' },
  { id: 'agua-comercial', nombre: 'Tarifa mensual comercial', descripcion: 'Consumo de agua en negocios y servicios', dependencia: DEP_AGUA, monto: 'Por consumo (m³)', periodicidad: 'Bimestral', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'agua-industrial', nombre: 'Tarifa mensual industrial', descripcion: 'Consumo de agua en manufactura y producción', dependencia: DEP_AGUA, monto: 'Por consumo (m³)', periodicidad: 'Bimestral', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'agua-gubernamental', nombre: 'Tarifa mensual gubernamental', descripcion: 'Consumo de agua en dependencias públicas', dependencia: DEP_AGUA, monto: 'Por consumo (m³)', periodicidad: 'Bimestral', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'reconexion-agua', nombre: 'Derecho por reconexión de agua', descripcion: 'Tras corte por falta de pago', dependencia: DEP_AGUA, monto: 'Tarifa fija', periodicidad: 'Por evento', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'cambio-propietario-agua', nombre: 'Cambio de propietario de toma de agua', descripcion: 'Traspaso de titularidad', dependencia: DEP_AGUA, monto: 'Tarifa por trámite', periodicidad: 'Por trámite', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'reparacion-fugas', nombre: 'Reparación de fugas en red pública', descripcion: 'A cargo del usuario cuando aplica', dependencia: DEP_AGUA, monto: 'Según material y mano de obra', periodicidad: 'Por evento', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'instalacion-medidor', nombre: 'Instalación de medidor', descripcion: 'Nuevo o reposición de medidor de consumo', dependencia: DEP_AGUA, monto: 'Costo de equipo e instalación', periodicidad: 'Por trámite', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'lectura-extraordinaria', nombre: 'Lectura extraordinaria de medidor', descripcion: 'Fuera de calendario regular', dependencia: DEP_AGUA, monto: 'Tarifa fija', periodicidad: 'Por solicitud', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'conexion-alcantarillado', nombre: 'Cuota de conexión de alcantarillado', descripcion: 'Nueva descarga domiciliaria', dependencia: DEP_AGUA, monto: 'Tarifa fija por descarga nueva', periodicidad: 'Por trámite', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'alcantarillado-mensual', nombre: 'Tarifa mensual de alcantarillado', descripcion: 'Servicio de drenaje', dependencia: DEP_AGUA, monto: 'Por consumo asociado', periodicidad: 'Bimestral', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'descarga-residuales', nombre: 'Derecho por descarga de aguas residuales', descripcion: 'Comercio e industria', dependencia: DEP_AGUA, monto: 'Según volumen y carga contaminante', periodicidad: 'Mensual', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'limpieza-drenajes', nombre: 'Limpieza de drenajes y colectores', descripcion: 'A solicitud del usuario', dependencia: DEP_AGUA, monto: 'Por metro lineal', periodicidad: 'Por solicitud', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'factibilidad-descarga', nombre: 'Dictamen de factibilidad de descarga', descripcion: 'Para nuevos negocios', dependencia: DEP_AGUA, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'agua', categoria: 'municipal' },
  { id: 'muestreo-residuales', nombre: 'Muestreo y análisis de aguas residuales', descripcion: 'Cumplimiento NOM-001', dependencia: DEP_AGUA, monto: 'Según parámetros analizados', periodicidad: 'Por muestreo', status: 'proximo', grupo: 'agua', categoria: 'municipal' },

  // ── 3. OBRAS PÚBLICAS Y DESARROLLO URBANO ────────────────────
  { id: 'licencia_construccion', nombre: 'Licencia de construcción nueva obra', descripcion: 'Permiso según tipo y superficie de obra', dependencia: DEP_OBRAS, monto: 'Por m² de construcción', periodicidad: 'Por trámite', status: 'disponible', grupo: 'obras', categoria: 'municipal' },
  { id: 'licencia-ampliacion', nombre: 'Licencia de ampliación', descripcion: 'Aumento de superficie construida', dependencia: DEP_OBRAS, monto: 'Por m² adicional', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'licencia-remodelacion', nombre: 'Licencia de remodelación', descripcion: 'Modificaciones internas o externas', dependencia: DEP_OBRAS, monto: 'Según alcance de obra', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'licencia-demolicion', nombre: 'Licencia de demolición', descripcion: 'Derribo de estructuras', dependencia: DEP_OBRAS, monto: 'Por m² a demoler', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'licencia-reconstruccion', nombre: 'Licencia de reconstrucción', descripcion: 'Tras siniestro o demolición previa', dependencia: DEP_OBRAS, monto: 'Por m² de construcción', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'uso_suelo', nombre: 'Dictamen de uso de suelo', descripcion: 'Autorización para modificar la clasificación catastral del predio', dependencia: DEP_OBRAS, monto: 'Según tipo de cambio', periodicidad: 'Por trámite', status: 'disponible', grupo: 'obras', categoria: 'municipal' },
  { id: 'alineamiento', nombre: 'Alineamiento y número oficial', descripcion: 'Certificado de ubicación del predio', dependencia: DEP_OBRAS, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'obras-provisionales', nombre: 'Permisos para obras provisionales', descripcion: 'Caseta de venta, bodegas temporales', dependencia: DEP_OBRAS, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'fraccionamiento', nombre: 'Autorización de fraccionamiento', descripcion: 'División de terrenos en lotes', dependencia: DEP_OBRAS, monto: 'Según número de lotes', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'subdivision', nombre: 'Autorización de subdivisión', descripcion: 'Partición de predios', dependencia: DEP_OBRAS, monto: 'Según número de fracciones', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'fusion-predios', nombre: 'Autorización de fusión de predios', descripcion: 'Unificación de terrenos', dependencia: DEP_OBRAS, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'impacto-urbano', nombre: 'Dictamen de impacto urbano', descripcion: 'Proyectos mayores de construcción', dependencia: DEP_OBRAS, monto: 'Según magnitud del proyecto', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'impacto-vial', nombre: 'Dictamen de impacto vial', descripcion: 'Proyectos con alta generación de viajes', dependencia: DEP_OBRAS, monto: 'Según magnitud del proyecto', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },
  { id: 'reservas-territoriales', nombre: 'Liberalización de reservas territoriales', descripcion: 'Cambio de uso de reservas urbanas', dependencia: DEP_OBRAS, monto: 'Según superficie', periodicidad: 'Por trámite', status: 'proximo', grupo: 'obras', categoria: 'municipal' },

  // ── 4. LICENCIAS DE FUNCIONAMIENTO Y COMERCIO ────────────────
  { id: 'licencia_negocio', nombre: 'Licencia de funcionamiento anual', descripcion: 'Apertura y renovación de negocios establecidos', dependencia: DEP_COMERCIO, monto: 'Según giro y m²', periodicidad: 'Anual', status: 'disponible', grupo: 'comercio', categoria: 'municipal' },
  { id: 'licencia-temporal', nombre: 'Licencia de funcionamiento temporal', descripcion: 'Eventos y ferias comerciales', dependencia: DEP_COMERCIO, monto: 'Según duración y giro', periodicidad: 'Por evento', status: 'proximo', grupo: 'comercio', categoria: 'municipal' },
  { id: 'venta-ambulante', nombre: 'Permiso de venta ambulante', descripcion: 'Comercio en vía pública', dependencia: DEP_COMERCIO, monto: 'Cuota diaria o mensual', periodicidad: 'Mensual', status: 'proximo', grupo: 'comercio', categoria: 'municipal' },
  { id: 'tianguis', nombre: 'Permiso para tianguis y mercados', descripcion: 'Puestos semifijos en vía pública', dependencia: DEP_COMERCIO, monto: 'Por puesto', periodicidad: 'Mensual', status: 'proximo', grupo: 'comercio', categoria: 'municipal' },
  { id: 'anuncios-espectaculares', nombre: 'Permiso para anuncios espectaculares', descripcion: 'Publicidad exterior de gran formato', dependencia: DEP_COMERCIO, monto: 'Por m² de anuncio', periodicidad: 'Anual', status: 'proximo', grupo: 'comercio', categoria: 'municipal' },
  { id: 'anuncios', nombre: 'Permiso para anuncios en inmueble', descripcion: 'Registro y derechos por rotulación de fachadas', dependencia: DEP_COMERCIO, monto: 'Por m² y tipo de anuncio', periodicidad: 'Anual', status: 'disponible', grupo: 'comercio', categoria: 'municipal' },
  { id: 'volanteo', nombre: 'Permiso para volantes y perifoneo', descripcion: 'Publicidad móvil y de reparto', dependencia: DEP_COMERCIO, monto: 'Tarifa por día', periodicidad: 'Por evento', status: 'proximo', grupo: 'comercio', categoria: 'municipal' },
  { id: 'venta-alcohol', nombre: 'Permiso para venta de alcohol', descripcion: 'Licencias especiales de bebidas alcohólicas', dependencia: DEP_COMERCIO, monto: 'Según giro y aforo', periodicidad: 'Anual', status: 'proximo', grupo: 'comercio', categoria: 'municipal' },

  // ── 5. TRÁNSITO Y VIALIDAD ────────────────────────────────────
  { id: 'infracciones_transito', nombre: 'Multas por infracciones de tránsito', descripcion: 'Estacionamiento, velocidad y otras faltas viales', dependencia: DEP_TRANSITO, monto: 'Según infracción', periodicidad: 'Por evento', status: 'disponible', grupo: 'transito', categoria: 'municipal', tag: 'Alta demanda' },
  { id: 'multas-reglamento', nombre: 'Multas por violación al reglamento de tránsito', descripcion: 'Conducción imprudente y faltas graves', dependencia: DEP_TRANSITO, monto: 'Según infracción', periodicidad: 'Por evento', status: 'proximo', grupo: 'transito', categoria: 'municipal' },
  { id: 'grua-corralon', nombre: 'Grúa y corralón', descripcion: 'Retiro de vehículos mal estacionados', dependencia: DEP_TRANSITO, monto: 'Tarifa fija por arrastre', periodicidad: 'Por evento', status: 'proximo', grupo: 'transito', categoria: 'municipal' },
  { id: 'deposito-corralon', nombre: 'Depósito de vehículos en corralón', descripcion: 'Estadía diaria de vehículos retenidos', dependencia: DEP_TRANSITO, monto: 'Tarifa diaria', periodicidad: 'Diario', status: 'proximo', grupo: 'transito', categoria: 'municipal' },
  { id: 'estacionamiento-via', nombre: 'Permiso para estacionamiento en vía pública', descripcion: 'Para residentes o negocios', dependencia: DEP_TRANSITO, monto: 'Cuota mensual', periodicidad: 'Mensual', status: 'proximo', grupo: 'transito', categoria: 'municipal' },
  { id: 'carga-descarga', nombre: 'Permiso para carga y descarga', descripcion: 'Comercio con horarios de maniobra', dependencia: DEP_TRANSITO, monto: 'Cuota mensual', periodicidad: 'Mensual', status: 'proximo', grupo: 'transito', categoria: 'municipal' },
  { id: 'eventos-via-publica', nombre: 'Permiso para eventos en vía pública', descripcion: 'Cierre de calles para eventos', dependencia: DEP_TRANSITO, monto: 'Según duración y vialidad', periodicidad: 'Por evento', status: 'proximo', grupo: 'transito', categoria: 'municipal' },

  // ── 6. SERVICIOS PÚBLICOS DIVERSOS ────────────────────────────
  { id: 'basura-domestica', nombre: 'Cuota mensual de recolección de basura doméstica', descripcion: 'Tarifas por zona residencial', dependencia: DEP_SERVICIOS, monto: 'Tarifa por zona', periodicidad: 'Mensual', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'basura-comercial', nombre: 'Cuota mensual de recolección de basura comercial', descripcion: 'Según volumen generado', dependencia: DEP_SERVICIOS, monto: 'Según volumen', periodicidad: 'Mensual', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'basura-industrial', nombre: 'Cuota mensual de recolección de basura industrial', descripcion: 'Residuos especiales de manufactura', dependencia: DEP_SERVICIOS, monto: 'Según volumen y tipo', periodicidad: 'Mensual', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'recoleccion-especial', nombre: 'Servicio especial de recolección', descripcion: 'Escombros, poda y voluminosos', dependencia: DEP_SERVICIOS, monto: 'Por servicio', periodicidad: 'Por solicitud', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'disposicion-final', nombre: 'Disposición final de residuos', descripcion: 'Relleno sanitario municipal', dependencia: DEP_SERVICIOS, monto: 'Por tonelada', periodicidad: 'Por servicio', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'limpieza-baldios', nombre: 'Limpieza de lotes baldíos', descripcion: 'A cargo del propietario, cobrado por el municipio', dependencia: DEP_SERVICIOS, monto: 'Por m²', periodicidad: 'Por solicitud', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'panteones', nombre: 'Inhumación (sepelio)', descripcion: 'Servicio de entierro en panteones municipales', dependencia: DEP_SERVICIOS, monto: 'Por servicio', periodicidad: 'Por evento', status: 'disponible', grupo: 'servicios', categoria: 'municipal' },
  { id: 'exhumacion', nombre: 'Exhumación', descripcion: 'Retiro de restos', dependencia: DEP_SERVICIOS, monto: 'Por servicio', periodicidad: 'Por evento', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'cremacion', nombre: 'Cremación', descripcion: 'Servicio de cremación municipal', dependencia: DEP_SERVICIOS, monto: 'Por servicio', periodicidad: 'Por evento', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'concesion-panteon', nombre: 'Concesión de espacio en panteón', descripcion: 'Anual o perpetua', dependencia: DEP_SERVICIOS, monto: 'Según tipo de concesión', periodicidad: 'Anual', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'mantenimiento-cripta', nombre: 'Mantenimiento de cripta o nicho', descripcion: 'Servicio anual de conservación', dependencia: DEP_SERVICIOS, monto: 'Cuota anual', periodicidad: 'Anual', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'mercado_municipal', nombre: 'Renta de local en mercado público', descripcion: 'Pago de renta por locales en mercados municipales de Tepic', dependencia: DEP_SERVICIOS, monto: 'Por local / mensual', periodicidad: 'Mensual', status: 'disponible', grupo: 'servicios', categoria: 'municipal' },
  { id: 'piso-mercado', nombre: 'Derecho de piso en mercado', descripcion: 'Cuota diaria por espacio de venta', dependencia: DEP_SERVICIOS, monto: 'Tarifa diaria', periodicidad: 'Diario', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },
  { id: 'limpieza-mercado', nombre: 'Cuota de limpieza en mercado', descripcion: 'Mantenimiento de áreas comunes', dependencia: DEP_SERVICIOS, monto: 'Cuota mensual', periodicidad: 'Mensual', status: 'proximo', grupo: 'servicios', categoria: 'municipal' },

  // ── 7. TRÁMITES ADMINISTRATIVOS Y CERTIFICADOS ───────────────
  { id: 'libertad-gravamen', nombre: 'Certificado de libertad de gravamen municipal', descripcion: 'Para predios sin adeudos ni gravámenes', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'catastro', nombre: 'Constancia de no adeudo predial', descripcion: 'Constancias de valor catastral para ventas y escrituración', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'disponible', grupo: 'tramites', categoria: 'municipal' },
  { id: 'no-adeudo-agua', nombre: 'Constancia de no adeudo de agua', descripcion: 'Para ventas de inmuebles', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'certificado-zonificacion', nombre: 'Certificado de zonificación', descripcion: 'Uso de suelo permitido en el predio', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'constancia-alineamiento', nombre: 'Constancia de alineamiento', descripcion: 'Retiros y linderos del predio', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'copia-actas-cabildo', nombre: 'Copia certificada de actas de cabildo', descripcion: 'Actas municipales oficiales', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'certificado-residencia', nombre: 'Certificado de residencia', descripcion: 'Antigüedad de residencia en el municipio', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'buen-comportamiento', nombre: 'Constancia de buen comportamiento', descripcion: 'Para trámites laborales', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'legalizacion-firmas', nombre: 'Legalización de firmas', descripcion: 'Autenticación de documentos', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'cotejo-documentos', nombre: 'Cotejo de documentos', descripcion: 'Comparación con originales', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },
  { id: 'certificacion-documentos', nombre: 'Certificación de documentos administrativos', descripcion: 'Copias certificadas oficiales', dependencia: DEP_TRAMITES, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'tramites', categoria: 'municipal' },

  // ── 8. ESPECTÁCULOS Y EVENTOS ─────────────────────────────────
  { id: 'eventos', nombre: 'Permiso para eventos culturales', descripcion: 'Autorización para teatros, conciertos y espectáculos', dependencia: DEP_ESPECTACULOS, monto: 'Según tipo y aforo', periodicidad: 'Por evento', status: 'disponible', grupo: 'espectaculos', categoria: 'municipal' },
  { id: 'eventos-deportivos', nombre: 'Permiso para eventos deportivos', descripcion: 'Torneos y carreras públicas', dependencia: DEP_ESPECTACULOS, monto: 'Según tipo y aforo', periodicidad: 'Por evento', status: 'proximo', grupo: 'espectaculos', categoria: 'municipal' },
  { id: 'fiestas-patronales', nombre: 'Permiso para fiestas patronales', descripcion: 'Verbenas populares y ferias tradicionales', dependencia: DEP_ESPECTACULOS, monto: 'Según duración y aforo', periodicidad: 'Por evento', status: 'proximo', grupo: 'espectaculos', categoria: 'municipal' },
  { id: 'espectaculos-taurinos', nombre: 'Permiso para espectáculos taurinos', descripcion: 'Corridas de toros y jaripeos', dependencia: DEP_ESPECTACULOS, monto: 'Según aforo', periodicidad: 'Por evento', status: 'proximo', grupo: 'espectaculos', categoria: 'municipal' },
  { id: 'rifas-sorteos', nombre: 'Permiso para rifas y sorteos', descripcion: 'Con fines lucrativos', dependencia: DEP_ESPECTACULOS, monto: 'Según monto en juego', periodicidad: 'Por evento', status: 'proximo', grupo: 'espectaculos', categoria: 'municipal' },

  // ── 9. HOSPEDAJE Y TURISMO ─────────────────────────────────────
  { id: 'impuesto-hospedaje', nombre: 'Impuesto sobre hospedaje', descripcion: 'Sobre tarifa de hoteles y plataformas tipo Airbnb', dependencia: DEP_HOSPEDAJE, monto: '2%-3% sobre tarifa', periodicidad: 'Mensual', status: 'proximo', grupo: 'hospedaje', categoria: 'municipal' },
  { id: 'verificacion-hoteles', nombre: 'Derecho por verificación de hoteles', descripcion: 'Inspección anual de establecimientos', dependencia: DEP_HOSPEDAJE, monto: 'Tarifa fija', periodicidad: 'Anual', status: 'proximo', grupo: 'hospedaje', categoria: 'municipal' },
  { id: 'operacion-cabanas', nombre: 'Permiso para operación de cabañas', descripcion: 'Hospedaje en zonas turísticas', dependencia: DEP_HOSPEDAJE, monto: 'Según capacidad', periodicidad: 'Anual', status: 'proximo', grupo: 'hospedaje', categoria: 'municipal' },
  { id: 'operadores-turisticos', nombre: 'Permiso para operadores turísticos', descripcion: 'Guías y agencias de turismo', dependencia: DEP_HOSPEDAJE, monto: 'Tarifa fija', periodicidad: 'Anual', status: 'proximo', grupo: 'hospedaje', categoria: 'municipal' },

  // ── 10. MEDIO AMBIENTE Y ECOLOGÍA ──────────────────────────────
  { id: 'impacto-ambiental', nombre: 'Autorización de impacto ambiental municipal', descripcion: 'Proyectos locales sujetos a evaluación', dependencia: DEP_AMBIENTE, monto: 'Según magnitud del proyecto', periodicidad: 'Por trámite', status: 'proximo', grupo: 'ambiente', categoria: 'municipal' },
  { id: 'actividades-riesgosas', nombre: 'Licencia de funcionamiento para actividades riesgosas', descripcion: 'Gasolineras y giros de alto riesgo', dependencia: DEP_AMBIENTE, monto: 'Según giro', periodicidad: 'Anual', status: 'proximo', grupo: 'ambiente', categoria: 'municipal' },
  { id: 'poda-arboles', nombre: 'Permiso para poda de árboles', descripcion: 'En propiedad privada', dependencia: DEP_AMBIENTE, monto: 'Tarifa fija', periodicidad: 'Por trámite', status: 'proximo', grupo: 'ambiente', categoria: 'municipal' },
  { id: 'tala-arboles', nombre: 'Permiso para tala de árboles', descripcion: 'Casos especiales autorizados', dependencia: DEP_AMBIENTE, monto: 'Según número de árboles', periodicidad: 'Por trámite', status: 'proximo', grupo: 'ambiente', categoria: 'municipal' },
  { id: 'multa-areas-verdes', nombre: 'Multa por daño a áreas verdes', descripcion: 'Sanciones ambientales municipales', dependencia: DEP_AMBIENTE, monto: 'Según daño causado', periodicidad: 'Por evento', status: 'proximo', grupo: 'ambiente', categoria: 'municipal' },

  // ── 11. OTROS INGRESOS ─────────────────────────────────────────
  { id: 'venta-bienes-muebles', nombre: 'Venta de bienes muebles', descripcion: 'Subastas de vehículos y equipos municipales', dependencia: DEP_OTROS, monto: 'Según subasta', periodicidad: 'Eventual', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'renta-inmuebles', nombre: 'Renta de inmuebles municipales', descripcion: 'Locales y edificios del municipio', dependencia: DEP_OTROS, monto: 'Cuota mensual', periodicidad: 'Mensual', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'renta-maquinaria', nombre: 'Renta de maquinaria y equipo', descripcion: 'Retroexcavadoras, camiones y equipo pesado', dependencia: DEP_OTROS, monto: 'Tarifa por día de uso', periodicidad: 'Por servicio', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'aprovechamientos-diversos', nombre: 'Aprovechamientos por servicios diversos', descripcion: 'Trámites no catalogados en otras categorías', dependencia: DEP_OTROS, monto: 'Según trámite', periodicidad: 'Por trámite', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'participaciones-federales', nombre: 'Participación en ingresos federales (Ramo 33)', descripcion: 'Aportaciones federales al municipio', dependencia: DEP_OTROS, monto: 'Transferencia federal', periodicidad: 'Mensual', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'convenios-colaboracion', nombre: 'Convenios de colaboración', descripcion: 'Con otros órdenes de gobierno', dependencia: DEP_OTROS, monto: 'Según convenio', periodicidad: 'Variable', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'donaciones', nombre: 'Donaciones recibidas', descripcion: 'De particulares o empresas', dependencia: DEP_OTROS, monto: 'Variable', periodicidad: 'Eventual', status: 'proximo', grupo: 'otros', categoria: 'municipal' },
  { id: 'multas-administrativas', nombre: 'Multas por faltas administrativas', descripcion: 'Infracciones menores al bando municipal', dependencia: DEP_OTROS, monto: 'Según falta', periodicidad: 'Por evento', status: 'proximo', grupo: 'otros', categoria: 'municipal' },

  // ── ESTATALES (hoja de ruta — sin cambios) ────────────────────
  { id: 'tenencia', nombre: 'Tenencia Vehicular', descripcion: 'Impuesto sobre la tenencia y uso de vehículos — Gobierno de Nayarit', dependencia: 'Secretaría de Finanzas Nayarit', monto: 'Según valor del vehículo', periodicidad: 'Anual', status: 'proximo', grupo: 'estatal', categoria: 'estatal', tag: 'Próximo' },
  { id: 'refrendo', nombre: 'Refrendo de Placas', descripcion: 'Renovación anual de placas vehiculares del Estado de Nayarit', dependencia: 'Secretaría de Finanzas Nayarit', monto: 'Tarifa fija anual', periodicidad: 'Anual', status: 'proximo', grupo: 'estatal', categoria: 'estatal' },
  { id: 'actas_estado', nombre: 'Actas del Registro Civil', descripcion: 'Nacimiento, matrimonio, defunción y demás constancias del Registro Civil Estatal', dependencia: 'Registro Civil Nayarit', monto: 'Por tipo de acta', periodicidad: 'Por trámite', status: 'proximo', grupo: 'estatal', categoria: 'estatal' },
  { id: 'infraestructura_estatal', nombre: 'Derechos de Infraestructura Estatal', descripcion: 'Aprovechamiento de vías estatales, concesiones y permisos de carreteras de Nayarit', dependencia: 'SIOP Nayarit', monto: 'Según concesión', periodicidad: 'Anual', status: 'proximo', grupo: 'estatal', categoria: 'estatal' },
  { id: 'salud_estatal', nombre: 'Servicios de Salud Estatales', descripcion: 'Cuotas de recuperación en hospitales y clínicas del ISSSTEEN / SSN de Nayarit', dependencia: 'Secretaría de Salud Nayarit', monto: 'Por servicio', periodicidad: 'Por evento', status: 'proximo', grupo: 'estatal', categoria: 'estatal' },
];
