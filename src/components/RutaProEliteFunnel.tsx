import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  X,
  Truck,
  MapPin,
  BarChart3,
  Shield,
  Zap,
  Users,
  Clock,
  Star,
  ArrowRight,
  Phone,
  ChevronDown,
  Flame,
  Crown,
  TrendingUp,
  Map,
  Bell,
  Lock,
  RefreshCw,
  MessageSquare,
  Target,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';

// ─── Datos de planes ───────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'basico',
    name: 'Básico',
    icon: <Truck size={24} />,
    monthlyPrice: 299,
    annualPrice: 199,
    color: 'border-slate-200',
    badge: null,
    features: [
      'Hasta 3 unidades / conductores',
      'Rastreo GPS en tiempo real',
      'Historial de rutas 30 días',
      'Reportes básicos de kilometraje',
      'Soporte por correo',
    ],
    missing: [
      'Optimización de rutas con IA',
      'Alertas de desvío en tiempo real',
      'Panel multi-sucursal',
      'Reportes avanzados de eficiencia',
      'Soporte prioritario 24/7',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: <MapPin size={24} />,
    monthlyPrice: 599,
    annualPrice: 399,
    color: 'border-nayarit-orange',
    badge: 'Más popular',
    features: [
      'Hasta 10 unidades / conductores',
      'Rastreo GPS en tiempo real',
      'Optimización de rutas con IA',
      'Alertas de desvío instantáneas',
      'Historial de rutas ilimitado',
      'Reportes de eficiencia y combustible',
      'Soporte por WhatsApp',
    ],
    missing: [
      'Panel multi-sucursal',
      'API de integración',
      'Gestor de cuenta dedicado',
    ],
  },
  {
    id: 'elite',
    name: 'Elite Anual',
    icon: <Crown size={24} />,
    monthlyPrice: 999,
    annualPrice: 599,
    color: 'border-yellow-400',
    badge: '🔥 Mejor valor',
    features: [
      'Unidades ILIMITADAS',
      'Rastreo GPS en tiempo real',
      'Optimización de rutas con IA avanzada',
      'Alertas y notificaciones inteligentes',
      'Panel multi-sucursal centralizado',
      'Reportes ejecutivos con IA',
      'API de integración con tu sistema',
      'Gestor de cuenta dedicado',
      'Soporte prioritario 24/7',
      'Onboarding gratuito y capacitación',
      'Garantía de devolución 30 días',
    ],
    missing: [],
  },
];

const TESTIMONIALS = [
  {
    name: 'Roberto Hernández',
    role: 'Dueño Tortillería "La Estrella", Tepic',
    text: 'Antes perdía 2 horas al día rastreando a mis repartidores por teléfono. Ahora con Ruta Pro Elite veo todo en pantalla y mis clientes reciben su pedido a tiempo. En 3 meses ya recuperé lo de la anualidad.',
    stars: 5,
    savings: 'Ahorra $4,200/mes en combustible',
    image: 'RH',
  },
  {
    name: 'María González',
    role: 'Administradora Distribuidora de Maquinaria, Guadalajara',
    text: 'Manejamos 15 técnicos de servicio en campo. Ruta Pro Elite nos eliminó las llamadas constantes, los técnicos llegan 40% más rápido a los clientes y tenemos prueba de visita para facturar sin problemas.',
    stars: 5,
    savings: 'Reducción del 40% en tiempo de respuesta',
    image: 'MG',
  },
  {
    name: 'Carlos Moreno',
    role: 'Logística Empresas Moreno, Ciudad de México',
    text: 'Tenemos 3 sucursales y antes era un caos coordinar las rutas. El panel centralizado de Elite nos dio visibilidad total. Lo que más me convenció fue la garantía de 30 días: si no funciona, te regresan el dinero.',
    stars: 5,
    savings: '3 sucursales, 1 solo panel',
    image: 'CM',
  },
];

