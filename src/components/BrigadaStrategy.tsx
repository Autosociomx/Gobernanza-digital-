import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Users, 
  Map as MapIcon, 
  Database, 
  Zap,
  Target,
  BarChart3,
  ChevronRight,
  ClipboardCheck,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function BrigadaStrategy() {
  const [activeRole, setActiveRole] = useState<'manager' | 'dev' | 'consultant'>('manager');

  const strategies = {
    manager: {
      title: "Senior Political Manager",
      focus: "Operación Tierra & Control de Daños",
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      icon: Target,
      points: [
        {
          title: "Saturación Territorial 24/7",
          desc: "No más 'visiteo' aleatorio. Uso de polígonos de calor para enviar brigadas a secciones electorales con mayor rentabilidad de voto (Swing Districts).",
          metric: "+22% Eficiencia en campo"
        },
        {
          title: "Gamificación del Activismo",
          desc: "Leaderboards en tiempo real para brigadistas. Incentivos basados en registros únicos verificados (Nayarit ID) no solo en 'toques de puerta'.",
          metric: "Retención de brigadas: 85%"
        },
        {
          title: "Inteligencia Forense de Sentimiento",
          desc: "Cada encuesta alimenta un motor de IA que detecta el 'humor social' por colonia, permitiendo a la candidata ajustar el discurso en menos de 2 horas.",
          metric: "Discurso dinámico ajustable"
        }
      ]
    },
    dev: {
      title: "Application Architect / Lead Dev",
      focus: "Offline-First & Security Infrastructure",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      icon: Cpu,
      points: [
        {
          title: "PWA Offline-First (Worker Sync)",
          desc: "Uso de IndexedDB y Service Workers. Los datos se guardan localmente en zonas sin señal y se sincronizan vía WebSocket/Firestore al detectar red.",
          metric: "0% pérdida de datos"
        },
        {
          title: "OCR INE Verification",
          desc: "Implementación de visión artificial para escanear el código MRZ de la credencial de elector. Automatización del 90% del registro del ciudadano.",
          metric: "Registro en < 45 segundos"
    },
        {
          title: "Cifrado Militar de Datos Electorales",
          desc: "Encripción de extremo a extremo (E2EE). Los datos sensibles de votantes nunca tocan el frontend en texto plano. Cumplimiento estricto de GDPR/LFPDPPP.",
          metric: "Certificación SOC2 ready"
        }
      ]
    },
    consultant: {
      title: "Strategy Consultant / ROI Expert",
      focus: "Blue Ocean & Scalability",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      icon: TrendingUp,
      points: [
        {
          title: "Estrategia del 20% (Pareto)",
          desc: "Identificación de los 'Nodos de Influencia' (el tendero, el líder de barrio). Digitalizamos primero a los que mueven el 80% de la opinión.",
          metric: "Efecto Multiplicador"
        },
        {
          title: "Transformación de Costo a Activo",
          desc: "La campaña deja de ser un gasto. El padrón verificado Nayarit ID es un activo de datos que sirve para la gobernanza post-electoral (C5).",
          metric: "ROI Longitudinal 3.5x"
        },
        {
          title: "Despacho de Servicios Predictivos",
          desc: "Convertir la queja ciudadana en un ticket de servicio inmediato. El ciudadano no vota por el nombre, vota por la resolución de su entorno.",
          metric: "Confianza Ciudadana: +40%"
        }
      ]
    }
  };

  const role = strategies[activeRole];

  return (
    <div className="pt-2 pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl mb-2">
          <Zap className="w-8 h-8 text-magenta-400" />
        </div>
        <h2 className="text-3xl font-serif font-black text-slate-900 tracking-tight lowercase">
           Brigada<em className="text-magenta-500 italic">MX</em> Strategy Bunker
        </h2>
        <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
           Hoja de ruta integral para la implementación de la red de gobernanza y movilización digital 2026.
        </p>
      </div>

      {/* Role Selector */}
      <div className="flex justify-center p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
        {(Object.keys(strategies) as Array<keyof typeof strategies>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveRole(key)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeRole === key 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {key === 'manager' ? 'Política' : key === 'dev' ? 'Tecnología' : 'Negocio / ROI'}
          </button>
        ))}
      </div>

      {/* Role Detailed Strategy */}
      <motion.div 
        key={activeRole}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className={cn("absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 -mr-20 -mt-20", role.bgColor)}></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
           <div className={cn("p-6 rounded-3xl shrink-0", role.bgColor)}>
              <role.icon className={cn("w-10 h-10", role.color)} />
           </div>
           
           <div className="space-y-8 flex-1">
              <div>
                 <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-2", role.color)}>{role.focus}</p>
                 <h3 className="text-4xl font-serif font-black text-slate-900 leading-none">{role.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {role.points.map((pt, i) => (
                   <div key={i} className="group cursor-default">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                         <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{pt.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{pt.desc}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                         <BarChart3 className="w-3 h-3" />
                         {pt.metric}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </motion.div>

      {/* Unified Roadmap Table */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-10 h-10 bg-magenta-500 rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-magenta-300">Hoja de Ruta Implementación</h4>
                  <p className="text-lg font-serif">Q3 2025 - 2026 Full Deploy</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { phase: "Fase 1", title: "Mapeo & Nayarit ID", date: "Jul-Sep", icon: Smartphone },
                { phase: "Fase 2", title: "C5 Bunker Connect", date: "Oct-Nov", icon: Database },
                { phase: "Fase 3", title: "Digital Democracy", date: "Dic-Ene", icon: Globe },
                { phase: "Fase 4", title: "Soberanía de Datos", date: "Feb-Mar", icon: ShieldCheck }
              ].map((step, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <step.icon className="w-4 h-4 text-white" />
                   </div>
                   <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">{step.phase}</p>
                   <p className="text-[10px] font-black text-white uppercase mb-1">{step.title}</p>
                   <p className="text-[9px] font-mono text-magenta-400">{step.date}</p>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
