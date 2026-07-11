import React from 'react';
import {
  Anchor, Waves, Landmark, Activity, Globe, Monitor, Smartphone,
  ChevronRight, ArrowLeft, HeartPulse, Bot, HandHeart, Construction,
  Receipt, MapPin, TrendingUp, ShieldCheck
} from 'lucide-react';

interface BahiaDigitalProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive' | 'bahia', subView?: string, action?: string) => void;
}

// Misma banda de identidad estatal que la landing de Nayarit Digital:
// Bahía es una instancia municipal del ecosistema, no otra marca.
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

// Las 10 localidades clave del municipio — el despliegue "colonia por
// colonia" de Tepic aquí se vuelve "localidad por localidad".
const LOCALIDADES = [
  { nombre: 'Valle de Banderas', rol: 'Cabecera municipal' },
  { nombre: 'Bucerías', rol: 'Corredor turístico' },
  { nombre: 'Nuevo Vallarta', rol: 'Zona hotelera' },
  { nombre: 'Mezcales', rol: 'Centro logístico' },
  { nombre: 'San Vicente', rol: 'Núcleo habitacional' },
  { nombre: 'San Juan de Abajo', rol: 'Valle agrícola' },
  { nombre: 'La Cruz de Huanacaxtle', rol: 'Puerto y marina' },
  { nombre: 'Punta de Mita', rol: 'Turismo premium' },
  { nombre: 'Sayulita', rol: 'Pueblo Mágico' },
  { nombre: 'Jarretaderas', rol: 'Frontera con Vallarta' },
];

// El mismo ecosistema de 6 módulos de NAYARIT_DIGITAL_V2.md, aterrizado
// a la realidad económica de Bahía de Banderas (turismo + ZOFEMAT).
const MODULOS = [
  {
    icon: Receipt,
    color: '#0FA3B1',
    nombre: 'Tesorería Digital',
    detalle: 'Predial, agua, licencias y ZOFEMAT 100% en línea. Recaudación turística trazable: cada peso de la Riviera Nayarit queda auditado.',
  },
  {
    icon: Construction,
    color: '#F5A623',
    nombre: 'Trazabilidad de Obras',
    detalle: 'Cada obra con ficha pública: contrato, empresa, monto y avance semanal con fotos — de la carretera federal a los caminos sacacosechas.',
  },
  {
    icon: Activity,
    color: '#D81E5B',
    nombre: 'Servicios Públicos Inteligente',
    detalle: 'Reportes por WhatsApp con IA: bacheo, luminarias, basura y fugas. Seguimiento Recibido → Asignado → Resuelto en tiempo real.',
  },
  {
    icon: HeartPulse,
    color: '#4C9F70',
    nombre: 'Salud Digital',
    detalle: 'Triaje médico con IA que funciona sin internet — para las colonias del valle y las comunidades de la costa norte.',
  },
  {
    icon: Bot,
    color: '#E85D04',
    nombre: 'Asistente IA Ciudadano',
    detalle: 'Atiende 24/7 en español, wixárika, náayeri e inglés — porque en Bahía el vecino y el visitante conviven en la misma ventanilla.',
  },
  {
    icon: HandHeart,
    color: '#8F5E06',
    nombre: 'Bienestar Social',
    detalle: 'Panel para DIF y trabajadores sociales: despensas, becas y seguimiento de casos vulnerables detectados por el propio ecosistema.',
  },
];

