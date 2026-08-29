import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { DemoDataBadge } from './DemoDataBadge';

export function NotificationView({ onBack }: { onBack: () => void }) {
  return (
    <div className="pt-2 pb-10 space-y-6">
      <div className="flex items-center gap-4 py-4 mb-2">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight">Notificaciones</h2>
      </div>

      <DemoDataBadge detail="Las tres notificaciones de abajo están escritas en el código; son las mismas para cualquier persona y no cambian. Todavía no existe una colección de notificaciones por usuario." />

      <div className="space-y-4">
        {[
          { title: "Vencimiento de Predial", desc: "Aprovecha 15% de descuento antes del 31 de Junio.", time: "Hace 2 horas", unread: true },
          { title: "Reporte #4092", desc: "Tu reporte ha sido marcado como RESUELTO.", time: "Hace 1 día", unread: false },
          { title: "Bienvenido", desc: "Bienvenido a la nueva plataforma de servicios ciudadanos.", time: "Hace 3 días", unread: false },
        ].map((item, i) => (
          <div key={i} className={cn("bg-white rounded-[2rem] p-6 border shadow-sm flex gap-4", item.unread ? "border-magenta-500/30 bg-magenta-50/10" : "border-slate-100")}>
            <div className="mt-1">
              <div className={cn("w-2 h-2 rounded-full", item.unread ? "bg-magenta-500" : "bg-transparent")}></div>
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 mb-1">{item.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.desc}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
