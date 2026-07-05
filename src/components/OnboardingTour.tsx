import React, { useEffect, useState } from 'react';
import { Bot, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface OnboardingStep {
  title: string;
  body: string;
  icon: React.ElementType;
}

interface OnboardingTourProps {
  steps: OnboardingStep[];
  storageKey: string;
  dark?: boolean;
  guideName?: string;
  /** Tailwind position classes for the "reopen tutorial" pill. Default sits at the bottom-left corner. */
  reopenClassName?: string;
}

export function OnboardingTour({
  steps,
  storageKey,
  dark = false,
  guideName = 'Guía Nayarit Digital',
  reopenClassName = 'bottom-6 left-4',
}: OnboardingTourProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const done = typeof window !== 'undefined' && localStorage.getItem(storageKey) === 'done';
    if (done) return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, [storageKey]);

  function finish() {
    localStorage.setItem(storageKey, 'done');
    setOpen(false);
  }

  function next() {
    if (index === steps.length - 1) { finish(); return; }
    setIndex(i => i + 1);
  }

  function prev() {
    setIndex(i => Math.max(0, i - 1));
  }

  if (!open) {
    return (
      <button
        onClick={() => { setIndex(0); setOpen(true); }}
        aria-label="Ver tutorial de la plataforma"
        className={cn(
          'fixed z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-bold text-sm transition-transform hover:scale-105',
          reopenClassName,
          dark ? 'bg-[#161920] border border-slate-700 text-slate-200' : 'bg-white border border-slate-200 text-slate-700'
        )}
      >
        <Bot className="w-4 h-4 text-[#D81E5B]" />
        Tutorial
      </button>
    );
  }

  const step = steps[index];
  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Tutorial de la plataforma, paso ${index + 1} de ${steps.length}`}
        className={cn(
          'w-full max-w-md rounded-3xl shadow-2xl overflow-hidden',
          dark ? 'bg-[#161920] border border-slate-700' : 'bg-white border border-slate-200'
        )}
      >
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D81E5B] to-[#14213D] flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={cn('text-sm font-black', dark ? 'text-white' : 'text-slate-900')}>{guideName}</p>
                <p className={cn('text-[11px] font-bold uppercase tracking-widest', dark ? 'text-slate-500' : 'text-slate-400')}>
                  Paso {index + 1} de {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={finish}
              aria-label="Cerrar tutorial"
              className={cn('p-2 rounded-full transition-colors', dark ? 'hover:bg-slate-800 text-slate-500' : 'hover:bg-slate-100 text-slate-400')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-1.5 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn('h-1.5 flex-1 rounded-full transition-colors', i <= index ? 'bg-[#D81E5B]' : dark ? 'bg-slate-800' : 'bg-slate-200')}
              />
            ))}
          </div>

          <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-4', dark ? 'bg-slate-800' : 'bg-slate-50')}>
            <StepIcon className="w-7 h-7 text-[#D81E5B]" />
          </div>

          <h3 className={cn('text-xl font-serif font-black mb-2', dark ? 'text-white' : 'text-slate-900')}>{step.title}</h3>
          <p className={cn('text-base leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>{step.body}</p>
        </div>

        <div className={cn('flex items-center justify-between gap-3 p-5 border-t', dark ? 'border-slate-800' : 'border-slate-100')}>
          <button
            onClick={finish}
            className={cn('text-sm font-bold', dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')}
          >
            Saltar tutorial
          </button>
          <div className="flex items-center gap-2">
            {index > 0 && (
              <button
                onClick={prev}
                aria-label="Paso anterior"
                className={cn('p-3 rounded-full transition-colors', dark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#D81E5B] hover:bg-[#B5154A] text-white font-bold text-sm shadow-lg shadow-[#D81E5B]/30 transition-colors"
            >
              {index === steps.length - 1 ? 'Entendido' : 'Siguiente'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
