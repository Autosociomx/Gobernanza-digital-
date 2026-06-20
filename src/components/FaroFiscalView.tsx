import React, { useState } from 'react';
import {
  Lighthouse, ChevronLeft, ChevronRight, Bot, Send,
  Loader2, CheckCircle2, AlertCircle, ExternalLink,
  TrendingUp, FileSearch, BookOpen, Banknote, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// Lucide doesn't have Lighthouse — use a custom icon
const FaroIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L8 6h8L12 2z"/>
    <rect x="9" y="6" width="6" height="10" rx="1"/>
    <path d="M6 16h12"/>
    <path d="M4 20h16"/>
    <path d="M12 6V2"/>
    <path d="M2 12l3 1"/>
    <path d="M22 12l-3 1"/>
    <path d="M4 8l2 2"/>
    <path d="M20 8l-2 2"/>
  </svg>
);

type TabType = 'inicio' | 'verificar' | 'guias' | 'asistente';

interface EscenarioFiscal {
  id: string;
  titulo: string;
  desc: string;
  monto: string;
  pasos: string[];
  url: string;
  tiempo: string;
  icono: string;
}

const ESCENARIOS: EscenarioFiscal[] = [
  {
    id: 'isr',
    titulo: 'Devolución de ISR',
    desc: 'Impuesto Sobre la Renta pagado en exceso durante el año fiscal',
    monto: 'Promedio $3,200 – $18,000 MXN',
    tiempo: '40 días hábiles',
    icono: '💰',
    url: 'https://www.sat.gob.mx/tramitesyservicios/74464/devolucion-automatica-de-saldo-a-favor-de-isr-de-personas-fisicas',
    pasos: [
      'Entra al portal SAT con tu RFC y Contraseña o e.firma',
      'Ve a "Trámites" → "Devoluciones y compensaciones"',
      'Selecciona "Devolución automática ISR personas físicas"',
      'Verifica el monto precalculado por el SAT',
      'Ingresa tu CLABE interbancaria de 18 dígitos',
      'Confirma y guarda el acuse de recibo',
    ],
  },
  {
    id: 'iva',
    titulo: 'Saldo a Favor IVA',
    desc: 'Crédito de IVA acumulado por actividades empresariales o profesionales',
    monto: 'Según declaraciones presentadas',
    tiempo: '20 días hábiles',
    icono: '🧾',
    url: 'https://www.sat.gob.mx',
    pasos: [
      'Accede al SAT con RFC + e.firma (obligatorio para IVA)',
      'Ve a "Declaraciones" y verifica saldo a favor acumulado',
      'En "Devoluciones" selecciona "IVA - Personas morales/físicas"',
      'Adjunta estados de cuenta y declaraciones anuales',
      'Ingresa CLABE y envía solicitud',
      'El SAT puede requerir información adicional en 20 días',
    ],
  },
  {
    id: 'predial',
    titulo: 'Devolución Predial Municipal',
    desc: 'Overpago o doble cobro en el impuesto predial de Tepic',
    monto: 'Varía según predio',
    tiempo: '15 días hábiles',
    icono: '🏠',
    url: 'https://tepic.gob.mx',
    pasos: [
      'Reúne los recibos de pago del predial con fecha y folio',
      'Ve a la Tesorería Municipal (Av. México 35, Centro)',
      'Solicita "Constancia de pago" para verificar el saldo',
      'Presenta solicitud de devolución por escrito con INE',
      'El municipio emite orden de pago en 15 días hábiles',
      'Cobras en ventanilla o vía transferencia bancaria',
    ],
  },
  {
    id: 'tenencia',
    titulo: 'Tenencia / ISAN',
    desc: 'Impuesto sobre automóviles nuevos o tenencia estatal pagados en exceso',
    monto: 'Según valor del vehículo',
    tiempo: '30 días hábiles',
    icono: '🚗',
    url: 'https://nayarit.gob.mx',
    pasos: [
      'Verifica con la Secretaría de Finanzas de Nayarit si aplica',
      'Reúne: título vehicular, tarjeta de circulación y recibo de pago',
      'Presenta solicitud en oficinas de Finanzas del Estado',
      'Adjusta comprobante de que no debes otras contribuciones',
      'Aprobación y transferencia en 30 días',
    ],
  },
];

