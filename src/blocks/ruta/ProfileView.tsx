import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import { ViewHeader } from './shared';
import { CredentialScannerView } from '../../components/CredentialScannerView';
import { auth } from '../../firebase';
import { cn } from '../../lib/utils';

export function ProfileView({
  profile,
  onLogout,
  onBack,
  onGoToSecurity,
  onUpdate
}: {
  profile: any,
  onLogout: () => void,
  onBack: () => void,
  onGoToSecurity: () => void,
  onUpdate: (data: any) => void
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleSave = () => {
    onUpdate(localProfile);
    setIsEditing(false);
  };

  return (
    <div className="pt-2 pb-10 space-y-6">
      {showScanner && (
        <CredentialScannerView
          onBack={() => setShowScanner(false)}
          onScanComplete={(data) => {
            console.log("Scan Data:", data);
            setShowScanner(false);
          }}
        />
      )}
      <ViewHeader title="Mi Perfil Nayarit ID" onBack={onBack} />

      {/* Profile Header & Stats */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100/50 flex flex-col items-center relative">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          {isEditing ? <ChevronLeft className="w-5 h-5 text-slate-900" /> : <ShieldCheck className="w-5 h-5" />}
        </button>

        <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-2xl overflow-hidden mb-6 ring-1 ring-slate-100">
          <img src={auth.currentUser?.photoURL || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80"} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="text-center mb-10 w-full">
          {isEditing ? (
            <div className="space-y-3 w-full text-left">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Nombre Completo</label>
                <input type="text" value={localProfile.name} onChange={e => setLocalProfile({...localProfile, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Documento de Identidad (INE/CURP)</label>
                <button onClick={() => setShowScanner(true)} className="w-full bg-magenta-100 text-magenta-700 py-3 rounded-xl text-xs font-bold my-2">Escanear INE / OCR</button>
                <input type="text" value={localProfile.documentId} onChange={e => setLocalProfile({...localProfile, documentId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Teléfono</label>
                <input type="text" value={localProfile.phone} onChange={e => setLocalProfile({...localProfile, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Correo Electrónico</label>
                <input type="email" value={localProfile.email} onChange={e => setLocalProfile({...localProfile, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Dirección (Domicilio)</label>
                <input type="text" value={localProfile.address} onChange={e => setLocalProfile({...localProfile, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Colonia / Barrio</label>
                <input type="text" value={localProfile.neighborhood} onChange={e => setLocalProfile({...localProfile, neighborhood: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold mt-1" />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-slate-900 text-white rounded-xl py-4 text-xs font-black uppercase tracking-widest mt-4 shadow-lg active:scale-[0.98] transition-transform"
              >
                Confirmar Datos Nayarit ID
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight">{profile.name}</h2>
              <p className="text-xs font-mono text-slate-500 mt-1">{profile.documentId || 'ID No Registrada'}</p>
              <p className="text-xs text-slate-600 mt-2">{profile.email} · {profile.phone}</p>
              <p className="text-xs text-slate-600 mt-1 italic">{profile.neighborhood || 'Sin Colonia Asignada'}</p>
              <p className="text-xs text-slate-600 mt-1">{profile.address}</p>
              <p className="text-[10px] font-mono text-emerald-500 mt-3 uppercase tracking-[0.2em] font-bold inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                <ShieldCheck className="w-3 h-3" /> Estado: {profile.registrationVerified ? 'Identidad Verificada' : 'Pendiente de Verificación'}
              </p>
            </>
          )}
        </div>

        <div className="w-full">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-3 text-left">Panel de Métricas Ciudadanas</p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-6 bg-slate-50/50 rounded-3xl text-center border border-slate-100">
              <p className="text-3xl font-black text-slate-900 mb-1">12</p>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-tight">Reportes Urbanos Resueltos</p>
            </div>
            <div className="p-6 bg-magenta-50/50 rounded-3xl text-center border border-magenta-100">
              <p className="text-3xl font-black text-magenta-500 mb-1">450</p>
              <p className="text-[9px] text-magenta-400 uppercase font-black tracking-widest leading-tight">Puntos Recompensa Conecta</p>
            </div>
          </div>
        </div>

        {/* AI Certification Badge */}
        <div className="w-full mt-8 p-4 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-between group cursor-help transition-all hover:bg-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-magenta-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-tight">Estándar de Gestión Pública</p>
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-tight">Certificado: Google Cloud · Gemini · Claude</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-magenta-500/10 rounded-full border border-magenta-500/20">
            <span className="text-[8px] font-black text-magenta-500 uppercase">Auditado</span>
          </div>
        </div>
      </div>

      {/* Security Link */}
      <div className="space-y-3">
        <button
          onClick={onGoToSecurity}
          className="w-full bg-white px-8 py-6 rounded-[2rem] shadow-sm border border-slate-100/50 text-left flex items-center justify-between group transition-all hover:bg-slate-50"
        >
          <span className="text-lg font-bold text-slate-800">Seguridad y Nayarit ID</span>
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
        </button>
      </div>

      {/* Navigation Actions */}
      <div className="space-y-4 pt-4">
        <button
          onClick={onLogout}
          className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-center shadow-lg transition-transform active:scale-[0.98]"
        >
          VOLVER AL PORTAL DE ESTRATEGIA
        </button>

        <button
          onClick={() => window.location.reload()}
          className="w-full py-6 bg-red-50 text-red-500 rounded-[2rem] font-black text-center border border-red-100/50 transition-colors hover:bg-red-100"
        >
          CERRAR SESIÓN NAYARIT ID
        </button>
      </div>
    </div>
  );
}
