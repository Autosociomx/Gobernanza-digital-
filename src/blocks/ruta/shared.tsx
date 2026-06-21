import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TabButton({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 group">
      <Icon className={cn("w-5 h-5 transition-colors", active ? "text-magenta-500" : "text-slate-400 group-hover:text-slate-600")} style={active ? {color:'var(--magenta)'} : {}} />
      <span className={cn("text-[9px] font-bold uppercase tracking-wider transition-colors", active ? "text-magenta-500" : "text-slate-400")} style={active ? {color:'var(--magenta)'} : {}}>{label}</span>
    </button>
  );
}

export function QuickAction({ icon: Icon, label, color, description, onClick }: { icon: any, label: string, color: string, description?: string, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-5 rounded-[2rem] flex flex-col items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-sm border border-transparent hover:border-slate-200 text-left",
        color
      )}
    >
      <Icon className="w-8 h-8" />
      <div className="text-center">
        <p className="text-[11px] font-black uppercase tracking-tight leading-none mb-1">{label}</p>
        {description && <p className="text-[8px] opacity-60 font-bold uppercase tracking-tighter leading-none">{description}</p>}
      </div>
    </button>
  );
}

export function ViewHeader({ title, onBack }: { title: string, onBack?: () => void }) {
  return (
    <div className="flex items-center gap-4 py-4 mb-2">
      {onBack && (
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
      )}
      <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight">{title}</h2>
    </div>
  );
}
