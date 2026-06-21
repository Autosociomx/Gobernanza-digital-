import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, FileText, Clock, CheckCircle2, AlertCircle, ChevronRight,
  Building2, Hammer, MapPin, Baby, Lightbulb, ShieldCheck, Send,
  Timer, Gavel, Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth } from '../firebase';
import {
  collection, addDoc, onSnapshot, query, where, Timestamp,
  doc, updateDoc
} from 'firebase/firestore';

// ─── Catálogo de Trámites (LMR + Reglamento Municipal Tepic) ───────────────

type TramiteType =
  | 'licencia_funcionamiento'
  | 'permiso_construccion'
  | 'uso_suelo'
  | 'acta_nacimiento'
  | 'luminaria'
  | 'bache'
  | 'fuga_agua';

interface TipoCatalogo {
  id: TramiteType;
  titulo: string;
  icon: React.ElementType;
  color: string;
  plazoHabiles: number; // días hábiles según LMR / Reglamento Tepic
  fundamento: string;
  silencioAfirmativo: boolean; // true = aprobado tácito; false = negativo
}

const CATALOGO: TipoCatalogo[] = [
  {
    id: 'licencia_funcionamiento',
    titulo: 'Licencia de Funcionamiento',
    icon: Building2,
    color: 'text-indigo-600 bg-indigo-50',
    plazoHabiles: 15,
    fundamento: 'Art. 19 LMR · Regl. Tepic Tit. IV',
    silencioAfirmativo: true,
  },
  {
    id: 'permiso_construccion',
    titulo: 'Permiso de Construcción',
    icon: Hammer,
    color: 'text-amber-600 bg-amber-50',
    plazoHabiles: 30,
    fundamento: 'Art. 19 LMR · Ley Desarrollo Urbano NTE',
    silencioAfirmativo: false,
  },
  {
    id: 'uso_suelo',
    titulo: 'Uso de Suelo',
    icon: MapPin,
    color: 'text-emerald-600 bg-emerald-50',
    plazoHabiles: 20,
    fundamento: 'Art. 32 LMR · Plan Director Urbano Tepic',
    silencioAfirmativo: false,
  },
  {
    id: 'acta_nacimiento',
    titulo: 'Acta de Nacimiento',
    icon: Baby,
    color: 'text-rose-600 bg-rose-50',
    plazoHabiles: 5,
    fundamento: 'Art. 17 LMR · Reglamento Registro Civil Nayarit',
    silencioAfirmativo: true,
  },
  {
    id: 'luminaria',
    titulo: 'Reporte Luminaria',
    icon: Lightbulb,
    color: 'text-yellow-600 bg-yellow-50',
    plazoHabiles: 7,
    fundamento: 'Art. 17 LMR · Protocolo Servicios Urbanos Tepic',
    silencioAfirmativo: false,
  },
  {
    id: 'bache',
    titulo: 'Reporte Bache / Vialidad',
    icon: ShieldCheck,
    color: 'text-blue-600 bg-blue-50',
    plazoHabiles: 10,
    fundamento: 'Art. 17 LMR · Reglamento Obras Públicas Tepic',
    silencioAfirmativo: false,
  },
];

// ─── Motor de Días Hábiles ──────────────────────────────────────────────────

