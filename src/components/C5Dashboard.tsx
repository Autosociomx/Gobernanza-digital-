import React, { useState, useEffect, useCallback } from 'react';
import {
  RefreshCw, AlertTriangle, Building2, Users, TrendingUp,
  MessageSquare, Loader2, Send, CheckCircle2, Clock, Zap, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getC5Stats, getReports, getPublicWorks, getAgencies, updateReportStatus, simulateBotMessage,
  C5Stats, Report, PublicWork, Agency, BotSimResult
} from '../services/connectxService';

// ---- Constants ----

const CATEGORY_EMOJI: Record<string, string> = {
  BACHE: '🕳️',
  LUMINARIA: '💡',
  AGUA: '💧',
  SEGURIDAD: '🛡️',
  SALUD: '🏥',
  BASURA: '🗑️',
  PARQUE: '🌳',
  OTRO: '📋',
};

const URGENCY_COLOR: Record<string, string> = {
  CRITICAL: 'bg-red-600 text-white',
  HIGH: 'bg-orange-500 text-white',
  MEDIUM: 'bg-yellow-500 text-black',
  LOW: 'bg-green-500 text-white',
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: 'bg-slate-500 text-white',
  IN_PROGRESS: 'bg-blue-500 text-white',
  RESOLVED: 'bg-green-500 text-white',
  CLOSED: 'bg-gray-500 text-white',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En Progreso',
  RESOLVED: 'Resuelto',
  CLOSED: 'Cerrado',
};

const STATUS_CYCLE: Record<string, string> = {
  PENDING: 'IN_PROGRESS',
  IN_PROGRESS: 'RESOLVED',
  RESOLVED: 'CLOSED',
  CLOSED: 'PENDING',
};

const CLUSTER_COLORS: Record<string, string> = {
  OBRA: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  SALUD: 'bg-green-500/20 text-green-300 border-green-500/40',
  FINANZAS: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  AGRO: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
  SEGURIDAD: 'bg-red-500/20 text-red-300 border-red-500/40',
};

// ---- Helpers ----

const fmtCurrency = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

