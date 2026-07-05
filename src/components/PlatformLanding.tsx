import React, { useState, useEffect } from 'react';
import {
  Menu, X, Radio, HeartPulse, ArrowRight,
  ShieldCheck, Globe, Leaf,
  Landmark, GraduationCap, Utensils, Briefcase,
  Sparkles, Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { OnboardingTour, type OnboardingStep } from './OnboardingTour';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const LANDING_TOUR_STEPS: OnboardingStep[] = [
  {
    icon: Sparkles,
    title: '¡Bienvenido a Nayarit Digital!',
    body: 'Esta es la puerta de entrada al gobierno digital de Nayarit. En unos pasos muy breves te explico qué puedes hacer aquí — sin necesidad de saber de tecnología.',
  },
  {
    icon: Users,
    title: '"Descubrir la Plataforma"',
    body: 'Este botón es para ti como ciudadano: te lleva a tu portal, donde puedes pagar trámites, hacer reportes y ver avisos de tu municipio.',
  },
  {
    icon: ShieldCheck,
    title: '"Panel de Transparencia"',
    body: 'Este botón muestra en tiempo real cómo trabaja el gobierno: recaudación, obras públicas y servicios. Está abierto para cualquier persona que quiera revisarlo.',
  },
  {
    icon: Landmark,
    title: 'Menú de arriba',
    body: 'En "Soluciones", "Estrategia" e "Impacto" encuentras más información sobre la plataforma y sus resultados. Puedes volver a este tutorial cuando quieras con el botón "Tutorial".',
  },
];

interface PlatformLandingProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive', subView?: string, action?: string) => void;
}