function diasHabilesTranscurridos(desde: Date): number {
  const hoy = new Date();
  let count = 0;
  const cursor = new Date(desde);
  cursor.setHours(0, 0, 0, 0);
  const fin = new Date(hoy);
  fin.setHours(0, 0, 0, 0);
  while (cursor < fin) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

function diasHabilesRestantes(desde: Date, plazo: number): number {
  return Math.max(0, plazo - diasHabilesTranscurridos(desde));
}

// ─── Types ──────────────────────────────────────────────────────────────────

type TramiteStatus = 'PENDIENTE' | 'EN_REVISION' | 'APROBADO' | 'RECHAZADO' | 'APROBADO_TACITO';

interface Tramite {
  id: string;
  tipo: TramiteType;
  titulo: string;
  folio: string;
  descripcion: string;
  submittedAt: Timestamp;
  plazoHabiles: number;
  silencioAfirmativo: boolean;
  fundamento: string;
  status: TramiteStatus;
  uid: string;
  resolvedAt?: Timestamp;
  notificado?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generarFolio(tipo: TramiteType): string {
  const prefix: Record<TramiteType, string> = {
    licencia_funcionamiento: 'LIC',
    permiso_construccion: 'CON',
    uso_suelo: 'USO',
    acta_nacimiento: 'REG',
    luminaria: 'LUM',
    bache: 'VIA',
    fuga_agua: 'AGU',
  };
  const stamp = Date.now().toString(36).toUpperCase();
  return `${prefix[tipo] || 'TRM'}-${stamp}-TEP`;
}

function statusMeta(s: TramiteStatus) {
  switch (s) {
    case 'APROBADO':
      return { label: 'Aprobado', cls: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2 };
    case 'APROBADO_TACITO':
      return { label: 'Aprobado Tácito', cls: 'text-indigo-700 bg-indigo-50 border-indigo-200', icon: Gavel };
    case 'RECHAZADO':
      return { label: 'Rechazado', cls: 'text-red-600 bg-red-50 border-red-200', icon: AlertCircle };
    case 'EN_REVISION':
      return { label: 'En Revisión', cls: 'text-amber-600 bg-amber-50 border-amber-200', icon: Timer };
    default:
      return { label: 'Pendiente', cls: 'text-slate-500 bg-slate-50 border-slate-200', icon: Clock };
  }
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CountdownBar({ desde, plazo }: { desde: Date; plazo: number }) {
  const transcurridos = diasHabilesTranscurridos(desde);
  const restantes = Math.max(0, plazo - transcurridos);
  const pct = Math.min(100, Math.round((transcurridos / plazo) * 100));
  const critico = pct >= 80;
  const vencido = transcurridos >= plazo;

  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
        <span className={cn(vencido ? 'text-red-500' : critico ? 'text-amber-500' : 'text-slate-400')}>
          {vencido ? 'Plazo vencido' : `${restantes} día${restantes !== 1 ? 's' : ''} hábil${restantes !== 1 ? 'es' : ''} restante${restantes !== 1 ? 's' : ''}`}
        </span>
        <span className="text-slate-400">{transcurridos}/{plazo} días</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
          className={cn(
            'h-full rounded-full',
            vencido ? 'bg-red-500' : critico ? 'bg-amber-400' : 'bg-emerald-400'
          )}
        />
      </div>
    </div>
  );
}

function SilencioAfirmativoBanner({ folio, tramiteId }: { folio: string; tramiteId: string }) {
  const [applied, setApplied] = useState(false);

  const aplicarSilencio = async () => {
    const ref = doc(db, 'tramites', tramiteId);
    await updateDoc(ref, {
      status: 'APROBADO_TACITO',
      resolvedAt: Timestamp.now(),
    });
    setApplied(true);
  };

  if (applied) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-200"
    >
      <div className="flex items-start gap-3">
        <Gavel className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[10px] font-black text-indigo-800 uppercase tracking-widest mb-1">
            Silencio Afirmativo Activado — Art. 19 LMR
          </p>
          <p className="text-[9px] text-indigo-600 leading-relaxed mb-3">
            El plazo legal venció sin respuesta. Conforme a la LMR, tu trámite{' '}
            <strong>se considera APROBADO</strong>. Puedes generar el acto administrativo ahora.
          </p>
          <button
            onClick={aplicarSilencio}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest"
          >
            Generar Acto Administrativo (Folio {folio})
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TramiteCard({ tramite, catalogo }: { tramite: Tramite; catalogo: TipoCatalogo | undefined }) {
  const [expanded, setExpanded] = useState(false);
  const meta = statusMeta(tramite.status);
  const StatusIcon = meta.icon;
  const desde = tramite.submittedAt?.toDate ? tramite.submittedAt.toDate() : new Date();
  const transcurridos = diasHabilesTranscurridos(desde);
  const plazoVencido = transcurridos >= tramite.plazoHabiles;
  const activarSilencio =
    plazoVencido &&
    tramite.silencioAfirmativo &&
    tramite.status === 'PENDIENTE';

  return (
    <motion.div layout className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-5 text-left">
        <div className="flex items-start gap-4">
          <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center shrink-0', catalogo?.color || 'bg-slate-50 text-slate-400')}>
            {catalogo ? <catalogo.icon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-black text-slate-900 leading-tight">{tramite.titulo}</p>
              <span className={cn('text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0', meta.cls)}>
                {meta.label}
              </span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 mb-1">{tramite.folio}</p>
            {['PENDIENTE', 'EN_REVISION'].includes(tramite.status) && (
              <CountdownBar desde={desde} plazo={tramite.plazoHabiles} />
            )}
          </div>
          <ChevronRight className={cn('w-4 h-4 text-slate-300 shrink-0 mt-1 transition-transform', expanded && 'rotate-90')} />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-slate-50">
              {tramite.descripcion && (
                <p className="text-xs text-slate-500 pt-3 leading-relaxed">{tramite.descripcion}</p>
              )}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Enviado</p>
                  <p className="text-xs font-black text-slate-900">
                    {desde.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Plazo Legal</p>
                  <p className="text-xs font-black text-slate-900">{tramite.plazoHabiles} días hábiles</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-2">
                <Info className="w-3 h-3 text-slate-400 shrink-0" />
                <p className="text-[8px] font-bold text-slate-500">{tramite.fundamento}</p>
              </div>

              {activarSilencio && (
                <SilencioAfirmativoBanner folio={tramite.folio} tramiteId={tramite.id} />
              )}

              {plazoVencido && !tramite.silencioAfirmativo && ['PENDIENTE', 'EN_REVISION'].includes(tramite.status) && (
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-[9px] font-black text-red-700 uppercase tracking-widest mb-1">
                    Plazo Vencido — Silencio Negativo
                  </p>
                  <p className="text-[9px] text-red-600 leading-relaxed">
                    Este trámite aplica silencio negativo. Puedes interponer un recurso de inconformidad ante la Contraloría Municipal.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function TramiteTracker({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'lista' | 'nuevo'>('lista');
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [tipoSel, setTipoSel] = useState<TramiteType | null>(null);
  const [descripcion, setDescripcion] = useState('');

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    const q = query(collection(db, 'tramites'), where('uid', '==', uid));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Tramite));
      docs.sort((a, b) => b.submittedAt?.seconds - a.submittedAt?.seconds);
      setTramites(docs);
      setLoading(false);
    });
    return () => unsub();
  }, [uid]);

  const handleSubmit = async () => {
    if (!tipoSel || !uid) return;
    const cat = CATALOGO.find((c) => c.id === tipoSel)!;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'tramites'), {
        tipo: tipoSel,
        titulo: cat.titulo,
        folio: generarFolio(tipoSel),
        descripcion: descripcion.trim(),
        submittedAt: Timestamp.now(),
        plazoHabiles: cat.plazoHabiles,
        silencioAfirmativo: cat.silencioAfirmativo,
        fundamento: cat.fundamento,
        status: 'PENDIENTE',
        uid,
      });
      setTipoSel(null);
      setDescripcion('');
      setView('lista');
    } finally {
      setSubmitting(false);
    }
  };

  const pendientes = tramites.filter((t) => ['PENDIENTE', 'EN_REVISION'].includes(t.status));
  const resueltos = tramites.filter((t) => ['APROBADO', 'RECHAZADO', 'APROBADO_TACITO'].includes(t.status));

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
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
              Ventanilla Única · LMR Art. 17
            </p>
            <h2 className="text-2xl font-serif font-black">Mis Trámites</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setView('lista')}
            className={cn(
              'flex-1 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
              view === 'lista' ? 'bg-white text-slate-900' : 'bg-white/10 text-white/60'
            )}
          >
            Mis Trámites {tramites.length > 0 && `(${tramites.length})`}
          </button>
          <button
            onClick={() => setView('nuevo')}
            className={cn(
              'flex-1 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
              view === 'nuevo' ? 'bg-white text-slate-900' : 'bg-white/10 text-white/60'
            )}
          >
            + Nuevo Trámite
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {/* ── LISTA ─────────────────────────────────────────────── */}
          {view === 'lista' && (
            <motion.div
              key="lista"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {loading ? (
                <div className="flex justify-center py-16">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                </div>
              ) : tramites.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <FileText className="w-12 h-12 text-slate-200 mx-auto" />
                  <p className="text-slate-400 text-sm font-bold">Aún no tienes trámites registrados</p>
                  <button
                    onClick={() => setView('nuevo')}
                    className="px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-black"
                  >
                    Iniciar mi primer trámite
                  </button>
                </div>
              ) : (
                <>
                  {pendientes.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">
                        Activos ({pendientes.length})
                      </p>
                      {pendientes.map((t) => (
                        <TramiteCard
                          key={t.id}
                          tramite={t}
                          catalogo={CATALOGO.find((c) => c.id === t.tipo)}
                        />
                      ))}
                    </div>
                  )}

                  {resueltos.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">
                        Historial ({resueltos.length})
                      </p>
                      {resueltos.map((t) => (
                        <TramiteCard
                          key={t.id}
                          tramite={t}
                          catalogo={CATALOGO.find((c) => c.id === t.tipo)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* LMR info banner */}
              <div className="p-5 bg-indigo-50 rounded-[1.5rem] border border-indigo-100 flex items-start gap-3">
                <Gavel className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[9px] text-indigo-700 leading-relaxed">
                  <strong>Silencio Afirmativo (Art. 19 LMR):</strong> Si el gobierno no responde en el plazo legal, tu trámite se aprueba automáticamente. La plataforma lo detecta y genera el acto administrativo en tu favor.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── NUEVO TRÁMITE ──────────────────────────────────────── */}
          {view === 'nuevo' && (
            <motion.div
              key="nuevo"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 pb-8"
            >
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  Selecciona el tipo de trámite
                </p>
                <div className="space-y-3">
                  {CATALOGO.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setTipoSel(tipoSel === cat.id ? null : cat.id)}
                      className={cn(
                        'w-full p-4 rounded-[1.5rem] border text-left transition-all flex items-center gap-4',
                        tipoSel === cat.id
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center shrink-0', tipoSel === cat.id ? 'bg-white/10' : cat.color)}>
                        <cat.icon className={cn('w-5 h-5', tipoSel === cat.id ? 'text-white' : '')} />
                      </div>
                      <div className="flex-1">
                        <p className={cn('text-sm font-black mb-0.5', tipoSel === cat.id ? 'text-white' : 'text-slate-900')}>
                          {cat.titulo}
                        </p>
                        <p className={cn('text-[8px] font-bold uppercase tracking-widest', tipoSel === cat.id ? 'text-white/50' : 'text-slate-400')}>
                          {cat.plazoHabiles} días hábiles · {cat.silencioAfirmativo ? 'Silencio Afirmativo' : 'Silencio Negativo'}
                        </p>
                      </div>
                      {tipoSel === cat.id && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {tipoSel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      Descripción / Detalles adicionales
                    </p>
                    <textarea
                      rows={3}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Domicilio exacto del negocio, número de predio, metros cuadrados, etc."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm resize-none focus:outline-none focus:border-slate-300 transition-colors"
                    />
                  </div>

                  {/* Preview legal card */}
                  <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 space-y-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Resumen Legal</p>
                    {(() => {
                      const cat = CATALOGO.find((c) => c.id === tipoSel)!;
                      return (
                        <>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Trámite</span>
                            <span className="font-black text-slate-900">{cat.titulo}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Plazo máximo</span>
                            <span className="font-black text-slate-900">{cat.plazoHabiles} días hábiles</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Tipo de silencio</span>
                            <span className={cn('font-black', cat.silencioAfirmativo ? 'text-emerald-600' : 'text-red-500')}>
                              {cat.silencioAfirmativo ? 'AFIRMATIVO ✓' : 'NEGATIVO ✗'}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Fundamento</span>
                            <span className="font-bold text-slate-600 text-right max-w-[60%]">{cat.fundamento}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 bg-slate-900 text-white rounded-full font-black text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-60"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Registrar Trámite y Generar Folio
                      </>
                    )}
                  </button>

                  <p className="text-[8px] text-center text-slate-400 leading-relaxed px-4">
                    Al enviar, se registra tu IP, fecha, hora y geolocalización como firma electrónica simple conforme al Art. 20 LMR y Código Civil Federal.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
