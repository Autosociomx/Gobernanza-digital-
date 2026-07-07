import React, { useState, useEffect } from 'react';
import { 
  Menu, ShieldCheck, Activity, Users, FileText, Lock, Globe, Monitor, Smartphone, CheckCircle2, ChevronRight, Clock, ArrowRight, Zap, Scale, LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PlatformLandingProps {
  onNavigate: (view: 'landing' | 'c5' | 'citizen' | 'dev' | 'executive', subView?: string, action?: string) => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
             <button onClick={() => onNavigate('citizen')} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest">Portal Ciudadano</button>
             <button onClick={() => onNavigate('c5')} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest">C5 Dashboard</button>
             <button onClick={() => onNavigate('executive')} className="text-xs font-bold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors uppercase tracking-widest">Executive Folder</button>
             <button 
               onClick={() => onNavigate('c5')}
               className="bg-[#D81E5B] text-white px-6 py-3 rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D81E5B]/80 transition-all shadow-lg"
             >
               Entrar al Sistema
             </button>
           </nav>

           <button
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
             aria-expanded={mobileMenuOpen}
             className="lg:hidden p-2 text-[#F8F6F1] hover:text-[#0FA3B1] transition-colors"
           >
             <Menu className="w-7 h-7" />
           </button>
        </header>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="lg:hidden relative z-30 mx-6 mb-4 bg-[#1a2b52] border border-[#F8F6F1]/15 rounded-xl overflow-hidden shadow-2xl">
            {[
              { label: 'Portal Ciudadano', view: 'citizen' as const },
              { label: 'C5 Dashboard', view: 'c5' as const },
              { label: 'Executive Folder', view: 'executive' as const },
            ].map((item) => (
              <button
                key={item.view}
                onClick={() => { setMobileMenuOpen(false); onNavigate(item.view); }}
                className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#F8F6F1] hover:bg-[#0FA3B1]/20 border-b border-[#F8F6F1]/10 flex items-center justify-between"
              >
                {item.label} <ChevronRight className="w-4 h-4 text-[#0FA3B1]" />
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('c5'); }}
              className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest bg-[#D81E5B] text-white"
            >
              Entrar al Sistema
            </button>
          </nav>
        )}

        {/* Main Hero Content */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 py-12">
          <h1 className="text-5xl md:text-7xl lg:text-[4.8rem] font-serif font-normal leading-[1.1] tracking-tight mb-8 max-w-5xl">
             El sistema operativo<br/>
             del <em className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#D81E5B] to-[#0FA3B1]">nuevo gobierno</em><br/>
             de Nayarit
          </h1>
          
          <p className="text-lg md:text-xl text-[#F8F6F1]/70 max-w-2xl font-sans tracking-wider mb-14 leading-relaxed">
            Carta de Presentación Estratégica. Plataforma integral de gobernanza digital alineada a la Ley Nacional de Simplificación y Digitalización.
          </p>

          {/* KPI Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mb-16">
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40 uppercase">18 Módulos Activos</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">Asistente IA Integrado</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#F5A623]/20 text-[#ffc96a] border border-[#F5A623]/40 uppercase">Catálogo de Pagos Municipales</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#4C9F70]/20 text-[#7de3a8] border border-[#4C9F70]/40 uppercase">Meta: 20/20 Municipios</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40 uppercase">Marco LNETB</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40 uppercase">Preparado para LlaveMx · Art. 74</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
             <button onClick={() => onNavigate('citizen')} className="bg-[#D81E5B] hover:bg-[#D81E5B]/90 text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_32px_rgba(216,30,91,0.35)] flex items-center gap-3">
               <Smartphone className="w-5 h-5" /> Portal Ciudadano
             </button>
             <button onClick={() => onNavigate('c5')} className="bg-[#F8F6F1]/10 hover:bg-[#F8F6F1]/20 text-[#F8F6F1] border border-[#F8F6F1]/30 px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3">
               <Monitor className="w-5 h-5" /> C5 Governance Hub
             </button>
          </div>

          <p className="text-[#a0aec0] text-xs tracking-[0.2em] uppercase mt-20">Julio 2026 · Nayarit Digital · v3.0</p>
        </main>
      </div>

      <WixarikaBanda />

      {/* CONTENT SECTION (Light Theme) */}
      <div className="bg-[#F8F6F1] text-[#1a2438] py-24 px-6 md:px-12 relative">
        
        {/* 01: El Mandato Federal & Reloj Digital */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div>
            <p className="text-[#D81E5B] text-xs font-bold tracking-[0.2em] uppercase mb-4">01 · Marco de Obligación Legal</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-[#1a2438]">Ya no es una opción.<br/>Es la ley.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
               La Ley Nacional de Simplificación y Digitalización (2025) tiene rango constitucional bajo los Arts. 25 y 73. Tepic <em>debe</em> digitalizar. La fecha límite federal para el 80% de trámites es 2026. Hoy es julio de 2026.
            </p>

            <div className="space-y-6">
              <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#D81E5B] shadow-sm">
                <Scale className="w-8 h-8 text-[#D81E5B] shrink-0" />
                <div>
                  <h4 className="font-bold text-[17px] mb-2 text-[#1a2438]">Obligación Constitucional</h4>
                  <p className="text-sm text-[#4a5568] leading-relaxed">No cumplir expone al municipio a observaciones de la ASF y al Presidente Municipal a responsabilidad ante la SFP.</p>
                </div>
              </div>
              <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#0FA3B1] shadow-sm">
                <Lock className="w-8 h-8 text-[#0FA3B1] shrink-0" />
                <div>
                  <h4 className="font-bold text-[17px] mb-2 text-[#1a2438]">LlaveMx Art. 74 LNETB</h4>
                  <p className="text-sm text-[#4a5568] leading-relaxed">ConnectX está diseñado desde su arquitectura para integrarse con LlaveMx — el estándar de identidad federal obligatorio — como parte de su hoja de ruta de cumplimiento.</p>
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
               La LNETB marcó vencimientos en enero y febrero de 2026. Hay más de 5 meses de irregularidad acumulada, con responsabilidad personal creciendo cada día.
             </p>

             <div className="space-y-8">
               <div>
                 <h4 className="text-[#D81E5B] text-[11px] font-bold uppercase tracking-widest mb-3">Riesgo Legal — Quedarse en el muelle</h4>
                 <ul className="space-y-2 text-[14px] text-[#e8e0d4]">
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>Daño político colateral y sanciones de la ASF.</span></li>
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>Recuperar terreno después es 10x más costoso.</span></li>
                 </ul>
               </div>
               <div>
                 <h4 className="text-[#4C9F70] text-[11px] font-bold uppercase tracking-widest mb-3">Oportunidad Política — Subirse al barco</h4>
                 <ul className="space-y-2 text-[14px] text-[#e8e0d4]">
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Liderar la narrativa nacional. Primera ciudad 100% digital.</span></li>
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Resultados visibles para la ciudadanía en los primeros 30 días.</span></li>
                 </ul>
               </div>
             </div>

             <button onClick={() => onNavigate('executive')} className="mt-10 w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#14213D] py-4 rounded-md font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg">
               Revisar Propuesta Estratégica
             </button>
          </div>
        </div>

        {/* 03: 5 Capas */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
             <p className="text-[#0FA3B1] text-xs font-bold tracking-[0.2em] uppercase mb-4">02 · Arquitectura del Ecosistema</p>
             <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">5 capas. Un solo sistema nervioso.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#D81E5B]"></div>
               <div className="w-12 h-12 bg-[#D81E5B]/10 text-[#D81E5B] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">1</div>
               <h4 className="font-bold text-[#1a2438] mb-2 text-lg">Landing Page</h4>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">La cara pública del ecosistema. Narrativa wixárika y posicionamiento estatal.</p>
               <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-[#D81E5B] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Inicio <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#0FA3B1]"></div>
               <div className="w-12 h-12 bg-[#0FA3B1]/10 text-[#0FA3B1] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">2</div>
               <h4 className="font-bold text-[#1a2438] mb-2 text-lg">C5 Dashboard</h4>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">Centro de mando de gobierno. 14 módulos de gestión, tesorería y auditoría.</p>
               <button onClick={() => onNavigate('c5')} className="text-[#0FA3B1] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Dashboard <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#4C9F70]"></div>
               <div className="w-12 h-12 bg-[#4C9F70]/10 text-[#4C9F70] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">3</div>
               <h4 className="font-bold text-[#1a2438] mb-2 text-lg">CitizenApp</h4>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">El gobierno en el bolsillo. 15 servicios, ventanilla única y expediente digital.</p>
               <button onClick={() => onNavigate('citizen')} className="text-[#4C9F70] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Abrir App <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#F5A623]"></div>
               <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">4</div>
               <h4 className="font-bold text-[#1a2438] mb-2 text-lg">Agentes IA</h4>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">Inteligencia de datos en tiempo real (datos.gob.mx, INEGI). Reporte CEO Agent.</p>
               <button onClick={() => onNavigate('c5')} className="text-[#F5A623] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Ver IA <ChevronRight className="w-3 h-3"/></button>
             </div>
             
             <div className="bg-white border border-[#d4ccc2] p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#E85D04]"></div>
               <div className="w-12 h-12 bg-[#E85D04]/10 text-[#E85D04] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">5</div>
               <h4 className="font-bold text-[#1a2438] mb-2 text-lg">Executive Folder</h4>
               <p className="text-[13px] text-[#4a5568] leading-relaxed mb-6">Inteligencia confidencial y expedientes de negociación para la mesa de decisión.</p>
               <button onClick={() => onNavigate('executive')} className="text-[#E85D04] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Carpeta <ChevronRight className="w-3 h-3"/></button>
             </div>
          </div>
        </div>

        {/* 07: Modelo Financiero & Ranking */}
        <div className="max-w-6xl mx-auto bg-white border border-[#d4ccc2] rounded-2xl p-8 md:p-14 shadow-sm">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="inline-block border border-[#F5A623]/50 text-[#b47a19] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 bg-[#F5A623]/10">03 · Ranking Gobierno Digital</div>
                 <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight mb-6 text-[#1a2438]">Tepic: proyección del #840 al #38 en 90 días.</h2>
                 <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                    Con el Programa Municipios Digitales como vehículo, Nayarit se proyecta como el único estado de México con cobertura digital municipal total (20/20).
                 </p>
                 <div className="flex gap-12">
                    <div>
                       <h4 className="text-4xl font-black text-[#F5A623] font-sans">#38</h4>
                       <p className="text-[10px] uppercase tracking-widest text-[#4a5568] mt-2 font-bold">Lugar Nacional</p>
                    </div>
                    <div>
                       <h4 className="text-4xl font-black text-[#4C9F70] font-sans">20/20</h4>
                       <p className="text-[10px] uppercase tracking-widest text-[#4a5568] mt-2 font-bold">Cobertura Estatal</p>
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
                       <span className="font-bold text-[#4C9F70] font-mono">$120–180 M</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                       <span className="text-[#4a5568] text-sm">Impuesto Predial (12)</span>
                       <span className="font-bold text-[#4C9F70] font-mono">$45–80 M</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#d4ccc2] pb-3">
                       <span className="text-[#4a5568] text-sm">Obras y Desarrollo (18)</span>
                       <span className="font-bold text-[#4C9F70] font-mono">$8–25 M</span>
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

