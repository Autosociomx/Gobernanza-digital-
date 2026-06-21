import React from 'react';
import { cn } from '../../lib/utils';
import { NayaritMap } from '../../components/NayaritMap';

export function ObrasView() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Trazabilidad de Obras</h3>
        <p className="text-slate-400 text-sm mt-1">Monitoreo en tiempo real de infraestructura estatal con alertas de sobrecosto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-semibold text-slate-300">Mapa de Obras Activas</h4>
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium">42 en proceso</span>
          </div>
          <div className="aspect-video bg-slate-800/30 rounded-lg border border-slate-800 relative overflow-hidden">
            <NayaritMap
              center={{ lat: 21.5090, lng: -104.8947 }}
              zoom={14}
              markers={[
                { lat: 21.5090, lng: -104.8947, title: "Obra Principal Centro", color: "#F59E0B" },
                { lat: 21.5150, lng: -104.9050, title: "Frente de Trabajo Norte", color: "#10B981" },
                { lat: 21.5020, lng: -104.8850, title: "Reporte Crítico", color: "#F43F5E" }
              ]}
            />
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Alertas Automáticas</h4>
          <div className="space-y-4">
            {[
              { title: 'Retraso Crítico: Puente Insurgentes', desc: 'Desfase de 15 días detectado en cronograma.', status: 'rojo' },
              { title: 'Requisición de Material', desc: 'Aprobación pendiente para asfalto.', status: 'ambar' },
              { title: 'Entrega Exitosa', desc: 'Unidad médica rehabilitada en tiempo.', status: 'verde' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-800/50">
                <div className={cn(
                  "w-2 rounded-full flex-shrink-0",
                  alert.status === 'rojo' ? 'bg-rose-500' : alert.status === 'ambar' ? 'bg-amber-500' : 'bg-emerald-500'
                )}></div>
                <div>
                  <h5 className="font-semibold text-sm text-slate-200">{alert.title}</h5>
                  <p className="text-xs text-slate-500 mt-1">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
