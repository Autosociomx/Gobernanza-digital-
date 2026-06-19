import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  ShieldAlert, TrendingUp, Activity, Users, 
  AlertTriangle, CheckCircle2, Loader2, RefreshCw,
  Search, Filter, Download, Zap, Building2, Eye,
  ChevronRight, ArrowUpRight, ArrowDownRight, Clock,
  ShieldCheck, Database, Cpu, Globe
} from 'lucide-react';
import { getDepartments, getAuditLogs, Department, AuditLog } from '../services/departmentService';
import { analyzeRisksWithAI, RiskAnalysisResult } from '../services/aiRiskService';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { SovereignMap } from './SovereignMap';

const COLORS = ['#F27D26', '#141414', '#3b82f6', '#10b981', '#6366f1', '#f43f5e'];

export const MandoCentral: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysisResult | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [deps, auditLogs] = await Promise.all([
          getDepartments(),
          getAuditLogs(100)
        ]);
        setDepartments(deps);
        setLogs(auditLogs);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const runAIAnalysis = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeRisksWithAI(departments, logs);
      setRiskAnalysis(result);
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  // Data processing for charts
  const activityData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(log => {
      const date = new Date(log.timestamp?.toDate ? log.timestamp.toDate() : log.timestamp).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count })).reverse().slice(-7);
  }, [logs]);

  const actionDistribution = useMemo(() => {
    const counts: Record<string, number> = { CREATE: 0, UPDATE: 0, DELETE: 0 };
    logs.forEach(log => {
      counts[log.action] = (counts[log.action] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [logs]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-12 h-12 text-nayarit-orange animate-spin" />
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Sincronizando Centro de Mando Unificado de Operaciones Estratégicas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Dependencias en Operación Sistémica', value: departments.length, icon: <Building2 size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Eventos de Trazabilidad Forense', value: logs.length, icon: <Eye size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Índice de Soberanía Digital', value: riskAnalysis ? `${riskAnalysis.sovereigntyIndex}%` : 'N/A', icon: <Globe size={24} />, color: 'text-nayarit-orange', bg: 'bg-orange-50' },
          { title: 'Usuarios Activos', value: new Set(logs.map(l => l.userId)).size, icon: <Users size={24} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                <ArrowUpRight size={14} />
                +12%
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Sovereign Map Integration */}
      <div className="p-4 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">Infraestructura Geoespacial de Soberanía</h3>
            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Monitoreo de activos estratégicos en tiempo real</p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Enlace Satelital Activo</span>
          </div>
        </div>
        <div className="h-[500px] md:h-[700px] -mx-4 md:mx-0">
          <SovereignMap />
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Monitoreo de Flujos de Actividad Sistémica</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Trazabilidad inmutable de eventos de auditoría forense</p>
            </div>
            <button 
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors"
            >
              <RefreshCw size={20} />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 700, color: '#F27D26' }}
                />
                <Area type="monotone" dataKey="count" stroke="#F27D26" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Risk Analysis Panel */}
        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Zap size={120} className="text-nayarit-orange" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-nayarit-orange flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Motor de Inteligencia Estratégica y Detección de Riesgos</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Arquitectura Cognitiva Google AI</p>
              </div>
            </div>

            {!riskAnalysis && !analyzing ? (
              <div className="py-12 text-center">
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  Inicie el análisis de grado industrial para detectar anomalías, patrones de colusión y riesgos de integridad en las 48 dependencias.
                </p>
                <button 
                  onClick={runAIAnalysis}
                  className="w-full py-4 bg-nayarit-orange hover:bg-orange-600 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Zap size={18} />
                  DESPLEGAR ANÁLISIS DE SOBERANÍA Y RESILIENCIA
                </button>
              </div>
            ) : analyzing ? (
              <div className="py-12 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-nayarit-orange animate-spin" />
                <p className="text-white/60 font-bold text-xs animate-pulse uppercase tracking-widest">Orquestando Análisis de Big Data...</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Madurez de Gobernanza</p>
                    <p className="text-xl font-black text-nayarit-orange">{riskAnalysis.governanceMaturity}</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    riskAnalysis.level === 'CRITICAL' ? "bg-red-500/20 text-red-500" : 
                    riskAnalysis.level === 'HIGH' ? "bg-orange-500/20 text-orange-500" : "bg-emerald-500/20 text-emerald-500"
                  )}>
                    RIESGO: {
                      riskAnalysis.level === 'CRITICAL' ? 'CRÍTICO' :
                      riskAnalysis.level === 'HIGH' ? 'ALTO' :
                      riskAnalysis.level === 'MEDIUM' ? 'MEDIO' : 'BAJO'
                    }
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Proyección Estratégica</p>
                  <p className="text-xs text-white/90 leading-relaxed italic">
                    "{riskAnalysis.strategicOutlook}"
                  </p>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Hallazgos Estratégicos</p>
                  <ul className="space-y-2">
                    {riskAnalysis.findings.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex gap-2 text-xs text-white/80 leading-relaxed">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-nayarit-orange shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={runAIAnalysis}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs transition-all border border-white/10"
                  >
                    RE-ANALIZAR
                  </button>
                  <button 
                    className="p-3 bg-nayarit-orange hover:bg-orange-600 text-white rounded-xl transition-all shadow-lg shadow-orange-500/20"
                    title="Descargar Reporte Ejecutivo"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Action Distribution */}
        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Matriz de Distribución de Operaciones Sistémicas</h3>
          <div className="h-[250px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={actionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {actionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Bitácora de Eventos de Trazabilidad Inmutable</h3>
            <button className="text-xs font-bold text-nayarit-orange hover:underline uppercase tracking-widest">Ver Todo</button>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
            {logs.slice(0, 6).map((log, i) => (
              <div key={log.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-nayarit-orange/30 transition-colors">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0",
                  log.action === 'CREATE' ? 'bg-emerald-500' : log.action === 'UPDATE' ? 'bg-blue-500' : 'bg-red-500'
                )}>
                  {log.action === 'CREATE' ? <CheckCircle2 size={18} /> : log.action === 'UPDATE' ? <RefreshCw size={18} /> : <ShieldAlert size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {log.action} en {log.targetType}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{log.userEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {new Date(log.timestamp?.toDate ? log.timestamp.toDate() : log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
