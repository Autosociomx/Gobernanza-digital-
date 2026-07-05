import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Database,
  BarChart3,
  Landmark,
  Crown,
  Network,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../lib/utils';
import { startAgentsRun, getAgentsRun, AgentRun, AgentResult, AgentStatus } from '../../services/agentsService';

const POLL_INTERVAL_MS = 1500;
const RUN_ID_STORAGE_KEY = 'agentesFederalesRunId';

const AGENT_ICONS: Record<string, React.ElementType> = {
  datos_gob: Database,
  datamexico: BarChart3,
  inegi: Landmark,
};

const STATUS_STYLES: Record<AgentStatus, { label: string; className: string }> = {
  queued: { label: 'En cola', className: 'bg-slate-500/10 text-slate-400 border-slate-500/30' },
  running: { label: 'Ejecutando', className: 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse' },
  done: { label: 'Completado', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  error: { label: 'Error', className: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
};

function StatusPill({ status }: { status: AgentStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider', s.className)}>
      {status === 'running' && <Loader2 className="w-3 h-3 animate-spin" />}
      {status === 'done' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'error' && <AlertTriangle className="w-3 h-3" />}
      {s.label}
    </span>
  );
}

function AgentCard({ agent }: { agent: AgentResult }) {
  const [open, setOpen] = useState(false);
  const Icon = AGENT_ICONS[agent.id] ?? Database;
  const hasContent = agent.findings.length > 0 || agent.rawHighlights.length > 0;

  return (
    <div className="bg-[#161920] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-400/10 border border-orange-400/20">
            <Icon className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">{agent.name}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">{agent.description}</p>
          </div>
        </div>
        <StatusPill status={agent.status} />
      </div>

      {agent.durationMs !== undefined && (
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
          <Clock className="w-3 h-3" />
          {(agent.durationMs / 1000).toFixed(1)}s
        </div>
      )}

      {agent.status === 'error' && (
        <p className="text-xs text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">{agent.error}</p>
      )}

      {hasContent && (
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Hallazgos ({agent.findings.length + agent.rawHighlights.length})
            <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <ul className="mt-3 space-y-2">
                  {agent.findings.map((f, i) => (
                    <li key={`f-${i}`} className="text-xs text-slate-300 flex gap-2">
                      <span className="text-orange-400 mt-0.5">▸</span>
                      {f}
                    </li>
                  ))}
                  {agent.rawHighlights.map((h, i) => (
                    <li key={`h-${i}`} className="text-[11px] text-slate-500 font-mono flex gap-2">
                      <span className="mt-0.5">·</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function AgentesFederalesView() {
  const [run, setRun] = useState<AgentRun | null>(null);
  const [starting, setStarting] = useState(false);
  const [lostRun, setLostRun] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isRunning = run?.status === 'running' || starting;

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const pollRun = (runId: string) => {
    stopPolling();
    pollRef.current = setInterval(async () => {
      try {
        const updated = await getAgentsRun(runId);
        setRun(updated);
        if (updated.status !== 'running') {
          stopPolling();
          sessionStorage.removeItem(RUN_ID_STORAGE_KEY);
        }
      } catch (err: any) {
        stopPolling();
        sessionStorage.removeItem(RUN_ID_STORAGE_KEY);
        if (err.message === 'RUN_NOT_FOUND') {
          setLostRun(true);
          setRun(null);
        }
      }
    }, POLL_INTERVAL_MS);
  };

  // Re-adjuntarse a un run en curso al volver a la pestaña o recargar
  useEffect(() => {
    const savedId = sessionStorage.getItem(RUN_ID_STORAGE_KEY);
    if (savedId) {
      getAgentsRun(savedId)
        .then(existing => {
          setRun(existing);
          if (existing.status === 'running') pollRun(savedId);
        })
        .catch(() => sessionStorage.removeItem(RUN_ID_STORAGE_KEY));
    }
    return stopPolling;
  }, []);

  const handleStart = async () => {
    setStarting(true);
    setLostRun(false);
    try {
      const started = await startAgentsRun();
      setRun(started);
      sessionStorage.setItem(RUN_ID_STORAGE_KEY, started.runId);
      pollRun(started.runId);
    } catch (err) {
      console.error('Error iniciando run de agentes:', err);
    } finally {
      setStarting(false);
    }
  };

  const ceoBadge = run?.ceo.provider === 'claude'
    ? `CEO: Claude ${run.ceo.model ?? ''}`
    : run?.ceo.provider === 'gemini'
      ? 'CEO: Gemini (respaldo)'
      : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-orange-400 mb-2">Inteligencia Federal ConnectX</p>
        <h3 className="font-serif text-3xl font-black text-white tracking-tight flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-orange-400/10 border border-orange-400/20 shadow-xl">
            <Network className="w-8 h-8 text-orange-400" />
          </div>
          Agentes de Datos Abiertos Federales
        </h3>
        <p className="text-slate-500 text-sm mt-3 max-w-2xl">
          Agentes de IA que consultan en paralelo las plataformas de datos abiertos del Gobierno Federal
          (datos.gob.mx, DataMéxico e INEGI) y cruzan los resultados para detectar oportunidades y fondos aplicables a Nayarit y Tepic.
        </p>
      </div>

      {/* Control bar */}
      <div className="bg-[#161920] border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all',
            isRunning
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20'
          )}
        >
          {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Analizando...' : 'Ejecutar Análisis'}
        </button>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          {lostRun && <span className="text-amber-400">Run anterior perdido (servidor reiniciado). Ejecuta de nuevo.</span>}
          {run && (
            <span>Inicio: {new Date(run.startedAt).toLocaleTimeString('es-MX')}</span>
          )}
          {ceoBadge && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
              <Crown className="w-3 h-3" />
              {ceoBadge}
            </span>
          )}
        </div>
      </div>

      {/* Agent cards */}
      {run && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {run.agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}

      {/* CEO report */}
      {run && run.ceo.status !== 'queued' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#161920] border border-purple-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Crown className="w-5 h-5 text-purple-400" />
              </div>
              Informe Ejecutivo del CEO Digital
            </h4>
            <StatusPill status={run.ceo.status} />
          </div>

          {run.ceo.status === 'running' && (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
            </div>
          )}

          {run.ceo.error && (
            <p className="text-xs text-amber-400 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mb-4">{run.ceo.error}</p>
          )}

          {run.ceo.report && (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-purple-300 prose-headings:font-serif prose-li:text-slate-300 prose-p:text-slate-300 prose-strong:text-white">
              <ReactMarkdown>{run.ceo.report}</ReactMarkdown>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty state */}
      {!run && !lostRun && (
        <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center">
          <Network className="w-10 h-10 text-slate-700 mx-auto mb-4" />
          <p className="text-sm text-slate-500">
            Presiona <span className="text-orange-400 font-semibold">Ejecutar Análisis</span> para lanzar los agentes en paralelo
            contra las plataformas federales de datos abiertos.
          </p>
        </div>
      )}
    </div>
  );
}
