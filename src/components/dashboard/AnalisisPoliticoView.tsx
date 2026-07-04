import React from 'react';
import { Brain, Sparkles, TrendingUp, Shield } from 'lucide-react';

export function AnalisisPoliticoView() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Análisis Estratégico & Gobernanza Digital</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-purple-500/30 p-6 rounded-2xl">
          <Brain className="w-8 h-8 text-purple-400 mb-4" />
          <h4 className="text-sm font-semibold text-slate-300 mb-2">NLP Estratégico (Opinión Pública)</h4>
          <p className="text-xs text-slate-500">Procesamiento de sentimiento para ciudadanos sobre decisiones municipales.</p>
        </div>
        <div className="bg-[#161920] border border-cyan-500/30 p-6 rounded-2xl">
          <Sparkles className="w-8 h-8 text-cyan-400 mb-4" />
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Estrategia Política Basada en IA</h4>
          <p className="text-xs text-slate-500">Predicción de impacto de políticas públicas mediante modelos de gobernanza.</p>
        </div>
      </div>
    </div>
  );
}
