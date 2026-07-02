import React, { useState } from 'react';
import {
  CreditCard, Search, Home, Droplets,
  HardHat, Leaf, Car, ShoppingBag, GraduationCap,
  HeartHandshake, Building2, FileText,
  Clock, ChevronRight, Shield,
  Landmark, Package, Coins, AlertCircle, QrCode,
  Store, Smartphone, Banknote, CheckCircle2, X
} from 'lucide-react';
import { cn } from '../../lib/utils';

type PagoCategoria = 'todos' | 'municipal' | 'estatal';
type PagoStatus = 'disponible' | 'proximo';

interface Pago {
  id: string;
  nombre: string;
  descripcion: string;
  dependencia: string;
  monto: string;
  periodicidad: string;
  status: PagoStatus;
  icon: React.ElementType;
  color: string;
  categoria: 'municipal' | 'estatal';
  tag?: string;
}

const PAGOS: Pago[] = [
  // ── MUNICIPALES ──────────────────────────────────────────────
  {
    id: 'predial',
    nombre: 'Predial',
    descripcion: 'Impuesto sobre la propiedad inmobiliaria urbana y rural',
    dependencia: 'Tesorería Municipal',
    monto: 'Según valor catastral',
    periodicidad: 'Semestral',
    status: 'disponible',
    icon: Home,
    color: 'text-emerald-400',
    categoria: 'municipal',
    tag: 'Más pagado',
  },
  {
    id: 'agua',
    nombre: 'Servicio de Agua Potable',
    descripcion: 'Agua y drenaje — COAPATAP / Sistema Municipal de Agua',
    dependencia: 'Tesorería Municipal',
    monto: 'Por consumo bimestral',
    periodicidad: 'Bimestral',
    status: 'disponible',
    icon: Droplets,
    color: 'text-blue-400',
    categoria: 'municipal',
    tag: 'Alta demanda',
  },
  {
    id: 'licencia_negocio',
    nombre: 'Licencia de Funcionamiento',
    descripcion: 'Apertura y renovación de negocios comerciales y de servicios',
    dependencia: 'Desarrollo Económico',
    monto: 'Según giro y m²',
    periodicidad: 'Anual',
    status: 'disponible',
    icon: ShoppingBag,
    color: 'text-amber-400',
    categoria: 'municipal',
  },
  {
    id: 'licencia_construccion',
    nombre: 'Licencia de Construcción',
    descripcion: 'Permiso para obra nueva, ampliación o remodelación',
    dependencia: 'Obras Públicas',
    monto: 'Por m² de construcción',
    periodicidad: 'Por trámite',
    status: 'disponible',
    icon: HardHat,
    color: 'text-orange-400',
    categoria: 'municipal',
  },
  {
    id: 'uso_suelo',
    nombre: 'Cambio de Uso de Suelo',
    descripcion: 'Autorización para modificar la clasificación catastral del predio',
    dependencia: 'Ordenamiento Territorial',
    monto: 'Según tipo de cambio',
    periodicidad: 'Por trámite',
    status: 'disponible',
    icon: FileText,
    color: 'text-indigo-400',
    categoria: 'municipal',
  },
  {
    id: 'infracciones_transito',
    nombre: 'Infracciones de Tránsito',
    descripcion: 'Pago de multas de vialidad y restricciones de circulación',
    dependencia: 'Seguridad Pública y Vialidad',
    monto: 'Según infracción',
    periodicidad: 'Por evento',
    status: 'disponible',
    icon: Car,
    color: 'text-rose-400',
    categoria: 'municipal',
  },
  {
    id: 'mercado_municipal',
    nombre: 'Derechos de Mercado',
    descripcion: 'Pago de renta por locales en mercados municipales de Tepic',
    dependencia: 'Servicios Públicos Municipales',
    monto: 'Por local / mensual',
    periodicidad: 'Mensual',
    status: 'disponible',
    icon: Package,
    color: 'text-cyan-400',
    categoria: 'municipal',
  },
  {
    id: 'anuncios',
    nombre: 'Publicidad Exterior y Anuncios',
    descripcion: 'Registro y derechos por anuncios espectaculares, lonas y banners en vía pública',
    dependencia: 'Servicios Públicos Municipales',
    monto: 'Por m² y tipo de anuncio',
    periodicidad: 'Anual',
    status: 'disponible',
    icon: Building2,
    color: 'text-purple-400',
    categoria: 'municipal',
  },
  {
    id: 'panteones',
    nombre: 'Servicios de Panteón',
    descripcion: 'Inhumaciones, exhumaciones y concesión de gavetas municipales',
    dependencia: 'Servicios Públicos Municipales',
    monto: 'Por servicio',
    periodicidad: 'Por evento',
    status: 'disponible',
    icon: Leaf,
    color: 'text-slate-400',
    categoria: 'municipal',
  },
  {
    id: 'catastro',
    nombre: 'Trámites Catastrales',
    descripcion: 'Constancias de valor catastral, escrituración, fusión o subdivisión de predios',
    dependencia: 'Catastro Municipal',
    monto: 'Por tipo de trámite',
    periodicidad: 'Por trámite',
    status: 'disponible',
    icon: Coins,
    color: 'text-yellow-400',
    categoria: 'municipal',
  },
  {
    id: 'eventos',
    nombre: 'Permisos de Eventos',
    descripcion: 'Autorización para eventos públicos, ferias, conciertos y espectáculos',
    dependencia: 'Secretaría del Ayuntamiento',
    monto: 'Según tipo y aforo',
    periodicidad: 'Por evento',
    status: 'disponible',
    icon: GraduationCap,
    color: 'text-pink-400',
    categoria: 'municipal',
  },

  // ── ESTATALES (futuros) ───────────────────────────────────────
  {
    id: 'tenencia',
    nombre: 'Tenencia Vehicular',
    descripcion: 'Impuesto sobre la tenencia y uso de vehículos — Gobierno de Nayarit',
    dependencia: 'Secretaría de Finanzas Nayarit',
    monto: 'Según valor del vehículo',
    periodicidad: 'Anual',
    status: 'proximo',
    icon: Car,
    color: 'text-blue-300',
    categoria: 'estatal',
    tag: 'Próximo',
  },
  {
    id: 'refrendo',
    nombre: 'Refrendo de Placas',
    descripcion: 'Renovación anual de placas vehiculares del Estado de Nayarit',
    dependencia: 'Secretaría de Finanzas Nayarit',
    monto: 'Tarifa fija anual',
    periodicidad: 'Anual',
    status: 'proximo',
    icon: Shield,
    color: 'text-blue-300',
    categoria: 'estatal',
  },
  {
    id: 'actas_estado',
    nombre: 'Actas del Registro Civil',
    descripcion: 'Nacimiento, matrimonio, defunción y demás constancias del Registro Civil Estatal',
    dependencia: 'Registro Civil Nayarit',
    monto: 'Por tipo de acta',
    periodicidad: 'Por trámite',
    status: 'proximo',
    icon: FileText,
    color: 'text-indigo-300',
    categoria: 'estatal',
  },
  {
    id: 'infraestructura_estatal',
    nombre: 'Derechos de Infraestructura Estatal',
    descripcion: 'Aprovechamiento de vías estatales, concesiones y permisos de carreteras de Nayarit',
    dependencia: 'SIOP Nayarit',
    monto: 'Según concesión',
    periodicidad: 'Anual',
    status: 'proximo',
    icon: HardHat,
    color: 'text-amber-300',
    categoria: 'estatal',
  },
  {
    id: 'salud_estatal',
    nombre: 'Servicios de Salud Estatales',
    descripcion: 'Cuotas de recuperación en hospitales y clínicas del ISSSTEEN / SSN de Nayarit',
    dependencia: 'Secretaría de Salud Nayarit',
    monto: 'Por servicio',
    periodicidad: 'Por evento',
    status: 'proximo',
    icon: HeartHandshake,
    color: 'text-rose-300',
    categoria: 'estatal',
  },
];

