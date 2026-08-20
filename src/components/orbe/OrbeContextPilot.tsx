import React, { useState } from 'react';
import { useOrbeContextPilot } from '../../hooks/useOrbeContextPilot';
import { isContextOSBridgeEnabled } from '../../services/contextosRuntimeClient';
import { OrbeCitizen } from './OrbeCitizen';

export function OrbeContextPilot() {
  const enabled = isContextOSBridgeEnabled();
  const pilot = useOrbeContextPilot();
  const [showText, setShowText] = useState(false);
  const [value, setValue] = useState('');

  if (!enabled) return null;

  const submitText = (event: React.FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    setValue('');
    void pilot.submit(text);
  };

  return (
    <>
      <div
        className="fixed right-4 z-[99] w-[min(88vw,360px)] rounded-2xl border border-white/10 bg-slate-950/95 p-3 text-sm text-white shadow-2xl backdrop-blur"
        style={{ bottom: 'calc(92px + env(safe-area-inset-bottom))' }}
        aria-live="polite"
      >
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
          ORBE · Context.OS · LAB_MOCK
        </div>
        <p className="leading-relaxed text-slate-100">{pilot.statusText}</p>

        {showText && (
          <form onSubmit={submitText} className="mt-3 flex gap-2">
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ej. Quiero reportar un bache..."
              aria-label="Solicitud para ORBE"
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
            />
            <button
              type="submit"
              className="rounded-xl bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-950"
            >
              Enviar
            </button>
          </form>
        )}
      </div>

      <OrbeCitizen
        isSupported={pilot.voice.isSupported}
        isListening={pilot.voice.isListening}
        isSpeaking={pilot.voice.isSpeaking}
        isThinking={pilot.isThinking}
        hasError={pilot.hasError}
        onStartListening={pilot.startListening}
        onStopListening={pilot.voice.stopListening}
        onStopSpeaking={pilot.voice.stopSpeaking}
        onOpenTextFallback={() => setShowText(true)}
      />
    </>
  );
}
