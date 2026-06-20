import React, { useState } from 'react';
import {
  QrCode, ChevronLeft, X, CheckCircle2, FileText, Download,
  Zap, Home as HomeIcon, Car, Droplets, AlertTriangle,
  Building2, Globe, CreditCard, Shield, TrendingUp,
  Users, Bot, Send, Loader2, ArrowRight, Sparkles
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { jsPDF } from 'jspdf';

type PaymentCategory = 'municipal' | 'estatal' | 'federal';
type FlowStep = 'scan' | 'catalog' | 'detail' | 'process' | 'receipt';

interface PaymentType {
  id: string;
  label: string;
  icon: React.ElementType;
  amount: number;
  discount: number;
  category: PaymentCategory;
  desc: string;
  institution: string;
  hint: string;
}

const PAYMENT_CATALOG: PaymentType[] = [
  { id: 'predial', label: 'Impuesto Predial', icon: HomeIcon, amount: 1200, discount: 30, category: 'municipal', desc: 'Impuesto anual sobre propiedad inmobiliaria', institution: 'Tesorería Municipal Tepic', hint: 'Número de cuenta catastral (6 dígitos)' },
  { id: 'agua', label: 'Agua (CEAPAS)', icon: Droplets, amount: 240, discount: 0, category: 'municipal', desc: 'Pago bimestral servicio hídrico', institution: 'CEAPAS Nayarit', hint: 'Número de contrato (8 dígitos)' },
  { id: 'multa', label: 'Multa de Tránsito', icon: AlertTriangle, amount: 750, discount: 50, category: 'municipal', desc: '50% descuento los primeros 10 días', institution: 'Tránsito Municipal Tepic', hint: 'Placa vehicular o folio de infracción' },
  { id: 'licencia_func', label: 'Licencia de Funcionamiento', icon: FileText, amount: 2500, discount: 0, category: 'municipal', desc: 'Licencia anual para negocios', institution: 'Desarrollo Económico Tepic', hint: 'RFC del negocio' },
  { id: 'permiso_anuncio', label: 'Permiso de Anuncio', icon: Zap, amount: 800, discount: 0, category: 'municipal', desc: 'Autorización publicidad exterior', institution: 'Desarrollo Urbano Tepic', hint: 'Número de expediente o dirección' },
  { id: 'derechos_agua', label: 'Derechos Nueva Toma', icon: Droplets, amount: 5000, discount: 0, category: 'municipal', desc: 'Conexión a red municipal de agua', institution: 'CEAPAS Nayarit', hint: 'Domicilio exacto del inmueble' },
  { id: 'tenencia', label: 'Tenencia / Refrendo', icon: Car, amount: 1800, discount: 0, category: 'estatal', desc: 'Refrendo vehicular anual', institution: 'Control Vehicular Nayarit', hint: 'Número de placas del vehículo' },
  { id: 'licencia_cond', label: 'Licencia de Conducir', icon: CreditCard, amount: 1200, discount: 0, category: 'estatal', desc: 'Vigencia 3 años, entrega inmediata', institution: 'Control Vehicular Nayarit', hint: 'CURP del titular' },
  { id: 'verificacion', label: 'Verificación Vehicular', icon: CheckCircle2, amount: 650, discount: 0, category: 'estatal', desc: 'Verificación semestral obligatoria', institution: 'SEDEMA Nayarit', hint: 'Número de placas del vehículo' },
  { id: 'nomina', label: 'Impuesto Sobre Nómina', icon: Building2, amount: 0, discount: 0, category: 'estatal', desc: 'Pago mensual empresarial', institution: 'Hacienda Estatal Nayarit', hint: 'RFC de la empresa' },
  { id: 'sat', label: 'Orientación SAT', icon: TrendingUp, amount: 0, discount: 0, category: 'federal', desc: 'Guía para declaración anual', institution: 'SAT — Módulo Tepic', hint: 'RFC del contribuyente' },
  { id: 'pasaporte', label: 'Derechos de Pasaporte', icon: Globe, amount: 1800, discount: 0, category: 'federal', desc: 'Pasaporte ordinario 10 años', institution: 'SRE — Delegación Nayarit', hint: 'CURP del titular' },
];

const CATEGORY_CONFIG = {
  municipal: { label: 'Municipal', color: 'bg-emerald-50 text-emerald-700', headerColor: 'from-emerald-700 to-emerald-900', chipColor: 'bg-emerald-500' },
  estatal: { label: 'Estatal', color: 'bg-blue-50 text-blue-700', headerColor: 'from-blue-700 to-blue-900', chipColor: 'bg-blue-500' },
  federal: { label: 'Federal', color: 'bg-purple-50 text-purple-700', headerColor: 'from-purple-700 to-purple-900', chipColor: 'bg-purple-500' },
};

interface QRMagicoProps {
  onClose: () => void;
  profile?: { name?: string; documentId?: string; neighborhood?: string };
}

export function QRMagicoView({ onClose, profile }: QRMagicoProps) {
  const [step, setStep] = useState<FlowStep>('scan');
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(null);
  const [accountRef, setAccountRef] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('card');
  const [receiptData, setReceiptData] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<PaymentCategory | 'all'>('all');
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: '¡Listo! Soy el asistente de pagos de Nayarit Digital. ¿Qué trámite necesitas hacer hoy? Puedes decirme "quiero pagar mi predial" o seleccionar directamente del catálogo.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const filteredCatalog = filterCategory === 'all'
    ? PAYMENT_CATALOG
    : PAYMENT_CATALOG.filter(p => p.category === filterCategory);

  const computedAmount = selectedPayment
    ? selectedPayment.amount * (1 - selectedPayment.discount / 100)
    : 0;

  const STEP_INDEX: Record<FlowStep, number> = { scan: 0, catalog: 1, detail: 2, process: 3, receipt: 4 };

  const handleBack = () => {
    if (step === 'catalog') { setStep('scan'); }
    else if (step === 'detail') { setStep('catalog'); setAccountRef(''); }
    else { onClose(); }
  };

  const handleAiSend = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = aiInput.trim();
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiInput('');
    setAiLoading(true);

    try {
      const paymentCtx = PAYMENT_CATALOG.map(p =>
        `- ${p.label}: ${p.desc}. Monto base: $${p.amount || 'variable'}. Institución: ${p.institution}.`
      ).join('\n');

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          context: `Eres el asistente de pagos del Sistema Nayarit Digital. El ciudadano busca orientación para un trámite gubernamental. Catálogo disponible:\n${paymentCtx}\n\nIdentifica el trámite que necesita y dile exactamente qué datos requiere. Sé breve y práctico (máx 2 frases).`
        })
      });
      const data = await res.json();
      setAiMessages(prev => [...prev, { role: 'ai', text: data.response || 'Selecciona el trámite del catálogo y te guío.' }]);
    } catch {
      setAiMessages(prev => [...prev, { role: 'ai', text: 'Identifiqué tu necesidad. Selecciona el trámite en el catálogo.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleProcess = async () => {
    if (!selectedPayment) return;
    setStep('process');
    await new Promise(r => setTimeout(r, 2500));

    const folio = `NAY-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setReceiptData({
      folio,
      payment: selectedPayment,
      amount: computedAmount,
      method: paymentMethod,
      accountRef,
      date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      citizen: profile?.name || 'Ciudadano Nayarit',
      documentId: profile?.documentId || 'N/A',
      neighborhood: profile?.neighborhood || 'Tepic',
    });
    setStep('receipt');
  };

  const handleDownloadPDF = () => {
    if (!receiptData) return;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    // Header
    doc.setFillColor(18, 18, 32);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('NAYARIT DIGITAL', 20, 18);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 200);
    doc.text('COMPROBANTE OFICIAL DE PAGO GUBERNAMENTAL', 20, 27);
    doc.text(`Folio: ${receiptData.folio}`, 20, 34);

    // Body
    doc.setTextColor(18, 18, 32);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(receiptData.payment.label, 20, 58);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 120);
    doc.text(receiptData.payment.institution, 20, 65);

    // Data table
    const rows = [
      ['Ciudadano', receiptData.citizen],
      ['Identificación', receiptData.documentId],
      ['Referencia / Cuenta', receiptData.accountRef || 'N/A'],
      ['Método de Pago', receiptData.method === 'card' ? 'Tarjeta Bancaria' : receiptData.method === 'transfer' ? 'Transferencia SPEI' : 'Efectivo en tienda'],
      ['Fecha', receiptData.date],
      ['Hora', receiptData.time],
    ];

    doc.setFontSize(9);
    rows.forEach(([label, value], i) => {
      const y = 80 + i * 12;
      doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 252 : 255);
      doc.rect(20, y - 5, 170, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 120);
      doc.text(label.toUpperCase(), 25, y + 2);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(18, 18, 32);
      doc.text(value, 90, y + 2);
    });

    // Amount
    doc.setFillColor(229, 0, 122);
    doc.rect(20, 160, 170, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL PAGADO', 30, 172);
    doc.setFontSize(16);
    doc.text(`$${receiptData.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`, 130, 172);

    // Footer
    doc.setTextColor(150, 150, 170);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Este comprobante tiene validez oficial. Verificable en nayarit.digital/comprobante', 20, 195);
    doc.text('Powered by Google Cloud Platform · Nayarit Digital 2026 · ConnectX', 20, 202);

    doc.save(`Comprobante-${receiptData.folio}.pdf`);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[200] bg-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
        {step !== 'process' && step !== 'receipt' ? (
          <button onClick={handleBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
        ) : <div className="w-9" />}
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--magenta)' }}>QR Mágico</p>
          <p className="text-[11px] font-bold text-slate-500">Sistema de Pagos Nayarit</p>
        </div>
        <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 px-5 py-2 bg-white shrink-0">
        {(['scan', 'catalog', 'detail', 'process', 'receipt'] as FlowStep[]).map((s) => (
          <div
            key={s}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ backgroundColor: STEP_INDEX[step] >= STEP_INDEX[s] ? 'var(--magenta)' : '#e2e8f0' }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── PASO 1: SCAN ── */}
          {step === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-full p-7 text-center space-y-7"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-black text-slate-900 leading-tight">
                  Un QR,<br />Mil Soluciones
                </h2>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Digitaliza tus pagos gubernamentales en 2 minutos. Sin filas. Sin papeles. Sin corrupción.
                </p>
              </div>

              {/* Scan animation */}
              <div className="relative w-52 h-52">
                <div className="absolute inset-0 border-2 border-slate-100 rounded-3xl bg-slate-50"></div>
                <motion.div
                  className="absolute left-4 right-4 h-0.5"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--magenta), transparent)' }}
                  animate={{ top: ['12%', '88%', '12%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {[['top-3 left-3', 'border-t-4 border-l-4 rounded-tl-xl'], ['top-3 right-3', 'border-t-4 border-r-4 rounded-tr-xl'], ['bottom-3 left-3', 'border-b-4 border-l-4 rounded-bl-xl'], ['bottom-3 right-3', 'border-b-4 border-r-4 rounded-br-xl']].map(([pos, cls], i) => (
                  <div key={i} className={`absolute ${pos} w-7 h-7 ${cls}`} style={{ borderColor: 'var(--magenta)' }} />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-200" />
                </div>
              </div>

              {/* Governance impact stats */}
              <div className="grid grid-cols-3 gap-3 w-full">
                {[
                  { val: '12', label: 'Trámites', Icon: FileText },
                  { val: '2min', label: 'Promedio', Icon: Zap },
                  { val: '100%', label: 'Trazable', Icon: Shield },
                ].map(({ val, label, Icon }, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <Icon className="w-4 h-4 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xl font-black text-slate-900">{val}</p>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={() => setStep('catalog')}
                  className="w-full py-5 rounded-full font-black text-white shadow-xl text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform"
                  style={{ backgroundColor: 'var(--magenta)' }}
                >
                  <Zap className="w-5 h-5" /> Iniciar Pago Digital
                </button>
                <button
                  onClick={() => { setStep('catalog'); setShowAiChat(true); }}
                  className="w-full py-4 rounded-full font-bold text-slate-600 text-sm flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Bot className="w-4 h-4" /> Hablar con Asistente IA
                </button>
              </div>

              {/* Political legitimacy footer */}
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                Cada pago es un acto de ciudadanía certificada.<br />
                <span className="font-black" style={{ color: 'var(--magenta)' }}>Transparencia · Eficiencia · Gobernanza 2026</span>
              </p>
            </motion.div>
          )}

          {/* ── PASO 2: CATÁLOGO ── */}
          {step === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="min-h-full flex flex-col"
            >
              {/* Sticky filter header */}
              <div className="px-5 py-4 space-y-3 bg-white border-b border-slate-100 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900">¿Qué vas a pagar?</h3>
                  <button
                    onClick={() => setShowAiChat(!showAiChat)}
                    className={cn(
                      "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full transition-colors",
                      showAiChat ? "text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                    style={showAiChat ? { backgroundColor: 'var(--magenta)' } : {}}
                  >
                    <Sparkles className="w-3 h-3" /> IA
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {(['all', 'municipal', 'estatal', 'federal'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                        filterCategory === cat ? "text-white border-transparent" : "bg-white text-slate-400 border-slate-200"
                      )}
                      style={filterCategory === cat ? { backgroundColor: 'var(--tinta)', borderColor: 'var(--tinta)' } : {}}
                    >
                      {cat === 'all' ? 'Todos (12)' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collapsible AI Chat */}
              <AnimatePresence>
                {showAiChat && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-b border-slate-100 bg-slate-50 shrink-0"
                  >
                    <div className="p-4 space-y-2 max-h-44 overflow-y-auto">
                      {aiMessages.map((msg, i) => (
                        <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                          <div
                            className={cn(
                              "max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed",
                              msg.role === 'ai' ? "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm" : "text-white rounded-tr-none"
                            )}
                            style={msg.role === 'user' ? { backgroundColor: 'var(--magenta)' } : {}}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {aiLoading && (
                        <div className="flex gap-1 p-3 bg-white rounded-2xl w-14 border border-slate-200 shadow-sm">
                          {[0, 0.2, 0.4].map((d, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-slate-200 flex gap-2 bg-white">
                      <input
                        value={aiInput}
                        onChange={e => setAiInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleAiSend()}
                        placeholder="Ej: quiero pagar mi predial..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-magenta-500/30"
                      />
                      <button
                        onClick={handleAiSend}
                        className="p-2 rounded-full text-white shadow-lg active:scale-95 transition-transform"
                        style={{ backgroundColor: 'var(--magenta)' }}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Payment catalog list */}
              <div className="p-5 space-y-3 flex-1">
                {filteredCatalog.map((payment) => {
                  const cfg = CATEGORY_CONFIG[payment.category];
                  const finalAmount = payment.amount * (1 - payment.discount / 100);
                  return (
                    <motion.button
                      key={payment.id}
                      onClick={() => { setSelectedPayment(payment); setStep('detail'); }}
                      className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.8rem] shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left"
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", cfg.color)}>
                          <payment.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-tight">{payment.label}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{cfg.label}</p>
                          {payment.discount > 0 && (
                            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block border border-emerald-100">
                              {payment.discount}% DESCUENTO ACTIVO
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-0.5 ml-2 shrink-0">
                        {payment.amount > 0 ? (
                          <>
                            {payment.discount > 0 && (
                              <span className="text-[10px] text-slate-400 line-through">${payment.amount.toLocaleString()}</span>
                            )}
                            <span className="text-sm font-black text-slate-900">${finalAmount.toLocaleString()}</span>
                          </>
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase">Variable</span>
                        )}
                        <ArrowRight className="w-4 h-4 text-slate-300 mt-1" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Governance narrative */}
              <div className="p-5 pt-0">
                <div className="bg-slate-900 rounded-[2rem] p-5 flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-0.5">Impacto de Gobernanza</p>
                    <p className="text-xs text-white font-medium leading-tight">Tu pago alimenta el presupuesto participativo 2026. Cada peso es trazable en tiempo real.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PASO 3: DETALLE ── */}
          {step === 'detail' && selectedPayment && (
            <motion.div
              key="detail"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="min-h-full flex flex-col p-5 space-y-5 pb-8"
            >
              {/* Category header card */}
              <div className={cn("rounded-[2.5rem] p-7 text-white relative overflow-hidden shadow-xl bg-gradient-to-br", CATEGORY_CONFIG[selectedPayment.category].headerColor)}>
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-white/10 shadow-xl">
                    <selectedPayment.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-black leading-tight mb-1">{selectedPayment.label}</h3>
                  <p className="text-xs text-white/70 font-medium">{selectedPayment.institution}</p>
                  <p className="text-[10px] text-white/50 mt-1">{selectedPayment.desc}</p>
                </div>
              </div>

              {/* Reference input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                  {selectedPayment.hint}
                </label>
                <input
                  value={accountRef}
                  onChange={e => setAccountRef(e.target.value)}
                  placeholder={selectedPayment.hint}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-magenta-500/40 transition-colors"
                />
              </div>

              {/* Amount breakdown */}
              {selectedPayment.amount > 0 && (
                <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 border border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Monto base</span>
                    <span className="font-bold text-slate-900">${selectedPayment.amount.toLocaleString()} MXN</span>
                  </div>
                  {selectedPayment.discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600 font-bold">
                      <span>Descuento programático ({selectedPayment.discount}%)</span>
                      <span>−${(selectedPayment.amount * selectedPayment.discount / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-black text-lg text-slate-900">Total a pagar</span>
                    <span className="font-black text-3xl text-slate-900">${computedAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Payment method selector */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Método de Pago</p>
                {[
                  { id: 'card', label: 'Tarjeta Bancaria', sub: 'Visa · Mastercard · SPEI', Icon: CreditCard },
                  { id: 'transfer', label: 'Transferencia SPEI', sub: 'CIE o referencia bancaria', Icon: Zap },
                  { id: 'cash', label: 'Efectivo en tienda', sub: 'OXXO · Telecomm · Casino', Icon: Building2 },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={cn(
                      "w-full p-4 border-2 rounded-2xl flex items-center justify-between transition-all",
                      paymentMethod === m.id ? "bg-white shadow-md" : "border-slate-100 bg-white"
                    )}
                    style={paymentMethod === m.id ? { borderColor: 'var(--magenta)' } : {}}
                  >
                    <div className="flex items-center gap-4">
                      <m.Icon className="w-5 h-5 text-slate-400" />
                      <div className="text-left">
                        <p className="text-sm font-black text-slate-900">{m.label}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{m.sub}</p>
                      </div>
                    </div>
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", paymentMethod === m.id ? "" : "border-slate-300")} style={paymentMethod === m.id ? { borderColor: 'var(--magenta)' } : {}}>
                      {paymentMethod === m.id && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--magenta)' }} />}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleProcess}
                className="w-full py-5 rounded-full font-black text-white shadow-xl text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform"
                style={{ backgroundColor: 'var(--tinta)' }}
              >
                <Shield className="w-5 h-5" /> Confirmar Pago Seguro
              </button>

              <p className="text-center text-[10px] text-slate-400">
                Protegido · Cifrado AES-256 · Google Cloud · Nayarit Digital
              </p>
            </motion.div>
          )}

          {/* ── PASO 4: PROCESANDO ── */}
          {step === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-full flex flex-col items-center justify-center p-8 text-center space-y-8"
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-4 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ borderColor: 'var(--magenta)', borderTopColor: 'transparent' }}
                />
                <div className="absolute inset-5 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-slate-200" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-black text-slate-900 mb-2">Procesando Pago</h3>
                <p className="text-sm text-slate-500">Verificando con {selectedPayment?.institution}...</p>
              </div>

              <div className="w-full space-y-3">
                {['Autenticando identidad ciudadana', 'Verificando cuenta en sistema municipal', 'Procesando transacción segura'].map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.6 }}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-700">{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PASO 5: COMPROBANTE ── */}
          {step === 'receipt' && receiptData && (
            <motion.div
              key="receipt"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="min-h-full flex flex-col p-5 space-y-5 pb-8"
            >
              {/* Success header */}
              <div className="text-center space-y-4 py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-serif font-black text-slate-900">¡Pago Exitoso!</h3>
                  <p className="text-sm text-slate-500 mt-1">{receiptData.payment.label}</p>
                </div>
              </div>

              {/* Receipt dark card */}
              <div className="bg-slate-900 rounded-[2.5rem] p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full -mr-8 -mt-8 blur-3xl" />
                <div className="relative z-10 space-y-4">
                  <div className="border-t-2 border-dashed border-white/10 pt-4 space-y-3">
                    {[
                      ['Folio', receiptData.folio, 'text-emerald-400 font-mono text-xs'],
                      ['Trámite', receiptData.payment.label, 'text-xs text-white/80'],
                      ['Total', `$${receiptData.amount.toLocaleString()} MXN`, 'text-2xl font-black'],
                      ['Fecha', `${receiptData.date} · ${receiptData.time}`, 'text-xs text-white/60 font-mono'],
                      ['Ciudadano', receiptData.citizen, 'text-xs text-white/80'],
                    ].map(([label, value, cls]) => (
                      <div key={label as string} className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</span>
                        <span className={cls as string}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verification QR */}
                  <div className="flex justify-center pt-2">
                    <div className="bg-white p-3 rounded-2xl shadow-2xl">
                      <QRCodeSVG
                        value={`https://nayarit.digital/comprobante?folio=${receiptData.folio}&monto=${receiptData.amount}`}
                        size={110}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  </div>
                  <p className="text-center text-[9px] text-white/30 font-mono">Escanea para verificar autenticidad</p>
                </div>
              </div>

              {/* Political science impact panel */}
              <div className="bg-emerald-50 rounded-[2rem] p-5 border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Tu impacto como ciudadano</p>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed mb-4">
                  Tu contribución fiscal es trazable en el portal de transparencia de Tepic. Cada peso recaudado se asigna al presupuesto participativo 2026.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { Icon: Users, val: '2,410+', label: 'Ciudadanos conectados' },
                    { Icon: Building2, val: '$4.2M', label: 'Recaudado este mes' },
                  ].map(({ Icon, val, label }, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                      <Icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <p className="text-sm font-black text-emerald-900">{val}</p>
                      <p className="text-[9px] text-emerald-500 font-bold uppercase leading-tight">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-5 bg-slate-900 text-white rounded-full font-black flex items-center justify-center gap-3 shadow-xl text-sm active:scale-95 transition-transform"
                >
                  <Download className="w-5 h-5" /> Descargar Comprobante PDF
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-full font-bold text-slate-600 text-sm bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
