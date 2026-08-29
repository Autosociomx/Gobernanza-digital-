import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, Sparkles, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { DemoDataBadge } from './DemoDataBadge';

interface LevelProps {
  level: 'BRONCE' | 'PLATA' | 'ORO';
  title: string;
  description: string;
  status: 'locked' | 'in_progress' | 'completed';
  benefits: string[];
  temario: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const LevelCard = ({ level, title, description, status, benefits, temario, isOpen, onToggle }: LevelProps) => {
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
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
          status === 'completed' ? "bg-emerald-500 text-white" :
          status === 'in_progress' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" :
          "bg-slate-200 text-slate-600"
        )}
      >
        {isOpen ? 'Ocultar temario' : 'Ver temario del nivel'}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3 border-t border-slate-200/70 pt-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Temario propuesto · Nivel {level}
          </p>
          <ul className="space-y-2">
            {temario.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            {isLocked
              ? 'Este nivel todavía no tiene contenido cargado ni inscripción abierta: se libera cuando exista el convenio de capacitación.'
              : 'Aún no hay lecciones publicadas ni registro de avance por persona: el temario es el alcance comprometido, no un curso en línea activo.'}
          </p>
        </div>
      )}
    </div>
  );
};

export function ConnectXAcademy({ onBack, onGoToStrategy }: { onBack: () => void, onGoToStrategy: () => void }) {
  const [openLevel, setOpenLevel] = useState<'BRONCE' | 'PLATA' | 'ORO' | null>(null);
  const toggleLevel = (nivel: 'BRONCE' | 'PLATA' | 'ORO') =>
    setOpenLevel(actual => (actual === nivel ? null : nivel));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col min-h-screen bg-slate-50"
    >
      <header className="p-6 bg-slate-900 text-white rounded-b-[3rem] shadow-2xl shadow-slate-900/20">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-magenta-400 mb-2">ConnectX Academy</p>
            <h1 className="text-3xl font-serif font-black leading-tight">Servidor Público<br/>Digital 2026</h1>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={onGoToStrategy}
                className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-colors"
             >
                Blueprint
             </button>
             <button 
               onClick={onBack}
               className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
             >
               <ChevronRight className="w-6 h-6 rotate-180" />
             </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Progreso Global (ejemplo)</span>
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

      <main className="p-6 space-y-6">
        <DemoDataBadge detail="La Academia todavía no tiene cursos ni registro de avance: el 35% de progreso y el estado de cada nivel son de ejemplo, y los botones abren el temario propuesto, no una lección." />

        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-magenta-500" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Ruta de Conquista Laboral</h2>
        </div>

        <LevelCard
          level="BRONCE"
          title="Erradicación del Miedo"
          description="Desmantela la narrativa de reemplazo. Interactúa con Aura para comprender que tu conocimiento del terreno es irreemplazable. Toma el control hoy."
          status="completed"
          benefits={["Auditoría de Carga Cognitiva", "Acceso Directo: Mentor Aura", "Insignia de Soberanía"]}
          temario={[
            "Qué automatiza y qué no automatiza un sistema de gobierno digital.",
            "Lectura del pacto de cero despidos y de las garantías sindicales.",
            "Uso básico del asistente Aura para redactar y consultar."
          ]}
          isOpen={openLevel === 'BRONCE'}
          onToggle={() => toggleLevel('BRONCE')}
        />

        <LevelCard
          level="PLATA"
          title="Dominio de la Herramienta"
          description="Convierte la IA en tu extensión operativa. Redacta, organiza y gestiona con una eficiencia que antes tomaba días. Tú eres el procesador."
          status="in_progress"
          benefits={["Blueprint de Digitalización", "Certificación Forense Intermedia", "Sincronización Sindical Activa"]}
          temario={[
            "Digitalización de un trámite de la ventanilla propia, de principio a fin.",
            "Criterios de evidencia: qué se puede afirmar de un sistema y qué no.",
            "Manejo del expediente digital y de los acuses generados por la plataforma."
          ]}
          isOpen={openLevel === 'PLATA'}
          onToggle={() => toggleLevel('PLATA')}
        />

        <LevelCard
          level="ORO"
          title="Liderazgo de Transformación"
          description="Evoluciona a Arquitecto de Procesos. Diseña el futuro de tu dependencia bajo estándares de soberanía absoluta."
          status="locked"
          benefits={["Tesina de Innovación Aplicada", "Doble Sello de Autoridad", "Perfil de Estratega Digital"]}
          temario={[
            "Rediseño completo de un proceso de la dependencia propia.",
            "Formación de instructores internos dentro del sindicato.",
            "Tesina aplicada con medición antes/después del trámite intervenido."
          ]}
          isOpen={openLevel === 'ORO'}
          onToggle={() => toggleLevel('ORO')}
        />

        <div className="bg-[#0f285c] rounded-[2.5rem] p-6 text-white">
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Protección Sindical (propuesta)</p>
              <p className="text-[11px] font-medium text-white/90">Certificación con doble sello (municipio y sindicato) sujeta a convenio: hoy no existe aval firmado.</p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
