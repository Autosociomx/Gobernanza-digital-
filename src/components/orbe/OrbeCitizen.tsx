import React from 'react';
import { Loader2, Mic, MicOff, Volume2 } from 'lucide-react';

export type OrbeState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'error'
  | 'unsupported';

export interface OrbeCitizenProps {
  isSupported: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  hasError?: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking?: () => void;
  onOpenTextFallback?: () => void;
}

/**
 * ORBE ciudadano v0.1
 *
 * Interfaz push-to-talk móvil: un toque activa voz, sin abrir el chat como
 * comportamiento principal. No conoce Gemini, Firebase, trámites ni Context.OS;
 * recibe callbacks para mantener la interfaz desacoplada del motor de decisión.
 */
export function OrbeCitizen({
  isSupported,
  isListening,
  isSpeaking,
  isThinking,
  hasError = false,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  onOpenTextFallback,
}: OrbeCitizenProps) {
  const state: OrbeState = hasError
    ? 'error'
    : !isSupported
      ? 'unsupported'
      : isListening
        ? 'listening'
        : isThinking
          ? 'thinking'
          : isSpeaking
            ? 'speaking'
            : 'idle';

  const labels: Record<OrbeState, string> = {
    idle: 'Habla con Nayarit Digital',
    listening: 'Te escucho…',
    thinking: 'Un momento…',
    speaking: 'Respondiendo…',
    error: 'No pude escucharte. Toca para intentar de nuevo.',
    unsupported: 'La voz no está disponible. Toca para escribir.',
  };

  const handlePress = () => {
    if (state === 'unsupported') {
      onOpenTextFallback?.();
      return;
    }

    if (state === 'listening') {
      onStopListening();
      return;
    }

    if (state === 'speaking') {
      onStopSpeaking?.();
      return;
    }

    if (state !== 'thinking') onStartListening();
  };

  const stateClasses: Record<OrbeState, string> = {
    idle: 'border-white/20 bg-slate-950 text-white hover:scale-105',
    listening: 'border-cyan-300 bg-cyan-500 text-white scale-105',
    thinking: 'border-violet-300 bg-violet-600 text-white',
    speaking: 'border-emerald-300 bg-emerald-600 text-white',
    error: 'border-amber-300 bg-amber-600 text-white',
    unsupported: 'border-slate-400 bg-slate-800 text-white',
  };

  return (
    <div
      className="fixed right-4 z-[100] flex flex-col items-end gap-2"
      style={{ bottom: 'calc(16px + env(safe-area-inset-bottom))' }}
    >
      {state !== 'idle' && (
        <div
          aria-live="polite"
          className="max-w-[220px] rounded-full border border-white/10 bg-slate-950/90 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur"
        >
          {labels[state]}
        </div>
      )}

      <button
        type="button"
        onClick={handlePress}
        aria-label={labels[state]}
        aria-pressed={state === 'listening'}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border shadow-2xl transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/40 motion-reduce:transition-none ${stateClasses[state]}`}
      >
        {(state === 'listening' || state === 'speaking') && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full border border-current opacity-30 motion-reduce:animate-none"
          />
        )}

        {state === 'idle' && <Mic size={25} />}
        {state === 'listening' && <Mic size={27} />}
        {state === 'thinking' && <Loader2 size={26} className="animate-spin motion-reduce:animate-none" />}
        {state === 'speaking' && <Volume2 size={27} />}
        {state === 'error' && <MicOff size={24} />}
        {state === 'unsupported' && <MicOff size={24} />}
      </button>
    </div>
  );
}
