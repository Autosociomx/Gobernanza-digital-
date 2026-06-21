import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import { ViewHeader } from './shared';
import { cn } from '../../lib/utils';

export function SecurityCenterView({ onBack }: { onBack: () => void }) {
  return (
    <div className="pt-2 pb-10 space-y-6">
      <ViewHeader title="Seguridad y Nayarit ID" onBack={onBack} />

      {/* Technical Certification */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-magenta-500/20 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-magenta-400" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Certificado de Gobernanza Digital</p>
          </div>
          <h3 className="text-xl font-serif font-black mb-6 leading-tight">Ecosistema Público Auditado por Google Cloud & Gemini AI</h3>

          <div className="space-y-4">
            {[
              { label: 'Infraestructura', value: 'Google Cloud Platform' },
              { label: 'Base de Datos', value: 'Firestore (GCP Instance)' },
              { label: 'Inteligencia', value: 'G:3.1 | C:3.5 | L:70B' },
              { label: 'Protocolo ID', value: 'Hybrid Trust Nayarit' },
            ].map((item, i) => (
              <div key={i} className={cn("flex items-center justify-between py-2", i < 3 ? "border-b border-white/10" : "")}>
                <span className="text-[10px] font-bold text-white/40 uppercase">{item.label}</span>
                <span className="text-xs font-mono text-magenta-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* House-to-House Protocol */}
      <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-emerald-900 uppercase tracking-tight">Validación Casa por Casa</h4>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Protocolo de Registro 2026</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
            <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
              Los datos de **Identificación, Teléfono, Correo y Domicilio** son validados físicamente por personal certificado.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
            <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
              **Sincronización segura**: La información se vincula directamente a la red de gobernanza para servicios de emergencia inmediatos.
            </p>
          </div>
        </div>
      </div>

      {/* Access Configuration */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Configuración de Acceso</h4>
        <div className="bg-white rounded-[2rem] border border-slate-100 divide-y divide-slate-50 overflow-hidden shadow-sm">
          {[
            { label: 'Autenticación Biométrica', status: 'Activado', color: 'text-emerald-500' },
            { label: 'Cifrado de Extremo a Extremo', status: 'Activo', color: 'text-emerald-500' },
            { label: 'Verificación en Dos Pasos', status: 'Configurado', color: 'text-emerald-500' },
            { label: 'Nivel de Privacidad', status: 'Máximo', color: 'text-blue-500' }
          ].map((item, i) => (
            <div key={i} className="px-8 py-6 flex justify-between items-center">
              <span className="font-bold text-slate-700">{item.label}</span>
              <span className={cn("text-[10px] font-black uppercase tracking-widest", item.color)}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Sesiones Activas</h4>
        <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">📱</div>
              <div>
                <p className="text-sm font-bold text-slate-900">Este Dispositivo (Tepic)</p>
                <p className="text-[10px] text-slate-400">Hace un momento</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
