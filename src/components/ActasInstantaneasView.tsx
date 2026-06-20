import React, { useState } from 'react';
import {
  FileText, Download, CheckCircle2, Loader2,
  ChevronLeft, Shield, User, MapPin, Baby, Heart, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';
import { auth } from '../firebase';
import { cn } from '../lib/utils';

type ActaType = 'NACIMIENTO' | 'DOMICILIO' | 'NO_ANTECEDENTES' | 'MATRIMONIO' | 'INGRESOS' | 'DEPENDENCIA';
type StepType = 'catalog' | 'form' | 'generating' | 'ready';

interface ActaConfig {
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  desc: string;
  costo: number;
  dias: string;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
}

const ACTAS: Record<ActaType, ActaConfig> = {
  NACIMIENTO: {
    label: 'Acta de Nacimiento',
    icon: Baby,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-100',
    desc: 'Copia certificada del Registro Civil',
    costo: 0,
    dias: 'Inmediato',
    fields: [
      { key: 'nombre', label: 'Nombre completo', placeholder: 'Como aparece en el acta' },
      { key: 'fecha_nac', label: 'Fecha de nacimiento', placeholder: 'DD/MM/AAAA', type: 'date' },
      { key: 'curp', label: 'CURP', placeholder: 'XXXX000000XXXXXXXX' },
    ],
  },
  DOMICILIO: {
    label: 'Constancia de Domicilio',
    icon: MapPin,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-100',
    desc: 'Acreditación de residencia municipal',
    costo: 85,
    dias: 'Inmediato',
    fields: [
      { key: 'nombre', label: 'Nombre completo', placeholder: 'Nombre del solicitante' },
      { key: 'domicilio', label: 'Domicilio actual', placeholder: 'Calle, número, colonia' },
      { key: 'codigo_postal', label: 'Código postal', placeholder: '63000' },
    ],
  },
  NO_ANTECEDENTES: {
    label: 'No Antecedentes Penales',
    icon: Shield,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 border-slate-200',
    desc: 'Certificado de conducta ciudadana',
    costo: 120,
    dias: 'Inmediato',
    fields: [
      { key: 'nombre', label: 'Nombre completo', placeholder: 'Nombre oficial' },
      { key: 'curp', label: 'CURP', placeholder: 'XXXX000000XXXXXXXX' },
      { key: 'motivo', label: 'Motivo / Uso', placeholder: 'Empleo, trámite, etc.' },
    ],
  },
  MATRIMONIO: {
    label: 'Acta de Matrimonio',
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-100',
    desc: 'Copia certificada de unión civil',
    costo: 0,
    dias: 'Inmediato',
    fields: [
      { key: 'nombre1', label: 'Cónyuge 1 — Nombre', placeholder: 'Nombre completo' },
      { key: 'nombre2', label: 'Cónyuge 2 — Nombre', placeholder: 'Nombre completo' },
      { key: 'fecha_mat', label: 'Fecha de matrimonio', placeholder: 'DD/MM/AAAA', type: 'date' },
    ],
  },
  INGRESOS: {
    label: 'Constancia de Ingresos',
    icon: Briefcase,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-100',
    desc: 'Declaración de ingresos municipales',
    costo: 95,
    dias: 'Inmediato',
    fields: [
      { key: 'nombre', label: 'Nombre completo', placeholder: 'Nombre del trabajador' },
      { key: 'puesto', label: 'Puesto / Cargo', placeholder: 'Descripción del cargo' },
      { key: 'salario', label: 'Salario mensual (MXN)', placeholder: '0.00', type: 'number' },
    ],
  },
  DEPENDENCIA: {
    label: 'Carta de Dependencia Económica',
    icon: User,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 border-violet-100',
    desc: 'Acreditación de dependencia familiar',
    costo: 0,
    dias: 'Inmediato',
    fields: [
      { key: 'titular', label: 'Titular / Responsable', placeholder: 'Nombre completo' },
      { key: 'dependiente', label: 'Nombre del dependiente', placeholder: 'Nombre completo' },
      { key: 'parentesco', label: 'Parentesco', placeholder: 'Hijo, cónyuge, padre...' },
    ],
  },
};

interface Props {
  onClose: () => void;
  profile?: { name?: string; neighborhood?: string; address?: string; documentId?: string };
}

export function ActasInstantaneasView({ onClose, profile }: Props) {
  const [step, setStep] = useState<StepType>('catalog');
  const [selectedActa, setSelectedActa] = useState<ActaType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [folioActa, setFolioActa] = useState('');
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);

  const cfg = selectedActa ? ACTAS[selectedActa] : null;

  const handleSelect = (type: ActaType) => {
    setSelectedActa(type);
    setFormData({});
    setStep('form');
  };

  const handleGenerate = async () => {
    if (!cfg || !selectedActa) return;
    setStep('generating');

    const folio = `ACT-${selectedActa.slice(0, 3)}-${Date.now().toString().slice(-8)}`;
    setFolioActa(folio);

    await new Promise(r => setTimeout(r, 1800));

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
    const W = 215.9;
    const fecha = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

    // Header band
    doc.setFillColor(18, 24, 56);
    doc.rect(0, 0, W, 38, 'F');

    // Escudo placeholder
    doc.setFillColor(229, 0, 122);
    doc.circle(20, 19, 10, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('H.A.', 20, 21, { align: 'center' });

    // Header text
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('H. AYUNTAMIENTO DE TEPIC', W / 2, 13, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Dirección de Registro Civil y Servicios Municipales', W / 2, 21, { align: 'center' });
    doc.setFontSize(8);
    doc.text('Nayarit Digital · Portal Ciudadano', W / 2, 28, { align: 'center' });

    // Title
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(cfg.label.toUpperCase(), W / 2, 52, { align: 'center' });
    doc.setDrawColor(229, 0, 122);
    doc.setLineWidth(0.8);
    doc.line(30, 55, W - 30, 55);

    // Folio & fecha
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 120);
    doc.text(`Folio: ${folio}`, 15, 62);
    doc.text(`Fecha de expedición: ${fecha}`, W - 15, 62, { align: 'right' });

    // Data section
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL DOCUMENTO', 15, 76);

    let y = 84;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    cfg.fields.forEach((field) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 120);
      doc.text(`${field.label.toUpperCase()}:`, 15, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(18, 24, 56);
      doc.setFontSize(11);
      doc.text(formData[field.key] || '—', 15, y + 6);
      doc.setFontSize(10);
      y += 18;
    });

    // Solicitante
    y += 4;
    doc.setDrawColor(220, 220, 230);
    doc.setLineWidth(0.3);
    doc.line(15, y, W - 15, y);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 120);
    doc.setFontSize(9);
    doc.text('SOLICITANTE (CIUDADANO NAYARIT DIGITAL):', 15, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(10);
    doc.text(profile?.name || auth.currentUser?.displayName || 'Ciudadano', 15, y);
    doc.text(`CURP/ID: ${profile?.documentId || 'No registrado'}`, 15, y + 6);

    // Validity box
    y += 22;
    doc.setFillColor(245, 247, 255);
    doc.setDrawColor(18, 24, 56);
    doc.setLineWidth(0.4);
    doc.roundedRect(15, y, W - 30, 20, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(9);
    doc.text('VIGENCIA: Este documento tiene validez de 90 días naturales a partir de su expedición.', W / 2, y + 8, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('Expedido en el marco del Programa de Gobernanza Digital Nayarit 2026.', W / 2, y + 14, { align: 'center' });

    // Signature area
    y += 32;
    doc.setDrawColor(18, 24, 56);
    doc.setLineWidth(0.3);
    doc.line(30, y + 20, 100, y + 20);
    doc.line(W - 100, y + 20, W - 30, y + 20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(18, 24, 56);
    doc.setFontSize(8);
    doc.text('Oficial del Registro Civil', 65, y + 24, { align: 'center' });
    doc.text('Sello Digital', W - 65, y + 24, { align: 'center' });

    // Footer band
    doc.setFillColor(18, 24, 56);
    doc.rect(0, 264, W, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`Folio: ${folio} · Verifica en: nayarit.digital/actas · ${fecha}`, W / 2, 270, { align: 'center' });

    const dataUri = doc.output('datauristring');
    setPdfBlob(dataUri);
    setStep('ready');
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
          onClick={step === 'catalog' ? onClose : () => { setStep('catalog'); setSelectedActa(null); }}
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-violet-600">Registro Civil Digital</p>
          <p className="text-base font-serif font-black text-slate-900 leading-tight">Actas Instantáneas</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* CATALOG */}
          {step === 'catalog' && (
            <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-4">
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Sin filas · Sin cita</p>
                <p className="text-xl font-serif font-black leading-tight">Documentos oficiales<br />en tu celular</p>
                <p className="text-[10px] text-slate-400 mt-2">Generación instantánea con validez legal de 90 días.</p>
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Selecciona el documento</p>

              <div className="space-y-3">
                {(Object.entries(ACTAS) as [ActaType, ActaConfig][]).map(([type, config]) => (
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
                    <div className="text-right shrink-0">
                      <p className={cn('text-xs font-black', config.costo === 0 ? 'text-emerald-600' : 'text-slate-700')}>
                        {config.costo === 0 ? 'GRATIS' : `$${config.costo}`}
                      </p>
                      <p className="text-[8px] text-slate-400 font-bold uppercase">{config.dias}</p>
                    </div>
                  </button>
                ))}
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
                  <p className="text-[9px] font-bold text-slate-500 uppercase">{cfg.costo === 0 ? 'Sin costo' : `Costo: $${cfg.costo} MXN`} · {cfg.dias}</p>
                </div>
              </div>

              <div className="space-y-4">
                {cfg.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-400 transition-colors font-medium"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-[9px] font-black text-blue-700 uppercase tracking-widest mb-1">Datos del ciudadano</p>
                <p className="text-sm font-bold text-slate-800">{profile?.name || auth.currentUser?.displayName || 'Ciudadano'}</p>
                <p className="text-[10px] text-slate-500">{profile?.address || 'Tepic, Nayarit'}</p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={cfg.fields.some(f => !formData[f.key]?.trim())}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
              >
                Generar Documento Oficial
              </button>
            </motion.div>
          )}

          {/* GENERATING */}
          {step === 'generating' && (
            <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full p-8 space-y-6 min-h-[400px]">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-serif font-black text-xl text-slate-900 mb-2">Generando documento</p>
                <p className="text-sm text-slate-500">Aplicando sello oficial digital...</p>
              </div>
            </motion.div>
          )}

          {/* READY */}
          {step === 'ready' && cfg && (
            <motion.div key="ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 space-y-5">
              <div className="flex flex-col items-center py-6 space-y-3">
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p className="font-serif font-black text-2xl text-slate-900">¡Documento Listo!</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Folio: {folioActa}</p>
              </div>

              {/* QR de verificación */}
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex flex-col items-center gap-4">
                <QRCodeSVG
                  value={`https://nayarit.digital/actas?folio=${folioActa}`}
                  size={120}
                  level="M"
                />
                <div className="text-center">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Verifica autenticidad</p>
                  <p className="text-xs text-slate-700 font-bold">nayarit.digital/actas</p>
                </div>
              </div>

              {/* Detalles */}
              <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
                {[
                  { label: 'Documento', value: cfg.label },
                  { label: 'Folio oficial', value: folioActa },
                  { label: 'Fecha expedición', value: new Date().toLocaleDateString('es-MX') },
                  { label: 'Vigencia', value: '90 días naturales' },
                  { label: 'Costo', value: cfg.costo === 0 ? 'Sin costo' : `$${cfg.costo} MXN` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-5 py-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                    <span className="text-xs font-black text-slate-900">{value}</span>
                  </div>
                ))}
              </div>

              {/* Download */}
              {pdfBlob && (
                <a
                  href={pdfBlob}
                  download={`${folioActa}.pdf`}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                >
                  <Download className="w-5 h-5" />
                  Descargar PDF Oficial
                </a>
              )}

              <button
                onClick={() => { setStep('catalog'); setSelectedActa(null); setFormData({}); setPdfBlob(null); }}
                className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all"
              >
                Generar otro documento
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
