import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Award, 
  Database, 
  ArrowRight,
  Shield,
  DollarSign,
  Briefcase,
  TrendingUp,
  Search,
  MessageSquare,
  Building,
  Target,
  BarChart,
  CheckCircle,
  Cpu
} from 'lucide-react';

export const TesisCienciaPolitica = () => {
  // Document Center Tabs
  // 0: Dossier ConnectX Financial
  // 1: Escalera de Valor & Estrategia Política (Geraldine Ponce PDF)
  // 2: Roadmap Ecosistema 48 Dependencias
  const [activeDocument, setActiveDocument] = useState<number>(1);
  const [selectedMunSize, setSelectedMunSize] = useState<'pequeno' | 'mediano' | 'grande'>('mediano');
  const [agroPartnersCount, setAgroPartnersCount] = useState<number>(5);

  const calculateEarnings = () => {
    const baseSaaS = selectedMunSize === 'pequeno' ? 120000 : selectedMunSize === 'mediano' ? 250000 : 450000;
    const agroSaaS = agroPartnersCount * 35000;
    const insuranceAPIs = agroPartnersCount * 45000;
    const subtotal = baseSaaS + agroSaaS + insuranceAPIs;
    const netMargin = subtotal * 0.85;

    return {
      saas: baseSaaS.toLocaleString('en-US'),
      api: (agroSaaS + insuranceAPIs).toLocaleString('en-US'),
      total: subtotal.toLocaleString('en-US'),
      net: netMargin.toLocaleString('en-US')
    };
  };

  const earnings = calculateEarnings();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 rounded-3xl" id="thesis-academic-view">
      {/* Editorial Header */}
      <div className="relative overflow-hidden bg-slate-950 text-white p-8 md:p-14 rounded-t-3xl border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900/40 via-slate-950 to-slate-950 opacity-95 z-0" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold tracking-widest uppercase mb-4">
            <Award size={14} /> PLAN ESTRATÉGICO 2027-2033
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
            Ecosistema de Gobernanza y Escalabilidad
          </h1>
          <p className="text-base md:text-lg text-slate-300 mt-2 font-light leading-relaxed max-w-2xl">
            Modelo Financiero, Escalera de Valor Política y Hoja de Ruta Técnica para la consolidación de ConnectX como motor del estado de Nayarit.
          </p>
        </div>
      </div>

      {/* Doc Hub Tabs Switcher */}
      <div className="bg-slate-900 border-b border-slate-800 p-2 md:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sticky top-[0px] z-30 shadow-lg">
        {[
          { icon: <Briefcase size={16} />, title: "1. Dossier ConnectX", subtitle: "Modelo Financiero" },
          { icon: <TrendingUp size={16} />, title: "2. Escalera de Valor & Política", subtitle: "Gobernatura 2027 (Caso G. Ponce)" },
          { icon: <Database size={16} />, title: "3. Hoja de Ruta Téc.", subtitle: "Ecosistema 48 Dependencias" }
        ].map((doc, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDocument(idx)}
            className={`p-3 rounded-xl transition-all text-left flex items-start gap-3 outline-none ${
              activeDocument === idx
                ? 'bg-rose-600 text-white ring-2 ring-rose-500/20 shadow-lg shadow-rose-600/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeDocument === idx ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
              {doc.icon}
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">{doc.title}</p>
              <p className={`text-[10px] truncate max-w-[170px] mt-0.5 ${activeDocument === idx ? 'text-white/70' : 'text-slate-500'}`}>
                {doc.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {/* DOCUMENT 0: CONNECTX MODEL */}
          {activeDocument === 0 && (
            <motion.div
              key="doc1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-[0.2em]">DOCUMENTO ESTRATÉGICO I</span>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Cómo, Con Quién y Cuánto Gana ConnectX</h2>
                    <p className="text-slate-500 text-sm mt-1">Modelo de negocio detallado, monetización sustentable de datos agregados y efecto red.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">¿CÓMO?</div>
                    <h3 className="font-bold text-slate-900 text-lg">Modelo Híbrido SaaS + API</h3>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                      ConnectX se despliega como una infraestructura modular de gobernanza pública. Los municipios firman un esquema de Software-as-a-Service (SaaS) financiando sus módulos de Gobierno Digital, mientras que el sector privado monetiza mediante suscripción a micro-APIs de consulta territorial anonimizada.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">¿CON QUIÉN?</div>
                    <h3 className="font-bold text-slate-900 text-lg">Socios Clave de Monetización</h3>
                    <ul className="text-xs text-slate-600 space-y-2">
                      <li>🏢 <span className="font-bold">Aseguradoras (SURA, AXA):</span> Compran insights para tarificar pólizas climáticas.</li>
                      <li>🌾 <span className="font-bold">Agroindustria:</span> Adquieren alertas de plagas en mango y tabaco.</li>
                      <li>🏦 <span className="font-bold">Fintechs (Bancomext):</span> Datos de suelo para aprobar créditos rurales rápidos.</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">¿CUÁNTO?</div>
                    <h3 className="font-bold text-slate-900 text-lg">Proyección de Ingresos Netos</h3>
                    <ul className="text-xs text-slate-600 space-y-2">
                      <li>🌱 <span className="font-bold">Fase Piloto:</span> $120,000 a $450,000 USD anuales vía licenciamiento SaaS.</li>
                      <li>🚀 <span className="font-bold">Fase Consolidación:</span> $2M a $5M USD anuales con consorcios agro/seguros.</li>
                      <li>💎 <span className="font-bold">Maduración:</span> $4M a $7M USD con mrg neto del <span className="text-emerald-600 font-bold">85%</span>.</li>
                    </ul>
                  </div>
                </div>

                {/* Interactive Valuation / Earning Simulator */}
                <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-white">
                    <DollarSign size={200} />
                  </div>
                  <div className="relative z-10 max-w-3xl">
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      <BarChart className="text-rose-500" size={20} /> Simulador Financiero: Estimación de Rendimiento ConnectX
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tamaño Municipio Convenio:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'pequeno', label: 'Pequeño' },
                            { id: 'mediano', label: 'Mediano' },
                            { id: 'grande', label: 'Metropolitano' }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setSelectedMunSize(t.id as any)}
                              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                                selectedMunSize === t.id 
                                  ? 'bg-rose-600 text-white' 
                                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Socios Privados Acoplados:</label>
                          <span className="text-xs font-bold text-rose-500">{agroPartnersCount} Socios</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="20" 
                          value={agroPartnersCount}
                          onChange={(e) => setAgroPartnersCount(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 text-center">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">SaaS Gob.</p>
                        <p className="text-base font-black text-rose-400 mt-1">${earnings.saas}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">API Insights</p>
                        <p className="text-base font-black text-blue-400 mt-1">${earnings.api}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Ingreso Total</p>
                        <p className="text-base font-black text-amber-300 mt-1">${earnings.total}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 shadow-inner bg-emerald-900/20">
                        <p className="text-[10px] text-emerald-400 uppercase font-bold">Utilidad (85%)</p>
                        <p className="text-base font-black text-emerald-400 mt-1">${earnings.net}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* DOCUMENT 1 (NEW): VALUE LADDER & POLITICAL STRATEGY (GERALDINE PDF INCLUDED) */}
          {activeDocument === 1 && (
            <motion.div
              key="doc2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* Profile Integration from PDF */}
              <div className="bg-rose-600 text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-rose-500">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <div className="w-40 h-40 rotate-45 bg-white flex items-center justify-center">
                    <div className="w-20 h-20 bg-rose-600"></div>
                  </div>
                </div>
                
                <div className="relative z-10 flex-grow space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    CASO DE ÉXITO GUBERNAMENTAL
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif italic mb-1 text-rose-100">Geraldine Ponce</h2>
                  <h3 className="text-lg md:text-2xl font-bold">Presidenta Municipal de Tepic <br/><span className="text-rose-200 font-light">Candidata a Gobernadora de Nayarit 2027</span></h3>
                  
                  <p className="text-sm md:text-base font-light text-rose-100 mt-4 max-w-xl italic">
                    "La gobernante que ya transformó Tepic. Ahora lleva ese cambio a los 20 municipios de Nayarit."
                  </p>
                </div>

                <div className="relative z-10 shrink-0 grid grid-cols-2 gap-3 w-full md:w-auto">
                  <div className="bg-slate-900/50 p-4 rounded-xl text-center backdrop-blur-md border border-white/10">
                    <p className="text-2xl font-black text-white">30</p>
                    <p className="text-[9px] uppercase tracking-wider text-rose-200 font-bold">AÑOS</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl text-center backdrop-blur-md border border-white/10">
                    <p className="text-2xl font-black text-white">1ª</p>
                    <p className="text-[9px] uppercase tracking-wider text-rose-200 font-bold">MUJER PRESIDENTA</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl text-center backdrop-blur-md border border-white/10">
                    <p className="text-2xl font-black text-white">519K</p>
                    <p className="text-[9px] uppercase tracking-wider text-rose-200 font-bold">SEGUIDORES IG</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl text-center backdrop-blur-md border border-white/10">
                    <p className="text-2xl font-black text-white">100%</p>
                    <p className="text-[9px] uppercase tracking-wider text-rose-200 font-bold">OBRA TRAZABLE</p>
                  </div>
                </div>
              </div>

              {/* The Value Ladder Section */}
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-[0.2em] mb-2 block">LA ESCALERA DE VALOR</span>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Cómo ConnectX escala y retiene el poder político</h3>
                  <p className="text-slate-500 text-sm mt-3">Desde el primer contacto exploratorio hasta la consolidación del ecosistema tecnológico estatal para la campaña a la Gobernatura 2027.</p>
                </div>

                <div className="relative">
                  {/* Vertical Line for Desktop */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2" />

                  <div className="space-y-8 md:space-y-0">
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                      <div className="w-full md:w-5/12 ml-auto md:pr-12 md:text-right mb-4 md:mb-0 order-2 md:order-1">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-rose-300 transition-colors shadow-sm">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Día 1 / Oferta Inicial</p>
                          <h4 className="text-lg font-bold text-slate-900 mb-2">Auditoría de Fricción (El Acercamiento)</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <strong>¿Cómo inicia la relación?:</strong> Ofrecemos a la gobernante un análisis de datos gratuito de sus redes sociales (519K seguidores). Demostramos cuantitativamente dónde está la frustración ciudadana (baches, luminarias) y cómo el sistema actual pierde los folios.
                          </p>
                        </div>
                      </div>
                      <div className="z-10 w-12 h-12 bg-rose-100 rounded-full border-4 border-white shadow flex items-center justify-center text-rose-600 font-black order-1 md:order-2 mb-4 md:mb-0 relative md:absolute md:left-1/2 md:-translate-x-1/2">
                        <Search size={20} />
                      </div>
                      <div className="w-full md:w-5/12 pl-12 hidden md:block order-3"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full md:pt-16">
                      <div className="w-full md:w-5/12 pr-12 hidden md:block order-1"></div>
                      <div className="z-10 w-12 h-12 bg-blue-100 rounded-full border-4 border-white shadow flex items-center justify-center text-blue-600 font-black order-1 md:order-2 mb-4 md:mb-0 relative md:absolute md:left-1/2 md:-translate-x-1/2">
                        <MessageSquare size={20} />
                      </div>
                      <div className="w-full md:w-5/12 mr-auto md:pl-12 order-2 md:order-3">
                        <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 hover:border-blue-300 transition-colors shadow-sm relative overflow-hidden">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1">Día 30 / El Quick Win</p>
                          <h4 className="text-lg font-bold text-slate-900 mb-2">Módulo Ciudadano (Bot Tepic)</h4>
                          <p className="text-xs text-slate-600 leading-relaxed relative z-10">
                            <strong>El día a día:</strong> Se instala el módulo de atención inmediata por WhatsApp. Tepicenses comienzan a reportar sin ventanillas ni colas. El político obtiene victorias tempranas, subiendo su aprobación en semanas al demostrar que <em>"sí escucha y moderniza"</em>.
                          </p>
                          <div className="absolute -bottom-4 -right-4 opacity-10 text-blue-500"><MessageSquare size={100} /></div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full md:pt-16">
                      <div className="w-full md:w-5/12 ml-auto md:pr-12 md:text-right mb-4 md:mb-0 order-2 md:order-1">
                        <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors shadow-sm">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">Mes 6 / Core Business</p>
                          <h4 className="text-lg font-bold text-slate-900 mb-2">Gobernanza Total Tepic</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <strong>El Ecosistema:</strong> Se activan las <strong>Obras Trazables en Vivo (100% Transparencia)</strong>. ConnectX entra a Tesorería, Salud y Permisos. Se configura el panel de C5 para que la Alcaldesa supervise cada métrica desde su celular.
                          </p>
                        </div>
                      </div>
                      <div className="z-10 w-12 h-12 bg-emerald-100 rounded-full border-4 border-white shadow flex items-center justify-center text-emerald-600 font-black order-1 md:order-2 mb-4 md:mb-0 relative md:absolute md:left-1/2 md:-translate-x-1/2">
                        <Building size={20} />
                      </div>
                      <div className="w-full md:w-5/12 pl-12 hidden md:block order-3"></div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full md:pt-16">
                      <div className="w-full md:w-5/12 pr-12 hidden md:block order-1"></div>
                      <div className="z-10 w-16 h-16 bg-slate-900 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-rose-500 font-black order-1 md:order-2 mb-4 md:mb-0 relative md:absolute md:left-1/2 md:-translate-x-1/2 mt-[-8px]">
                        <Target size={28} />
                      </div>
                      <div className="w-full md:w-5/12 mr-auto md:pl-12 order-2 md:order-3">
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Cpu size={80} />
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mb-1">Año 3+ / Escalabilidad y El MOAT</p>
                          <h4 className="text-lg font-bold text-white mb-2">Gobernatura Nayarit 2027</h4>
                          <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                            <strong>El Legado Político:</strong> ConnectX se expande a los <strong>20 municipios por digitalizar</strong>, orquestando el Agro, Seguridad y Economía estatal. Nadie puede competir contra esta cantidad histórica de Big Data territorial. Representa el salto indiscutible a la Gubernatura con una plataforma científica e irrefutable.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Resultado de la Escalera</p>
                  <p className="text-sm font-semibold text-slate-700">"El político inicia contratando un bot; termina consolidando su plataforma presidencial gracias a la inteligencia de datos."</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* DOCUMENT 2: TECHNICAL ROADMAP & 48 AGENCIES */}
          {activeDocument === 2 && (
            <motion.div
              key="doc3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-[0.2em]">DOCUMENTO ESTRATÉGICO III</span>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Hoja de Ruta: Ecosistema 48 Dependencias</h2>
                    <p className="text-slate-500 text-sm mt-1">Cómo ConnectX escala y centraliza la gobernanza de las 48 dependencias del Estado de Nayarit bajo un único flujo de datos de Inteligencia Territorial.</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-slate-900 text-white border border-slate-800 text-xs font-bold">
                    Escalabilidad Institucional
                  </div>
                </div>

                <p className="text-lg font-serif text-slate-700 leading-relaxed text-justify">
                  El verdadero reto de la transformación gubernamental no es digitalizar trámites, sino lograr el <strong>acoplamiento sistémico</strong> de las instituciones. Actualmente, el gobierno de Nayarit cuenta con 48 dependencias centrales que operan bajo "silos lógicos": Salud no comparte datos en tiempo real con DIF, y Obras Públicas no sincroniza mapas de riesgo hídrico con Protección Civil. ConnectX rompe esta fragmentación mediante una Hoja de Ruta de 4 fases progresivas.
                </p>

                <div className="space-y-6">
                  <h4 className="font-bold text-slate-900 text-xl font-sans mb-4 mt-8 flex items-center gap-2">
                    <Database className="text-rose-500" size={24} />
                    Fases de Integración Tecnológica
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    {/* Fase 1 */}
                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-rose-500/50 transition-colors">
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-slate-100 group-hover:bg-rose-100 transition-colors" />
                      <div className="relative z-10 space-y-3">
                        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-rose-100 px-2 py-1 rounded inline-block">Fase 1: Capa Base e Identidad (Q1-Q2)</span>
                        <h5 className="font-bold text-lg text-slate-900">Identidad Digital Nayarita Unificada (IDN-U)</h5>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                          ConnectX despliega la primera infraestructura de identidad ciudadana <em>Single Sign-On</em>. En lugar de que el ciudadano cree una cuenta distinta para la Secretaría de Finanzas y otra para Salud, obtiene la <strong>Firma Electrónica Estatal</strong>. Todos los trámites de bajo nivel pasan por este canal único. Se eliminan las 48 ventanillas virtuales aisladas.
                        </p>
                      </div>
                    </div>

                    {/* Fase 2 */}
                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors" />
                      <div className="relative z-10 space-y-3">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded inline-block">Fase 2: Interoperabilidad Crítica (Q3-Q4)</span>
                        <h5 className="font-bold text-lg text-slate-900">Agrupador de Clústeres (Data Lakes)</h5>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                          Se construyen 4 "Data Lakes" alojados de forma soberana: Clúster de Salud y Bienestar (DIF, SSN), Clúster de Obra y Movilidad, Clúster Económico-Rural, y Clúster de Seguridad. Las dependencias ya no consultan sus propios servidores físicos obsoletos, sino que leen y escriben a través de las APIs centralizadas de ConnectX.
                        </p>
                      </div>
                    </div>

                    {/* Fase 3 */}
                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-slate-100 group-hover:bg-emerald-100 transition-colors" />
                      <div className="relative z-10 space-y-3">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded inline-block">Fase 3: Inteligencia Predictiva (Año 2)</span>
                        <h5 className="font-bold text-lg text-slate-900">Nayarit Intelligence Engine Activo</h5>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                          Salud Inteligente Nayarit ID correlaciona información entre clústeres. Por ejemplo, al detectar un aumento de quejas de "Moscos" en el bot ciudadano (Clúster Servicios Municipales), el motor genera automáticamente alertas preventivas de Dengue a la Secretaría de Salud antes de que repunte la epidemia.
                        </p>
                      </div>
                    </div>

                    {/* Fase 4 */}
                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-slate-100 group-hover:bg-purple-100 transition-colors" />
                      <div className="relative z-10 space-y-3">
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-1 rounded inline-block">Fase 4: Consolidación 360° (Años 3+)</span>
                        <h5 className="font-bold text-lg text-slate-900">Dashboard de Gabinete Integral</h5>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                          Las 48 dependencias rinden cuentas a un único <strong>Centro de Comando Gubernamental (C5 Digital)</strong>. El titular del ejecutivo no lee 48 reportes mensuales impresos; abre una interfaz viva en su iPad, monitoreando la inversión y focalizando las ayudas de todo el estado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Ecosystem Diagram */}
                <div className="mt-12 bg-slate-950 p-8 rounded-3xl text-white border border-slate-800">
                  <h4 className="font-bold mb-6 text-sm text-center text-rose-500 uppercase tracking-widest">Esquema Unificado de Gobernanza (ConnectX Architecture)</h4>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {/* Citizens Input */}
                    <div className="flex flex-row md:flex-col gap-2 relative">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400">
                        <User size={18} />
                      </div>
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400">
                        <User size={18} />
                      </div>
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400">
                        <User size={18} />
                      </div>
                      <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase">Ciudadanía</p>
                    </div>

                    <ArrowRight className="text-rose-500 shrink-0 hidden md:block" size={24} />

                    {/* Single Gateway */}
                    <div className="bg-rose-600 text-white p-4 rounded-xl flex flex-col items-center border border-rose-500 shadow-xl shadow-rose-600/20">
                      <Shield size={24} className="mb-2" />
                      <p className="text-xs font-bold whitespace-nowrap">Sistema Nayarit Digital</p>
                      <p className="text-[9px] opacity-70">Identidad Digital Única</p>
                    </div>

                    <ArrowRight className="text-emerald-500 shrink-0 hidden md:block" size={24} />

                    {/* Data Lakes */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/30 text-center relative">
                        <p className="text-[10px] font-bold text-emerald-400 mb-1">Clúster A: Salud & Bienestar</p>
                        <p className="text-[8px] text-slate-400">12 Dependencias Integradas</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-blue-500/30 text-center relative">
                        <p className="text-[10px] font-bold text-blue-400 mb-1">Clúster B: Obra & Movilidad</p>
                        <p className="text-[8px] text-slate-400">8 Dependencias Integradas</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-amber-500/30 text-center relative">
                        <p className="text-[10px] font-bold text-amber-400 mb-1">Clúster C: Finanzas & Cobro</p>
                        <p className="text-[8px] text-slate-400">4 Dependencias Integradas</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-purple-500/30 text-center relative">
                        <p className="text-[10px] font-bold text-purple-400 mb-1">Clúster D: Agro & Desarrollo</p>
                        <p className="text-[8px] text-slate-400">24 Dependencias Integradas</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-4 text-center">
                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Motor Despachador</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white">
                      <Cpu size={14} className="text-white" />
                      Vertex AI: Predicción en Base a 48 Clústeres Simultáneos
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mt-6 font-sans flex items-start gap-4">
                  <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h5 className="font-bold text-emerald-900 mb-1 text-base">Cierre del Costo Operativo y Efecto Red</h5>
                    <p className="text-sm text-emerald-800/80 leading-relaxed text-justify">
                      Mantener 48 centros de datos, licencias independientes, y papel es un costo millonario para el erario público nayarita. Al subsumirse en ConnectX, se consolidan no solo los servidores bajo un estándar unificado, sino que se genera el <strong>efecto red</strong>: las dependencias dejan de competir por presupuesto a ciegas; operan bajo un modelo orquestado donde los datos generados por una alimentan las políticas de otra.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
