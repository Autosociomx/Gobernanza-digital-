import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Share2, 
  TrendingUp, 
  Play, 
  Users, 
  DollarSign, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Code,
  FileText,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SubSystem {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  outputs: string[];
}

const SUBSYSTEMS: SubSystem[] = [
  {
    id: 'data-core',
    name: 'REGISTRO MAESTRO',
    role: 'La Única Verdad',
    icon: <Database size={24} />,
    color: 'bg-slate-950',
    description: 'Base única de verdad de todo activo estatal: carreteras, puentes, escuelas y servicios. Georreferenciación absoluta.',
    outputs: ['Catálogo de Activos', 'Ubicación GNSS', 'Score de Condición']
  },
  {
    id: 'api-gov',
    name: 'ID NAYARIT',
    role: 'Trazabilidad Inmutable',
    icon: <ShieldCheck size={24} />,
    color: 'bg-emerald-600',
    description: 'Código inteligente que conecta el activo físico con el presupuesto y el contrato. Sin ID, no hay recurso.',
    outputs: ['Vinculación Presupuestal', 'Historial de Incidentes', 'Certificación de Obra']
  },
  {
    id: 'decision-engine',
    name: 'MOTOR DE DECISIÓN',
    role: 'Priorización de Inversión',
    icon: <TrendingUp size={24} />,
    color: 'bg-nayarit-orange',
    description: 'Algoritmos que asignan prioridades basados en riesgo, impacto social y costo de no intervención.',
    outputs: ['Fórmula de Scoring', 'Cartera Priorizada', 'Simulación de Impacto']
  },
  {
    id: 'citizen-os',
    name: 'CAPA CIUDADANA',
    role: 'Transparencia Activa',
    icon: <Users size={24} />,
    color: 'bg-blue-600',
    description: 'Canal unificado (App/Web/WhatsApp) para reportes ciudadanos y seguimiento de obras en tiempo real.',
    outputs: ['Sistema de Quejas', 'Tracking de Servicios', 'Dashboard Público']
  }
];

export const ModularBrain: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('data-core');

  const activeSystem = SUBSYSTEMS.find(s => s.id === activeId)!;

  return (
    <div className="space-y-12">
      {/* Flow Visualization */}
      <div className="p-8 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 data-grid opacity-10" />
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Arquitectura Operativa Distribuida</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Flujo Maestro de Gobernanza Digital</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
            {SUBSYSTEMS.map((sys, idx) => (
              <React.Fragment key={sys.id}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveId(sys.id)}
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center transition-all relative group",
                    activeId === sys.id ? sys.color : "bg-white/5 hover:bg-white/10 border border-white/10"
                  )}
                >
                  {sys.icon}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-bold uppercase tracking-widest">
                    {sys.name}
                  </div>
                  {activeId === sys.id && (
                    <motion.div 
                      layoutId="active-glow"
                      className={cn("absolute inset-0 rounded-2xl blur-xl opacity-50", sys.color)}
                    />
                  )}
                </motion.button>
                {idx < SUBSYSTEMS.length - 1 && (
                  <ArrowRight className="text-white/20 hidden lg:block" size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Subsystem Detail */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl"
        >
          <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg", activeSystem.color)}>
            {activeSystem.icon}
          </div>
          <h4 className="text-3xl font-black text-slate-900 mb-2">{activeSystem.name}</h4>
          <p className="text-nayarit-orange font-bold uppercase tracking-widest text-xs mb-6">{activeSystem.role}</p>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            {activeSystem.description}
          </p>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entregables Estratégicos</p>
            <div className="grid grid-cols-1 gap-3">
              {activeSystem.outputs.map((output, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">{output}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          key={`${activeId}-preview`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Code size={120} />
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h5 className="font-bold text-xl">Consola de Ejecución</h5>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="flex-1 font-mono text-xs text-white/60 space-y-4 overflow-y-auto max-h-[400px] custom-scrollbar pr-4">
              {activeId === 'data-core' && (
                <div className="space-y-4">
                  <p className="text-nayarit-orange">// Registro Maestro Único</p>
                  <p>TABLE nayarit_assets (</p>
                  <p className="pl-4">id UUID PRIMARY KEY,</p>
                  <p className="pl-4">nay_id VARCHAR(20) UNIQUE, // NAY-INF-001</p>
                  <p className="pl-4">type ENUM('ROAD', 'BRIDGE', 'BUILDING'),</p>
                  <p className="pl-4">integrity_score FLOAT,</p>
                  <p className="pl-4">last_audit TIMESTAMP</p>
                  <p>);</p>
                </div>
              )}
              {activeId === 'api-gov' && (
                <div className="space-y-4">
                  <p className="text-indigo-400">// API Gov Endpoints</p>
                  <p>GET /api/v1/sovereignty/assets</p>
                  <p>POST /api/v1/audit/report</p>
                  <p>PATCH /api/v1/decision/allocate</p>
                  <p className="text-white/20 mt-4">// Auth: OAuth2 + Sovereign Token</p>
                </div>
              )}
              {activeId === 'decision-engine' && (
                <div className="space-y-4">
                  <p className="text-nayarit-orange">// Scoring Formula</p>
                  <p>Score = (Risk * 0.4) + (Impact * 0.3) + (Usage * 0.2) + (Cost_Non_Intervention * 0.1)</p>
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white font-bold">Simulación: Carretera Tepic-Vallarta</p>
                    <p className="text-emerald-400">Priority: CRITICAL (9.2/10)</p>
                  </div>
                </div>
              )}
              {activeId === 'gov-ops' && (
                <div className="space-y-4">
                  <p className="text-emerald-400">// Workflow de Ejecución</p>
                  <p>1. Detección de Anomalía (AI)</p>
                  <p>2. Validación de Presupuesto (Decision Engine)</p>
                  <p>3. Licitación Transparente (Smart Contract)</p>
                  <p>4. Monitoreo GNSS (Real-time)</p>
                </div>
              )}
              {activeId === 'citizen-os' && (
                <div className="space-y-4">
                  <p className="text-purple-400">// Citizen Experience Flow</p>
                  <p>User {'->'} Report Problem (WhatsApp/App)</p>
                  <p>System {'->'} Validate via Data Core</p>
                  <p>System {'->'} Notify Decision Engine</p>
                  <p>User {'->'} Track Resolution in Real-time</p>
                </div>
              )}
              {activeId === 'monetization' && (
                <div className="space-y-4">
                  <p className="text-white/40">// Revenue Streams</p>
                  <p>- API Premium for Logistics Companies</p>
                  <p>- GovTech SaaS Licensing</p>
                  <p>- Advanced Analytics for Real Estate</p>
                  <p className="text-nayarit-orange mt-4">ROI Proyectado: 15% Ahorro Operativo</p>
                </div>
              )}
            </div>

            <button className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
              <Activity size={14} />
              Verificar Estado del Subsistema
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
