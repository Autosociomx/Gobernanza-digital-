import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, X, Mic, Volume2, VolumeX, Copy, Check, ExternalLink, Wrench, Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuraChat } from '../hooks/useAuraChat';
import { useAuraVoice } from '../hooks/useAuraVoice';
import { MODULOS, NUCLEO, ESTADOS, matchModuleByText, GITHUB_BASE, type Modulo } from '../data/orbeModulos';

const INSTRUCCION_ACCESIBILIDAD =
  'Instrucción de estilo para esta pantalla: usa oraciones cortas y lenguaje simple, ' +
  'evita tecnicismos — la persona puede tener poca experiencia con tecnología. Si su ' +
  'necesidad corresponde a un módulo concreto del Orbe (pagos, salud, obras, reportes, ' +
  'identidad, protección de menores, denuncias), nómbralo explícitamente al inicio de tu respuesta.';

const CHIPS_AURA = ['Pagar mi predial', 'Cita médica', 'Reportar un bache', 'Proteger a mis hijos en línea'];

interface OrbeCentralProps {
  onBack: () => void;
}

export function OrbeCentral({ onBack }: OrbeCentralProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [devMode, setDevMode] = useState(false);
  const [sugerido, setSugerido] = useState<Modulo | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isNarrow, setIsNarrow] = useState(false);
  const [pendienteEdicion, setPendienteEdicion] = useState('');
  const [copiado, setCopiado] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isAura = openId === 'aura';
  const activeModule = useMemo(() => MODULOS.find((m) => m.id === openId) ?? null, [openId]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 780px)');
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenId(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const posiciones = useMemo(() => {
    const n = MODULOS.length;
    return MODULOS.map((_, i) => {
      const angulo = -Math.PI / 2 + i * ((2 * Math.PI) / n);
      const r = 41.5;
      return { left: `${50 + r * Math.cos(angulo)}%`, top: `${50 + r * Math.sin(angulo)}%` };
    });
  }, []);

  const auraVoice = useAuraVoice();
  const [autoSpeak, setAutoSpeak] = useState(true);

  const getPageContext = useCallback(() => {
    if (isAura) {
      return 'El ciudadano está en el Orbe Central de Nayarit Digital, el mapa de todos los ' +
        'servicios, hablando directamente con Aura (aún no eligió un módulo específico).';
    }
    if (activeModule) {
      return `El ciudadano está viendo el módulo "${activeModule.nombreCompleto}" dentro del ` +
        `Orbe Central de Nayarit Digital. Descripción del módulo: ${activeModule.descripcion}`;
    }
    return 'El ciudadano está en el Orbe Central de Nayarit Digital.';
  }, [isAura, activeModule]);

  const { messages, isTyping, isOnlineMode, sendMessage, resetGreeting } = useAuraChat({
    getPageContext,
    onReply: (respuesta) => { if (autoSpeak) auraVoice.speak(respuesta); },
  });

  useEffect(() => {
    if (!openId) return;
    setSugerido(null);
    if (isAura) {
      resetGreeting(
        'Hola, soy Aura 👋 — cuéntame qué necesitas: una cita, un pago, un reporte, una ' +
        'denuncia… o si vienes a mejorar un módulo, dime cuál.'
      );
    } else if (activeModule) {
      resetGreeting(`Estás en **${activeModule.nombreCompleto}**. Pregúntame lo que necesites sobre este servicio.`);
    }
  }, [openId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleEnviar = useCallback(async (textoDirecto?: string) => {
    const texto = (textoDirecto ?? inputValue).trim();
    if (!texto) return;
    setInputValue('');
    if (isAura) setSugerido(matchModuleByText(texto));
    await sendMessage(texto, { extraContext: INSTRUCCION_ACCESIBILIDAD });
  }, [inputValue, isAura, sendMessage]);

  const handleVoz = useCallback(() => {
    if (auraVoice.isListening) { auraVoice.stopListening(); return; }
    setAutoSpeak(true);
    auraVoice.startListening((texto) => handleEnviar(texto));
  }, [auraVoice, handleEnviar]);

  const generarPrompt = useCallback(() => {
    if (!activeModule) return '';
    const archivos = activeModule.archivos.map((a) => a.ruta).join(', ');
    return `En el repo Autosociomx/Gobernanza-digital- (rama main), quiero editar el módulo "${activeModule.nombreCompleto}".\n\n` +
      `Petición: ${pendienteEdicion || '(describe aquí el cambio concreto)'}\n\n` +
      `Archivos del módulo: ${archivos}\n\n` +
      `Sigue la convención del Orbe (docs/orbe/README.md): un círculo = un módulo = un archivo; ` +
      `si cambian nombre, estado o conexiones, actualiza también docs/orbe/modulos.json, ` +
      `src/data/orbeModulos.ts y el diagrama del README.`;
  }, [activeModule, pendienteEdicion]);

  const copiarPrompt = useCallback(async () => {
    await navigator.clipboard.writeText(generarPrompt());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }, [generarPrompt]);

  const displayIcon = isAura ? NUCLEO.icono : activeModule?.icono;
  const displayNombre = isAura ? NUCLEO.nombreCompleto : activeModule?.nombreCompleto;
  const displayDesc = isAura ? NUCLEO.descripcion : activeModule?.descripcion;
  const displayEstado = isAura ? NUCLEO.estado : activeModule?.estado;
  const displayArchivos = isAura ? NUCLEO.archivos : activeModule?.archivos ?? [];
  const displayPendientes = isAura ? NUCLEO.pendientes : activeModule?.pendientes ?? [];

  return (
    <div className="min-h-screen bg-[#0B1220] text-white relative overflow-x-hidden">
      {/* Encabezado */}
      <header className="flex items-center justify-between px-5 py-5 relative z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#F5A623]">Orbe Central</p>
          <p className="text-[10px] text-white/40">Nayarit Digital · atención ciudadana</p>
        </div>
        <button
          onClick={() => setDevMode((v) => !v)}
          className={cn(
            'flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors px-2.5 py-1.5 rounded-full border',
            devMode ? 'text-[#0FA3B1] border-[#0FA3B1]/50 bg-[#0FA3B1]/10' : 'text-white/25 border-white/10 hover:text-white/50'
          )}
          aria-pressed={devMode}
        >
          <Wrench className="w-3.5 h-3.5" /> Modo desarrollador
        </button>
      </header>

      {/* Escena orbital */}
      {isNarrow ? (
        <div className="grid grid-cols-3 gap-3 px-4 pb-16">
          <AuraBoton onClick={() => setOpenId('aura')} className="col-span-3" />
          {MODULOS.map((m) => (
            <BurbujaModulo key={m.id} modulo={m} sugerida={sugerido?.id === m.id} onClick={() => setOpenId(m.id)} />
          ))}
        </div>
      ) : (
        <div className="relative mx-auto w-full max-w-[720px] aspect-square mb-16">
          <div className="absolute inset-0 rounded-full border border-[#0FA3B1]/15 pointer-events-none" />
          <div className="absolute inset-[18%] rounded-full border border-[#0FA3B1]/15 pointer-events-none" />
          <AuraBoton onClick={() => setOpenId('aura')} centrada />
          {MODULOS.map((m, i) => (
            <BurbujaModulo
              key={m.id}
              modulo={m}
              sugerida={sugerido?.id === m.id}
              style={{ left: posiciones[i].left, top: posiciones[i].top }}
              onClick={() => setOpenId(m.id)}
            />
          ))}
        </div>
      )}

      {/* Panel lateral */}
      <AnimatePresence>
        {openId && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenId(null)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#0e1a30] border-l border-white/10 z-40 flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className="p-5 border-b border-white/10 relative">
                <button
                  onClick={() => setOpenId(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 flex items-center justify-center transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{ color: displayEstado ? ESTADOS[displayEstado].color : '#fff', borderColor: displayEstado ? ESTADOS[displayEstado].color : '#fff' }}
                  >
                    {displayEstado ? ESTADOS[displayEstado].etiqueta : ''}
                  </span>
                </div>
                <h2 className="text-lg font-bold pr-10">{displayIcon} {displayNombre}</h2>
                <p className="text-sm text-white/50 mt-1.5 leading-relaxed">{displayDesc}</p>
              </div>

              {devMode && (
                <div className="p-5 border-b border-white/10 bg-black/20 text-sm space-y-4 max-h-[45%] overflow-y-auto">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Archivos</p>
                    <ul className="space-y-1.5">
                      {displayArchivos.map((a) => (
                        <li key={a.ruta}>
                          <a
                            href={GITHUB_BASE + a.ruta}
                            target="_blank" rel="noopener noreferrer"
                            className="text-[#0FA3B1] hover:underline inline-flex items-center gap-1"
                          >
                            {a.ruta.split('/').pop()} <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-white/40"> — {a.descripcion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {displayPendientes.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Pendientes</p>
                      <ul className="list-disc list-inside space-y-1 text-white/70">
                        {displayPendientes.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                  )}
                  {activeModule && activeModule.conexiones.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Conexiones</p>
                      <ul className="list-disc list-inside space-y-1 text-white/70">
                        {activeModule.conexiones.map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  {activeModule && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Prompt de edición</p>
                      <input
                        type="text"
                        value={pendienteEdicion}
                        onChange={(e) => setPendienteEdicion(e.target.value)}
                        placeholder="¿Qué quieres cambiar?"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs mb-2 focus:outline-none focus:border-[#0FA3B1]"
                      />
                      <button
                        onClick={copiarPrompt}
                        className="w-full flex items-center justify-center gap-1.5 bg-[#0FA3B1]/15 text-[#0FA3B1] border border-[#0FA3B1]/40 rounded-lg py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#0FA3B1]/25 transition-colors"
                      >
                        {copiado ? <><Check className="w-3.5 h-3.5" /> Copiado</> : <><Copy className="w-3.5 h-3.5" /> Copiar prompt</>}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Chat */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'max-w-[88%] text-sm leading-relaxed rounded-2xl px-4 py-2.5',
                      msg.role === 'user'
                        ? 'ml-auto bg-[#D81E5B]/20 border border-[#D81E5B]/40 rounded-br-sm'
                        : 'bg-white/5 border border-white/10 rounded-bl-sm'
                    )}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm w-16">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                )}
                {!isOnlineMode && (
                  <p className="text-[11px] text-amber-400/80">Sin conexión con el servidor de Aura en este momento.</p>
                )}
                <div ref={chatEndRef} />
              </div>

              {isAura && sugerido && (
                <div className="mx-5 mb-3 p-3 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/40 flex items-center justify-between gap-3">
                  <p className="text-xs text-[#F5A623]">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                    Esto lo resuelve <b>{sugerido.icono} {sugerido.nombreCorto}</b>
                  </p>
                  <button
                    onClick={() => { setOpenId(sugerido.id); }}
                    className="shrink-0 text-[11px] font-bold uppercase tracking-widest bg-[#F5A623] text-[#14213D] px-3 py-1.5 rounded-full hover:brightness-110"
                  >
                    Entrar
                  </button>
                </div>
              )}

              {isAura && messages.length <= 1 && (
                <div className="px-5 pb-2 flex flex-wrap gap-2">
                  {CHIPS_AURA.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleEnviar(chip)}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-white/15 text-white/60 hover:text-[#0FA3B1] hover:border-[#0FA3B1]/50 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              <div className="p-4 border-t border-white/10 flex items-center gap-2">
                {auraVoice.isSupported && (
                  <button
                    onClick={handleVoz}
                    aria-label={auraVoice.isListening ? 'Detener grabación' : 'Hablar con Aura'}
                    className={cn(
                      'shrink-0 p-3 rounded-xl transition-all active:scale-90',
                      auraVoice.isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white/60 hover:bg-white/20'
                    )}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
                {auraVoice.isSupported && (
                  <button
                    onClick={() => { if (autoSpeak) auraVoice.stopSpeaking(); setAutoSpeak(!autoSpeak); }}
                    aria-label={autoSpeak ? 'Desactivar voz' : 'Activar voz'}
                    className={cn('shrink-0 p-3 rounded-xl transition-colors', autoSpeak ? 'bg-[#0FA3B1]/20 text-[#0FA3B1]' : 'bg-white/5 text-white/30')}
                  >
                    {autoSpeak ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                )}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
                  placeholder={auraVoice.isListening ? 'Escuchando…' : 'Escribe lo que necesitas…'}
                  disabled={auraVoice.isListening}
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0FA3B1] disabled:opacity-50"
                />
                <button
                  onClick={() => handleEnviar()}
                  className="shrink-0 bg-[#D81E5B] text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#D81E5B]/80 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Nota: el posicionamiento (translate de centrado) vive en un wrapper
// estático, nunca en el propio motion.button — Framer Motion toma control
// de la propiedad CSS `transform` al animar whileHover/whileTap, y pisaría
// cualquier translate(-50%,-50%) puesto directamente en ese mismo elemento.
function AuraBoton({ onClick, centrada, className }: { onClick: () => void; centrada?: boolean; className?: string }) {
  const boton = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Hablar con Aura"
      className={cn(
        'w-full h-full border border-[#0FA3B1]/50 flex flex-col items-center justify-center gap-1 text-center p-4',
        'bg-[radial-gradient(circle_at_30%_25%,rgba(15,163,177,0.35),rgba(10,20,35,0.95)_65%)]',
        'shadow-[0_0_60px_rgba(15,163,177,0.25)]',
        centrada ? 'rounded-full' : 'rounded-2xl',
        className
      )}
    >
      <span className="text-3xl">🧠</span>
      <span className="text-xs font-black uppercase tracking-[0.2em]">Aura</span>
      <span className="text-[10px] text-white/50">atención ciudadana</span>
    </motion.button>
  );

  if (!centrada) return <div className="w-full py-6">{boton}</div>;

  return (
    <div className="absolute left-1/2 top-1/2 w-[30%] aspect-square" style={{ transform: 'translate(-50%, -50%)' }}>
      {boton}
    </div>
  );
}

function BurbujaModulo({
  modulo, sugerida, style, className, onClick,
}: {
  modulo: Modulo; sugerida?: boolean; style?: { left: string; top: string }; className?: string; onClick: () => void;
}) {
  const estado = ESTADOS[modulo.estado];
  const boton = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Abrir módulo ${modulo.nombreCompleto}`}
      className={cn(
        'w-full h-full aspect-square rounded-full border flex flex-col items-center justify-center gap-1 text-center p-3',
        'bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.06),rgba(10,20,35,0.9)_65%)]',
        sugerida ? 'border-[#F5A623] ring-4 ring-[#F5A623]/40 animate-pulse' : 'border-white/15 hover:border-[#0FA3B1]/60',
        className
      )}
    >
      <span className="text-xl">{modulo.icono}</span>
      <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">{modulo.nombreCorto}</span>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: estado.color }} />
    </motion.button>
  );

  if (!style) return <div className="aspect-square">{boton}</div>;

  return (
    <div
      className="absolute w-[16%] aspect-square"
      style={{ left: style.left, top: style.top, transform: 'translate(-50%, -50%)' }}
    >
      {boton}
    </div>
  );
}