const ecosystemPillars = [
  { id: 1, num: '01', title: 'Gobierno Inteligente', impact: '20+ dependencias en un solo panel', icon: Landmark,      color: 'text-blue-700',   img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&h=600&fit=crop' },
  { id: 2, num: '02', title: 'Salud Digital',        impact: 'Citas, expediente y orientación médica',  icon: HeartPulse,    color: 'text-teal-500',   img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&h=600&fit=crop' },
  { id: 3, num: '03', title: 'Educación Inteligente',impact: 'Becas, inscripciones y seguimiento escolar', icon: GraduationCap, color: 'text-indigo-600', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&h=600&fit=crop' },
  { id: 4, num: '04', title: 'Campo Inteligente',    impact: 'Apoyos al campo nayarita en tiempo real', icon: Leaf,          color: 'text-emerald-600',img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=400&h=600&fit=crop' },
  { id: 5, num: '05', title: 'Turismo y Gastronomía',impact: 'El destino y la mesa, conectados',        icon: Utensils,      color: 'text-amber-600',  img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&h=600&fit=crop' },
  { id: 6, num: '06', title: 'Economía Digital',     impact: 'Licencias, créditos y trámites en 3 min', icon: Briefcase,     color: 'text-purple-600', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&h=600&fit=crop' },
];

/* ─── Wixárika canvas banda (top strip) ───────────────────── */
const WixBanda = ({ height = 48 }: { height?: number }) => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const W = c.parentElement?.offsetWidth || window.innerWidth, H = height;
    c.width = W; c.height = H;
    const CL = ['#D81E5B','#F5A623','#0FA3B1','#4C9F70','#E85D04'];
    ctx.fillStyle = '#080c14'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for (let x=5;x<W;x+=10) for (let y=5;y<H;y+=10) { ctx.beginPath();ctx.arc(x,y,.7,0,Math.PI*2);ctx.fill(); }
    const dia = (cx:number,cy:number,r:number,col:string,lw:number,a:number) => {
      ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=lw;
      ctx.beginPath(); ctx.moveTo(cx,cy-r); ctx.lineTo(cx+r,cy); ctx.lineTo(cx,cy+r); ctx.lineTo(cx-r,cy); ctx.closePath(); ctx.stroke(); ctx.globalAlpha=1;
    };
    const xS=52, yS=26; let row=0;
    for (let y=yS/2; y<H+yS; y+=yS) {
      const xO=(row%2)*(xS/2);
      for (let x=xO; x<W+xS; x+=xS) {
        const ci=Math.abs(Math.floor(x/xS+y/yS))%5, r=Math.min(H*.42,14);
        dia(x,y,r,CL[ci],1.2,.72); dia(x,y,r*.6,CL[(ci+1)%5],1,.5); dia(x,y,r*.27,CL[(ci+2)%5],.8,.55);
        ctx.globalAlpha=.55; ctx.fillStyle=CL[(ci+3)%5]; ctx.beginPath(); ctx.arc(x,y,1.5,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
      }
      row++;
    }
  }, [height]);
  return <div style={{height,background:'#080c14',overflow:'hidden'}}><canvas ref={ref} style={{display:'block',width:'100%',height:`${height}px`}}/></div>;
};

/* ─── Wixárika canvas section separator ───────────────────── */
const WixSep = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const W = c.parentElement?.offsetWidth || window.innerWidth, H = 32;
    c.width = W; c.height = H;
    const CL = ['#D81E5B','#F5A623','#0FA3B1','#4C9F70','#E85D04'];
    ctx.fillStyle = '#080c14'; ctx.fillRect(0,0,W,H);
    const dia = (cx:number,cy:number,r:number,col:string,lw:number,a:number) => {
      ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=lw;
      ctx.beginPath(); ctx.moveTo(cx,cy-r); ctx.lineTo(cx+r,cy); ctx.lineTo(cx,cy+r); ctx.lineTo(cx-r,cy); ctx.closePath(); ctx.stroke(); ctx.globalAlpha=1;
    };
    for (let x=24; x<W+48; x+=48) {
      const ci=Math.abs(Math.floor(x/48))%5;
      dia(x,H/2,12,CL[ci],1.2,.75); dia(x,H/2,6.6,CL[(ci+1)%5],.9,.5);
      ctx.globalAlpha=.5; ctx.fillStyle=CL[(ci+2)%5]; ctx.beginPath(); ctx.arc(x,H/2,1.5,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
    }
  }, []);
  return <div style={{height:32,background:'#080c14',overflow:'hidden'}}><canvas ref={ref} style={{display:'block',width:'100%',height:'32px'}}/></div>;
};

/* ─── Ojo de dios / nierika SVG for section accents ────────── */
const OjoNierika = ({ size = 80, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
    <polygon points="100,6 194,100 100,194 6,100" fill="none" stroke="#D81E5B" strokeWidth="2.5"/>
    <polygon points="100,22 178,100 100,178 22,100" fill="none" stroke="#F5A623" strokeWidth="2.5"/>
    <polygon points="100,40 160,100 100,160 40,100" fill="none" stroke="#0FA3B1" strokeWidth="2.5"/>
    <polygon points="100,58 142,100 100,142 58,100" fill="none" stroke="#4C9F70" strokeWidth="2.5"/>
    <polygon points="100,76 124,100 100,124 76,100" fill="none" stroke="#E85D04" strokeWidth="2.5"/>
    <circle cx="100" cy="100" r="9" fill="#D81E5B"/>
    <circle cx="100" cy="100" r="4.5" fill="#F5A623"/>
    <circle cx="100" cy="100" r="2" fill="white"/>
  </svg>
);

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/5 rounded-full pointer-events-none"></div>
    </div>
  );
};

export const PlatformLanding = ({ onNavigate }: PlatformLandingProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: 'Soluciones', view: 'citizen' as const },
    { label: 'Estrategia', view: 'executive' as const },
    { label: 'Impacto', view: 'dev' as const },
    { label: 'Transparencia', view: 'c5' as const },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans overflow-x-hidden selection:bg-blue-100 relative">
      <OnboardingTour steps={LANDING_TOUR_STEPS} storageKey="nyd-onboarding-landing-v1" />
      <OjosEscena />

      <WixBanda height={48} />
      <div className="h-[3px] w-full bg-gradient-to-r from-[#D81E5B] via-[#F5A623] via-[#0FA3B1] via-[#4C9F70] to-[#E85D04]"></div>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-[#0f285c] flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif font-black text-2xl text-white">Nayarit<span className="text-blue-400">Digital</span></h2>
            <button onClick={() => setMobileNavOpen(false)} aria-label="Cerrar menú" className="p-3 bg-white/10 rounded-xl">
              <X className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col gap-4" role="navigation" aria-label="Menú principal">
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => { setMobileNavOpen(false); onNavigate(item.view); }}
                className="text-left text-2xl font-bold text-white/80 hover:text-white py-4 border-b border-white/10 uppercase tracking-widest transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileNavOpen(false); onNavigate('dev'); }}
              className="mt-6 bg-[#D81E5B] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-lg shadow-xl shadow-[#D81E5B]/30"
            >
              Acceso Elite
            </button>
          </nav>
        </div>
      )}

      {/* Header */}
      <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#D81E5B] rounded-xl flex items-center justify-center shadow-lg shadow-[#D81E5B]/25">
            <Radio className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-serif font-black text-2xl tracking-tight text-[#0f285c]">Nayarit<span className="text-blue-600">Digital</span></h1>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-slate-600">Gobierno sin excusas</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => onNavigate('citizen')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Soluciones</button>
          <button onClick={() => onNavigate('executive')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Estrategia</button>
          <button onClick={() => onNavigate('dev')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Impacto</button>
          <button onClick={() => onNavigate('c5')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Transparencia</button>
          <button
            onClick={() => onNavigate('dev')}
            className="bg-[#D81E5B] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#D81E5B]/30"
          >
            Acceso Elite
          </button>
        </nav>

        <button onClick={() => setMobileNavOpen(true)} className="lg:hidden p-3 bg-white shadow-md rounded-xl" aria-label="Abrir menú de navegación">
          <Menu className="w-6 h-6 text-[#0f285c]" aria-hidden="true" />
        </button>
      </header>

      {/* Hero */}
      <section aria-label="Presentación principal" className="px-6 md:px-12 py-12 md:py-24 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 items-center">

          {/* Left Column */}
          <div className="xl:w-1/2 flex flex-col justify-center shrink-0">

            {/* 3 KPI Chips */}
            <div className="flex items-center flex-wrap gap-3 mb-8">
              {[
                { value: '1',    label: 'Ecosistema Digital'      },
                { value: '20+',  label: 'Secretarías integradas'  },
                { value: '1.2M+', label: 'Ciudadanos en Nayarit'   },
              ].map((kpi, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#D81E5B]/6 border border-[#D81E5B]/20 rounded-full px-4 py-2">
                  <span className="text-[#D81E5B] font-black text-sm">{kpi.value}</span>
                  <span className="text-slate-500 text-xs font-bold">{kpi.label}</span>
                </div>
              ))}
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] font-serif font-black text-[#0f285c] leading-[0.95] tracking-tighter mb-10">
              El sistema operativo<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D81E5B] to-[#0FA3B1] italic font-medium">del nuevo gobierno</span><br />
              de Nayarit.
            </h2>

            <p className="text-slate-600 text-xl leading-relaxed mb-12 max-w-xl font-medium opacity-90">
              La primera plataforma que conecta gobierno, ciudadanos y economía digital en un solo ecosistema. Sin papel. Sin filas. Sin excusas.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-20">
              <button
                onClick={() => onNavigate('citizen')}
                className="bg-[#D81E5B] hover:bg-[#B5154A] text-white px-8 py-5 rounded-full text-base font-bold transition-all shadow-2xl shadow-[#D81E5B]/40 flex items-center gap-3 group"
              >
                Descubrir la Plataforma <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('c5')}
                className="border-2 border-[#0f285c] text-[#0f285c] hover:bg-[#0f285c] hover:text-white px-8 py-5 rounded-full text-base font-bold transition-all flex items-center gap-3 group"
              >
                Panel de Transparencia <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3-col stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg border-t border-[#D81E5B]/20 pt-12">
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#D81E5B]">1</h4>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Ecosistema</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#D81E5B]">20+</h4>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Secretarías</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#D81E5B]">1.2M+</h4>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Nayaritas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Swiper 3D Carousel */}
          <div className="xl:w-1/2 w-full max-w-[450px] md:max-w-[500px] relative h-[550px] md:h-[700px] flex items-center justify-center">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Pagination, Navigation]}
              className="w-full h-[500px] md:h-[600px]"
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
            >
              {ecosystemPillars.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(15,40,92,0.3)] bg-white flex flex-col border border-white/50 cursor-grab active:cursor-grabbing group"
                  onClick={() => {
                    if (item.id === 1) onNavigate('c5');
                    else if (item.id === 2) onNavigate('citizen', 'services', 'triage');
                    else onNavigate('citizen');
                  }}
                >
                  <div className="p-10 text-center flex flex-col items-center bg-white z-10 relative">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-8 h-[1px] bg-[#D81E5B]/20"></span>
                      <span className="text-[#D81E5B] font-black text-sm tracking-[0.2em] uppercase">{item.num}</span>
                      <span className="w-8 h-[1px] bg-[#D81E5B]/20"></span>
                    </div>
                    <div className={cn("p-5 rounded-2xl mb-6 bg-slate-50 group-hover:scale-110 transition-transform duration-500", item.color)}>
                      {React.createElement(item.icon, { className: "w-10 h-10" })}
                    </div>
                    <h3 className="font-serif font-black text-2xl text-[#0f285c] leading-tight px-4 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-emerald-600 text-xs font-bold mt-1">{item.impact}</p>
                  </div>

                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent z-10 h-[60%]"></div>
                    <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f285c]/90 via-[#0f285c]/20 to-transparent z-10"></div>
                    <div className="absolute bottom-8 left-0 right-0 z-20 px-8">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.id === 1) onNavigate('c5');
                          else if (item.id === 2) onNavigate('citizen', 'services', 'triage');
                          else onNavigate('citizen');
                        }}
                        className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#0f285c] transition-all"
                      >
                        Acceder ahora
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-[#14213D] py-16 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 wix-bg pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 text-center">
            <div className="py-4 px-6">
              <div className="text-5xl md:text-6xl font-serif font-black text-[#F5A623]">50,000</div>
              <div className="text-xs font-bold text-slate-300 mt-2 uppercase tracking-widest">ciudadanos</div>
              <div className="text-xs text-slate-400 mt-1">meta Tepic año 1</div>
            </div>
            <div className="py-4 px-6">
              <div className="text-5xl md:text-6xl font-serif font-black text-[#0FA3B1]">15</div>
              <div className="text-xs font-bold text-slate-300 mt-2 uppercase tracking-widest">meses</div>
              <div className="text-xs text-slate-400 mt-1">para transformar Nayarit</div>
            </div>
            <div className="py-4 px-6">
              <div className="text-5xl md:text-6xl font-serif font-black text-[#4C9F70]">0</div>
              <div className="text-xs font-bold text-slate-300 mt-2 uppercase tracking-widest">papel ni filas</div>
              <div className="text-xs text-slate-400 mt-1">desde el primer día</div>
            </div>
            <div className="py-4 px-6">
              <div className="text-4xl md:text-5xl font-serif font-black text-[#D81E5B]">20/20</div>
              <div className="text-xs font-bold text-slate-300 mt-2 uppercase tracking-widest">municipios Top 7%</div>
              <div className="text-xs text-slate-500 mt-1">primer estado con cobertura total</div>
            </div>
          </div>
        </div>
      </section>

      <WixSep />

      {/* Before / After */}
      <section className="py-24 relative z-10 bg-[#fcfdfe]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">El cambio en una línea</p>
            <h3 className="text-4xl font-serif font-black text-[#0f285c]">Hoy vs. con Nayarit Digital</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50/60 border border-red-100 rounded-3xl p-8">
              <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-6">Antes — el trámite de siempre</p>
              {[
                '3 visitas a oficinas en horario laboral',
                'Días o semanas de espera sin saber el estatus',
                'Papel, fotocopias, sellos y filas',
                'Información perdida entre dependencias',
                'Sin registro ni responsable visible',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-red-100 last:border-0">
                  <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center shrink-0 text-red-500 text-xs font-black">✕</div>
                  <span className="text-slate-600 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-3xl p-8">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-6">Con Nayarit Digital — hoy</p>
              {[
                '1 solo acceso desde tu celular, cualquier día',
                '3 minutos para la mayoría de trámites',
                'Sin papel, sin filas, sin traslados',
                'Folio y estatus en tiempo real con notificación',
                'Responsable asignado visible desde el primer clic',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-emerald-100 last:border-0">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white text-xs font-black">✓</div>
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WixSep />

      {/* Un solo Nayarit — Convergence Hub */}
      <section className="py-28 relative z-10 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Arquitectura de estado</p>
            <h3 className="text-5xl md:text-6xl font-serif font-black text-[#0f285c] leading-tight mb-5">
              Un solo Nayarit.<br />Una sola plataforma.
            </h3>
            <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
              No son proyectos aislados. Es una infraestructura de estado donde cada módulo alimenta al siguiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px_1fr] gap-4 items-stretch">
            {/* Left pillar cards — right-aligned to face the hub */}
            <div className="flex flex-col gap-3 justify-center">
              {ecosystemPillars.slice(0, 3).map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex items-center justify-end gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                    <div className="text-right flex-1 min-w-0">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-0.5">{p.num}</p>
                      <p className="text-sm font-black text-[#0f285c] leading-tight">{p.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{p.impact}</p>
                    </div>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-50", p.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center hub */}
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0f285c] to-[#1a3f8f] rounded-3xl text-center shadow-2xl shadow-[#0f285c]/30 relative overflow-hidden border border-blue-600/20 min-h-[360px]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 rounded-full border border-blue-500/15"></div>
                <div className="absolute w-56 h-56 rounded-full border border-blue-500/8"></div>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-600/40">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-serif font-black text-white mb-1 leading-tight">
                  Nayarit<br /><span className="text-blue-400">Digital</span>
                </h4>
                <p className="text-blue-300 text-[10px] font-black mb-6 uppercase tracking-widest">Núcleo del ecosistema</p>
                <div className="space-y-2">
                  {['1 Ecosistema', '6 Pilares', 'Activo hoy en Tepic'].map((t, i) => (
                    <div key={i} className="bg-white/10 rounded-lg px-3 py-1.5 text-[11px] font-bold text-blue-200">{t}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right pillar cards — left-aligned to face the hub */}
            <div className="flex flex-col gap-3 justify-center">
              {ecosystemPillars.slice(3, 6).map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-50", p.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-0.5">{p.num}</p>
                      <p className="text-sm font-black text-[#0f285c] leading-tight">{p.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{p.impact}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WixSep />

      {/* Mandato Federal — Ley de Simplificación y Digitalización */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-[#08111e] to-[#0a2040] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] wix-bg pointer-events-none"></div>
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#D81E5B]/15 border border-[#D81E5B]/35 px-5 py-2 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4 text-[#D81E5B]" />
              <span className="text-[#D81E5B] text-xs font-bold uppercase tracking-widest">Ley Nacional de Simplificación y Digitalización · 2025</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-white leading-tight mb-5">
              Mandato Federal.<br /><span className="text-[#0FA3B1] italic font-medium">Solución Municipal.</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              La Presidenta Sheinbaum convirtió la digitalización en ley constitucional. El 85% de los trámites
              que afectan a los ciudadanos son locales — y ahí es exactamente donde actúa ConnectX.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: ShieldCheck, color: '#D81E5B',
                stat: '2026', label: 'Fecha límite federal',
                desc: 'Meta constitucional: 80% de trámites municipales digitalizados. La ley aplica a los tres órdenes de gobierno — sin excepción.'
              },
              {
                icon: Globe, color: '#0FA3B1',
                stat: '85%', label: 'Gap que la ATDT no cubre',
                desc: 'De los trámites que afectan al ciudadano son estatales o municipales. La Fábrica de Software federal no los toca. ConnectX sí.'
              },
              {
                icon: Landmark, color: '#F5A623',
                stat: 'Art. 74', label: 'Arquitectura LlaveMx-ready',
                desc: 'Diseñado conforme al Art. 74 LNETB para integración con el sistema federal de identidad digital. Activable en la fase de despliegue municipal.'
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.color}22` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="text-3xl font-serif font-black mb-2" style={{ color: item.color }}>{item.stat}</div>
                  <div className="text-white font-black text-xs mb-3 uppercase tracking-widest">{item.label}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-slate-500 text-sm italic mb-6 max-w-lg mx-auto leading-relaxed">
              "Al eliminar los trámites burocráticos se elimina la corrupción."
              <span className="block not-italic text-slate-600 text-xs mt-1">— Dra. Claudia Sheinbaum, Presidenta de México</span>
            </p>
            <button
              onClick={() => onNavigate('c5')}
              className="bg-[#D81E5B] hover:bg-[#B5154A] text-white px-10 py-4 rounded-full text-sm font-bold transition-all shadow-xl shadow-[#D81E5B]/30 inline-flex items-center gap-3 group"
            >
              Ver cómo Tepic supera el mandato federal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      <WixSep />

      {/* Nayarit ID — Identidad en 3 lenguas */}
      <section className="bg-[#080f1e] py-24 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-6 left-6 pointer-events-none ojo-spin-2d opacity-20">
          <OjoNierika size={96} />
        </div>
        <div className="absolute bottom-6 right-6 pointer-events-none ojo-spin-2d-rev opacity-15">
          <OjoNierika size={72} />
        </div>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-5 py-2 rounded-full mb-8">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Identidad Digital Soberana</span>
          </div>
          <h3 className="text-5xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">NAYARIT ID</h3>
          <p className="text-slate-400 text-lg max-w-lg mx-auto mb-12 leading-relaxed">Tu identidad digital nayarita. Una sola cuenta para todos los servicios del estado.</p>
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {[
              { lang: 'Español', emoji: '🇲🇽', note: 'Oficial' },
              { lang: 'Cora', emoji: '🌿', note: 'Nayeri' },
              { lang: 'Wixarika', emoji: '🌵', note: 'Huichol' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-center min-w-[120px]">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-white font-bold text-sm">{item.lang}</div>
                <div className="text-slate-400 text-xs mt-0.5">{item.note}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm">El primer portal de gobierno en México que reconoce las lenguas indígenas de Nayarit.</p>
          <p className="text-slate-400 text-xs mt-4 italic leading-relaxed max-w-md mx-auto">
            El diseño incorpora patrones del arte tradicional wixárika del pueblo Nayeri,
            en colaboración con comunidades artesanas de Nayarit.
            En reconocimiento a los pueblos originarios del estado.
          </p>
        </div>
      </section>

      {/* Llave MX Compliance */}
      <section className="bg-[#0f285c] py-20 relative z-10 border-t border-white/5">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-5 py-2 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Arquitectura conforme LNETB — Art. 74</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-black text-white mb-6">Preparado para Llave MX desde el diseño</h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            El sistema está arquitectado conforme al Art. 74 LNETB para habilitar inicio de sesión único federal.<br className="hidden md:block" />
            El ciudadano usará sus credenciales federales — sin crear otra contraseña — en la fase de despliegue.
          </p>
          <div className="inline-flex items-center gap-3 bg-emerald-500/80 px-8 py-3.5 rounded-full">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span className="text-white font-black text-sm tracking-wide">Diseñado conforme al · DOF 16-VII-2025 · Art. 74 LNETB</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative z-10 bg-[#fcfdfe] text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 60%, #dbeafe 0%, transparent 65%)' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ojo-spin-2d opacity-[0.06]">
          <OjoNierika size={520} />
        </div>
        <div className="max-w-[700px] mx-auto px-6 relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-5">Demo lista · Piloto en Tepic</p>
          <h3 className="text-5xl md:text-7xl font-serif font-black text-[#0f285c] leading-[0.9] tracking-tighter mb-8">
            Listo para<br /><span className="text-blue-600 italic">arrancar.</span>
          </h3>
          <p className="text-xl text-slate-600 font-medium mb-6">La pregunta es cuándo quieres ser parte.</p>
          <p className="text-sm text-slate-600 italic mb-14 max-w-lg mx-auto leading-relaxed">
            "Estonia tardó cinco años en construir su gobierno digital.<br className="hidden md:block" />
            Nayarit puede hacerlo en 15 meses."
          </p>
          <button
            onClick={() => onNavigate('c5')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-full text-lg font-bold transition-all shadow-2xl shadow-blue-600/40 inline-flex items-center gap-4 group"
          >
            Ver el sistema en vivo — 20 minutos
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-10 text-xs text-slate-600 font-medium tracking-wider">
            © 2026 <span className="font-bold">Nayarit Digital</span> · Propiedad de ConnectX Servicios S.A. de C.V.
          </p>
          <p className="mt-1 text-[10px] text-slate-600 tracking-wide">
            PI bajo custodia de Fundación ConnectX A.C. · Uso sujeto a contrato · <a href="/aviso-legal.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-slate-400 transition-colors">/aviso-legal</a>
          </p>
        </div>
      </section>
    </div>
  );
};
