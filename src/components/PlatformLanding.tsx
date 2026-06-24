import React, { useState, useEffect } from 'react';
import {
  Menu, Radio, BarChart2, HeartPulse, ShieldCheck,
  ArrowRight, ShieldAlert, Gift, Map, X
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

interface PlatformLandingProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive', subView?: string, action?: string) => void;
}

// Solo módulos reales y desplegados en la plataforma
const carouselItems = [
  {
    id: 1, num: '01', title: 'C5 Gobierno Digital', subtitle: 'Panel de mando unificado',
    icon: BarChart2, color: 'text-blue-400',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&h=600&fit=crop',
    route: 'c5' as const,
  },
  {
    id: 2, num: '02', title: 'Nayarit ID', subtitle: 'Identidad digital ciudadana',
    icon: ShieldCheck, color: 'text-emerald-400',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&h=600&fit=crop',
    route: 'citizen' as const,
  },
  {
    id: 3, num: '03', title: 'Salud Inteligente', subtitle: 'Triaje médico con IA offline',
    icon: HeartPulse, color: 'text-rose-400',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&h=600&fit=crop',
    route: 'citizen' as const,
  },
  {
    id: 4, num: '04', title: 'Inspector Ciudadano', subtitle: 'Auditoría anticorrupción anónima',
    icon: ShieldAlert, color: 'text-amber-400',
    img: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=400&h=600&fit=crop',
    route: 'citizen' as const,
  },
  {
    id: 5, num: '05', title: 'Canjes & Beneficios', subtitle: 'Puntos por participación cívica',
    icon: Gift, color: 'text-purple-400',
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&h=600&fit=crop',
    route: 'citizen' as const,
  },
  {
    id: 6, num: '06', title: 'Geo-Radar Urbano', subtitle: 'Reportes de ciudad en tiempo real',
    icon: Map, color: 'text-cyan-400',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&h=600&fit=crop',
    route: 'citizen' as const,
  },
];

