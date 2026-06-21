import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AgrovisionView() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Certificado de Producción generado exitosamente. Disponible en la bitácora del productor.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Agrovisión 3D</h3>
        <p className="text-slate-400 text-sm mt-1">Monitoreo satelital y modelado 3D de la producción agropecuaria en Nayarit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Visualización de Parcelas / NDVI</h4>
          <div className="aspect-[16/9] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden group cursor-crosshair">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>

            <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5z' fill='none' stroke='%234ADE80' stroke-width='1'/%3E%3C/svg%3E\")"}}></div>

            <div className="relative z-10 p-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-center">
              <p className="text-xs font-mono text-emerald-400 mb-2 tracking-widest">ANALYZING CROP HEALTH</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">0.82</div>
                  <div className="text-[10px] text-slate-400 uppercase">NDVI Promedio</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">12%</div>
                  <div className="text-[10px] text-slate-400 uppercase">Humedad Suelo</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-slate-400 border border-white/10">RENDER: OCTANE 3D ENGINE</div>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Inteligencia de Mercado</h4>
          <div className="space-y-4">
            {[
              { product: 'Caña de Azúcar', price: '$820/t', trend: 'up' },
              { product: 'Mango Barracuda', price: '$12/kg', trend: 'down' },
              { product: 'Cacao Real', price: '$140/kg', trend: 'stable' },
              { product: 'Maíz Híbrido', price: '$6,200/t', trend: 'up' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-800/20 border border-slate-800 rounded-lg">
                <span className="text-sm text-slate-200">{item.product}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{item.price}</div>
                  <div className={cn(
                    "text-[10px] font-bold uppercase",
                    item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-slate-500'
                  )}>
                    {item.trend === 'up' ? '↑ Alza' : item.trend === 'down' ? '↓ Baja' : '↔ Estable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-6 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {isGenerating ? 'Generando...' : 'Generar Certificado de Producción'}
          </button>
        </div>
      </div>
    </div>
  );
}
