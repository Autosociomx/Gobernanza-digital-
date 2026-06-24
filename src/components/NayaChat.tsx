import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// ─── Knowledge base (no API required) ────────────────────────────────────────

const KB: { keywords: string[]; respuesta: string }[] = [
  {
    keywords: ['licencia', 'funcionamiento', 'negocio', 'comercio'],
    respuesta: '🏪 La **Licencia de Funcionamiento** tarda 15 días hábiles (Art. 19 LMR). Si el municipio no responde en ese plazo, se aprueba automáticamente con Silencio Afirmativo. Ve a Servicios → Trámites para iniciarla ahora mismo.',
  },
  {
    keywords: ['bache', 'hoyo', 'asfalto', 'calle', 'pavimento'],
    respuesta: '🕳️ Para **reportar un bache** ve a Servicios → Reportes Urbanos. Recibirás un folio de seguimiento y el área responsable tiene 10 días hábiles para atenderte. Tu reporte no se cierra sin que tú lo confirmes.',
  },
  {
    keywords: ['expediente', 'documento', 'ine', 'curp', 'comprobante', 'rfc', 'acta'],
    respuesta: '📁 El **Expediente Único Digital** te permite subir tus documentos (INE, CURP, RFC, Comprobante) una sola vez. El municipio no puede volvértelos a pedir, conforme al Art. 18 LMR. Ve a tu Perfil → Expediente Único.',
  },
  {
    keywords: ['plazo', 'dias', 'tiempo', 'respuesta', 'silencio'],
    respuesta: '⏱️ El **Silencio Afirmativo** significa que si el gobierno no responde en el plazo legal, el trámite se aprueba automáticamente. Puedes ver el contador de días en cada trámite desde Servicios → Mis Trámites.',
  },
  {
    keywords: ['datos', 'privacidad', 'eliminar', 'borrar', 'arco'],
    respuesta: '🔒 Tienes **derecho ARCO** (acceso, rectificación, cancelación y oposición) sobre tus datos. Para ejercerlo ve a Perfil → Seguridad → Derechos ARCO. Puedes descargar o eliminar todos tus datos con un clic.',
  },
  {
    keywords: ['puntos', 'recompensa', 'nayarit points', 'premio', 'beneficio'],
    respuesta: '🎯 Los **Nayarit Points** se ganan por: crear reportes (+50), resolver trámites (+150), completar tu Expediente (+100) y uso diario (+30). Pronto podrás canjearlos por descuentos en tenencia, predial y eventos municipales.',
  },
  {
    keywords: ['tramite', 'trámite', 'solicitud', 'construccion', 'uso de suelo'],
    respuesta: '📋 Puedes gestionar tus **trámites** desde Servicios → Trámites Administrativos. Cada trámite tiene un folio, un contador legal y notificación automática cuando cambia el estado.',
  },
  {
    keywords: ['pago', 'predial', 'tenencia', 'agua', 'luz', 'factura'],
    respuesta: '💳 Los **pagos en línea** están disponibles en la sección de Pagos. Puedes pagar predial, tenencia y servicios municipales. Todos los comprobantes quedan en tu Expediente Digital.',
  },
  {
    keywords: ['salud', 'medico', 'doctor', 'cita', 'enfermedad', 'triage'],
    respuesta: '🏥 Usa el módulo **Salud ConectaX** para un triaje de síntomas con IA (CIE-11). Si el caso es urgente, te redirige al 911. Ve a Servicios → Salud ConectaX.',
  },
  {
    keywords: ['luminaria', 'alumbrado', 'luz', 'foco'],
    respuesta: '💡 Para **reportar una luminaria** fundida ve a Servicios → Reportes Urbanos → Luminaria. El plazo de atención es 7 días hábiles. Recibirás tu folio y notificaciones de avance.',
  },
  {
    keywords: ['agua', 'fuga', 'tuberia', 'alcantarilla'],
    respuesta: '💧 Para **reportar una fuga de agua** ve a Servicios → Reportes Urbanos → Fuga / Agua. El SAPA tiene 5 días hábiles para atenderlo. Tu reporte incluye foto y geolocalización.',
  },
  {
    keywords: ['hola', 'ayuda', 'help', 'inicio', 'que puedes', 'qué puedes'],
    respuesta: '¡Hola! Soy **Naya** 👋, tu asistente de Gobierno Digital en Tepic. Puedo ayudarte con:\n\n• 📋 Trámites y sus plazos legales\n• 📍 Reportes urbanos (baches, luminarias, agua)\n• 📁 Tu Expediente Único Digital\n• 🔒 Privacidad y derechos ARCO\n• 🎯 Nayarit Points\n\n¿Sobre qué quieres saber?',
  },
];

