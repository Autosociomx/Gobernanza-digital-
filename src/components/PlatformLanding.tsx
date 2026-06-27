import React, { useState, useEffect } from 'react';
import {
  Menu, Radio, Shield, Leaf, HeartPulse, Bus,
  TrendingUp, ArrowRight, UsersRound, ShieldAlert,
  Utensils, Activity
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface PlatformLandingProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive', subView?: string, action?: string) => void;
}

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
    subtitle: 'De la pesca artesanal a la alta cocina — los sabores únicos de la costa del Pacífico',
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
      {/* Ojo A - Principal (Bottom Left) */}
      <div className="ojo ojo-a" style={{
        transform: `translate(${offset.cx * 30}px, ${offset.cy * 30}px) scale(1.2)`,
        left: '5%',
        bottom: '10%'
      }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>

      {/* Ojo B - Secondary (Top Right) */}
      <div className="ojo ojo-b" style={{
        transform: `translate(${offset.cx * 50}px, ${offset.cy * 50}px) rotate(15deg)`,
        right: '8%',
        top: '15%'
      }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>

      {/* Ojo C - Tertiary (Top Left) */}
      <div className="ojo ojo-c" style={{
        transform: `translate(${offset.cx * 80}px, ${offset.cy * 80}px) scale(0.8)`,
        left: '15%',
        top: '10%'
      }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div>
        </div>
      </div>

      {/* Subtle Tech accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/5 rounded-full pointer-events-none"></div>
    </div>
  );
};

export const PlatformLanding = ({ onNavigate }: PlatformLandingProps) => {

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans overflow-x-hidden selection:bg-blue-100 relative">
      {/* Background Ojos & Tech Accents */}
      <OjosEscena />

      {/* Decorative Top Border - Subtle & Elite */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500 opacity-80"></div>

      {/* Header */}
      <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Radio className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-serif font-black text-2xl tracking-tight text-[#0f285c]">Nayarit<span className="text-blue-600">Digital</span></h1>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-slate-400">Excelencia Gubernamental</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          {['Soluciones', 'Estrategia', 'Impacto', 'Transparencia'].map((item) => (
            <button key={item} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">{item}</button>
          ))}
          <button
            onClick={() => onNavigate('dev')}
            className="bg-[#0f285c] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#0f285c]/20"
          >
            Acceso Elite
          </button>
        </nav>

        <button className="lg:hidden p-3 bg-white shadow-md rounded-xl">
          <Menu className="w-6 h-6 text-[#0f285c]" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 py-12 md:py-24 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 items-center">

          {/* Left Column: Typography & CTAs */}
          <div className="xl:w-1/2 flex flex-col justify-center shrink-0">
            <div className="flex items-center gap-3 mb-8">
               <div className="h-[1px] w-12 bg-blue-600/30"></div>
               <span className="text-blue-600 font-bold tracking-[0.3em] text-[0.7rem] uppercase">6 Módulos Desplegados</span>
               <div className="h-[1px] w-12 bg-blue-600/30"></div>
            </div>

            <h2 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-black text-[#0f285c] leading-[0.95] tracking-tighter mb-10">
               La Nueva Era <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic font-medium">Digital</span> de Nayarit
            </h2>

            <p className="text-slate-600 text-xl leading-relaxed mb-12 max-w-xl font-medium opacity-90">
               Una infraestructura inteligente diseñada para la eficiencia, la transparencia y el bienestar ciudadano. Tecnología de élite al servicio del pueblo.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-20">
               <button
                 onClick={() => onNavigate('citizen')}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-2xl shadow-blue-600/40 flex items-center gap-4 group"
               >
                 Explorar Ecosistema <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
               </button>

               <button className="flex items-center gap-3 text-[#0f285c] font-bold hover:gap-5 transition-all group">
                 <span>Ver Estrategia 2025</span>
                 <div className="w-10 h-[2px] bg-[#0f285c] group-hover:w-16 transition-all"></div>
               </button>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-lg border-t border-slate-200 pt-12">
               <div>
                 <h4 className="text-3xl font-serif font-bold text-[#0f285c]">100%</h4>
                 <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Transparencia</p>
               </div>
               <div>
                 <h4 className="text-3xl font-serif font-bold text-[#0f285c]">24/7</h4>
                 <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Disponibilidad</p>
               </div>
            </div>
          </div>

          {/* Right Column: Swiper 3D Carousel - Cinematic Full-Bleed Cards */}
          <div className="xl:w-1/2 w-full max-w-[450px] md:max-w-[500px] relative h-[600px] md:h-[720px] flex items-center justify-center">
             <Swiper
               effect={'cards'}
               grabCursor={true}
               modules={[Autoplay, EffectCards, Pagination, Navigation]}
               className="w-full h-[560px] md:h-[680px]"
               autoplay={{
                 delay: 3500,
                 disableOnInteraction: false,
                 pauseOnMouseEnter: true,
               }}
               pagination={{
                 clickable: true,
                 dynamicBullets: true,
               }}
               navigation={true}
             >
               {carouselItems.map((item) => (
                 <SwiperSlide
                   key={item.id}
                   className="rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.55)] cursor-grab active:cursor-grabbing group"
                   onClick={() => onNavigate(item.navigate)}
                 >
                   <div className="relative w-full h-full">
                     {/* Full-bleed background image */}
                     <img
                       src={item.img}
                       alt={item.title}
                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                     />

                     {/* Cinematic gradient overlays */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50"></div>
                     <div
                       className="absolute bottom-0 left-0 right-0 h-2/3"
                       style={{ background: `linear-gradient(to top, ${item.accentColor}55, transparent)` }}
                     ></div>

                     {/* Top accent line */}
                     <div
                       className="absolute top-0 left-0 right-0 h-[3px]"
                       style={{ backgroundColor: item.accentColor }}
                     ></div>

                     {/* Header row: module tag + number */}
                     <div className="absolute top-7 left-7 right-7 flex justify-between items-center z-10">
                       <span
                         className="text-[0.55rem] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur-md border text-white"
                         style={{
                           backgroundColor: `${item.accentColor}35`,
                           borderColor: `${item.accentColor}70`,
                         }}
                       >
                         {item.tag}
                       </span>
                       <span className="font-serif font-black text-white/10 text-5xl leading-none select-none">{item.num}</span>
                     </div>

                     {/* Center watermark icon */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       {React.createElement(item.icon, { className: 'w-56 h-56 text-white opacity-[0.04]' })}
                     </div>

                     {/* Bottom content */}
                     <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                       <div
                         className="w-12 h-[3px] mb-4 rounded-full"
                         style={{ backgroundColor: item.accentColor }}
                       ></div>
                       <h3 className="font-serif font-black text-[1.9rem] text-white leading-[1.1] mb-3 drop-shadow-lg">
                         {item.title}
                       </h3>
                       <p className="text-white/65 text-sm leading-relaxed mb-6 font-medium">
                         {item.subtitle}
                       </p>
                       <div
                         className="w-full py-3.5 rounded-xl text-[0.65rem] font-black uppercase tracking-[0.25em] text-center text-white/80 backdrop-blur-md border border-white/15 hover:bg-white hover:text-[#0f285c] transition-all duration-300"
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

      {/* Bottom Features Bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-12 relative z-20 mt-12 xl:mt-0">
         <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white p-6 md:p-8 flex flex-wrap justify-center md:justify-between items-center gap-8 relative overflow-hidden">
            {/* Left/Right Decorative patterns */}
            <div className="absolute left-0 top-0 bottom-0 w-32 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, blue 2px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, red 2px, transparent 0)', backgroundSize: '20px 20px' }}></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 max-w-[120px] leading-tight">Tecnología para el bienestar</p>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <UsersRound className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 max-w-[120px] leading-tight">Gobierno abierto y transparente</p>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 max-w-[120px] leading-tight">Seguridad y confianza en cada paso</p>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Leaf className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 max-w-[120px] leading-tight">Un futuro sostenible para Nayarit</p>
            </div>
         </div>
      </div>

      {/* Footer Branding - Elite Ribbon */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16 relative z-20">
         <div className="bg-[#0f285c] text-white rounded-[2.5rem] shadow-2xl border border-white/10 p-8 md:p-12 flex flex-wrap justify-between items-center gap-8 relative overflow-hidden">
            {/* Geometric patterns */}
            <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>

            <div className="flex items-center gap-6 relative z-10">
               <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <ShieldAlert className="text-amber-400 w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl font-serif font-black tracking-tight">Compromiso Nayarit</h3>
                  <p className="text-slate-400 text-sm font-medium">Liderando la transformación digital del Pacífico.</p>
               </div>
            </div>

            <div className="flex gap-12 relative z-10">
               <div className="text-center">
                  <div className="text-amber-400 text-3xl font-black font-serif">1.5M</div>
                  <div className="text-[0.6rem] uppercase tracking-widest font-bold text-slate-400 mt-1">Ciudadanos</div>
               </div>
               <div className="text-center">
                  <div className="text-blue-400 text-3xl font-black font-serif">20+</div>
                  <div className="text-[0.6rem] uppercase tracking-widest font-bold text-slate-400 mt-1">Secretarías</div>
               </div>
            </div>

            <div className="relative z-10">
               <button className="bg-white text-[#0f285c] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg">
                  Panel de Control
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
