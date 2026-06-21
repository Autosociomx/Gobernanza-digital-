import React from 'react';
import { Droplets, CreditCard } from 'lucide-react';
import { ViewHeader } from './shared';
import { cn } from '../../lib/utils';

export function PaymentsView({ onPay, onBack }: { onPay: (item: any) => void, onBack: () => void }) {
  return (
    <div className="pt-2 space-y-6">
      <ViewHeader title="Tesorería" onBack={onBack} />

      <div className="bg-magenta-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-magenta-500/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2">Total a Pagar</p>
        <h3 className="text-4xl font-serif font-black mb-1">$240.00</h3>
        <p className="text-xs text-white/90">Vence en 14 días</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Pendientes</h3>
        {[
          { icon: Droplets, title: 'Servicio de Agua - Junio 2026', val: '$240.00', status: 'Pendiente', color: 'text-blue-500' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl bg-slate-50", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{item.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 mb-2">{item.val}</p>
              <button
                onClick={() => onPay(item)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-transform"
              >
                Pagar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Historial de Pagos</h3>
        <div className="bg-white rounded-[2rem] border border-slate-100 divide-y divide-slate-50 overflow-hidden shadow-sm">
          {[
            { title: 'Predial Anual 2026', val: '$1,850.00', date: '12 Ene 2026', receipt: '#REC-0921' },
            { title: 'Servicio de Agua - Mayo', val: '$240.00', date: '05 May 2026', receipt: '#REC-0844' },
            { title: 'Servicio de Agua - Abril', val: '$240.00', date: '04 Abr 2026', receipt: '#REC-0711' },
          ].map((item, i) => (
            <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.date} · {item.receipt}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">{item.val}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Pagado</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