// Fondo interactivo arte Huichol (Wixarika) — responde al mouse
const NierikaBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Capa 1: patrón nierika repetido — velocidad lenta */}
      <div
        className="absolute nierika-hero-bg"
        style={{
          inset: '-15%',
          transform: `translate(${mouse.x * 0.12}px, ${mouse.y * 0.12}px)`,
          transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Capa 2: gran nierika central giratoria + parallax */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${mouse.x * 0.22}px, ${mouse.y * 0.22}px)`,
          transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="nierika-spin-slow"
          style={{ width: 'min(95vw, 720px)', height: 'min(95vw, 720px)' }}
        >
          {/* Diamantes concéntricos — escala Wixarika */}
          <polygon points="400,12 788,400 400,788 12,400" stroke="#E5007A" strokeWidth="3" opacity="0.55"/>
          <polygon points="400,60 740,400 400,740 60,400" stroke="#00BCD4" strokeWidth="2.5" opacity="0.5"/>
          <polygon points="400,115 685,400 400,685 115,400" stroke="#FFB300" strokeWidth="2.2" opacity="0.45"/>
          <polygon points="400,170 630,400 400,630 170,400" stroke="#34a853" strokeWidth="2" opacity="0.4"/>
          <polygon points="400,225 575,400 400,575 225,400" stroke="#E5007A" strokeWidth="1.8" opacity="0.35"/>
          <polygon points="400,280 520,400 400,520 280,400" stroke="#00BCD4" strokeWidth="1.5" opacity="0.3"/>
          <polygon points="400,335 465,400 400,465 335,400" stroke="#FFB300" strokeWidth="1.2" opacity="0.28"/>

          {/* Puntas de diamante — acento Wixarika */}
          <polygon points="400,12 418,38 400,64 382,38" fill="#E5007A" opacity="0.75"/>
          <polygon points="788,400 762,418 736,400 762,382" fill="#00BCD4" opacity="0.75"/>
          <polygon points="400,788 418,762 400,736 382,762" fill="#E5007A" opacity="0.75"/>
          <polygon points="12,400 38,418 64,400 38,382" fill="#00BCD4" opacity="0.75"/>

          {/* Diamantes de esquina intermedia */}
          <polygon points="210,210 225,225 210,240 195,225" fill="#FFB300" opacity="0.55"/>
          <polygon points="590,210 605,225 590,240 575,225" fill="#FFB300" opacity="0.55"/>
          <polygon points="590,590 605,605 590,620 575,605" fill="#FFB300" opacity="0.55"/>
          <polygon points="210,590 225,605 210,620 195,605" fill="#FFB300" opacity="0.55"/>

          {/* Centro — ojo de la nierika */}
          <circle cx="400" cy="400" r="14" fill="#FFB300" opacity="0.9"/>
          <circle cx="400" cy="400" r="7"  fill="#E5007A" opacity="0.9"/>
          <circle cx="400" cy="400" r="3"  fill="#ffffff"  opacity="1"/>

          {/* Líneas cruzadas (varas del tejido) */}
          <line x1="400" y1="12"  x2="400" y2="788" stroke="#FFB300" strokeWidth="0.9" opacity="0.18"/>
          <line x1="12"  y1="400" x2="788" y2="400" stroke="#FFB300" strokeWidth="0.9" opacity="0.18"/>
          <line x1="12"  y1="12"  x2="788" y2="788" stroke="#F44336" strokeWidth="0.7" opacity="0.12"/>
          <line x1="788" y1="12"  x2="12"  y2="788" stroke="#F44336" strokeWidth="0.7" opacity="0.12"/>

          {/* Puntos de intersección */}
          <circle cx="400" cy="12"  r="7" fill="#E5007A" opacity="0.75"/>
          <circle cx="788" cy="400" r="7" fill="#00BCD4" opacity="0.75"/>
          <circle cx="400" cy="788" r="7" fill="#E5007A" opacity="0.75"/>
          <circle cx="12"  cy="400" r="7" fill="#00BCD4" opacity="0.75"/>
        </svg>
      </div>

      {/* Capa 3: cuatro ojos-nierika decorativos en esquinas */}
      <div className="absolute top-[8%] left-[6%] w-20 h-20 opacity-30 nierika-spin-slow"
           style={{ transform: `translate(${mouse.x * 0.35}px, ${mouse.y * 0.35}px) rotate(0deg)`, animationDuration: '60s' }}>
        <svg viewBox="0 0 80 80" fill="none">
          <polygon points="40,2 78,40 40,78 2,40" stroke="#FFB300" strokeWidth="2.2" opacity="0.9"/>
          <polygon points="40,14 66,40 40,66 14,40" stroke="#E5007A" strokeWidth="1.8" opacity="0.8"/>
          <polygon points="40,26 54,40 40,54 26,40" stroke="#00BCD4" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="40" cy="40" r="5" fill="#FFB300"/>
        </svg>
      </div>
      <div className="absolute bottom-[12%] right-[5%] w-28 h-28 opacity-25"
           style={{ transform: `translate(${mouse.x * 0.28}px, ${mouse.y * 0.28}px)`, animation: 'nierika-spin 70s linear infinite reverse' }}>
        <svg viewBox="0 0 80 80" fill="none">
          <polygon points="40,2 78,40 40,78 2,40" stroke="#00BCD4" strokeWidth="2.2" opacity="0.9"/>
          <polygon points="40,14 66,40 40,66 14,40" stroke="#FFB300" strokeWidth="1.8" opacity="0.8"/>
          <polygon points="40,26 54,40 40,54 26,40" stroke="#E5007A" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="40" cy="40" r="5" fill="#00BCD4"/>
        </svg>
      </div>

      {/* Gradiente de fondo marino que unifica todo */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(160deg, rgba(0,29,61,0.88) 0%, rgba(0,29,61,0.75) 40%, rgba(0,29,61,0.88) 100%)' }}
      />
    </div>
  );
};

// Ojos de Dios 3D — sensibilidad original restaurada (×0.5 mouse, ÷60 giroscopio)
const OjosEscena = () => {
  const [offset, setOffset] = useState({ cx: 0, cy: 0 });

  useEffect(() => {
    let raf: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMouse = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        tx = Math.max(-0.5, Math.min(0.5, e.gamma / 60));
        ty = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60));
      }
    };
    const onScroll = () => {
      if ('ontouchstart' in window)
        ty = Math.max(-0.5, Math.min(0.5, window.scrollY / window.innerHeight - 0.25));
    };

    const isTouch = 'ontouchstart' in window;
    if (!isTouch) window.addEventListener('mousemove', onMouse, { passive: true });
    else {
      window.addEventListener('deviceorientation', onOrientation, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      setOffset({ cx, cy });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('deviceorientation', onOrientation);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ojos-escena fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      {/* Ojo A — grande, inferior izquierdo */}
      <div className="ojo ojo-a" style={{ transform: `translate(${offset.cx * 22}px, ${offset.cy * 22}px)` }}>
        <div className="ojo-giro">
          <div className="capa c1"/><div className="capa c2"/><div className="capa c3"/>
          <div className="capa c4"/><div className="capa c5"/><div className="capa c6"/>
        </div>
      </div>
      {/* Ojo B — mediano, superior derecho */}
      <div className="ojo ojo-b" style={{ transform: `translate(${offset.cx * 40}px, ${offset.cy * 40}px)` }}>
        <div className="ojo-giro">
          <div className="capa c1"/><div className="capa c2"/><div className="capa c3"/>
          <div className="capa c4"/><div className="capa c5"/>
        </div>
      </div>
      {/* Ojo C — pequeño, superior centro */}
      <div className="ojo ojo-c" style={{ transform: `translate(${offset.cx * 60}px, ${offset.cy * 60}px)` }}>
        <div className="ojo-giro">
          <div className="capa c1"/><div className="capa c2"/><div className="capa c3"/>
          <div className="capa c4"/>
        </div>
      </div>
    </div>
  );
};

export const PlatformLanding = ({ onNavigate }: PlatformLandingProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001d3d] font-sans overflow-x-hidden selection:bg-[#E5007A]/30 relative">
      <NierikaBackground />
      <OjosEscena />

      {/* Banda cromática superior — paleta Wixarika completa */}
      <div className="h-[3px] w-full relative z-20"
           style={{ background: 'linear-gradient(90deg, #E5007A 0%, #FFB300 20%, #00BCD4 40%, #34a853 60%, #6B3FA0 80%, #E5007A 100%)' }}
      />

      {/* Header */}
      <header className="px-6 md:px-12 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-xl"
               style={{ background: 'linear-gradient(135deg, #E5007A, #6B3FA0)', boxShadow: '0 8px 30px rgba(229,0,122,0.4)' }}>
            <Radio className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-black text-xl tracking-tight text-white leading-none">
              Nayarit<span style={{ color: '#FFB300' }}>Digital</span>
            </h1>
            <p className="text-[0.55rem] uppercase tracking-[0.3em] font-bold text-white/35 mt-0.5">
              Plataforma Estatal · Excelencia Gubernamental
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {['Soluciones', 'Estrategia', 'Impacto', 'Transparencia'].map(item => (
            <button key={item}
              className="text-[0.7rem] font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">
              {item}
            </button>
          ))}
          <button
            onClick={() => onNavigate('dev')}
            className="px-6 py-2.5 rounded-full text-[0.7rem] font-bold uppercase tracking-widest transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #E5007A, #6B3FA0)', color: 'white', boxShadow: '0 4px 20px rgba(229,0,122,0.35)' }}>
            Acceso Élite
          </button>
        </nav>

        <button className="lg:hidden p-2.5 rounded-xl border border-white/10 bg-white/5"
                onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden absolute top-[5rem] left-4 right-4 z-30 rounded-2xl border border-white/10 p-6 flex flex-col gap-4"
             style={{ background: 'rgba(0,29,61,0.95)', backdropFilter: 'blur(20px)' }}>
          {['Soluciones', 'Estrategia', 'Impacto', 'Transparencia'].map(item => (
            <button key={item} className="text-sm font-bold text-white/60 text-left py-2 border-b border-white/5 hover:text-white transition-colors uppercase tracking-widest">
              {item}
            </button>
          ))}
          <button onClick={() => { onNavigate('dev'); setMenuOpen(false); }}
            className="mt-2 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-white"
            style={{ background: 'linear-gradient(135deg, #E5007A, #6B3FA0)' }}>
            Acceso Élite
          </button>
        </div>
      )}

      {/* Contenido principal */}
      <main className="px-6 md:px-12 py-12 md:py-20 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-20 items-center">

          {/* Columna izquierda: tipografía y CTAs */}
          <div className="xl:w-1/2 flex flex-col justify-center">
            {/* Etiqueta de categoría */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10" style={{ background: '#E5007A' }} />
              <span className="font-bold tracking-[0.3em] text-[0.62rem] uppercase" style={{ color: '#FFB300' }}>
                6 Módulos Activos · Plan Nayarit 2025–2030
              </span>
              <div className="h-px w-10" style={{ background: '#E5007A' }} />
            </div>

            {/* Titular principal — PNL: aspiracional + territorial + presente */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white leading-[0.92] tracking-tighter mb-8">
              La Nueva Era<br/>
              <span
                className="italic font-medium"
                style={{
                  background: 'linear-gradient(90deg, #E5007A, #FFB300 50%, #00BCD4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Digital
              </span>
              <br/>
              de Nayarit
            </h2>

            {/* Subtítulo — PNL: tres pilares, lenguaje de transformación */}
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg font-medium">
              Una plataforma de inteligencia gubernamental construida sobre transparencia radical,
              participación ciudadana activa y tecnología de vanguardia.
              Al servicio del pueblo de Nayarit.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 mb-16">
              <button
                onClick={() => onNavigate('citizen')}
                className="px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-105 flex items-center gap-3 group"
                style={{
                  background: 'linear-gradient(135deg, #E5007A, #6B3FA0)',
                  color: 'white',
                  boxShadow: '0 20px 60px rgba(229,0,122,0.45)',
                }}>
                Explorar Plataforma
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('c5')}
                className="flex items-center gap-3 font-bold hover:text-white transition-all group text-sm"
                style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span>Panel de Gobierno</span>
                <div className="w-8 h-px bg-white/30 group-hover:w-14 transition-all" />
              </button>
            </div>

            {/* Métricas — PNL: credibilidad con números reales */}
            <div className="grid grid-cols-3 gap-6 border-t pt-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div>
                <h4 className="text-3xl font-serif font-black text-white">1.2M</h4>
                <p className="text-[0.58rem] uppercase tracking-widest font-bold mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Ciudadanos</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-black" style={{ color: '#FFB300' }}>100%</h4>
                <p className="text-[0.58rem] uppercase tracking-widest font-bold mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Transparencia</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-black text-white">24/7</h4>
                <p className="text-[0.58rem] uppercase tracking-widest font-bold mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Disponibilidad</p>
              </div>
            </div>
          </div>

          {/* Columna derecha: carrusel Swiper 3D */}
          <div className="xl:w-1/2 w-full max-w-[380px] md:max-w-[420px] relative flex items-center justify-center"
               style={{ height: '540px' }}>
            {/* Halo de luz detrás del carrusel */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(229,0,122,0.18) 0%, transparent 70%)' }}
            />

            <Swiper
              effect="cards"
              grabCursor
              modules={[EffectCards, Pagination]}
              className="w-full"
              style={{ height: '500px' }}
              pagination={{ clickable: true, dynamicBullets: true }}
            >
              {carouselItems.map(item => (
                <SwiperSlide
                  key={item.id}
                  className="rounded-[2rem] overflow-hidden cursor-grab active:cursor-grabbing group card-3d"
                  style={{ boxShadow: '0 40px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}
                  onClick={() => onNavigate(item.route)}
                >
                  {/* Contenido top del card */}
                  <div className="relative z-10 p-8 pt-10 flex flex-col items-center text-center"
                       style={{ background: 'linear-gradient(180deg, rgba(0,29,61,0.97) 0%, rgba(0,29,61,0.65) 100%)' }}>
                    {/* Etiqueta módulo */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-px w-5" style={{ background: '#E5007A' }} />
                      <span className="font-mono text-[0.58rem] font-bold tracking-widest" style={{ color: '#FFB300' }}>
                        MÓDULO {item.num}
                      </span>
                      <div className="h-px w-5" style={{ background: '#E5007A' }} />
                    </div>

                    {/* Ícono del módulo */}
                    <div className={`p-4 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500 ${item.color}`}
                         style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {React.createElement(item.icon, { className: 'w-9 h-9' })}
                    </div>

                    <h3 className="font-serif font-black text-xl text-white leading-tight mb-2">{item.title}</h3>
                    <p className="font-bold text-[0.65rem] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Imagen de fondo */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-[2.5s]"
                      style={{ opacity: 0.35 }}
                    />
                    <div className="absolute inset-0"
                         style={{ background: 'linear-gradient(to top, rgba(0,29,61,0.97) 35%, transparent)' }}
                    />
                  </div>

                  {/* CTA inferior */}
                  <div className="absolute bottom-5 left-5 right-5 z-20">
                    <div className="py-3 rounded-xl text-[0.62rem] font-bold uppercase tracking-[0.18em] text-center transition-all group-hover:bg-[rgba(229,0,122,0.35)]"
                         style={{
                           background: 'rgba(229,0,122,0.15)',
                           border: '1px solid rgba(229,0,122,0.35)',
                           backdropFilter: 'blur(8px)',
                           color: 'rgba(255,255,255,0.85)',
                         }}>
                      Ingresar al Módulo
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>

      {/* Ribbon de compromiso institucional */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16 relative z-20">
        <div
          className="rounded-[2rem] p-8 md:p-12 flex flex-wrap justify-between items-center gap-8 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
          }}>
          {/* Acento nierika en esquina */}
          <div className="absolute -right-10 -top-10 w-56 h-56 opacity-15 pointer-events-none">
            <svg viewBox="0 0 80 80" fill="none" style={{ animation: 'nierika-spin 40s linear infinite' }}>
              <polygon points="40,2 78,40 40,78 2,40" stroke="#E5007A" strokeWidth="2"/>
              <polygon points="40,12 68,40 40,68 12,40" stroke="#00BCD4" strokeWidth="1.5"/>
              <polygon points="40,22 58,40 40,58 22,40" stroke="#FFB300" strokeWidth="1.2"/>
              <circle cx="40" cy="40" r="4" fill="#E5007A"/>
            </svg>
          </div>

          {/* Identidad */}
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(229,0,122,0.12)', border: '1px solid rgba(229,0,122,0.3)' }}>
              <ShieldAlert style={{ color: '#E5007A' }} className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-black text-white tracking-tight">Compromiso Nayarit</h3>
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Gobierno transparente. Ciudadanía empoderada.
              </p>
            </div>
          </div>

          {/* Métricas */}
          <div className="flex gap-10 relative z-10">
            <div className="text-center">
              <div className="text-3xl font-black font-serif" style={{ color: '#FFB300' }}>1.2M</div>
              <div className="text-[0.58rem] uppercase tracking-widest font-bold mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>Ciudadanos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black font-serif text-blue-400">20+</div>
              <div className="text-[0.58rem] uppercase tracking-widest font-bold mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>Secretarías</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black font-serif" style={{ color: '#E5007A' }}>6</div>
              <div className="text-[0.58rem] uppercase tracking-widest font-bold mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>Módulos Activos</div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative z-10">
            <button
              onClick={() => onNavigate('c5')}
              className="px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 text-white"
              style={{ background: 'linear-gradient(135deg, #E5007A, #6B3FA0)', boxShadow: '0 8px 30px rgba(229,0,122,0.35)' }}>
              Panel de Control
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
