import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Type, Volume2, AlertCircle, Trash2, ShieldCheck } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────
// ConnectX AI — asistente de voz nativo.
//
// Máquina de 5 estados (diseño de referencia aprobado):
//   inactivo → escuchando → pensando → respondiendo → inactivo
//
// Backend: reutiliza /api/ai/chat (server.ts), el mismo endpoint que ya
// usa el chat de texto de CitizenApp — la GEMINI_API_KEY nunca sale del
// servidor (lección del Acta 002). El habla usa la Web Speech API del
// navegador (SpeechRecognition + speechSynthesis): no requiere backend
// ni credenciales nuevas, solo un navegador compatible (Chrome/Edge).
//
// Reglas heredadas de la Autopista Digital (Acta 004): la conversación
// no se usa con fines electorales ni publicitarios; "Olvidar esta
// conversación" borra el historial local de inmediato.
//
// Idioma: español (es-MX) es el único con reconocimiento y voz reales
// hoy. Cora y wixárika son deuda registrada (Acta 002) — no se afirma
// soporte de voz en esas lenguas hasta validarlo con hablantes.
// ─────────────────────────────────────────────────────────────────────

type VoiceState = 'idle' | 'listening' | 'thinking' | 'responding' | 'error';

interface ConnectXVoiceAssistantProps {
  onSwitchToText: () => void;
  systemContext?: string;
}

const STATE_COPY: Record<VoiceState, { label: string; sub: string }> = {
  idle: { label: 'Toca para hablar', sub: 'Estoy aquí para escucharte' },
  listening: { label: 'Escuchando…', sub: 'Habla ahora' },
  thinking: { label: 'Pensando…', sub: 'Procesando tu pregunta' },
  responding: { label: 'Hablando…', sub: 'Estoy aquí para ayudarte' },
  error: { label: 'No pude escucharte', sub: 'Intenta de nuevo o escribe tu mensaje' },
};

const STATE_COLOR: Record<VoiceState, { ring: string; glow: string }> = {
  idle: { ring: 'linear-gradient(135deg, #0FA3B1, #4C9F70)', glow: 'rgba(15,163,177,0.35)' },
  listening: { ring: 'linear-gradient(135deg, #0FA3B1, #7EE8F2)', glow: 'rgba(15,163,177,0.55)' },
  thinking: { ring: 'linear-gradient(135deg, #0FA3B1, #D81E5B)', glow: 'rgba(216,30,91,0.4)' },
  responding: { ring: 'linear-gradient(135deg, #F5A623, #E85D04)', glow: 'rgba(245,166,35,0.55)' },
  error: { ring: 'linear-gradient(135deg, #D81E5B, #E85D04)', glow: 'rgba(216,30,91,0.35)' },
};

