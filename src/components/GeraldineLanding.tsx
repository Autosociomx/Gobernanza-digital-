import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Ojos de Dios 3D component
const OjosEscena = () => {
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
    <div className="ojos-escena" id="ojosEscena">
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
    { role: 'ia', text: '¡Hola! Soy el asistente de la campaña. Pregúntame sobre las propuestas, los logros en Tepic o cómo participar. 🌽' },
    { role: 'u', text: '¿Qué es TEPICTU Salud?' },
    { role: 'ia', text: 'TEPICTU Salud es el sistema de triaje médico con inteligencia artificial que ya funciona en módulos DIF de Tepic. Evalúa la urgencia de tu malestar y te orienta a la atención correcta — y funciona sin internet, para que llegue hasta la sierra. El nombre viene de la palabra original que dio nombre a Tepic: el maíz que crece rápido. 💚' }
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
        <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 text-[1rem]" style={{ background: 'var(--solar)' }}>🌽</div>
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

export const GeraldineLanding = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (y) => setNavScrolled(y > 50));
  }, [scrollY]);

  return (
    <>
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[900] bg-[#FEF8EE]/95 backdrop-blur-[14px] px-[2rem] py-[0.95rem] flex items-center justify-between border-b border-black/10 transition-shadow duration-300 ${navScrolled ? 'shadow-[0_6px_28px_rgba(21,8,0,0.1)]' : ''}`}>
        <a href="#" className="font-serif font-black text-[1.2rem] tracking-tight text-[var(--tinta)] flex items-center gap-[0.55rem] no-underline">
          <span className="w-[14px] h-[14px] bg-[var(--magenta)] transform rotate-45 shrink-0 shadow-[2.5px_2.5px_0_var(--solar)]"></span>Geraldine Ponce
        </a>
        <ul className="hidden md:flex items-center gap-[2rem] m-0 p-0 list-none">
          <li><a href="#logros" className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Logros</a></li>
          <li><a href="#pilares" className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Propuesta</a></li>
          <li><a href="#ia" className="font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gris)] hover:text-[var(--magenta)] transition-colors">Asistente IA</a></li>
          <li><a href="#comunidad" className="bg-[var(--tinta)] hover:bg-[var(--magenta)] text-[var(--crema)] font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase px-[1.3rem] py-[0.5rem] rounded-full transition-colors">Únete</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="min-h-screen pt-[7.5rem] md:pt-[7.5rem] px-[2rem] pb-[4rem] grid grid-cols-1 md:grid-cols-[1.15fr_1fr] items-center gap-[3rem] relative overflow-hidden wix-bg" id="inicio">
        <div className="hero-banda-top"></div>
        <OjosEscena />
        
        <div className="relative z-10">
          <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.1, duration:0.6}}
            className="inline-flex items-center gap-[0.55rem] font-mono font-bold text-[0.62rem] tracking-[0.2em] uppercase text-[var(--tinta)] border-[1.5px] border-[var(--tinta)] bg-[var(--solar)] px-[0.95rem] py-[0.35rem] rounded-full mb-[1.6rem] shadow-[3px_3px_0_var(--tinta)]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--magenta)] animate-pulse"></span>Nayarit · Gobernatura · 2027
          </motion.div>
          
          <h1 className="font-serif font-black text-[clamp(4.2rem,11.5vw,9rem)] leading-[0.9] tracking-[-0.045em] mb-[0.32em]">
            <motion.span initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.8}} className="block text-[var(--tinta)]">Geraldine</motion.span>
            <motion.span initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.32, duration:0.8}} className="block text-[var(--magenta)] italic relative">
              Ponce
            </motion.span>
          </h1>
          
          <motion.p initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.45, duration:0.8}}
            className="font-serif italic text-[clamp(1.05rem,2.2vw,1.45rem)] text-[var(--gris)] mb-[1.1rem]">
            <strong className="not-italic font-semibold text-[var(--tinta)]">Presidenta Municipal de Tepic</strong>,<br/>
            primera mujer en gobernar la capital de Nayarit
          </motion.p>
          
          <motion.p initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.55, duration:0.8}}
            className="font-sans text-[clamp(0.9rem,1.8vw,1.05rem)] text-[var(--tinta)]/80 max-w-[450px] leading-[1.75] mb-[2rem]">
            La gobernante que <em className="not-italic font-bold text-[var(--magenta)]">ya transformó Tepic.</em><br/>
            Ahora lleva ese cambio a los 20 municipios de Nayarit.
          </motion.p>
          
          <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.65, duration:0.8}}
            className="flex flex-wrap gap-[0.85rem]">
            <a href="#pilares" className="bg-[var(--tinta)] hover:bg-[var(--magenta)] text-[var(--crema)] font-bold text-[0.88rem] px-[2rem] py-[0.9rem] rounded-full inline-flex items-center gap-[0.5rem] transition-all hover:-translate-y-1 shadow-[0_4px_0_var(--magenta)] hover:shadow-[0_7px_0_var(--tinta)]">
              Ver la propuesta →
            </a>
            <a href="#comunidad" className="bg-transparent hover:bg-[var(--turq)] text-[var(--tinta)] hover:text-white font-bold text-[0.88rem] px-[2rem] py-[0.9rem] rounded-full inline-flex items-center gap-[0.5rem] transition-all border-2 border-[var(--tinta)] hover:border-[var(--turq)] hover:-translate-y-1">
              Únete al movimiento
            </a>
          </motion.div>
        </div>

        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.4, duration:0.9}} className="relative z-10 w-full max-w-[300px] md:max-w-full mx-auto md:-order-none order-first">
          <div className="foto-frame group">
            <img 
              className="w-full aspect-[3/4] object-cover object-top rounded-[0.8rem] saturate-[1.06]" 
              src="/geraldine-hero.jpg" 
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=faces&auto=format&q=85"; }}
              alt="Geraldine Ponce — Presidenta Municipal de Tepic" 
            />
            <div className="absolute -top-[12px] -right-[10px] bg-[var(--magenta)] text-white font-mono text-[0.58rem] font-bold tracking-[0.08em] uppercase px-[0.75rem] py-[0.45rem] rounded-[0.4rem] shadow-[0_6px_18px_rgba(229,0,122,0.4)] max-w-[150px] text-center leading-[1.35]">1ª Presidenta Municipal de Tepic</div>
            <div className="absolute -bottom-[14px] -left-[12px] bg-[var(--crema)] border-2 border-[var(--tinta)] rounded-[0.7rem] px-[1rem] py-[0.6rem] shadow-[4px_4px_0_var(--solar)]">
              <span className="font-serif font-black text-[1.6rem] leading-none text-[var(--tinta)] block">30</span>
              <span className="font-mono text-[0.58rem] font-bold tracking-[0.1em] uppercase text-[var(--gris)] block mt-[0.12rem]">años · Tepic</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <div className="bg-[var(--tinta)] px-[2rem] py-[2.2rem] border-t-[5px] border-[var(--solar)]">
        <div className="max-w-[980px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[1rem] text-center">
          <div><span className="font-serif font-black text-[clamp(2rem,5vw,3.4rem)] leading-none text-[var(--magenta)] block">425K</span><span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50 mt-[0.4rem] block">Tepicenses gobernados</span></div>
          <div><span className="font-serif font-black text-[clamp(2rem,5vw,3.4rem)] leading-none text-[var(--turq)] block">100%</span><span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50 mt-[0.4rem] block">Obras trazables en vivo</span></div>
          <div><span className="font-serif font-black text-[clamp(2rem,5vw,3.4rem)] leading-none text-[var(--solar)] block">20</span><span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50 mt-[0.4rem] block">Municipios por digitalizar</span></div>
          <div><span className="font-serif font-black text-[clamp(2rem,5vw,3.4rem)] leading-none text-[#5DD39E] block">519K</span><span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50 mt-[0.4rem] block">Seguidores en Instagram</span></div>
        </div>
      </div>

      {/* LOGROS */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--crema)]" id="logros">
        <div className="max-w-[980px] mx-auto">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem]" style={{background:'var(--magenta)'}}>Resultados reales · Tepic 2021–2026</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2.1rem,5.5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1rem]">Mientras otros prometen,<br/><em className="italic text-[var(--magenta)]">ella ya lo hizo.</em></h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[clamp(1.05rem,2.1vw,1.4rem)] text-[var(--gris)] leading-[1.5] max-w-[560px] mb-[2.4rem]">Cada logro ya funciona hoy. No es plan de campaña — es historial de gobierno.</p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[2.6rem] items-start">
            <Reveal delay={0.1}>
              <div className="lf-wrap">
                <img 
                  className="w-full aspect-[4/5] object-cover object-top rounded-[0.65rem] saturate-[1.08]" 
                  src="/geraldine-logros.jpg" 
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=500&h=625&fit=crop&crop=faces&auto=format&q=80"; }}
                  alt="Geraldine Ponce en actividad de gobierno" 
                />
                <div className="absolute -bottom-[14px] -right-[12px] bg-[var(--crema)] border-2 border-[var(--tinta)] rounded-[0.7rem] px-[1rem] py-[0.65rem] shadow-[4px_4px_0_var(--turq)]">
                  <b className="font-serif font-black text-[1.25rem] text-[var(--tinta)] block leading-none">2021</b>
                  <small className="font-mono text-[0.56rem] font-bold tracking-[0.1em] uppercase text-[var(--gris)]">–2026 · En gobierno</small>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col gap-[1rem]">
              <Reveal delay={0.1} className="bg-white border-[1.5px] border-black/10 rounded-[1rem] p-[1.25rem_1.45rem] relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(21,8,0,0.12)] hover:border-black/30 group">
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-[5px] bg-[var(--magenta)]"></div>
                <div className="flex items-center gap-[0.75rem] mb-[0.4rem]"><span className="text-[1.45rem] shrink-0">🏗️</span><div className="font-serif font-semibold text-[1.02rem] tracking-[-0.01em] text-[var(--tinta)]">Obras Públicas Transparentes</div></div>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.68] pl-[2.2rem]">Cada peso de construcción vial, drenaje y equipamiento, visible en tiempo real desde cualquier celular. Cero opacidad.</p>
                <span className="inline-block mt-[0.6rem] ml-[2.2rem] font-mono text-[0.54rem] font-bold tracking-[0.14em] uppercase text-white bg-[var(--magenta)] px-[0.7rem] py-[0.22rem] rounded-full">Activo · Dashboard público</span>
              </Reveal>
              
              <Reveal delay={0.2} className="bg-white border-[1.5px] border-black/10 rounded-[1rem] p-[1.25rem_1.45rem] relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(21,8,0,0.12)] hover:border-black/30 group">
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-[5px] bg-[var(--turq)]"></div>
                <div className="flex items-center gap-[0.75rem] mb-[0.4rem]"><span className="text-[1.45rem] shrink-0">💳</span><div className="font-serif font-semibold text-[1.02rem] tracking-[-0.01em] text-[var(--tinta)]">Predial y Trámites Digitales</div></div>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.68] pl-[2.2rem]">Pagos municipales sin filas, con recordatorio por WhatsApp. Recaudación incrementada desde el primer mes.</p>
                <span className="inline-block mt-[0.6rem] ml-[2.2rem] font-mono text-[0.54rem] font-bold tracking-[0.14em] uppercase text-white bg-[var(--turq)] px-[0.7rem] py-[0.22rem] rounded-full">Activo · Tesorería digital</span>
              </Reveal>

              <Reveal delay={0.3} className="bg-white border-[1.5px] border-black/10 rounded-[1rem] p-[1.25rem_1.45rem] relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(21,8,0,0.12)] hover:border-black/30 group">
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-[5px] bg-[var(--solar)]"></div>
                <div className="flex items-center gap-[0.75rem] mb-[0.4rem]"><span className="text-[1.45rem] shrink-0">📱</span><div className="font-serif font-semibold text-[1.02rem] tracking-[-0.01em] text-[var(--tinta)]">Reportes Ciudadanos con IA</div></div>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.68] pl-[2.2rem]">Foto por WhatsApp → la IA clasifica y asigna → el vecino recibe seguimiento hasta resolución.</p>
                <span className="inline-block mt-[0.6rem] ml-[2.2rem] font-mono text-[0.54rem] font-bold tracking-[0.14em] uppercase text-[var(--tinta)] bg-[var(--solar)] px-[0.7rem] py-[0.22rem] rounded-full">Activo · Servicios públicos</span>
              </Reveal>

              <Reveal delay={0.4} className="bg-white border-[1.5px] border-black/10 rounded-[1rem] p-[1.25rem_1.45rem] relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(21,8,0,0.12)] hover:border-black/30 group">
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-[5px] bg-[var(--verde)]"></div>
                <div className="flex items-center gap-[0.75rem] mb-[0.4rem]"><span className="text-[1.45rem] shrink-0">💚</span><div className="font-serif font-semibold text-[1.02rem] tracking-[-0.01em] text-[var(--tinta)]">TEPICTU Salud</div></div>
                <p className="text-[0.82rem] text-[var(--gris)] leading-[1.68] pl-[2.2rem]">Triaje médico con IA en módulos DIF. Funciona sin internet. Nombre de la palabra original que da origen a "Tepic".</p>
                <span className="inline-block mt-[0.6rem] ml-[2.2rem] font-mono text-[0.54rem] font-bold tracking-[0.14em] uppercase text-white bg-[var(--verde)] px-[0.7rem] py-[0.22rem] rounded-full">Activo · Bienestar social</span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ESCALERA DE VALOR (Added requested Value Ladder integration) */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--blanco)]" id="escalera">
        <div className="max-w-[980px] mx-auto">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[var(--tinta)] px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem] bg-[var(--solar)]">
              Estrategia Política Integral
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2.1rem,5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1rem]">La Escalera de<br/><em className="italic text-[var(--magenta)]">Valor Electoral.</em></h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[clamp(1.05rem,2.1vw,1.4rem)] text-[var(--gris)] leading-[1.5] max-w-[560px] mb-[2.4rem]">
              Cómo la modernización consolida el poder a través de resultados trazables. ConnectX como conductor político hacia 2027.
            </p>
          </Reveal>

          <div className="flex flex-col gap-[1.5rem]">
            {/* Step 1 */}
            <Reveal delay={0.1} className="bg-[var(--crema)] p-[2rem] rounded-[1rem] border-l-[6px] border-[var(--magenta)] flex flex-col md:flex-row gap-[1.5rem] md:items-center relative overflow-hidden transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(21,8,0,0.08)]">
              <div className="md:w-1/3 shrink-0">
                <span className="inline-block font-mono text-[0.55rem] font-bold tracking-[0.15em] uppercase px-[0.7rem] py-[0.2rem] rounded-full bg-[var(--magenta)] text-white mb-[0.8rem]">Día 1 · Auditoría</span>
                <h4 className="font-serif font-bold text-[1.5rem] text-[var(--tinta)] leading-[1.1]">El Acercamiento <br/>con Evidencia</h4>
              </div>
              <div className="md:w-2/3 md:pl-[2rem] md:border-l border-black/10">
                <p className="text-[0.9rem] text-[var(--gris)] leading-[1.6]"><strong>Iniciar relación:</strong> Ofrecemos a la gobernante un análisis gratuito de sus redes sociales (519K seguidores). Demostramos dónde está la fricción ciudadana de forma cuantitativa, exponiendo los folios perdidos del modelo actual. La solución inicia evidenciando el dolor real.</p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.2} className="bg-[var(--crema)] p-[2rem] rounded-[1rem] border-l-[6px] border-[var(--turq)] flex flex-col md:flex-row gap-[1.5rem] md:items-center relative overflow-hidden transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(21,8,0,0.08)]">
              <div className="md:w-1/3 shrink-0">
                <span className="inline-block font-mono text-[0.55rem] font-bold tracking-[0.15em] uppercase px-[0.7rem] py-[0.2rem] rounded-full bg-[var(--turq)] text-white mb-[0.8rem]">Día 30 · Victoria Temprana</span>
                <h4 className="font-serif font-bold text-[1.5rem] text-[var(--tinta)] leading-[1.1]">Bot Tepic <br/>(El Quick Win)</h4>
              </div>
              <div className="md:w-2/3 md:pl-[2rem] md:border-l border-black/10">
                <p className="text-[0.9rem] text-[var(--gris)] leading-[1.6]"><strong>El día a día:</strong> Despliegue del módulo de atención mediante inteligencia artificial en WhatsApp. Se erradican las filas y repunta radicalmente la respuesta institucional. El capital político inicial se afianza mediante un éxito de atención directa.</p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={0.3} className="bg-[var(--crema)] p-[2rem] rounded-[1rem] border-l-[6px] border-[var(--solar)] flex flex-col md:flex-row gap-[1.5rem] md:items-center relative overflow-hidden transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(21,8,0,0.08)]">
              <div className="md:w-1/3 shrink-0">
                <span className="inline-block font-mono text-[0.55rem] font-bold tracking-[0.15em] uppercase px-[0.7rem] py-[0.2rem] rounded-full bg-[var(--solar)] text-[var(--tinta)] mb-[0.8rem]">Mes 6 · Core Business</span>
                <h4 className="font-serif font-bold text-[1.5rem] text-[var(--tinta)] leading-[1.1]">Gobernanza Total <br/>y Trazabilidad</h4>
              </div>
              <div className="md:w-2/3 md:pl-[2rem] md:border-l border-black/10">
                <p className="text-[0.9rem] text-[var(--gris)] leading-[1.6]"><strong>Control estructural:</strong> ConnectX centraliza Tesorería, Salud (TEPICTU) y Módulos Ciudadanos. Las obras son 100% trazables. Se instala un panel maestro (C5 digital) en el despacho gubernamental, transformando "intentos" en "gestión integral".</p>
              </div>
            </Reveal>

            {/* Step 4 */}
            <Reveal delay={0.4} className="bg-[#150800] p-[2rem] rounded-[1rem] border-l-[6px] border-[var(--verde)] flex flex-col md:flex-row gap-[1.5rem] md:items-center relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-[radial-gradient(ellipse_at_top_right,_var(--verde)_0%,_transparent_70%)] opacity-20 pointer-events-none"></div>
              <div className="md:w-1/3 shrink-0 relative z-10">
                <span className="inline-block font-mono text-[0.55rem] font-bold tracking-[0.15em] uppercase px-[0.7rem] py-[0.2rem] rounded-full bg-[var(--verde)] text-white mb-[0.8rem]">Año 3+ · El FOCO</span>
                <h4 className="font-serif font-bold text-[1.5rem] text-white leading-[1.1]">Gobernatura de<br/>Nayarit 2027</h4>
              </div>
              <div className="md:w-2/3 md:pl-[2rem] md:border-l border-white/20 relative z-10">
                <p className="text-[0.9rem] text-slate-300 leading-[1.6]"><strong>El Salto Político (MOAT):</strong> De un municipio inteligente, la propuesta tecnológica se ofrece hacia las 20 cabeceras restantes del estado. ConnectX construye la infraestructura logística y digital necesaria para respaldar de manera aplastante y cuantificable la candidatura estatal.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FRASE */}
      <div className="frase wix-bg">
        <div className="max-w-[920px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[2.4rem] items-center text-center md:text-left">
          <Reveal delay={0.1}>
            <div className="ff-wrap mx-auto md:mx-0">
              <img 
                className="w-full aspect-square object-cover object-top rounded-full block" 
                src="/geraldine-perfil.jpg" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1586996292898-71f4036c4e07?w=300&h=300&fit=crop&crop=faces&auto=format&q=80"; }}
                alt="Geraldine Ponce" 
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="font-serif font-semibold italic text-[clamp(1.5rem,3.6vw,2.7rem)] text-white leading-[1.25] mb-[1rem]">"Si pude digitalizar Tepic con <em className="italic text-[var(--solar)]">425 mil habitantes,</em> puedo digitalizar Nayarit entero."</blockquote>
            <cite className="font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/65 not-italic">— Geraldine Ponce · Presidenta Municipal de Tepic</cite>
          </Reveal>
        </div>
      </div>

      {/* PILARES */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--hueso)]" id="pilares">
        <div className="max-w-[980px] mx-auto">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem]" style={{background:'var(--turq)'}}>Propuesta de Gobierno · 2027–2033</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2.1rem,5.5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1rem]">Cuatro pilares.<br/><em className="italic" style={{color:'var(--turq)'}}>Un solo Nayarit.</em></h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[clamp(1.05rem,2.1vw,1.4rem)] text-[var(--gris)] leading-[1.5] max-w-[560px] mb-[2.4rem]">Productos ya construidos en Tepic. Listos el primer día de gobierno.</p>
          </Reveal>

          <Reveal delay={0.4} className="grid grid-cols-1 md:grid-cols-2 gap-[1.3rem] mt-[2.2rem]">
            <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(21,8,0,0.14)] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[6px] after:bg-[var(--magenta)]">
              <span className="inline-block font-mono text-[0.56rem] font-bold tracking-[0.18em] uppercase text-white px-[0.8rem] py-[0.24rem] rounded-full mb-[1.1rem] bg-[var(--magenta)]">Transparencia</span>
              <span className="block text-[2.6rem] mb-[0.85rem]">🏛️</span>
              <div className="font-serif font-black text-[1.35rem] tracking-[-0.02em] text-[var(--tinta)] mb-[0.55rem]">Gobierno Transparente</div>
              <p className="text-[0.83rem] text-[var(--gris)] leading-[1.72] mb-[1rem]">Trazabilidad satelital de cada obra estatal. Contratos, avances y auditoría ciudadana en tiempo real.</p>
              <p className="font-serif italic text-[0.92rem] leading-[1.5] pl-[0.9rem] border-l-[3px] border-[var(--magenta)] text-[var(--magenta)]">"Cada peso del erario, visible en el celular de cualquier nayarita."</p>
            </div>

            <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(21,8,0,0.14)] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[6px] after:bg-[var(--verde)]">
              <span className="inline-block font-mono text-[0.56rem] font-bold tracking-[0.18em] uppercase text-white px-[0.8rem] py-[0.24rem] rounded-full mb-[1.1rem] bg-[var(--verde)]">Campo</span>
              <span className="block text-[2.6rem] mb-[0.85rem]">🌽</span>
              <div className="font-serif font-black text-[1.35rem] tracking-[-0.02em] text-[var(--tinta)] mb-[0.55rem]">El Sexenio del Campesino</div>
              <p className="text-[0.83rem] text-[var(--gris)] leading-[1.72] mb-[1rem]">Mapeo satelital de la sierra. IA que recomienda cultivos por suelo, altitud y clima. Sensores IoT en el celular del productor.</p>
              <p className="font-serif italic text-[0.92rem] leading-[1.5] pl-[0.9rem] border-l-[3px] border-[var(--verde)] text-[var(--verde)]">"Llego con el mapa ya hecho. Los demás llegan con promesas."</p>
            </div>

            <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(21,8,0,0.14)] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[6px] after:bg-[var(--coral)]">
              <span className="inline-block font-mono text-[0.56rem] font-bold tracking-[0.18em] uppercase text-white px-[0.8rem] py-[0.24rem] rounded-full mb-[1.1rem] bg-[var(--coral)]">Salud</span>
              <span className="block text-[2.6rem] mb-[0.85rem]">💚</span>
              <div className="font-serif font-black text-[1.35rem] tracking-[-0.02em] text-[var(--tinta)] mb-[0.55rem]">TEPICTU Salud</div>
              <p className="text-[0.83rem] text-[var(--gris)] leading-[1.72] mb-[1rem]">Triaje médico con IA en cada clínica estatal. Funciona offline — llega a El Nayar, Huajicori, La Yesca.</p>
              <p className="font-serif italic text-[0.92rem] leading-[1.5] pl-[0.9rem] border-l-[3px] border-[var(--coral)] text-[var(--coral)]">"Inteligencia artificial del mar a la sierra. Sin excepción."</p>
            </div>

            <div className="bg-white rounded-[1.2rem] border-[1.5px] border-black/10 p-[2rem_1.9rem] relative overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(21,8,0,0.14)] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[6px] after:bg-[var(--turq)]">
              <span className="inline-block font-mono text-[0.56rem] font-bold tracking-[0.18em] uppercase text-white px-[0.8rem] py-[0.24rem] rounded-full mb-[1.1rem] bg-[var(--turq)]">PyMEs</span>
              <span className="block text-[2.6rem] mb-[0.85rem]">🛒</span>
              <div className="font-serif font-black text-[1.35rem] tracking-[-0.02em] text-[var(--tinta)] mb-[0.55rem]">PyMEs Nayaritas</div>
              <p className="text-[0.83rem] text-[var(--gris)] leading-[1.72] mb-[1rem]">Digitalización para tortillerías, panaderías y restaurantes. Tecnología de grandes empresas, para el pueblo.</p>
              <p className="font-serif italic text-[0.92rem] leading-[1.5] pl-[0.9rem] border-l-[3px] border-[var(--turq)] text-[var(--turq)]">"El primer gobierno que digitaliza al pueblo, no a las corporaciones."</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ASISTENTE IA */}
      <section className="px-[2rem] py-[5.5rem] bg-[var(--tinta)] relative overflow-hidden" id="ia">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='40,3 77,40 40,77 3,40' fill='none' stroke='%23FFB300' stroke-width='1.8'/%3E%3Cpolygon points='40,14 66,40 40,66 14,40' fill='none' stroke='%2300BCD4' stroke-width='1.4'/%3E%3C/svg%3E\")", backgroundSize: '80px 80px'}}></div>
        <div className="max-w-[980px] mx-auto relative z-10">
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[var(--tinta)] px-[0.9rem] py-[0.32rem] rounded-full mb-[1.1rem] bg-[var(--solar)]">Propuesta de valor · Inteligencia Artificial</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-serif font-black text-[clamp(2.1rem,5.5vw,3.9rem)] leading-[0.98] tracking-[-0.035em] mb-[1rem] text-[var(--crema)]">Pregúntale a la<br/><em className="italic" style={{color:'var(--solar)'}}>campaña. Directamente.</em></h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif italic text-[clamp(1.05rem,2.1vw,1.4rem)] text-[var(--crema)]/60 leading-[1.5] max-w-[560px] mb-[2.4rem]">El primer asistente de IA de una campaña en Nayarit: responde dudas sobre propuestas, trámites y resultados — las 24 horas, en lenguaje claro.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.4rem] items-center">
            <Reveal delay={0.1}>
              <ChatIA />
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-[1rem]">
              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--solar)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">💬</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Respuestas al instante, 24/7</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">Cualquier ciudadano pregunta sobre propuestas, trámites municipales o resultados — y recibe respuesta clara al momento, sin esperar oficinas.</p>
                </div>
              </div>

              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--solar)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">🗳️</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Escucha ciudadana inteligente</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">Cada conversación detecta las preocupaciones reales por colonia: agua, seguridad, baches. La campaña responde a lo que la gente realmente pide.</p>
                </div>
              </div>

              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--solar)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">🌐</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Habla tu idioma</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">Español, wixárika, náhuatl o cora: la IA responde en la lengua del ciudadano. Inclusión real para los pueblos originarios de Nayarit.</p>
                </div>
              </div>

              <div className="flex gap-[1rem] items-start bg-white/5 border border-white/10 rounded-[0.9rem] p-[1.05rem_1.2rem] transition-all hover:bg-white/10 hover:border-[var(--solar)]/35">
                <span className="text-[1.4rem] shrink-0 mt-[0.1rem]">📊</span>
                <div>
                  <span className="block font-sans font-bold text-[0.85rem] text-[var(--crema)] mb-[0.2rem]">Transparencia verificable</span>
                  <p className="text-[0.76rem] text-[var(--crema)]/55 leading-[1.6]">El asistente cita datos reales del gobierno municipal: obras, presupuestos, avances. No opina — informa con evidencia.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--tinta)] px-[2rem] py-[2.6rem] text-center border-t-[5px] border-[var(--magenta)]">
        <span className="font-serif font-black text-[1.9rem] tracking-[-0.03em] text-[var(--crema)] block mb-[0.3rem]">Geraldine <em className="italic text-[var(--magenta)]">Ponce</em></span>
        <p className="font-serif italic text-[0.88rem] text-[var(--crema)]/50 mb-[1rem]">Presidenta Municipal de Tepic · Candidata a Gobernadora de Nayarit 2027</p>
        <div className="h-[3px] w-[84px] mx-auto my-[0.9rem] rounded-[2px]" style={{background:'linear-gradient(90deg,var(--magenta),var(--solar),var(--turq),var(--verde))'}}></div>
        <p className="font-mono text-[0.58rem] text-[var(--crema)]/25">Estrategia digital: <a href="https://connectx.mx" target="_blank" rel="noreferrer" className="text-[var(--solar)] hover:opacity-80">ConnectX</a> · Tepic, Nayarit</p>
      </footer>
    </>
  );
};
