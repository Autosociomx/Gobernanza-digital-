import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Mic, 
  Send, 
  X, 
  ChevronLeft, 
  Info,
  Stethoscope,
  User,
  Users,
  HardHat,
  ChevronRight,
  Loader2,
  Phone,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type RolType = 'paciente' | 'familiar' | 'promotor';
type TriageLevel = 'ROJO' | 'AMARILLO' | 'VERDE' | null;

interface Message {
  role: 'assistant' | 'user';
  content: string;
  triage?: TriageLevel;
}

export function TepictuSalud({ onClose }: { onClose: () => void }) {
  const [screen, setScreen] = useState<'splash' | 'rol' | 'input' | 'chat'>('splash');
  const [rol, setRol] = useState<RolType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startTriage = () => {
    setScreen('rol');
  };

  const selectRol = (selectedRol: RolType) => {
    setRol(selectedRol);
  };

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
        body: JSON.stringify({ 
          message: userMsg,
          context: `MODO_SALUD: Eres TepictuSalud en modo ${rol}. Clasifica según sistema Manchester al final con [TRIAJE:ROJO/AMARILLO/VERDE]`
        })
      });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      // Parse triage from response
      let triage: TriageLevel = null;
      if (data.response.includes('[TRIAJE:ROJO]')) triage = 'ROJO';
      if (data.response.includes('[TRIAJE:AMARILLO]')) triage = 'AMARILLO';
      if (data.response.includes('[TRIAJE:VERDE]')) triage = 'VERDE';

      const cleanedContent = data.response.replace(/\[TRIAJE:(ROJO|AMARILLO|VERDE)\]/gi, '').trim();

      setMessages(prev => [...prev, { role: 'assistant', content: cleanedContent, triage }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Lo siento, hubo un problema de conexión. Si es una emergencia, llama al 911." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const initChat = () => {
    const greetings = {
      paciente: '¡Hola! Soy el asistente de salud del Municipio de Tepic 👋\n\nEstoy aquí para ayudarte a entender qué tan urgente es lo que sientes. ¿Qué molestia principal tienes ahorita?',
      familiar: '¡Hola! Entiendo que estás describiendo los síntomas de alguien más. ¿Quién es la persona que necesita atención y qué está sintiendo?',
      promotor: 'TepictuSalud — Modo Promotor activado ✓\n\nDescribe los síntomas principales del ciudadano que estás evaluando. Incluye edad y tiempo de evolución.'
    };
    
    setMessages([{ role: 'assistant', content: greetings[rol || 'paciente'] }]);
    setScreen('chat');
  };

  // Dr. Salvador SVG Identidad
  const MedicalAvatar = () => (
    <svg className="w-12 h-12" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="58" fill="rgba(255,255,255,0.12)" stroke="rgba(26,107,60,0.3)" strokeWidth="1.5"/>
      <rect x="32" y="72" width="56" height="36" rx="8" fill="#ffffff"/>
      <line x1="60" y1="72" x2="60" y2="108" stroke="#e5e7eb" strokeWidth="1.5"/>
      <rect x="53" y="78" width="14" height="5" rx="2.5" fill="#1a6b3c"/>
      <rect x="56.5" y="74.5" width="7" height="12" rx="3.5" fill="#1a6b3c"/>
      <circle cx="60" cy="52" r="20" fill="#fde8d0"/>
      <path d="M40 50 Q40 32 60 30 Q80 32 80 50 Q80 38 60 36 Q40 38 40 50Z" fill="#3d2b1a"/>
      <ellipse cx="53" cy="50" rx="3" ry="3.5" fill="#2c1a0e"/>
      <ellipse cx="67" cy="50" rx="3" ry="3.5" fill="#2c1a0e"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-[#fafaf8] flex flex-col font-sans overflow-hidden">
      
      {/* HEADER DINÁMICO */}
      {screen !== 'splash' && (
        <header className="bg-[#1a6b3c] px-6 py-4 flex items-center gap-4 text-white shadow-lg shrink-0">
          <div className="w-10 h-10 shrink-0">
            <MedicalAvatar />
          </div>
          <div>
            <h1 className="font-serif font-black text-lg leading-none">Tepictu<span className="text-[#c9952a]">Salud</span></h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">Municipio de Tepic · Triaje IA</p>
          </div>
          <button onClick={onClose} className="ml-auto p-2 bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </header>
      )}

      <main className="flex-1 flex flex-col items-center overflow-y-auto">
        
        {/* PANTALLA SPLASH */}
        {screen === 'splash' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-1 w-full bg-gradient-to-br from-[#0f4d2b] via-[#1a6b3c] to-[#2d9e5f] flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="mb-8">
              <div className="w-32 h-32 mx-auto filter drop-shadow-2xl">
                <MedicalAvatar />
              </div>
            </motion.div>
            
            <h1 className="font-serif font-black text-5xl text-white mb-2 leading-tight">Tepictu<span className="text-[#c9952a]">Salud</span></h1>
            <p className="text-[#c9952a] font-black uppercase tracking-[0.2em] text-xs mb-4">Ecosistema Nayarit Digital</p>
            
            <div className="bg-[#c9952a]/10 border border-[#c9952a]/30 rounded-full px-4 py-2 flex items-center gap-2 text-[#c9952a] text-xs font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-[#c9952a] animate-pulse"></span>
              Gobernanza de Bienestar 2.0
            </div>

            <p className="text-white/80 text-lg leading-relaxed max-w-sm mb-12">
              Evalúa tus síntomas con IA estratégica antes de acudir al hospital. Orientación inmediata para Tepic.
            </p>

            <button 
              onClick={startTriage}
              className="w-full max-w-sm py-5 bg-[#c9952a] text-[#1a1a1a] rounded-[2rem] font-black text-lg shadow-[0_10px_30px_rgba(201,149,42,0.3)] hover:scale-105 transition-transform"
            >
              Comenzar Evaluación →
            </button>

            <p className="mt-8 text-white/40 text-[10px] uppercase font-bold tracking-widest max-w-[250px]">
              Este servicio orienta pero no reemplaza la consulta médica · Emergencias: 911
            </p>
          </motion.div>
        )}

        {/* PANTALLA ROL */}
        {screen === 'rol' && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full max-w-md p-8 flex flex-col gap-6">
            <div>
              <h2 className="font-serif font-black text-3xl text-[#1a6b3c] mb-2 leading-tight">¿Quién necesita ayuda?</h2>
              <p className="text-slate-500 font-medium">Selecciona para personalizar la atención estratégica.</p>
            </div>

            <div className="space-y-4">
              {[
                { id: 'paciente', icon: '👤', title: 'Yo mismo / Yo misma', sub: 'Tienes síntomas y necesitas clasificar tu urgencia.' },
                { id: 'familiar', icon: '👨‍👩‍👧', title: 'Familiar o acompañante', sub: 'Describes los síntomas de otra persona.' },
                { id: 'promotor', icon: '👷', title: 'Promotor de Bienestar', sub: 'Evaluación técnica en campo o módulo.' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => selectRol(item.id as RolType)}
                  className={cn(
                    "w-full p-6 bg-white border-2 rounded-[2rem] text-left flex items-center gap-5 transition-all shadow-sm",
                    rol === item.id ? "border-[#1a6b3c] bg-[#e8f5ed] scale-[1.02]" : "border-slate-100 hover:border-[#2d9e5f]"
                  )}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0",
                    rol === item.id ? "bg-[#1a6b3c]" : "bg-[#f4f6f3]"
                  )}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{item.sub}</p>
                  </div>
                </button>
              ))}
            </div>

            <button 
              disabled={!rol}
              onClick={() => setScreen('input')}
              className="mt-8 py-5 bg-[#1a6b3c] text-white rounded-[2rem] font-black text-lg disabled:opacity-30 shadow-xl"
            >
              Continuar →
            </button>
          </motion.div>
        )}

        {/* PANTALLA MODO INPUT */}
        {screen === 'input' && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full max-w-md p-8 flex flex-col gap-6 h-full">
            <div>
              <h2 className="font-serif font-black text-3xl text-[#1a6b3c] mb-2 leading-tight">¿Cómo prefieres contarnos?</h2>
              <p className="text-slate-500 font-medium">Elige la vía más cómoda para describir los síntomas.</p>
            </div>

            <div className="grid gap-4">
              <button 
                onClick={initChat}
                className="w-full p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-center flex flex-col items-center gap-4 hover:border-[#1a6b3c] transition-all shadow-sm group"
              >
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl shadow-inner group-hover:bg-amber-100 transition-colors">🎤</div>
                <div>
                  <h3 className="font-black text-slate-800 text-xl uppercase tracking-tighter">Con tu voz</h3>
                  <p className="text-slate-500 text-sm mt-1 max-w-[220px]">Habla libremente, la IA entiende términos regionales.</p>
                </div>
              </button>

              <button 
                onClick={initChat}
                className="w-full p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-center flex flex-col items-center gap-4 hover:border-[#1a6b3c] transition-all shadow-sm group"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-4xl shadow-inner group-hover:bg-blue-100 transition-colors">⌨️</div>
                <div>
                  <h3 className="font-black text-slate-800 text-xl uppercase tracking-tighter">Escribiendo</h3>
                  <p className="text-slate-500 text-sm mt-1 max-w-[220px]">Escribe a tu ritmo. Ideal para lugares concurridos.</p>
                </div>
              </button>
            </div>

            <div className="mt-auto p-4 bg-[#e8f5ed] border border-[#2d9e5f]/20 rounded-2xl flex items-center gap-3 text-[#1a6b3c] text-xs font-bold uppercase tracking-wider">
              <Info className="w-5 h-5 shrink-0" />
              TepictuSalud funciona con tecnología offline-first para emergencias.
            </div>
          </motion.div>
        )}

        {/* PANTALLA CHAT */}
        {screen === 'chat' && (
          <div className="w-full flex-1 flex flex-col bg-[#f4f6f3]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}
                >
                  <div className={cn(
                    "p-6 rounded-[2rem] text-legible shadow-sm max-w-[90%]",
                    msg.role === 'assistant' 
                      ? "bg-white text-slate-900 rounded-tl-none border border-slate-200" 
                      : "bg-[#1a6b3c] text-white rounded-tr-none shadow-lg shadow-[#1a6b3c]/20"
                  )}>
                    {msg.content}
                    
                    {msg.triage && (
                      <div className={cn(
                        "mt-5 p-5 rounded-2xl flex items-center gap-4 font-black text-xs uppercase tracking-[0.15em] border-2",
                        msg.triage === 'ROJO' ? "bg-red-50 text-red-700 border-red-200 shadow-lg shadow-red-500/10" :
                        msg.triage === 'AMARILLO' ? "bg-amber-50 text-amber-700 border-amber-200 shadow-lg shadow-amber-500/10" :
                        "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-lg shadow-emerald-500/10"
                      )}>
                        <div className={cn(
                          "w-3 h-3 rounded-full animate-pulse",
                          msg.triage === 'ROJO' ? "bg-red-600" : msg.triage === 'AMARILLO' ? "bg-amber-600" : "bg-emerald-600"
                        )} />
                        TRIAJE: {msg.triage === 'ROJO' ? 'URGENCIA ABSOLUTA' : msg.triage === 'AMARILLO' ? 'URGENTE — ATENCIÓN PRONTO' : 'PUEDE ESPERAR'}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-black uppercase text-slate-400 mt-2 tracking-widest px-2">
                    {msg.role === 'user' ? 'Ciudadano' : 'ConnectX Salud'} · {new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 p-5 bg-white rounded-[2rem] rounded-tl-none w-20 shadow-sm border border-slate-100">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-white border-t border-slate-100 shrink-0">
              <div className="flex gap-3 items-center">
                <button className="w-14 h-14 bg-emerald-50 text-[#1a6b3c] rounded-[1.2rem] flex items-center justify-center text-xl shadow-inner shrink-0 hover:bg-emerald-100">
                  <Mic className="w-6 h-6" />
                </button>
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe el síntoma..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-6 py-4 text-slate-800 text-[1.1rem] focus:outline-none focus:border-[#1a6b3c] transition-colors pr-14 font-medium"
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a6b3c] text-white rounded-xl shadow-lg flex items-center justify-center active:scale-90"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER ACCIONES RÁPIDAS (Solo en Chat) */}
      {screen === 'chat' && (
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex gap-4 justify-center items-center shrink-0">
          <button className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-[0.2em] border border-red-100 px-4 py-2 rounded-full">
            <Phone className="w-4 h-4" /> 911 EMERGENCIA
          </button>
          <div className="w-px h-6 bg-slate-200"></div>
          <button className="flex items-center gap-2 text-[#1a6b3c] font-black text-xs uppercase tracking-[0.2em]">
            <Heart className="w-4 h-4" /> BOTIQUÍN
          </button>
        </div>
      )}
    </div>
  );
}
