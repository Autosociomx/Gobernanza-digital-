import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ServiciosView() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Reporte CSV generado exitosamente. Se ha enviado una copia al correo institucional.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Servicios Públicos Inteligentes</h3>
        <p className="text-slate-400 text-sm mt-1">Clasificador de IA y asignación de cuadrillas automáticas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Reportes Hoy', val: '184', change: '+12%' },
          { label: 'Tiempo Resp.', val: '2.4h', change: '-15%' },
          { label: 'Baches Report.', val: '45', change: '0%' },
          { label: 'Luminarias', val: '89', change: '+5%' },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-500 font-semibold">{kpi.label}</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{kpi.val}</span>
              <span className="text-xs text-emerald-400">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
          <h4 className="text-sm font-semibold text-slate-300">Flujo de Reportes en Tiempo Real</h4>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {isExporting ? 'Procesando...' : 'Exportar CSV'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-800/30 text-slate-500 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">ID Ticket</th>
                <th className="px-6 py-3 font-medium">Ciudadano RUTA</th>
                <th className="px-6 py-3 font-medium">Categoría (IA)</th>
                <th className="px-6 py-3 font-medium">Ubicación</th>
                <th className="px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { id: 'TK-092', user: 'Juan Pérez', cat: 'Fuga de Agua', loc: 'Zona Centro', status: 'Asignado' },
                { id: 'TK-093', user: 'Ana G.', cat: 'Bacheo', loc: 'Colonia X', status: 'Recibido' },
                { id: 'TK-094', user: 'Luis M.', cat: 'Luminaria', loc: 'Libramiento', status: 'Resuelto' },
                { id: 'TK-095', user: 'María D.', cat: 'Basura', loc: 'Parque', status: 'En Proceso' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{row.id}</td>
                  <td className="px-6 py-4 text-slate-300">{row.user}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">{row.cat}</span></td>
                  <td className="px-6 py-4 text-slate-400">{row.loc}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "flex items-center gap-1.5 text-xs font-medium",
                      row.status === 'Resuelto' ? 'text-emerald-400' :
                      row.status === 'En Proceso' ? 'text-amber-400' :
                      row.status === 'Asignado' ? 'text-blue-400' : 'text-slate-400'
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full",
                        row.status === 'Resuelto' ? 'bg-emerald-400' :
                        row.status === 'En Proceso' ? 'bg-amber-400' :
                        row.status === 'Asignado' ? 'bg-blue-400' : 'bg-slate-400'
                      )}></div>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
