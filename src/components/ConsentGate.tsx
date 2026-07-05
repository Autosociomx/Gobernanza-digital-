import React, { useState } from 'react';
import { ShieldCheck, FileText, Scale, Lock, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ConsentGateProps {
  onAccept: () => void;
}

export function ConsentGate({ onAccept }: ConsentGateProps) {
  const [checked, setChecked] = useState(false);
  const [accepting, setAccepting] = useState(false);

  async function handleAccept() {
    if (!checked) return;
    setAccepting(true);
    const logWrite = addDoc(collection(db, 'consent_logs'), {
      acceptedAt: serverTimestamp(),
      version: 'NYD-2026-v1',
      userAgent: navigator.userAgent.slice(0, 200),
    }).catch(() => {
      // ignore — proceed even if the write rejects (network error, offline, etc.)
    });
    const timeout = new Promise(resolve => setTimeout(resolve, 2500));
    // Best-effort: never block entry on the logging write
    await Promise.race([logWrite, timeout]);
    setTimeout(onAccept, 300);
  }

  const docs = [
    {
      id: 'aviso-legal',
      href: '/aviso-legal.html',
      icon: Scale,
      label: 'Aviso Legal',
      desc: 'Titularidad, propiedad intelectual y régimen de uso — NYD-201',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      id: 'terminos',
      href: '/terminos.html',
      icon: FileText,
      label: 'Términos y Condiciones',
      desc: 'Condiciones de acceso, confidencialidad y auditoría — NYD-202',
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10 border-cyan-400/20',
    },
    {
      id: 'privacidad',
      href: '/privacidad.html',
      icon: ShieldCheck,
      label: 'Aviso de Privacidad',
      desc: 'Tratamiento de datos personales · LGPDPPSO Art. 27 — NYD-203',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060b14] overflow-y-auto py-8 px-4"
    >
      {/* Wixárika accent stripe */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[6px]"
        style={{
          background: 'repeating-linear-gradient(135deg,#D81E5B 0 14px,#F5A623 14px 28px,#0FA3B1 28px 42px,#4C9F70 42px 56px,#14213D 56px 70px)',
        }}
      />

      <div className="w-full max-w-[620px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/30 mb-5">
            <Lock className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Plataforma en modo demo</span>
          </div>
          <h1 id="consent-title" className="font-serif font-black text-3xl text-white mb-3 leading-tight tracking-tight">
            Nayarit<span className="text-blue-400">Digital</span>
          </h1>
          <p id="consent-desc" className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            Antes de ingresar, revisa y acepta los documentos legales que rigen el acceso y uso de esta plataforma.
          </p>
        </div>

        {/* Document cards */}
        <div className="space-y-3 mb-6">
          {docs.map((doc) => {
            const Icon = doc.icon;
            return (
              <a
                key={doc.id}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-2xl border ${doc.bg} hover:brightness-110 transition-all group`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/5`}>
                  <Icon className={`w-5 h-5 ${doc.color}`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${doc.color}`}>{doc.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-snug">{doc.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        {/* Summary block */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6 text-slate-400 text-[13px] leading-relaxed space-y-2">
          <p>
            <strong className="text-white">Esta plataforma es propiedad de ConnectX Servicios S.A. de C.V.</strong>{' '}
            El acceso no otorga ningún derecho sobre el código, diseño o metodología.
          </p>
          <p>
            Tu actividad quedará <strong className="text-white">registrada con trazabilidad completa</strong> conforme a las obligaciones ASF e INAI. La confidencialidad es permanente.
          </p>
          <p>
            Tus datos personales se tratan conforme a la <strong className="text-white">LGPDPPSO</strong>. Puedes ejercer derechos ARCO en{' '}
            <strong className="text-white">privacidad@connectx.mx</strong>.
          </p>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group mb-6 select-none">
          <div className="relative shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="sr-only"
              aria-describedby="checkbox-desc"
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                checked
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-transparent border-slate-600 group-hover:border-slate-400'
              }`}
              aria-hidden="true"
            >
              {checked && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <span id="checkbox-desc" className="text-slate-400 text-sm leading-snug">
            He leído y acepto el{' '}
            <a href="/aviso-legal.html" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline-offset-2 hover:underline" onClick={(e) => e.stopPropagation()}>Aviso Legal</a>
            {', los '}
            <a href="/terminos.html" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline-offset-2 hover:underline" onClick={(e) => e.stopPropagation()}>Términos y Condiciones</a>
            {' y el '}
            <a href="/privacidad.html" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline-offset-2 hover:underline" onClick={(e) => e.stopPropagation()}>Aviso de Privacidad</a>
            {' de la plataforma Nayarit Digital.'}
          </span>
        </label>

        {/* Accept button */}
        <button
          onClick={handleAccept}
          disabled={!checked || accepting}
          className={`w-full py-4 rounded-2xl text-base font-bold transition-all ${
            checked && !accepting
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30'
              : 'bg-white/5 text-slate-600 cursor-not-allowed'
          }`}
          aria-disabled={!checked}
        >
          {accepting ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              Ingresando…
            </span>
          ) : (
            'Acepto — Ingresar a la plataforma'
          )}
        </button>

        {/* Legal footnote */}
        <p className="text-center text-slate-600 text-[11px] mt-5 leading-relaxed">
          La aceptación queda registrada con marca de tiempo conforme al Art. 1803 CCF y Ley de Firma Electrónica Avanzada.<br/>
          © 2026 ConnectX Servicios S.A. de C.V. · PI bajo custodia de Fundación ConnectX A.C.
        </p>
      </div>
    </div>
  );
}
