import React from 'react';
import { Search, Stethoscope, Lightbulb, ShieldCheck, Droplets, Plus, ChevronRight } from 'lucide-react';
import { ViewHeader } from './shared';
import { cn } from '../../lib/utils';

export function ServicesView({ onShowTriage, onBack }: { onShowTriage: () => void, onBack: () => void }) {
  return (
    <div className="pt-2 space-y-8">
      <ViewHeader title="Centro de Servicios" onBack={onBack} />

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="¿Qué trámite o reporte buscas?"
          className="w-full bg-slate-50 border-2 border-slate-100/50 rounded-[1.5rem] pl-12 pr-4 py-5 text-sm outline-none focus:border-magenta-500/30 transition-colors"
        />
      </div>

      <div className="space-y-6">
        {/* ConectaX Salud — Triaje IA Priority */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">Prioridad Ciudadana</h3>
          <div
            onClick={onShowTriage}
            className="flex justify-between items-center p-6 bg-slate-900 rounded-[2rem] cursor-pointer group shadow-xl shadow-slate-900/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-black text-white block">Salud ConectaX</span>
                <span className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Triaje IA CIE-11</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Urban Services */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Reportes Urbanos</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Reportar Luminaria', desc: 'Fallos de alumbrado público', icon: Lightbulb, color: 'text-amber-500' },
              { label: 'Reportar Bache', desc: 'Daños en la cinta asfáltica', icon: ShieldCheck, color: 'text-blue-500' },
              { label: 'Falla de Agua / Fuga', desc: 'Reporte de fugas en red', icon: Droplets, color: 'text-sky-500' }
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-[1.5rem] hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center", s.color)}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 mb-0.5">{s.label}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">{s.desc}</p>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Administrative Trámites */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Trámites Administrativos</h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 divide-y divide-slate-50 overflow-hidden">
            {['Licencia de Funcionamiento', 'Permiso de Construcción', 'Uso de Suelo', 'Actas de Nacimiento'].map(s => (
              <div key={s} className="px-8 py-5 flex justify-between items-center hover:bg-slate-50 cursor-pointer transition-colors">
                <span className="text-sm font-bold text-slate-700">{s}</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
