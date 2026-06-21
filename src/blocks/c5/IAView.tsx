import React, { useState, useEffect } from 'react';
import { Send, Loader2, Bot, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

type Language = 'es' | 'cora' | 'wixarika';

export function IAView() {
  const [lang, setLang] = useState<Language>('es');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Presidenta Geraldine Ponce, el Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?' }
  ]);

  useEffect(() => {
    const greets: Record<Language, string> = {
      es: 'Presidenta Geraldine Ponce, el Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?',
      cora: "Presidenta Geraldine Ponce, ConnectX IA amu'u tyu'un. ¿Tyu'un ne'ij tyu'uti'in Tepic?",
      wixarika: "Geraldine Ponce keniu, ConnectX IA keniu. ¿Kewa pikanetsi'iwau Tepic?"
    };
    setMessages([{ role: 'assistant', content: greets[lang] }]);
  }, [lang]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const strategicShortcuts = [
    "Resumen Recaudación",
    "Optimización Bacheo",
    "Reporte Bienestar",
    "Visión Tepic 2027"
  ];

  const handleSendMessage = async (text?: string) => {
    const userMsg = text || inputValue.trim();
    if (!userMsg) return;

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (!text) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `${userMsg} (Context: Governance Admin, Language: ${lang})` })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-black text-white flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-xl">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
            Nucleo ConnectX AI
          </h3>
          <p className="text-slate-500 text-xs mt-2 uppercase font-black tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            GOBERNANZA DATA-DRIVEN · COBERTURA TOTAL
          </p>
        </div>
        <div className="flex gap-2">
          {(['es', 'cora', 'wixarika'] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "w-12 h-12 rounded-xl font-black text-[10px] uppercase shadow-lg transition-all",
                lang === l ? "bg-purple-600 text-white ring-2 ring-purple-500/40" : "bg-slate-800 text-slate-500 hover:bg-slate-700"
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        <div className="bg-[#12141a] border border-slate-800 rounded-[2.5rem] p-8 flex flex-col h-[650px] shadow-3xl">
          <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}
              >
                <div className={cn(
                  "p-6 rounded-[2rem] text-[1.1rem] leading-relaxed shadow-xl max-w-[90%] font-medium",
                  msg.role === 'assistant'
                    ? "bg-slate-800/80 text-white border border-slate-700 rounded-tl-none"
                    : "bg-purple-600 text-white rounded-tr-none shadow-purple-600/20"
                )}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-600 mt-3 font-black uppercase tracking-widest px-2">
                  {msg.role === 'user' ? 'G. Ponce' : 'ConnectX Strategic AI'} · {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3 p-6 bg-slate-800/50 rounded-[2rem] rounded-tl-none border border-slate-700 w-28">
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50 space-y-6">
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {strategicShortcuts.map(s => (
                <button
                  key={s}
                  onClick={() => handleSendMessage(s)}
                  className="px-6 py-3 bg-slate-800/50 hover:bg-purple-600 text-[10px] text-slate-400 hover:text-white uppercase font-black tracking-widest rounded-xl border border-slate-700 hover:border-purple-500 transition-all active:scale-95 whitespace-nowrap shadow-lg"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                aria-label="Introducir comando ejecutivo"
                placeholder="Introducir comando ejecutivo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white text-[1rem] pr-20 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-bold placeholder:text-slate-800"
              />
              <button
                onClick={() => handleSendMessage()}
                aria-label="Enviar"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-xl shadow-xl hover:bg-purple-500 transition-all active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#161920] border border-slate-800 rounded-[2.5rem] p-8 shadow-3xl">
            <h4 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[0.3em] border-l-4 border-purple-500 pl-4">Eficacia del Sistema</h4>
            <div className="space-y-10">
              {[
                { label: 'Indice de Recaudación Digital', val: 94.2, color: 'bg-emerald-500' },
                { label: 'Resolución Autónoma IA', val: 78.5, color: 'bg-purple-500' },
                { label: 'Satisfacción Ciudadana (UX)', val: 91.0, color: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white text-lg">{item.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className={`h-full ${item.color} shadow-lg`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-purple-600/5 rounded-3xl border border-purple-600/20">
              <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-3">Reporte Algorítmico:</p>
              <p className="text-sm text-slate-400 italic leading-relaxed font-medium">
                "La integración del módulo de recaudación digital en Tepic ha superado las proyecciones iniciales, eliminando el 100% de la opacidad en transferencias de ventanilla."
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-3xl">
            <TrendingUp className="w-12 h-12 mb-6 text-white/40" />
            <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter italic">Vanguardia Digital</h4>
            <p className="text-sm text-white/60 leading-relaxed font-medium mb-8">
              ConnectX es ahora el sistema operativo municipal más avanzado de México, diseñado para la trazabilidad absoluta.
            </p>
            <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all active:scale-95">
              Consultar Auditoría Google Cloud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
