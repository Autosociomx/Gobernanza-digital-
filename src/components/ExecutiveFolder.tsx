import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  CheckCircle2,
  Printer,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

export function ExecutiveFolder({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[var(--crema)] p-4 md:p-12 font-sans selection:bg-[var(--magenta)] selection:text-white">
      <div className="max-w-[850px] mx-auto bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] rounded-[0.5rem] overflow-hidden border border-black/5 relative">
        
        {/* Ribbon for "CONFIDENTIAL" */}
        <div className="absolute top-12 -right-12 rotate-45 bg-[var(--tinta)] text-[var(--crema)] px-12 py-1 text-[10px] font-mono font-bold tracking-[0.3em] z-10">
          CONFIDENCIAL
        </div>

        {/* Executive Header */}
        <div className="p-[4rem] pb-[2.5rem] border-b border-black/5 bg-gradient-to-b from-black/[0.02] to-transparent">
           <div className="flex justify-between items-start mb-12">
              <span className="font-serif font-black text-3xl tracking-tight">Connect<em className="text-[var(--magenta)] italic">X</em></span>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documento ID</p>
                 <p className="text-xs font-mono font-bold">NAY-DIG-2026-V1</p>
              </div>
           </div>
           
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h1 className="text-[4rem] font-serif font-black leading-[0.95] tracking-tight mb-6">
                Carpeta <br/><em className="text-[var(--magenta)] italic">Ejecutiva</em>
             </h1>
             <p className="text-[1.1rem] text-[var(--gris)] max-w-xl leading-relaxed">
                Estrategia Integral de Transformación Digital para el Municipio de Tepic. Una hoja de ruta centrada en la trazabilidad, eficiencia y bienestar ciudadano.
             </p>
           </motion.div>
        </div>

        {/* Content Body */}
        <div className="p-[4rem] space-y-16">
           
           {/* Section 1: The Problem */}
           <section>
              <div className="flex items-center gap-3 mb-6">
                 <Target className="w-5 h-5 text-[var(--magenta)]" />
                 <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--tinta)]">El Desafío (Tepic 2026)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <p className="text-sm text-[var(--gris)] leading-relaxed">Persiste una desconexión entre la recaudación municipal y la percepción ciudadana de los resultados en calle.</p>
                    <ul className="space-y-3">
                       {[
                         'Silos de información entre dependencias.',
                         'Falta de trazabilidad en tiempo real de obras.',
                         'Respuesta no predictiva en servicios públicos.'
                       ].map((t, i) => (
                         <li key={i} className="flex gap-3 text-xs font-medium text-[var(--tinta)]">
                            <span className="text-[var(--magenta)]">/</span> {t}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-[var(--crema)] p-6 rounded-xl border border-black/5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Métrica de Impacto</p>
                    <p className="text-4xl font-serif font-black text-[var(--magenta)] italic">-35%</p>
                    <p className="text-xs font-bold text-[var(--tinta)] mt-2">Reducción proyectada en tiempos de atención a reportes críticos mediante IA.</p>
                 </div>
              </div>
           </section>

           {/* Section 2: Solution Architecture */}
           <section>
              <div className="flex items-center gap-3 mb-6">
                 <Layers className="w-5 h-5 text-[var(--magenta)]" />
                 <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--tinta)]">Arquitectura de Solución</h2>
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-3 gap-1">
                    <div className="bg-[var(--tinta)] text-white p-4 text-center">
                       <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Capa 1</p>
                       <p className="text-[10px] font-bold">INTEROPERABILIDAD</p>
                    </div>
                    <div className="bg-[var(--magenta)] text-white p-4 text-center">
                       <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Capa 2</p>
                       <p className="text-[10px] font-bold">INTELIGENCIA IA</p>
                    </div>
                    <div className="bg-[var(--solar)] text-[var(--tinta)] p-4 text-center">
                       <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Capa 3</p>
                       <p className="text-[10px] font-bold">TRAZABILIDAD</p>
                    </div>
                 </div>
                 <p className="text-sm text-[var(--gris)] leading-relaxed">
                    Utilizamos el ecosistema de <strong>Google Cloud (Vertex AI + Maps)</strong> para transformar el dato crudo en decisiones ejecutivas para la Presidenta Municipal.
                 </p>
              </div>
           </section>

           {/* Section 3: Roadmap */}
           <section>
              <div className="flex items-center gap-3 mb-8">
                 <TrendingUp className="w-5 h-5 text-[var(--magenta)]" />
                 <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--tinta)]">Hoja de Ruta (Roadmap)</h2>
              </div>
              <div className="space-y-4">
                 {[
                   { t: 'Mes 1: El Modelo "Colonia"', d: 'Despliegue piloto en San Juan y Lomas de la Cruz.' },
                   { t: 'Mes 3: Interoperabilidad Financiera', d: 'Conexión de Tesorería Digital a BigQuery.' },
                   { t: 'Mes 6: Municipio Inteligente', d: 'Escalabilidad a las 11 demarcaciones de Tepic.' },
                 ].map((step, i) => (
                   <div key={i} className="flex gap-6 items-start pb-6 border-b border-black/5 last:border-0">
                      <div className="text-[var(--magenta)] font-serif italic font-black text-xl">0{i+1}</div>
                      <div>
                         <h4 className="text-sm font-bold text-[var(--tinta)] mb-1">{step.t}</h4>
                         <p className="text-xs text-[var(--gris)]">{step.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Section 4: Budget range (Simulation) */}
           <section className="bg-[var(--tinta)] text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--magenta)]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10">
                 <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 opacity-60 text-center">Inversión y Escalabilidad</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                    <div>
                       <p className="text-xs font-medium opacity-50 mb-1">Mantenimiento Base</p>
                       <p className="text-2xl font-serif italic">$50k - $80k <span className="text-[10px] font-mono uppercase tracking-normal">USD / Año</span></p>
                    </div>
                    <div>
                       <p className="text-xs font-medium opacity-50 mb-1">Eficiencia Recuperada</p>
                       <p className="text-2xl font-black text-[var(--solar)]">+22% <span className="text-[10px] font-mono uppercase tracking-normal">Recaudación Est.</span></p>
                    </div>
                 </div>
              </div>
           </section>

        </div>

        {/* Page Footer */}
        <div className="p-[4rem] pt-0 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-black/5 bg-slate-50/50">
           <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-[var(--magenta)] transition-colors uppercase tracking-widest">
                 <Printer className="w-4 h-4" /> Imprimir Documento
              </button>
              <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-[var(--magenta)] transition-colors uppercase tracking-widest">
                 <Share2 className="w-4 h-4" /> Compartir PDF
              </button>
           </div>
           <button 
             onClick={onBack}
             className="px-8 py-3 bg-[var(--tinta)] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--magenta)] transition-all shadow-xl"
           >
              Finalizar Lectura
           </button>
        </div>
      </div>

      <div className="mt-12 text-center">
         <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Powered by Google Cloud Platform · Nayarit Digital 2026</p>
      </div>

    </div>
  );
}
