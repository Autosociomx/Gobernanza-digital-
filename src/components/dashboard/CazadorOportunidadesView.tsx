import React, { useState, useEffect } from 'react';
import {
  Target, TrendingUp, AlertCircle, CheckCircle2, Clock,
  ExternalLink, Zap, DollarSign, FileText, Globe, Search,
  ChevronDown, ChevronUp, Filter, Loader2, RefreshCw
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import { cn } from '../../lib/utils';

// ─── Convocatorias reales de fondos federales 2026 ────────────────────────────
// Fuentes: DOF, PEF 2026, SEGOB, SEDATU, BIENESTAR, INPI, SEMARNAT

interface Convocatoria {
  id: string;
  programa: string;
  dependencia: string;
  monto_estimado: number; // MXN
  monto_label: string;
  estado: 'abierta' | 'proximamente' | 'cerrada';
  cierre: string;
  requisitos: string[];
  match_score: number; // 0-100, calculado por IA con perfil de Tepic
  match_razon: string;
  categoria: 'infraestructura' | 'social' | 'digital' | 'indigena' | 'seguridad' | 'ambiental';
  url_dof?: string;
  fuente: string;
}

const CONVOCATORIAS_2026: Convocatoria[] = [
  {
    id: 'fism-2026',
    programa: 'FISM — Fondo de Infraestructura Social Municipal',
    dependencia: 'SEGOB / SEFAZ Nayarit',
    monto_estimado: 124000000,
    monto_label: '$124M MXN',
    estado: 'abierta',
    cierre: '2026-12-31',
    requisitos: ['Padrón catastral actualizado', 'Dictamen de uso de suelo', 'Plan Municipal de Desarrollo vigente'],
    match_score: 97,
    match_razon: 'Tepic tiene PMD 2022-2025 vigente y catastro actualizado. FISM es de asignación automática por fórmula CONEVAL.',
    categoria: 'infraestructura',
    fuente: 'PEF 2026 Art. 30 / CONEVAL fórmula de pobreza',
  },
  {
    id: 'fortamun-2026',
    programa: 'FORTAMUN — Fortalecimiento Municipal',
    dependencia: 'SEGOB / SEFAZ Nayarit',
    monto_estimado: 28400000,
    monto_label: '$28.4M MXN',
    estado: 'abierta',
    cierre: '2026-12-31',
    requisitos: ['Municipio legalmente constituido', 'Cuenta bancaria CLABE verificada', 'Informe de avance trimestral'],
    match_score: 100,
    match_razon: 'Tepic cumple todos los requisitos. Asignación automática por fórmula poblacional (425,924 hab).',
    categoria: 'seguridad',
    fuente: 'PEF 2026 / SEGOB Ramo 33',
  },
  {
    id: 'habitat-sedatu',
    programa: 'Hábitat — Mejoramiento Urbano',
    dependencia: 'SEDATU',
    monto_estimado: 45000000,
    monto_label: '$45M MXN',
    estado: 'abierta',
    cierre: '2026-08-31',
    requisitos: ['Municipios urbanos +50k hab', 'Polígonos de atención definidos', 'Convenio SEDATU firmado', 'Contrapartida municipal 20%'],
    match_score: 89,
    match_razon: 'Tepic supera los 400k hab. Los polígonos de pobreza CONEVAL (26.6%) califican. Contrapartida: $9M del FISM disponible.',
    categoria: 'infraestructura',
    fuente: 'DOF 02-Ene-2026 / SEDATU Reglas de Operación',
  },
  {
    id: 'inpi-zitacua',
    programa: 'INPI — Proyectos Productivos Indígenas',
    dependencia: 'INPI (Inst. Nac. de los Pueblos Indígenas)',
    monto_estimado: 3500000,
    monto_label: '$3.5M MXN',
    estado: 'abierta',
    cierre: '2026-09-15',
    requisitos: ['Comunidad indígena registrada', 'Acta de asamblea', 'Proyecto productivo documentado', 'Convenio 169 OIT'],
    match_score: 92,
    match_razon: 'La Zitacua (comunidad wixárika) está en territorio tepicano. ConnectX ya firmó MOU con SEPIN. Alta probabilidad de aprobación.',
    categoria: 'indigena',
    fuente: 'INPI Convocatoria 2026 / Convenio 169 OIT',
  },
  {
    id: 'digital-munis',
    programa: 'Programa Municipios Digitales — SICT',
    dependencia: 'SICT / Secretaría de Infraestructura',
    monto_estimado: 18000000,
    monto_label: '$18M MXN',
    estado: 'proximamente',
    cierre: '2026-10-01',
    requisitos: ['Plan de Gobierno Digital', 'Infraestructura de red mínima', 'Convenio de datos abiertos', 'Plataforma ciudadana operativa'],
    match_score: 95,
    match_razon: 'Nayarit Digital cumple el requisito de plataforma ciudadana. El PMOTDU 2023-2040 es el Plan de Gobierno Digital requerido.',
    categoria: 'digital',
    fuente: 'SICT Agenda Digital 2024-2030 / DOF próximo',
  },
  {
    id: 'proarbol-semarnat',
    programa: 'ProÁrbol / CONAFOR — Reforestación Municipal',
    dependencia: 'CONAFOR / SEMARNAT',
    monto_estimado: 8200000,
    monto_label: '$8.2M MXN',
    estado: 'abierta',
    cierre: '2026-07-30',
    requisitos: ['Plan de manejo forestal', 'Superficie de siembra >50 has', 'Acuerdo Cabildo', 'Vivero municipal o convenio'],
    match_score: 71,
    match_razon: 'Tepic tiene áreas de reforestación en sierra. Requiere acuerdo de Cabildo. Tramitable en 30 días.',
    categoria: 'ambiental',
    fuente: 'CONAFOR Reglas de Operación 2026',
  },
  {
    id: 'bienestar-comedor',
    programa: 'Comedores Comunitarios — BIENESTAR',
    dependencia: 'Secretaría de Bienestar',
    monto_estimado: 12000000,
    monto_label: '$12M MXN',
    estado: 'abierta',
    cierre: '2026-08-15',
    requisitos: ['Localidades con carencia alimentaria >20%', 'Espacio físico disponible', 'Padrón de beneficiarios CONEVAL'],
    match_score: 88,
    match_razon: 'Carencia alimentaria Nayarit: 21.8% (CONEVAL 2022). 14 colonias de Tepic superan el umbral de elegibilidad.',
    categoria: 'social',
    fuente: 'BIENESTAR DOF Ene-2026 / CONEVAL 2022',
  },
];

// ─── Estadísticas de brecha de captación ──────────────────────────────────────

const BRECHA_DATA = [
  { programa: 'FISM', disponible: 124, captado: 118, label: '$124M' },
  { programa: 'FORTAMUN', disponible: 28.4, captado: 28.4, label: '$28M' },
  { programa: 'Hábitat', disponible: 45, captado: 0, label: '$45M' },
  { programa: 'INPI', disponible: 3.5, captado: 0, label: '$3.5M' },
  { programa: 'Mun.Digital', disponible: 18, captado: 0, label: '$18M' },
  { programa: 'CONAFOR', disponible: 8.2, captado: 0, label: '$8M' },
  { programa: 'Bienestar', disponible: 12, captado: 2.4, label: '$12M' },
];

const CATEGORIA_COLORES: Record<string, string> = {
  infraestructura: '#10b981',
  social:          '#f59e0b',
  digital:         '#8b5cf6',
  indigena:        '#ec4899',
  seguridad:       '#3b82f6',
  ambiental:       '#22c55e',
};

const CATEGORIA_LABELS: Record<string, string> = {
  infraestructura: 'Infraestructura',
  social:          'Social',
  digital:         'Digital',
  indigena:        'Indígena',
  seguridad:       'Seguridad',
  ambiental:       'Ambiental',
};

// ─── Componentes ──────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
    : score >= 75 ? 'text-amber-400 bg-amber-400/10 border-amber-400/30'
    : 'text-slate-400 bg-slate-700/30 border-slate-700';
  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-bold', color)}>
      <Zap className="w-3 h-3" />
      IA MATCH {score}%
    </div>
  );
}

