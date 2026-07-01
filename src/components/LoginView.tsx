// Art. 74 LNETB: toda plataforma municipal debe integrar el inicio de sesión único "Llave MX".
// Este componente ofrece ambas opciones: Llave MX (cumplimiento legal) y Google (acceso técnico).

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { login } from '../firebase';
import { initiateLlaveMXLogin } from '../services/llaveMXService';
import { Bot, ShieldCheck, ChevronRight, X, IdCard, KeyRound, CheckCircle2 } from 'lucide-react';

const LLAVE_MX_STEPS = [
  {
    icon: IdCard,
    color: 'bg-blue-500',
    title: 'Ten tu CURP a la mano',
    desc: 'La encuentras en tu acta de nacimiento, INE, o en gob.mx/curp. Es gratis y en línea.',
  },
  {
    icon: KeyRound,
    color: 'bg-emerald-600',
    title: 'Crea tu cuenta en llavemx.gob.mx',
    desc: 'Entra al sitio oficial, ingresa tu CURP y crea una contraseña. Tarda 2 minutos.',
  },
  {
    icon: CheckCircle2,
    color: 'bg-[#006847]',
    title: 'Regresa aquí y entra con Llave MX',
    desc: 'Con tu cuenta lista, el botón verde te llevará directo a tu portal ciudadano.',
  },
];

export function LoginView({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);
  const [showLlaveModal, setShowLlaveModal] = useState(false);

  const handleLlaveMX = () => {
    initiateLlaveMXLogin();
    // La redirección a llavemx.gob.mx ocurre dentro del servicio.
    // El callback se procesa en /auth/llavemx/callback (ver llaveMXService.ts).
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await login();
      onLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-8 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-20 h-20 bg-magenta-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-magenta-500/30"
      >
        <Bot className="w-10 h-10 text-white" />
      </motion.div>

      <h1 className="text-3xl font-serif font-black mb-2">Nayarit Digital</h1>
      <p className="text-slate-400 mb-10 max-w-xs text-sm">
        Bienvenido al portal ciudadano. Inicia sesión para continuar.
      </p>

      {/* Llave MX — Art. 74 LNETB (opción principal) */}
      <button
        onClick={handleLlaveMX}
        className="w-full max-w-xs mb-3 py-4 px-6 bg-[#006847] hover:bg-[#005538] text-white rounded-2xl font-black shadow-xl transition-all hover:scale-105 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-white/80" />
          <div className="text-left">
            <p className="text-sm font-black leading-none">Iniciar con Llave MX</p>
            <p className="text-[10px] text-white/60 font-medium mt-0.5">Identidad Digital Federal · Art. 74 LNETB</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
      </button>

      {/* Divisor */}
      <div className="flex items-center gap-3 w-full max-w-xs my-2">
        <div className="flex-1 h-px bg-slate-700" />
        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">o</span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>

      {/* Google — acceso técnico / demostración */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full max-w-xs py-4 bg-white text-slate-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Conectando...' : 'Iniciar con Google'}
      </button>

      <button
        onClick={() => setShowLlaveModal(true)}
        className="mt-6 text-[11px] text-slate-500 underline underline-offset-2 hover:text-slate-300 transition-colors"
      >
        ¿Qué es Llave MX y cómo crearla?
      </button>

      <p className="mt-4 max-w-xs text-[10px] text-slate-600 leading-relaxed">
        La autenticación con Llave MX es el método oficial requerido por el Art. 74 de la Ley Nacional para Eliminar Trámites Burocráticos (DOF 16-VII-2025).
      </p>

      {/* Modal Llave MX */}
      <AnimatePresence>
        {showLlaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
            onClick={() => setShowLlaveModal(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 rounded-3xl p-6 w-full max-w-sm border border-slate-700"
            >
              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-[10px] font-bold text-[#006847] uppercase tracking-widest mb-0.5">Identidad Digital Federal</p>
                  <h3 className="text-lg font-black text-white">¿Qué es Llave MX?</h3>
                </div>
                <button onClick={() => setShowLlaveModal(false)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <p className="text-[12px] text-slate-400 mb-5 leading-relaxed">
                Llave MX es la identidad digital del gobierno federal mexicano. Con ella, un solo usuario y contraseña te da acceso a todos los servicios del gobierno — sin llenar formularios repetidos.
              </p>

              <div className="space-y-4 mb-6">
                {LLAVE_MX_STEPS.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl ${step.color} flex items-center justify-center shrink-0`}>
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[12px] font-black text-white leading-tight">{step.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowLlaveModal(false)}
                className="w-full py-3.5 bg-[#006847] hover:bg-[#005538] text-white rounded-2xl font-black text-sm transition-colors"
              >
                Entendido — voy a crear mi Llave MX
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