export const BahiaDigital = ({ onNavigate }: BahiaDigitalProps) => {
  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#0FA3B1]/20">
      <WixarikaBanda />

      {/* HERO — tinta profunda con acento teal: el mar de la bahía */}
      <div className="bg-[#0F2733] text-[#F8F6F1] min-h-[92vh] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, #7EE8F2 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Header */}
        <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0FA3B1] to-[#4C9F70] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(15,163,177,0.45)] text-white">
              <Anchor className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#7EE8F2]">Bahía Digital · Nayarit Digital</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0aec0] mt-1">Municipio de Bahía de Banderas</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('landing')} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Nayarit Digital
            </button>
            <button onClick={() => onNavigate('citizen')} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest">Portal Ciudadano</button>
            <button
              onClick={() => onNavigate('c5')}
              className="bg-[#0FA3B1] text-white px-6 py-3 rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#0FA3B1]/80 transition-all shadow-lg"
            >
              Entrar al Sistema
            </button>
          </nav>
        </header>

        {/* Hero principal */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 py-12">
          <p className="text-[#7EE8F2] text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
            <Waves className="w-4 h-4" /> Municipio 2 de 20 · Despliegue estatal
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[4.8rem] font-serif font-normal leading-[1.1] tracking-tight mb-8 max-w-5xl">
            El gobierno digital<br />
            llega a <em aria-hidden="true" className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#0FA3B1] to-[#4C9F70]">la bahía</em><span className="sr-only">la bahía</span>
          </h1>

          <p className="text-lg md:text-xl text-[#F8F6F1]/70 max-w-2xl font-sans tracking-wider mb-14 leading-relaxed">
            Después de Tepic Digital, el ecosistema ConnectX aterriza en el motor
            turístico de Nayarit: una sola cuenta ciudadana para pagar, reportar
            y ser atendido — de Valle de Banderas a Punta de Mita.
          </p>

          {/* KPI Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mb-16">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">6 Módulos del Ecosistema</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#4C9F70]/20 text-[#7de3a8] border border-[#4C9F70]/40 uppercase">≈200 mil habitantes</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#F5A623]/20 text-[#ffc96a] border border-[#F5A623]/40 uppercase">10 Localidades clave</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40 uppercase">Riviera Nayarit</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">LlaveMx Art. 74</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => onNavigate('citizen')} className="bg-[#0FA3B1] hover:bg-[#0FA3B1]/90 text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_32px_rgba(15,163,177,0.35)] flex items-center gap-3">
              <Smartphone className="w-5 h-5" /> Portal Ciudadano
            </button>
            <button onClick={() => onNavigate('c5')} className="bg-[#F8F6F1]/10 hover:bg-[#F8F6F1]/20 text-[#F8F6F1] border border-[#F8F6F1]/30 px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
              <Monitor className="w-5 h-5" /> C5 Governance Hub
            </button>
          </div>

          <p className="text-[#a0aec0] text-xs tracking-[0.2em] uppercase mt-20">Julio 2026 · Bahía de Banderas, Nayarit · v1.0</p>
        </main>
      </div>

      <WixarikaBanda />

      {/* CONTENIDO (tema claro) */}
      <div className="bg-[#F8F6F1] text-[#1a2438] py-24 px-6 md:px-12 relative">

        {/* 01: Por qué Bahía es el municipio 2 */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div>
            <p className="text-[#0A6B75] text-xs font-bold tracking-[0.2em] uppercase mb-4">01 · El caso Bahía de Banderas</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-[#1a2438]">El municipio que más crece<br />merece el gobierno más ágil.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
              Creado en 1989, Bahía de Banderas es el municipio más joven de Nayarit
              y su motor económico: la Riviera Nayarit recibe millones de visitantes
              al año mientras el valle sostiene la agricultura. Un gobierno en papel
              no puede administrar dos economías a la vez — el ecosistema digital sí.
            </p>

            <div className="space-y-6">
              <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#0FA3B1] shadow-sm">
                <TrendingUp className="w-8 h-8 text-[#0FA3B1] shrink-0" />
                <div>
                  <h3 className="font-bold text-[17px] mb-2 text-[#1a2438]">Doble economía, una tesorería</h3>
                  <p className="text-sm text-[#4a5568] leading-relaxed">Predial turístico, ZOFEMAT, licencias de construcción y comercio: los conceptos de mayor recaudación del estado, hoy dispersos en ventanillas, unificados en línea.</p>
                </div>
              </div>
              <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#4C9F70] shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#4C9F70] shrink-0" />
                <div>
                  <h3 className="font-bold text-[17px] mb-2 text-[#1a2438]">Mismo estándar que Tepic</h3>
                  <p className="text-sm text-[#4a5568] leading-relaxed">Identidad LlaveMx, expediente ciudadano único y datos abiertos por diseño. Bahía no estrena software experimental: hereda la plataforma ya validada en la capital.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de despliegue */}
          <div className="bg-[#0F2733] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0FA3B1] via-[#4C9F70] to-[#F5A623]"></div>

            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-7 h-7 text-[#7EE8F2]" />
              <h3 className="text-2xl font-serif font-normal tracking-wide">Localidad por localidad</h3>
            </div>

            <p className="text-[#a0aec0] mb-8 text-[15px] leading-relaxed">
              El modelo "Colonia Inteligente" probado en Tepic se replica aquí
              como despliegue por localidad: cada una con su mapa de calor de
              reportes, sus obras trazables y su ventanilla digital.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {LOCALIDADES.map((loc) => (
                <div key={loc.nombre} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                  <span className="text-[14px] text-[#e8e0d4] font-medium">{loc.nombre}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#7EE8F2] text-right shrink-0">{loc.rol}</span>
                </div>
              ))}
            </div>

            <button onClick={() => onNavigate('c5')} className="mt-10 w-full bg-[#0FA3B1] hover:bg-[#0FA3B1]/90 text-white py-4 rounded-md font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg">
              Ver el mapa en el C5
            </button>
          </div>
        </div>

        {/* 02: Los 6 módulos */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <p className="text-[#0A6B75] text-xs font-bold tracking-[0.2em] uppercase mb-4">02 · Un solo ecosistema</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Los mismos 6 módulos.<br />La realidad de la bahía.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              Una sola cuenta ciudadana — CURP o teléfono — para todo el ecosistema.
              Lo que en Tepic se llama trámite, en Bahía también atiende al turismo,
              al puerto y al campo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULOS.map((mod) => {
              const IconoModulo = mod.icon;
              return (
                <div key={mod.nombre} className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: mod.color }}></div>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: `${mod.color}1a`, color: mod.color }}>
                    <IconoModulo className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1a2438] mb-2 text-lg">{mod.nombre}</h3>
                  <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">{mod.detalle}</p>
                  <button onClick={() => onNavigate('citizen')} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: mod.color }}>
                    Abrir en el portal <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 03: De Tepic a la bahía */}
        <div className="max-w-6xl mx-auto bg-white border border-[#d4ccc2] rounded-2xl p-8 md:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block border border-[#0FA3B1]/50 text-[#0A6B75] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 bg-[#0FA3B1]/10">Hoja de ruta 20/20</div>
              <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight mb-6 text-[#1a2438]">Tepic probó el modelo.<br />Bahía prueba la escala.</h2>
              <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                La expansión estatal no es una promesa: es una secuencia. El segundo
                municipio valida que la plataforma opera fuera de la capital — con
                otra economía, otra geografía y otra presión de servicio.
              </p>
              <div className="flex gap-12">
                <div>
                  <h3 className="text-4xl font-black text-[#0A6B75] font-sans">2/20</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#4a5568] mt-2 font-bold">Municipios en despliegue</p>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#4C9F70] font-sans">1</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#4a5568] mt-2 font-bold">Cuenta ciudadana única</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F6F1] p-8 rounded-xl border border-[#d4ccc2]">
              <h3 className="font-bold text-xl mb-6 text-[#1a2438] flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#0FA3B1]" />
                Secuencia de despliegue
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                  <span className="text-[#4a5568] text-sm">1 · Tepic Digital</span>
                  <span className="font-bold text-[#35704E] font-mono text-xs uppercase tracking-widest">Activo</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                  <span className="text-[#1a2438] text-sm font-bold">2 · Bahía Digital</span>
                  <span className="font-bold text-[#0A6B75] font-mono text-xs uppercase tracking-widest">En despliegue</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                  <span className="text-[#4a5568] text-sm">3 · Siguiente municipio</span>
                  <span className="font-bold text-[#8F5E06] font-mono text-xs uppercase tracking-widest">Por definir</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#1a2438] font-black uppercase text-xs tracking-widest">Meta estatal</span>
                  <span className="font-black text-[#0FA3B1] font-mono">20/20 municipios</span>
                </div>
              </div>
              <button onClick={() => onNavigate('landing')} className="mt-8 w-full bg-[#14213D] hover:bg-[#14213D]/90 text-white py-4 rounded-md font-bold uppercase tracking-widest text-[11px] transition-colors flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" /> Volver a Nayarit Digital
              </button>
            </div>
          </div>
        </div>

      </div>

      <WixarikaBanda />
    </div>
  );
};
