import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Nivel = 'municipal' | 'estatal';

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}B` : `$${n}M`;

const OCEANOS = [
  {
    id: 'catastro',
    icon: '🗺️',
    nombre: 'Catastro + Predial',
    problema: 'El 40–60% de propiedades no está en el catastro. El municipio no puede cobrar lo que no ve.',
    mecanismo: 'Satélite + IA detecta toda propiedad construida y la compara contra el padrón. Genera avalúos automáticos y notificaciones.',
    municipal: {
      perdida: '$280M–$400M MXN/año sin cobrar',
      recuperable: 340,
      como: 'Tepic tiene ~130K propiedades. Si el 45% no está registrada y el predial promedio es $3,500: 58,500 × $3,500 = $204M mínimo',
      nayarit20: 420,
    },
    estatal: {
      perdida: 'El estado pierde participaciones federales proporcionales a lo que no recauda localmente',
      recuperable: 180,
      como: 'Cada peso de recaudación municipal aumenta la bolsa de participaciones federales. Efecto multiplicador de 1.4x sobre lo recaudado.',
      nayarit20: 252,
    },
    color: '#E5007A',
    badge: 'Mayor ROI',
  },
  {
    id: 'compras',
    icon: '📦',
    nombre: 'Compras y Proveedores',
    problema: 'Sin marketplace transparente, el 15–25% del valor de cada compra se pierde en sobreprecio o corrupción.',
    mecanismo: 'Licitaciones digitales abiertas, comparación automática de cotizaciones, alerta si un proveedor concentra >30% de contratos.',
    municipal: {
      perdida: '$75M–$120M MXN/año en sobrecosto',
      recuperable: 95,
      como: 'Tepic gasta ~$500M/año en compras y servicios. Recuperar el 19% = $95M. Los 20 municipios gastan ~$2,838M × 30% = $851M en compras.',
      nayarit20: 170,
    },
    estatal: {
      perdida: '$480M–$960M MXN/año en compras opacas',
      recuperable: 720,
      como: 'Nayarit gasta $32,200M. El 15% va a compras = $4,830M. Recuperar el 15% de sobrecosto = $724M/año.',
      nayarit20: 724,
    },
    color: '#00BCD4',
    badge: 'Más rápido de implementar',
  },
  {
    id: 'nomina',
    icon: '👥',
    nombre: 'Nómina + Aviadores',
    problema: 'Empleados fantasma ("aviadores") consumen entre el 5–15% de la nómina en todos los municipios de México.',
    mecanismo: 'Control biométrico de asistencia integrado. El sistema compara asistencia real vs. nómina registrada en tiempo real.',
    municipal: {
      perdida: '$64M–$120M MXN/año en salarios sin contraprestación',
      recuperable: 90,
      como: 'Nómina estimada de Tepic: $800M/año. Si el 8% son aviadores = $64M. Los 20 municipios: $1,134M × 8% = $90M.',
      nayarit20: 90,
    },
    estatal: {
      perdida: '$644M MXN/año en aviadores estatales',
      recuperable: 644,
      como: 'El 40% del presupuesto estatal es nómina = $12,880M. Con solo 5% de aviadores = $644M/año inmediatamente recuperable.',
      nayarit20: 644,
    },
    color: '#FFB300',
    badge: 'Impacto inmediato',
  },
  {
    id: 'licencias',
    icon: '📋',
    nombre: 'Licencias y Permisos',
    problema: 'Trámites opacos = "mordida" obligatoria. El tiempo de espera y la corrupción ahuyentan inversión privada.',
    mecanismo: 'Tramitador 100% digital con timestamps inmutables. El ciudadano ve su expediente en tiempo real. Sin intermediarios.',
    municipal: {
      perdida: 'No monetario directo — pero los municipios con permisos digitales atraen 2–3x más inversión formal',
      recuperable: 45,
      como: 'Formalizando el 20% de negocios informales de Tepic se estima +$45M en ISR/IVA a largo plazo y +$180M en derecho de piso.',
      nayarit20: 80,
    },
    estatal: {
      perdida: 'Nayarit pierde $500M–$1,000M en inversión privada por burocracia opaca',
      recuperable: 200,
      como: 'Con permisos digitales estandarizados en los 20 municipios, el ISAI y derechos de licencia estatal aumentan conservadoramente $200M/año.',
      nayarit20: 200,
    },
    color: '#00873E',
    badge: 'Anti-corrupción visible',
  },
  {
    id: 'agua',
    icon: '💧',
    nombre: 'Agua y Servicios (OOAPAS)',
    problema: 'Tasa de cobranza de agua en México: 40–60%. La gente no paga porque el sistema es difícil, inconsistente e impune.',
    mecanismo: 'Medidores inteligentes + recordatorios WhatsApp + pago digital. Corte remoto para morosos sin necesidad de operativos físicos.',
    municipal: {
      perdida: '$50M–$90M MXN/año en cartera vencida de agua en Tepic',
      recuperable: 60,
      como: 'OOAPAS de Tepic factura ~$200M/año. Con 40% de no-cobro = $80M perdidos. Recuperar el 75% con digitalización = $60M.',
      nayarit20: 110,
    },
    estatal: {
      perdida: 'Eficiencia hídrica + ingresos = tema de seguridad nacional en Nayarit',
      recuperable: 90,
      como: 'Los 20 organismos de agua del estado con cobranza digital: recuperación conservadora de $90M/año sobre la cartera vencida acumulada.',
      nayarit20: 90,
    },
    color: '#60a5fa',
    badge: 'Ciudadano lo siente',
  },
];

const TOTALES = {
  municipal: { tepic: 630, nayarit20: 870 },
  estatal: { propio: 1834, combinado: 2704 },
};

export function DiagnosticoDependencias({ onBack }: { onBack: () => void }) {
  const [nivel, setNivel] = useState<Nivel>('municipal');
  const [activo, setActivo] = useState<string | null>(null);

  const oceano = OCEANOS.find(o => o.id === activo);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-white/8 px-6 py-3 flex items-center gap-4">
        <button onClick={onBack}
          className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
          ← Volver
        </button>
        <div className="h-4 w-px bg-slate-800" />
        <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#E5007A]">
          ConnectX · Diagnóstico de Océanos Azules
        </span>
        <div className="ml-auto flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {(['municipal', 'estatal'] as Nivel[]).map(n => (
            <button key={n} onClick={() => setNivel(n)}
              className={`font-mono text-[0.6rem] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${nivel === n ? 'bg-white text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}>
              {n === 'municipal' ? 'Municipal' : 'Estatal'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">

        {/* KPI Banner */}
        <AnimatePresence mode="wait">
          <motion.div key={nivel}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {nivel === 'municipal' ? [
              { n: '$2,838M', label: 'Presupuesto total 20 municipios', sub: 'Nayarit 2026', color: '#E5007A' },
              { n: '$870M', label: 'Recuperable con ConnectX', sub: 'Municipios de Nayarit', color: '#00BCD4' },
              { n: '30.6%', label: 'Del presupuesto municipal', sub: 'Que se pierde hoy', color: '#FFB300' },
              { n: '5', label: 'Dependencias críticas', sub: '80% del impacto', color: '#00873E' },
            ] : [
              { n: '$32,200M', label: 'Presupuesto estatal Nayarit', sub: '2026 aprobado', color: '#E5007A' },
              { n: '$1,834M', label: 'Recuperable a nivel estatal', sub: 'Con 5 océanos azules', color: '#00BCD4' },
              { n: '$2,704M', label: 'Total municipal + estatal', sub: 'Nayarit completo', color: '#FFB300' },
              { n: '5.7%', label: 'Del presupuesto estatal', sub: 'Recuperable año 1', color: '#00873E' },
            ].map((k) => (
              <div key={k.label} className="bg-white/5 border border-white/8 rounded-xl p-4">
                <p className="font-serif font-black text-[1.8rem] leading-none mb-1" style={{ color: k.color }}>{k.n}</p>
                <p className="font-sans font-bold text-[0.72rem] text-white mb-0.5 leading-tight">{k.label}</p>
                <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider">{k.sub}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif font-black text-[2.2rem] leading-[1] tracking-tight mb-2">
            {nivel === 'municipal'
              ? 'Los 5 océanos azules municipales'
              : 'Los 5 océanos azules a nivel estado'}
          </h1>
          <p className="font-sans text-[0.9rem] text-slate-400 max-w-[600px] leading-relaxed">
            {nivel === 'municipal'
              ? 'Dinero que los municipios ya deberían tener — que ConnectX hace visible y recuperable sin subir impuestos.'
              : 'Aplicando el mismo modelo a la maquinaria estatal. Los números escalan, la lógica es idéntica.'}
          </p>
        </div>

        {/* Grid de océanos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {OCEANOS.map((o) => {
            const data = nivel === 'municipal' ? o.municipal : o.estatal;
            const rec = nivel === 'municipal' ? o.municipal.nayarit20 : o.estatal.nayarit20;
            const isActive = activo === o.id;
            return (
              <motion.button
                key={o.id}
                onClick={() => setActivo(isActive ? null : o.id)}
                whileHover={{ y: -2 }}
                className={`text-left rounded-xl border p-5 transition-all ${isActive ? 'border-opacity-100 shadow-lg' : 'border-white/8 bg-white/4 hover:bg-white/6'}`}
                style={isActive ? { borderColor: o.color, background: o.color + '12', boxShadow: `0 8px 32px ${o.color}20` } : {}}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[2rem]">{o.icon}</span>
                  <span className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] px-2 py-1 rounded-full"
                    style={{ background: o.color + '20', color: o.color, border: `1px solid ${o.color}40` }}>
                    {o.badge}
                  </span>
                </div>
                <h3 className="font-serif font-black text-[1.1rem] text-white mb-2">{o.nombre}</h3>
                <p className="font-serif font-black text-[1.6rem] leading-none mb-1" style={{ color: o.color }}>
                  {fmt(rec)} MXN/año
                </p>
                <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider mb-3">
                  {nivel === 'municipal' ? '20 municipios Nayarit' : 'Nivel estatal'}
                </p>
                <p className="text-[0.75rem] text-slate-400 leading-[1.55]">{o.problema}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="font-mono text-[0.55rem] uppercase tracking-wider" style={{ color: o.color }}>
                    {isActive ? 'Ocultar detalle ↑' : 'Ver cómo ConnectX lo resuelve →'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detalle expandido */}
        <AnimatePresence>
          {oceano && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8">
              <div className="rounded-xl border p-6 md:p-8"
                style={{ borderColor: oceano.color + '40', background: oceano.color + '08' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.15em] mb-2" style={{ color: oceano.color }}>
                      Cómo lo resuelve ConnectX
                    </p>
                    <p className="text-[0.9rem] text-white leading-relaxed mb-4">{oceano.mecanismo}</p>
                    <div className="bg-black/30 rounded-lg p-4 border border-white/8">
                      <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider mb-1">Cálculo</p>
                      <p className="text-[0.78rem] text-slate-300 leading-relaxed">
                        {nivel === 'municipal' ? oceano.municipal.como : oceano.estatal.como}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.15em] mb-3 text-slate-400">
                      Impacto en Nayarit
                    </p>
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-4 border border-white/8">
                        <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider mb-1">
                          {nivel === 'municipal' ? '20 municipios' : 'Estado de Nayarit'}
                        </p>
                        <p className="font-serif font-black text-[2rem] leading-none" style={{ color: oceano.color }}>
                          {fmt(nivel === 'municipal' ? oceano.municipal.nayarit20 : oceano.estatal.nayarit20)} MXN/año
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-white/8">
                        <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider mb-1">Lo que se pierde hoy</p>
                        <p className="text-[0.82rem] text-white/70 leading-relaxed">
                          {nivel === 'municipal' ? oceano.municipal.perdida : oceano.estatal.perdida}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resumen total */}
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="bg-white/5 px-6 py-4 border-b border-white/8">
            <p className="font-mono text-[0.6rem] font-black uppercase tracking-[0.15em] text-slate-400">
              Resumen · Potencial total ConnectX en Nayarit
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/4 rounded-xl border border-white/8">
                <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider mb-1">Solo Tepic</p>
                <p className="font-serif font-black text-[2rem] text-[#E5007A]">$630M</p>
                <p className="font-mono text-[0.5rem] text-slate-500 uppercase">MXN / año</p>
              </div>
              <div className="text-center p-4 bg-white/4 rounded-xl border border-white/8">
                <p className="font-mono text-[0.52rem] text-slate-500 uppercase tracking-wider mb-1">20 municipios Nayarit</p>
                <p className="font-serif font-black text-[2rem] text-[#00BCD4]">$870M</p>
                <p className="font-mono text-[0.5rem] text-slate-500 uppercase">MXN / año</p>
              </div>
              <div className="text-center p-4 rounded-xl border-2" style={{ background: '#E5007A12', borderColor: '#E5007A40' }}>
                <p className="font-mono text-[0.52rem] text-slate-400 uppercase tracking-wider mb-1">Municipal + Estatal</p>
                <p className="font-serif font-black text-[2.4rem] text-[#E5007A]">$2,704M</p>
                <p className="font-mono text-[0.5rem] text-slate-400 uppercase">MXN / año · Nayarit completo</p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/8 rounded-xl p-5 text-center">
              <p className="font-serif italic text-[1.1rem] text-white/80 leading-relaxed mb-1">
                ConnectX no genera gasto — <em className="text-[#E5007A] not-italic font-black">recupera dinero que ya existe.</em>
              </p>
              <p className="font-mono text-[0.6rem] text-slate-500 uppercase tracking-wider">
                Sin subir impuestos · Sin endeudamiento · Solo visibilidad y eficiencia
              </p>
            </div>
          </div>
        </div>

        {/* Arma doble filo */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/4 border border-white/8 rounded-xl p-5">
            <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.14em] text-[#E5007A] mb-2">Filo #1 · Para el municipio</p>
            <p className="font-serif font-black text-[1rem] text-white mb-2">Más recursos sin más impuestos</p>
            <p className="text-[0.78rem] text-slate-400 leading-relaxed">El alcalde llega al siguiente cabildo con $200-400M MXN adicionales recuperados. Sin necesitar autorización federal. Sin deuda.</p>
          </div>
          <div className="bg-white/4 border border-white/8 rounded-xl p-5">
            <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.14em] text-[#00BCD4] mb-2">Filo #2 · Para la gubernatura</p>
            <p className="font-serif font-black text-[1rem] text-white mb-2">Control fiscal de todo el estado</p>
            <p className="text-[0.78rem] text-slate-400 leading-relaxed">Con ConnectX en los 20 municipios y el estado, el gobernador recupera $2,704M MXN/año. Eso financia la plataforma 100x sin tocar transferencias federales.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
