// Arts. 51-54 LNETB: Catálogo completo de trámites municipales para el ciudadano.
// Cada trámite muestra requisitos, costos, plazos y permite iniciar el trámite en línea.

import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, Clock, Coins, FileText, CheckCircle2, Calendar, ArrowRight, Star, Building2, Droplets, Stethoscope, TreePine, BookOpen, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Categoria = 'popular' | 'hacienda' | 'desarrollo' | 'servicios' | 'salud' | 'registro';

interface Tramite {
  id: string;
  nombre: string;
  categoria: Categoria;
  costo: string;
  plazo: string;
  descripcion: string;
  requisitos: string[];
  enLinea: boolean;
  popular?: boolean;
}

const TRAMITES: Tramite[] = [
  {
    id: 'HAC-001',
    nombre: 'Pago de Predial',
    categoria: 'hacienda',
    costo: 'Variable según valor catastral',
    plazo: 'Inmediato',
    descripcion: 'Pago anual del impuesto predial. Puedes pagarlo en línea en cualquier momento.',
    requisitos: ['Número de cuenta catastral', 'CURP o RFC'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'HAC-002',
    nombre: 'Pago de Derechos de Agua',
    categoria: 'hacienda',
    costo: 'Variable por consumo',
    plazo: 'Inmediato',
    descripcion: 'Pago mensual del servicio de agua potable y drenaje.',
    requisitos: ['Número de contrato', 'Identificación oficial'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'HAC-003',
    nombre: 'Licencia de Funcionamiento',
    categoria: 'hacienda',
    costo: '$1,200 – $8,500 MXN según giro',
    plazo: '5 días hábiles',
    descripcion: 'Permiso anual para operar un negocio en el municipio de Tepic.',
    requisitos: ['CURP / RFC', 'Acta constitutiva (persona moral)', 'Constancia de uso de suelo', 'Identificación oficial', 'Comprobante de domicilio fiscal'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'HAC-004',
    nombre: 'Renovación de Licencia de Funcionamiento',
    categoria: 'hacienda',
    costo: '$600 – $4,200 MXN según giro',
    plazo: '3 días hábiles',
    descripcion: 'Renovación anual de la licencia de funcionamiento vigente.',
    requisitos: ['Licencia anterior', 'CURP / RFC', 'Comprobante de pago anterior'],
    enLinea: true,
  },
  {
    id: 'HAC-005',
    nombre: 'Pago de Multas de Tránsito',
    categoria: 'hacienda',
    costo: 'Según infracción',
    plazo: 'Inmediato',
    descripcion: 'Pago de infracciones de tránsito emitidas por la Policía Vial.',
    requisitos: ['Folio de infracción', 'Identificación oficial'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'DES-001',
    nombre: 'Licencia de Construcción',
    categoria: 'desarrollo',
    costo: 'Variable según m²',
    plazo: '10 días hábiles',
    descripcion: 'Autorización para iniciar una obra nueva o ampliación.',
    requisitos: ['Planos firmados por DRO', 'Constancia de uso de suelo', 'CURP / RFC', 'Boleta predial al corriente'],
    enLinea: false,
    popular: true,
  },
  {
    id: 'DES-002',
    nombre: 'Constancia de Uso de Suelo',
    categoria: 'desarrollo',
    costo: '$350 MXN',
    plazo: '5 días hábiles',
    descripcion: 'Documento que certifica el uso permitido para un predio.',
    requisitos: ['Croquis de ubicación', 'Escritura o contrato', 'Identificación oficial'],
    enLinea: false,
  },
  {
    id: 'DES-003',
    nombre: 'Alineamiento y Número Oficial',
    categoria: 'desarrollo',
    costo: '$200 MXN',
    plazo: '3 días hábiles',
    descripcion: 'Certificado que indica la línea de construcción y asigna número oficial al predio.',
    requisitos: ['Boleta predial', 'Identificación oficial', 'Croquis de ubicación'],
    enLinea: false,
  },
  {
    id: 'SER-001',
    nombre: 'Reporte de Bache o Daño en Vía',
    categoria: 'servicios',
    costo: 'Gratuito',
    plazo: '48–72 horas',
    descripcion: 'Reporte ciudadano de baches, luminarias dañadas, fugas o acumulación de basura.',
    requisitos: ['Ubicación (GPS automático)', 'Foto del problema (opcional)'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'SER-002',
    nombre: 'Solicitud de Poda o Retiro de Árbol',
    categoria: 'servicios',
    costo: 'Gratuito',
    plazo: '5–10 días hábiles',
    descripcion: 'Solicitud para poda de árboles en vía pública o retiro de árbol en riesgo.',
    requisitos: ['Dirección exacta', 'Foto (opcional)', 'Motivo de la solicitud'],
    enLinea: true,
  },
  {
    id: 'SAL-001',
    nombre: 'Orientación Médica Digital (Triaje IA)',
    categoria: 'salud',
    costo: 'Gratuito',
    plazo: 'Inmediato (IA 24/7)',
    descripcion: 'Evaluación de síntomas con IA y derivación al servicio médico correcto.',
    requisitos: ['Nayarit ID o CURP'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'SAL-002',
    nombre: 'Inscripción a Programa de Bienestar Social',
    categoria: 'salud',
    costo: 'Gratuito',
    plazo: '15 días hábiles (evaluación)',
    descripcion: 'Inscripción a programas de becas, despensas y apoyos del DIF Municipal.',
    requisitos: ['CURP', 'Comprobante de domicilio', 'Identificación oficial', 'Estudio socioeconómico'],
    enLinea: true,
  },
  {
    id: 'REG-001',
    nombre: 'Copia Certificada de Acta de Nacimiento',
    categoria: 'registro',
    costo: '$50 MXN',
    plazo: 'Inmediato (digital) / 1 día (física)',
    descripcion: 'Expedición de copia certificada del acta de nacimiento.',
    requisitos: ['CURP', 'Datos completos del registrado'],
    enLinea: true,
    popular: true,
  },
  {
    id: 'REG-002',
    nombre: 'Copia Certificada de Acta de Matrimonio',
    categoria: 'registro',
    costo: '$80 MXN',
    plazo: '1 día hábil',
    descripcion: 'Expedición de copia certificada del acta de matrimonio.',
    requisitos: ['CURP de ambos contrayentes', 'Número de acta o fecha aproximada'],
    enLinea: true,
  },
];

const CATEGORIAS: { id: Categoria | 'todos'; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'todos', label: 'Todos', icon: <FileText size={14} />, color: 'bg-slate-800 text-slate-300' },
  { id: 'popular', label: 'Populares', icon: <Star size={14} />, color: 'bg-amber-500/20 text-amber-400' },
  { id: 'hacienda', label: 'Hacienda', icon: <Building2 size={14} />, color: 'bg-emerald-500/20 text-emerald-400' },
  { id: 'desarrollo', label: 'Urbano', icon: <TreePine size={14} />, color: 'bg-blue-500/20 text-blue-400' },
  { id: 'servicios', label: 'Servicios', icon: <Droplets size={14} />, color: 'bg-cyan-500/20 text-cyan-400' },
  { id: 'salud', label: 'Salud', icon: <Stethoscope size={14} />, color: 'bg-rose-500/20 text-rose-400' },
  { id: 'registro', label: 'Registro Civil', icon: <BookOpen size={14} />, color: 'bg-purple-500/20 text-purple-400' },
];

interface TramitesCatalogoViewProps {
  onBack: () => void;
  onStartTramite?: (tramite: Tramite) => void;
}

export function TramitesCatalogoView({ onBack, onStartTramite }: TramitesCatalogoViewProps) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<Categoria | 'todos'>('todos');
  const [selected, setSelected] = useState<Tramite | null>(null);

  const filtered = TRAMITES.filter(t => {
    const matchSearch = t.nombre.toLowerCase().includes(search.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'todos'
      ? true
      : catFilter === 'popular'
        ? !!t.popular
        : t.categoria === catFilter;
    return matchSearch && matchCat;
  });

  if (selected) {
    return <TramiteDetalleView tramite={selected} onBack={() => setSelected(null)} onStart={() => onStartTramite?.(selected)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-14 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-100">
            <ChevronLeft size={18} className="text-slate-700" />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900">Catálogo de Trámites</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Arts. 51-54 LNETB · {TRAMITES.length} trámites</p>
          </div>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar trámite o servicio..."
            className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto px-5 py-3 no-scrollbar bg-white border-b border-slate-100">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCatFilter(cat.id as any)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all',
              catFilter === cat.id ? cat.color + ' ring-1 ring-current' : 'bg-slate-100 text-slate-500'
            )}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 px-4 py-4 space-y-3 pb-28">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold">No se encontraron trámites</p>
          </div>
        ) : (
          filtered.map(tramite => (
            <motion.button
              key={tramite.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelected(tramite)}
              className="w-full bg-white rounded-[1.5rem] border border-slate-100 p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left active:scale-[0.98]"
            >
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                tramite.enLinea ? 'bg-emerald-50' : 'bg-slate-50'
              )}>
                {tramite.enLinea
                  ? <ShieldCheck size={20} className="text-emerald-500" />
                  : <Building2 size={20} className="text-slate-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{tramite.nombre}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock size={10} /> {tramite.plazo}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Coins size={10} /> {tramite.costo}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                {tramite.enLinea && (
                  <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    En línea
                  </span>
                )}
                <ChevronRight size={14} className="text-slate-300" />
              </div>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}

function TramiteDetalleView({ tramite, onBack, onStart }: { tramite: Tramite; onBack: () => void; onStart?: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-14 pb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <ChevronLeft size={16} /> Catálogo de trámites
        </button>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tramite.id}</span>
        <h2 className="text-xl font-black text-slate-900 mt-1 leading-tight">{tramite.nombre}</h2>
        {tramite.enLinea && (
          <span className="inline-flex items-center gap-1 mt-2 text-[9px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-widest">
            <ShieldCheck size={10} /> Disponible en línea · LNETB
          </span>
        )}
      </div>

      <div className="flex-1 px-5 py-5 space-y-5 pb-36">
        {/* Descripción */}
        <p className="text-sm text-slate-600 leading-relaxed">{tramite.descripcion}</p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <Clock size={16} className="text-blue-500 mb-2" />
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Plazo</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{tramite.plazo}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <Coins size={16} className="text-emerald-500 mb-2" />
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Costo</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{tramite.costo}</p>
          </div>
        </div>

        {/* Requisitos */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Documentos requeridos</p>
          <ul className="space-y-3">
            {tramite.requisitos.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                </div>
                <span className="text-sm text-slate-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal note */}
        <div className="bg-slate-100 rounded-2xl p-4">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Este trámite está registrado en el Portal Ciudadano Único conforme a los Arts. 51-54 de la LNETB (DOF 16-VII-2025). Todos los cobros y requisitos listados son los únicos válidos legalmente.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-5 pb-8 space-y-3">
        {tramite.enLinea && (
          <button
            onClick={onStart}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-transform"
          >
            Iniciar trámite en línea <ArrowRight size={16} />
          </button>
        )}
        <button className="w-full py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Calendar size={16} /> Agendar cita presencial
        </button>
      </div>
    </div>
  );
}
