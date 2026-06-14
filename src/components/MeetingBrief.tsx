import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CANDIDATE, PLATFORM } from '../config/candidate';

const TAB_SCRIPT = 0;
const TAB_BRIEF = 1;

/* ─── GUIÓN ─── */
const Script = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      phase: 'APERTURA',
      time: '0–2 min',
      color: 'var(--turq)',
      title: 'Establece el terreno — sin vender nada todavía',
      lines: [
        '"Alejandro, te agradezco el tiempo. No vine a presentarte un producto. Vine a mostrarte algo que ya existe y que ya funciona — y a que tú decidas si tiene sentido para lo que viene."',
        '"Lo construimos para Tepic. Para Geraldine. Pero antes de entrar, déjame preguntarte algo..."',
      ],
      machiavelli: 'Él espera un pitch de ventas. Al negarlo, bajas su guardia. La pregunta que sigue lo hace hablar primero — quien habla primero, revela.',
      pregunta: '"¿Cómo estás viendo el tema de la transición cuando empiece la campaña?"',
    },
    {
      phase: 'ESCUCHA',
      time: '2–8 min',
      color: 'var(--solar)',
      title: 'Deja que hable. No interrumpas.',
      lines: [
        'Él va a hablar de los retos operativos, de la presión política, de lo que necesita para que el municipio no se caiga mientras ella campaña.',
        'Tú asientes. Tomas nota mental. No ofrezcas soluciones todavía.',
      ],
      machiavelli: 'La gente no compra lo que tú vendes — compra la solución a su propio problema. Si él lo describe con sus palabras, cuando presentes la plataforma, va a reconocer su propio problema en la solución.',
      pregunta: '"¿Y en ese escenario, qué te daría más paz de tener cubierto?"',
    },
    {
      phase: 'DEMOSTRACIÓN',
      time: '8–18 min',
      color: 'var(--magenta)',
      title: 'Muestra — no expliques. Que él pregunte.',
      lines: [
        'Abre la laptop. Landing page primero — los Ojos de Dios, el diseño. 10 segundos de impacto visual.',
        'Luego el Dashboard C5: "Esto es el centro de comando. Desde aquí, un solo operador ve todo el municipio en tiempo real."',
        '"Obras, recaudación, servicios, salud — todo conectado. Si algo falla, el sistema lo detecta antes que los directores."',
        'Muestra el Asistente IA: "El ciudadano no habla con una dependencia. Habla con esto. La IA decide a quién escalar."',
      ],
      machiavelli: 'No digas "esto es bueno para ti". Que él lo vea y lo piense solo. El cerebro valora más lo que descubre que lo que le dicen.',
      pregunta: 'Silencio estratégico después de la demo. Espera a que él hable primero.',
    },
    {
      phase: 'ANCLAJE',
      time: '18–22 min',
      color: 'var(--verde)',
      title: 'Planta la semilla del miedo — con elegancia',
      lines: [
        '"Estamos en conversaciones con otros perfiles en Nayarit también. Pero mi primera opción siempre fue este equipo, porque ya hay trabajo hecho aquí."',
        '"La licencia es territorial — solo un candidato por estado puede activarla antes de que empiece la campaña formal. Después de eso, no controlamos a quién se la damos."',
      ],
      machiavelli: 'Escasez real o percibida activa el instinto de no perder. El ser humano teme más perder algo que ganar algo equivalente. No amenaces — informa. La diferencia es el tono.',
      pregunta: '"¿Tiene sentido que sigamos explorando esto juntos?"',
    },
    {
      phase: 'CIERRE',
      time: '22–30 min',
      color: 'var(--magenta)',
      title: 'No cierres — abre el siguiente paso',
      lines: [
        'Si dice sí: "Perfecto. Propongo una sesión técnica con quien tú designes esta semana, para mapear las 48 dependencias y definir el arranque."',
        'Si dice "déjame pensarlo": "Por supuesto. Te mando el documento ejecutivo hoy. Lo único que te pido es que me digas antes del viernes si seguimos, porque tenemos que tomar una decisión sobre el estado."',
        'Si hay objeción de presupuesto: "El modelo es flexible. Podemos arrancar con las 3 dependencias más críticas y escalar. Lo importante es que el sistema esté instalado antes de que empiece la campaña."',
      ],
      machiavelli: 'El cierre más poderoso no es "¿lo compras?" — es "¿cuándo empezamos?" Asumes que ya dijo sí y solo preguntas sobre logística.',
      pregunta: '"¿Quién sería la persona técnica con quien coordinar el arranque de tu lado?"',
    },
  ];

  const current = steps[step];

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex-1 h-[4px] rounded-full transition-all ${i <= step ? 'opacity-100' : 'opacity-20'}`}
            style={{ background: s.color }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
        >
          {/* Phase header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full text-white"
              style={{ background: current.color }}>
              {current.phase}
            </span>
            <span className="font-mono text-[0.65rem] text-slate-400 uppercase tracking-widest">{current.time}</span>
            <span className="ml-auto font-mono text-[0.6rem] text-slate-400">{step + 1} / {steps.length}</span>
          </div>

          <h2 className="font-serif font-black text-[1.8rem] leading-tight text-slate-900 mb-5">{current.title}</h2>

          {/* Lines */}
          <div className="space-y-3 mb-6">
            {current.lines.map((line, i) => (
              <div key={i} className={`p-4 rounded-xl text-[0.88rem] leading-relaxed ${line.startsWith('"') ? 'bg-slate-900 text-white font-medium italic border-l-4' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}
                style={line.startsWith('"') ? { borderLeftColor: current.color } : {}}>
                {line}
              </div>
            ))}
          </div>

          {/* Machiavelli note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
            <p className="font-mono text-[0.58rem] font-black uppercase tracking-[0.15em] text-amber-700 mb-1">Lógica Maquiavélica</p>
            <p className="text-[0.82rem] text-amber-900 leading-relaxed">{current.machiavelli}</p>
          </div>

          {/* Question */}
          <div className="rounded-xl p-4 border-2 text-[0.9rem] font-bold italic text-white"
            style={{ background: current.color, borderColor: current.color }}>
            {current.pregunta}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="font-mono text-[0.7rem] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 disabled:opacity-30 transition-all"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className="font-mono text-[0.7rem] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full text-white transition-all"
          style={{ background: current.color }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

/* ─── BRIEF EJECUTIVO (1 PÁGINA) ─── */
const ExecutiveBrief = () => (
  <div className="max-w-[760px] mx-auto">
    {/* Print hint */}
    <div className="flex items-center justify-between mb-6 print:hidden">
      <p className="font-mono text-[0.6rem] text-slate-400 uppercase tracking-widest">Documento para imprimir o mostrar en pantalla</p>
      <button
        onClick={() => window.print()}
        className="font-mono text-[0.65rem] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-all"
      >
        Imprimir / PDF →
      </button>
    </div>

    {/* THE DOCUMENT */}
    <div id="brief-print" className="bg-white shadow-[0_20px_80px_-20px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border border-black/5 print:shadow-none print:rounded-none">

      {/* Header strip */}
      <div className="h-[5px]" style={{ background: 'linear-gradient(90deg,var(--magenta),var(--solar),var(--turq),var(--verde))' }} />

      <div className="p-10 md:p-14">

        {/* Top row */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <span className="font-serif font-black text-[1.4rem] tracking-tight">Connect<em className="text-[var(--magenta)] italic">X</em></span>
            <p className="font-mono text-[0.55rem] text-slate-400 uppercase tracking-[0.15em] mt-0.5">Nayarit Digital · Ecosistema de Gobernanza</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[0.5rem] text-slate-400 uppercase tracking-widest">Documento</p>
            <p className="font-mono text-[0.7rem] font-bold text-slate-700">NAY-EXE-2026-AG</p>
            <p className="font-mono text-[0.5rem] text-slate-400 uppercase tracking-widest mt-1">Confidencial</p>
          </div>
        </div>

        {/* Title block */}
        <div className="mb-10 pb-10 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1 rounded-full font-mono text-[0.55rem] font-black uppercase tracking-[0.15em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Propuesta Estratégica · Reunión Ejecutiva
          </div>
          <h1 className="font-serif font-black text-[2.8rem] leading-[1] tracking-tight text-slate-900 mb-3">
            El sistema operativo<br />
            <em className="text-[var(--magenta)] italic">que ya funciona.</em>
          </h1>
          <p className="text-[0.95rem] text-slate-500 max-w-[500px] leading-relaxed">
            {PLATFORM.name} no es una promesa de campaña. Es infraestructura digital activa que convierte a {CANDIDATE.municipality} en el municipio más inteligente de {CANDIDATE.state} — antes de que empiece la elección.
          </p>
        </div>

        {/* 3 columns: problem / solution / result */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            {
              label: 'El problema',
              color: '#ef4444',
              icon: '⚡',
              points: [
                'La campaña exige atención total — el municipio no puede quedarse sin operación inteligente',
                'Sin datos centralizados, cada director opera en su silo',
                'El rival puede adoptar tecnología antes y usarla como argumento',
              ],
            },
            {
              label: 'ConnectX hace',
              color: 'var(--magenta)',
              icon: '⚙️',
              points: [
                'Centro de comando C5 con visibilidad de las 48 dependencias en tiempo real',
                'IA ciudadana que resuelve trámites sin intermediarios humanos',
                'Trazabilidad de obra pública: cada peso visible, auditable y atribuible',
              ],
            },
            {
              label: 'El resultado',
              color: 'var(--verde)',
              icon: '✦',
              points: [
                '+78% recaudación predial documentada desde 2021',
                'Municipio que funciona solo durante la campaña — y genera datos para los spots',
                'Geraldine llega a la gubernatura con prueba, no con promesa',
              ],
            },
          ].map((col) => (
            <div key={col.label} className="space-y-3">
              <div className="font-mono text-[0.55rem] font-black uppercase tracking-[0.15em] flex items-center gap-1.5" style={{ color: col.color }}>
                <span>{col.icon}</span>{col.label}
              </div>
              {col.points.map((p, i) => (
                <p key={i} className="text-[0.72rem] text-slate-600 leading-[1.6] pl-3 border-l-2" style={{ borderColor: col.color + '40' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-5 gap-3 mb-10 p-5 bg-slate-950 rounded-xl">
          {[
            { n: '+78%', label: 'Recaudación', sub: 'vs 2021' },
            { n: '92%', label: 'Obras trazadas', sub: 'eficiencia' },
            { n: '65K', label: 'Beneficiarios', sub: 'bienestar social' },
            { n: '-68%', label: 'Tiempo de respuesta', sub: 'gestión pública' },
            { n: '83/100', label: 'Confianza IMDM', sub: 'índice digital' },
          ].map((m) => (
            <div key={m.n} className="text-center">
              <p className="font-serif font-black text-[1.4rem] text-white leading-none">{m.n}</p>
              <p className="font-mono text-[0.48rem] text-slate-400 uppercase tracking-wider mt-1">{m.label}</p>
              <p className="font-mono text-[0.42rem] text-slate-600 uppercase tracking-wider">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Exclusivity block */}
        <div className="bg-rose-950 text-white rounded-xl p-6 mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10"
            style={{ background: 'linear-gradient(90deg, transparent, var(--magenta))' }} />
          <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.18em] text-rose-400 mb-2">
            Condición comercial
          </p>
          <p className="font-serif font-black text-[1.3rem] leading-tight mb-2">
            Licencia exclusiva territorial.<br />
            <em className="text-rose-300 font-light italic">Un solo candidato por estado puede activarla.</em>
          </p>
          <p className="text-[0.75rem] text-rose-200/70 leading-relaxed max-w-[480px]">
            ConnectX no opera como proveedor multi-candidato. La plataforma se entrega bajo contrato de exclusividad estatal. Si el equipo de {CANDIDATE.fullName} no la activa antes de {PLATFORM.urgencyDeadline}, la licencia de {CANDIDATE.state} queda disponible para cualquier otro candidato.
          </p>
        </div>

        {/* What's included */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div>
            <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">Incluido en la licencia</p>
            {[
              'Dashboard C5 de Gobernanza (48 dependencias)',
              'Asistente IA ciudadano multilingüe (español + wixárika)',
              'Trazabilidad de obras y presupuesto en tiempo real',
              'Tesorería Digital y recaudación automatizada',
              'Módulo de Bienestar Social con detección por IA',
              'Observatorio de datos con IMDM en vivo',
              'Soporte técnico y actualizaciones durante campaña',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 mb-2">
                <span className="text-[var(--verde)] mt-0.5 shrink-0">✓</span>
                <p className="text-[0.75rem] text-slate-600 leading-[1.5]">{item}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-mono text-[0.55rem] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">Siguiente paso propuesto</p>
            <div className="space-y-3">
              {[
                { n: '01', text: 'Sesión técnica de mapeo con equipo de TI municipal (1 hora)', date: 'Esta semana' },
                { n: '02', text: 'Definición de las 3 dependencias piloto de arranque', date: 'Semana 2' },
                { n: '03', text: 'Activación y capacitación del equipo operativo', date: 'Semana 3–4' },
                { n: '04', text: 'Dashboard en vivo antes de inicio de campaña', date: 'Q1 2027' },
              ].map((s) => (
                <div key={s.n} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-mono font-black text-[0.7rem] text-[var(--magenta)] shrink-0 mt-0.5">{s.n}</span>
                  <div>
                    <p className="text-[0.72rem] text-slate-700 leading-tight">{s.text}</p>
                    <p className="font-mono text-[0.55rem] text-slate-400 uppercase tracking-wider mt-0.5">{s.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
          <div>
            <p className="font-serif font-black text-[1rem]">Connect<em className="text-[var(--magenta)] italic">X</em> · {PLATFORM.name}</p>
            <p className="font-mono text-[0.55rem] text-slate-400 uppercase tracking-widest mt-0.5">panaderiabelenb@gmail.com</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[0.5rem] text-slate-300 uppercase tracking-widest">Junio 2026</p>
            <p className="font-mono text-[0.5rem] text-slate-300 uppercase tracking-widest">Confidencial · No distribuir</p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="h-[3px]" style={{ background: 'linear-gradient(90deg,var(--verde),var(--turq),var(--magenta))' }} />
    </div>
  </div>
);

/* ─── MAIN COMPONENT ─── */
export function MeetingBrief({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState(TAB_SCRIPT);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-3 flex items-center gap-4 print:hidden">
        <button onClick={onBack}
          className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5">
          ← Volver
        </button>
        <div className="h-4 w-px bg-slate-200" />
        <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.15em] text-[var(--magenta)]">
          Reunión Alejandro Galván · Lunes/Martes
        </span>
        <div className="ml-auto flex gap-1 bg-slate-100 p-1 rounded-full">
          {['Guión Estratégico', 'Brief Ejecutivo'].map((label, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`font-mono text-[0.6rem] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${tab === i ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-10 print:p-0">
        <AnimatePresence mode="wait">
          {tab === TAB_SCRIPT ? (
            <motion.div key="script" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-10">
                <h1 className="font-serif font-black text-[2.2rem] text-slate-900 mb-2">Guión Maquiavélico</h1>
                <p className="font-mono text-[0.65rem] text-slate-400 uppercase tracking-widest">5 fases · 30 minutos · Un solo objetivo</p>
              </div>
              <Script />
            </motion.div>
          ) : (
            <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ExecutiveBrief />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
