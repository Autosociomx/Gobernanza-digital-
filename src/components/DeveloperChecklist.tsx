import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Terminal, 
  Layers, 
  Cloud, 
  Database,
  Cpu,
  Map as MapIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface Task {
  id: string;
  label: string;
  status: 'complete' | 'in-progress' | 'pending';
}

interface ModuleProgress {
  name: string;
  progress: number;
  tasks: Task[];
  icon: any;
  color: string;
}

export function DeveloperChecklist({ onLogout }: { onLogout: () => void }) {
  const modules: ModuleProgress[] = [
    {
      name: 'Landing Page (Nayarit Digital)',
      progress: 95,
      icon: Layers,
      color: 'text-magenta-500',
      tasks: [
        { id: 'l1', label: 'Estructura Visual Editorial (Geraldine Style)', status: 'complete' },
        { id: 'l2', label: 'Estrategia "Primero Tepic" (Sección)', status: 'complete' },
        { id: 'l3', label: 'Infraestructura Google Cloud (Sección)', status: 'complete' },
        { id: 'l4', label: 'Responsive Optimization', status: 'in-progress' },
      ]
    },
    {
      name: 'C5 Dashboard (Gobernanza)',
      progress: 75,
      icon: Cpu,
      color: 'text-blue-500',
      tasks: [
        { id: 'c1', label: 'Módulos: Tesorería, Salud, Servicios', status: 'complete' },
        { id: 'c2', label: 'Consola IA (Gemini 1.5 Pro Integration)', status: 'complete' },
        { id: 'c3', label: 'Observatorio Digital (Mapas de Calor)', status: 'in-progress' },
        { id: 'c4', label: 'Agrovisión 3D (Simulador de Parcelas)', status: 'in-progress' },
      ]
    },
    {
      name: 'Citizen App (RUTA)',
      progress: 85,
      icon: Terminal,
      color: 'text-cyan-500',
      tasks: [
        { id: 'r1', label: 'Mobile Mockup UI (iPhone Frame)', status: 'complete' },
        { id: 'r2', label: 'AI Support Chat (Fast Interactivity)', status: 'complete' },
        { id: 'r3', label: 'Trazabilidad de Obras (Map View)', status: 'complete' },
        { id: 'r4', label: 'Sistema de Pagos (Simulado)', status: 'in-progress' },
      ]
    },
    {
      name: 'Infraestructura & Backend',
      progress: 60,
      icon: Cloud,
      color: 'text-purple-500',
      tasks: [
        { id: 'e1', label: 'Servidor Express + Vite Middleware', status: 'complete' },
        { id: 'e2', label: 'Conexión Gemini API (Real)', status: 'complete' },
        { id: 'e3', label: 'Componente Google Maps (API Ready)', status: 'complete' },
        { id: 'e4', label: 'Firestore/Database Persistence', status: 'pending' },
      ]
    }
  ];

  const systemStats = [
    { label: 'Google Cloud Platform', status: 'Connected', color: 'text-emerald-500' },
    { label: 'Vertex AI / Gemini', status: 'Active', color: 'text-emerald-500' },
    { label: 'Maps Platform', status: 'Pending Key', color: 'text-amber-500' },
    { label: 'Database (SQLite/FS)', status: 'Operational', color: 'text-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-300 font-sans p-6 md:p-12 selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">Entorno de Desarrollo</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Hoja de Ruta ConnectX</h1>
            <p className="text-slate-500 text-sm mt-1">Checklist de implementación estratégica para Nayarit Digital.</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-6 py-2.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            Volver al Deck
          </button>
        </header>

        {/* System Health */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {systemStats.map((stat, i) => (
            <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">{stat.label}</p>
              <p className={cn("text-xs font-mono", stat.color)}>{stat.status}</p>
            </div>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
          {modules.map((module, i) => (
            <motion.div 
              key={module.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161920] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg bg-slate-900 border border-slate-800", module.color)}>
                    <module.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white tracking-tight">{module.name}</h3>
                </div>
                <div className="text-right">
                   <span className="text-2xl font-black text-white">{module.progress}%</span>
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Progreso</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-slate-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={cn("h-full", module.color.replace('text', 'bg'))}
                ></motion.div>
              </div>

              <div className="p-6 space-y-4">
                {module.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      {task.status === 'complete' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : task.status === 'in-progress' ? (
                        <Clock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-700" />
                      )}
                      <span className={cn(
                        "text-sm transition-colors",
                        task.status === 'complete' ? "text-slate-400" : "text-slate-200 group-hover:text-white"
                      )}>
                        {task.label}
                      </span>
                    </div>
                    {task.status === 'complete' && (
                      <span className="text-[10px] font-mono text-emerald-500/50 bg-emerald-500/5 px-2 py-0.5 rounded">LISTO</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 flex justify-between items-center">
                 <button className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
                   Actualizar Sprint
                 </button>
                 <div className="flex gap-1">
                    {[1,2,3].map(dot => <div key={dot} className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>)}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-md">
           <MapIcon className="w-4 h-4 text-slate-500" />
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nayarit Node 01 - Tepic</span>
        </div>
      </div>
    </div>
  );
}
