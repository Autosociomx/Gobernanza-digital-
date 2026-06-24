import React, { useState, useEffect } from 'react';
import {
  Lightbulb, ShieldAlert, Droplets, Trash2, Plus, ChevronLeft,
  Camera, MapPin, Send, CheckCircle2, Clock, AlertCircle,
  RefreshCw, QrCode, X, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../firebase';
import {
  collection, addDoc, onSnapshot, query, where, updateDoc, doc, Timestamp
} from 'firebase/firestore';
import { sumarPuntos, PUNTOS } from '../lib/nayaritPoints';
import { cn } from '../lib/utils';
import { QRCodeSVG } from 'qrcode.react';

// ─── Types ────────────────────────────────────────────────────────────────────

type TipoReporte = 'luminaria' | 'bache' | 'agua' | 'basura' | 'otro';
type StatusReporte = 'RECIBIDO' | 'EN_ATENCION' | 'RESUELTO' | 'VERIFICADO_CIUDADANO';

interface Reporte {
  id: string;
  uid: string;
  folio: string;
  tipo: TipoReporte;
  descripcion: string;
  foto: string;
  ubicacion: string;
  status: StatusReporte;
  creadoEn: Timestamp;
  resolvedAt?: Timestamp;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TIPOS: { id: TipoReporte; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { id: 'luminaria', label: 'Luminaria', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
  { id: 'bache',     label: 'Bache',     icon: ShieldAlert, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' },
  { id: 'agua',      label: 'Fuga / Agua', icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-50 border-sky-200' },
  { id: 'basura',    label: 'Basura',    icon: Trash2,    color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200' },
];

const STATUS_META: Record<StatusReporte, { label: string; color: string; icon: React.ElementType }> = {
  RECIBIDO:             { label: 'Recibido', color: 'text-blue-600 bg-blue-50', icon: Clock },
  EN_ATENCION:          { label: 'En Atención', color: 'text-amber-600 bg-amber-50', icon: RefreshCw },
  RESUELTO:             { label: 'Resuelto — Pendiente Confirmar', color: 'text-violet-600 bg-violet-50', icon: CheckCircle2 },
  VERIFICADO_CIUDADANO: { label: 'Verificado ✓', color: 'text-emerald-600 bg-emerald-50', icon: CheckCircle2 },
};

const FOTOS_PLACEHOLDER = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1565982960042-f05fd11f2a78?w=400&h=300&fit=crop',
];

function generarFolio(): string {
  return `REP-${Date.now().toString(36).toUpperCase()}-TEP`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ReporteCard({ r, onVerificar, onReactivar }: {
  r: Reporte;
  onVerificar: (id: string) => void;
  onReactivar: (id: string) => void;
}) {
  const tipo = TIPOS.find(t => t.id === r.tipo) || TIPOS[0];
  const meta = STATUS_META[r.status];
  const Icon = tipo.icon;
  const StatusIcon = meta.icon;
  const fecha = r.creadoEn?.toDate?.() ?? new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden"
    >
      {r.foto && (
        <div className="w-full h-36 bg-slate-100 overflow-hidden">
          <img src={r.foto} alt="Foto del reporte" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center border", tipo.bg)}>
              <Icon className={cn("w-4 h-4", tipo.color)} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 leading-none">{tipo.label}</p>
              <p className="text-[9px] font-mono text-slate-400 mt-0.5">{r.folio}</p>
            </div>
          </div>
          <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1", meta.color)}>
            <StatusIcon className="w-3 h-3" />
            {meta.label}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">{r.descripcion}</p>

        {r.ubicacion && (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <MapPin className="w-3 h-3" />
            {r.ubicacion}
          </div>
        )}

        <p className="text-[9px] text-slate-400">
          {fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>

        {r.status === 'RESUELTO' && (
          <div className="space-y-2 pt-1">
            <p className="text-[10px] text-violet-600 font-bold">¿Se resolvió correctamente tu reporte?</p>
            <div className="flex gap-2">
              <button
                onClick={() => onVerificar(r.id)}
                className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
              >
                Sí, confirmo
              </button>
              <button
                onClick={() => onReactivar(r.id)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest"
              >
                No, reactivar
              </button>
            </div>
          </div>
        )}

        {r.status === 'VERIFICADO_CIUDADANO' && (
          <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Resuelto y verificado por ti · +50 Nayarit Points
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Step = 'lista' | 'tipo' | 'detalle' | 'confirmacion';

export function ReporteCiudadanoView({ onClose }: { onClose: () => void }) {
  const uid = auth.currentUser?.uid ?? 'anon';
  const [step, setStep] = useState<Step>('lista');
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(false);
  const [folioCreado, setFolioCreado] = useState('');

  // Form state
  const [tipoSel, setTipoSel] = useState<TipoReporte | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fotoIdx, setFotoIdx] = useState(0);
  const [fotoCapturada, setFotoCapturada] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reportes'), where('uid', '==', uid));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Reporte));
      docs.sort((a, b) => (b.creadoEn?.seconds ?? 0) - (a.creadoEn?.seconds ?? 0));
      setReportes(docs);
    }, () => setReportes([]));
    return () => unsub();
  }, [uid]);

  const handleEnviar = async () => {
    if (!tipoSel || !descripcion.trim()) return;
    setLoading(true);
    const folio = generarFolio();
    const foto = fotoCapturada ? FOTOS_PLACEHOLDER[fotoIdx % FOTOS_PLACEHOLDER.length] : '';
    try {
      await addDoc(collection(db, 'reportes'), {
        uid,
        folio,
        tipo: tipoSel,
        descripcion: descripcion.trim(),
        foto,
        ubicacion: ubicacion.trim() || 'Tepic, Nayarit',
        status: 'RECIBIDO',
        creadoEn: Timestamp.now(),
      });
      sumarPuntos(uid, `Reporte urbano: ${tipoSel}`, PUNTOS.REPORTE_CREADO, folio).catch(() => {});
      setFolioCreado(folio);
      setStep('confirmacion');
    } catch {
      setFolioCreado(folio);
      setStep('confirmacion');
    }
    setLoading(false);
  };

  const handleVerificar = async (id: string) => {
    await updateDoc(doc(db, 'reportes', id), {
      status: 'VERIFICADO_CIUDADANO',
      resolvedAt: Timestamp.now(),
    }).catch(() => {});
    sumarPuntos(uid, 'Reporte verificado como resuelto', PUNTOS.REPORTE_VERIFICADO, id).catch(() => {});
  };

  const handleReactivar = async (id: string) => {
    await updateDoc(doc(db, 'reportes', id), { status: 'EN_ATENCION' }).catch(() => {});
  };

  const resetForm = () => {
    setTipoSel(null);
    setDescripcion('');
    setUbicacion('');
    setFotoCapturada(false);
    setFotoIdx(Math.floor(Math.random() * FOTOS_PLACEHOLDER.length));
    setStep('tipo');
  };

  return (
    <AnimatePresence mode="wait">
      {/* ── Lista de reportes ─── */}
      {step === 'lista' && (
        <motion.div key="lista" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="min-h-screen bg-[var(--crema)] flex flex-col">
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100 px-5 py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Volver</span>
            </button>
            <h1 className="text-sm font-black text-slate-900">Mis Reportes</h1>
            <button onClick={resetForm}
              className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Nuevo
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
            {reportes.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">📍</p>
                <p className="text-sm font-black text-slate-700 mb-1">Sin reportes aún</p>
                <p className="text-xs text-slate-400">Crea tu primer reporte urbano y recibe seguimiento en tiempo real</p>
                <button onClick={resetForm}
                  className="mt-6 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest">
                  Crear Primer Reporte
                </button>
              </div>
            ) : (
              <>
                <div className="bg-emerald-50 border border-emerald-200 rounded-[1.5rem] p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 font-bold">
                    Tus reportes <strong>nunca se cierran sin tu confirmación</strong>. Si no quedó resuelto, reactívalo con un clic.
                  </p>
                </div>
                {reportes.map(r => (
                  <ReporteCard key={r.id} r={r} onVerificar={handleVerificar} onReactivar={handleReactivar} />
                ))}
              </>
            )}
          </main>
        </motion.div>
      )}

      {/* ── Selección de tipo ─── */}
      {step === 'tipo' && (
        <motion.div key="tipo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="min-h-screen bg-[var(--crema)] p-5 flex flex-col">
          <button onClick={() => setStep('lista')} className="flex items-center gap-2 text-slate-500 mb-6">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">Cancelar</span>
          </button>

          <h2 className="text-2xl font-serif font-black text-[var(--tinta)] mb-2">¿Qué vamos a reportar?</h2>
          <p className="text-xs text-slate-500 mb-8">Selecciona el tipo de problema urbano</p>

          <div className="grid grid-cols-2 gap-4 flex-1">
            {TIPOS.map(t => (
              <button
                key={t.id}
                onClick={() => { setTipoSel(t.id); setStep('detalle'); }}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border-2 transition-all active:scale-[0.97]",
                  tipoSel === t.id ? cn(t.bg, 'shadow-lg') : 'bg-white border-slate-100 hover:border-slate-200'
                )}
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border-2", t.bg)}>
                  <t.icon className={cn("w-7 h-7", t.color)} />
                </div>
                <span className="text-sm font-black text-slate-900">{t.label}</span>
              </button>
            ))}
            <button
              onClick={() => { setTipoSel('otro'); setStep('detalle'); }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border-2 bg-white border-slate-100 hover:border-slate-200 transition-all col-span-2 active:scale-[0.97]"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 bg-slate-50 border-slate-200">
                <Plus className="w-7 h-7 text-slate-500" />
              </div>
              <span className="text-sm font-black text-slate-900">Otro problema</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Detalle del reporte ─── */}
      {step === 'detalle' && tipoSel && (
        <motion.div key="detalle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="min-h-screen bg-[var(--crema)] flex flex-col">
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100 px-5 py-4 flex items-center gap-3">
            <button onClick={() => setStep('tipo')}>
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h1 className="text-sm font-black text-slate-900">Detalle del Reporte</h1>
          </header>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-32">
            {/* Photo capture simulation */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Foto del Problema</label>
              {fotoCapturada ? (
                <div className="relative rounded-[1.5rem] overflow-hidden h-48">
                  <img src={FOTOS_PLACEHOLDER[fotoIdx % FOTOS_PLACEHOLDER.length]} alt="Foto" className="w-full h-full object-cover" />
                  <button onClick={() => setFotoCapturada(false)}
                    className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/50 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                    Foto capturada
                  </div>
                </div>
              ) : (
                <button onClick={() => { setFotoCapturada(true); setFotoIdx(Math.floor(Math.random() * FOTOS_PLACEHOLDER.length)); }}
                  className="w-full h-36 bg-slate-100 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-slate-300 transition-colors">
                  <Camera className="w-8 h-8" />
                  <span className="text-xs font-bold">Tomar foto del problema</span>
                  <span className="text-[9px] text-slate-400">Opcional pero recomendado</span>
                </button>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2 block">
                Descripción <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                placeholder="Describe el problema: ¿dónde está exactamente? ¿hace cuánto tiempo? ¿qué tan grave es?"
                rows={4}
                className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-5 py-4 text-sm outline-none focus:border-magenta-400/40 resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2 block">Ubicación</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={ubicacion}
                  onChange={e => setUbicacion(e.target.value)}
                  placeholder="Ej: Av. México esquina Insurgentes, Col. Centro"
                  className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-11 pr-4 py-4 text-sm outline-none focus:border-magenta-400/40"
                />
              </div>
              <button onClick={() => setUbicacion('Tepic, Nayarit (GPS)')}
                className="mt-2 text-[10px] text-blue-500 font-bold pl-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Usar mi ubicación actual
              </button>
            </div>

            {/* Legal note */}
            <div className="bg-blue-50 border border-blue-100 rounded-[1.5rem] p-4">
              <p className="text-[10px] text-blue-700 leading-relaxed">
                <strong>Art. 70 LGTAIP:</strong> Tu reporte es público y trazable. El área responsable tiene 7 días hábiles para atenderlo.
                Si no recibe respuesta, puedes escalarlo automáticamente desde esta app.
              </p>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100">
            <button
              onClick={handleEnviar}
              disabled={!descripcion.trim() || loading}
              className={cn(
                "w-full py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                descripcion.trim() && !loading
                  ? "bg-slate-900 text-white shadow-xl active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Enviando...</>
              ) : (
                <><Send className="w-4 h-4" /> Enviar Reporte</>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Confirmación ─── */}
      {step === 'confirmacion' && (
        <motion.div key="confirmacion" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen bg-[var(--crema)] flex flex-col items-center justify-center p-8 text-center">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl font-serif font-black text-[var(--tinta)] mb-2">¡Reporte Enviado!</h2>
          <p className="text-xs text-slate-500 mb-8">El área responsable recibirá tu reporte y tienes 7 días hábiles para ver una respuesta</p>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 w-full max-w-xs space-y-4">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Folio de seguimiento</p>
            <p className="text-lg font-mono font-black text-slate-900 tracking-wider">{folioCreado}</p>
            <div className="flex justify-center">
              <QRCodeSVG value={`https://tepic.netlify.app/reporte/${folioCreado}`} size={100} level="M" />
            </div>
            <p className="text-[9px] text-slate-400">Escanea el QR para compartir o dar seguimiento</p>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-[1.5rem] w-full max-w-xs">
            <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
              🔔 <strong>Importante:</strong> Tu reporte <strong>no se cerrará sin tu confirmación</strong>.
              Cuando el área lo marque como resuelto, tú decides si realmente lo está.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
            <button onClick={() => setStep('lista')}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest">
              Ver Mis Reportes
            </button>
            <button onClick={resetForm}
              className="w-full py-4 bg-slate-100 text-slate-700 rounded-[1.5rem] text-xs font-black uppercase tracking-widest">
              Crear Otro Reporte
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
