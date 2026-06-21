import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ShieldCheck, Upload, CheckCircle2, AlertCircle, Clock,
  FileText, CreditCard, Home, Building2, Receipt, Lock, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

type DocStatus = 'pendiente' | 'cargado' | 'por_vencer' | 'vencido';

interface DocumentoVault {
  id: string;
  label: string;
  descripcion: string;
  icono: React.ElementType;
  color: string;
  status: DocStatus;
  uploadedAt?: string;
  expiresAt?: string;
  usadoEnTramites: number;
}

const DOC_CATALOG: Omit<DocumentoVault, 'status' | 'uploadedAt' | 'expiresAt' | 'usadoEnTramites'>[] = [
  {
    id: 'ine',
    label: 'INE / Credencial de Elector',
    descripcion: 'Identificación oficial vigente',
    icono: CreditCard,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'curp',
    label: 'CURP',
    descripcion: 'Clave Única de Registro de Población',
    icono: FileText,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'comprobante_domicilio',
    label: 'Comprobante de Domicilio',
    descripcion: 'Agua, luz o teléfono — máx. 3 meses',
    icono: Home,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'rfc',
    label: 'RFC',
    descripcion: 'Constancia de Situación Fiscal',
    icono: Receipt,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'acta_nacimiento',
    label: 'Acta de Nacimiento',
    descripcion: 'Documento de Registro Civil',
    icono: Building2,
    color: 'bg-rose-50 text-rose-600',
  },
];