function buscarRespuesta(input: string): string {
  const lower = input.toLowerCase();
  for (const item of KB) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.respuesta;
    }
  }
  return 'Entiendo tu consulta, pero no tengo información específica sobre eso. 🤔 Te recomiendo visitar tepic.netlify.app o llamar al Ayuntamiento al **(311) 213-0400**. También puedes preguntar sobre: **trámites, reportes, expediente, pagos, salud** o **puntos**.';
}

interface Mensaje {
  id: string;
  from: 'naya' | 'user';
  text: string;
  ts: Date;
}

function MensajeBurbuja({ m }: { m: Mensaje }) {
  const isNaya = m.from === 'naya';
  const lines = m.text.split('\n');
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-2 items-end', isNaya ? 'justify-start' : 'justify-end')}
    >
      {isNaya && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center flex-shrink-0 mb-0.5">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] px-4 py-3 rounded-[1.25rem] text-[12px] leading-relaxed',
          isNaya
            ? 'bg-slate-800 text-slate-200 rounded-bl-md'
            : 'bg-gradient-to-br from-violet-600 to-rose-500 text-white rounded-br-md'
        )}
      >
        {lines.map((line, i) => (
          <p key={i} className={i > 0 && line === '' ? 'mt-1' : ''}>
            {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j}>{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        ))}
        <p className="text-[9px] mt-1 opacity-40">
          {m.ts.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function NayaChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: 'welcome',
      from: 'naya',
      text: '¡Hola! Soy **Naya** 👋 Tu asistente de Tepic Digital. Pregúntame sobre trámites, reportes, expediente o tus derechos ciudadanos.',
      ts: new Date(),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, typing]);

  const enviar = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Mensaje = { id: Date.now().toString(), from: 'user', text, ts: new Date() };
    setMensajes(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const respuesta = buscarRespuesta(text);
      const nayaMsg: Mensaje = { id: (Date.now() + 1).toString(), from: 'naya', text: respuesta, ts: new Date() };
      setMensajes(prev => [...prev, nayaMsg]);
      setTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); }
  };

  const SUGERENCIAS = ['Trámite de licencia', 'Reportar bache', 'Mis puntos', 'Derechos ARCO'];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-gradient-to-br from-violet-600 to-rose-500 rounded-full shadow-2xl shadow-violet-500/40 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 left-4 z-50 max-w-sm mx-auto"
          >
            <div className="bg-[#0f1115] rounded-[2rem] shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
              style={{ height: '70vh', maxHeight: 520 }}>
              {/* Header */}
              <div className="bg-gradient-to-r from-violet-900/80 to-rose-900/80 p-4 flex items-center justify-between flex-shrink-0 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white leading-none">Naya</p>
                    <p className="text-[9px] text-white/40 font-mono">Asistente Digital · Tepic</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-emerald-400 font-mono">EN LÍNEA</span>
                  </div>
                  <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mensajes.map(m => <MensajeBurbuja key={m.id} m={m} />)}
                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-end">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-slate-800 px-4 py-3 rounded-[1.25rem] rounded-bl-md flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions */}
              {mensajes.length <= 2 && !typing && (
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0">
                  {SUGERENCIAS.map(s => (
                    <button key={s} onClick={() => { setInput(s); }}
                      className="flex-shrink-0 text-[10px] font-bold text-violet-300 border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-violet-500/20 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-white/5 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-full px-4 py-3 outline-none focus:ring-1 focus:ring-violet-500/50"
                />
                <button
                  onClick={enviar}
                  disabled={!input.trim()}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                    input.trim()
                      ? "bg-gradient-to-br from-violet-600 to-rose-500 shadow-lg"
                      : "bg-slate-800 cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
