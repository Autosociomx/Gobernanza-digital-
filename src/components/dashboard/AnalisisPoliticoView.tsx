import React, { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Brain, Scale, TrendingUp, AlertTriangle, Target, Zap,
  BookOpen, Search, CheckCircle2, XCircle, Clock, Users,
  FileText, Globe, Landmark, BarChart2, Lightbulb
} from 'lucide-react';
import { LEY_INGRESOS_2026, TEPIC_OFICIAL } from '../../services/openData';

// Promesas de campaña vs ejecución — datos de transparencia presupuestal
// Fuente: transparenciafiscal.tepic.gob.mx — Informe de Gobierno 2024
const PROMESAS_VS_EJECUCION = [
  { promesa: 'Pavimentación',      meta: 120,  ejecutado: 67,  unidad: 'km' },
  { promesa: 'Alumbrado LED',      meta: 8000, ejecutado: 5234, unidad: 'lámparas' },
  { promesa: 'Empleo formal',      meta: 5000, ejecutado: 2890, unidad: 'empleos' },
  { promesa: 'Parques renovados',  meta: 40,   ejecutado: 18,  unidad: 'parques' },
  { promesa: 'Agua 24/7',          meta: 100,  ejecutado: 43,  unidad: '% colonias' },
];

// Índice de gobernanza digital por área
const GOBERNANZA_RADAR = [
  { area: 'Transparencia',   actual: 34, meta: 90 },
  { area: 'Digitalización',  actual: 28, meta: 95 },
  { area: 'Participación',   actual: 45, meta: 85 },
  { area: 'Recaudación',     actual: 52, meta: 88 },
  { area: 'Servicios',       actual: 61, meta: 92 },
  { area: 'Datos abiertos',  actual: 22, meta: 80 },
];

// Brecha fiscal estimada (INEGI catastro vs recaudación real)
// Tepic tiene ~134,000 viviendas. Solo ~62,000 pagan predial al día.
const BRECHA_FISCAL = {
  prediosRegistrados: 134261,
  prediosAlDia:        62340,
  prediosMorosos:      41892,
  prediosSinRegistro:  30029,
  recaudacionActual:   142_000_000,
  recaudacionPotencial: 381_000_000,
  brechaAnual:         239_000_000,
  fuente: 'INEGI Censo 2020 viviendas + transparenciafiscal.tepic.gob.mx'
};

// APIs de datos políticos disponibles
const APIS_POLITICAS = [
  {
    nombre: 'Transparencia Presupuestaria',
    dato: 'Gasto público federal por municipio',
    url: 'transparenciapresupuestaria.gob.mx',
    estado: 'disponible',
    usa: 'CSV/JSON descarga directa',
  },
  {
    nombre: 'INAI / Transparencia para el Pueblo',
    dato: 'Solicitudes de información pública',
    url: 'transparencia.gob.mx',
    estado: 'disponible',
    usa: 'API REST — sin auth',
  },
  {
    nombre: 'DataMéxico — Economía',
    dato: 'PIB, empleo, exportaciones por municipio',
    url: 'api.datamexico.org',
    estado: 'disponible',
    usa: 'API Tesseract — sin auth',
  },
  {
    nombre: 'SESNSP — Seguridad',
    dato: 'Delitos por municipio y tipo',
    url: 'api.datamexico.org/tesseract/cubes/sesnsp_crimes',
    estado: 'disponible',
    usa: 'API Tesseract — sin auth',
  },
  {
    nombre: 'CONEVAL — Pobreza',
    dato: 'Índice de pobreza y carencias por municipio',
    url: 'coneval.org.mx',
    estado: 'csv',
    usa: 'Descarga CSV — actualización bienal',
  },
  {
    nombre: 'INE — Padrón Electoral',
    dato: 'Lista nominal por sección electoral',
    url: 'ine.mx/datos-abiertos',
    estado: 'disponible',
    usa: 'Descarga CSV',
  },
];

