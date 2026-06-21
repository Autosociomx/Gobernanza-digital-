import React from 'react';
import { TrendingUp, CheckCircle2, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function TesoreriaView() {
  const data = [
    { name: 'Lun', ingresos: 4000, meta: 2400 },
    { name: 'Mar', ingresos: 3000, meta: 1398 },
    { name: 'Mié', ingresos: 2000, meta: 9800 },
    { name: 'Jue', ingresos: 2780, meta: 3908 },
    { name: 'Vie', ingresos: 1890, meta: 4800 },
    { name: 'Sáb', ingresos: 2390, meta: 3800 },
    { name: 'Dom', ingresos: 3490, meta: 4300 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Tesorería Digital</h3>
        <p className="text-slate-400 text-sm mt-1">Recaudación centralizada e historial único por ciudadano.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Recaudación Semanal', value: '$2.4M', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Pagos Digitales', value: '84%', icon: CheckCircle2, color: 'text-purple-400' },
          { label: 'Trámites Activos', value: '1,240', icon: Activity, color: 'text-blue-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/0 to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-6">Proyección de Ingresos (Predial & Agua)</h4>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#10B981' }}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorIngresos)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
