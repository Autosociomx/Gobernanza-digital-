import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Users, Leaf, Globe, ChevronDown, ChevronRight,
  Download, Eye, Mic, FileText, CheckCircle2, Sparkles, Scale,
  Lock, Activity, Zap, BookOpen, Heart, GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

// ─── Data ────────────────────────────────────────────────────────────────────

const VALORES = [
  {
    icon: ShieldCheck,
    color: 'from-indigo-600 to-indigo-800',
    tag: 'Derechos Humanos',
    titulo: 'Dignidad sin excepción',
    desc: 'Priorizar la dignidad de pescadores, campesinos, artesanos y migrantes. Ningún sistema de IA puede discriminar por zona geográfica o nivel educativo.',
  },
  {
    icon: Globe,
    color: 'from-violet-600 to-violet-800',
    tag: 'Diversidad y Pluralismo',
    titulo: 'Tecnología en tu idioma',
    desc: 'Respetar lenguas indígenas (wixárika, náhuatl, cora), saberes locales y cosmovisiones en el diseño de cada herramienta digital.',
  },
  {
    icon: Users,
    color: 'from-rose-600 to-rose-800',
    tag: 'Justicia Social',
    titulo: 'Acceso equitativo',
    desc: 'La IA no ampliará brechas: acceso para mujeres, jóvenes, adultos mayores y comunidades rurales de los 20 municipios de Nayarit.',
  },
  {
    icon: Leaf,
    color: 'from-emerald-600 to-emerald-800',
    tag: 'Sostenibilidad',
    titulo: 'IA al servicio del planeta',
    desc: 'Aplicada al monitoreo de manglares, sequías, pesca responsable y optimización energética — no solo a trámites digitales.',
  },
];