const FAQS = [
  {
    q: '¿Cuánto me ahorro con la anualidad?',
    a: 'Con el plan Elite Anual pagas $599/mes en lugar de $999/mes mensual. Son $4,800 de ahorro al año (40% off). Además incluye onboarding gratuito valuado en $1,500.',
  },
  {
    q: '¿Necesito instalar hardware en mis vehículos?',
    a: 'No para conductores con smartphone. La app móvil para Android e iOS activa el rastreo GPS. Para flotas sin smartphone ofrecemos un dispositivo GPS compacto por $350 (pago único).',
  },
  {
    q: '¿Qué pasa si quiero cancelar antes del año?',
    a: 'Tienes garantía de devolución de 30 días sin preguntas. Después del día 30, puedes cancelar y no se te cobra el siguiente mes. No hay penalización por cancelar.',
  },
  {
    q: '¿Funciona para tortillerías y negocios de reparto local?',
    a: 'Sí, es uno de nuestros casos de uso más comunes en México. La app distingue rutas fijas diarias (tortillerías, panaderías) de rutas dinámicas (maquinaria, servicio técnico). Se adapta a tu modelo.',
  },
  {
    q: '¿Puedo probar antes de comprar?',
    a: 'Sí. Ofrecemos 14 días de prueba gratuita del plan Elite completo, sin tarjeta de crédito. Si te convence, aplicas la anualidad con el 40% de descuento.',
  },
];

// ─── Subcomponentes ─────────────────────────────────────────────────────────────

const CountdownBadge = () => {
  const [hours] = useState(23);
  const [minutes] = useState(47);
  const [seconds, setSeconds] = useState(12);

  React.useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 59)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse">
      <Flame size={14} />
      OFERTA TERMINA EN: {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

const PlanCard = ({ plan, annual, onCTA }: { plan: typeof PLANS[0]; annual: boolean; onCTA: () => void }) => {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;
  const isElite = plan.id === 'elite';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'relative rounded-3xl border-2 p-8 flex flex-col transition-all duration-300',
        isElite
          ? 'bg-slate-900 border-yellow-400 shadow-2xl shadow-yellow-400/10 scale-105'
          : 'bg-white border-slate-200 hover:border-orange-300'
      )}
    >
      {plan.badge && (
        <div className={cn(
          'absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap',
          isElite ? 'bg-yellow-400 text-slate-900' : 'bg-nayarit-orange text-white'
        )}>
          {plan.badge}
        </div>
      )}

      <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4', isElite ? 'bg-yellow-400/20 text-yellow-400' : 'bg-orange-100 text-nayarit-orange')}>
        {plan.icon}
      </div>

      <h3 className={cn('text-xl font-bold mb-1', isElite ? 'text-white' : 'text-slate-900')}>{plan.name}</h3>

      <div className="mb-2">
        <span className={cn('text-4xl font-black', isElite ? 'text-yellow-400' : 'text-slate-900')}>
          ${price.toLocaleString()}
        </span>
        <span className={cn('text-sm ml-1', isElite ? 'text-slate-400' : 'text-slate-500')}>/mes</span>
      </div>

      {annual && plan.monthlyPrice !== plan.annualPrice && (
        <p className="text-xs text-emerald-500 font-bold mb-4">
          Antes ${plan.monthlyPrice}/mes · Ahorras ${((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString()}/año
        </p>
      )}

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <span className={isElite ? 'text-slate-300' : 'text-slate-700'}>{f}</span>
          </li>
        ))}
        {plan.missing.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm opacity-40">
            <X size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <span className={isElite ? 'text-slate-500' : 'text-slate-400'}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCTA}
        className={cn(
          'w-full py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95',
          isElite
            ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/20'
            : 'bg-slate-100 text-slate-900 hover:bg-orange-50'
        )}
      >
        {isElite ? '🚀 QUIERO RUTA PRO ELITE' : 'Comenzar prueba gratis'}
      </button>

      {isElite && (
        <p className="text-center text-xs text-slate-500 mt-3">
          Garantía 30 días · Sin tarjeta al inicio
        </p>
      )}
    </motion.div>
  );
};

// ─── Componente principal ───────────────────────────────────────────────────────

