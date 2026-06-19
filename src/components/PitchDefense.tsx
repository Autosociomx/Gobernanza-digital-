import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  Target, 
  Lock, 
  Coins, 
  Cpu,
  Swords
} from 'lucide-react';
import { cn } from '../lib/utils';

export function PitchDefense() {
  const [activeId, setActiveId] = useState<number | null>(0);

  const objections = [
    {
      id: 0,
      category: "Presupuesto",
      icon: Coins,
      question: "¿De dónde vamos a sacar presupuesto para esto si el municipio está quebrado?",
      context: "Típica objeción del Secretario de Finanzas o Tesorero.",
      answer: "No es un gasto nuevo, es una reasignación estratégica. Al digitalizar el 100% de la identidad, el sistema aumenta la recaudación de predial mediante inteligencia territorial (Saturación 20/80). Además, la inversión se justifica directamente con los fondos federales (FORTAMUN) etiquetados para modernización y seguridad. El ROI se alcanza en los primeros 8 meses solo por ahorro en papel, horas-hombre y multas evitadas por incumplimiento de transparencia.",
      keywords: ["FORTAMUN", "ROI 8 meses", "Aumento Recaudatorio"]
    },
    {
      id: 1,
      category: "Legal & Privacidad",
      icon: Lock,
      question: "¿Es legal pedir firmas y escanear el INE en la calle? Nos van a demandar.",
      context: "Objeción del Director Jurídico o Síndico Municipal.",
      answer: "El sistema está diseñado específicamente con Legal-by-Design. No almacenamos datos en texto plano. Todo se encripta de origen a fin (E2EE) y cumple con la Ley Federal de Protección de Datos Personales en Posesión de Sujetos Obligados (LFPDPPSO). La 'Firma Electrónica Simple' en pantalla está validada por la Ley de Gobierno Digital del Estado de Nayarit. Cada registro genera un Hash SHA-256 inmutable.",
      keywords: ["LFPDPPSO", "Legal-by-Design", "Hash SHA-256"]
    },
    {
      id: 2,
      category: "Tecnología vs Grandes Empresas",
      icon: Cpu,
      question: "¿Por qué contratarlos a ustedes y no a Oracle, Microsoft o SAP?",
      context: "Objeción del Director de TI gubernamental.",
      answer: "Las grandes consultoras venden 'Sistemas de Planificación' (ERP) que tardan 18 meses en implementarse, cuestan millones en licencias y requieren que el ciudadano 'vaya a internet' a registrarse. Nosotros ofrecemos un 'Sistema Operativo de Campo' (SoC). Se despliega en 15 días, funciona sin internet (Offline-first) y es el gobierno quien va a la puerta del ciudadano. Agilidad táctica vs. burocracia de software.",
      keywords: ["Offline-first", "Despliegue 15 días", "Sistema Operativo de Campo"]
    },
    {
      id: 3,
      category: "Operación en Campo",
      icon: Target,
      question: "¿Qué pasa si los brigadistas se van a la sierra o colonias sin señal de internet?",
      context: "Objeción del Coordinador de Campaña/Operadores Políticos.",
      answer: "BrigadaMX fue construida con arquitectura 'Offline-First' usando IndexedDB y Service Workers. La app funciona exactamente igual en modo avión. El brigadista escanea el INE, captura la firma e integra la encuesta. Cuando el dispositivo detecta red (al volver al centro o conectarse a WiFi), sincroniza cientos de registros en background hacia el C5 de forma segura, sin perder un solo byte de información.",
      keywords: ["Offline-First", "Background Sync", "Cero pérdida de datos"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center border border-rose-500/30">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">War Room: Defensa de Pitch</h2>
              <p className="text-sm text-slate-400">Simulación de Objeciones (Comité de Transición)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Objection List */}
            <div className="md:col-span-5 space-y-2">
              {objections.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setActiveId(obj.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3",
                    activeId === obj.id 
                      ? "bg-slate-800/80 border-rose-500/50 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]" 
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    activeId === obj.id ? "bg-rose-500 text-white" : "bg-slate-800 text-slate-400"
                  )}>
                    <obj.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{obj.category}</p>
                    <p className={cn(
                      "text-xs font-bold truncate",
                      activeId === obj.id ? "text-white" : "text-slate-300"
                    )}>
                      {obj.question}
                    </p>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 shrink-0 transition-transform", activeId === obj.id ? "text-rose-500 rotate-90" : "text-slate-600")} />
                </button>
              ))}
            </div>

            {/* Answer Panel */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                {objections.map((obj) => obj.id === activeId && (
                  <motion.div
                    key={obj.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-full flex flex-col"
                  >
                    <div className="flex items-start gap-3 mb-6">
                      <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">La Objeción</p>
                        <h3 className="text-lg font-bold text-white leading-tight">"{obj.question}"</h3>
                        <p className="text-xs text-slate-500 mt-2 font-mono">{obj.context}</p>
                      </div>
                    </div>

                    <div className="flex-1 bg-slate-900 rounded-xl p-5 border border-slate-800/50 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Respuesta Blindada</p>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {obj.answer}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2">
                       {obj.keywords.map((kw, i) => (
                         <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[9px] font-black uppercase tracking-widest rounded-full border border-slate-700">
                           {kw}
                         </span>
                       ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
