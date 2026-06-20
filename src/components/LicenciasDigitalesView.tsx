import React, { useState } from 'react';
import {
  Store, HardHat, Map, Wine, Megaphone, Truck,
  ChevronLeft, ChevronRight, CheckCircle2, Loader2,
  Download, Clock, AlertCircle, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { cn } from '../lib/utils';

type LicenciaType = 'FUNCIONAMIENTO' | 'CONSTRUCCION' | 'USO_SUELO' | 'ALCOHOL' | 'ANUNCIO' | 'TRANSPORTE';
type StepType = 'catalog' | 'form' | 'review' | 'processing' | 'issued';

interface LicenciaConfig {
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  desc: string;
  costo: number;
  vigencia: string;
  requisitos: string[];
  fields: { key: string; label: string; placeholder: string; type?: string; options?: string[] }[];
}

const LICENCIAS: Record<LicenciaType, LicenciaConfig> = {
  FUNCIONAMIENTO: {
    label: 'Licencia de Funcionamiento',
    icon: Store,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-100',
    desc: 'Autorización para operar un negocio',
    costo: 850,
    vigencia: '1 año',
    requisitos: ['INE del propietario', 'RFC del negocio', 'Comprobante de domicilio', 'Plano del local'],
    fields: [
      { key: 'nombre_negocio', label: 'Nombre del negocio', placeholder: 'Razón social o nombre comercial' },
      { key: 'giro', label: 'Giro o actividad', placeholder: 'Ej: Abarrotes, Restaurante, Taller...' },
      { key: 'direccion', label: 'Dirección del negocio', placeholder: 'Calle, número, colonia' },
      { key: 'metros', label: 'Superficie (m²)', placeholder: '0', type: 'number' },
      { key: 'propietario', label: 'Nombre del propietario', placeholder: 'Nombre completo' },
      { key: 'rfc', label: 'RFC', placeholder: 'XXXX000000XXX' },
    ],
  },
  CONSTRUCCION: {
    label: 'Permiso de Construcción',
    icon: HardHat,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-100',
    desc: 'Autorización de obra nueva o remodelación',
    costo: 1200,
    vigencia: '180 días',
    requisitos: ['INE del propietario', 'Escrituras del predio', 'Planos arquitectónicos', 'Proyecto ejecutivo'],
    fields: [
      { key: 'tipo_obra', label: 'Tipo de obra', placeholder: '', options: ['Obra nueva', 'Ampliación', 'Remodelación', 'Demolición'] },
      { key: 'direccion', label: 'Dirección del predio', placeholder: 'Calle, número, colonia' },
      { key: 'metros', label: 'Superficie a construir (m²)', placeholder: '0', type: 'number' },
      { key: 'propietario', label: 'Propietario del predio', placeholder: 'Nombre completo' },
      { key: 'director', label: 'Director responsable de obra', placeholder: 'Nombre del DRO' },
    ],
  },
  USO_SUELO: {
    label: 'Uso de Suelo',
    icon: Map,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-100',
    desc: 'Certificado de uso permitido del predio',
    costo: 450,
    vigencia: '1 año',
    requisitos: ['INE del solicitante', 'Escrituras del predio', 'Clave catastral'],
    fields: [
      { key: 'direccion', label: 'Dirección del predio', placeholder: 'Calle, número, colonia' },
      { key: 'clave_catastral', label: 'Clave catastral', placeholder: 'XX-XX-XX-XXXX' },
      { key: 'uso_solicitado', label: 'Uso solicitado', placeholder: 'Comercial, habitacional, mixto...' },
      { key: 'propietario', label: 'Propietario', placeholder: 'Nombre completo' },
    ],
  },
  ALCOHOL: {
    label: 'Licencia de Alcohol',
    icon: Wine,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-100',
    desc: 'Permiso de venta o consumo de bebidas alcohólicas',
    costo: 2400,
    vigencia: '1 año',
    requisitos: ['Licencia de funcionamiento vigente', 'INE del propietario', 'No antecedentes penales', 'Plano del local'],
    fields: [
      { key: 'nombre_negocio', label: 'Nombre del establecimiento', placeholder: 'Nombre comercial' },
      { key: 'tipo', label: 'Tipo de licencia', placeholder: '', options: ['Venta para llevar', 'Consumo en el lugar', 'Bar/Cantina', 'Restaurante-Bar'] },
      { key: 'direccion', label: 'Dirección', placeholder: 'Calle, número, colonia' },
      { key: 'propietario', label: 'Propietario', placeholder: 'Nombre completo' },
      { key: 'licencia_func', label: 'Folio licencia de funcionamiento', placeholder: 'LIC-FUNC-XXXXXXXX' },
    ],
  },
  ANUNCIO: {
    label: 'Permiso de Anuncio',
    icon: Megaphone,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 border-violet-100',
    desc: 'Autorización de publicidad exterior',
    costo: 320,
    vigencia: '1 año',
    requisitos: ['INE del solicitante', 'Diseño del anuncio', 'Licencia de funcionamiento'],
    fields: [
      { key: 'tipo_anuncio', label: 'Tipo de anuncio', placeholder: '', options: ['Espectacular', 'Banner / Lona', 'Letrero luminoso', 'Toldo'] },
      { key: 'medidas', label: 'Medidas (m²)', placeholder: 'Ej: 3x2' },
      { key: 'direccion', label: 'Ubicación del anuncio', placeholder: 'Calle, número, colonia' },
      { key: 'propietario', label: 'Solicitante', placeholder: 'Nombre completo' },
    ],
  },
  TRANSPORTE: {
    label: 'Permiso de Transporte',
    icon: Truck,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 border-slate-200',
    desc: 'Autorización de transporte de carga o pasajeros',
    costo: 1800,
    vigencia: '1 año',
    requisitos: ['Licencia de conducir vigente', 'Tarjeta de circulación', 'Póliza de seguro', 'INE del operador'],
    fields: [
      { key: 'tipo_servicio', label: 'Tipo de servicio', placeholder: '', options: ['Transporte de carga', 'Transporte de personal', 'Taxi', 'Mototaxi'] },
      { key: 'placas', label: 'Placas del vehículo', placeholder: 'ABC-123-D' },
      { key: 'modelo', label: 'Marca / Modelo / Año', placeholder: 'Ej: Nissan Estacas 2020' },
      { key: 'operador', label: 'Nombre del operador', placeholder: 'Nombre completo' },
    ],
  },
};

const STATUS_CONFIG = {
  FUNCIONAMIENTO: { days: 0, auto: true },
  CONSTRUCCION: { days: 3, auto: false },
  USO_SUELO: { days: 0, auto: true },
  ALCOHOL: { days: 5, auto: false },
  ANUNCIO: { days: 0, auto: true },
  TRANSPORTE: { days: 2, auto: false },
};

interface Props {
  onClose: () => void;
  profile?: { name?: string; neighborhood?: string; address?: string; documentId?: string };
}

export function LicenciasDigitalesView({ onClose, profile }: Props) {
  const [step, setStep] = useState<StepType>('catalog');
  const [selected, setSelected] = useState<LicenciaType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [folio, setFolio] = useState('');
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  const cfg = selected ? LICENCIAS[selected] : null;
  const statusCfg = selected ? STATUS_CONFIG[selected] : null;

  const handleSelect = (type: LicenciaType) => {
    setSelected(type);
    setFormData({});
    setStep('form');
  };

  const allFilled = cfg ? cfg.fields.every(f => formData[f.key]?.trim()) : false;

  const handleProcess = async () => {
    if (!cfg || !selected) return;
    setStep('processing');

    const generatedFolio = `LIC-${selected.slice(0, 4)}-${Date.now().toString().slice(-8)}`;
    setFolio(generatedFolio);

    try {
      await addDoc(collection(db, 'licencias'), {
        type: selected,
        folio: generatedFolio,
        formData,
        status: statusCfg?.auto ? 'AUTORIZADA' : 'EN_REVISION',
        costo: cfg.costo,
        vigencia: cfg.vigencia,
        solicitante: profile?.name || auth.currentUser?.displayName || 'Ciudadano',
        uid: auth.currentUser?.uid || 'anonymous',
        createdAt: serverTimestamp(),
      });
    } catch {
      // demo fallback
    }

    await new Promise(r => setTimeout(r, 2000));

    if (statusCfg?.auto) {
      generatePDF(generatedFolio);
    }

    setStep('issued');
  };

  const generatePDF = (folioId: string) => {
    if (!cfg || !selected) return;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
    const W = 215.9;
    const fecha = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
    const vencimiento = new Date();
    if (cfg.vigencia === '1 año') vencimiento.setFullYear(vencimiento.getFullYear() + 1);
    else if (cfg.vigencia === '180 días') vencimiento.setDate(vencimiento.getDate() + 180);
    else vencimiento.setDate(vencimiento.getDate() + 90);

    // Header
    doc.setFillColor(18, 24, 56);
    doc.rect(0, 0, W, 38, 'F');
    doc.setFillColor(229, 0, 122);
    doc.circle(20, 19, 10, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('H.A.', 20, 21, { align: 'center' });
    doc.setFontSize(13);
    doc.text('H. AYUNTAMIENTO DE TEPIC', W / 2, 13, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Dirección de Desarrollo Económico y Regulación Municipal', W / 2, 21, { align: 'center' });
    doc.setFontSize(8);
    doc.text('Nayarit Digital · Licencias y Permisos en Línea', W / 2, 28, { align: 'center' });

    // Status badge
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(W / 2 - 30, 40, 60, 10, 3, 3, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('✓ AUTORIZADA', W / 2, 46.5, { align: 'center' });

    // Title
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text(cfg.label.toUpperCase(), W / 2, 60, { align: 'center' });
    doc.setDrawColor(229, 0, 122);
    doc.setLineWidth(0.8);
    doc.line(30, 63, W - 30, 63);

    // Folio & fecha
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 120);
    doc.text(`Folio: ${folioId}`, 15, 70);
    doc.text(`Expedición: ${fecha}`, W - 15, 70, { align: 'right' });

    // Data
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DE LA LICENCIA', 15, 82);

    let y = 90;
    cfg.fields.forEach((field) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 120);
      doc.text(`${field.label.toUpperCase()}:`, 15, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(18, 24, 56);
      doc.text(formData[field.key] || '—', 15, y + 6);
      y += 16;
    });

    // Validity box
    y += 4;
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, y, W - 30, 22, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(6, 95, 70);
    doc.text('VIGENCIA:', 25, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.text(`${cfg.vigencia} — Vence el ${vencimiento.toLocaleDateString('es-MX')}`, 60, y + 8);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Costo pagado: $${cfg.costo.toLocaleString('es-MX')} MXN`, 25, y + 16);
    doc.text(`Solicitante: ${profile?.name || auth.currentUser?.displayName || 'Ciudadano'}`, 110, y + 16);

    // Footer
    doc.setFillColor(18, 24, 56);
    doc.rect(0, 264, W, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`Folio: ${folioId} · Verifica en: nayarit.digital/licencias · ${fecha}`, W / 2, 270, { align: 'center' });

    setPdfBlob(doc.output('datauristring'));
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[200] bg-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-4 border-b border-slate-100 bg-white shrink-0">
        <button
          onClick={step === 'catalog' ? onClose : () => { setStep('catalog'); setSelected(null); }}
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">Regulación Municipal</p>
          <p className="text-base font-serif font-black text-slate-900 leading-tight">Licencias Digitales</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* CATALOG */}
          {step === 'catalog' && (
            <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-4">
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">100% en línea</p>
                <p className="text-xl font-serif font-black leading-tight">Licencias y permisos<br />sin ir a ventanilla</p>
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black">3</p>
                    <p className="text-[8px] text-slate-400 uppercase font-bold">Inmediatas</p>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black">3</p>
                    <p className="text-[8px] text-slate-400 uppercase font-bold">En revisión</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Selecciona el permiso</p>

              <div className="space-y-3">
                {(Object.entries(LICENCIAS) as [LicenciaType, LicenciaConfig][]).map(([type, config]) => {
                  const sc = STATUS_CONFIG[type];
                  return (
                    <button
                      key={type}
                      onClick={() => handleSelect(type)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-[1.5rem] border transition-all active:scale-[0.98]', config.bgColor)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn('w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm', config.color)}>
                          <config.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black text-slate-900">{config.label}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{config.desc}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-xs font-black text-slate-700">${config.costo.toLocaleString()}</p>
                        <p className={cn('text-[8px] font-black uppercase', sc.auto ? 'text-emerald-600' : 'text-amber-600')}>
                          {sc.auto ? 'Inmediato' : `${sc.days} días`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* FORM */}
          {step === 'form' && cfg && (
            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
              <div className={cn('flex items-center gap-3 p-4 rounded-[1.5rem] border', cfg.bgColor)}>
                <div className={cn('w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm', cfg.color)}>
                  <cfg.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{cfg.label}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Vigencia: {cfg.vigencia} · ${cfg.costo.toLocaleString()} MXN</p>
                </div>
              </div>

              {/* Requisitos */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-2">Documentos requeridos</p>
                <ul className="space-y-1">
                  {cfg.requisitos.map(r => (
                    <li key={r} className="flex items-center gap-2 text-xs text-amber-800 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                {cfg.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">{field.label}</label>
                    {field.options ? (
                      <select
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors font-medium"
                      >
                        <option value="">Selecciona...</option>
                        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors font-medium"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('review')}
                disabled={!allFilled}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
              >
                Revisar solicitud
              </button>
            </motion.div>
          )}

          {/* REVIEW */}
          {step === 'review' && cfg && selected && (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
              <div className="bg-slate-50 rounded-[2rem] border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                <div className="px-5 py-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Tipo de permiso</p>
                  <p className="text-sm font-black text-slate-900">{cfg.label}</p>
                </div>
                {cfg.fields.map(field => (
                  <div key={field.key} className="px-5 py-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{field.label}</p>
                    <p className="text-sm font-bold text-slate-800">{formData[field.key] || '—'}</p>
                  </div>
                ))}
                <div className="px-5 py-4 bg-white">
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total a pagar</p>
                    <p className="text-xl font-black text-slate-900">${cfg.costo.toLocaleString()} MXN</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tiempo estimado</p>
                    <p className={cn('text-xs font-black', STATUS_CONFIG[selected].auto ? 'text-emerald-600' : 'text-amber-600')}>
                      {STATUS_CONFIG[selected].auto ? 'Inmediato' : `${STATUS_CONFIG[selected].days} días hábiles`}
                    </p>
                  </div>
                </div>
              </div>

              {!STATUS_CONFIG[selected].auto && (
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-medium">Este permiso requiere revisión presencial. Recibirás una notificación cuando sea aprobado.</p>
                </div>
              )}

              <button
                onClick={handleProcess}
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all text-white"
                style={{ background: 'linear-gradient(135deg, #121838 0%, #E5007A 100%)' }}
              >
                Confirmar y pagar ${cfg.costo.toLocaleString()} MXN
              </button>
            </motion.div>
          )}

          {/* PROCESSING */}
          {step === 'processing' && (
            <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-6">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-serif font-black text-xl text-slate-900 mb-2">Procesando solicitud</p>
                <p className="text-sm text-slate-500">Validando datos y registrando en sistema municipal...</p>
              </div>
            </motion.div>
          )}

          {/* ISSUED */}
          {step === 'issued' && cfg && selected && (
            <motion.div key="issued" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 space-y-5">
              <div className="flex flex-col items-center py-6 space-y-3">
                <div className={cn(
                  'w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl',
                  STATUS_CONFIG[selected].auto ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-amber-500 shadow-amber-500/30'
                )}>
                  {STATUS_CONFIG[selected].auto
                    ? <CheckCircle2 className="w-10 h-10 text-white" />
                    : <Clock className="w-10 h-10 text-white" />
                  }
                </div>
                <p className="font-serif font-black text-2xl text-slate-900">
                  {STATUS_CONFIG[selected].auto ? '¡Licencia Autorizada!' : 'Solicitud Enviada'}
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Folio: {folio}</p>
                {!STATUS_CONFIG[selected].auto && (
                  <p className="text-xs text-amber-600 font-bold text-center">
                    Revisión en {STATUS_CONFIG[selected].days} días hábiles. Te notificaremos por la app.
                  </p>
                )}
              </div>

              {STATUS_CONFIG[selected].auto && (
                <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex flex-col items-center gap-4">
                  <QRCodeSVG
                    value={`https://nayarit.digital/licencias?folio=${folio}`}
                    size={110}
                    level="M"
                  />
                  <div className="text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Verifica autenticidad</p>
                    <p className="text-xs text-slate-700 font-bold">nayarit.digital/licencias</p>
                  </div>
                </div>
              )}

              <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
                {[
                  { label: 'Permiso', value: cfg.label },
                  { label: 'Folio', value: folio },
                  { label: 'Estado', value: STATUS_CONFIG[selected].auto ? 'AUTORIZADA' : 'EN REVISIÓN' },
                  { label: 'Vigencia', value: cfg.vigencia },
                  { label: 'Costo pagado', value: `$${cfg.costo.toLocaleString()} MXN` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-5 py-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                    <span className={cn('text-xs font-black', label === 'Estado' && STATUS_CONFIG[selected].auto ? 'text-emerald-600' : label === 'Estado' ? 'text-amber-600' : 'text-slate-900')}>{value}</span>
                  </div>
                ))}
              </div>

              {pdfBlob && STATUS_CONFIG[selected].auto && (
                <a
                  href={pdfBlob}
                  download={`${folio}.pdf`}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                >
                  <Download className="w-5 h-5" />
                  Descargar Licencia PDF
                </a>
              )}

              <button
                onClick={() => { setStep('catalog'); setSelected(null); setFormData({}); setPdfBlob(null); }}
                className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all"
              >
                Solicitar otro permiso
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
