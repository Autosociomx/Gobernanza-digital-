// Art. 74 LNETB: toda plataforma municipal debe integrar el inicio de sesión único "Llave MX".
// Este componente ofrece ambas opciones: Llave MX (cumplimiento legal) y Google (acceso técnico).

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { login } from '../firebase';
import { initiateLlaveMXLogin } from '../services/llaveMXService';
import { Bot, ShieldCheck, ChevronRight } from 'lucide-react';

export function LoginView({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);

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

      <p className="mt-8 max-w-xs text-[10px] text-slate-600 leading-relaxed">
        La autenticación con Llave MX es el método oficial requerido por el Art. 74 de la Ley Nacional para Eliminar Trámites Burocráticos (DOF 16-VII-2025).
      </p>
    </div>
  );
}
