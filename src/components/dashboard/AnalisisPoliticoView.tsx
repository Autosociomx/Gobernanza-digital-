import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { DemoDataBadge } from '../DemoDataBadge';

export function AnalisisPoliticoView() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Análisis Estratégico &amp; Gobernanza Digital</h3>

      <DemoDataBadge detail="Este módulo es una lámina de hoja de ruta: describe dos capacidades propuestas. No hay modelo de NLP, fuente de datos ni cálculo detrás — nada en esta vista analiza información real." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-purple-500/30 p-6 rounded-2xl">
          <Brain className="w-8 h-8 text-purple-400 mb-4" />
          <h4 className="text-sm font-semibold text-slate-300 mb-2">NLP Estratégico (propuesta)</h4>
          <p className="text-xs text-slate-500">Análisis de sentimiento ciudadano sobre decisiones municipales. Requiere primero una fuente de opinión pública consentida y una política de tratamiento de datos; hoy no existe ninguna de las dos.</p>
        </div>
        <div className="bg-[#161920] border border-cyan-500/30 p-6 rounded-2xl">
          <Sparkles className="w-8 h-8 text-cyan-400 mb-4" />
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Estimación de impacto de políticas (propuesta)</h4>
          <p className="text-xs text-slate-500">Estimar el efecto de políticas públicas con modelos de gobernanza. Sin series históricas del municipio conectadas, cualquier predicción sería inventada — por eso aquí no se muestra ninguna.</p>
        </div>
      </div>
    </div>
  );
}
