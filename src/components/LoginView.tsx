import React from 'react';
import { motion } from 'motion/react';
import { login } from '../firebase';
import { Bot } from 'lucide-react';

export function LoginView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-8 text-center text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-20 h-20 bg-magenta-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-magenta-500/30"
      >
        <Bot className="w-10 h-10 text-white" />
      </motion.div>
      <h1 className="text-3xl font-serif font-black mb-4">Nayarit Digital</h1>
      <p className="text-slate-400 mb-12 max-w-xs">Bienvenido al portal ciudadano. Inicia sesión para continuar.</p>
      
      <button 
        onClick={async () => {
          await login();
          onLogin();
        }}
        className="w-full max-w-xs py-4 bg-white text-slate-900 rounded-full font-black shadow-xl hover:scale-105 transition-transform"
      >
        Iniciar con Google
      </button>
    </div>
  );
}
