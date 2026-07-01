import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Zap, Shield, Code, ChevronLeft, Copy, Check, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export function BananaCommandCenter({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);

  const prompts = [
    {
      id: 'audit',
      title: 'Protocolo de Auditoría Forense',
      description: 'Lógica interna para el Mystery Shopper. Asegura la integridad de la base de datos.',
      prompt: 'Actúa como un Auditor Forense Digital. Revisa la integridad referencial de las colecciones de Firestore. Busca inconsistencias en campos de UID y marcas de tiempo. Reporta dependencias rotas con un nivel de severidad 0-5.'
    },
    {
      id: 'academy',
      title: 'Estrategia NLP de Academia',
      description: 'Anclajes psicológicos para la certificación sindical.',
      prompt: 'Utiliza técnicas de Programación Neurolingüística (PNL) para motivar al servidor público. Evita palabras que impliquen reemplazo. Usa términos como "Ampliación de Capacidades" y "Soberanía Profesional". El tono debe ser inspirador pero directivo.'
    },
    {
      id: 'governance',
      title: 'Motor de Gobernanza ConnectX',
      description: 'La instrucción maestra que rige el comportamiento de Aura.',
      prompt: 'Eres Aura, la inteligencia soberana de ConnectX. Tu objetivo es la transparencia radical. No alucines datos. Si una obra pública no tiene presupuesto público, declara "Opacidad Detectada" y solicita transparencia ciudadana.'
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col min-h-screen bg-[#050505] text-slate-300 font-mono"
    >
      <header className="p-8 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
         <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-magenta-500 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Exit Terminal</span>
         </button>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">Banana Command Center</h1>
         </div>
      </header>

      <main className="p-8 space-y-10">
         <div className="space-y-2">
            <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em]">Advanced Prompt Engineering</p>
            <h2 className="text-4xl font-serif font-black text-white tracking-tighter">La Lógica Detrás<br/>del Sistema</h2>
            <p className="text-slate-500 text-xs max-w-lg leading-relaxed">
               Accede a la arquitectura de comunicación que rige el ecosistema **ConnectX**. Aquí reside el "Cómo" de nuestra inteligencia soberana.
            </p>
         </div>

         <div className="grid gap-6">
            {prompts.map((p) => (
              <div key={p.id} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 group hover:border-magenta-500/30 transition-all">
                 <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                       <h3 className="text-xl font-serif font-black text-white">{p.title}</h3>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.description}</p>
                    </div>
                    <button 
                      onClick={() => handleCopy(p.prompt, p.id)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                        copied === p.id ? "bg-emerald-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {copied === p.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                 </div>
                 
                 <div className="bg-black/50 rounded-2xl p-6 border border-white/5 relative group/code">
                    <div className="absolute top-4 right-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">Banana Logic</div>
                    <code className="text-xs text-yellow-400/80 leading-relaxed block pr-12">
                       {p.prompt}
                    </code>
                 </div>
              </div>
            ))}
         </div>

         <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-4">
            <Zap className="w-10 h-10 text-yellow-400" />
            <h4 className="text-xl font-serif font-black text-white tracking-tight">¿Deseas Inyectar Nuevas Lógicas?</h4>
            <p className="text-slate-400 text-xs max-w-sm">
               La arquitectura "Banana" permite actualizaciones en caliente de los protocolos de comunicación. Contacta al equipo de ConnectX para expansiones de red.
            </p>
            <button className="mt-4 px-8 py-4 bg-yellow-400 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-300 transition-all">
               Sugerir Optimización
            </button>
         </div>
      </main>
    </motion.div>
  );
}
