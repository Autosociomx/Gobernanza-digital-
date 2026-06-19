import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Bot, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

// Ojos de Dios 3D component
const OjosEscena = ({ onClick }: { onClick?: () => void }) => {
  const [offset, setOffset] = useState({ cx: 0, cy: 0, tx: 0, ty: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let currentTx = 0, currentTy = 0;
    let currentCx = 0, currentCy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      currentTx = (e.clientX / window.innerWidth - 0.5);
      currentTy = (e.clientY / window.innerHeight - 0.5);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        currentTx = Math.max(-0.5, Math.min(0.5, e.gamma / 60));
        currentTy = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60));
      }
    };

    const handleScroll = () => {
      if ('ontouchstart' in window) {
        currentTy = Math.max(-0.5, Math.min(0.5, window.scrollY / window.innerHeight - 0.25));
      }
    };

    const isTouch = 'ontouchstart' in window;
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const animate = () => {
      currentCx += (currentTx - currentCx) * 0.06;
      currentCy += (currentTy - currentCy) * 0.06;
      setOffset({ cx: currentCx, cy: currentCy, tx: currentTx, ty: currentTy });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ojos-escena cursor-pointer" id="ojosEscena" onClick={onClick}>
      <div className="ojo ojo-a" style={{ transform: `translate(${offset.cx * 22}px, ${offset.cy * 22}px)` }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>
      <div className="ojo ojo-b" style={{ transform: `translate(${offset.cx * 40}px, ${offset.cy * 40}px)` }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>
      <div className="ojo ojo-c" style={{ transform: `translate(${offset.cx * 60}px, ${offset.cy * 60}px)` }}>
        <div className="ojo-giro">
          <div className="capa c1"></div><div className="capa c2"></div><div className="capa c3"></div>
          <div className="capa c4"></div><div className="capa c5"></div><div className="capa c6"></div>
        </div>
      </div>
    </div>
  );
};

// Motion Wrapper to substitute .rv classes
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ChatIA = () => {
  const [messages, setMessages] = useState<{ role: 'ia' | 'u', text: string }[]>([
    { role: 'ia', text: '¡Hola! Soy el asistente de la campaña. Pregúntame sobre las propuestas, los logros en Tepic o cómo participar. ✨' },
    { role: 'u', text: '¿Qué es ConectaX Salud?' },
    { role: 'ia', text: 'ConectaX Salud es el sistema de triaje médico con inteligencia artificial (CIE-11) que ya funciona en módulos DIF de Tepic. Evalúa la urgencia de tu malestar y te orienta a la atención correcta — y funciona sin internet. El nombre ConectaX refleja nuestra infraestructura de vanguardia para 2027. 💚' }
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'u', text: input.trim() }]);
    setInput('');
    
    // Simulate thinking delay
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ia', text: 'El asistente de demostración no está conectado a la API en vivo por el momento. ¡La visión de respuesta instantánea será una realidad en la campaña de 2027! 🚀' }]);
    }, 1200);
  };

  return (
    <div className="chat-shell">
      <div className="flex items-center gap-[0.7rem] px-[1.2rem] py-[0.9rem]" style={{ background: 'linear-gradient(90deg, var(--magenta), var(--morado))' }}>
        <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--solar)' }}>
          <Bot className="w-5 h-5 text-[var(--tinta)]" />
        </div>
        <div>
          <span className="block font-bold text-[0.8rem] text-white">Asistente Nayarit Digital</span>
          <span className="block font-mono text-[0.55rem] text-white/70">Potenciado por IA · Siempre disponible</span>
        </div>
      </div>
      <div className="p-[1.1rem] flex flex-col gap-[0.7rem] min-h-[240px] max-h-[300px] overflow-y-auto" ref={chatBodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] px-[0.95rem] py-[0.65rem] rounded-[1rem] text-[0.8rem] leading-[1.55] ${
            m.role === 'u'
              ? 'self-end bg-[var(--tinta)] text-[var(--crema)] rounded-br-[0.25rem]'
              : 'self-start bg-[var(--blanco)] text-[var(--tinta)] border border-black/10 rounded-bl-[0.25rem]'
          }`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-[0.5rem] px-[1.1rem] py-[0.9rem] border-t border-black/10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border-[1.5px] border-black/20 focus:border-[var(--magenta)] rounded-full px-[1.1rem] py-[0.6rem] text-[0.8rem] outline-none transition-colors"
          placeholder="Escribe tu pregunta..."
        />
        <button 
          onClick={handleSend}
          className="bg-[var(--magenta)] hover:bg-[var(--morado)] text-white border-none rounded-full w-[38px] h-[38px] shrink-0 text-[1rem] cursor-pointer transition-all hover:scale-105"
        >→</button>
      </div>
    </div>
  );
};

interface GeraldineLandingProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive', subView?: string, action?: string) => void;
}

export const GeraldineLanding = ({ onNavigate }: GeraldineLandingProps) => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalCmd, setTerminalCmd] = useState('');
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (y) => setNavScrolled(y > 50));
  }, [scrollY]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalCmd.trim().toLowerCase();
    if (cmd === '@c5' || cmd === '@hub') {
      onNavigate('c5');
    } else if (cmd === '@nayaritid' || cmd === '@citizen') {
      onNavigate('citizen');
    } else if (cmd === '@ejecutiva' || cmd === '@ejecutivo') {
      onNavigate('executive');
    } else if (cmd === '@tech' || cmd === '@road') {
      onNavigate('dev');
    }
    setTerminalCmd('');
    setTerminalOpen(false);
  };


  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[900] bg-[#FEF8EE]/95 backdrop-blur-[14px] px-[2rem] py-[0.95rem] flex items-center justify-between border-b border-black/10 transition-shadow duration-300 ${navScrolled ? 'shadow-[0_6px_28px_rgba(21,8,0,0.1)]' : ''}`}>
        <a href="#" className="font-serif font-black text-[1.2rem] tracking-tight text-[var(--tinta)] flex items-center gap-[0.55rem] no-underline">
          <span className="w-[14px] h-[14px] bg-[var(--magenta)] transform rotate-45 shrink-0 shadow-[2.5px_2.5px_0_var(--solar)]"></span>Nayarit Digital
        </a>
        <ul className="hidden md:flex items-center gap-[2rem] m-0 p-0 list-none">
          <li><button onClick={() => scrollTo('ecosistema')} className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Ecosistema</button></li>
          <li><button onClick={() => scrollTo('observatorio')} className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Observatorio</button></li>
          <li><button onClick={() => scrollTo('madurez')} className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Madurez Digital</button></li>
          <li><button onClick={() => scrollTo('triage')} className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Triaje Médico</button></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="min-h-screen pt-[7.5rem] md:pt-[7.5rem] px-[2rem] pb-[4rem] grid grid-cols-1 md:grid-cols-[1.15fr_1fr] items-center gap-[3rem] relative overflow-hidden wix-bg" id="inicio">
        <div className="hero-banda-top"></div>
        <OjosEscena onClick={() => setTerminalOpen(true)} />
        
        {/* HIDDEN TERMINAL OVERLAY */}
        <AnimatePresence>
          {terminalOpen && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: -20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: -20 }}
               className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[1000] bg-black/90 backdrop-blur-md p-6 rounded-2xl border border-[var(--magenta)] shadow-[0_0_40px_rgba(229,0,122,0.5)] w-[300px]"
             >
               <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs text-[var(--magenta)] font-bold">ACCESO RESTRINGIDO</span>
                  <button onClick={() => setTerminalOpen(false)} className="text-white/50 hover:text-white">✕</button>
               </div>
               <form onSubmit={handleCommandSubmit}>
                  <input 
                    type="password" 
                    autoFocus
                    placeholder="Comando @..."
                    value={terminalCmd}
                    onChange={(e) => setTerminalCmd(e.target.value)}
                    className="w-full bg-black border-b-2 border-white/20 focus:border-[var(--magenta)] text-white font-mono text-sm px-2 py-2 outline-none transition-colors"
                  />
               </form>
             </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          initial={{opacity:0, scale:0.95, perspective:1000}} 
          animate={{opacity:1, scale:1}} 
          transition={{duration:1.2, ease:"easeOut"}}
          className="relative z-10"
        >
          <motion.div 
            whileHover={{ rotateX: -5, rotateY: 5, translateZ: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex flex-col items-center sm:items-start font-mono font-bold text-[0.62rem] tracking-[0.2em] uppercase text-[var(--tinta)] border-[1.5px] border-[var(--tinta)] bg-[var(--solar)] px-[1rem] py-[0.6rem] rounded-[1.2rem] sm:rounded-full mb-[1.6rem] shadow-[3px_3px_0_var(--tinta)] cursor-default"
          >
            <div className="flex items-center gap-[0.55rem] mb-[0.2rem]">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--magenta)] animate-pulse"></span>Nayarit Digital · ESTADO DIGITAL · GOBERNANZA 2.0
            </div>
            <div className="text-[0.55rem] tracking-widest opacity-80 sm:ml-[1.4rem]">→ 20 municipios digitalizados en los primeros 100 días</div>
          </motion.div>
          
          <h1 className="font-serif font-black text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] tracking-[-0.045em] mb-[0.32em] drop-shadow-2xl">
            <motion.span 
              initial={{opacity:0, x:-20}} 
              animate={{opacity:1, x:0}} 
              transition={{delay:0.2, duration:0.8}} 
              className="block text-[var(--tinta)]"
            >
              El Sistema Operativo
            </motion.span>
            <motion.span 
              initial={{opacity:0, x:20}} 
              animate={{opacity:1, x:0}} 
              transition={{delay:0.32, duration:0.8}} 
              className="block text-[var(--magenta)] italic relative"
            >
              Municipal de Tepic
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-[var(--magenta)] w-0"
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </motion.span>
          </h1>
          
          <motion.p initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.45, duration:0.8}}
            className="font-serif italic text-[clamp(1.05rem,2.2vw,1.45rem)] text-[var(--gris)] mb-[1.1rem]">
            "La digitalización municipal basada en interoperabilidad, inclusión y datos abiertos incrementa simultáneamente la recaudación, la eficiencia administrativa y la confianza ciudadana."
          </motion.p>
          
          <motion.p initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.55, duration:0.8}}
            className="font-sans text-[clamp(0.9rem,1.8vw,1.05rem)] text-[var(--tinta)]/80 max-w-[450px] leading-[1.75] mb-[2rem]">
            Nayarit Digital no es un conjunto de aplicaciones. Es una infraestructura institucional que reposa sobre tres pilares: <em className="not-italic font-bold text-[var(--magenta)]">Interoperabilidad, Inclusión y Datos Abiertos.</em>
          </motion.p>
          
          <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.65, duration:0.8}}
            className="flex flex-wrap gap-[0.85rem]">
            <motion.button 
              whileHover={{ scale: 1.05, rotateZ: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('citizen')}
              className="bg-[var(--tinta)] hover:bg-[var(--magenta)] text-[var(--crema)] font-bold text-[0.88rem] px-[2rem] py-[0.9rem] rounded-full inline-flex items-center gap-[0.5rem] transition-all shadow-[0_4px_0_var(--magenta)] hover:shadow-[0_8px_20px_rgba(229,0,122,0.3)]"
            >
              Portal del Ciudadano: Nayarit ID →
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.4, duration:0.9}} className="relative z-10 w-full max-w-[300px] md:max-w-full mx-auto md:-order-none order-first">
          <div className="foto-frame group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--magenta)] to-[var(--solar)] opacity-30 blur-2xl rounded-full transition-all group-hover:opacity-50"></div>
            <img 
              className="w-full aspect-[3/4] object-cover object-top rounded-[1rem] saturate-[1.1] contrast-[1.05] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[3px] border-white relative z-10" 
              src="/geraldine_official.png" 
              alt="Geraldine Ponce — Presidenta Municipal de Tepic y Candidata a Gobernadora" 
            />
            {/* Slogan Badge */}
            <motion.div 
              initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.55, duration:0.6}}
              className="absolute -bottom-[0.5rem] -left-[0.5rem] md:-left-[1rem] bg-white border border-[var(--magenta)]/20 p-[0.8rem_1rem] rounded-[1rem] shadow-[0_10px_30px_-5px_rgba(229,0,122,0.2)] transition-all z-20"
            >
              <h4 className="font-serif font-black text-[0.85rem] sm:text-[0.95rem] text-[var(--tinta)] leading-[1.1] mb-[0.2rem] max-w-[180px]">De Tepic a Nayarit:<br/>El primer estado <span className="text-[var(--magenta)]">100% digital</span>.</h4>
              <div className="flex items-center gap-[0.4rem] mt-1 pt-1 border-t border-[var(--magenta)]/10">
                <span className="w-[5px] h-[5px] bg-[var(--magenta)] rounded-full shadow-[0_0_5px_var(--magenta)]"></span>
                <p className="font-mono text-[0.45rem] font-bold uppercase tracking-widest text-[var(--magenta)]">Gobernanza Digital 2027</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* INTEGRATED MODULES */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--crema)]" id="ecosistema">
        <div className="max-w-[1080px] mx-auto">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem]" style={{background:'var(--magenta)'}}>Una plataforma · Todas las aplicaciones</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2.1rem,5.5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1rem]">Ecosistema Nayarit Digital</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[clamp(1.05rem,2.1vw,1.4rem)] text-[var(--gris)] leading-[1.5] max-w-[700px] mb-[3.6rem]">Siete pilares de infraestructura ya construida e integrada bajo el protocolo ConnectX, alineados a la Estrategia Digital 2027.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]">
            {/* 1. Tesorería */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--magenta)] group" onClick={() => onNavigate('citizen', 'payments')}>
                <span className="text-[2.2rem] block mb-[0.8rem] transition-transform group-hover:scale-110">💳</span>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">Tesorería Inteligente</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Pago de predial y agua en 3 min. Proyección de +25% en recaudación inmediata mediante conciliación automática.</p>
              </div>
            </Reveal>

            {/* 2. Obras */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--magenta)] group" onClick={() => onNavigate('citizen', 'services', 'map')}>
                <span className="text-[2.2rem] block mb-[0.8rem] transition-transform group-hover:scale-110">🏗️</span>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">Trazabilidad Cloud</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Transparencia Radical: Obra pública visible en tiempo real con evidencias georreferenciadas. Cero opacidad.</p>
              </div>
            </Reveal>

            {/* 3. AgroVisión 3D */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-[1.2rem] border-2 border-dashed border-[var(--verde)]/30 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--verde)] group" onClick={() => onNavigate('citizen', 'services', 'map')}>
                <div className="flex justify-between items-start mb-[0.8rem]">
                  <span className="text-[2.2rem] block transition-transform group-hover:scale-110">🛰️</span>
                  <span className="bg-[var(--verde)] text-white text-[8px] font-black px-2 py-1 rounded">NVIDIA POWERED</span>
                </div>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">AgroVisión 3D</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Campo Digital: Sensores IoT y satélites para agricultura de precisión. +25% de rendimiento por hectárea.</p>
              </div>
            </Reveal>

            {/* 4. ConectaX */}
            <Reveal delay={0.4}>
              <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--turq)] group" onClick={() => onNavigate('citizen', 'services', 'triage')}>
                <span className="text-[2.2rem] block mb-[0.8rem] transition-transform group-hover:scale-110">🏥</span>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">ConectaX (CIE-11)</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Salud sin Fronteras: Triaje médico IA bajo estándar internacional CIE-11. Diagnóstico eficaz, incluso sin internet.</p>
              </div>
            </Reveal>

            {/* 5. NayaritID */}
            <Reveal delay={0.5}>
              <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--magenta)] group" onClick={() => onNavigate('citizen', 'profile')}>
                <span className="text-[2.2rem] block mb-[0.8rem] transition-transform group-hover:scale-110">🆔</span>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">NayaritID</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Soberanía de Datos: Identidad digital unificada y segura para todos los trámites con el estado y municipio.</p>
              </div>
            </Reveal>

            {/* 6. RoutePro/MesaPro */}
            <Reveal delay={0.6}>
              <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--solar)] group" onClick={() => onNavigate('citizen', 'services')}>
                <span className="text-[2.2rem] block mb-[0.8rem] transition-transform group-hover:scale-110">📦</span>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">RoutePro/MesaPro</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Ventanilla Única: Apertura de negocios en horas. Orquestación multi-dependencia bajo esquema Zero-Paper.</p>
              </div>
            </Reveal>

            {/* 7. Animal Master */}
            <Reveal delay={0.7}>
              <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] hover:shadow-xl transition-all h-full cursor-pointer hover:border-[var(--turq)] group" onClick={() => onNavigate('citizen', 'services')}>
                <span className="text-[2.2rem] block mb-[0.8rem] transition-transform group-hover:scale-110">🐕</span>
                <h3 className="font-serif font-black text-[1.3rem] text-[var(--tinta)] mb-[0.4rem]">Animal Master</h3>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.65]">Trazabilidad y bienestar animal integral. Registro, salud y gestión poblacional para ganadería y mascotas bajo inteligencia artificial.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STRATEGIC ASSET: OBSERVATORIO */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--tinta)] relative overflow-hidden" id="observatorio">
        <div className="max-w-[980px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-[4rem] items-center">
            <div>
              <Reveal delay={0.1}>
                <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[var(--tinta)] px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem] bg-[var(--solar)]">El Activo Estratégico</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-serif font-black text-[clamp(2.1rem,5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1.4rem] text-[var(--crema)]">Observatorio Digital<br/><em className="italic" style={{color:'var(--solar)'}}>de Nayarit.</em></h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-[1rem] text-[var(--crema)]/70 mb-[2rem] leading-[1.7]">El software se vuelve obsoleto; el dato longitudinal es el verdadero poder. El Observatorio visualiza en tiempo real la salud comunitaria, la recaudación y el desempeño gubernamental, consolidando una inteligencia territorial única en México.</p>
                <div className="flex flex-col gap-[0.9rem]">
                  <div className="flex items-center gap-[0.8rem] text-[var(--crema)]/80 text-[0.85rem]"><span className="text-[var(--solar)]">✦</span> Mapas de calor de reportes ciudadanos por colonia.</div>
                  <div className="flex items-center gap-[0.8rem] text-[var(--crema)]/80 text-[0.85rem]"><span className="text-[var(--solar)]">✦</span> Tableros de obra con transparencia financiera total.</div>
                  <div className="flex items-center gap-[0.8rem] text-[var(--crema)]/80 text-[0.85rem]"><span className="text-[var(--solar)]">✦</span> Datos abiertos para atraer inversión extranjera.</div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.4}>
              <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-[1.5rem] backdrop-blur-md">
                <div className="flex justify-between items-center mb-[1.5rem]">
                  <span className="font-mono text-[0.65rem] text-white/50 uppercase tracking-[0.1em]">Status: Nayarit Digital Live</span>
                  <div className="w-[8px] h-[8px] rounded-full bg-[var(--verde)] animate-pulse"></div>
                </div>
                <div className="space-y-[1.2rem]">
                  <div className="h-[4px] w-full bg-white/10 rounded-full overflow-hidden leading-none"><div className="h-full bg-[var(--magenta)]" style={{width:'78%'}}></div></div>
                  <div className="flex justify-between font-mono text-[0.55rem] text-white/40 uppercase"><span>Recaudación Predial</span><span>+78% vs 2021</span></div>
                  <div className="h-[4px] w-full bg-white/10 rounded-full overflow-hidden leading-none"><div className="h-full bg-[var(--turq)]" style={{width:'92%'}}></div></div>
                  <div className="flex justify-between font-mono text-[0.55rem] text-white/40 uppercase"><span>Obras Trazadas</span><span>92% Eficiencia</span></div>
                  <div className="h-[4px] w-full bg-white/10 rounded-full overflow-hidden leading-none"><div className="h-full bg-[var(--solar)]" style={{width:'65%'}}></div></div>
                  <div className="flex justify-between font-mono text-[0.55rem] text-white/40 uppercase"><span>Bienestar Social</span><span>65K Beneficiarios</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMDM SECTION */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--blanco)]" id="madurez">
        <div className="max-w-[980px] mx-auto text-center">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[var(--tinta)] px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem] bg-[var(--solar)]">Medir para transformar</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2rem,5vw,3.5rem)] leading-[0.98] tracking-[-0.035em] mb-[1.4rem]">Índice de Madurez Digital Municipal</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[1.2rem] text-[var(--gris)] max-w-[700px] mx-auto mb-[3.6rem]">De un municipio tradicional a una Gobernanza Aumentada. El IMDM es el termómetro de la modernización de Tepic.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1rem]">
            <div className="bg-[var(--crema)] p-[1.5rem] rounded-[1rem] border border-black/5">
              <div className="font-black text-[2rem] text-[var(--tinta)] mb-[0.5rem]">22</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--gris)]">Línea Base 2021</div>
              <div className="mt-[0.8rem] text-[0.7rem] text-red-600 font-bold uppercase">Emergente Bajo</div>
            </div>
            <div className="bg-[var(--crema)] p-[1.5rem] rounded-[1rem] border border-black/5">
              <div className="font-black text-[2rem] text-[var(--magenta)] mb-[0.5rem]">45</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--gris)]">Hoy (Tepic)</div>
              <div className="mt-[0.8rem] text-[0.7rem] text-[var(--magenta)] font-bold uppercase">En Transición</div>
            </div>
            <div className="bg-[var(--tinta)] p-[1.5rem] rounded-[1rem] border border-white/10 shadow-xl lg:scale-110 relative z-20">
              <div className="font-black text-[2rem] text-[var(--solar)] mb-[0.5rem]">65</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/50">Corto Plazo</div>
              <div className="mt-[0.8rem] text-[0.7rem] text-[var(--solar)] font-bold uppercase">Gobernanza Conectada</div>
            </div>
            <div className="bg-[var(--crema)] p-[1.5rem] rounded-[1rem] border border-black/5">
              <div className="font-black text-[2rem] text-[var(--turq)] mb-[0.5rem]">78</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--gris)]">Visión 2027</div>
              <div className="mt-[0.8rem] text-[0.7rem] text-[var(--turq)] font-bold uppercase">Madurez Funcional</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONECTAX SECTION */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--tinta)] relative overflow-hidden" id="triage">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='40,3 77,40 40,77 3,40' fill='none' stroke='%23FFB300' stroke-width='1.8'/%3E%3Cpolygon points='40,14 66,40 40,66 14,40' fill='none' stroke='%2300BCD4' stroke-width='1.4'/%3E%3C/svg%3E\")", backgroundSize: '80px 80px'}}></div>
        <div className="max-w-[980px] mx-auto relative z-10">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[var(--tinta)] px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem] bg-[var(--verde)]">ConectaX Salud · Triaje CIE-11</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2.1rem,5.5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1rem] text-[var(--crema)]">Salud Inteligente<br/><em className="italic" style={{color:'var(--turq)'}}>Nayarit ID.</em></h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[clamp(1.05rem,2.1vw,1.4rem)] text-[var(--crema)]/60 leading-[1.5] max-w-[560px] mb-[2.4rem]">Tu identidad digital ahora cuida de tu salud. ConectaX integra el estándar internacional CIE-11 para orientarte en emergencias antes de llegar al hospital.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.4rem] items-center">
            <Reveal delay={0.1}>
              <div className="bg-[var(--crema)] rounded-[1.2rem] p-8 shadow-xl text-center relative overflow-hidden group border-2 border-transparent hover:border-[var(--verde)] transition-colors cursor-pointer" onClick={() => onNavigate('citizen', 'services', 'triage')}>
                <div className="w-20 h-20 bg-[var(--verde)] text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg transform transition-transform group-hover:scale-110">🩺</div>
                <h3 className="font-serif font-black text-2xl text-[var(--tinta)] mb-3">Iniciar Evaluación</h3>
                <p className="text-[var(--gris)] text-sm mb-6">Responde unas sencillas preguntas para obtener una orientación médica inmediata y recomendaciones de cuidado.</p>
                <div className="inline-block bg-[var(--tinta)] text-white font-bold py-3 px-8 rounded-full text-sm hover:bg-[var(--magenta)] transition-colors">Comenzar Triaje →</div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-[1rem]">
              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--verde)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">💬</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Atención Inmediata</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">Análisis de síntomas en tiempo real para determinar el nivel de urgencia y guiar los siguientes pasos.</p>
                </div>
              </div>

              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--verde)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">🌐</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Inclusión Geográfica</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">Soporte completo en wixárika y cora. Diseñado para comunidades sin acceso rápido a centros de salud.</p>
                </div>
              </div>

              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--verde)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">🛡️</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Privacidad Clínica</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">Tus datos médicos nunca se comparten. Cifrado absoluto para proteger tu evaluación e historial.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION STRATEGY */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--crema)]" id="implementacion">
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-start">
            <div>
              <Reveal delay={0.1}>
                <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem]" style={{background:'var(--magenta)'}}>Estrategia: Primero Tepic</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-serif font-black text-[clamp(2.1rem,5vw,3.5rem)] leading-[0.98] tracking-[-0.035em] mb-[1.4rem]">Implementación por <br/><em className="italic text-[var(--magenta)]">Colonias.</em></h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-[1rem] text-[var(--gris)] mb-[2rem] leading-[1.7]">Convertiremos cada colonia de Tepic en un nodo inteligente. Empezamos donde la gente más lo necesita, resolviendo problemas calle por calle hasta digitalizar todo el municipio.</p>
              </Reveal>
              <div className="bg-[var(--solar)] p-[1.5rem] rounded-[1.2rem] border-2 border-[var(--tinta)] shadow-[5px_5px_0_var(--tinta)] mb-[2rem]">
                <p className="font-serif italic text-[0.9rem] text-[var(--tinta)] leading-[1.6]">"El despliegue municipal de Tepic servirá como el laboratorio de datos para la Nayarit del futuro. Eficiencia calle por calle."</p>
              </div>
            </div>
            <div className="space-y-[1.5rem]">
              <Reveal delay={0.4}>
                <div className="bg-white p-[1.5rem] rounded-[1.2rem] border border-black/5 shadow-sm">
                   <div className="flex gap-[1.2rem]">
                      <div className="w-[45px] h-[45px] rounded-full bg-[var(--solar)] flex items-center justify-center font-black text-[1.2rem]">1</div>
                      <div>
                         <h4 className="font-serif font-black text-[1.1rem] mb-[0.2rem]">Modelo Piloto (Colonias)</h4>
                         <p className="text-[0.78rem] text-[var(--gris)] leading-[1.6]">Activación inmediata en colonias clave con Reporte Ciudadano e IA. Resultados en 30 días.</p>
                      </div>
                   </div>
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="bg-white p-[1.5rem] rounded-[1.2rem] border border-black/5 shadow-sm">
                   <div className="flex gap-[1.2rem]">
                      <div className="w-[45px] h-[45px] rounded-full bg-[var(--turq)] flex items-center justify-center font-black text-[1.2rem] text-white">2</div>
                      <div>
                         <h4 className="font-serif font-black text-[1.1rem] mb-[0.2rem]">Interoperabilidad Total</h4>
                         <p className="text-[0.78rem] text-[var(--gris)] leading-[1.6]">Conexión fluida entre Tesorería, Salud y Servicios para un gobierno en la palma de la mano.</p>
                      </div>
                   </div>
                </div>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="bg-white p-[1.5rem] rounded-[1.2rem] border border-black/5 shadow-sm">
                   <div className="flex gap-[1.2rem]">
                      <div className="w-[45px] h-[45px] rounded-full bg-[var(--magenta)] flex items-center justify-center font-black text-[1.2rem] text-white">3</div>
                      <div>
                         <h4 className="font-serif font-black text-[1.1rem] mb-[0.2rem]">Transparencia Trazable</h4>
                         <p className="text-[0.78rem] text-[var(--gris)] leading-[1.6]">Auditoría ciudadana automática. Cada peso invertido en Tepic tiene un rastro digital inalterable.</p>
                      </div>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAl FLOATING ASSISTANT BUTTON */}
      <button 
         onClick={() => onNavigate('citizen', 'home', 'chat')}
         className="fixed bottom-6 right-6 z-[950] w-[60px] h-[60px] rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.2)] bg-[var(--magenta)] text-white flex items-center justify-center transform transition-all hover:scale-105 hover:shadow-[0_15px_30px_rgba(229,0,122,0.4)] active:scale-95"
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* FOOTER */}
      <footer className="bg-[var(--tinta)] px-[2rem] py-[3.2rem] text-center border-t-[5px] border-[var(--magenta)]">
        <span className="font-serif font-black text-[1.4rem] tracking-[-0.03em] text-[var(--crema)] block mb-[0.3rem]">Geraldine <em className="italic text-[var(--magenta)]">Ponce</em></span>
        <p className="font-serif italic text-[0.8rem] text-[var(--crema)]/50 mb-[1.5rem]">Presidenta Municipal de Tepic · Candidata a Gobernadora 2027</p>
        
        <div className="text-[0.6rem] text-[var(--crema)]/30 max-w-[500px] mx-auto space-y-2 mb-[1.5rem]">
          <p>© 2026 ConnectaX. Todos los derechos reservados.</p>
          <p>Propiedad intelectual exclusiva de ConnectaX. Desarrollo tecnológico integral con colaboración estratégica de Google Cloud y tecnologías de Inteligencia Artificial avanzadas de Google.</p>
        </div>

        <div className="h-[2px] w-[60px] mx-auto my-[0.9rem] rounded-[2px]" style={{background:'linear-gradient(90deg,var(--magenta),var(--solar),var(--turq))'}}></div>
      </footer>
    </>
  );
};
