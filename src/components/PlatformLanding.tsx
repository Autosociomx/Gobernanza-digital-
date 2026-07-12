import React, { useState, useEffect } from 'react';
import { 
  Menu, ShieldCheck, Activity, Users, FileText, Lock, Globe, Monitor, Smartphone, CheckCircle2, ChevronRight, Clock, ArrowRight, Zap, Scale, LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MUNICIPIOS, type AppView } from '../data/municipios';

interface PlatformLandingProps {
  onNavigate: (view: AppView, subView?: string, action?: string) => void;
}

const WixarikaBanda = () => (
  <div className="w-full h-2.5 flex relative z-50">
    {Array.from({length: 20}).map((_, i) => (
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

export const PlatformLanding = ({ onNavigate }: PlatformLandingProps) => {

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#D81E5B]/20">
      <WixarikaBanda />
      
      {/* HERO COVER (Tinta background) */}
      <div className="bg-[#14213D] text-[#F8F6F1] min-h-[95vh] flex flex-col relative overflow-hidden">
        {/* Background Nierika pattern abstraction */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, #F8F6F1 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Header */}
        <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-gradient-to-br from-[#D81E5B] to-[#0FA3B1] rounded-full flex items-center justify-center font-black text-2xl shadow-[0_0_40px_rgba(216,30,91,0.4)] text-white">
               N
             </div>
             <div>
               <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#F5A623]">NayaritDigital · ConnectX</p>
             </div>
           </div>
           
           <nav className="hidden lg:flex items-center gap-8">
             <button onClick={() => onNavigate('autopista')} className="text-xs font-bold text-[#F5A623] hover:text-[#FFC96A] transition-colors uppercase tracking-widest">Autopista Digital</button>
             <button onClick={() => document.getElementById('despliegue-municipal')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest">Municipios</button>
             <button onClick={() => onNavigate('c5')} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest">Tablero de Gobierno</button>
             <button
               onClick={() => onNavigate('citizen')}
               className="bg-[#D81E5B] text-white px-6 py-3 rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D81E5B]/80 transition-all shadow-lg"
             >
               Abrir Mi Ventanilla
             </button>
           </nav>
        </header>

        {/* Main Hero Content */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 py-12">
          <h1 className="text-5xl md:text-7xl lg:text-[4.8rem] font-serif font-normal leading-[1.1] tracking-tight mb-8 max-w-5xl">
             Los trámites de Nayarit,<br/>
             <em aria-hidden="true" className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#D81E5B] to-[#0FA3B1]">sin filas y sin vueltas</em><span className="sr-only">sin filas y sin vueltas</span>
          </h1>

          <p className="text-lg md:text-xl text-[#F8F6F1]/70 max-w-2xl font-sans tracking-wider mb-14 leading-relaxed">
            Paga, reporta y consulta a tu municipio desde tu teléfono. Una plataforma pública alineada a la Ley Nacional de Simplificación y Digitalización — al servicio del ciudadano.
          </p>

          {/* KPI Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mb-16">
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40 uppercase">18 Módulos Activos</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">Asistente 24/7</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#F5A623]/20 text-[#ffc96a] border border-[#F5A623]/40 uppercase">100+ Pagos en línea</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#4C9F70]/20 text-[#7de3a8] border border-[#4C9F70]/40 uppercase">Meta: 20/20 Municipios</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40 uppercase">Marco legal LNETB</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">Preparado para LlaveMx</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
             <button onClick={() => onNavigate('citizen')} className="bg-[#D81E5B] hover:bg-[#D81E5B]/90 text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_32px_rgba(216,30,91,0.35)] flex items-center gap-3">
               <Smartphone className="w-5 h-5" /> Abrir Mi Ventanilla
             </button>
             <button onClick={() => onNavigate('c5')} className="bg-[#F8F6F1]/10 hover:bg-[#F8F6F1]/20 text-[#F8F6F1] border border-[#F8F6F1]/30 px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
               <Monitor className="w-5 h-5" /> Tablero de Gobierno · Demo
             </button>
          </div>

          <p className="text-[#a0aec0] text-xs tracking-[0.2em] uppercase mt-20">Julio 2026 · Plataforma pública en despliegue · v3.0</p>
        </main>
      </div>

      <WixarikaBanda />

      {/* CONTENT SECTION (Light Theme) */}
      <div className="bg-[#F8F6F1] text-[#1a2438] py-24 px-6 md:px-12 relative">
        
        {/* 01: El Mandato Federal & Reloj Digital */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div>
            <p className="text-[#D81E5B] text-xs font-bold tracking-[0.2em] uppercase mb-4">01 · Tu derecho al trámite digital</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-[#1a2438]">Ya no es un favor.<br/>Es la ley.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
               La Ley Nacional para Eliminar Trámites Burocráticos (DOF 16 de julio de 2025), reglamentaria del Art. 25 constitucional, obliga a los tres órdenes de gobierno: tu municipio <em>debe</em> ofrecerte trámites digitales. Hoy, solo ~3% de los municipios del país ha registrado sus trámites en el Catálogo Nacional.
            </p>

            <div className="space-y-6">
              <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#D81E5B] shadow-sm">
                <Scale className="w-8 h-8 text-[#D81E5B] shrink-0" />
                <div>
                  <h3 className="font-bold text-[17px] mb-2 text-[#1a2438]">Un derecho exigible</h3>
                  <p className="text-sm text-[#4a5568] leading-relaxed">La fila que haces hoy ya no debería existir: la ley obliga al municipio a atenderte en línea y los órganos de fiscalización vigilan que cumpla.</p>
                </div>
              </div>
              <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#0FA3B1] shadow-sm">
                <Lock className="w-8 h-8 text-[#0FA3B1] shrink-0" />
                <div>
                  <h3 className="font-bold text-[17px] mb-2 text-[#1a2438]">Preparado para LlaveMx</h3>
                  <p className="text-sm text-[#4a5568] leading-relaxed">La arquitectura está lista para integrarse con LlaveMx (Art. 74 LNETB), el estándar de identidad federal: una sola llave para tus trámites en cualquier nivel de gobierno.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Clock Panel */}
          <div className="bg-[#14213D] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-center">
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D81E5B] via-[#F5A623] to-[#0FA3B1]"></div>
             
             <div className="flex items-center gap-3 mb-6">
               <Clock className="w-7 h-7 text-[#F5A623]" />
               <h3 className="text-2xl font-serif font-normal tracking-wide">El Reloj Digital ya está corriendo</h3>
             </div>

             <p className="text-[#a0aec0] mb-8 text-[15px] leading-relaxed">
               La LNETB está vigente desde julio de 2025 y sus lineamientos desde octubre de 2025. Cada mes que un trámite sigue en papel es tiempo que el ciudadano pierde en filas y traslados.
             </p>

             <div className="space-y-8">
               <div>
                 <h3 className="text-[#FF7AA8] text-[11px] font-bold uppercase tracking-widest mb-3">Lo que pierdes con el papel</h3>
                 <ul className="space-y-2 text-[14px] text-[#e8e0d4]">
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>Medio día de trabajo por cada fila, traslado y "vuelva mañana".</span></li>
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>Trámites sin folio: nadie puede decirte en qué va lo tuyo.</span></li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-[#4C9F70] text-[11px] font-bold uppercase tracking-widest mb-3">Lo que ganas con la pista</h3>
                 <ul className="space-y-2 text-[14px] text-[#e8e0d4]">
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Trámites 24/7 desde tu teléfono, con folio rastreable.</span></li>
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Resultados visibles en 30 días, publicados en datos abiertos.</span></li>
                 </ul>
               </div>
             </div>

             <button onClick={() => onNavigate('autopista')} className="mt-10 w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#14213D] py-4 rounded-md font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg">
               Conocer la Autopista Digital
             </button>
          </div>
        </div>

        {/* 03: 5 Capas */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
             <p className="text-[#0A6B75] text-xs font-bold tracking-[0.2em] uppercase mb-4">03 · Arquitectura del Ecosistema</p>
             <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">5 capas. Un solo sistema nervioso.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#D81E5B]"></div>
               <div className="w-12 h-12 bg-[#D81E5B]/10 text-[#D81E5B] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">1</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg">Landing Page</h3>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">La cara pública del ecosistema. Narrativa wixárika y posicionamiento estatal.</p>
               <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-[#D81E5B] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Inicio <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#0FA3B1]"></div>
               <div className="w-12 h-12 bg-[#0FA3B1]/10 text-[#0B7C87] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">2</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg">Tablero de Gobierno</h3>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">Así trabaja tu gobierno: gestión, tesorería y auditoría a la vista. Versión demo.</p>
               <button onClick={() => onNavigate('c5')} className="text-[#0B7C87] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Ver tablero <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#4C9F70]"></div>
               <div className="w-12 h-12 bg-[#4C9F70]/10 text-[#3B7A56] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">3</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg">Mi Ventanilla</h3>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">La ventanilla única en tu bolsillo: 15 servicios, pagos y tu expediente digital.</p>
               <button onClick={() => onNavigate('citizen')} className="text-[#3B7A56] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Abrir Mi Ventanilla <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#F5A623]"></div>
               <div className="w-12 h-12 bg-[#F5A623]/10 text-[#8F5E06] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">4</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg">Asistente 24/7</h3>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">Pregunta, reporta o paga conversando — con datos abiertos (datos.gob.mx, INEGI).</p>
               <button onClick={() => onNavigate('citizen', undefined, 'voice')} className="text-[#8F5E06] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Preguntar <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#E85D04]"></div>
               <div className="w-12 h-12 bg-[#E85D04]/10 text-[#B54903] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">5</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg">Autopista Digital</h3>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">La cara ciudadana: una cuenta, seis carriles y veinte salidas — con reglas que te protegen.</p>
               <button onClick={() => onNavigate('autopista')} className="text-[#B54903] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Recorrer la pista <ChevronRight className="w-3 h-3"/></button>
             </div>
          </div>
        </div>

        {/* 04: Pueblos Originarios */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
             <p className="text-[#35704E] text-xs font-bold tracking-[0.2em] uppercase mb-4">04 · Pueblos Originarios Primero</p>
             <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Las ciudades indígenas<br/>dejan de ser las últimas de la fila.</h2>
             <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
                La transformación digital que solo llega a la capital no es transformación: es privilegio.
                ConnectX se diseñó para que el gobierno llegue al teléfono en la sierra — sin que nadie
                tenga que bajar a Tepic a hacer fila.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-[#14213D] text-white p-8 rounded-xl relative overflow-hidden shadow-lg">
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D81E5B] via-[#F5A623] to-[#0FA3B1]"></div>
               <Users className="w-8 h-8 text-[#F5A623] mb-5" />
               <h3 className="font-bold text-lg mb-3">Del Nayar entra al Top 200</h3>
               <p className="text-[14px] text-[#a0aec0] leading-relaxed mb-5">
                  El municipio más remoto del estado — corazón náayeri y wixárika — proyecta pasar
                  del lugar <span className="text-white font-bold">#2,344</span> al
                  <span className="text-[#F5A623] font-bold"> #198</span> nacional en gobierno digital.
                  Ese dato es el argumento para toda la sierra: La Yesca y Huajicori siguen la misma ruta.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#4C9F70]">Cobertura 20/20 · Nadie se queda fuera</p>
             </div>

             <div className="bg-white border border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden shadow-sm">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#4C9F70]"></div>
               <Globe className="w-8 h-8 text-[#4C9F70] mb-5" />
               <h3 className="font-bold text-lg mb-3 text-[#1a2438]">En su lengua, no solo en español</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed mb-5">
                  La plataforma opera en español, náayeri (cora) y wixárika. Un trámite que no se
                  entiende es una fila disfrazada: aquí el ciudadano de la sierra lee su gobierno
                  en su propia lengua.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#3B7A56]">3 lenguas · Selector integrado en el C5</p>
             </div>

             <div className="bg-white border border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden shadow-sm">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#E85D04]"></div>
               <Smartphone className="w-8 h-8 text-[#E85D04] mb-5" />
               <h3 className="font-bold text-lg mb-3 text-[#1a2438]">Infraestructura con fondo propio</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed mb-5">
                  El FAISPIAM — el fondo federal de infraestructura para pueblos indígenas y
                  afromexicanos — está integrado en la tesorería del sistema: cada peso destinado
                  a la sierra queda trazado y auditable.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#B54903]">Trazabilidad ASF · Bienestar social</p>
             </div>
          </div>
        </div>

        {/* 05: Despliegue Municipal */}
        <div id="despliegue-municipal" className="max-w-6xl mx-auto mb-32 scroll-mt-8">
          <div className="text-center mb-16">
             <p className="text-[#0A6B75] text-xs font-bold tracking-[0.2em] uppercase mb-4">05 · Despliegue Municipal</p>
             <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Un estado, 20 municipios.<br/>Instancia por instancia.</h2>
             <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
                Cada municipio estrena su propia puerta de entrada al ecosistema —
                misma cuenta ciudadana, misma plataforma, identidad local propia.
                Hoy: la capital activa y cuatro municipios en despliegue.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="bg-white border border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden shadow-sm">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#D81E5B]"></div>
               <div className="flex items-center justify-between mb-5">
                 <h3 className="font-bold text-lg text-[#1a2438]">1 · Tepic Digital</h3>
                 <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-[#4C9F70]/10 text-[#35704E] border border-[#4C9F70]/30">Activo</span>
               </div>
               <p className="text-[14px] text-[#4a5568] leading-relaxed mb-5">
                  La capital fue el piloto: portal ciudadano, C5 y tesorería digital
                  operando colonia por colonia. Es la instancia que ves en todo este sitio.
               </p>
               <button onClick={() => onNavigate('citizen')} className="text-[#D81E5B] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">Abrir Mi Ventanilla <ChevronRight className="w-3 h-3"/></button>
             </div>

             {Object.values(MUNICIPIOS).map((mun) => (
               <div key={mun.id} className="bg-[#0F2733] text-white p-8 rounded-xl relative overflow-hidden shadow-lg">
                 <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, ${mun.gradiente[0]}, ${mun.gradiente[1]})` }}></div>
                 <div className="flex items-center justify-between mb-5">
                   <h3 className="font-bold text-lg">{mun.numero} · {mun.marca}</h3>
                   <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border" style={{ backgroundColor: `${mun.color}33`, borderColor: `${mun.color}66`, color: mun.colorTexto }}>En despliegue</span>
                 </div>
                 <p className="text-[14px] text-[#a0aec0] leading-relaxed mb-5">
                    {mun.resumen}
                 </p>
                 <button onClick={() => onNavigate(mun.id)} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all" style={{ color: mun.colorTexto }}>Conocer {mun.marca} <ChevronRight className="w-3 h-3"/></button>
               </div>
             ))}

             <div className="bg-white border border-dashed border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-5">
                 <h3 className="font-bold text-lg text-[#4a5568]">6-20 · Siguientes</h3>
                 <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-[#F5A623]/10 text-[#8F5E06] border border-[#F5A623]/30">Hoja de ruta</span>
               </div>
               <p className="text-[14px] text-[#4a5568] leading-relaxed mb-5">
                  San Blas, Ixtlán del Río, Del Nayar, Tecuala, Acaponeta… la meta
                  20/20 replica este mismo patrón hasta cubrir todo Nayarit.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#8F5E06]">Meta: cobertura estatal 20/20</p>
             </div>
          </div>
        </div>

        {/* 07: Modelo Financiero & Ranking */}
        <div className="max-w-6xl mx-auto bg-white border border-[#d4ccc2] rounded-2xl p-8 md:p-14 shadow-sm">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="inline-block border border-[#F5A623]/50 text-[#7A5210] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 bg-[#F5A623]/10">Ranking Gobierno Digital</div>
                 <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight mb-6 text-[#1a2438]">Proyección: Tepic, del #840 al #38.</h2>
                 <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                    Con el Programa Municipios Digitales, Nayarit tiene la meta de ser el único estado de México con cobertura digital municipal total (20/20) — y cada avance se publica en datos abiertos para que tú lo verifiques.
                 </p>
                 <div className="flex gap-12">
                    <div>
                       <h3 className="text-4xl font-black text-[#8F5E06] font-sans">#38</h3>
                       <p className="text-[10px] uppercase tracking-widest text-[#4a5568] mt-2 font-bold">Proyección Nacional</p>
                    </div>
                    <div>
                       <h3 className="text-4xl font-black text-[#4C9F70] font-sans">20/20</h3>
                       <p className="text-[10px] uppercase tracking-widest text-[#4a5568] mt-2 font-bold">Meta Estatal</p>
                    </div>
                 </div>
              </div>

              <div className="bg-[#F8F6F1] p-8 rounded-xl border border-[#d4ccc2]">
                 <h3 className="font-bold text-xl mb-6 text-[#1a2438] flex items-center gap-3">
                   <Activity className="w-5 h-5 text-[#D81E5B]" />
                   Modelo de Ingresos
                 </h3>
                 <p className="text-sm text-[#4a5568] mb-6">El catálogo digitaliza 100+ conceptos, proyectando una recaudación propia masiva, disminuyendo la dependencia federal del 89.6%.</p>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                       <span className="text-[#4a5568] text-sm">Agua y Saneamiento (15)</span>
                       <span className="font-bold text-[#35704E] font-mono">$120–180 M</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                       <span className="text-[#4a5568] text-sm">Impuesto Predial (12)</span>
                       <span className="font-bold text-[#35704E] font-mono">$45–80 M</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                       <span className="text-[#4a5568] text-sm">Obras y Desarrollo (18)</span>
                       <span className="font-bold text-[#35704E] font-mono">$8–25 M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-[#1a2438] font-black uppercase text-xs tracking-widest">Potencial Total</span>
                       <span className="font-black text-[#D81E5B] font-mono">$185–321 M / año</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      <WixarikaBanda />
    </div>
  );
};

