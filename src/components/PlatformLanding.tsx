import React, { useState, useEffect } from 'react';
import {
  Menu, Radio, Shield, Leaf, HeartPulse, Bus,
  TrendingUp, ArrowRight, UsersRound, ShieldAlert,
  Utensils, Activity, MoreHorizontal, X, LayoutDashboard,
  FileCheck, Globe, Scale
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

interface PlatformLandingProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive', subView?: string, action?: string) => void;
}

// Paleta Wixárika / Huichol / Cora — colores sagrados del Pueblo
const W = {
  pink:   '#E5007A',   // Rosa Wixárika — nierika
  amber:  '#FFB300',   // Ámbar sagrado — maíz / peyote
  cyan:   '#00BCD4',   // Turquesa del Pacífico — agua
  orange: '#FF6B35',   // Naranja Cora — fuego ceremonial
  violet: '#7C3AED',   // Violeta Huichol — nierika profundo
  green:  '#059669',   // Verde sierra — naturaleza nayarita
  navy:   '#0a1e4a',   // Azul institucional
} as const;

const carouselItems: Array<{
  id: number; num: string; tag: string; title: string; subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string; img: string;
  navigate: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive';
}> = [
  {
    id: 1, num: '01', tag: 'TRANSPORTE INTELIGENTE', title: 'Ruta PRO',
    subtitle: 'GPS en tiempo real para toda la red de transporte público de Tepic y el estado',
    icon: Bus, accentColor: '#2563EB',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&h=1100&fit=crop',
    navigate: 'c5',
  },
  {
    id: 2, num: '02', tag: 'URGENCIAS CON IA', title: 'Triage Médico',
    subtitle: 'Clasificación inteligente de pacientes — de la calle al expediente en minutos',
    icon: HeartPulse, accentColor: '#DC2626',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&h=1100&fit=crop',
    navigate: 'citizen',
  },
  {
    id: 3, num: '03', tag: 'CAMPO INTELIGENTE', title: 'AgroVisión 3D',
    subtitle: 'Monitoreo satelital y drones para maximizar la producción agrícola nayarita',
    icon: Leaf, accentColor: '#059669',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&h=1100&fit=crop',
    navigate: 'citizen',
  },
  {
    id: 4, num: '04', tag: 'GOBIERNO ABIERTO', title: 'Gobernanza Digital',
    subtitle: 'Presupuestos, trámites y transparencia en un solo portal ciudadano',
    icon: Shield, accentColor: '#7C3AED',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&h=1100&fit=crop',
    navigate: 'executive',
  },
  {
    id: 5, num: '05', tag: 'BIENESTAR DIGITAL', title: 'Tu Salud',
    subtitle: 'Expediente médico digital, citas en línea y toda la red de salud del estado',
    icon: Activity, accentColor: '#DB2777',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&h=1100&fit=crop',
    navigate: 'citizen',
  },
  {
    id: 6, num: '06', tag: 'CULTURA Y SABOR', title: 'Nayarit Chef',
    subtitle: 'De la pesca artesanal a la alta cocina — sabores únicos de la costa del Pacífico',
    icon: Utensils, accentColor: '#D97706',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&h=1100&fit=crop',
    navigate: 'citizen',
  },
];

