import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  X,
  MessageSquare,
  ChevronRight,
  Zap,
  BarChart3,
  Bell,
  FileText,
  Shield,
  Navigation,
  Star,
  Users,
  ArrowRight,
  Smartphone,
  LifeBuoy,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';

const WHATSAPP_BASE = 'https://wa.me/5213841029017';

const waMsgLink = (msg: string) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;

export const RutaProEliteFunnel: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ─── SECTION 1 — HERO ───────────────────────────────────────────────────────
  const Hero = () => (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 py-24">
      <div className="absolute inset-0 data-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-950/10 via-transparent to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nayarit-orange/15 border border-nayarit-orange/30 text-nayarit-orange text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <div className="w-2 h-2 rounded-full bg-nayarit-orange animate-pulse" />
            Nuevo · Solución para PyMEs Mexicanas
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            Controla tus Rutas.{' '}
            <span className="gold-gradient">Entrega Más.</span>
            <br />
            Gana Más.
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            GPS en tiempo real, rutas optimizadas por IA y alertas automáticas
            por WhatsApp. Diseñado para tortillerías, talleres de maquinaria y
            empresas de reparto.
          </p>

          {/* Pricing highlight */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-8 py-5 mb-10">
            <div className="text-center">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Plan Mensual</p>
              <p className="text-2xl font-bold text-slate-300">$599 <span className="text-sm font-normal text-slate-500">MXN/mes</span></p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-nayarit-orange text-xs font-bold uppercase tracking-widest mb-1">★ Plan Anual — Más Popular</p>
              <p className="text-3xl font-bold text-white">$4,799 <span className="text-sm font-normal text-slate-400">MXN/año</span></p>
              <p className="text-xs text-emerald-400 font-bold mt-0.5">Ahorras $2,389 MXN · 33% OFF</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={waMsgLink('Hola, quiero activar el Plan Anual de Ruta Pro Elite para mi negocio')}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-nayarit-orange text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              Activar Plan Anual
            </a>
            <a
              href="#ruta-features"
              className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Ver cómo funciona
              <ChevronRight size={20} />
            </a>
          </div>

          {/* Vertical chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { emoji: '🫓', label: 'Tortillerías' },
              { emoji: '⚙️', label: 'Maquinaria & Talleres' },
              { emoji: '🚚', label: 'Empresas de Reparto' },
            ].map((v) => (
              <span
                key={v.label}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-medium"
              >
                {v.emoji} {v.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );

  // ─── SECTION 2 — PAIN POINTS ─────────────────────────────────────────────────
  const PainPoints = () => {
    const pains = [
      {
        emoji: '🫓',
        vertical: 'Tortillerías',
        question: '¿Sabes dónde está tu repartidor en este momento?',
        pains: [
          'Choferes que alargan las rutas sin que te enteres',
          'Clientes que llaman porque la tortilla no llegó',
          'Gastos de gasolina que no cuadran con las rutas',
          'Reportes manuales al final del día (si es que llegan)',
        ],
        color: 'border-orange-200 bg-orange-50',
        headerColor: 'text-orange-600 bg-orange-100',
      },
      {
        emoji: '⚙️',
        vertical: 'Maquinaria & Talleres',
        question: '¿Cuánto tiempo pierde tu técnico buscando cómo llegar?',
        pains: [
          'Clientes esperando sin saber cuándo llega el técnico',
          'Técnicos que dicen "ya fui" pero no hay evidencia',
          'Rutas que dependen de la memoria del chofer',
          'Sin historial de visitas ni reportes de servicio',
        ],
        color: 'border-blue-200 bg-blue-50',
        headerColor: 'text-blue-600 bg-blue-100',
      },
      {
        emoji: '🚚',
        vertical: 'Empresas de Reparto',
        question: '¿Tus clientes llaman preguntando dónde está su pedido?',
        pains: [
          'Sin seguimiento en tiempo real para el cliente final',
          'No sabes qué pedidos se entregaron y cuáles no',
          'Choferes que priorizan entregas por conveniencia propia',
          'Imposible calcular el rendimiento real por chofer',
        ],
        color: 'border-emerald-200 bg-emerald-50',
        headerColor: 'text-emerald-600 bg-emerald-100',
      },
    ];

    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
                <AlertCircle size={14} />
                ¿Te suena familiar?
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                El Caos de las Rutas Sin Control
              </h2>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto text-lg">
                Estos problemas le cuestan a las PyMEs mexicanas entre{' '}
                <span className="font-bold text-slate-900">$5,000 y $20,000 MXN al mes</span>{' '}
                en ineficiencias.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn('rounded-3xl p-8 border-2', p.color)}
              >
                <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6', p.headerColor)}>
                  {p.emoji} {p.vertical}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight">
                  {p.question}
                </h3>
                <ul className="space-y-3">
                  {p.pains.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-600 text-sm">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <X size={12} className="text-red-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ─── SECTION 3 — BEFORE / AFTER ───────────────────────────────────────────────
  const BeforeAfter = () => (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              De la Adivinanza a la{' '}
              <span className="text-nayarit-orange">Certeza Total</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] bg-white border-2 border-slate-200 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <AlertCircle size={160} />
            </div>
            <div className="mb-8">
              <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest">
                Sin Ruta Pro
              </span>
              <h3 className="text-3xl font-bold text-slate-900 mt-4">
                Operación Manual
              </h3>
            </div>
            <ul className="space-y-5 flex-1">
              {[
                'Llamar al chofer cada hora para saber dónde está',
                'Rutas dibujadas en papel o en la memoria',
                'Clientes sin respuesta hasta que el chofer regresa',
                'Gastos de combustible sin justificación',
                'Sin evidencia de entregas completadas',
                'Reportes al final del día (si llegan)',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="text-red-500" size={14} />
                  </div>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] bg-slate-900 border border-nayarit-orange/30 relative overflow-hidden flex flex-col shadow-2xl shadow-orange-500/10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Navigation size={160} className="text-nayarit-orange" />
            </div>
            <div className="mb-8">
              <span className="px-4 py-1.5 rounded-full bg-nayarit-orange/20 text-nayarit-orange text-xs font-bold uppercase tracking-widest border border-nayarit-orange/30">
                ★ Con Ruta Pro Elite
              </span>
              <h3 className="text-3xl font-bold text-white mt-4">
                Control Inteligente
              </h3>
            </div>
            <ul className="space-y-5 flex-1">
              {[
                'GPS en vivo: sabes dónde está cada repartidor al segundo',
                'IA optimiza las rutas automáticamente cada mañana',
                'El cliente recibe WhatsApp cuando su pedido va en camino',
                'Alertas de paradas largas o desvíos de ruta',
                'Foto y firma digital como evidencia de entrega',
                'Reporte de desempeño por chofer listo en segundos',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="text-emerald-400" size={14} />
                  </div>
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // ─── SECTION 4 — FEATURES ─────────────────────────────────────────────────────
  const Features = () => {
    const features = [
      {
        icon: <MapPin size={28} className="text-nayarit-orange" />,
        title: 'GPS en Tiempo Real',
        desc: 'Rastrea cada vehículo y repartidor en un mapa en vivo. Sin actualizaciones cada 5 minutos — es instantáneo.',
      },
      {
        icon: <Navigation size={28} className="text-blue-400" />,
        title: 'Rutas Optimizadas por IA',
        desc: 'El sistema planea la ruta más eficiente cada día. Menos gasolina, más entregas, menos tiempo en tráfico.',
      },
      {
        icon: <Bell size={28} className="text-emerald-400" />,
        title: 'Alertas por WhatsApp',
        desc: 'Tu cliente recibe un mensaje automático cuando su pedido va en camino y cuando se entregó. Sin que hagas nada.',
      },
      {
        icon: <FileText size={28} className="text-purple-400" />,
        title: 'Reportes Automáticos',
        desc: 'Reporte diario de entregas completadas, tiempos por parada y rendimiento por chofer. En PDF, listo para revisar.',
      },
      {
        icon: <Smartphone size={28} className="text-yellow-400" />,
        title: 'App Móvil para Choferes',
        desc: 'App fácil de usar para iOS y Android. El chofer ve su ruta, registra entregas y tú ves todo en tiempo real.',
      },
      {
        icon: <LifeBuoy size={28} className="text-red-400" />,
        title: 'Soporte Técnico 24/7',
        desc: 'Si algo no funciona, estamos aquí. Chat, WhatsApp o llamada. Tiempo de respuesta menor a 30 minutos.',
      },
    ];

    return (
      <section id="ruta-features" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 data-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <Zap size={14} className="text-nayarit-orange" />
                Todo lo que incluye Ruta Pro Elite
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Las 6 Herramientas que{' '}
                <span className="text-nayarit-orange">Cambian tu Operación</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 hover:border-white/20 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ─── SECTION 5 — PRICING ──────────────────────────────────────────────────────
  const Pricing = () => {
    const monthlyFeatures = [
      'GPS en tiempo real (hasta 3 vehículos)',
      'Rutas optimizadas automáticamente',
      'App móvil para choferes (iOS y Android)',
      'Alertas por WhatsApp al cliente',
      'Soporte por chat en horario hábil',
    ];

    const annualFeatures = [
      'GPS en tiempo real (vehículos ilimitados)',
      'Rutas optimizadas con IA avanzada',
      'App móvil para choferes (iOS y Android)',
      'Alertas por WhatsApp al cliente',
      'Reportes automáticos en PDF',
      'Historial completo de entregas',
      'Control de choferes y turnos',
      'Integraciones con WhatsApp Business',
      'Firma y foto digital en entrega',
      'Dashboard ejecutivo con métricas',
      'Soporte técnico 24/7 prioritario',
      'Capacitación inicial incluida',
      'Factura fiscal (CFDI)',
      'Acceso anticipado a nuevas funciones',
    ];

    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Elige tu Plan
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                Sin contratos ocultos. Sin letra chiquita. Cancela cuando quieras.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-slate-50 border-2 border-slate-200 flex flex-col"
            >
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Plan Mensual
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-slate-900">$599</span>
                  <span className="text-slate-500 mb-2">MXN/mes</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1 mb-10">
                {monthlyFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={waMsgLink('Hola, quiero el Plan Mensual de Ruta Pro Elite')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-4 rounded-2xl border-2 border-slate-900 text-slate-900 font-bold text-lg hover:bg-slate-900 hover:text-white transition-all"
              >
                Empezar Mensual
              </a>
            </motion.div>

            {/* Annual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-[2.5rem] bg-slate-900 border-2 border-nayarit-orange shadow-2xl shadow-orange-500/20 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Star size={120} className="text-nayarit-orange" />
              </div>
              <div className="mb-8 relative z-10">
                <span className="inline-block px-3 py-1 bg-nayarit-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                  ★ Más Popular · Mejor Valor
                </span>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Plan Anual
                </p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">$4,799</span>
                  <span className="text-slate-400 mb-2">MXN/año</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 line-through text-sm">$7,188</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                    Ahorras $2,389 · 33% OFF
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-2">= solo $400/mes facturado anualmente</p>
              </div>
              <ul className="space-y-3 flex-1 mb-10 relative z-10">
                {annualFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={waMsgLink('Hola, quiero activar el Plan Anual de Ruta Pro Elite. ¿Cómo procedo?')}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full text-center py-4 rounded-2xl bg-nayarit-orange text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Activar Plan Anual Ahora
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-slate-400 text-sm">
              ¿Tienes más de 5 vehículos o necesitas un plan personalizado?{' '}
              <a
                href={waMsgLink('Hola, necesito un plan empresarial para Ruta Pro Elite con más de 5 vehículos')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nayarit-orange font-bold hover:underline"
              >
                Contáctanos para precio especial →
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    );
  };

  // ─── SECTION 6 — TESTIMONIALS ────────────────────────────────────────────────
  const Testimonials = () => {
    const testimonials = [
      {
        initials: 'AC',
        name: 'Ana Contreras',
        business: 'Tortillería "El Metate"',
        location: 'Tepic, Nayarit',
        stars: 5,
        quote:
          'Antes llamaba a mis 3 repartidores 4 veces al día. Ahora los veo en el mapa desde mi celular. En 6 semanas pasamos de 80 a 130 clientes diarios sin contratar más personal.',
        vertical: '🫓 Tortillería',
      },
      {
        initials: 'RM',
        name: 'Roberto Medina',
        business: 'Maquinaria Agrícola ROMAR',
        location: 'Guadalajara, Jalisco',
        stars: 5,
        quote:
          'Mis clientes dejaron de quejarse porque ya saben cuándo llega el técnico. El WhatsApp automático fue un cambio enorme. Me ahorré contratar una recepcionista solo para eso.',
        vertical: '⚙️ Maquinaria',
      },
      {
        initials: 'SV',
        name: 'Sofía Vega',
        business: 'Reparto Express del Norte',
        location: 'Monterrey, NL',
        stars: 5,
        quote:
          'El reporte de fin del día me dice exactamente qué se entregó, a qué hora y qué no se pudo. Ya no hay pretextos. La productividad de mis choferes subió 35% en el primer mes.',
        vertical: '🚚 Delivery',
      },
    ];

    return (
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Negocios que Ya Tomaron{' '}
                <span className="text-nayarit-orange">el Control</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 italic leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-nayarit-orange flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.business}</p>
                    <p className="text-slate-600 text-xs">{t.location}</p>
                  </div>
                </div>
                <span className="mt-4 text-xs font-bold text-nayarit-orange">{t.vertical}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <TrendingUp size={20} className="text-emerald-400" />
              <p className="text-slate-300 text-sm">
                Promedio de nuestros clientes:{' '}
                <span className="font-bold text-white">+32% de entregas completadas</span>{' '}
                en los primeros 30 días.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // ─── SECTION 7 — FAQ ──────────────────────────────────────────────────────────
  const FaqSection = () => {
    const faqs = [
      {
        q: '¿Puedo cancelar el plan anual si no me convence?',
        a: 'Sí. Ofrecemos garantía de satisfacción de 30 días. Si en los primeros 30 días no ves resultados, te devolvemos el 100% de tu dinero sin preguntas.',
      },
      {
        q: '¿Qué pasa si mi negocio crece y necesito más vehículos?',
        a: 'El Plan Anual incluye vehículos ilimitados. Agrega todos los que necesites sin costo adicional. Si necesitas funciones más avanzadas para flotas de más de 20 unidades, contáctanos para un plan empresarial.',
      },
      {
        q: '¿Cómo es el proceso de activación?',
        a: 'En menos de 24 horas. Escribes al WhatsApp, realizas el pago, te enviamos el acceso, y en la misma semana tienes una sesión de capacitación de 1 hora con tu equipo. Tus choferes estarán usando la app al día siguiente.',
      },
      {
        q: '¿El plan anual incluye factura fiscal (CFDI)?',
        a: 'Sí. Todos los planes incluyen factura fiscal. Solo necesitas tu RFC y nos lo envías por WhatsApp al momento del pago.',
      },
      {
        q: '¿Funciona sin internet en zonas rurales?',
        a: 'La app del chofer funciona con señal de datos móviles (Telcel, AT&T, Movistar). En zonas sin señal, guarda los datos localmente y los sincroniza cuando recupera señal. El GPS satelital funciona incluso sin datos.',
      },
    ];

    return (
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <h3 className="font-bold text-slate-900">{faq.q}</h3>
                  <ChevronRight
                    className={cn(
                      'text-slate-400 shrink-0 transition-transform duration-300',
                      openFaq === i ? 'rotate-90' : ''
                    )}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6"
                  >
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ─── SECTION 8 — FINAL CTA ───────────────────────────────────────────────────
  const FinalCta = () => (
    <section className="py-24 bg-nayarit-orange relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <Truck size={300} />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/20 border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
            🚀 Precio de Lanzamiento 2026
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Activa Hoy.
            <br />
            Controla Mañana.
          </h2>
          <p className="text-white/80 text-xl mb-4 max-w-2xl mx-auto">
            Miles de PyMEs mexicanas ya controlan sus rutas con Ruta Pro Elite. No dejes que tu competencia te adelante.
          </p>
          <p className="text-white/60 text-sm mb-12">
            ✓ Activación en 24 hrs &nbsp;·&nbsp; ✓ Garantía 30 días &nbsp;·&nbsp; ✓ Sin contratos forzosos &nbsp;·&nbsp; ✓ Factura fiscal incluida
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waMsgLink('Hola, quiero activar el Plan Anual de Ruta Pro Elite. ¿Cómo procedo?')}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-5 bg-white text-nayarit-orange rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
              <MessageSquare size={24} />
              Contratar Plan Anual
              <ArrowRight size={20} />
            </a>
            <a
              href="tel:+523841029017"
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors"
            >
              <Phone size={20} />
              Llamar Ahora
            </a>
          </div>

          <p className="mt-8 text-white/60 text-xs">
            +52 384 102 9017 · Tepic, Nayarit, México
          </p>
        </motion.div>
      </div>
    </section>
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-w-0">
      <Hero />
      <PainPoints />
      <BeforeAfter />
      <Features />
      <Pricing />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </div>
  );
};
