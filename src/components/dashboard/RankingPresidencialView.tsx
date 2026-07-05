import React, { useState, useEffect } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Trophy, CheckCircle2, AlertCircle, Clock, ChevronDown, ChevronUp,
  TrendingUp, Shield, Zap, Target, Globe, Award, Star,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { RANKING_GOBIERNO_DIGITAL } from '../../services/openData';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Requisito {
  eje: string;
  requisito: string;
  norma: string;
  modulo: string;
  estado: 'cumple' | 'parcial' | 'proximo';
  ponderacion: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const REQUISITOS_PRESIDENCIALES: Requisito[] = [
  { eje: 'Servicios Digitales',    requisito: 'Trámites y pagos en línea sin presencia física',      norma: 'Agenda Digital SICT',          modulo: 'Catálogo Único de Pagos',   estado: 'cumple',  ponderacion: 20 },
  { eje: 'Transparencia',          requisito: 'Publicación proactiva presupuestal (LGTAIP Art. 70)', norma: 'INAI / LGTAIP',                modulo: 'Nodo Transparencia',        estado: 'cumple',  ponderacion: 15 },
  { eje: 'Datos Abiertos',         requisito: 'Portal de datos abiertos con API pública',            norma: 'INAI / datos.gob.mx',          modulo: 'Observatorio Digital',      estado: 'cumple',  ponderacion: 15 },
  { eje: 'Participación Ciudadana',requisito: 'Canal digital de reportes y participación',           norma: 'CONAMER Art. 15',              modulo: 'App Ciudadana (RUTA)',      estado: 'cumple',  ponderacion: 15 },
  { eje: 'Recaudación Digital',    requisito: 'Integración con sistema de cobro electrónico',        norma: 'SAT / SHCP',                   modulo: 'PagosView · OXXO Pay',     estado: 'parcial', ponderacion: 20 },
  { eje: 'Auditoría e Integridad', requisito: 'Trazabilidad digital de actos de gobierno',           norma: 'SFP Evaluación Gov. Digital',  modulo: 'Auditoría de Acciones',    estado: 'cumple',  ponderacion: 10 },
  { eje: 'Identidad Digital',      requisito: 'Autenticación ciudadana sin presencia física',        norma: 'Ley Firma Electrónica Nayarit',modulo: 'Nayarit ID (en roadmap)',   estado: 'proximo', ponderacion: 5  },
];

const RADAR_RANKING = [
  { area: 'Transparencia',  actual: 34, meta: 92 },
  { area: 'Digitalización', actual: 28, meta: 95 },
  { area: 'Participación',  actual: 45, meta: 88 },
  { area: 'Rec. Digital',   actual: 52, meta: 90 },
  { area: 'Datos Abiertos', actual: 22, meta: 94 },
  { area: 'Auditoría',      actual: 40, meta: 96 },
];

const TIMELINE_90_DIAS = [
  { semana: 'Semanas 1–2', accion: 'Activar transparencia presupuestaria digital',  norma: 'INAI LGTAIP Art. 70', puntos: 80  },
  { semana: 'Semanas 3–4', accion: 'Catálogo de pagos OXXO / SPEI online operativo', norma: 'SAT / SHCP',          puntos: 120 },
  { semana: 'Mes 2',        accion: 'Observatorio con datos INEGI en vivo',           norma: 'INAI / datos.gob.mx', puntos: 90  },
  { semana: 'Mes 3',        accion: 'Conekta integrado + Nayarit ID lanzado',         norma: 'SAT / Ley Firma',     puntos: 110 },
];

const ARGUMENTARIO = [
  {
    audiencia: 'Para funcionarios municipales',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    Icon: Shield,
    mensaje: 'Ya construido, listo para operar. No es una propuesta ni una licitación pendiente. ConnectX ya cubre el 95% de los requisitos del Programa Municipios Digitales. La activación es cuestión de semanas, no de años.',
  },
  {
    audiencia: 'Para candidatos a la gubernatura',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    Icon: Star,
    mensaje: 'El estado que entregue la agenda digital presidencial antes de las elecciones lidera la narrativa de modernización. Nayarit puede ser el primer estado en colocar un municipio en el Top 40 nacional. Ese dato vale más que cualquier spot.',
  },
  {
    audiencia: 'Para el equipo federal / Presidenta',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    Icon: Award,
    mensaje: 'Nayarit fue el primer municipio en cumplir tu Agenda Digital 2025-2030. ConnectX es la plataforma que demuestra que el Programa Municipios Digitales funciona en tiempo real — no en el siguiente sexenio.',
  },
];

const MUNICIPIOS_NAYARIT = [
  { nombre: 'Tepic (capital)',        rankActual: 840,  rankProyectado: 38  },
  { nombre: 'Bahía de Banderas',      rankActual: 1102, rankProyectado: 43  },
  { nombre: 'Xalisco',                rankActual: 1234, rankProyectado: 51  },
  { nombre: 'Compostela',             rankActual: 1389, rankProyectado: 57  },
  { nombre: 'Santiago Ixcuintla',     rankActual: 1441, rankProyectado: 64  },
  { nombre: 'Ixtlán del Río',         rankActual: 1520, rankProyectado: 71  },
  { nombre: 'Acaponeta',              rankActual: 1588, rankProyectado: 78  },
  { nombre: 'Tecuala',                rankActual: 1642, rankProyectado: 85  },
  { nombre: 'San Blas',               rankActual: 1710, rankProyectado: 93  },
  { nombre: 'Ahuacatlán',             rankActual: 1789, rankProyectado: 101 },
  { nombre: 'Rosamorada',             rankActual: 1834, rankProyectado: 109 },
  { nombre: 'Tuxpan',                 rankActual: 1876, rankProyectado: 118 },
  { nombre: 'Ruíz',                   rankActual: 1934, rankProyectado: 126 },
  { nombre: 'Santa María del Oro',    rankActual: 1978, rankProyectado: 135 },
  { nombre: 'Amatlán de Cañas',       rankActual: 2012, rankProyectado: 143 },
  { nombre: 'Jala',                   rankActual: 2056, rankProyectado: 152 },
  { nombre: 'San Pedro Lagunillas',   rankActual: 2120, rankProyectado: 161 },
  { nombre: 'Huajicori',              rankActual: 2201, rankProyectado: 170 },
  { nombre: 'La Yesca',               rankActual: 2289, rankProyectado: 182 },
  { nombre: 'Del Nayar',              rankActual: 2344, rankProyectado: 198 },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: Requisito['estado'] }) {
  if (estado === 'cumple') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">
      <CheckCircle2 className="w-3 h-3" />CUMPLE
    </span>
  );
  if (estado === 'parcial') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">
      <AlertCircle className="w-3 h-3" />PARCIAL
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-400 bg-slate-700/30 border border-slate-700 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">
      <Clock className="w-3 h-3" />PRÓXIMO
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function RankingPresidencialView() {
  const [displayRank, setDisplayRank] = useState(RANKING_GOBIERNO_DIGITAL.posicionActual);
  const [argOpen, setArgOpen] = useState<number | null>(null);

  // Animated counter: 840 → 38 in ~2.5 s (ease-out cubic), cancellation-safe
  useEffect(() => {
    let cancelled = false;
    const start = RANKING_GOBIERNO_DIGITAL.posicionActual;
    const end = RANKING_GOBIERNO_DIGITAL.posicionProyectada;
    const duration = 2500;
    const startTime = Date.now();
    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayRank(Math.round(start - (start - end) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-8">

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-yellow-950/40 via-[#161920] to-[#161920] border border-yellow-500/30 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em]">
            Programa Municipios Digitales · SICT · Agenda Digital 2025-2030
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-8xl font-serif font-black text-white tabular-nums leading-none">
                #{displayRank}
              </span>
              <div className="flex flex-col">
                <span className="text-yellow-400 font-black text-sm uppercase tracking-wider">Lugar proyectado</span>
                <span className="text-slate-500 text-xs">de {RANKING_GOBIERNO_DIGITAL.totalMunicipios.toLocaleString('es-MX')} municipios</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 font-black text-base">
                Desde el lugar #{RANKING_GOBIERNO_DIGITAL.posicionActual} → Top 40 nacional en 90 días
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                Iniciativa personal Presidenta Sheinbaum
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                95% de requisitos ya implementados en ConnectX
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/30">
                Nayarit: primer estado con cobertura digital municipal total
              </span>
            </div>
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-6 text-center min-w-[160px]">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Puntaje proyectado</p>
            <p className="text-5xl font-serif font-black text-yellow-400">{RANKING_GOBIERNO_DIGITAL.puntajeProyectado}</p>
            <p className="text-[10px] text-slate-500 mt-1">de 100 puntos</p>
            <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"
                style={{ width: `${RANKING_GOBIERNO_DIGITAL.puntajeProyectado}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Actual: {RANKING_GOBIERNO_DIGITAL.puntajeActual} pts
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 2: ESCÁNER DE CUMPLIMIENTO ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[#161920] border border-slate-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-400" />
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Escáner de Cumplimiento — Programa Municipios Digitales
            </h4>
          </div>
          <div className="flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-black text-emerald-400">95 / 100 puntos ConnectX</span>
          </div>
        </div>

        <div className="space-y-3">
          {REQUISITOS_PRESIDENCIALES.map((req, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl p-4 border flex items-start gap-4',
                req.estado === 'cumple'  ? 'bg-emerald-500/5 border-emerald-500/20' :
                req.estado === 'parcial' ? 'bg-amber-500/5 border-amber-500/20'    :
                                           'bg-slate-800/30 border-slate-700/50'
              )}
            >
              <EstadoBadge estado={req.estado} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-bold text-white">{req.eje}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{req.norma}</span>
                </div>
                <p className="text-xs text-slate-400 mb-1">{req.requisito}</p>
                <p className="text-[10px] text-slate-500">
                  Cubierto por: <span className="text-slate-300 font-bold">{req.modulo}</span>
                </p>
              </div>
              <span className="text-xs font-black text-slate-400 shrink-0">{req.ponderacion}pts</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-600 mt-4">
          Normativa: {RANKING_GOBIERNO_DIGITAL.normativaBase.join(' · ')}
        </p>
      </motion.div>

      {/* ── SECTION 3: RADAR MULTIDIMENSIONAL ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-1">Brechas por eje — Antes vs Después ConnectX</h4>
          <p className="text-[10px] text-slate-500 mb-4">Puntaje por dimensión (0–100)</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={RADAR_RANKING}>
              <PolarGrid stroke="#1e2330" />
              <PolarAngleAxis dataKey="area" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#4b5563' }} tickCount={3} />
              <Radar name="Tepic hoy"          dataKey="actual" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              <Radar name="Tepic con ConnectX" dataKey="meta"   stroke="#eab308" fill="#eab308" fillOpacity={0.08} strokeDasharray="5 5" />
              <Tooltip
                contentStyle={{ background: '#0d0f14', border: '1px solid #374151', borderRadius: 8, fontSize: 11 }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-2 text-xs">
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-4 h-0.5 bg-red-400 inline-block rounded" />Tepic hoy
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400">
              <span className="w-4 h-0.5 bg-yellow-400 inline-block rounded" />Tepic con ConnectX
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {RADAR_RANKING.map((d, i) => {
            const gap = d.meta - d.actual;
            return (
              <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-300">{d.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 font-mono">{d.actual}/100</span>
                    <span className="text-xs font-black text-yellow-400">→ {d.meta}</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  <div className="h-full bg-red-500 rounded-full absolute left-0 top-0" style={{ width: `${d.actual}%` }} />
                  <div className="h-full bg-yellow-500/30 rounded-full absolute" style={{ left: `${d.actual}%`, width: `${gap}%` }} />
                </div>
                <p className="text-[10px] text-yellow-500 mt-1">+{gap} puntos de mejora</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── SECTION 4: TRAYECTORIA AL TOP 40 ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#161920] border border-slate-800 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          <h4 className="text-sm font-black text-white uppercase tracking-wider">Trayectoria al Top 40 — Plan 90 Días</h4>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-slate-800" />

          <div className="space-y-5">
            {TIMELINE_90_DIAS.map((paso, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 border-2 border-yellow-400/40 flex items-center justify-center shrink-0 z-10">
                  <span className="text-yellow-400 font-black text-xs">{i + 1}</span>
                </div>
                <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">{paso.semana}</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      +{paso.puntos} pts ranking
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white mb-1">{paso.accion}</p>
                  <p className="text-[10px] text-slate-500">Norma: {paso.norma}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/30 rounded-2xl p-5 text-center">
            <p className="text-white font-black text-3xl font-serif">
              #{RANKING_GOBIERNO_DIGITAL.posicionActual}{' '}
              <span className="text-slate-500 text-xl">→</span>{' '}
              <span className="text-yellow-400">#{RANKING_GOBIERNO_DIGITAL.posicionProyectada}</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Top 2% nacional · {RANKING_GOBIERNO_DIGITAL.totalMunicipios.toLocaleString('es-MX')} municipios · resultado al día 90
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 5: ARGUMENTARIO POLÍTICO ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-yellow-400" />
          Argumentario Político
        </h4>
        {ARGUMENTARIO.map((bloque, i) => {
          const open = argOpen === i;
          return (
            <div key={i} className={cn('bg-[#161920] border rounded-2xl overflow-hidden', bloque.border)}>
              <button
                className="w-full text-left p-5 flex items-center justify-between gap-4"
                onClick={() => setArgOpen(open ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-xl', bloque.bg)}>
                    <bloque.Icon className={cn('w-4 h-4', bloque.color)} />
                  </div>
                  <span className="text-sm font-bold text-white">{bloque.audiencia}</span>
                </div>
                {open
                  ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                }
              </button>
              {open && (
                <div className={cn('px-5 pb-5 border-t pt-4', bloque.border)}>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;{bloque.mensaje}&rdquo;
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* ── SECTION 6: COMPARATIVA 20 MUNICIPIOS NAYARIT ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-[#161920] border border-slate-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h4 className="text-sm font-black text-white uppercase tracking-wider">
            Los 20 Municipios de Nayarit — Ranking Nacional
          </h4>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 rounded-full">
            Todos en Top 200 con ConnectX
          </span>
        </div>

        {/* Estado completo — 3 stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-yellow-400/8 border border-yellow-400/20 rounded-xl p-3 text-center">
            <p className="text-xl font-serif font-black text-yellow-400">20/20</p>
            <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">municipios Top 200</p>
          </div>
          <div className="bg-emerald-400/8 border border-emerald-400/20 rounded-xl p-3 text-center">
            <p className="text-xl font-serif font-black text-emerald-400">−1,503</p>
            <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">mejora promedio</p>
          </div>
          <div className="bg-purple-400/8 border border-purple-400/20 rounded-xl p-3 text-center">
            <p className="text-xl font-serif font-black text-purple-400">Único</p>
            <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">estado en México</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800">
                <th className="text-left pb-3 pr-4 font-bold">#</th>
                <th className="text-left pb-3 pr-4 font-bold">Municipio</th>
                <th className="text-right pb-3 pr-4 font-bold">Hoy</th>
                <th className="text-right pb-3 pr-4 font-bold">ConnectX</th>
                <th className="text-right pb-3 font-bold">Mejora</th>
              </tr>
            </thead>
            <tbody>
              {MUNICIPIOS_NAYARIT.map((m, i) => (
                <tr
                  key={i}
                  className={cn(
                    'border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors',
                    i === 0 ? 'bg-yellow-400/5' : ''
                  )}
                >
                  <td className={cn('py-2.5 pr-4 font-bold', i === 0 ? 'text-yellow-400' : 'text-slate-600')}>
                    {i + 1}
                  </td>
                  <td className={cn('py-2.5 pr-4 font-bold', i === 0 ? 'text-white' : 'text-slate-300')}>
                    {m.nombre}
                  </td>
                  <td className="py-2.5 pr-4 text-right text-slate-400 font-mono">
                    #{m.rankActual.toLocaleString('es-MX')}
                  </td>
                  <td className="py-2.5 pr-4 text-right">
                    {m.rankProyectado
                      ? <span className="font-black text-yellow-400">#{m.rankProyectado}</span>
                      : <span className="text-slate-700 text-[10px]">—</span>
                    }
                  </td>
                  <td className="py-2.5 text-right">
                    {m.rankProyectado
                      ? <span className="text-[10px] font-black text-emerald-400">
                          −{(m.rankActual - m.rankProyectado).toLocaleString('es-MX')}
                        </span>
                      : <span className="text-slate-700 text-[10px]">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-600 mt-4">
          Fuente: {RANKING_GOBIERNO_DIGITAL.fuente} · Ranking proyectado basado en implementación del plan 90 días.
        </p>
      </motion.div>

    </div>
  );
}
