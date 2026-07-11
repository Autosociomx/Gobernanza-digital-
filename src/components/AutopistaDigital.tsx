import React from 'react';
import {
  ArrowLeft, ArrowRight, Smartphone, ChevronRight, KeyRound, Wallet,
  Megaphone, HardHat, HeartPulse, MessageCircle, HandHeart, ShieldCheck,
  WifiOff, Trash2, Scale, Globe, MapPin, Milestone,
} from 'lucide-react';
import { SALIDAS_NAYARIT, type AppView } from '../data/municipios';

interface AutopistaDigitalProps {
  onNavigate: (view: AppView, subView?: string, action?: string) => void;
}

// Misma banda de identidad estatal: la Autopista es la cara ciudadana
// del ecosistema, no otra marca.
const WixarikaBanda = () => (
  <div className="w-full h-2.5 flex relative z-50">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="flex-1 flex">
        <div className="flex-1 bg-[#D81E5B]"></div>
        <div className="flex-1 bg-[#F5A623]"></div>
        <div className="flex-1 bg-[#0FA3B1]"></div>
        <div className="flex-1 bg-[#4C9F70]"></div>
        <div className="flex-1 bg-[#E85D04]"></div>
      </div>
    ))}
  </div>
);

// Franja de carretera: asfalto con raya central discontinua. Es el hilo
// visual que une el hero, los carriles y las salidas.
const FranjaCarretera = () => (
  <div className="w-full h-10 bg-[#1a2438] relative overflow-hidden" aria-hidden="true">
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] flex gap-6 px-4">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="flex-1 bg-[#F5A623] rounded-full min-w-[24px]"></div>
      ))}
    </div>
  </div>
);

// Los 6 carriles: los módulos del ecosistema contados en segunda
// persona — lo que TÚ haces en la pista, no lo que el gobierno gestiona.
const CARRILES = [
  {
    icon: Wallet,
    color: '#0FA3B1',
    nombre: 'Paga',
    detalle: 'Predial, agua, multas y licencias desde tu teléfono, con recibo fiscal al instante. Sin filas, sin vueltas, sin horario.',
  },
  {
    icon: Megaphone,
    color: '#D81E5B',
    nombre: 'Reporta',
    detalle: 'Un bache, una luminaria, una fuga: mándalo por WhatsApp y sigue tu reporte en vivo — Recibido → Asignado → Resuelto.',
  },
  {
    icon: HardHat,
    color: '#F5A623',
    nombre: 'Vigila tu obra',
    detalle: 'Cada obra pública cerca de tu casa tiene ficha abierta: cuánto cuesta, quién la hace y cómo avanza, con fotos cada semana.',
  },
  {
    icon: HeartPulse,
    color: '#4C9F70',
    nombre: 'Cuida tu salud',
    detalle: 'Orientación médica que funciona hasta sin internet: dime tus síntomas y te digo si es casa, centro de salud u hospital.',
  },
  {
    icon: MessageCircle,
    color: '#E85D04',
    nombre: 'Pregunta',
    detalle: 'Un asistente 24/7 en español, wixárika y náayeri que sabe de requisitos, horarios y trámites — y los hace por ti.',
  },
  {
    icon: HandHeart,
    color: '#8F5E06',
    nombre: 'Recibe apoyo',
    detalle: 'Despensas, becas y programas sociales con seguimiento transparente: sabes qué te toca y en qué va tu solicitud.',
  },
];

// Reglas de la pista: los compromisos con el ciudadano. Este es el
// corazón apolítico de la Autopista — infraestructura, no campaña.
const REGLAS = [
  {
    icon: KeyRound,
    color: '#0FA3B1',
    titulo: 'Una sola llave, tuya',
    texto: 'Tu CURP o tu teléfono es tu pase para toda la pista. Te registras una vez y circulas por los 20 municipios sin volver a empezar.',
  },
  {
    icon: Scale,
    color: '#4C9F70',
    titulo: 'Infraestructura, no campaña',
    texto: 'La Autopista es un bien público: tus datos pertenecen al municipio y a ti, nunca a un partido. Prohibido su uso electoral o publicitario.',
  },
  {
    icon: Trash2,
    color: '#D81E5B',
    titulo: 'Tu historial se borra si tú quieres',
    texto: 'Di "olvida mis datos" y se borran. Lo sensible (como tu salud) se anonimiza automáticamente a los 90 días.',
  },
  {
    icon: WifiOff,
    color: '#F5A623',
    titulo: 'Sin internet también funciona',
    texto: 'Kioscos, WhatsApp, modo offline y atención en lenguas originarias: la pista no excluye a quien no tiene señal o smartphone.',
  },
  {
    icon: ShieldCheck,
    color: '#E85D04',
    titulo: 'Datos abiertos por diseño',
    texto: 'Los números agregados — reportes resueltos, obras, tiempos de respuesta — son públicos. Cualquiera puede auditar la pista.',
  },
  {
    icon: MapPin,
    color: '#8F5E06',
    titulo: 'La misma pista en todo Nayarit',
    texto: 'No importa en qué municipio vivas: mismos servicios, mismas reglas, misma cuenta. Nadie viaja en carril de segunda.',
  },
];