const PRINCIPIOS = [
  {
    num: '01',
    icon: Eye,
    titulo: 'Transparencia y Explicabilidad',
    desc: 'Todo sistema de IA del gobierno debe tener "etiqueta de transparencia": qué datos usa, cómo toma decisiones y quién lo supervisa.',
    ejemplo: 'Ciudadano puede pedir explicación de un rechazo de trámite y recibirla en menos de 24 horas.',
    indicador: '100% de decisiones con log auditable público',
    color: 'border-indigo-200 bg-indigo-50/50',
    tag_color: 'bg-indigo-100 text-indigo-700',
  },
  {
    num: '02',
    icon: ShieldCheck,
    titulo: 'Supervisión Humana Obligatoria',
    desc: 'Ningún algoritmo decide sin revisión humana en áreas sensibles: salud, justicia, educación. El funcionario es copiloto, no pasajero.',
    ejemplo: '+90% de decisiones críticas validadas por persona (registro auditable en Firestore).',
    indicador: '0 decisiones críticas sin firma humana',
    color: 'border-emerald-200 bg-emerald-50/50',
    tag_color: 'bg-emerald-100 text-emerald-700',
  },
  {
    num: '03',
    icon: Scale,
    titulo: 'No Discriminación ni Sesgo',
    desc: 'Modelos entrenados con datos representativos de Nayarit completo, no solo Tepic. Auditoría anual de sesgos por género, edad y zona.',
    ejemplo: 'Informe público anual: "¿Quién se beneficia? ¿Quién queda fuera?"',
    indicador: 'Informe de sesgo publicado cada 6 meses',
    color: 'border-amber-200 bg-amber-50/50',
    tag_color: 'bg-amber-100 text-amber-700',
  },
  {
    num: '04',
    icon: Heart,
    titulo: 'Bienestar y Autonomía Ciudadana',
    desc: 'IA para empoderar, no para controlar. Apps que ayudan a emprendedores a vender, no a vigilarlos.',
    ejemplo: '+500 pymes usando IA para crecer (no para cumplir requisitos).',
    indicador: 'Índice de Satisfacción Ciudadana ≥ 85%',
    color: 'border-rose-200 bg-rose-50/50',
    tag_color: 'bg-rose-100 text-rose-700',
  },
  {
    num: '05',
    icon: Lock,
    titulo: 'Privacidad y Protección de Datos',
    desc: 'Datos personales nunca se venden. Uso de anonimización diferencial en análisis públicos. Consentimiento explícito para datos sensibles.',
    ejemplo: 'Certificación "Nayarit Seguro en Datos" para todos los servicios digitales.',
    indicador: '0 ventas o transferencias no autorizadas de datos',
    color: 'border-slate-200 bg-slate-50/50',
    tag_color: 'bg-slate-100 text-slate-700',
  },
  {
    num: '06',
    icon: Activity,
    titulo: 'Seguridad y Robustez',
    desc: 'Sistemas resistentes a ciberataques con copias de seguridad locales, no solo en nube extranjera.',
    ejemplo: '0 incidentes críticos en 12 meses con monitoreo público continuo.',
    indicador: 'Disponibilidad ≥ 99% mensual',
    color: 'border-blue-200 bg-blue-50/50',
    tag_color: 'bg-blue-100 text-blue-700',
  },
  {
    num: '07',
    icon: Leaf,
    titulo: 'Sostenibilidad Ecológica',
    desc: 'Uso eficiente de energía en centros de datos. IA para optimizar riego, reducir desperdicio alimentario y monitorear bosques.',
    ejemplo: 'Huella de carbono de infraestructura digital pública ↓15% anual.',
    indicador: 'Reporte de huella de carbono semestral',
    color: 'border-green-200 bg-green-50/50',
    tag_color: 'bg-green-100 text-green-700',
  },
  {
    num: '08',
    icon: Globe,
    titulo: 'Colaboración Internacional Justa',
    desc: 'Alianzas con universidades e instituciones internacionales basadas en co-diseño, no dependencia. Transferencia de conocimiento.',
    ejemplo: '+3 proyectos conjuntos con universidades extranjeras en 2026–2027.',
    indicador: '≥ 3 convenios internacionales activos',
    color: 'border-violet-200 bg-violet-50/50',
    tag_color: 'bg-violet-100 text-violet-700',
  },
  {
    num: '09',
    icon: Users,
    titulo: 'Gobernanza Participativa e Inclusiva',
    desc: 'Consejos locales de IA en cada municipio. Jóvenes diseñan chatbots; adultos mayores prueban interfaces antes de lanzar.',
    ejemplo: '30% de miembros del Comité de Ética son ciudadanos no técnicos.',
    indicador: 'Consejo Ciudadano de IA activo en Cabildo',
    color: 'border-cyan-200 bg-cyan-50/50',
    tag_color: 'bg-cyan-100 text-cyan-700',
  },
  {
    num: '10',
    icon: GraduationCap,
    titulo: 'Educación y Alfabetización Digital',
    desc: 'Programas en escuelas, centros comunitarios y mercados: "IA para todos", no solo para ingenieros ni funcionarios.',
    ejemplo: '10,000 personas capacitadas en 2026 con certificado reconocido por la SEC Nayarit.',
    indicador: '10,000 certificaciones en 2026',
    color: 'border-orange-200 bg-orange-50/50',
    tag_color: 'bg-orange-100 text-orange-700',
  },
];