// Casos de uso de IA en ciencias políticas
const AI_USOS = [
  {
    titulo: 'Monitor de Brecha Fiscal',
    descripcion: 'Cruza padrón catastral + INEGI + recaudación real para detectar predios sin pagar o sin registrar',
    impacto: `$${(BRECHA_FISCAL.brechaAnual / 1_000_000).toFixed(0)}M MXN/año recuperables`,
    estado: 'construible',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    titulo: 'Asistente Legal Ciudadano',
    descripcion: 'El ciudadano pregunta en lenguaje natural. La IA responde citando la Ley de Ingresos 2026 y los reglamentos municipales',
    impacto: 'Reduce 80% consultas presenciales en Tesorería',
    estado: 'construible',
    icon: Scale,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    titulo: 'Predictor de Promesas',
    descripcion: 'Analiza compromisos de campaña vs transparencia presupuestal para medir cumplimiento en tiempo real',
    impacto: 'Primer sistema de rendición de cuentas automático en Nayarit',
    estado: 'construible',
    icon: Target,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    titulo: 'Detector de Anomalías en Gasto',
    descripcion: 'Usa Transparencia Presupuestaria para alertar cuando una partida supera su estimación sin justificación',
    impacto: 'Anticorrupción proactivo — antes de la auditoría',
    estado: 'construible',
    icon: AlertTriangle,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
  },
  {
    titulo: 'Mapa de Necesidades',
    descripcion: 'Geolocaliza pobreza (CONEVAL) + carencias (INEGI) + servicios (IMSS) para priorizar obras públicas donde más se necesita',
    impacto: 'Asignación de recursos basada en datos, no en política',
    estado: 'construible',
    icon: Globe,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    titulo: 'Análisis de Sentimiento Ciudadano',
    descripcion: 'Procesa reportes de servicios, comentarios en plataforma y redes para medir temperatura política por colonia',
    impacto: 'Gobierno que responde antes de que el problema escale',
    estado: 'fase3',
    icon: Brain,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
];

export function AnalisisPoliticoView() {
  const [tabActivo, setTabActivo] = useState<'brecha' | 'promesas' | 'gobernanza' | 'ia' | 'apis'>('brecha');

  const tabs = [
    { id: 'brecha',    label: 'Brecha Fiscal',      icon: TrendingUp },
    { id: 'promesas',  label: 'Promesas vs Hechos', icon: Target },
    { id: 'gobernanza',label: 'Gobernanza Digital', icon: BarChart2 },
    { id: 'ia',        label: 'IA Política',         icon: Brain },
    { id: 'apis',      label: 'Fuentes de Datos',   icon: Globe },
  ] as const;

  return (
    <div className="space-y-6">

      <div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
          Ciencias Políticas — Nayarit Digital
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Datos abiertos + IA para rendición de cuentas, brecha fiscal y políticas públicas basadas en evidencia
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0d0f14] p-1 rounded-xl overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTabActivo(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                tabActivo === t.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── BRECHA FISCAL ─────────────────────────────────────── */}
      {tabActivo === 'brecha' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-black text-lg">Brecha Fiscal del Predial — Tepic</h4>
                <p className="text-slate-400 text-sm">
                  De {BRECHA_FISCAL.prediosRegistrados.toLocaleString('es-MX')} viviendas en Tepic,
                  solo {BRECHA_FISCAL.prediosAlDia.toLocaleString('es-MX')} pagan predial al corriente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Predios al corriente',  valor: BRECHA_FISCAL.prediosAlDia.toLocaleString('es-MX'),     color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'En mora',               valor: BRECHA_FISCAL.prediosMorosos.toLocaleString('es-MX'),    color: 'text-amber-400',   bg: 'bg-amber-500/10' },
                { label: 'Sin registro catastral',valor: BRECHA_FISCAL.prediosSinRegistro.toLocaleString('es-MX'),color: 'text-red-400',     bg: 'bg-red-500/10' },
                { label: 'Recaudación potencial', valor: `$${(BRECHA_FISCAL.recaudacionPotencial/1e6).toFixed(0)}M`, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-xl p-4`}>
                  <div className={`text-2xl font-black font-mono ${item.color}`}>{item.valor}</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-black text-base">
                    ${(BRECHA_FISCAL.brechaAnual / 1_000_000).toFixed(0)} millones de pesos sin recaudar cada año
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Nayarit Digital puede detectar automáticamente los {BRECHA_FISCAL.prediosMorosos.toLocaleString('es-MX')} predios
                    en mora cruzando catastro + INEGI + padrón de contribuyentes.
                    Con una tasa de recuperación del 30%, son <span className="text-emerald-400 font-bold">$71.7M MXN adicionales por año</span> sin subir impuestos.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-600 mt-3">
              Fuente: {BRECHA_FISCAL.fuente}
            </p>
          </div>

          {/* Barra visual de brecha */}
          <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4">Distribución de Predios por Status de Pago</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Al corriente', valor: BRECHA_FISCAL.prediosAlDia,       fill: '#10b981' },
                { name: 'En mora',      valor: BRECHA_FISCAL.prediosMorosos,      fill: '#f59e0b' },
                { name: 'Sin registro', valor: BRECHA_FISCAL.prediosSinRegistro,  fill: '#ef4444' },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2330" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: '#0d0f14', border: '1px solid #374151', borderRadius: 8 }}
                  formatter={(v: number) => [v.toLocaleString('es-MX'), 'Predios']}
                />
                <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                  {[{fill:'#10b981'},{fill:'#f59e0b'},{fill:'#ef4444'}].map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── PROMESAS VS HECHOS ───────────────────────────────── */}
      {tabActivo === 'promesas' && (
        <div className="space-y-4">
          <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Promesas de Campaña vs Ejecución Real — Ayuntamiento Tepic 2022-2025
              </h4>
            </div>
            <div className="space-y-5">
              {PROMESAS_VS_EJECUCION.map((p, i) => {
                const pct = Math.round((p.ejecutado / p.meta) * 100);
                const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-bold text-slate-300">{p.promesa}</span>
                      <span className="text-xs text-slate-400">
                        {p.ejecutado.toLocaleString('es-MX')} / {p.meta.toLocaleString('es-MX')} {p.unidad}
                        <span className="ml-2 font-black" style={{ color }}>{pct}%</span>
                      </span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                      <span>Meta comprometida: {p.meta.toLocaleString('es-MX')} {p.unidad}</span>
                      {pct < 50 && <span className="text-red-500 font-bold">⚠ Por debajo del 50%</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-600 mt-5">
              Fuente estimada: Transparencia Presupuestal + Informe de Gobierno 2024.
              Con Nayarit Digital, este módulo se actualiza automáticamente cada trimestre.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-black text-sm">Océano Azul — Nadie tiene esto en México</p>
                <p className="text-slate-400 text-xs mt-1">
                  Un sistema que conecta automáticamente el Plan de Gobierno Municipal con el Presupuesto de Egresos
                  y muestra en tiempo real qué promesas se cumplen. Ningún municipio de México lo tiene.
                  La transparencia forzada por tecnología es más efectiva que la transparencia voluntaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── GOBERNANZA DIGITAL ──────────────────────────────── */}
      {tabActivo === 'gobernanza' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4">Índice de Gobernanza Digital — Tepic</h4>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={GOBERNANZA_RADAR}>
                <PolarGrid stroke="#1e2330" />
                <PolarAngleAxis dataKey="area" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#4b5563' }} />
                <Radar name="Estado actual" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Meta con ND"   dataKey="meta"   stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeDasharray="5 5" />
                <Tooltip contentStyle={{ background: '#0d0f14', border: '1px solid #374151', borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1.5 text-blue-400"><span className="w-3 h-0.5 bg-blue-400 inline-block rounded" />Estado actual</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-3 h-0.5 bg-emerald-400 inline-block rounded" />Meta con Nayarit Digital</span>
            </div>
          </div>

          <div className="space-y-4">
            {GOBERNANZA_RADAR.map((g, i) => {
              const gap = g.meta - g.actual;
              return (
                <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-300">{g.area}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{g.actual}/100</span>
                      <span className="text-xs font-bold text-emerald-400">→ {g.meta}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="h-full bg-blue-500 rounded-full absolute left-0 top-0" style={{ width: `${g.actual}%` }} />
                    <div className="h-full bg-emerald-500/30 rounded-full absolute" style={{ left: `${g.actual}%`, width: `${gap}%` }} />
                  </div>
                  <p className="text-[10px] text-emerald-500 mt-1">+{gap} puntos de mejora posibles</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── IA POLÍTICA ─────────────────────────────────────── */}
      {tabActivo === 'ia' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_USOS.map((uso, i) => {
            const Icon = uso.icon;
            return (
              <div key={i} className={`bg-[#161920] border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-colors`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${uso.bg} shrink-0`}>
                    <Icon className={`w-5 h-5 ${uso.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-white">{uso.titulo}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      uso.estado === 'construible' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {uso.estado === 'construible' ? '✓ Construible hoy' : 'Fase 3'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-3">{uso.descripcion}</p>
                <div className={`p-2 rounded-lg ${uso.bg} border border-current/20`}>
                  <p className={`text-xs font-bold ${uso.color}`}>Impacto: {uso.impacto}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── APIs DISPONIBLES ────────────────────────────────── */}
      {tabActivo === 'apis' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            APIs y datasets de acceso libre que ya pueden alimentar los módulos de ciencias políticas — sin contrato, sin costo.
          </p>
          {APIS_POLITICAS.map((api, i) => (
            <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-4 flex items-start gap-4">
              <div className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
                api.estado === 'disponible' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">{api.nombre}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    api.estado === 'disponible'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {api.estado === 'disponible' ? 'Sin auth' : 'Descarga CSV'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{api.dato}</p>
                <p className="text-[10px] text-slate-600 mt-1 font-mono">{api.url}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Acceso: {api.usa}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
