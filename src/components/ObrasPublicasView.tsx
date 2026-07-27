import React, { useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Landmark,
  Coins,
  ClipboardList,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../lib/utils';
import obrasData from '../../obras-nayarit/datos/obras.json';

type Ambito = 'federal' | 'estatal' | 'municipal';
type Etapa = 'en_debate' | 'aprobada_por_iniciar' | 'en_ejecucion' | 'concluida';

interface Hito { fecha: string; hecho: string }
interface Obra {
  id: string;
  nombre: string;
  ambito: Ambito;
  etapa: Etapa;
  dependencia_ejecutora: string;
  quien_propuso: string;
  quien_autorizo: string;
  municipios: string[];
  descripcion: string;
  inversion_mdp: number | null;
  fuente_financiamiento: string | null;
  contratacion: { esquema: string; referencia: string | null };
  fecha_inicio: string | null;
  fecha_entrega_estimada: string | null;
  estatus: string;
  hitos: Hito[];
  fuentes: string[];
  pendientes_de_verificar: string[];
}

const DATA = obrasData as unknown as { actualizado: string; obras: Obra[] };

const AMBITO_LABEL: Record<Ambito, string> = { federal: 'Federal', estatal: 'Estatal', municipal: 'Municipal' };
const AMBITO_STYLE: Record<Ambito, string> = {
  federal: 'bg-blue-100 text-blue-700',
  estatal: 'bg-emerald-100 text-emerald-700',
  municipal: 'bg-amber-100 text-amber-700',
};
const ETAPA_LABEL: Record<Etapa, string> = {
  en_debate: 'En debate',
  aprobada_por_iniciar: 'Por iniciar',
  en_ejecucion: 'En ejecución',
  concluida: 'Concluida',
};
const ETAPA_STYLE: Record<Etapa, string> = {
  en_debate: 'bg-slate-200 text-slate-600',
  aprobada_por_iniciar: 'bg-amber-100 text-amber-700',
  en_ejecucion: 'bg-indigo-100 text-indigo-700',
  concluida: 'bg-emerald-100 text-emerald-700',
};

function fmtMdp(v: number | null) {
  return v == null ? 'No publicado' : `${v.toLocaleString('es-MX')} mdp`;
}

function Dato({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-xs text-slate-800 font-semibold leading-snug">{value}</p>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all',
        active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
      )}
    >
      {children}
    </button>
  );
}

function ObraCard({ obra }: { obra: Obra }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn('px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest', AMBITO_STYLE[obra.ambito])}>
            {AMBITO_LABEL[obra.ambito]}
          </span>
          <span className={cn('px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest', ETAPA_STYLE[obra.etapa])}>
            {ETAPA_LABEL[obra.etapa]}
          </span>
        </div>
      </div>

      <div>
        <p className="text-sm font-black text-slate-900 leading-tight mb-1">{obra.nombre}</p>
        <p className="text-xs text-slate-500 leading-snug">{obra.descripcion}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
        <Dato label="¿Quién la propuso?" value={obra.quien_propuso} />
        <Dato label="¿Quién la autorizó?" value={obra.quien_autorizo} />
        <Dato label="Ejecuta" value={obra.dependencia_ejecutora} />
        <Dato label="Inversión" value={fmtMdp(obra.inversion_mdp)} />
        <Dato label="Contratación" value={obra.contratacion?.esquema} />
        <Dato label="Entrega estimada" value={obra.fecha_entrega_estimada} />
        <Dato label="Municipios" value={obra.municipios.join(', ') || null} />
      </div>

      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Último estatus</p>
        <p className="text-xs text-slate-700 leading-snug">{obra.estatus}</p>
      </div>

      <details className="group">
        <summary className="text-[10px] font-black text-magenta-600 uppercase tracking-widest cursor-pointer flex items-center gap-1" style={{ color: 'var(--magenta)' }}>
          Cronología y fuentes ({obra.hitos.length} · {obra.fuentes.length})
          <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
        </summary>
        <div className="mt-3 space-y-3">
          <ul className="space-y-1.5">
            {obra.hitos.map((h, i) => (
              <li key={i} className="text-[11px] text-slate-600 leading-snug">
                <span className="font-black text-slate-900">{h.fecha}</span> — {h.hecho}
              </li>
            ))}
          </ul>
          <ul className="space-y-1">
            {obra.fuentes.map((u, i) => (
              <li key={i}>
                <a
                  href={u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 underline break-all flex items-start gap-1"
                >
                  <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" /> {u}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>

      {obra.pendientes_de_verificar.length > 0 && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-2xl p-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-700 leading-snug">
            <span className="font-black uppercase tracking-widest">Pendiente de verificar: </span>
            {obra.pendientes_de_verificar.join(' · ')}
          </p>
        </div>
      )}
    </div>
  );
}

export function ObrasPublicasView({ onBack }: { onBack: () => void }) {
  const [ambito, setAmbito] = useState<Ambito | null>(null);
  const [etapa, setEtapa] = useState<Etapa | null>(null);

  const obras = useMemo(
    () => DATA.obras.filter((o) => (!ambito || o.ambito === ambito) && (!etapa || o.etapa === etapa)),
    [ambito, etapa]
  );
  const inversionTotal = useMemo(
    () => obras.reduce((sum, o) => sum + (o.inversion_mdp ?? 0), 0),
    [obras]
  );

  return (
    <div className="pt-2 pb-20 space-y-6">
      <div className="flex items-center gap-4 py-4 mb-2">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight">Auditoría de Obra Pública</h2>
      </div>

      <div className="px-1">
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <Landmark className="w-24 h-24 absolute -right-4 -bottom-4 opacity-10" />
          <p className="text-[10px] font-black text-magenta-400 uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--magenta)' }}>
            Módulo 08 — Obras Nayarit
          </p>
          <p className="text-sm text-white/80 leading-snug relative z-10">
            Obra pública federal, estatal y municipal en Nayarit, con datos de fuentes oficiales
            y prensa verificable. Cada ficha indica quién la propuso, quién la autorizó, cuánto
            se invierte y cuándo se espera la entrega.
          </p>
          <p className="text-[9px] text-white/40 uppercase tracking-widest mt-3 relative z-10">
            Última actualización: {DATA.actualizado}
          </p>
        </div>
      </div>

      <div className="px-1 flex flex-wrap gap-2">
        {(Object.keys(AMBITO_LABEL) as Ambito[]).map((a) => (
          <Chip key={a} active={ambito === a} onClick={() => setAmbito(ambito === a ? null : a)}>
            {AMBITO_LABEL[a]}
          </Chip>
        ))}
      </div>
      <div className="px-1 flex flex-wrap gap-2">
        {(Object.keys(ETAPA_LABEL) as Etapa[]).map((e) => (
          <Chip key={e} active={etapa === e} onClick={() => setEtapa(etapa === e ? null : e)}>
            {ETAPA_LABEL[e]}
          </Chip>
        ))}
      </div>

      <div className="px-1 flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500">
          <ClipboardList className="w-4 h-4" />
          <span className="text-xs font-bold">{obras.length} obra(s)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Coins className="w-4 h-4" />
          <span className="text-xs font-bold">{inversionTotal.toLocaleString('es-MX')} mdp documentados</span>
        </div>
      </div>

      <div className="space-y-4">
        {obras.map((o) => (
          <ObraCard key={o.id} obra={o} />
        ))}
        {obras.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">No hay obras con estos filtros.</div>
        )}
      </div>
    </div>
  );
}
