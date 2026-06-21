import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Map as MapIcon, 
  AlertTriangle, 
  Activity, 
  Bot, 
  HeartHandshake,
  Menu,
  X,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Send,
  Loader2,
  Shield,
  Briefcase,
  AppWindow,
  Package,
  Coins,
  FileText,
  ShieldCheck,
  ChevronLeft,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { NayaritMap } from './NayaritMap';
import { ParlamentoView } from './dashboard/ParlamentoView';
import { AnalisisPoliticoView } from './dashboard/AnalisisPoliticoView';

import { TesoreriaView } from '../blocks/c5/TesoreriaView';
import { ObrasView } from '../blocks/c5/ObrasView';
import { ServiciosView } from '../blocks/c5/ServiciosView';
import { SaludView } from '../blocks/c5/SaludView';
import { IAView } from '../blocks/c5/IAView';
import { AgrovisionView } from '../blocks/c5/AgrovisionView';
import { ObservatorioView } from '../blocks/c5/ObservatorioView';
import { BienestarView } from '../blocks/c5/BienestarView';
import { MetricView } from '../blocks/c5/MetricView';
import { InteroperabilidadView } from '../blocks/c5/InteroperabilidadView';

type Language = 'es' | 'cora' | 'wixarika';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

type ModuleType = 'tesoreria' | 'obras' | 'servicios' | 'salud' | 'bienestar' | 'ia' | 'agrovision' | 'observatorio' | 'metricas' | 'parlamento' | 'analisis_politico' | 'interoperabilidad';

export function C5Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<ModuleType>(() => (localStorage.getItem('activeModule') as ModuleType) || 'tesoreria');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('activeModule', activeModule);
  }, [activeModule]);

  const modules = [
    { id: 'tesoreria', name: 'Tesorería Digital', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'obras', name: 'Trazabilidad Obras', icon: MapIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'servicios', name: 'Servicios Públicos', icon: AlertTriangle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'salud', name: 'TEPICTU Salud', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'bienestar', name: 'Bienestar Social', icon: HeartHandshake, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'ia', name: 'Asistente IA', icon: Bot, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'agrovision', name: 'Agrovisión 3D', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'observatorio', name: 'Observatorio Digital', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'metricas', name: 'Métricas Integrales', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'parlamento', name: 'Parlamento Municipal', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'analisis_politico', name: 'Análisis Estratégico', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'interoperabilidad', name: 'Nodo Transparencia', icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-300 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-screen bg-[#161920] border-r border-slate-800 flex flex-col flex-shrink-0 relative z-20"
          >
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center font-bold text-white shadow-lg">
                  N
                </div>
                <div>
                  <h1 className="font-bold text-white tracking-tight leading-none mb-1">Nayarit Digital</h1>
                  <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">C5 Governance Hub</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <div className="text-xs font-semibold text-slate-500 mb-4 px-2 tracking-wider">MÓDULOS DEL ECOSISTEMA</div>
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id as ModuleType)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group text-left",
                    activeModule === m.id 
                      ? "bg-slate-800/50 text-white" 
                      : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200"
                  )}
                >
                  <div className={cn("p-1.5 rounded-md transition-colors", activeModule === m.id ? m.bg : "bg-slate-800/50 group-hover:bg-slate-800")}>
                    <m.icon className={cn("w-4 h-4", activeModule === m.id ? m.color : "text-slate-400")} />
                  </div>
                  {m.name}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
                Salir a Portal Público
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0a0a0c]">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#161920]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-1.5 rounded-md"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <h2 className="text-sm font-medium text-slate-200 flex items-center gap-2">
              <span className="text-slate-500">Módulo /</span> 
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">STATE: ONLINE</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 border-2 border-slate-800 overflow-hidden">
               <img src="/geraldine-perfil.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1586996292898-71f4036c4e07?w=100&h=100&fit=crop&crop=faces" }}/>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {activeModule === 'tesoreria' && <TesoreriaView />}
              {activeModule === 'obras' && <ObrasView />}
              {activeModule === 'servicios' && <ServiciosView />}
              {activeModule === 'salud' && <SaludView />}
              {activeModule === 'bienestar' && <BienestarView />}
              {activeModule === 'ia' && <IAView />}
              {activeModule === 'agrovision' && <AgrovisionView />}
              {activeModule === 'observatorio' && <ObservatorioView />}
              {activeModule === 'metricas' && <MetricView />}
              {activeModule === 'parlamento' && <ParlamentoView />}
              {activeModule === 'analisis_politico' && <AnalisisPoliticoView />}
              {activeModule === 'interoperabilidad' && <InteroperabilidadView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