export const AutopistaDigital = ({ onNavigate }: AutopistaDigitalProps) => {
  const activas = SALIDAS_NAYARIT.filter((s) => s.portal).length;

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#F5A623]/30">
      <WixarikaBanda />

      {/* HERO — asfalto de noche, la pista abierta */}
      <div className="bg-[#1a2438] text-[#F8F6F1] min-h-[92vh] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, #F8F6F1 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Header */}
        <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#F5A623] to-[#E85D04] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,166,35,0.4)] text-[#1a2438]">
              <Milestone className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#FFC96A]">Autopista Digital · Nayarit</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0aec0] mt-1">Un bien público para el ciudadano</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('landing')} className="text-xs font-bold text-[#a0aec0] hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Nayarit Digital
            </button>
            <button
              onClick={() => onNavigate('citizen')}
              className="bg-[#F5A623] text-[#1a2438] px-6 py-3 rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#F5A623]/85 transition-all shadow-lg"
            >
              Entrar a la pista
            </button>
          </nav>
        </header>

        {/* Hero principal */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 py-12">
          <p className="text-[#FFC96A] text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
            <Milestone className="w-4 h-4" /> 20 municipios · Una sola pista
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[4.8rem] font-serif font-normal leading-[1.1] tracking-tight mb-8 max-w-5xl">
            La Autopista Digital<br />
            donde <em aria-hidden="true" className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#E85D04]">tú conduces</em><span className="sr-only">tú conduces</span>
          </h1>

          <p className="text-lg md:text-xl text-[#F8F6F1]/70 max-w-2xl font-sans tracking-wider mb-14 leading-relaxed">
            Todo Nayarit circula por la misma pista: una sola cuenta ciudadana
            para pagar, reportar, preguntar y ser atendido en cualquiera de los
            20 municipios. Sin filas, sin ventanillas, sin colores de partido.
          </p>

          {/* KPI Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#F5A623]/20 text-[#ffc96a] border border-[#F5A623]/40 uppercase">1 Cuenta · CURP o teléfono</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">6 Carriles de servicio</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#4C9F70]/20 text-[#7de3a8] border border-[#4C9F70]/40 uppercase">20 Salidas municipales</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40 uppercase">0 Uso electoral de tus datos</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => onNavigate('citizen')} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#1a2438] px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_32px_rgba(245,166,35,0.35)] flex items-center gap-3">
              <Smartphone className="w-5 h-5" /> Entrar a la pista
            </button>
            <button onClick={() => document.getElementById('reglas-de-la-pista')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#F8F6F1]/10 hover:bg-[#F8F6F1]/20 text-[#F8F6F1] border border-[#F8F6F1]/30 px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" /> Reglas de la pista
            </button>
          </div>

          <p className="text-[#a0aec0] text-xs tracking-[0.2em] uppercase mt-20">Julio 2026 · Infraestructura pública ciudadana · v1.0</p>
        </main>
      </div>

      <FranjaCarretera />

      {/* CONTENIDO (tema claro) */}
      <div className="bg-[#F8F6F1] text-[#1a2438] py-24 px-6 md:px-12 relative">

        {/* 01: Tu pase único */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <div>
            <p className="text-[#8F5E06] text-xs font-bold tracking-[0.2em] uppercase mb-4">01 · Tu pase único</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-[#1a2438]">Te registras una vez.<br />Circulas por todo el estado.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
              Tu CURP o tu número de teléfono es tu TAG: la llave que abre
              cualquier trámite en cualquier municipio. Si te mudas de Tepic a
              Bahía, tu historial viaja contigo — pagos, reportes, constancias.
              La pista te reconoce, no te hace volver a empezar.
            </p>
            <button onClick={() => onNavigate('citizen')} className="bg-[#1a2438] hover:bg-[#1a2438]/90 text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
              Crear mi cuenta <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta TAG */}
          <div className="bg-[#1a2438] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5A623] via-[#E85D04] to-[#D81E5B]"></div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FFC96A]">Pase ciudadano · Autopista Digital</p>
              <KeyRound className="w-6 h-6 text-[#FFC96A]" />
            </div>
            <p className="font-mono text-2xl tracking-[0.15em] mb-2 text-[#F8F6F1]">•••• •••• •••• CURP</p>
            <p className="text-[#a0aec0] text-sm mb-8">o tu número de teléfono — tú eliges</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 rounded-lg py-4">
                <p className="text-2xl font-black text-[#FFC96A]">1</p>
                <p className="text-[9px] uppercase tracking-widest text-[#a0aec0] mt-1 font-bold">Cuenta</p>
              </div>
              <div className="bg-white/5 rounded-lg py-4">
                <p className="text-2xl font-black text-[#7EE8F2]">6</p>
                <p className="text-[9px] uppercase tracking-widest text-[#a0aec0] mt-1 font-bold">Carriles</p>
              </div>
              <div className="bg-white/5 rounded-lg py-4">
                <p className="text-2xl font-black text-[#7DE3A8]">20</p>
                <p className="text-[9px] uppercase tracking-widest text-[#a0aec0] mt-1 font-bold">Salidas</p>
              </div>
            </div>
          </div>
        </div>

        {/* 02: Los 6 carriles */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <p className="text-[#8F5E06] text-xs font-bold tracking-[0.2em] uppercase mb-4">02 · Los carriles</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Seis carriles.<br />Los mismos en todo Nayarit.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              No importa por qué salida entres: los carriles no cambian. Lo que
              haces en la capital lo haces igual en la sierra o en la costa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARRILES.map((carril) => {
              const IconoCarril = carril.icon;
              return (
                <div key={carril.nombre} className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: carril.color }}></div>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: `${carril.color}1a`, color: carril.color }}>
                    <IconoCarril className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1a2438] mb-2 text-lg">{carril.nombre}</h3>
                  <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">{carril.detalle}</p>
                  <button onClick={() => onNavigate('citizen')} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: carril.color }}>
                    Tomar este carril <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 03: Las 20 salidas */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <p className="text-[#8F5E06] text-xs font-bold tracking-[0.2em] uppercase mb-4">03 · Las salidas</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Veinte salidas.<br />Ninguna se queda fuera de la pista.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              {activas} salidas ya están abiertas — toca una para conocer su portal.
              Las demás están señalizadas: la pista llega a todo el estado.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SALIDAS_NAYARIT.map((salida, idx) => {
              const abierta = Boolean(salida.portal);
              const contenido = (
                <>
                  <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${abierta ? 'bg-[#4C9F70] text-white' : 'bg-[#d4ccc2] text-[#4a5568]'}`}>{String(idx + 1).padStart(2, '0')}</span>
                  <span className={`text-[13px] font-semibold leading-tight ${abierta ? 'text-[#1a2438]' : 'text-[#4a5568]'}`}>{salida.nombre}</span>
                </>
              );
              if (salida.portal && salida.portal !== 'tepic') {
                const destino = salida.portal;
                return (
                  <button
                    key={salida.nombre}
                    onClick={() => onNavigate(destino)}
                    className="flex items-center gap-3 bg-white border-2 border-[#4C9F70]/50 p-4 rounded-lg text-left hover:shadow-md hover:border-[#4C9F70] transition-all"
                    title={`Conocer el portal de ${salida.nombre}`}
                  >{contenido}</button>
                );
              }
              if (salida.portal === 'tepic') {
                return (
                  <button
                    key={salida.nombre}
                    onClick={() => onNavigate('citizen')}
                    className="flex items-center gap-3 bg-white border-2 border-[#4C9F70]/50 p-4 rounded-lg text-left hover:shadow-md hover:border-[#4C9F70] transition-all"
                    title="Abrir el portal ciudadano de Tepic"
                  >{contenido}</button>
                );
              }
              return (
                <div key={salida.nombre} className="flex items-center gap-3 bg-[#F8F6F1] border border-dashed border-[#d4ccc2] p-4 rounded-lg">
                  {contenido}
                </div>
              );
            })}
          </div>
        </div>

        {/* 04: Reglas de la pista */}
        <div id="reglas-de-la-pista" className="max-w-6xl mx-auto scroll-mt-8">
          <div className="text-center mb-16">
            <p className="text-[#8F5E06] text-xs font-bold tracking-[0.2em] uppercase mb-4">04 · Reglas de la pista</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Esta pista es tuya.<br />Y tiene reglas que te protegen.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              La Autopista Digital es infraestructura pública — como el agua o el
              alumbrado. No pertenece a un gobierno en turno ni a una campaña:
              pertenece al ciudadano que la usa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {REGLAS.map((regla) => {
              const IconoRegla = regla.icon;
              return (
                <div key={regla.titulo} className="bg-white border border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: regla.color }}></div>
                  <IconoRegla className="w-8 h-8 mb-5" style={{ color: regla.color }} />
                  <h3 className="font-bold text-lg mb-3 text-[#1a2438]">{regla.titulo}</h3>
                  <p className="text-[14px] text-[#4a5568] leading-relaxed">{regla.texto}</p>
                </div>
              );
            })}
          </div>

          {/* CTA final */}
          <div className="bg-[#1a2438] text-white rounded-2xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D81E5B] via-[#F5A623] to-[#0FA3B1]"></div>
            <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight mb-4">La pista está abierta.</h2>
            <p className="text-[#a0aec0] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Con tu CURP o tu teléfono, hoy mismo puedes pagar, reportar y
              preguntar. Bienvenido a la Autopista Digital de Nayarit.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => onNavigate('citizen')} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#1a2438] px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all shadow-lg flex items-center gap-3">
                <Smartphone className="w-5 h-5" /> Entrar a la pista
              </button>
              <button onClick={() => onNavigate('landing')} className="bg-[#F8F6F1]/10 hover:bg-[#F8F6F1]/20 text-[#F8F6F1] border border-[#F8F6F1]/30 px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
                <Globe className="w-5 h-5" /> Conocer la plataforma
              </button>
            </div>
          </div>
        </div>

      </div>

      <FranjaCarretera />
      <WixarikaBanda />
    </div>
  );
};
