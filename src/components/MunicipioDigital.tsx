import React from 'react';
import {
  Globe, Monitor, Smartphone, ChevronRight, ArrowLeft, MapPin, Landmark, Waves,
} from 'lucide-react';
import {
  MUNICIPIOS, SECUENCIA_DESPLIEGUE,
  type AppView, type MunicipioId,
} from '../data/municipios';

interface MunicipioDigitalProps {
  municipioId: MunicipioId;
  onNavigate: (view: AppView, subView?: string, action?: string) => void;
}

// Misma banda de identidad estatal que la landing de Nayarit Digital:
// cada municipio es una instancia del ecosistema, no otra marca.
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

const TOTAL_MUNICIPIOS = 20;

export const MunicipioDigital = ({ municipioId, onNavigate }: MunicipioDigitalProps) => {
  const m = MUNICIPIOS[municipioId];
  const IconoMarca = m.icono;
  const [casoTitulo1, casoTitulo2] = m.caso.titulo.split('\n');

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden">
      <WixarikaBanda />

      {/* HERO — tinta profunda con el acento del municipio */}
      <div className="bg-[#0F2733] text-[#F8F6F1] min-h-[92vh] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, #F8F6F1 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Header */}
        <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(to bottom right, ${m.gradiente[0]}, ${m.gradiente[1]})`,
                boxShadow: `0 0 40px ${m.color}73`,
              }}
            >
              <IconoMarca className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-bold" style={{ color: m.colorTexto }}>{m.marca} · Nayarit Digital</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0aec0] mt-1">Municipio de {m.municipio}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('landing')} className="text-xs font-bold text-[#a0aec0] hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Nayarit Digital
            </button>
            <button onClick={() => onNavigate('autopista')} className="text-xs font-bold text-[#a0aec0] hover:text-white transition-colors uppercase tracking-widest">Autopista Digital</button>
            <button onClick={() => onNavigate('c5')} className="text-xs font-bold text-[#a0aec0] hover:text-white transition-colors uppercase tracking-widest">Tablero de Gobierno</button>
            <button
              onClick={() => onNavigate('citizen')}
              className="text-white px-6 py-3 rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all shadow-lg"
              style={{ backgroundColor: m.color }}
            >
              Abrir Mi Ventanilla
            </button>
          </nav>
        </header>

        {/* Hero principal */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 py-12">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3" style={{ color: m.colorTexto }}>
            <Waves className="w-4 h-4" /> Municipio {m.numero} de {TOTAL_MUNICIPIOS} · Despliegue estatal
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[4.8rem] font-serif font-normal leading-[1.1] tracking-tight mb-8 max-w-5xl">
            {m.tituloLinea1}<br />
            <em
              aria-hidden="true"
              className="italic font-medium text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${m.gradiente[0]}, ${m.gradiente[1]})` }}
            >{m.tituloEm}</em>
            <span className="sr-only">{m.tituloEm}</span>
          </h1>

          <p className="text-lg md:text-xl text-[#F8F6F1]/70 max-w-2xl font-sans tracking-wider mb-14 leading-relaxed">
            {m.descripcionHero}
          </p>

          {/* KPI Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mb-16">
            {m.chips.map((chip) => (
              <span
                key={chip.texto}
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border"
                style={{
                  backgroundColor: `${chip.color}33`,
                  borderColor: `${chip.color}66`,
                  color: chip.colorTexto,
                }}
              >{chip.texto}</span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => onNavigate('citizen')}
              className="text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3 hover:opacity-90"
              style={{ backgroundColor: m.color, boxShadow: `0 8px 32px ${m.color}59` }}
            >
              <Smartphone className="w-5 h-5" /> Abrir Mi Ventanilla
            </button>
            <button onClick={() => onNavigate('c5')} className="bg-[#F8F6F1]/10 hover:bg-[#F8F6F1]/20 text-[#F8F6F1] border border-[#F8F6F1]/30 px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
              <Monitor className="w-5 h-5" /> Tablero de Gobierno · Demo
            </button>
          </div>

          <p className="text-[#a0aec0] text-xs tracking-[0.2em] uppercase mt-20">Julio 2026 · {m.municipio}, Nayarit · v1.0</p>
        </main>
      </div>

      <WixarikaBanda />

      {/* CONTENIDO (tema claro) */}
      <div className="bg-[#F8F6F1] text-[#1a2438] py-24 px-6 md:px-12 relative">

        {/* 01: El caso del municipio */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#0A6B75]">01 · {m.caso.kicker}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-[#1a2438]">
              {casoTitulo1}{casoTitulo2 ? (<><br />{casoTitulo2}</>) : null}
            </h2>
            <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
              {m.caso.parrafo}
            </p>

            <div className="space-y-6">
              {m.caso.cards.map((card) => {
                const IconoCard = card.icon;
                return (
                  <div key={card.titulo} className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 shadow-sm" style={{ borderLeftColor: card.color }}>
                    <IconoCard className="w-8 h-8 shrink-0" style={{ color: card.color }} />
                    <div>
                      <h3 className="font-bold text-[17px] mb-2 text-[#1a2438]">{card.titulo}</h3>
                      <p className="text-sm text-[#4a5568] leading-relaxed">{card.texto}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panel de despliegue por localidades */}
          <div className="bg-[#0F2733] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, ${m.gradiente[0]}, ${m.gradiente[1]}, #F5A623)` }}></div>

            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-7 h-7" style={{ color: m.colorTexto }} />
              <h3 className="text-2xl font-serif font-normal tracking-wide">{m.panelLocalidades.titulo}</h3>
            </div>

            <p className="text-[#a0aec0] mb-8 text-[15px] leading-relaxed">
              {m.panelLocalidades.parrafo}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {m.localidades.map((loc) => (
                <div key={loc.nombre} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                  <span className="text-[14px] text-[#e8e0d4] font-medium">{loc.nombre}</span>
                  <span className="text-[10px] uppercase tracking-widest text-right shrink-0" style={{ color: m.colorTexto }}>{loc.rol}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('c5')}
              className="mt-10 w-full text-white py-4 rounded-md font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg hover:opacity-90"
              style={{ backgroundColor: m.color }}
            >
              Ver el mapa en el C5
            </button>
          </div>
        </div>

        {/* 02: Los 6 módulos */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <p className="text-[#0A6B75] text-xs font-bold tracking-[0.2em] uppercase mb-4">02 · Un solo ecosistema</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Los mismos 6 módulos.<br />La realidad de {m.municipio}.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              {m.modulosIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {m.modulos.map((mod) => {
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
                    Abrir en Mi Ventanilla <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 03: Secuencia de despliegue */}
        <div className="max-w-6xl mx-auto bg-white border border-[#d4ccc2] rounded-2xl p-8 md:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 border" style={{ borderColor: `${m.color}80`, color: '#0A6B75', backgroundColor: `${m.color}1a` }}>Hoja de ruta 20/20</div>
              <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight mb-6 text-[#1a2438]">Tepic probó el modelo.<br />{m.municipio} lo escala.</h2>
              <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                La expansión estatal no es una promesa: es una secuencia. Cada
                municipio valida que la plataforma opera con otra economía, otra
                geografía y otra presión de servicio — con la misma cuenta ciudadana.
              </p>
              <div className="flex gap-12">
                <div>
                  <h3 className="text-4xl font-black text-[#0A6B75] font-sans">{SECUENCIA_DESPLIEGUE.length}/{TOTAL_MUNICIPIOS}</h3>
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
                <Landmark className="w-5 h-5" style={{ color: m.color }} />
                Secuencia de despliegue
              </h3>
              <div className="space-y-4">
                {SECUENCIA_DESPLIEGUE.map((paso, idx) => {
                  const { id } = paso;
                  const esActual = id === m.id;
                  const fila = (
                    <>
                      <span className={`text-sm ${esActual ? 'text-[#1a2438] font-bold' : 'text-[#4a5568]'}`}>{idx + 1} · {paso.marca}</span>
                      <span className="font-bold font-mono text-xs uppercase tracking-widest" style={{ color: paso.estado === 'Activo' ? '#35704E' : '#0A6B75' }}>{paso.estado}</span>
                    </>
                  );
                  return id === 'tepic' ? (
                    <div key={id} className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">{fila}</div>
                  ) : (
                    <button
                      key={id}
                      onClick={() => onNavigate(id)}
                      className="w-full flex justify-between items-center border-b border-[#d4ccc2] pb-3 text-left hover:opacity-70 transition-opacity"
                      title={`Conocer ${paso.marca}`}
                    >{fila}</button>
                  );
                })}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#1a2438] font-black uppercase text-xs tracking-widest">Meta estatal</span>
                  <span className="font-black font-mono" style={{ color: m.color }}>{TOTAL_MUNICIPIOS}/{TOTAL_MUNICIPIOS} municipios</span>
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
