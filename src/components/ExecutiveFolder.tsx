import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  CheckCircle2,
  Printer,
  Share2,
  Zap,
  ChevronLeft,
  BookOpen,
  Swords
} from 'lucide-react';
import { motion } from 'motion/react';
import { BrigadaStrategy } from './BrigadaStrategy';
import { BrigadaFieldView } from './BrigadaFieldView';
import { Whitepaper } from './Whitepaper';
import { PitchDefense } from './PitchDefense';

export function ExecutiveFolder({ onBack }: { onBack: () => void }) {
  const [activeView, setActiveView] = useState<'main' | 'demo' | 'whitepaper' | 'defense'>('main');

  if (activeView === 'demo') {
    return (
      <div className="min-h-screen bg-slate-950 p-4 flex flex-col items-center justify-center space-y-6">
        <button 
          onClick={() => setActiveView('main')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Volver a la Carpeta
        </button>
        <BrigadaFieldView />
      </div>
    );
  }

  if (activeView === 'whitepaper') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-50 shadow-sm">
           <button 
             onClick={() => setActiveView('main')}
             className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest"
           >
             <ChevronLeft className="w-4 h-4" /> Volver a la Carpeta
           </button>
           <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-[10px] font-bold uppercase tracking-widest bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full">
                <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
              </button>
           </div>
        </div>
        <Whitepaper />
      </div>
    );
  }

  if (activeView === 'defense') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col px-4 md:px-12 py-8">
        <button 
          onClick={() => setActiveView('main')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-8 w-fit mx-auto"
        >
          <ChevronLeft className="w-4 h-4" /> Volver a la Carpeta
        </button>
        <PitchDefense />
      </div>
    );
  }

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
                Estrategia <br/><em className="text-[var(--magenta)] italic">Nayarit 2026</em>
             </h1>
             <p className="text-[1.1rem] text-[var(--gris)] max-w-xl leading-relaxed">
                Propuesta de Gobernanza Digital Certificada para la administración de <strong>Geraldine Ponce</strong>. Un sistema escalable que transforma la relación gobierno-ciudadano mediante datos e inteligencia artificial.
             </p>
          </motion.div>
        </div>

        {/* Content Body */}
        <div className="p-[4rem] space-y-16">
           
           {/* Section 1: The Vision */}
           <section>
              <div className="flex items-center gap-3 mb-6">
                 <ShieldCheck className="w-5 h-5 text-[var(--magenta)]" />
                 <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--tinta)]">Visión: Soberanía Digital</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <p className="text-sm text-[var(--gris)] leading-relaxed">La digitalización no es solo "subir trámites", es crear un <strong>Nayarit ID</strong> que sea el centro de la vida ciudadana, validado casa por casa.</p>
                    <ul className="space-y-3">
                       {[
                         'Validación física de identidad (Protocolo 20:80).',
                         'Certificación de Gobernanza por Google Cloud.',
                         'Transparencia total en ejecución de obra pública.'
                       ].map((t, i) => (
                         <li key={i} className="flex gap-3 text-xs font-medium text-[var(--tinta)]">
                            <span className="text-[var(--magenta)]">/</span> {t}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-[var(--crema)] p-6 rounded-xl border border-black/5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Escalabilidad (Blue Oceans)</p>
                    <div className="space-y-2">
                       <p className="text-sm font-black text-[var(--magenta)] italic">Agrotech Nayarit</p>
                       <p className="text-[10px] text-[var(--gris)]">Eliminación de intermediarios: +15% utilidad para el productor local.</p>
                    </div>
                 </div>
              </div>
           </section>

           {/* Section 2: Leyes y Recursos */}
           <section>
              <div className="flex items-center gap-3 mb-6">
                 <FileText className="w-5 h-5 text-[var(--magenta)]" />
                 <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--tinta)]">Marco Legal y Financiero</h2>
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                       <h4 className="text-[10px] font-black uppercase mb-1">Ley de Gobierno Digital</h4>
                       <p className="text-[10px] text-slate-500">Habilita la Firma Electrónica como motor de pagos municipales digitales.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                       <h4 className="text-[10px] font-black uppercase mb-1">Optimizacion FORTAMUN</h4>
                       <p className="text-[10px] text-slate-500">Reetiquetado de fondos federales hacia infraestructura de inteligencia (C5).</p>
                    </div>
                 </div>
              </div>
           </section>

           {/* Section 3: Propuesta Email (Copy-Paste) */}
           <section className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                 <Share2 className="w-5 h-5 text-indigo-500" />
                 <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">Email Ready: Propuesta Geraldine 2026</h2>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm font-mono text-[11px] text-slate-700 leading-relaxed max-h-[300px] overflow-y-auto">
                 <p className="font-bold mb-4">Asunto: Propuesta Estratégica: Nayarit ID & Modelo de Gobernanza Digital 2026</p>
                 <p>Estimada Presidenta Geraldine,</p>
                 <br/>
                 <p>Me permito presentarle la plataforma <strong>Nayarit Digital OS</strong>, un ecosistema diseñado para consolidar su legado como la administración más eficiente y transparente en la historia de Tepic.</p>
                 <br/>
                 <p><strong>Puntos clave de la propuesta:</strong></p>
                 <p>1. <strong>Saturación de Valor (20/80)</strong>: Implementamos una validación casa por casa que vincula el Nayarit ID con la geolocalización real, permitiendo una recaudación inteligente y personalizada.</p>
                 <p>2. <strong>Océano Azul: Agrotech & Health</strong>: Convertiremos a Tepic en el primer municipio del país en tokenizar cosechas y certificar salud preventiva rural mediante Gemini IA.</p>
                 <p>3. <strong>Rentabilidad</strong>: El sistema utiliza el marco de la <em>Ley de Gobierno Digital</em> para reducir costos operativos en un 35% y aumentar la captación vía FORTAMUN.</p>
                 <br/>
                 <p>Adjunto a este correo, puede visualizar el <strong>Mando Central Dashboard</strong>, donde ya se monitorean en tiempo real las obras y la adopción ciudadana.</p>
                 <br/>
                 <p>Quedo a su disposición para una presentación ejecutiva.</p>
                 <br/>
                 <p>Atentamente,<br/>[Su Nombre]<br/>Estratega Nayarit Digital 2026</p>
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

           {/* Strategic Strategy Annex */}
           <section className="pt-12 border-t border-black/5">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[var(--magenta)]" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--tinta)]">Estrategia Sectorial: BrigadaMX</h2>
                 </div>
                 <div className="flex flex-wrap items-center gap-3">
                   <button 
                     onClick={() => setActiveView('whitepaper')}
                     className="bg-indigo-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                   >
                     <BookOpen className="w-4 h-4" />
                     Leer Whitepaper Ley Digital
                   </button>
                   <button 
                     onClick={() => setActiveView('defense')}
                     className="bg-rose-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/20 flex items-center gap-2"
                   >
                     <Swords className="w-4 h-4" />
                     War Room (Objeciones)
                   </button>
                   <button 
                     onClick={() => setActiveView('demo')}
                     className="bg-slate-900 border border-slate-800 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[var(--magenta)] transition-colors shadow-lg shadow-black/20 mt-2 sm:mt-0"
                   >
                     Abrir Simulador Móvil
                   </button>
                 </div>
              </div>
              
              <BrigadaStrategy />
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