const fmtDate = (ts: string) =>
  new Date(ts).toLocaleString('es-MX', { timeZone: 'America/Mazatlan', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

// ---- KPI Card ----

interface KpiCardProps {
  title: string;
  value: string | number;
  badge?: string | number;
  badgeColor?: string;
  icon: React.ReactNode;
  sub?: React.ReactNode;
  alert?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, badge, badgeColor = 'bg-slate-600', icon, sub, alert }) => (
  <div className={`bg-slate-800 border ${alert ? 'border-red-500/60' : 'border-slate-700'} rounded-xl p-4 flex flex-col gap-2`}>
    <div className="flex items-center justify-between">
      <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</span>
      <span className="text-slate-400">{icon}</span>
    </div>
    <div className="flex items-end gap-2">
      <span className={`text-2xl font-bold ${alert ? 'text-red-400' : 'text-white'}`}>{value}</span>
      {badge !== undefined && (
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold mb-0.5 ${badgeColor}`}>
          {badge}
        </span>
      )}
    </div>
    {sub && <div className="mt-1">{sub}</div>}
  </div>
);

// ---- Report Row ----

interface ReportRowProps {
  report: Report;
  onStatusChange: (id: string, newStatus: string) => void;
}

const ReportRow: React.FC<ReportRowProps> = ({ report, onStatusChange }) => {
  const emoji = CATEGORY_EMOJI[report.category] || '📋';
  const text = report.ai_summary || report.raw_message;
  const truncated = text.length > 80 ? text.slice(0, 80) + '…' : text;
  const nextStatus = STATUS_CYCLE[report.status] || 'PENDING';

  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-700/50 last:border-0">
      <span className="text-xl mt-0.5 shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-slate-200 text-sm leading-snug">{truncated}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${URGENCY_COLOR[report.urgency] || 'bg-slate-600 text-white'}`}>
            {report.urgency}
          </span>
          <span className="text-slate-500 text-xs">{report.municipality}</span>
          <span className="text-slate-600 text-xs">{fmtDate(report.created_at)}</span>
        </div>
      </div>
      <button
        onClick={() => onStatusChange(report.id, nextStatus)}
        className={`text-xs px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-opacity hover:opacity-80 cursor-pointer ${STATUS_COLOR[report.status] || 'bg-slate-500 text-white'}`}
        title={`Cambiar a: ${STATUS_LABELS[nextStatus]}`}
      >
        {STATUS_LABELS[report.status]}
      </button>
    </div>
  );
};

// ---- Obra Card ----

const ObraCard: React.FC<{ obra: PublicWork }> = ({ obra }) => {
  const pct = Math.max(0, Math.min(100, obra.progress));
  const barColor = obra.status === 'COMPLETED' ? 'bg-green-500' : obra.status === 'SUSPENDED' ? 'bg-red-500' : 'bg-orange-500';

  return (
    <div className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-3 mb-2">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-slate-100 text-sm font-medium leading-tight">{obra.name}</p>
        <span className="text-slate-400 text-xs bg-slate-700 px-2 py-0.5 rounded-full shrink-0">{obra.municipality}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mb-1.5">
        <div
          className={`h-2 rounded-full ${barColor} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{fmtCurrency(obra.spent)} / {fmtCurrency(obra.budget)}</span>
        <span className="font-semibold text-slate-200">{pct}%</span>
      </div>
      {obra.beneficiaries > 0 && (
        <p className="text-slate-500 text-xs mt-1">
          {obra.beneficiaries.toLocaleString('es-MX')} beneficiarios
        </p>
      )}
    </div>
  );
};

// ---- Bot Simulator Panel ----

interface BotSimPanelProps {
  agencies: Agency[];
}

const BotSimPanel: React.FC<BotSimPanelProps> = ({ agencies }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BotSimResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const agencyMap: Record<string, string> = {};
  agencies.forEach(a => { agencyMap[a.id] = a.name; });

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await simulateBotMessage(message.trim());
      setResult(res);
    } catch (e) {
      setError('Error al procesar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const EXAMPLES = [
    'Hay un bache enorme en la calle Morelos esquina con Insurgentes, ya hay varios accidentes',
    'El alumbrado lleva 3 semanas sin funcionar en la colonia Las Flores',
    'Fuga de agua potable en calle Hidalgo, se desperdicia mucho desde ayer',
    'Basura acumulada en el parque Ángel Flores, hace días que no pasan a recoger',
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-orange-400" />
        <h3 className="text-white font-semibold text-base">Bot Tepic · Simulador WhatsApp</h3>
        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full ml-1">
          Gemini 2.0 Flash
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => setMessage(ex)}
            className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors cursor-pointer"
          >
            {ex.slice(0, 45)}…
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un reporte ciudadano en español… (Enter para enviar)"
          className="flex-1 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-orange-500 transition-colors"
          rows={2}
        />
        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm self-start mt-0 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span className="hidden sm:inline">Enviar</span>
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Classification chips */}
            <div className="space-y-3">
              <h4 className="text-slate-400 text-xs uppercase tracking-wider font-medium">Clasificación IA</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-700/60 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Categoría</p>
                  <p className="text-white font-semibold text-sm">
                    {CATEGORY_EMOJI[result.classification.category]} {result.classification.category}
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Urgencia</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${URGENCY_COLOR[result.classification.urgency] || 'bg-slate-600 text-white'}`}>
                    {result.classification.urgency}
                  </span>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Sentimiento</p>
                  <p className="text-slate-200 text-sm">{result.classification.sentiment}</p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Confianza</p>
                  <p className="text-orange-400 font-semibold text-sm">
                    {Math.round(result.classification.confidence * 100)}%
                  </p>
                </div>
              </div>
              <div className="bg-slate-700/60 rounded-lg p-3">
                <p className="text-slate-500 text-xs mb-1">Dependencia Asignada</p>
                <p className="text-slate-200 text-sm">
                  {agencyMap[result.classification.agency_id] || result.classification.agency_id}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {result.classification.processing_ms}ms
                </span>
                <span className="text-slate-600">|</span>
                <span>Folio: <span className="text-orange-400 font-mono font-semibold">{result.folio}</span></span>
              </div>
            </div>

            {/* WhatsApp reply bubble */}
            <div className="space-y-3">
              <h4 className="text-slate-400 text-xs uppercase tracking-wider font-medium">Respuesta WhatsApp</h4>
              <div className="bg-[#1a2b1a] border border-green-800/40 rounded-xl p-4 relative">
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-green-100 text-sm leading-relaxed pr-6">{result.reply}</p>
                <p className="text-green-700 text-xs mt-2">✓✓ Enviado por Bot Tepic</p>
              </div>
              {result.classification.summary && (
                <div className="bg-slate-700/40 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Resumen IA</p>
                  <p className="text-slate-300 text-sm">{result.classification.summary}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---- Agency Clusters ----

const AgencyClusters: React.FC<{ agencies: Agency[] }> = ({ agencies }) => {
  const clusterCount: Record<string, number> = {};
  agencies.forEach(a => {
    if (a.active) clusterCount[a.cluster] = (clusterCount[a.cluster] || 0) + 1;
  });
  const clusters = ['OBRA', 'SALUD', 'FINANZAS', 'AGRO', 'SEGURIDAD'];

  return (
    <div className="flex flex-wrap gap-2">
      {clusters.map(c => (
        <div
          key={c}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${CLUSTER_COLORS[c] || 'bg-slate-700 text-slate-300 border-slate-600'}`}
        >
          <span>{c}</span>
          <span className="text-xs opacity-70">({clusterCount[c] || 0})</span>
        </div>
      ))}
    </div>
  );
};

// ---- Main Dashboard ----

export const C5Dashboard: React.FC = () => {
  const [stats, setStats] = useState<C5Stats | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [works, setWorks] = useState<PublicWork[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const [s, r, w, a] = await Promise.all([
        getC5Stats(),
        getReports(50),
        getPublicWorks(),
        getAgencies(),
      ]);
      setStats(s);
      setReports(r);
      setWorks(w);
      setAgencies(a);
      setLastUpdated(new Date());
    } catch (e) {
      console.error('C5 load error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(() => load(), 30000);
    return () => clearInterval(interval);
  }, [load]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateReportStatus(id, newStatus);
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus as Report['status'] } : r));
    // refresh stats
    try {
      const s = await getC5Stats();
      setStats(s);
    } catch (_) {}
  };

  const totalBudgetAll = works.reduce((s, w) => s + w.budget, 0);
  const totalSpentAll = works.reduce((s, w) => s + w.spent, 0);
  const budgetExecPct = totalBudgetAll > 0 ? Math.round((totalSpentAll / totalBudgetAll) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto" />
          <p className="text-slate-400">Cargando C5 Digital…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* ---- Header ---- */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F27D26' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">C5 Digital · Nayarit</h1>
              <p className="text-slate-500 text-xs">Centro de Control, Comando, Comunicación, Cómputo y Ciudadanía</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-slate-500 text-xs hidden sm:block">
                Actualizado: {lastUpdated.toLocaleTimeString('es-MX', { timeZone: 'America/Mazatlan' })}
              </span>
            )}
            <button
              onClick={() => load(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ---- KPI Row ---- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard
            title="Total Reportes"
            value={stats?.totalReports ?? 0}
            badge={`+${stats?.todayReports ?? 0} hoy`}
            badgeColor="bg-orange-500/20 text-orange-300"
            icon={<MessageSquare className="w-4 h-4" />}
          />
          <KpiCard
            title="Reportes Críticos"
            value={stats?.criticalReports ?? 0}
            alert={(stats?.criticalReports ?? 0) > 0}
            icon={<AlertTriangle className="w-4 h-4" />}
            sub={
              <span className="text-xs text-slate-500">
                {stats?.pendingReports ?? 0} pendientes
              </span>
            }
          />
          <KpiCard
            title="Obras en Progreso"
            value={`${stats?.worksInProgress ?? 0} / ${stats?.totalWorks ?? 0}`}
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <KpiCard
            title="Ejecución Presupuestal"
            value={`${stats?.budgetExecution ?? budgetExecPct}%`}
            icon={<TrendingUp className="w-4 h-4" />}
            sub={
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-orange-500 transition-all"
                  style={{ width: `${Math.min(100, stats?.budgetExecution ?? budgetExecPct)}%` }}
                />
              </div>
            }
          />
          <KpiCard
            title="Dependencias Activas"
            value={stats?.activeAgencies ?? 0}
            icon={<Building2 className="w-4 h-4" />}
          />
          <KpiCard
            title="Ciudadanos IDN-U"
            value={stats?.registeredCitizens ?? 0}
            icon={<Users className="w-4 h-4" />}
          />
        </div>

        {/* ---- Agency Clusters ---- */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-slate-400" />
            <h3 className="text-slate-300 text-sm font-medium">Clústeres de Dependencias</h3>
          </div>
          <AgencyClusters agencies={agencies} />
        </div>

        {/* ---- Two-column: Reports + Works ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Reports feed (60%) */}
          <div className="lg:col-span-3 bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-400" />
                <h3 className="text-white font-semibold text-sm">Reportes Ciudadanos</h3>
              </div>
              <span className="text-slate-500 text-xs">{reports.length} reportes</span>
            </div>

            {reports.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-slate-500 text-sm">No hay reportes aún.</p>
                  <p className="text-slate-600 text-xs">Usa el Bot Tepic para crear el primero.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[520px] pr-1">
                {reports.map(r => (
                  <ReportRow key={r.id} report={r} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </div>

          {/* Obras Trazables (40%) */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <h3 className="text-white font-semibold text-sm">Obras Trazables</h3>
              </div>
              <span className="text-slate-500 text-xs">{works.length} obras</span>
            </div>

            {works.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <p className="text-slate-500 text-sm">No hay obras registradas.</p>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[520px]">
                {works.map(w => (
                  <ObraCard key={w.id} obra={w} />
                ))}
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Presupuesto total</span>
                    <span className="font-semibold text-slate-200">{fmtCurrency(totalBudgetAll)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Total ejercido</span>
                    <span className="font-semibold" style={{ color: '#F27D26' }}>{fmtCurrency(totalSpentAll)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---- Bot Tepic Simulator ---- */}
        <BotSimPanel agencies={agencies} />

      </div>
    </div>
  );
};

export default C5Dashboard;
