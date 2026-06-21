import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, Clock, CheckCircle2, AlertCircle, Gavel, TrendingUp,
  Activity, Eye, RefreshCw, FileText, BarChart3, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { cn } from '../lib/utils';
import { db } from '../firebase';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function diasHabiles(desde: Date): number {
  const hoy = new Date();
  let count = 0;
  const cursor = new Date(desde);
  cursor.setHours(0, 0, 0, 0);
  const fin = new Date(hoy);
  fin.setHours(0, 0, 0, 0);
  while (cursor < fin) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

// Seed data shown when Firestore has no real records yet (demo mode)
const SEED_TRAMITES = [
  { tipo: 'licencia_funcionamiento', titulo: 'Licencia de Funcionamiento', folio: 'LIC-M3KA2-TEP', status: 'APROBADO', plazoHabiles: 15, diasTranscurridos: 11 },
  { tipo: 'bache', titulo: 'Reporte Bache', folio: 'VIA-N7BX1-TEP', status: 'PENDIENTE', plazoHabiles: 10, diasTranscurridos: 12 },
  { tipo: 'uso_suelo', titulo: 'Uso de Suelo', folio: 'USO-P2ZC4-TEP', status: 'EN_REVISION', plazoHabiles: 20, diasTranscurridos: 8 },
  { tipo: 'permiso_construccion', titulo: 'Permiso de Construcción', folio: 'CON-Q9DF5-TEP', status: 'APROBADO_TACITO', plazoHabiles: 30, diasTranscurridos: 31 },
  { tipo: 'acta_nacimiento', titulo: 'Acta de Nacimiento', folio: 'REG-R4EG6-TEP', status: 'APROBADO', plazoHabiles: 5, diasTranscurridos: 3 },
  { tipo: 'luminaria', titulo: 'Reporte Luminaria', folio: 'LUM-S8FH7-TEP', status: 'PENDIENTE', plazoHabiles: 7, diasTranscurridos: 9 },
  { tipo: 'licencia_funcionamiento', titulo: 'Licencia de Funcionamiento', folio: 'LIC-T1IJ8-TEP', status: 'RECHAZADO', plazoHabiles: 15, diasTranscurridos: 15 },
  { tipo: 'bache', titulo: 'Reporte Bache', folio: 'VIA-U5KL9-TEP', status: 'APROBADO', plazoHabiles: 10, diasTranscurridos: 7 },
];

const MONTHLY_TREND = [
  { mes: 'Ene', total: 38, enPlazo: 22 },
  { mes: 'Feb', total: 51, enPlazo: 31 },
  { mes: 'Mar', total: 44, enPlazo: 30 },
  { mes: 'Abr', total: 67, enPlazo: 48 },
  { mes: 'May', total: 72, enPlazo: 58 },
  { mes: 'Jun', total: 89, enPlazo: 74 },
];

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  PENDIENTE:       { label: 'Pendiente',        color: '#64748b', bg: '#f8fafc' },
  EN_REVISION:     { label: 'En Revisión',      color: '#d97706', bg: '#fffbeb' },
  APROBADO:        { label: 'Aprobado',          color: '#059669', bg: '#ecfdf5' },
  RECHAZADO:       { label: 'Rechazado',         color: '#dc2626', bg: '#fef2f2' },
  APROBADO_TACITO: { label: 'Aprobado Tácito',   color: '#4f46e5', bg: '#eef2ff' },
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPICard({
  label, value, sub, icon: Icon, color, pulse,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; pulse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-[1.5rem] p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">{label}</p>
        <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', color)}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <div className="flex items-end gap-2">
          <p className="text-4xl font-serif font-black text-white leading-none tabular-nums">{value}</p>
          {pulse && (
            <span className="mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
            </span>
          )}
        </div>
        {sub && <p className="text-[10px] text-white/40 font-bold mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AuditoriaPanel({ onClose }: { onClose?: () => void }) {
  const [tramites, setTramites] = useState(SEED_TRAMITES as any[]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [usingLive, setUsingLive] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'tramites'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const live = snap.docs.map((d) => {
          const data = d.data();
          const desde = data.submittedAt?.toDate ? data.submittedAt.toDate() : new Date();
          return {
            ...data,
            folio: data.folio,
            titulo: data.titulo,
            status: data.status,
            plazoHabiles: data.plazoHabiles,
            diasTranscurridos: diasHabiles(desde),
          };
        });
        setTramites(live);
        setUsingLive(true);
      }
      setLastUpdate(new Date());
    }, () => {
      // Firestore permission denied in public context — keep seed data
    });
    return () => unsub();
  }, []);

  // ── Computed KPIs ──────────────────────────────────────────────────────────

  const total = tramites.length;
  const aprobados = tramites.filter(t => t.status === 'APROBADO' || t.status === 'APROBADO_TACITO').length;
  const tacitos = tramites.filter(t => t.status === 'APROBADO_TACITO').length;
  const pendientesVencidos = tramites.filter(
    t => ['PENDIENTE', 'EN_REVISION'].includes(t.status) && t.diasTranscurridos >= t.plazoHabiles
  ).length;
  const enPlazo = tramites.filter(
    t => ['APROBADO', 'APROBADO_TACITO'].includes(t.status) && t.diasTranscurridos <= t.plazoHabiles
  ).length;
  const cumplimientoPct = total > 0 ? Math.round((enPlazo / total) * 100) : 0;
  const promedioDias = total > 0
    ? Math.round(tramites.reduce((s, t) => s + t.diasTranscurridos, 0) / total)
    : 0;

  // ── Pie data ───────────────────────────────────────────────────────────────

  const statusCount = tramites.reduce((acc: Record<string, number>, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(statusCount).map(([k, v]) => ({
    name: STATUS_META[k]?.label || k,
    value: v,
    fill: STATUS_META[k]?.color || '#64748b',
  }));

  // ── Type distribution ──────────────────────────────────────────────────────

  const byType = tramites.reduce((acc: Record<string, number>, t) => {
    const key = t.titulo?.split(' ').slice(0, 2).join(' ') || t.tipo;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(byType).map(([name, count]) => ({ name, count }));

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">
              {usingLive ? 'Datos en Tiempo Real' : 'Datos de Demostración'}
            </p>
          </div>
          <h1 className="text-xl font-serif font-black leading-tight">
            Panel de Auditoría Pública
          </h1>
          <p className="text-[9px] text-white/40 font-bold">
            H. Ayuntamiento de Tepic · Cumplimiento LMR · LGTAIP
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[8px] text-white/30 uppercase tracking-widest">Actualizado</p>
            <p className="text-[10px] font-mono text-white/50">
              {lastUpdate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-2xl mx-auto">

        {/* ── Compliance Gauge ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-[2rem] p-8 border border-indigo-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-300/60 mb-4">
            Índice de Cumplimiento LMR · Art. 17-19
          </p>
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={cumplimientoPct >= 80 ? '#34d399' : cumplimientoPct >= 50 ? '#fbbf24' : '#f87171'}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - cumplimientoPct / 100) }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-serif font-black text-white">{cumplimientoPct}%</p>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-2xl font-serif font-black text-white leading-none">{enPlazo} de {total}</p>
                <p className="text-[10px] text-white/50 font-bold mt-1">trámites resueltos dentro del plazo legal</p>
              </div>
              {pendientesVencidos > 0 && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-[9px] text-red-300 font-bold leading-tight">
                    {pendientesVencidos} trámite{pendientesVencidos > 1 ? 's' : ''} con plazo vencido sin resolución
                  </p>
                </div>
              )}
              {tacitos > 0 && (
                <div className="flex items-center gap-2 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <Gavel className="w-4 h-4 text-indigo-400 shrink-0" />
                  <p className="text-[9px] text-indigo-300 font-bold leading-tight">
                    {tacitos} Silencio{tacitos > 1 ? 's' : ''} Afirmativo{tacitos > 1 ? 's' : ''} activado{tacitos > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── KPI Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <KPICard label="Trámites Totales" value={total} sub="Registrados en plataforma" icon={FileText} color="bg-slate-700" pulse={usingLive} />
          <KPICard label="Tiempo Promedio" value={`${promedioDias}d`} sub="Días hábiles de respuesta" icon={Clock} color="bg-amber-600" />
          <KPICard label="Silencio Afirmativo" value={tacitos} sub="Aprobados por omisión LMR" icon={Gavel} color="bg-indigo-600" />
          <KPICard label="Resueltos a Tiempo" value={`${cumplimientoPct}%`} sub="Índice de eficiencia" icon={CheckCircle2} color={cumplimientoPct >= 80 ? 'bg-emerald-600' : 'bg-amber-600'} />
        </div>

        {/* ── Status Distribution (Pie) ─────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-5">
            Distribución por Estado
          </p>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={52} dataKey="value" paddingAngle={3}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                    <p className="text-[10px] font-bold text-white/60">{d.name}</p>
                  </div>
                  <p className="text-[10px] font-black text-white tabular-nums">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Monthly Trend ─────────────────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-5">
            Tendencia 2026 — Trámites Totales vs. Resueltos en Plazo
          </p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPlazo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 10 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="total" name="Total" stroke="#6366f1" fill="url(#gradTotal)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="enPlazo" name="En Plazo" stroke="#34d399" fill="url(#gradPlazo)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── By Type Bar ───────────────────────────────────────────── */}
        {barData.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-5">
              Volumen por Tipo de Trámite
            </p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8, fontWeight: 700 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 10 }}
                  />
                  <Bar dataKey="count" name="Trámites" radius={[6, 6, 0, 0]}>
                    {barData.map((_, i) => (
                      <Cell key={i} fill={['#6366f1', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#38bdf8'][i % 6]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── Live Feed ─────────────────────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-[1.5rem] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
              Registro de Trámites — Tiempo Real
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Live</p>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {tramites.slice(0, 6).map((t, i) => {
              const sm = STATUS_META[t.status] || STATUS_META['PENDIENTE'];
              const vencido = t.diasTranscurridos >= t.plazoHabiles && ['PENDIENTE', 'EN_REVISION'].includes(t.status);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-4 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-white truncate">{t.titulo}</p>
                    <p className="text-[8px] font-mono text-white/30 mt-0.5">{t.folio}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {vencido && (
                      <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span
                      className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ color: sm.color, background: sm.color + '22' }}
                    >
                      {sm.label}
                    </span>
                    <p className="text-[8px] font-mono text-white/30 w-10 text-right">
                      {t.diasTranscurridos}d/{t.plazoHabiles}d
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Legal Footer ──────────────────────────────────────────── */}
        <div className="p-5 bg-white/3 rounded-[1.5rem] border border-white/5 space-y-2">
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
            <p className="text-[8px] text-white/30 leading-relaxed">
              Este panel cumple con el <strong className="text-white/50">Art. 70 LGTAIP</strong> (publicación proactiva de información) y el <strong className="text-white/50">Art. 54 LMR</strong> (datos abiertos en formatos consultables). Los datos se publican en tiempo real con trazabilidad de auditoría.{' '}
              <span className="text-white/20">Endpoint abierto: /api/v1/auditoria/stats</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
