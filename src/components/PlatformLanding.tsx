import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck, Users, FileCheck, Lock, Globe, Smartphone, CheckCircle2,
  ChevronRight, Clock, ArrowRight, KeyRound, MapPin, Languages, Landmark,
  Monitor, ClipboardCheck, ArrowDown, Bot
} from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#D81E5B]/20">
      <WixarikaBanda />

      {/* ============================================================ */}
      {/* HERO — responde "¿Dónde estoy?" y "¿Para qué sirve esto?"     */}
      {/* ============================================================ */}
      <div className="bg-[#14213D] text-[#F8F6F1] min-h-[92vh] flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, #F8F6F1 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Header — una sola acción principal, sin competir consigo misma */}
        <header className="px-6 md:px-12 py-8 flex justify-between items-center relative z-20">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-gradient-to-br from-[#D81E5B] to-[#0FA3B1] rounded-full flex items-center justify-center font-black text-2xl shadow-[0_0_40px_rgba(216,30,91,0.4)] text-white">
               N
             </div>
             <div>
               <p className="text-sm font-bold tracking-tight">Nayarit Digital</p>
               <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0aec0]">Portal de trámites municipales</p>
             </div>
           </div>

           <nav className="flex items-center gap-6">
             <button
               onClick={() => document.getElementById('institucional')?.scrollIntoView({ behavior: 'smooth' })}
               className="hidden md:block text-xs font-semibold text-[#a0aec0] hover:text-[#0FA3B1] transition-colors"
             >
               Soy funcionario público
             </button>
             <button
               onClick={() => onNavigate('citizen')}
               className="bg-[#D81E5B] text-white px-6 py-3 rounded text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#D81E5B]/85 transition-all shadow-lg"
             >
               Empezar mi trámite
             </button>
           </nav>
        </header>

        {/* Hero content */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-[#7ee8f2] text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Bahía de Banderas · Xalisco · Tepic</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[4.6rem] font-serif font-normal leading-[1.1] tracking-tight mb-8 max-w-4xl"
          >
             Tu gobierno,<br/>
             <em aria-hidden="true" className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#D81E5B] to-[#0FA3B1]">sin filas ni papeleo</em><span className="sr-only">sin filas ni papeleo</span>.
          </motion.h1>

          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
             className="text-lg md:text-xl text-[#F8F6F1]/70 max-w-2xl font-sans tracking-wide mb-10 leading-relaxed"
          >
             Trámites y pagos municipales de Bahía de Banderas, Xalisco y Tepic, en un solo lugar, desde tu teléfono, a cualquier hora.
          </motion.p>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="flex flex-wrap justify-center gap-3 max-w-2xl mb-12"
          >
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[#D81E5B]/20 text-[#ff8ab8] border border-[#D81E5B]/40">Gratis y en minutos</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[#0FA3B1]/20 text-[#7ee8f2] border border-[#0FA3B1]/40">+100 trámites y pagos</span>
             <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[#4C9F70]/20 text-[#7de3a8] border border-[#4C9F70]/40">Identidad protegida</span>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
             className="flex flex-col items-center gap-4"
          >
             <button onClick={() => onNavigate('citizen')} className="bg-[#D81E5B] hover:bg-[#D81E5B]/90 text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_32px_rgba(216,30,91,0.35)] hover:shadow-[0_12px_40px_rgba(216,30,91,0.5)] hover:-translate-y-1 flex items-center gap-3">
               <Smartphone className="w-5 h-5" /> Empezar mi trámite
             </button>
             <p className="text-[#a0aec0] text-xs tracking-wide">Entra con tu cuenta de Google · sin formularios largos</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-[#a0aec0] hover:text-white text-[11px] uppercase tracking-widest mt-16 transition-colors"
          >
            ¿Qué puedo hacer aquí? <ArrowDown className="w-4 h-4" />
          </motion.button>
        </main>
      </div>

      <WixarikaBanda />

      {/* ============================================================ */}
      {/* SECCIÓN — "¿Por qué debería usarlo?" (beneficio + confianza)  */}
      {/* ============================================================ */}
      <div className="bg-[#F8F6F1] text-[#1a2438] py-24 px-6 md:px-12 relative">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div>
            <p className="text-[#D81E5B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Por qué cambia esto tu día a día</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-[#1a2438]">Lo que antes era una mañana perdida, ahora es un formulario.</h2>
            <p className="text-[#4a5568] text-lg leading-relaxed mb-8">
               Cada trámite que haces aquí genera un acuse digital firmado y con folio propio — así puedes comprobarlo cuando lo necesites, sin depender de una copia en papel que se puede perder.
            </p>

            <div className="flex gap-5 p-6 bg-white border border-[#d4ccc2] rounded-xl border-l-4 border-l-[#D81E5B] shadow-sm">
              <FileCheck className="w-8 h-8 text-[#D81E5B] shrink-0" />
              <div>
                <h3 className="font-bold text-[17px] mb-2 text-[#1a2438]">Un expediente, no una pila de copias</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">Tus documentos quedan guardados una sola vez. La próxima vez que hagas un trámite, no vuelves a entregar lo que ya entregaste.</p>
              </div>
            </div>
          </div>

          {/* Panel comparativo: antes / ahora */}
          <div className="bg-[#14213D] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-center">
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D81E5B] via-[#F5A623] to-[#0FA3B1]"></div>

             <div className="flex items-center gap-3 mb-8">
               <Clock className="w-7 h-7 text-[#F5A623]" />
               <h3 className="text-2xl font-serif font-normal tracking-wide">Antes y ahora</h3>
             </div>

             <div className="space-y-8">
               <div>
                 <h3 className="text-[#FF7AA8] text-[11px] font-bold uppercase tracking-widest mb-3">Como era antes</h3>
                 <ul className="space-y-2 text-[14px] text-[#e8e0d4]">
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>Ir a la ventanilla y hacer fila en horario de oficina.</span></li>
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>Llevar copias del mismo papel a cada trámite.</span></li>
                   <li className="flex gap-3"><span className="text-[#D81E5B] font-bold">✖</span> <span>No saber en qué va tu trámite ni cuánto falta.</span></li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-[#4C9F70] text-[11px] font-bold uppercase tracking-widest mb-3">Como es aquí</h3>
                 <ul className="space-y-2 text-[14px] text-[#e8e0d4]">
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Lo haces desde tu teléfono, a la hora que puedas.</span></li>
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Tu expediente único evita que repitas papeles.</span></li>
                   <li className="flex gap-3"><span className="text-[#4C9F70] font-bold">✅</span> <span>Sigues cada trámite paso a paso, con acuse firmado.</span></li>
                 </ul>
               </div>
             </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN — "¿Qué puedo hacer aquí?" / "¿Cómo empiezo?"        */}
        {/* Reemplaza el mapa de arquitectura interna (5 capas) por el   */}
        {/* recorrido real del ciudadano: 3 pasos, no 5 componentes.     */}
        {/* ============================================================ */}
        <div id="como-funciona" className="max-w-6xl mx-auto mb-32 scroll-mt-8">
          <div className="text-center mb-16">
             <p className="text-[#0A6B75] text-xs font-bold tracking-[0.2em] uppercase mb-4">Cómo funciona</p>
             <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Tres pasos, un trámite resuelto.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
             <div className="bg-white border border-[#d4ccc2] p-7 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#D81E5B]"></div>
               <div className="w-12 h-12 bg-[#D81E5B]/10 text-[#D81E5B] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">1</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg flex items-center gap-2"><KeyRound className="w-4 h-4 text-[#D81E5B]" /> Entra con tu cuenta</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed">Inicia sesión con tu cuenta de Google en segundos. Sin formularios largos ni contraseñas nuevas que recordar.</p>
             </div>

             <div className="bg-white border border-[#d4ccc2] p-7 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#0FA3B1]"></div>
               <div className="w-12 h-12 bg-[#0FA3B1]/10 text-[#0B7C87] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">2</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-[#0B7C87]" /> Elige tu trámite o pago</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed">Más de 100 trámites y pagos municipales. ¿No sabes cuál necesitas? Pregúntale a Aura, el asistente del portal.</p>
             </div>

             <div className="bg-white border border-[#d4ccc2] p-7 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#4C9F70]"></div>
               <div className="w-12 h-12 bg-[#4C9F70]/10 text-[#3B7A56] rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-5">3</div>
               <h3 className="font-bold text-[#1a2438] mb-2 text-lg flex items-center gap-2"><FileCheck className="w-4 h-4 text-[#3B7A56]" /> Recibe tu acuse digital</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed">Firmado, con folio y verificable. Sin volver a hacer fila para comprobar que tu trámite existe.</p>
             </div>
          </div>

          <div className="text-center">
            <button onClick={() => onNavigate('citizen')} className="inline-flex items-center gap-2 bg-[#14213D] hover:bg-[#14213D]/90 text-white px-7 py-3.5 rounded-md text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5">
              Empezar ahora <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN — Equidad territorial: "¿esto es para alguien como   */}
        {/* yo?" para quien vive fuera de las cabeceras municipales.     */}
        {/* ============================================================ */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
             <p className="text-[#35704E] text-xs font-bold tracking-[0.2em] uppercase mb-4">Pueblos originarios primero</p>
             <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-[#1a2438]">Las comunidades indígenas<br/>dejan de ser las últimas de la fila.</h2>
             <p className="text-[#4a5568] text-lg leading-relaxed max-w-3xl mx-auto mt-6">
                La transformación digital que solo llega a las cabeceras urbanas no es transformación: es privilegio.
                El piloto arranca en Bahía de Banderas, Xalisco y Tepic — y la ruta continúa hacia la sierra,
                para que el gobierno llegue al teléfono sin que nadie tenga que bajar a hacer fila.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-[#14213D] text-white p-8 rounded-xl relative overflow-hidden shadow-lg">
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D81E5B] via-[#F5A623] to-[#0FA3B1]"></div>
               <Users className="w-8 h-8 text-[#F5A623] mb-5" />
               <h3 className="font-bold text-lg mb-3">Del Nayar en la hoja de ruta</h3>
               <p className="text-[14px] text-[#a0aec0] leading-relaxed mb-5">
                  El municipio más remoto del estado — corazón náayeri y wixárika — proyecta avanzar del lugar
                  <span className="text-white font-bold"> #2,344</span> al
                  <span className="text-[#F5A623] font-bold"> #198</span> nacional en gobierno digital al sumarse
                  a la plataforma. Esa es la meta que traza la ruta para toda la sierra: La Yesca y Huajicori le siguen.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#4C9F70]">Meta 2026 · Nadie se queda fuera</p>
             </div>

             <div className="bg-white border border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden shadow-sm">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#4C9F70]"></div>
               <Languages className="w-8 h-8 text-[#4C9F70] mb-5" />
               <h3 className="font-bold text-lg mb-3 text-[#1a2438]">En tu lengua, no solo en español</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed mb-5">
                  La plataforma opera en español, náayeri (cora) y wixárika. Un trámite que no se entiende
                  es una fila disfrazada: aquí lo lees en tu propia lengua.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#35704E]">3 lenguas disponibles</p>
             </div>

             <div className="bg-white border border-[#d4ccc2] p-8 rounded-xl relative overflow-hidden shadow-sm">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#E85D04]"></div>
               <Globe className="w-8 h-8 text-[#E85D04] mb-5" />
               <h3 className="font-bold text-lg mb-3 text-[#1a2438]">Con fondo propio para la sierra</h3>
               <p className="text-[14px] text-[#4a5568] leading-relaxed mb-5">
                  El FAISPIAM — fondo federal de infraestructura para pueblos indígenas y afromexicanos —
                  está integrado en el sistema: cada peso destinado a la sierra queda trazado y auditable.
               </p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-[#B54903]">Trazabilidad pública</p>
             </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN — "¿Cómo se protegen mis datos?" (antes vivía        */}
        {/* diluido dentro de otra sección; aquí es su propia respuesta) */}
        {/* ============================================================ */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="bg-white border border-[#d4ccc2] rounded-2xl p-8 md:p-14 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[#0FA3B1] text-xs font-bold tracking-[0.2em] uppercase mb-4">Tu información, protegida</p>
                <h2 className="text-3xl md:text-4xl font-serif font-black leading-tight mb-6 text-[#1a2438]">Tus datos no se comparten sin tu permiso.</h2>
                <p className="text-[#4a5568] text-[16px] leading-relaxed mb-8">
                  Cada módulo — Salud, Bienestar, Obras — pide tu consentimiento explícito antes de acceder a tu
                  expediente. Nada se comparte entre dependencias por default.
                </p>
                <button onClick={() => onNavigate('executive')} className="text-[#0B7C87] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Ver el marco de protección de datos <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <Lock className="w-6 h-6 text-[#D81E5B] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[15px] text-[#1a2438] mb-1">Identidad digital segura</h3>
                    <p className="text-sm text-[#4a5568] leading-relaxed">Tu cuenta está protegida y preparada para integrarse con LlaveMx, la identidad digital federal, cuando esté disponible en tu municipio.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-[#0FA3B1] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[15px] text-[#1a2438] mb-1">Consentimiento por módulo</h3>
                    <p className="text-sm text-[#4a5568] leading-relaxed">Tú decides qué información puede ver cada servicio. Puedes revisar y retirar ese permiso cuando quieras.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#4C9F70] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[15px] text-[#1a2438] mb-1">Todo queda registrado</h3>
                    <p className="text-sm text-[#4a5568] leading-relaxed">Cada acceso a tu expediente genera un registro auditable — nadie consulta tus datos sin que quede huella.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN — Acceso institucional: audiencia secundaria,        */}
        {/* deliberadamente discreta para no competir con el trámite.    */}
        {/* ============================================================ */}
        <div id="institucional" className="max-w-6xl mx-auto scroll-mt-8">
          <div className="border-t border-[#d4ccc2] pt-14">
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="w-5 h-5 text-[#8a8578]" />
              <p className="text-[#6b6558] text-xs font-bold tracking-[0.15em] uppercase">¿Eres funcionario público o autoridad?</p>
            </div>
            <p className="text-[#6b6558] text-sm mb-6 max-w-2xl">Estas herramientas son para equipos de gobierno — no forman parte del trámite ciudadano.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('c5')} className="flex items-center gap-2 text-sm font-semibold text-[#4a5568] hover:text-[#1a2438] border border-[#d4ccc2] hover:border-[#1a2438]/30 px-5 py-3 rounded-md transition-colors bg-white">
                <Monitor className="w-4 h-4" /> Panel de gestión pública (C5)
              </button>
              <button onClick={() => onNavigate('executive')} className="flex items-center gap-2 text-sm font-semibold text-[#4a5568] hover:text-[#1a2438] border border-[#d4ccc2] hover:border-[#1a2438]/30 px-5 py-3 rounded-md transition-colors bg-white">
                <Bot className="w-4 h-4" /> Carpeta de servicio institucional
              </button>
            </div>
          </div>
        </div>

      </div>

      <WixarikaBanda />
      <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#8a8578] py-6 bg-[#F8F6F1]">
        Nayarit Digital · SOATM · Julio 2026
      </p>
    </div>
  );
};