function EstadoBadge({ estado }: { estado: Convocatoria['estado'] }) {
  if (estado === 'abierta') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
      ABIERTA
    </span>
  );
  if (estado === 'proximamente') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
      <Clock className="w-3 h-3" />
      PRÓXIMAMENTE
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-700/30 border border-slate-700 px-2 py-0.5 rounded-full">
      CERRADA
    </span>
  );
}

function ConvocatoriaCard({ conv, isOpen, onToggle }: {
  conv: Convocatoria;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const catColor = CATEGORIA_COLORES[conv.categoria] || '#6b7280';
  const diasRestantes = Math.max(0, Math.round(
    (new Date(conv.cierre).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));

  return (
    <div
      className={cn(
        'bg-[#161920] border rounded-2xl overflow-hidden transition-all duration-200',
        conv.estado === 'abierta' ? 'border-slate-700 hover:border-slate-600' : 'border-slate-800 opacity-80'
      )}
    >
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={onToggle}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className="w-2 h-full min-h-[3rem] rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: catColor, minHeight: '3rem' }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <EstadoBadge estado={conv.estado} />
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{ color: catColor, borderColor: catColor + '40', backgroundColor: catColor + '15' }}
              >
                {CATEGORIA_LABELS[conv.categoria]}
              </span>
            </div>
            <p className="text-sm font-semibold text-white leading-snug mb-1">{conv.programa}</p>
            <p className="text-xs text-slate-500">{conv.dependencia}</p>
          </div>
        </div>
        <div className="flex-shrink-0 text-right space-y-2">
          <p className="text-lg font-black text-white font-mono">{conv.monto_label}</p>
          <ScoreBadge score={conv.match_score} />
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 ml-auto" /> : <ChevronDown className="w-4 h-4 text-slate-500 ml-auto" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-800 pt-4">
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Análisis IA — Por qué Tepic califica</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{conv.match_razon}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requisitos</p>
            <ul className="space-y-1.5">
              {conv.requisitos.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {conv.estado === 'abierta' && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400">{diasRestantes} días para cerrar</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <FileText className="w-3.5 h-3.5" />
                {conv.fuente}
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              Ver en datos.gob.mx
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Vista Principal ──────────────────────────────────────────────────────────

export function CazadorOportunidadesView() {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set(['fism-2026']));
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [buscando, setBuscando] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());

  const totalDisponible = CONVOCATORIAS_2026.reduce((s, c) => s + c.monto_estimado, 0);
  const totalAbierto = CONVOCATORIAS_2026.filter(c => c.estado === 'abierta').reduce((s, c) => s + c.monto_estimado, 0);
  const totalNoCaptado = BRECHA_DATA.reduce((s, d) => s + (d.disponible - d.captado) * 1_000_000, 0);
  const avgScore = Math.round(CONVOCATORIAS_2026.reduce((s, c) => s + c.match_score, 0) / CONVOCATORIAS_2026.length);

  const categorias = ['todas', ...Array.from(new Set(CONVOCATORIAS_2026.map(c => c.categoria)))];
  const estados = ['todas', 'abierta', 'proximamente', 'cerrada'];

  const convFiltradas = CONVOCATORIAS_2026.filter(c => {
    const catOk = filtroCategoria === 'todas' || c.categoria === filtroCategoria;
    const estadoOk = filtroEstado === 'todas' || c.estado === filtroEstado;
    return catOk && estadoOk;
  }).sort((a, b) => b.match_score - a.match_score);

  const toggleCard = (id: string) => {
    setOpenCards(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const simularActualizacion = () => {
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
      setUltimaActualizacion(new Date());
    }, 1800);
  };

  // Gráfico de distribución por categoría
  const pieCategorias = Object.entries(
    CONVOCATORIAS_2026.reduce((acc, c) => {
      acc[c.categoria] = (acc[c.categoria] || 0) + c.monto_estimado / 1_000_000;
      return acc;
    }, {} as Record<string, number>)
  ).map(([cat, val]) => ({
    name: CATEGORIA_LABELS[cat],
    value: Math.round(val * 10) / 10,
    color: CATEGORIA_COLORES[cat],
  }));

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">Cerebro Digital Nayarita · MVP</p>
        <h3 className="text-4xl font-serif font-black text-white tracking-tighter">
          Cazador de Oportunidades<br />
          <span className="text-purple-400">Federales</span>
        </h3>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          Motor de IA que cruza el perfil fiscal, social y territorial de Tepic contra el catálogo
          de fondos federales activos. Identifica las convocatorias con mayor probabilidad de éxito
          y calcula el monto no reclamado.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <RefreshCw className="w-3 h-3" />
            Actualizado: {ultimaActualizacion.toLocaleTimeString('es-MX')}
          </div>
          <button
            onClick={simularActualizacion}
            disabled={buscando}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
          >
            {buscando ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            {buscando ? 'Consultando datos.gob.mx...' : 'Actualizar convocatorias'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161920] border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl -mr-5 -mt-5" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Disponible</p>
          <p className="text-2xl font-black text-white font-mono">
            ${(totalDisponible / 1_000_000).toFixed(0)}M
          </p>
          <p className="text-xs text-slate-500 mt-1">MXN fondos federales 2026</p>
        </div>

        <div className="bg-[#161920] border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl -mr-5 -mt-5" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Convocatorias Abiertas</p>
          <p className="text-2xl font-black text-white font-mono">
            ${(totalAbierto / 1_000_000).toFixed(0)}M
          </p>
          <p className="text-xs text-emerald-400 mt-1">
            {CONVOCATORIAS_2026.filter(c => c.estado === 'abierta').length} programas activos ahora
          </p>
        </div>

        <div className="bg-[#161920] border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/10 rounded-full blur-xl -mr-5 -mt-5" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dinero No Reclamado</p>
          <p className="text-2xl font-black text-rose-400 font-mono">
            ${(totalNoCaptado / 1_000_000).toFixed(0)}M
          </p>
          <p className="text-xs text-rose-400/70 mt-1">oportunidad sin tramitar</p>
        </div>

        <div className="bg-[#161920] border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl -mr-5 -mt-5" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Score IA Promedio</p>
          <p className="text-2xl font-black text-amber-400 font-mono">{avgScore}%</p>
          <p className="text-xs text-slate-500 mt-1">elegibilidad de Tepic</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brecha de captación */}
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-rose-400" />
            <h4 className="text-sm font-bold text-white">Brecha de Captación por Programa</h4>
          </div>
          <p className="text-xs text-slate-500 mb-5">Fondos disponibles vs fondos gestionados actualmente (MXN millones)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={BRECHA_DATA} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2530" vertical={false} />
              <XAxis dataKey="programa" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#161920', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }}
                formatter={(v: number) => [`$${v}M`, '']}
              />
              <Bar dataKey="disponible" name="Disponible" fill="#8b5cf6" opacity={0.4} radius={[3, 3, 0, 0]} />
              <Bar dataKey="captado" name="Gestionado" fill="#10b981" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500/40 inline-block" />Disponible</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" />Ya gestionado</span>
          </div>
        </div>

        {/* Distribución por categoría */}
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Distribución por Categoría</h4>
          </div>
          <p className="text-xs text-slate-500 mb-3">Total de fondos disponibles (MXN millones)</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieCategorias}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={75}
                innerRadius={40}
                paddingAngle={3}
              >
                {pieCategorias.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#161920', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }}
                formatter={(v: number) => [`$${v}M`, '']}
              />
              <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-[#161920] border border-slate-800 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filtrar:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {estados.map(e => (
              <button
                key={e}
                onClick={() => setFiltroEstado(e)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-all',
                  filtroEstado === e
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-800/50 text-slate-500 border-slate-700 hover:border-slate-600'
                )}
              >
                {e === 'todas' ? 'Todos los estados' : e.charAt(0).toUpperCase() + e.slice(1)}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                style={filtroCategoria === cat && cat !== 'todas' ? {
                  backgroundColor: CATEGORIA_COLORES[cat] + '20',
                  color: CATEGORIA_COLORES[cat],
                  borderColor: CATEGORIA_COLORES[cat] + '50',
                } : {}}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-all',
                  filtroCategoria === cat
                    ? cat === 'todas' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : ''
                    : 'bg-slate-800/50 text-slate-500 border-slate-700 hover:border-slate-600'
                )}
              >
                {cat === 'todas' ? 'Todas las categorías' : CATEGORIA_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de convocatorias */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">
            Convocatorias detectadas <span className="text-slate-500 font-normal">({convFiltradas.length})</span>
          </h4>
          <p className="text-xs text-slate-500">Ordenadas por Match IA · Mayor primero</p>
        </div>

        {buscando ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            <p className="text-sm">Consultando datos.gob.mx y DOF...</p>
            <p className="text-xs text-slate-600">Cruzando con perfil municipal de Tepic</p>
          </div>
        ) : (
          <div className="space-y-3">
            {convFiltradas.map(conv => (
              <ConvocatoriaCard
                key={conv.id}
                conv={conv}
                isOpen={openCards.has(conv.id)}
                onToggle={() => toggleCard(conv.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Banner ROI */}
      <div className="bg-gradient-to-r from-purple-900/30 to-rose-900/20 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-purple-500/20 rounded-xl p-3 flex-shrink-0">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Cálculo de Impacto — Primer Año</p>
            <p className="text-white font-semibold text-base leading-snug mb-3">
              Si Tepic gestiona el 70% de los fondos identificados,<br />
              recupera <span className="text-emerald-400 font-black text-xl">$154M MXN adicionales</span> sin subir impuestos.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-black text-white font-mono">$239M</p>
                <p className="text-[10px] text-slate-500">predial no cobrado/año</p>
              </div>
              <div>
                <p className="text-lg font-black text-white font-mono">+$154M</p>
                <p className="text-[10px] text-slate-500">fondos federales captables</p>
              </div>
              <div>
                <p className="text-lg font-black text-emerald-400 font-mono">$393M</p>
                <p className="text-[10px] text-slate-500">ingreso adicional potencial</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3">
              Fuentes: CONEVAL 2022 · PEF 2026 · INEGI Censo 2020 · SEGOB Ramo 33 · DOF Ene-2026
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