const OjosEscena = () => {
  const [offset, setOffset] = useState({ cx: 0, cy: 0, tx: 0, ty: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let currentTx = 0, currentTy = 0;
    let currentCx = 0, currentCy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      currentTx = (e.clientX / window.innerWidth - 0.5) * 2;
      currentTy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        currentTx = Math.max(-1, Math.min(1, e.gamma / 30));
        currentTy = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      }
    };
    const isTouch = 'ontouchstart' in window;
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }
    const animate = () => {
      currentCx += (currentTx - currentCx) * 0.05;
      currentCy += (currentTy - currentCy) * 0.05;
      setOffset({ cx: currentCx, cy: currentCy, tx: currentTx, ty: currentTy });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ojos-escena fixed inset-0 opacity-20 pointer-events-none z-0" id="ojosEscena">
      <div className="ojo ojo-a" style={{ transform: `translate(${offset.cx * 30}px, ${offset.cy * 30}px) scale(1.2)`, left: '5%', bottom: '10%' }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>
      <div className="ojo ojo-b" style={{ transform: `translate(${offset.cx * 50}px, ${offset.cy * 50}px) rotate(15deg)`, right: '8%', top: '15%' }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>
      <div className="ojo ojo-c" style={{ transform: `translate(${offset.cx * 80}px, ${offset.cy * 80}px) scale(0.8)`, left: '15%', top: '10%' }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div>
        </div>
      </div>
    </div>
  );
};

export const PlatformLanding = ({ onNavigate }: PlatformLandingProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileNavItems = [
    { label: 'Panel C5 — Mando Unificado', sub: 'Monitoreo, alertas y control en tiempo real', nav: 'c5' as const, color: W.cyan, Icon: LayoutDashboard },
    { label: 'Servicios Ciudadanos', sub: 'Trámites, salud, transporte y más', nav: 'citizen' as const, color: W.pink, Icon: UsersRound },
    { label: 'Panel Ejecutivo', sub: 'KPIs, gabinete y transparencia fiscal', nav: 'executive' as const, color: W.amber, Icon: TrendingUp },
    { label: 'Marco Normativo', sub: 'LFEA · LGMR · INAI · LFPDPPP · Art. 6 CPEUM', nav: 'dev' as const, color: W.violet, Icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans overflow-x-hidden selection:bg-pink-100 relative">
      <OjosEscena />

      {/* Barra Nierika — franja de colores Wixárika */}
      <div
        className="h-2 w-full"
        style={{ background: `linear-gradient(90deg, ${W.pink} 0%, ${W.amber} 20%, ${W.cyan} 40%, ${W.violet} 60%, ${W.orange} 80%, ${W.pink} 100%)` }}
      ></div>

      {/* === MENÚ MÓVIL OVERLAY === */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: W.navy }}>
          {/* Header del menú */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${W.pink}, ${W.violet})` }}
              >
                <Radio className="text-white w-5 h-5" />
              </div>
              <span className="font-serif font-black text-white text-xl">NayaritDigital</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl text-white border border-white/15"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Ítems de navegación */}
          <nav className="flex flex-col gap-2 p-5 flex-1 overflow-y-auto">
            {mobileNavItems.map(({ label, sub, nav, color, Icon }) => (
              <button
                key={nav}
                onClick={() => { onNavigate(nav); setMobileMenuOpen(false); }}
                className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all border border-white/5 hover:border-white/15"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40`, color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm leading-tight">{label}</div>
                  <div className="text-xs text-slate-400 mt-1">{sub}</div>
                </div>
              </button>
            ))}
          </nav>

          {/* Pie legal del menú */}
          <div className="p-5 border-t border-white/10">
            <div
              className="h-1 w-full rounded-full mb-4"
              style={{ background: `linear-gradient(90deg, ${W.pink}, ${W.amber}, ${W.cyan})` }}
            ></div>
            <p className="text-[0.6rem] text-slate-500 text-center leading-relaxed">
              Plataforma alineada con LFEA · LGMR · INAI · LFPDPPP · Estrategia Nacional Digital México
            </p>
          </div>
        </div>
      )}

      {/* === HEADER === */}
      <header className="px-5 md:px-12 py-5 flex justify-between items-center relative z-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${W.pink}, ${W.violet})` }}
          >
            <Radio className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-black text-xl tracking-tight" style={{ color: W.navy }}>
              Nayarit<span style={{ color: W.pink }}>Digital</span>
            </h1>
            <p className="text-[0.52rem] uppercase tracking-[0.22em] font-bold text-slate-400">
              Marco Legal Federal · Plan 2025–2030
            </p>
          </div>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          <button onClick={() => onNavigate('citizen')} className="text-xs font-bold text-slate-500 hover:text-[#0a1e4a] transition-colors uppercase tracking-widest">Servicios</button>
          <button onClick={() => onNavigate('executive')} className="text-xs font-bold text-slate-500 hover:text-[#0a1e4a] transition-colors uppercase tracking-widest">Transparencia</button>
          <button onClick={() => onNavigate('citizen', 'services', 'triage')} className="text-xs font-bold text-slate-500 hover:text-[#0a1e4a] transition-colors uppercase tracking-widest">Salud</button>
          <button onClick={() => onNavigate('dev')} className="text-xs font-bold text-slate-500 hover:text-[#0a1e4a] transition-colors uppercase tracking-widest">Marco Legal</button>

          {/* Botón ••• — acceso directo al Panel C5 */}
          <button
            onClick={() => onNavigate('c5')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-white transition-all hover:opacity-90 shadow-lg shadow-pink-500/30"
            style={{ background: `linear-gradient(135deg, ${W.pink}, ${W.violet})` }}
            title="Panel C5 — Control y Monitoreo"
          >
            <MoreHorizontal className="w-4 h-4" />
            C5 Panel
          </button>

          <button
            onClick={() => onNavigate('dev')}
            className="text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            style={{ backgroundColor: W.navy }}
          >
            Acceso Élite
          </button>
        </nav>

        {/* Móvil: botón ••• (C5) + hamburguesa */}
        <div className="lg:hidden flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('c5')}
            className="p-2.5 rounded-xl text-white shadow-md flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${W.pink}, ${W.violet})` }}
            title="Panel C5"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 bg-white shadow-md rounded-xl border border-slate-100"
          >
            <Menu className="w-5 h-5" style={{ color: W.navy }} />
          </button>
        </div>
      </header>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="px-5 md:px-12 py-10 md:py-20 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-14 xl:gap-24 items-center">

          {/* Columna izquierda: Copy + CTAs */}
          <div className="xl:w-1/2 flex flex-col justify-center shrink-0">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <div className="h-[1px] w-10 opacity-50" style={{ backgroundColor: W.pink }}></div>
              <span className="font-black tracking-[0.22em] text-[0.65rem] uppercase" style={{ color: W.pink }}>
                Estrategia Nacional Digital · Gobierno de Nayarit
              </span>
              <div className="h-[1px] w-10 opacity-50" style={{ backgroundColor: W.pink }}></div>
            </div>

            {/* Headline con gradiente Wixárika */}
            <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-black leading-[0.95] tracking-tighter mb-7" style={{ color: W.navy }}>
              Plataforma <br />
              <span
                className="italic font-medium bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${W.pink}, ${W.violet}, ${W.cyan})` }}
              >
                Digital
              </span>
              <br />de Nayarit
            </h2>

            {/* Descripción con referencias legales */}
            <p className="text-slate-600 text-lg leading-relaxed mb-3 max-w-xl font-semibold">
              Ecosistema gubernamental alineado con la{' '}
              <span style={{ color: W.pink }}>Ley General de Mejora Regulatoria</span>,
              la <span style={{ color: W.violet }}>LFEA</span>{' '}
              y los lineamientos del <span style={{ color: W.cyan }}>INAI</span>.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xl">
              Datos ciudadanos bajo LFPDPPP · Trámites con valor jurídico (Art. 7 LFEA) ·
              Gobierno abierto por Art. 6 CPEUM · 22 municipios de Nayarit integrados.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button
                onClick={() => onNavigate('citizen')}
                className="text-white px-9 py-4 rounded-full text-base font-bold transition-all flex items-center gap-3 group hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${W.pink}, ${W.violet})`,
                  boxShadow: `0 20px 50px -10px ${W.pink}55`,
                }}
              >
                Explorar Servicios <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('executive')}
                className="flex items-center gap-3 font-bold hover:gap-5 transition-all group"
                style={{ color: W.navy }}
              >
                <span className="text-sm">Plan Estatal 2025–2030</span>
                <div className="w-10 h-[2px] group-hover:w-16 transition-all rounded-full" style={{ backgroundColor: W.amber }}></div>
              </button>
            </div>

            {/* Badges de cumplimiento legal */}
            <div className="grid grid-cols-2 gap-5 max-w-md border-t border-slate-100 pt-8">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${W.pink}12` }}
                >
                  <FileCheck className="w-4 h-4" style={{ color: W.pink }} />
                </div>
                <div>
                  <h4 className="text-sm font-black" style={{ color: W.navy }}>LFEA · Firma Digital</h4>
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Valor jurídico pleno</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${W.cyan}12` }}
                >
                  <Scale className="w-4 h-4" style={{ color: W.cyan }} />
                </div>
                <div>
                  <h4 className="text-sm font-black" style={{ color: W.navy }}>INAI · Privacidad</h4>
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-bold mt-0.5">LFPDPPP certificado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Carrusel 3D */}
          <div className="xl:w-1/2 w-full max-w-[440px] md:max-w-[490px] relative h-[590px] md:h-[710px] flex items-center justify-center">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[Autoplay, EffectCards, Pagination]}
              className="w-full h-[550px] md:h-[670px]"
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
            >
              {carouselItems.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.55)] cursor-grab active:cursor-grabbing group"
                  onClick={() => onNavigate(item.navigate)}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50"></div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-2/3"
                      style={{ background: `linear-gradient(to top, ${item.accentColor}55, transparent)` }}
                    ></div>
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: item.accentColor }}></div>
                    <div className="absolute top-7 left-7 right-7 flex justify-between items-center z-10">
                      <span
                        className="text-[0.55rem] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur-md border text-white"
                        style={{ backgroundColor: `${item.accentColor}35`, borderColor: `${item.accentColor}70` }}
                      >
                        {item.tag}
                      </span>
                      <span className="font-serif font-black text-white/10 text-5xl leading-none select-none">{item.num}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {React.createElement(item.icon, { className: 'w-56 h-56 text-white opacity-[0.04]' })}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <div className="w-12 h-[3px] mb-4 rounded-full" style={{ backgroundColor: item.accentColor }}></div>
                      <h3 className="font-serif font-black text-[1.9rem] text-white leading-[1.1] mb-3 drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed mb-6 font-medium">
                        {item.subtitle}
                      </p>
                      <div
                        className="w-full py-3.5 rounded-xl text-[0.65rem] font-black uppercase tracking-[0.25em] text-center text-white/80 backdrop-blur-md border border-white/15 hover:bg-white hover:text-[#0a1e4a] transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                      >
                        Explorar módulo →
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>

      {/* === BARRA DE MARCO NORMATIVO === */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 pb-10 relative z-20 mt-8 xl:mt-0">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/60 p-5 md:p-8 flex flex-wrap justify-center md:justify-between items-center gap-6 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle at 10px 10px, ${W.pink} 2px, transparent 0)`, backgroundSize: '20px 20px' }}
          ></div>
          <div
            className="absolute right-0 top-0 bottom-0 w-24 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle at 10px 10px, ${W.cyan} 2px, transparent 0)`, backgroundSize: '20px 20px' }}
          ></div>

          {[
            { Icon: Globe, color: W.pink, title: 'Estrategia Nacional Digital', sub: 'Alineada con END México' },
            { Icon: UsersRound, color: W.cyan, title: 'Datos Abiertos · Art. 69 LGMR', sub: 'Gobierno transparente por ley' },
            { Icon: ShieldAlert, color: W.violet, title: 'LFPDPPP · Datos INAI', sub: 'Protección certificada' },
            { Icon: Leaf, color: W.green, title: 'Plan Estatal 2025–2030', sub: 'Desarrollo sostenible Nayarit' },
          ].map(({ Icon, color, title, sub }, i, arr) => (
            <React.Fragment key={title}>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15`, color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-700 leading-tight">{title}</p>
                  <p className="text-[0.58rem] uppercase tracking-widest text-slate-400 font-bold mt-0.5">{sub}</p>
                </div>
              </div>
              {i < arr.length - 1 && <div className="hidden md:block w-px h-10 bg-slate-100"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* === FOOTER INSTITUCIONAL WIXÁRIKA === */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 pb-16 relative z-20">
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">

          {/* Franja Nierika multicolor */}
          <div
            className="h-3 w-full"
            style={{ background: `linear-gradient(90deg, ${W.pink} 0%, ${W.amber} 18%, ${W.cyan} 36%, ${W.violet} 54%, ${W.orange} 72%, ${W.green} 88%, ${W.pink} 100%)` }}
          ></div>

          <div className="p-8 md:p-12 relative overflow-hidden" style={{ backgroundColor: W.navy }}>
            {/* Patrón de puntos decorativo */}
            <div
              className="absolute right-0 top-0 bottom-0 w-72 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 12px 12px, rgba(255,255,255,0.04) 2px, transparent 0)`,
                backgroundSize: '28px 28px',
              }}
            ></div>
            {/* Rombo nierika decorativo */}
            <div
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 rotate-45 opacity-5 pointer-events-none border-4"
              style={{ borderColor: W.amber }}
            ></div>

            {/* Fila superior: identidad + badges legales */}
            <div className="flex flex-wrap justify-between items-start gap-8 mb-10 relative z-10">
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shrink-0"
                  style={{ background: `linear-gradient(135deg, ${W.pink}25, ${W.violet}25)` }}
                >
                  <ShieldAlert className="w-8 h-8" style={{ color: W.amber }} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-black tracking-tight text-white">
                    Nayarit Digital
                  </h3>
                  <p className="text-sm font-semibold mt-1" style={{ color: W.cyan }}>
                    Plataforma Estatal de Gobernanza · Plan 2025–2030
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['LFEA', 'INAI', 'LGMR', 'LFPDPPP', 'Art. 6 CPEUM'].map((badge) => (
                  <span
                    key={badge}
                    className="text-[0.55rem] font-black tracking-widest px-2.5 py-1 rounded-full border uppercase"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid de estadísticas con colores Wixárika */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8 mb-10 relative z-10">
              {[
                { value: '1.2M', label: 'Ciudadanos', color: W.amber },
                { value: '22', label: 'Municipios', color: W.cyan },
                { value: '6', label: 'Módulos activos', color: W.pink },
                { value: '100%', label: 'Código abierto', color: W.violet },
              ].map(({ value, label, color }) => (
                <div key={label}>
                  <div className="text-3xl font-black font-serif" style={{ color }}>{value}</div>
                  <div className="text-[0.6rem] uppercase tracking-widest font-bold text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Pie: disclaimer legal + botón Panel de Control */}
            <div className="flex flex-wrap justify-between items-end gap-6 relative z-10">
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Sistema alineado con la{' '}
                <span className="text-slate-400 font-semibold">Ley Federal de Firma Electrónica Avanzada (LFEA)</span>,{' '}
                <span className="text-slate-400 font-semibold">Ley General de Mejora Regulatoria (LGMR)</span>,
                política de datos personales del{' '}
                <span className="text-slate-400 font-semibold">INAI</span>,
                Estrategia Nacional Digital y Plan Estatal de Desarrollo de Nayarit 2025–2030.
              </p>
              <button
                onClick={() => onNavigate('executive')}
                className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-xl hover:opacity-90 shrink-0"
                style={{ backgroundColor: W.amber, color: W.navy, boxShadow: `0 10px 40px -5px ${W.amber}60` }}
              >
                <LayoutDashboard className="w-4 h-4" />
                Panel de Control
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