const DERECHOS = [
  { titulo: 'Derecho a la devolución oportuna', desc: 'El SAT tiene 40 días para devolverte tu saldo a favor. Si tarda más, genera intereses a tu favor (art. 22 CFF).', icono: '⏱️' },
  { titulo: 'Derecho a conocer el estado de tu trámite', desc: 'Puedes consultar el avance en cualquier momento desde el portal del SAT con tu acuse de solicitud.', icono: '🔍' },
  { titulo: 'Derecho a compensar saldos', desc: 'Si tienes adeudos y saldo a favor, puedes solicitar compensación en lugar de devolución en efectivo.', icono: '⚖️' },
  { titulo: 'Derecho a impugnar negativas', desc: 'Si el SAT niega tu devolución, puedes interponer recurso de revocación en 30 días (art. 116 CFF).', icono: '📋' },
];

interface Props {
  onClose: () => void;
  profile?: { name?: string; neighborhood?: string };
}

export function FaroFiscalView({ onClose, profile }: Props) {
  const [tab, setTab] = useState<TabType>('inicio');
  const [selectedEscenario, setSelectedEscenario] = useState<EscenarioFiscal | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: `Hola${profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}. Soy el Asistente Fiscal de Nayarit Digital. Puedo orientarte sobre devoluciones de impuestos, derechos fiscales y trámites ante el SAT. ¿En qué te puedo ayudar?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean | null>>({});
  const [checkResult, setCheckResult] = useState<'eligible' | 'maybe' | 'no' | null>(null);

  const PREGUNTAS = [
    { id: 'q1', text: '¿Trabajaste de manera formal (con IMSS o ISSSTE) en el último año fiscal?' },
    { id: 'q2', text: '¿Tu empleador te retuvo ISR en tu nómina?' },
    { id: 'q3', text: '¿Tuviste más de un empleo simultáneamente?' },
    { id: 'q4', text: '¿Tienes RFC activo y contraseña del SAT?' },
  ];

  const handleCheck = () => {
    const yes = Object.values(checkAnswers).filter(v => v === true).length;
    if (yes >= 3) setCheckResult('eligible');
    else if (yes >= 2) setCheckResult('maybe');
    else setCheckResult('no');
  };

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setIsTyping(true);

    try {
      const context = `Eres el asistente fiscal de Nayarit Digital, especializado en derechos fiscales mexicanos, devoluciones del SAT, ISR, IVA, predial y tenencia en Nayarit. Responde de forma breve, práctica y en español. Siempre menciona el artículo del CFF o la ley aplicable cuando sea relevante. Ciudadano: ${profile?.name || 'anónimo'}, municipio: Tepic, Nayarit.`;
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, context }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error || 'Error al conectar.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sin conexión. Intenta de nuevo.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'inicio', label: 'Inicio', icon: FaroIcon },
    { id: 'verificar', label: 'Verificar', icon: FileSearch },
    { id: 'guias', label: 'Guías', icon: BookOpen },
    { id: 'asistente', label: 'Asistente', icon: Bot },
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[200] bg-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-4 border-b border-slate-100 bg-white shrink-0">
        <button onClick={selectedEscenario ? () => setSelectedEscenario(null) : onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--magenta)' }}>
            <FaroIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">Derechos Fiscales</p>
            <p className="text-base font-serif font-black text-slate-900 leading-tight">Faro Fiscal</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-slate-100 shrink-0 bg-white">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSelectedEscenario(null); }}
            className={cn(
              'flex-1 py-3 flex flex-col items-center gap-1 text-[8px] font-black uppercase tracking-widest transition-colors',
              tab === t.id ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'
            )}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* INICIO */}
          {tab === 'inicio' && !selectedEscenario && (
            <motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
              {/* Hero */}
              <div className="rounded-[2rem] p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #121838 0%, #1e0a3c 100%)' }}>
                <div className="absolute top-0 right-0 opacity-10 w-32 h-32 -mr-6 -mt-6">
                  <FaroIcon className="w-full h-full" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-2">Tu guía de derechos</p>
                <p className="text-2xl font-serif font-black leading-tight mb-3">¿El gobierno<br />te debe dinero?</p>
                <p className="text-xs text-white/60 leading-relaxed">Miles de ciudadanos de Tepic tienen saldos a favor ante el SAT y no lo saben. Faro Fiscal te ayuda a recuperarlos.</p>
                <div className="flex gap-3 mt-5">
                  <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-amber-400">67%</p>
                    <p className="text-[7px] text-white/50 uppercase font-bold">con saldo a favor</p>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-emerald-400">$6,200</p>
                    <p className="text-[7px] text-white/50 uppercase font-bold">promedio devuelto</p>
                  </div>
                </div>
              </div>

              {/* Accesos rápidos */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '¿Tengo saldo a favor?', icon: FileSearch, color: 'bg-blue-50 text-blue-700', action: () => setTab('verificar') },
                  { label: 'Cómo pedir devolución', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-700', action: () => setTab('guias') },
                  { label: 'Mis derechos fiscales', icon: BookOpen, color: 'bg-amber-50 text-amber-700', action: () => { setTab('guias'); } },
                  { label: 'Pregunta al asistente', icon: Bot, color: 'bg-violet-50 text-violet-700', action: () => setTab('asistente') },
                ].map((item, i) => (
                  <button key={i} onClick={item.action} className={cn('p-4 rounded-[1.5rem] text-left transition-all active:scale-95', item.color)}>
                    <item.icon className="w-6 h-6 mb-2" />
                    <p className="text-xs font-black leading-tight">{item.label}</p>
                  </button>
                ))}
              </div>

              {/* Derechos */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-3">Tus derechos fiscales</p>
                <div className="space-y-2">
                  {DERECHOS.map((d, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xl shrink-0">{d.icono}</span>
                      <div>
                        <p className="text-xs font-black text-slate-900 mb-1">{d.titulo}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VERIFICAR */}
          {tab === 'verificar' && (
            <motion.div key="verificar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
              <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-6">
                <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-1">Diagnóstico rápido</p>
                <p className="text-lg font-serif font-black text-slate-900">¿Tengo derecho a una devolución?</p>
                <p className="text-xs text-slate-500 mt-1">Responde estas preguntas para saberlo en segundos.</p>
              </div>

              {!checkResult ? (
                <>
                  <div className="space-y-3">
                    {PREGUNTAS.map(q => (
                      <div key={q.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <p className="text-sm font-bold text-slate-800 mb-3">{q.text}</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setCheckAnswers(prev => ({ ...prev, [q.id]: true }))}
                            className={cn('flex-1 py-2 rounded-xl text-xs font-black transition-all', checkAnswers[q.id] === true ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600')}
                          >Sí</button>
                          <button
                            onClick={() => setCheckAnswers(prev => ({ ...prev, [q.id]: false }))}
                            className={cn('flex-1 py-2 rounded-xl text-xs font-black transition-all', checkAnswers[q.id] === false ? 'bg-red-400 text-white' : 'bg-slate-100 text-slate-600')}
                          >No</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleCheck}
                    disabled={Object.keys(checkAnswers).length < PREGUNTAS.length}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-40 active:scale-[0.98] transition-all"
                  >
                    Ver mi diagnóstico
                  </button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className={cn('p-6 rounded-[2rem] text-white text-center', checkResult === 'eligible' ? 'bg-emerald-500' : checkResult === 'maybe' ? 'bg-amber-500' : 'bg-slate-700')}>
                    <p className="text-3xl mb-2">{checkResult === 'eligible' ? '✅' : checkResult === 'maybe' ? '⚠️' : '❌'}</p>
                    <p className="text-xl font-serif font-black mb-1">
                      {checkResult === 'eligible' ? '¡Muy probable saldo a favor!' : checkResult === 'maybe' ? 'Posible — requiere revisión' : 'Bajo perfil de devolución'}
                    </p>
                    <p className="text-xs text-white/80">
                      {checkResult === 'eligible' ? 'Tu perfil coincide con contribuyentes que reciben devolución automática de ISR.' : checkResult === 'maybe' ? 'Te recomendamos revisar tus declaraciones con un contador o el asistente fiscal.' : 'Consulta al asistente para explorar otras opciones de recuperación.'}
                    </p>
                  </div>

                  {checkResult === 'eligible' && (
                    <button onClick={() => setTab('guias')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                      Ver guía paso a paso <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  <button onClick={() => { setCheckAnswers({}); setCheckResult(null); }} className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest">
                    Volver a intentar
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* GUÍAS */}
          {tab === 'guias' && !selectedEscenario && (
            <motion.div key="guias" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Elige tu tipo de devolución</p>
              {ESCENARIOS.map(e => (
                <button
                  key={e.id}
                  onClick={() => setSelectedEscenario(e)}
                  className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{e.icono}</span>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-900">{e.titulo}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{e.tiempo} · {e.monto}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                </button>
              ))}
            </motion.div>
          )}

          {/* GUÍA DETALLE */}
          {tab === 'guias' && selectedEscenario && (
            <motion.div key="detalle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
                <span className="text-3xl">{selectedEscenario.icono}</span>
                <p className="text-xl font-serif font-black mt-3 mb-1">{selectedEscenario.titulo}</p>
                <p className="text-xs text-white/60">{selectedEscenario.desc}</p>
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 bg-white/10 rounded-xl p-2 text-center">
                    <p className="text-[8px] text-white/50 uppercase font-bold mb-1">Monto</p>
                    <p className="text-[10px] font-black text-emerald-400">{selectedEscenario.monto}</p>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-xl p-2 text-center">
                    <p className="text-[8px] text-white/50 uppercase font-bold mb-1">Tiempo</p>
                    <p className="text-[10px] font-black text-amber-400">{selectedEscenario.tiempo}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-3">Pasos para tramitarlo</p>
                <div className="space-y-3">
                  {selectedEscenario.pasos.map((paso, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{paso}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={selectedEscenario.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all text-white"
                style={{ background: 'linear-gradient(135deg, var(--magenta), #8B005E)' }}
              >
                Ir al portal oficial <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setTab('asistente')}
                className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" /> Preguntar al asistente
              </button>
            </motion.div>
          )}

          {/* ASISTENTE */}
          {tab === 'asistente' && (
            <motion.div key="asistente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
              {/* Preguntas rápidas */}
              <div className="px-4 py-3 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                {['¿Tengo saldo a favor?', '¿Cómo saco mi RFC?', '¿Qué es la e.firma?', 'Multas del SAT'].map(q => (
                  <button key={q} onClick={() => handleSend(q)} className="px-3 py-1.5 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap hover:bg-slate-200 transition-colors">
                    {q}
                  </button>
                ))}
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((m, i) => (
                  <div key={i} className={cn('max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm', m.role === 'assistant' ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' : 'ml-auto text-white rounded-tr-none')} style={m.role === 'user' ? { backgroundColor: 'var(--magenta)' } : {}}>
                    {m.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 p-4 bg-white rounded-2xl rounded-tl-none border border-slate-200 w-16 shadow-sm">
                    {[0, 0.2, 0.4].map((d, i) => <div key={i} className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />)}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder="¿En qué te puedo orientar?"
                  className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-slate-300 transition-colors font-medium"
                />
                <button onClick={() => handleSend()} className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: 'var(--magenta)' }}>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