const HERRAMIENTAS = [
  { icon: CheckCircle2, titulo: 'Checklist Ético para Proyectos de IA', desc: 'Lista de verificación obligatoria antes de lanzar cualquier sistema de IA en dependencias municipales o estatales.' },
  { icon: Sparkles, titulo: 'Sello "IA con Confianza Nayarit"', desc: 'Certificación visible para apps, trámites y servicios digitales que cumplen los 10 principios de este marco.' },
  { icon: Zap, titulo: 'Laboratorio de Ética de IA', desc: 'En colaboración con UAN y CINVESTAV: espacio para probar, auditar y mejorar modelos antes de desplegarlos.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function MarcoEticoIA({ onBack }: { onBack: () => void }) {
  const [expandido, setExpandido] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Carpeta Ejecutiva
        </button>
        <div className="flex items-center gap-3">
          <a
            href="/marco-etico-ia-nayarit.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors"
          >
            <Download className="w-3 h-3" /> Marco Ético Word
          </a>
          <a
            href="/discurso-institucional.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors"
          >
            <Mic className="w-3 h-3" /> Discurso Word
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-16">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-indigo-400">
            UNESCO 2021 · Adaptación Latinoamericana · Nayarit Digital
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-black leading-tight">
            Marco Ético de IA<br />
            <em className="text-indigo-400 italic">para Nayarit</em>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Gobernanza Digital con Confianza — Hacia un Estado Justo, Transparente y Próspero. Basado en los principios de la UNESCO adaptados a la realidad cultural, rural y diversa de Nayarit.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            {['UNESCO 2021', 'LMR Art. 17', 'LFPDPPP', 'LGTAIP'].map(t => (
              <span key={t} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded-full text-white/40">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* 4 Valores */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-6">4 Valores Centrales</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALORES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={cn('rounded-[1.5rem] p-6 bg-gradient-to-br text-white relative overflow-hidden', v.color)}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl" />
                <div className="relative z-10">
                  <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">{v.tag}</p>
                  <h3 className="text-base font-serif font-black mb-2">{v.titulo}</h3>
                  <p className="text-[11px] text-white/70 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 10 Principios */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-6">
            10 Principios Éticos Operativos
          </p>
          <div className="space-y-3">
            {PRINCIPIOS.map((p, i) => (
              <motion.div
                key={i}
                layout
                className={cn('rounded-[1.5rem] border overflow-hidden transition-all', p.color)}
              >
                <button
                  onClick={() => setExpandido(expandido === i ? null : i)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <p.icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn('text-[8px] font-black px-2 py-0.5 rounded-full', p.tag_color)}>
                        PRINCIPIO {p.num}
                      </span>
                    </div>
                    <p className="text-sm font-black text-slate-900 leading-tight">{p.titulo}</p>
                  </div>
                  <ChevronDown className={cn('w-4 h-4 text-slate-400 shrink-0 transition-transform', expandido === i && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {expandido === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3 border-t border-black/5">
                        <p className="text-sm text-slate-600 leading-relaxed pt-3">{p.desc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-white rounded-2xl shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Ejemplo Nayarit</p>
                            <p className="text-[11px] text-slate-700 font-medium leading-snug">{p.ejemplo}</p>
                          </div>
                          <div className="p-3 bg-white rounded-2xl shadow-sm">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Indicador</p>
                            <p className="text-[11px] text-slate-900 font-black leading-snug">{p.indicador}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Herramientas */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-6">Herramientas de Implementación</p>
          <div className="space-y-4">
            {HERRAMIENTAS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-[1.5rem]"
              >
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <h.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-black text-white mb-1">{h.titulo}</p>
                  <p className="text-[11px] text-white/50 leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Download CTAs */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: BookOpen,
              label: 'Marco Ético Completo',
              sub: 'Word / PDF editable',
              href: '/marco-etico-ia-nayarit.html',
              color: 'bg-indigo-600 hover:bg-indigo-500',
            },
            {
              icon: Mic,
              label: 'Discurso Institucional',
              sub: 'Para Gobernador / Secretario',
              href: '/discurso-institucional.html',
              color: 'bg-rose-600 hover:bg-rose-500',
            },
            {
              icon: FileText,
              label: 'Convenio de Colaboración',
              sub: 'Borrador firmable',
              href: '/convenio-colaboracion-tepic.html',
              color: 'bg-slate-700 hover:bg-slate-600',
            },
          ].map((d, i) => (
            <a
              key={i}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('flex flex-col items-center gap-3 p-6 rounded-[1.5rem] text-white transition-all text-center', d.color)}
            >
              <d.icon className="w-6 h-6" />
              <div>
                <p className="text-sm font-black leading-tight mb-0.5">{d.label}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">{d.sub}</p>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-white/60">
                <Download className="w-3 h-3" /> Abrir en Word
              </div>
            </a>
          ))}
        </section>

        {/* Footer */}
        <p className="text-center text-[8px] text-white/20 font-bold uppercase tracking-[0.25em] pb-4">
          Basado en UNESCO Recommendation on the Ethics of AI (2021) · Adaptado para Nayarit Digital 2026
        </p>
      </div>
    </div>
  );
}
