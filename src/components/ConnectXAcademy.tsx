import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, Sparkles, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

interface LevelProps {
  level: 'BRONCE' | 'PLATA' | 'ORO';
  title: string;
  description: string;
  status: 'locked' | 'in_progress' | 'completed';
  benefits: string[];
}

const LevelCard = ({ level, title, description, status, benefits }: LevelProps) => {
  const isLocked = status === 'locked';
  
  return (
    <div className={cn(
      "relative p-6 rounded-[2.5rem] border transition-all duration-300",
      status === 'completed' ? "bg-emerald-50 border-emerald-100" : 
      status === 'in_progress' ? "bg-white border-blue-100 shadow-xl shadow-blue-500/5" :
      "bg-slate-50 border-slate-100 opacity-60"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
          level === 'BRONCE' ? "bg-orange-400" : level === 'PLATA' ? "bg-slate-400" : "bg-yellow-500"
        )}>
          {level === 'ORO' ? <Award className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
        </div>
        {status === 'completed' ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        ) : isLocked ? (
          <Lock className="w-5 h-5 text-slate-300" />
        ) : null}
      </div>

      <div className="mb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Nivel {level}</p>
        <h3 className="text-xl font-serif font-black text-slate-900 leading-tight mb-2">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-2 mb-6">
        {benefits.map((benefit, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{benefit}</p>
          </div>
        ))}
      </div>

      <button 
        disabled={isLocked}
        className={cn(
          "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
          status === 'completed' ? "bg-emerald-500 text-white" :
          status === 'in_progress' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" :
          "bg-slate-200 text-slate-400"
        )}
      >
        {status === 'completed' ? 'Certificado Obtenido' : status === 'in_progress' ? 'Continuar Módulo' : 'Nivel Bloqueado'}
      </button>
    </div>
  );
};

export function ConnectXAcademy({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col min-h-screen bg-slate-50"
    >
      <header className="p-8 bg-slate-900 text-white rounded-b-[3rem] shadow-2xl shadow-slate-900/20">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-magenta-400 mb-2">ConnectX Academy</p>
            <h1 className="text-3xl font-serif font-black leading-tight">Servidor Público<br/>Digital 2026</h1>
          </div>
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Tu Progreso Global</span>
            <span className="text-xl font-serif font-black text-magenta-400">35%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '35%' }}
              className="h-full bg-magenta-500"
            />
          </div>
        </div>
      </header>

      <main className="p-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-magenta-500" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Ruta de Conquista Laboral</h2>
        </div>

        <LevelCard 
          level="BRONCE"
          title="Vencer el Miedo"
          description="Entiende qué es y qué no es la IA interactuando con Aura. Deja de verla como amenaza y reconócela como tu aliada."
          status="completed"
          benefits={["Diagnóstico de Carga Laboral", "Acceso a Chat de Soporte Aura", "Insignia de Iniciación"]}
        />

        <LevelCard 
          level="PLATA"
          title="Dominar la Herramienta"
          description="Usa la IA en tu trabajo diario: redacta oficios, organiza datos y gestiona trámites en segundos."
          status="in_progress"
          benefits={["Propuesta de Digitalización", "Certificación Técnica Intermedia", "Sincronización con Sindicato"]}
        />

        <LevelCard 
          level="ORO"
          title="Liderar el Cambio"
          description="Conviértete en un Gestor de Innovación. Detecta fallos en procesos y propón soluciones soberanas."
          status="locked"
          benefits={["Proyecto de Grado Aplicado", "Doble Sello: ConnectX + Sindicato", "Perfil de Auditor Maestro"]}
        />

        <div className="bg-[#0f285c] rounded-[2.5rem] p-8 text-white">
          <BookOpen className="w-10 h-10 mb-4 text-cyan-400" />
          <h4 className="text-xl font-serif font-black mb-2">Manifiesto del Trabajador Digital</h4>
          <p className="text-xs text-white/70 leading-relaxed mb-6">
            "La tecnología va a llegar de todas formas. La única pregunta es si llega CONTRA el trabajador o DE LA MANO del trabajador."
          </p>
          <div className="flex items-center gap-4 py-4 border-t border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Protección Sindical</p>
              <p className="text-[11px] font-medium text-white/90">Certificación avalada por tu organización.</p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