function statusLabel(s: DocStatus) {
  switch (s) {
    case 'cargado': return { text: 'Cargado', cls: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
    case 'por_vencer': return { text: 'Por vencer', cls: 'text-amber-600 bg-amber-50 border-amber-100' };
    case 'vencido': return { text: 'Vencido', cls: 'text-red-500 bg-red-50 border-red-100' };
    default: return { text: 'Pendiente', cls: 'text-slate-400 bg-slate-50 border-slate-100' };
  }
}

function statusIcon(s: DocStatus) {
  switch (s) {
    case 'cargado': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'por_vencer': return <Clock className="w-4 h-4 text-amber-500" />;
    case 'vencido': return <AlertCircle className="w-4 h-4 text-red-500" />;
    default: return <Upload className="w-4 h-4 text-slate-300" />;
  }
}

export function ExpedienteUnicoView({ onClose }: { onClose: () => void }) {
  const [documentos, setDocumentos] = useState<DocumentoVault[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [privaChecked, setPrivaChecked] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const ref = doc(db, 'expediente_unico', uid);
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const docs = DOC_CATALOG.map((d) => {
        const saved = data[d.id] || {};
        return {
          ...d,
          status: (saved.status as DocStatus) || 'pendiente',
          uploadedAt: saved.uploadedAt,
          expiresAt: saved.expiresAt,
          usadoEnTramites: saved.usadoEnTramites || 0,
        };
      });
      setDocumentos(docs);
    });
    return () => unsub();
  }, []);

  const handleUpload = async (docId: string) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    setUploading(docId);
    // Simulate secure upload (in production: Firebase Storage + encryption metadata)
    await new Promise((r) => setTimeout(r, 1400));
    const now = new Date();
    const expiresAt =
      docId === 'comprobante_domicilio'
        ? new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString()
        : undefined;
    const ref = doc(db, 'expediente_unico', uid);
    await setDoc(
      ref,
      {
        [docId]: {
          status: 'cargado',
          uploadedAt: now.toISOString(),
          ...(expiresAt ? { expiresAt } : {}),
          usadoEnTramites: 0,
        },
        updatedAt: now.toISOString(),
        privacyAccepted: true,
      },
      { merge: true }
    );
    setUploading(null);
  };

  const cargados = documentos.filter((d) => d.status === 'cargado').length;
  const pct = documentos.length ? Math.round((cargados / documentos.length) * 100) : 0;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 200 }}
      className="absolute inset-0 z-[70] bg-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-4 bg-slate-900 text-white flex-shrink-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
              LMR · Art. 18 · Cero Papeles
            </p>
            <h2 className="text-2xl font-serif font-black leading-tight">Expediente Único</h2>
            <p className="text-[10px] text-white/50 mt-1 font-bold uppercase tracking-widest">
              Bóveda Ciudadana · Cifrado AES-256
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress ring / bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-emerald-400 rounded-full"
            />
          </div>
          <span className="text-xs font-black text-emerald-400 tabular-nums">{cargados}/{documentos.length}</span>
        </div>
        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-2">
          {pct < 100
            ? `Completa tu bóveda: ${pct}% — Documentos faltantes retrasan tus trámites`
            : '¡Bóveda completa! Tus trámites se procesan automáticamente'}
        </p>
      </div>

      {/* Aviso LFPDPPP banner */}
      <div className="px-6 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center gap-3 flex-shrink-0">
        <Lock className="w-4 h-4 text-indigo-500 shrink-0" />
        <p className="text-[9px] text-indigo-700 font-bold leading-tight flex-1">
          Tus documentos se almacenan cifrados bajo la{' '}
          <button
            onClick={() => setShowPrivacy(true)}
            className="underline text-indigo-800"
          >
            LFPDPPP
          </button>
          . Nunca se comparten sin tu consentimiento.
        </p>
        <input
          type="checkbox"
          checked={privaChecked}
          onChange={(e) => setPrivaChecked(e.target.checked)}
          className="w-4 h-4 accent-indigo-600 shrink-0"
          aria-label="Acepto el Aviso de Privacidad"
        />
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {documentos.map((d) => {
          const sl = statusLabel(d.status);
          return (
            <motion.div
              key={d.id}
              layout
              className={cn(
                'p-5 rounded-[1.8rem] border transition-all',
                d.status === 'cargado'
                  ? 'bg-white border-emerald-100 shadow-sm'
                  : d.status === 'por_vencer'
                  ? 'bg-amber-50/50 border-amber-200'
                  : d.status === 'vencido'
                  ? 'bg-red-50/40 border-red-200'
                  : 'bg-white border-slate-100'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center shrink-0', d.color)}>
                  <d.icono className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-black text-slate-900 leading-none">{d.label}</p>
                    <span
                      className={cn(
                        'text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0',
                        sl.cls
                      )}
                    >
                      {sl.text}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">{d.descripcion}</p>

                  {d.uploadedAt && (
                    <p className="text-[9px] text-slate-400 mt-1">
                      Subido: {new Date(d.uploadedAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {d.expiresAt && (
                        <> · Vence: {new Date(d.expiresAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}</>
                      )}
                    </p>
                  )}

                  {d.usadoEnTramites > 0 && (
                    <p className="text-[9px] text-emerald-600 font-bold mt-1">
                      ✓ Usado en {d.usadoEnTramites} trámite{d.usadoEnTramites > 1 ? 's' : ''} — sin re-subir
                    </p>
                  )}
                </div>

                {/* Action button */}
                <div className="shrink-0">
                  {uploading === d.id ? (
                    <div className="w-9 h-9 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin" />
                  ) : d.status === 'cargado' ? (
                    <button
                      onClick={() => handleUpload(d.id)}
                      className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center"
                      title="Reemplazar documento"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpload(d.id)}
                      disabled={!privaChecked && d.status === 'pendiente'}
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center transition-all',
                        privaChecked || d.status !== 'pendiente'
                          ? 'bg-slate-900 text-white active:scale-90'
                          : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      )}
                      title={!privaChecked ? 'Acepta el aviso de privacidad primero' : 'Subir documento'}
                    >
                      {statusIcon(d.status)}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Legal anchor */}
        <div className="mt-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[9px] text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Art. 18 LMR:</strong> El municipio está obligado a aceptar los documentos de esta bóveda sin solicitar copias físicas en ventanilla. Si un servidor público te pide el documento en papel, puedes invocar el principio de{' '}
              <strong className="text-slate-700">Cero Papel</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[80] bg-black/60 flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full rounded-t-[2rem] p-8 max-h-[70%] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-black">Aviso de Privacidad</h3>
                <button onClick={() => setShowPrivacy(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                <strong className="text-slate-800">Responsable:</strong> Ayuntamiento de Tepic, Nayarit · H. Municipio de Tepic.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                <strong className="text-slate-800">Finalidad:</strong> Los documentos que proporciones en la Bóveda Ciudadana serán utilizados exclusivamente para el procesamiento de trámites municipales y la prestación de servicios públicos, conforme a la{' '}
                <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                <strong className="text-slate-800">Seguridad:</strong> Tus datos se cifran con AES-256 en reposo y TLS 1.3 en tránsito. Ningún dato sensible se comparte con terceros sin consentimiento explícito.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                <strong className="text-slate-800">Derechos ARCO:</strong> Tienes derecho de Acceso, Rectificación, Cancelación y Oposición al tratamiento de tus datos. Contacto: datos@tepic.gob.mx
              </p>
              <button
                onClick={() => { setPrivaChecked(true); setShowPrivacy(false); }}
                className="w-full py-4 bg-slate-900 text-white rounded-full font-black text-sm"
              >
                Acepto el Aviso de Privacidad
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
