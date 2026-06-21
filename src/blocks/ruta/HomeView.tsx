import React from 'react';
import { ShieldCheck, ChevronRight, Bell, Users, LayoutGrid, Droplets, CreditCard, Stethoscope, Lightbulb } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { auth } from '../../firebase';
import { QuickAction } from './shared';
import { cn } from '../../lib/utils';

export function HomeView({
  profile,
  onShowMap,
  onShowTriage,
  onGoToForum,
  onGoToProfile,
  onGoToPayments,
  onGoToServices
}: {
  profile: any,
  onShowMap: () => void,
  onShowTriage: () => void,
  onGoToForum: () => void,
  onGoToProfile: () => void,
  onGoToPayments: () => void,
  onGoToServices: () => void
}) {
  return (
    <div className="space-y-6 pt-2">
      {/* Nayarit ID Secure Card */}
      <div
        onClick={onGoToProfile}
        className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40 cursor-pointer group transition-all hover:scale-[1.02]"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
        <div className="flex justify-between items-start relative z-10 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono text-indigo-300 uppercase font-black tracking-[0.3em]">NAYARIT ID · SOBERANÍA DIGITAL</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Identidad Cifrada en Tiempo Real</span>
            </div>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-md text-blue-300 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border border-blue-500/30">
            {profile.registrationVerified ? 'CIUDADANO VERIFICADO' : 'PENDIENTE VERIFICACIÓN'}
          </div>
        </div>

        <div className="flex justify-between items-end relative z-10">
          <div className="space-y-1">
            <p className="text-sm font-mono text-white/40 mb-1">PROPIETARIO:</p>
            <h2 className="text-3xl font-serif font-black tracking-tight group-hover:text-indigo-200 transition-colors uppercase leading-none">{profile.name}</h2>
            <div className="flex items-center gap-3 pt-4">
              <p className="text-[11px] font-mono text-white/60">COLONIA: {profile.neighborhood || 'NO ASIGNADA'}</p>
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", profile.registrationVerified ? "bg-emerald-400" : "bg-amber-400")}></span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-2xl group-hover:rotate-3 transition-transform">
            <QRCodeSVG value={`https://ais-pre-jvb66uvbgg3wdzh3ns63hv.run.app/verify/${auth.currentUser?.uid}`} size={64} level="L" />
          </div>
        </div>
      </div>

      {/* Primary Services Grid */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <LayoutGrid className="w-3 h-3" />
          Servicios Prioritarios
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <QuickAction icon={Droplets} label="Mi Agua" color="bg-blue-50 text-blue-600" onClick={onGoToPayments} description="Recibos y Pagos" />
          <QuickAction icon={CreditCard} label="Mi Predial" color="bg-emerald-50 text-emerald-600" onClick={onGoToPayments} description="Estado de Cuenta" />
          <QuickAction icon={Stethoscope} label="Salud ConectaX" color="bg-rose-50 text-rose-600" onClick={onShowTriage} description="Triaje CIE-11" />
          <QuickAction icon={Lightbulb} label="Reportar Falla" color="bg-amber-50 text-amber-600" onClick={onGoToServices} description="Servicios Urbanos" />
        </div>
      </div>

      {/* Forum CTA for Neighborhood Networks */}
      <button
        onClick={onGoToForum}
        className="w-full bg-slate-900 rounded-[2rem] p-6 flex items-center justify-between text-white shadow-xl overflow-hidden relative group"
      >
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
          <Users className="w-24 h-24" />
        </div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🤝</div>
          <div className="text-left">
            <p className="font-serif font-black text-xl leading-tight">Redes Ciudadanas</p>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Foros por Colonia y Comités</p>
          </div>
        </div>
        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </div>
      </button>

      {/* Transparency / Obras */}
      <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-magenta-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trazabilidad en Tiempo Real</span>
          </div>
          <Bell className="w-4 h-4 text-slate-300" />
        </div>
        <p className="text-sm font-bold text-slate-900 leading-tight">Reencarpetamiento San Juan: 65% de avance.</p>
        <button
          onClick={onShowMap}
          className="mt-5 w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-900 flex items-center justify-center gap-2 transition-all hover:bg-slate-100"
        >
          AUDITAR OBRA PÚBLICA <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
