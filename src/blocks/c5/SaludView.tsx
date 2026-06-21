import React from 'react';
import { Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SaludView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight text-rose-500">TEPICTU Salud</h3>
          <p className="text-slate-400 text-sm mt-1">Triaje médico Offline + Alertas Epidemiológicas.</p>
        </div>
        <div className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-mono flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          SISTEMA OFFLINE ACTIVO EN LA SIERRA
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Mapa de Calor: Alertas de Salud Pública</h4>
          <div className="aspect-[21/9] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.15] mix-blend-screen"></div>
            <div className="absolute top-[40%] left-[30%] w-32 h-32 bg-rose-500/30 rounded-full blur-2xl"></div>
            <div className="absolute top-[20%] left-[60%] w-20 h-20 bg-amber-500/30 rounded-full blur-xl"></div>

            <div className="relative z-10 text-center">
              <Activity className="w-8 h-8 text-rose-500 mx-auto mb-2 opacity-50" />
              <p className="text-sm text-slate-400">Generando inferencias geográficas en tiempo real.</p>
              <div className="mt-4 flex gap-2 justify-center">
                <span className="text-xs px-2 py-1 bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">Dengue (+12 casos detectados)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Incidencias Recientes</h4>
          <div className="space-y-4">
            {[
              { time: 'Hace 5m', desc: 'Triaje Nivel 4 (Urgencia Urgente) reportado en zona norte.', type: 'critical' },
              { time: 'Hace 12m', desc: 'Consulta automatizada off-line completada en Puga.', type: 'normal' },
              { time: 'Hace 1h', desc: 'Alerta de desabasto en Centro de Salud #4.', type: 'warning' },
            ].map((feed, i) => (
              <div key={i} className="flex gap-3 text-sm border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                <span className="text-xs text-slate-500 font-mono flex-shrink-0 w-16">{feed.time}</span>
                <p className={cn(
                  feed.type === 'critical' ? 'text-rose-400' :
                  feed.type === 'warning' ? 'text-amber-400' : 'text-slate-300'
                )}>{feed.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
