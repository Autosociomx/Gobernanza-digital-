import React, { useState } from 'react';
import { useOrbeContextPilot } from '../../hooks/useOrbeContextPilot';
import { isContextOSBridgeEnabled } from '../../services/contextosRuntimeClient';
import { OrbeCitizen } from './OrbeCitizen';

export function OrbeContextPilot() {
  if (!isContextOSBridgeEnabled()) return null;
  return <EnabledOrbeContextPilot />;
}

function EnabledOrbeContextPilot() {
  const pilot = useOrbeContextPilot();
  const [showText, setShowText] = useState(false);
  const [value, setValue] = useState('');

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
        className="fixed right-4 z-[99] w-[min(88vw,380px)] rounded-2xl border border-white/10 bg-slate-950/95 p-3 text-sm text-white shadow-2xl backdrop-blur"
        style={{ bottom: 'calc(92px + env(safe-area-inset-bottom))' }}
        aria-live="polite"
      >
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
          ORBE · acción trazable · Context.OS
        </div>
        <div className="mb-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[11px] leading-relaxed text-amber-100">
          LAB_MOCK · autoridad: NONE · sin efecto administrativo. Los folios y evidencias mostrados son exclusivamente de laboratorio y no constituyen resolución oficial.
        </div>
        <p className="leading-relaxed text-slate-100">{pilot.statusText}</p>

        {pilot.lastReceipt && (
          <div className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-3 text-[11px] text-slate-200">
            <div className="font-semibold uppercase tracking-[0.12em] text-cyan-200">Recibo de laboratorio</div>
            {pilot.lastReceipt.labReference && (
              <div className="mt-1 break-all">Folio LAB: {pilot.lastReceipt.labReference}</div>
            )}
            <div className="mt-1 break-all">evidenceId: {pilot.lastReceipt.evidenceId}</div>
            <div className="mt-1 break-all">sha256: {pilot.lastReceipt.sha256}</div>
            <div className="mt-1">policy: {pilot.lastReceipt.policyVersion}</div>
            <div className="mt-1">estado: {pilot.lastReceipt.status}</div>
          </div>
        )}

        {showText && (
          <form onSubmit={submitText} className="mt-3 flex gap-2">
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ej. Quiero reportar un bache..."
              aria-label="Solicitud de acción de laboratorio para ORBE"
              maxLength={512}
              disabled={pilot.isThinking}
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
            />
            <button
              type="submit"
              disabled={pilot.isThinking}
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