function OxxoModal({ pago, onClose }: { pago: Pago; onClose: () => void }) {
  const ref = `TEP${Date.now().toString().slice(-12)}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#161920] border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-red-500" />
            <span className="text-sm font-bold text-white">Pagar en OXXO</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs text-slate-500 mb-1">Concepto de pago</p>
            <p className="text-sm font-bold text-white">{pago.nombre}</p>
            <p className="text-xs text-slate-500">{pago.dependencia}</p>
          </div>

          {/* QR placeholder */}
          <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-3">
            <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <QrCode className="w-24 h-24 text-slate-800" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                  <Store className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center">Escanea este QR en la terminal del cajero OXXO</p>
          </div>

          {/* Reference */}
          <div className="bg-slate-900 rounded-xl p-4">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">O usa esta referencia de pago</p>
            <p className="text-xl font-mono font-black text-white tracking-widest">{ref}</p>
            <p className="text-[9px] text-slate-600 mt-1">Dicta al cajero o escanea el QR</p>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {[
              'Ve a cualquier tienda OXXO en Tepic',
              'Di "Pago de servicio" al cajero',
              'Muestra el QR o dicta la referencia',
              'Paga en efectivo — recibe tu comprobante',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[9px] font-black text-red-400">{i + 1}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="text-[10px] text-slate-500">El pago se registra automáticamente en el sistema municipal en menos de 5 minutos. Sin filas. Sin ventanillas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PagosView() {
  const [categoria, setCategoria] = useState<PagoCategoria>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [pagoSeleccionado, setPagoSeleccionado] = useState<Pago | null>(null);

  const municipales = PAGOS.filter(p => p.categoria === 'municipal');
  const estatales = PAGOS.filter(p => p.categoria === 'estatal');
  const disponibles = PAGOS.filter(p => p.status === 'disponible');

  const filtrados = PAGOS.filter(p => {
    const matchCategoria = categoria === 'todos' || p.categoria === categoria;
    const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.dependencia.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <>
    {pagoSeleccionado && (
      <OxxoModal pago={pagoSeleccionado} onClose={() => setPagoSeleccionado(null)} />
    )}
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em]">
          Plataforma de Recaudación · Nayarit Digital
        </p>
        <h3 className="text-4xl font-serif font-black text-white tracking-tighter">
          Catálogo Único de Pagos
        </h3>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          Un solo acceso para todos los pagos municipales — y en el futuro, estatales.
          Sin filas. Sin ventanillas. Sin excusas.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#161920] border border-slate-800 p-4 rounded-xl">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total de pagos</p>
          <p className="text-3xl font-serif font-black text-white">{PAGOS.length}</p>
          <p className="text-xs text-slate-600 mt-0.5">en catálogo</p>
        </div>
        <div className="bg-[#161920] border border-emerald-500/20 p-4 rounded-xl">
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-1">Disponibles hoy</p>
          <p className="text-3xl font-serif font-black text-emerald-400">{disponibles.length}</p>
          <p className="text-xs text-slate-600 mt-0.5">municipales activos</p>
        </div>
        <div className="bg-[#161920] border border-blue-500/20 p-4 rounded-xl">
          <p className="text-[10px] text-blue-500 uppercase tracking-widest mb-1">Municipales</p>
          <p className="text-3xl font-serif font-black text-blue-400">{municipales.length}</p>
          <p className="text-xs text-slate-600 mt-0.5">H. Ayuntamiento Tepic</p>
        </div>
        <div className="bg-[#161920] border border-violet-500/20 p-4 rounded-xl">
          <p className="text-[10px] text-violet-500 uppercase tracking-widest mb-1">Estatales (hoja de ruta)</p>
          <p className="text-3xl font-serif font-black text-violet-400">{estatales.length}</p>
          <p className="text-xs text-slate-600 mt-0.5">Gobierno de Nayarit</p>
        </div>
      </div>

      {/* OXXO Banner */}
      <div className="bg-gradient-to-r from-red-600/10 via-red-500/5 to-transparent border border-red-500/20 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-red-600/20 flex-shrink-0">
            <Store className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white mb-1">
              Todos los pagos municipales se pueden pagar en OXXO con QR
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Sin cuenta de banco. Sin app de pagos. El ciudadano selecciona su pago aquí, genera un QR
              o referencia numérica, y lo paga en efectivo en cualquier OXXO de Tepic. El pago se registra
              automáticamente en el sistema municipal en menos de 5 minutos.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: QrCode, label: 'QR único por pago', color: 'text-red-400' },
                { icon: Store, label: 'Cualquier OXXO', color: 'text-red-400' },
                { icon: Banknote, label: 'Pago en efectivo', color: 'text-red-400' },
                { icon: Smartphone, label: 'Confirmación instantánea', color: 'text-red-400' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className={cn('w-3.5 h-3.5', color)} />
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar pago o dependencia..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full bg-[#161920] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['todos', 'municipal', 'estatal'] as PagoCategoria[]).map(c => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all',
                categoria === c
                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                  : 'bg-[#161920] border-slate-800 text-slate-500 hover:text-slate-300'
              )}
            >
              {c === 'todos' ? 'Todos' : c === 'municipal' ? 'Municipal' : 'Estatal'}
            </button>
          ))}
        </div>
      </div>

      {/* Payment grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map(pago => (
          <div
            key={pago.id}
            className={cn(
              'bg-[#161920] border rounded-xl p-5 transition-all group hover:bg-[#1c2030]',
              pago.status === 'disponible' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-800/50 opacity-70'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-800/60">
                  <pago.icon className={cn('w-4 h-4', pago.color)} />
                </div>
                <div>
                  <p className={cn('text-[9px] font-bold uppercase tracking-widest',
                    pago.categoria === 'municipal' ? 'text-blue-500' : 'text-violet-500'
                  )}>
                    {pago.categoria}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {pago.tag && (
                  <span className={cn(
                    'text-[9px] font-bold px-1.5 py-0.5 rounded-full',
                    pago.status === 'disponible'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  )}>
                    {pago.tag}
                  </span>
                )}
                {pago.status === 'disponible' ? (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ) : (
                  <Clock className="w-3 h-3 text-amber-400" />
                )}
              </div>
            </div>

            <h5 className="text-sm font-bold text-white mb-1">{pago.nombre}</h5>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{pago.descripcion}</p>

            <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-600 uppercase tracking-widest">Dependencia</span>
                <span className="text-[10px] text-slate-400 font-medium text-right">{pago.dependencia}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-600 uppercase tracking-widest">Monto</span>
                <span className={cn('text-[10px] font-bold', pago.color)}>{pago.monto}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-600 uppercase tracking-widest">Frecuencia</span>
                <span className="text-[10px] text-slate-400">{pago.periodicidad}</span>
              </div>
            </div>

            {pago.status === 'disponible' && (
              <button
                onClick={() => setPagoSeleccionado(pago)}
                className={cn(
                  'mt-4 w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all',
                  'bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 text-red-300 hover:text-red-200'
                )}
              >
                <Store className="w-3 h-3" />
                Generar QR OXXO
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            {pago.status === 'proximo' && (
              <div className="mt-4 w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-500/60">
                <Clock className="w-3 h-3" />
                Disponible en siguiente fase
              </div>
            )}
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="text-center py-12 text-slate-600">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No se encontraron pagos para "{busqueda}"</p>
        </div>
      )}

      {/* Roadmap note */}
      <div className="bg-[#161920] border border-violet-500/10 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-violet-400" />
          <p className="text-xs font-bold text-slate-300">Hoja de ruta: de municipal a estatal</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { fase: 'Fase 1', titulo: 'Municipal · Tepic', desc: `${municipales.length} pagos del H. Ayuntamiento integrados en un solo portal`, color: 'text-emerald-400', status: 'En curso' },
            { fase: 'Fase 2', titulo: 'Nayarit Estatal', desc: `${estatales.length}+ pagos del Gobierno del Estado (finanzas, movilidad, registro civil)`, color: 'text-blue-400', status: 'Hoja de ruta' },
            { fase: 'Fase 3', titulo: 'Pagos Federales CEDN', desc: 'Interoperabilidad con Llave MX para pagos SAT, IMSS e INFONAVIT', color: 'text-violet-400', status: 'Visión' },
          ].map(f => (
            <div key={f.fase} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={cn('text-[9px] font-black uppercase tracking-widest', f.color)}>{f.fase}</span>
                <span className="text-[9px] text-slate-600">{f.status}</span>
              </div>
              <p className="text-xs font-bold text-white">{f.titulo}</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 pt-3 border-t border-slate-800">
          <AlertCircle className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-slate-600 leading-relaxed">
            La integración estatal requiere convenio de colaboración con la Secretaría de Finanzas de Nayarit
            y alta como proveedor de pagos electrónicos ante la Tesorería del Estado. Marco legal: LGTAIP Art. 70,
            Ley de Ingresos Municipal vigente, LNETB Art. 74 (interoperabilidad con Llave MX).
          </p>
        </div>
      </div>

    </div>
    </>
  );
}