export const RutaProEliteFunnel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', business: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-16 pb-24 px-4">
        <div className="absolute inset-0 opacity-10 data-grid pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-nayarit-orange/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <CountdownBadge />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mt-6 mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest">
              <Crown size={14} />
              Ruta Pro Elite — Plan Anual
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-6">
              Controla tu flota.<br />
              <span className="text-yellow-400">Duplica tu eficiencia.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              La plataforma de rastreo y optimización de rutas #1 para tortillerías, distribuidoras y empresas de maquinaria en México. <strong className="text-white">40% de descuento al pagar anual.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#planes"
                className="group px-10 py-5 bg-yellow-400 text-slate-900 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-yellow-400/20 flex items-center gap-3 justify-center"
              >
                VER PLAN ELITE
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#demo"
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all flex items-center gap-3 justify-center"
              >
                <Phone size={20} />
                Solicitar Demo Gratis
              </a>
            </div>
          </motion.div>

          {/* Social proof numbers */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '1,200+', label: 'Negocios activos' },
              { value: '40%', label: 'Ahorro en combustible' },
              { value: '14 días', label: 'Prueba gratuita' },
              { value: '4.9 ★', label: 'Calificación promedio' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-2xl font-black text-yellow-400">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problema / Solución ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-4 tracking-tight">
            ¿Te identificas con alguno de estos problemas?
          </h2>
          <p className="text-slate-500 text-center mb-14 text-lg">
            Son los más comunes entre nuestros clientes <em>antes</em> de usar Ruta Pro Elite.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Antes */}
            <div className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <X size={16} className="text-red-500" />
                </div>
                <span className="font-black text-red-600 uppercase tracking-wider text-sm">Antes de Ruta Pro</span>
              </div>
              <ul className="space-y-4">
                {[
                  '"¿Dónde está el repartidor?" — Llamadas sin fin',
                  'Rutas ineficientes: Kilometraje extra = más combustible',
                  'Clientes que llaman porque su pedido no llegó',
                  'Conductores que "se pierden" en horarios de trabajo',
                  'Sin datos para saber qué rutas son rentables',
                  'Tiempo de administrador desperdiciado en coordinación manual',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={10} className="text-red-400" />
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Después */}
            <div className="bg-slate-900 rounded-3xl p-8 border-2 border-yellow-400/30 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-yellow-400" />
                </div>
                <span className="font-black text-yellow-400 uppercase tracking-wider text-sm">Con Ruta Pro Elite</span>
              </div>
              <ul className="space-y-4">
                {[
                  'Ubicación en tiempo real en tu pantalla, sin llamadas',
                  'Rutas optimizadas por IA: -30% en combustible promedio',
                  'Notificaciones automáticas a clientes cuando llega el pedido',
                  'Alertas si el conductor se desvía de la ruta asignada',
                  'Reportes de eficiencia por conductor, ruta y día',
                  'Libera 2 horas diarias del administrador para lo que importa',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={10} className="text-yellow-400" />
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Características principales ─────────────────────────────── */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-nayarit-orange text-xs font-bold uppercase tracking-widest mb-4">
              Funcionalidades Elite
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Todo lo que necesitas para dominar tu operación
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Map size={28} className="text-blue-500" />,
                title: 'Rastreo GPS Satelital',
                desc: 'Monitorea cada unidad en tiempo real desde el celular o computadora. Sin demoras, sin mentiras.',
              },
              {
                icon: <Zap size={28} className="text-yellow-500" />,
                title: 'Optimización de Rutas con IA',
                desc: 'La IA calcula la ruta más eficiente según tráfico, orden de entregas y disponibilidad.',
              },
              {
                icon: <Bell size={28} className="text-red-500" />,
                title: 'Alertas Inteligentes',
                desc: 'Recibe notificaciones si el conductor se detiene más tiempo del normal o se desvía del camino.',
              },
              {
                icon: <BarChart3 size={28} className="text-emerald-500" />,
                title: 'Reportes Ejecutivos',
                desc: 'Análisis de combustible, horas activas, puntualidad y eficiencia por conductor y ruta.',
              },
              {
                icon: <Users size={28} className="text-purple-500" />,
                title: 'Panel Multi-Sucursal',
                desc: 'Gestiona todas tus oficinas y flotas desde un solo panel centralizado con rol de administrador.',
              },
              {
                icon: <Lock size={28} className="text-nayarit-orange" />,
                title: 'Seguridad y Privacidad',
                desc: 'Tus datos están encriptados. El conductor solo ve sus rutas asignadas, no las de los demás.',
              },
              {
                icon: <RefreshCw size={28} className="text-blue-400" />,
                title: 'Integración con tu sistema',
                desc: 'API REST para conectar con tu ERP, punto de venta o sistema de pedidos existente.',
              },
              {
                icon: <MessageSquare size={28} className="text-green-500" />,
                title: 'Soporte Prioritario 24/7',
                desc: 'Acceso directo a un asesor por WhatsApp. Tiempo de respuesta promedio: 4 minutos.',
              },
              {
                icon: <Target size={28} className="text-slate-700" />,
                title: 'Onboarding Personalizado',
                desc: 'Un especialista te ayuda a configurar todo en menos de 2 horas. Incluido en Elite.',
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-nayarit-orange/30 hover:bg-white transition-all group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planes de precios ───────────────────────────────────────── */}
      <section id="planes" className="py-20 bg-slate-950 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Elige tu plan. <span className="text-yellow-400">Crece tu negocio.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Sin contratos forzosos. Sin sorpresas. Cancela cuando quieras.
            </p>

            {/* Toggle mensual / anual */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-full">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-bold text-sm transition-all',
                  !annual ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                )}
              >
                Mensual
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2',
                  annual ? 'bg-yellow-400 text-slate-900' : 'text-slate-400 hover:text-white'
                )}
              >
                Anual
                <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                  -40%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                annual={annual}
                onCTA={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              />
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <Shield size={32} className="text-yellow-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Garantía de devolución de 30 días, sin preguntas</p>
              <p className="text-slate-400 text-sm">Si en los primeros 30 días sientes que Ruta Pro Elite no fue lo que esperabas, te devolvemos el 100% de tu pago. Así de simple.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimoniales ───────────────────────────────────────────── */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-4 tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-slate-500 text-center mb-14">
            Negocios reales, resultados reales.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black text-slate-600">
                    {t.image}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold text-center">
                  {t.savings}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={cn('shrink-0 text-slate-400 transition-transform', openFaq === i && 'rotate-180')}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Form / CTA final ────────────────────────────────────── */}
      <section id="demo" className="py-24 bg-slate-900 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
            <TrendingUp size={14} />
            Solicita tu Demo Gratuita
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Empieza hoy. <span className="text-yellow-400">Sin costo.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Un especialista te contacta en menos de 2 horas para configurar tu prueba de 14 días con el plan Elite completo.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Tu nombre
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto Hernández"
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  WhatsApp o Teléfono
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 311 123 4567"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Tipo de negocio
                </label>
                <select
                  required
                  value={leadForm.business}
                  onChange={e => setLeadForm({ ...leadForm, business: e.target.value })}
                  className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                >
                  <option value="" className="text-slate-900">Selecciona...</option>
                  <option value="tortilleria" className="text-slate-900">Tortillería / Panadería con reparto</option>
                  <option value="maquinaria" className="text-slate-900">Distribuidora de maquinaria / refacciones</option>
                  <option value="servicio" className="text-slate-900">Empresa de servicio técnico en campo</option>
                  <option value="distribucion" className="text-slate-900">Distribuidora / paquetería local</option>
                  <option value="otro" className="text-slate-900">Otro tipo de reparto o logística</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-yellow-400 text-slate-900 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-3"
              >
                <Zap size={22} />
                QUIERO MI DEMO GRATIS
              </button>
              <p className="text-center text-xs text-slate-500">
                Sin spam. Te contactamos solo por WhatsApp para coordinar tu demo.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-yellow-400/30 rounded-3xl p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">¡Listo, {leadForm.name.split(' ')[0]}!</h3>
              <p className="text-slate-400 mb-6">
                Recibimos tu solicitud. Un especialista de Ruta Pro te escribirá al <strong className="text-white">{leadForm.phone}</strong> en menos de 2 horas para configurar tu prueba gratuita.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                <Award size={16} />
                14 días de Elite gratis — Sin tarjeta
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Footer del funnel ────────────────────────────────────────── */}
      <div className="bg-slate-950 py-8 px-4 text-center text-slate-500 text-xs">
        <p>© 2026 Ruta Pro Elite · Parte del ecosistema Gobernanza Digital CX · Powered by Google Cloud AI</p>
        <p className="mt-2">Soporte: +52 384 102 9017 · Tepic, Nayarit, México</p>
      </div>
    </div>
  );
};

export default RutaProEliteFunnel;