// Rieles laterales: eco geométrico de la banda wixárika que ya recorre
// todo el sitio (mismos 5 colores), no una reinterpretación textil —
// decoración abstracta, no un patrón cultural reclamado como propio.
function DiamondRail({ side }: { side: 'left' | 'right' }) {
  const colors = ['#D81E5B', '#F5A623', '#0FA3B1', '#4C9F70', '#E85D04'];
  return (
    <div
      className={`hidden md:flex flex-col items-center gap-6 opacity-[0.14] ${side === 'left' ? 'order-first' : 'order-last'}`}
      aria-hidden="true"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rotate-45"
          style={{ backgroundColor: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}

function useSpeechSupport() {
  return useRef({
    recognition:
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
        ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
        : null,
    synthesis: typeof window !== 'undefined' && 'speechSynthesis' in window,
  }).current;
}

export function ConnectXVoiceAssistant({ onSwitchToText, systemContext }: ConnectXVoiceAssistantProps) {
  const support = useSpeechSupport();
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [captions, setCaptions] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  const stopEverything = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* no-op: recognition may already be stopped */
    }
    if (support.synthesis) window.speechSynthesis.cancel();
  }, [support.synthesis]);

  useEffect(() => stopEverything, [stopEverything]);

  const speak = useCallback(
    (text: string) => {
      setCaptions(text);
      if (!support.synthesis) {
        setState('idle');
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = 1;
      utterance.onend = () => setState('idle');
      utterance.onerror = () => setState('idle');
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [support.synthesis],
  );

  const askConnectX = useCallback(
    async (userMessage: string) => {
      setState('thinking');
      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            context: `${systemContext ?? ''}\nResponde en español, en tono cercano y en frases cortas — esta respuesta se lee en voz alta a un ciudadano.`.trim(),
          }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setState('responding');
        speak(data.response as string);
      } catch (err) {
        console.warn('ConnectX voice: fallo del asistente', err);
        setErrorMessage('No pude conectar con el asistente. Intenta de nuevo en un momento.');
        setState('error');
      }
    },
    [systemContext, speak],
  );

  const startListening = useCallback(() => {
    if (!support.recognition) {
      setErrorMessage('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge, o usa el modo escrito.');
      setState('error');
      return;
    }
    setTranscript('');
    setCaptions('');
    const RecognitionCtor = support.recognition;
    const recognition = new RecognitionCtor();
    recognition.lang = 'es-MX';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let finalText = '';
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += chunk;
        else interimText += chunk;
      }
      setTranscript(finalText || interimText);
      if (finalText.trim()) {
        recognition.stop();
        askConnectX(finalText.trim());
      }
    };
    recognition.onerror = () => {
      setErrorMessage('No pude escucharte bien. Intenta de nuevo, cerca del micrófono.');
      setState('error');
    };
    recognition.onend = () => {
      setState((current) => (current === 'listening' ? 'idle' : current));
    };

    recognitionRef.current = recognition;
    recognition.start();
    setState('listening');
  }, [support.recognition, askConnectX]);

  const handleOrbTap = useCallback(() => {
    if (state === 'idle' || state === 'error') {
      startListening();
    } else {
      stopEverything();
      setState('idle');
    }
  }, [state, startListening, stopEverything]);

  const copy = STATE_COPY[state];
  const colors = STATE_COLOR[state];

  return (
    <div className="flex-1 flex flex-col bg-[#0F1420] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20px 20px, #F8F6F1 2px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="flex-1 flex items-stretch justify-center gap-4 md:gap-10 px-4 relative z-10">
        <DiamondRail side="left" />

        <div className="flex-1 flex flex-col items-center justify-center max-w-md text-center py-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={`label-${state}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-[11px] uppercase tracking-[0.25em] font-bold mb-8"
              style={{ color: state === 'error' ? '#FF7AA8' : '#7EE8F2' }}
            >
              {state === 'listening' ? 'Escuchando' : state === 'thinking' ? 'Procesando tu información' : state === 'responding' ? 'Hablando' : state === 'error' ? 'Atención' : 'ConnectX AI'}
            </motion.p>
          </AnimatePresence>

          {/* Orbe */}
          <button
            type="button"
            onClick={handleOrbTap}
            aria-label={copy.label}
            className="relative w-44 h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4"
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 70px 14px ${colors.glow}` }}
              animate={{ opacity: state === 'idle' ? [0.5, 0.8, 0.5] : [0.7, 1, 0.7] }}
              transition={{ duration: state === 'listening' ? 1.1 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              animate={{ scale: state === 'thinking' ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 1.6, repeat: state === 'thinking' ? Infinity : 0 }}
            />
            <span
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{ background: colors.ring }}
            >
              <span className="w-[86%] h-[86%] rounded-full bg-[#0F1420] flex items-center justify-center">
                {state === 'listening' ? (
                  <Mic className="w-12 h-12 text-white" />
                ) : (
                  <VoiceWaveform active={state === 'responding' || state === 'thinking'} />
                )}
              </span>
            </span>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${state}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8"
            >
              <p className="text-xl font-serif">{copy.label}</p>
              <p className="text-sm text-[#a0aec0] mt-2">
                {state === 'error' ? errorMessage || copy.sub : copy.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {(transcript || captions) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-sm text-[#e8e0d4] leading-relaxed max-h-24 overflow-y-auto px-2"
            >
              {state === 'listening' ? `“${transcript}”` : captions}
            </motion.p>
          )}

          {!support.recognition && (
            <div className="mt-6 flex items-center gap-2 text-[11px] text-[#FFC96A] bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-full px-4 py-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Reconocimiento de voz no disponible en este navegador
            </div>
          )}
        </div>

        <DiamondRail side="right" />
      </div>

      {/* Pie: cambiar a texto, borrar conversación, aviso de privacidad */}
      <div className="relative z-10 px-6 pb-8 pt-4 border-t border-white/10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSwitchToText}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <Type className="w-3.5 h-3.5" /> Escribir en su lugar
          </button>
          {(transcript || captions) && (
            <button
              type="button"
              onClick={() => {
                stopEverything();
                setTranscript('');
                setCaptions('');
                setState('idle');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Olvidar esta conversación
            </button>
          )}
        </div>
        <p className="flex items-center gap-1.5 text-[10px] text-[#6b7a86] text-center max-w-sm">
          <ShieldCheck className="w-3 h-3 shrink-0" />
          Tu conversación no se usa con fines electorales ni publicitarios. Disponible en español; cora y wixárika en desarrollo.
        </p>
      </div>
    </div>
  );
}

function VoiceWaveform({ active }: { active: boolean }) {
  return (
    <span className="flex items-end gap-1 h-8" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-white"
          animate={{ height: active ? [6, 26, 10, 22, 6] : 14 }}
          transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: i * 0.08, ease: 'easeInOut' }}
          style={{ height: 14 }}
        />
      ))}
      <Volume2 className="sr-only" />
    </span>
  );
}
