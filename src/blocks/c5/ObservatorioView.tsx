import React, { useState } from 'react';
import { Shield, Briefcase, TrendingUp, AppWindow, Package, Coins, FileText, Activity, Users, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export function ObservatorioView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'federal' | 'blueocean' | 'business'>('federal');

  const citizenData = [
    { name: 'Ene', total: 12400 },
    { name: 'Feb', total: 18900 },
    { name: 'Mar', total: 24500 },
    { name: 'Abr', total: 31200 },
    { name: 'May', total: 38700 },
    { name: 'Jun', total: 45210 },
  ];

  const worksData = [
    { name: 'Libramiento', progress: 84 },
    { name: 'Mercado Centro', progress: 62 },
    { name: 'CD. Salud', progress: 92 },
    { name: 'Red Agua Nayar', progress: 45 },
    { name: 'Parque Lineal', progress: 30 },
  ];

  const oceanData = [
    { category: 'Agrotech', potential: 95, stability: 80, color: '#06b6d4' },
    { category: 'Fintech Local', potential: 88, stability: 70, color: '#a855f7' },
    { category: 'Eco-Luxury', potential: 82, stability: 65, color: '#10b981' },
    { category: 'Health-Gov', potential: 91, stability: 85, color: '#f59e0b' },
  ];

  const handleReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Informe de Gobernanza estratégica 2026 generado. El mapa prospectivo de Océanos Azules para Tepic está listo para visualización presidencial.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Mando Estratégico & Proyección 2026</h3>
        <p className="text-slate-400 text-sm mt-1">Inteligencia territorial aplicada a la Ley de Gobierno Digital y Fondos Federales de Desarrollo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Índice Madurez (IMDM)', val: '72/100', status: '+4 pts este mes', color: 'text-cyan-400' },
          { label: 'Gobernanza Digital', val: 'Ley Art. 42', status: 'Firma E. Activa', color: 'text-emerald-400' },
          { label: 'Ciudadanos Registrados', val: '45,210', status: '↑ 14% vs mayo', color: 'text-purple-400' },
          { label: 'Presupuesto Federal', val: 'FORTAMUN', status: 'Ejecución: 92%', color: 'text-amber-400' },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-5 border-b-[3px] border-b-cyan-500/50">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className={cn("text-2xl font-black mb-1", kpi.color)}>{kpi.val}</p>
            <p className="text-[10px] text-slate-400 font-medium tracking-tighter uppercase">{kpi.status}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6 lg:col-span-2">
          <div className="flex gap-4 border-b border-slate-800 mb-6 pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveStrategyTab('federal')}
              className={cn("text-[10px] font-black uppercase tracking-widest pb-3 px-2 transition-all whitespace-nowrap", activeStrategyTab === 'federal' ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-500 hover:text-slate-300")}
            >
              Gobernanza & Leyes
            </button>
            <button
              onClick={() => setActiveStrategyTab('blueocean')}
              className={cn("text-[10px] font-black uppercase tracking-widest pb-3 px-2 transition-all whitespace-nowrap", activeStrategyTab === 'blueocean' ? "text-indigo-400 border-b-2 border-indigo-400" : "text-slate-500 hover:text-slate-300")}
            >
              Océanos Azules (Oro 20%)
            </button>
            <button
              onClick={() => setActiveStrategyTab('business')}
              className={cn("text-[10px] font-black uppercase tracking-widest pb-3 px-2 transition-all whitespace-nowrap", activeStrategyTab === 'business' ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300")}
            >
              Negocios Escalables
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeStrategyTab === 'federal' && (
              <motion.div key="federal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 hover:border-cyan-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-cyan-400" />
                      <h5 className="text-sm font-bold text-white uppercase tracking-tight">Ley de Gobierno Digital Nayarit</h5>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Marco legal vigente que habilita la interoperabilidad entre dependencias municipales y estatales. El 100% de los trámites deben ser digitales para el cierre de 2026.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-[8px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded font-bold uppercase">Art. 12: Firma Electrónica</span>
                      <span className="text-[8px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded font-bold uppercase">Art. 45: Pagos Digitales</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 hover:border-amber-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                      <h5 className="text-sm font-bold text-white uppercase tracking-tight">Recursos Federales (PND)</h5>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Fondos **FORTAMUN** y **FAIS** reasignados a seguridad preventiva (drones/C5) y salud pública digital. Presupuesto escalable mediante ahorros operativos.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded font-bold uppercase">FORTAMUN: Modernización</span>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded font-bold uppercase">FAIS: Digitalización Social</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStrategyTab === 'blueocean' && (
              <motion.div key="blueocean" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="w-full lg:w-1/2 h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={oceanData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="potential"
                        >
                          {oceanData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px', textTransform: 'uppercase'}}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-4">
                    <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                      <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Salud-Turismo Inteligente
                      </h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Tepic como el **Hub de Salud Preventiva** de occidente. Telemedicina para comunidades rurales integrada a la red de turismo salud certificada.
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                      <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Agrotech (Oro de Océanos)
                      </h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Digitalización del 20% de los productores que generan el 80% del valor. Marketplace directo al consumidor eliminando intermediarios físicos.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStrategyTab === 'business' && (
              <motion.div key="business" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Municipio as a Service', icon: AppWindow, desc: 'Franquiciar el modelo Nayarit ID a otros municipios de la región occidente.', roi: '6.2x', color: 'bg-blue-500' },
                    { title: 'Tepic Logistics ID', icon: Package, desc: 'Red de entrega y mensajería oficial certificando domicilios con Nayarit ID.', roi: '4.8x', color: 'bg-indigo-500' },
                    { title: 'Agro Tokenization', icon: Coins, desc: 'Esquema de inversión digital en cosechas mediante contratos inteligentes.', roi: '12.5x', color: 'bg-emerald-500' },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-slate-700 transition-all">
                      <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <h6 className="text-xs font-black text-white mb-2 uppercase tracking-tight leading-tight">{item.title}</h6>
                      <p className="text-[10px] text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">ROI Proyectado</span>
                        <span className="text-emerald-400">{item.roi}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-slate-200 mb-6">Eficiencia de Gobernanza</h4>
            <div className="space-y-4">
              {[
                { label: 'Transparencia Fiscal', pct: 94, color: 'bg-cyan-500' },
                { label: 'Digitalización Pagos', pct: 82, color: 'bg-purple-500' },
                { label: 'Confianza Ciudadana', pct: 76, color: 'bg-emerald-500' },
                { label: 'Respuesta Servicios', pct: 89, color: 'bg-amber-500' },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-[10px] font-black text-white">{stat.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stat.pct}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${stat.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleReport}
            disabled={isGenerating}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl py-4 flex items-center justify-center gap-3 transition-colors shadow-lg shadow-cyan-900/40 active:scale-[0.98] disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Generar Reporte Estratégico 2026</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Adopción Nayarit ID</h4>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Crecimiento Mensual de Usuarios</p>
            </div>
            <div className="flex items-center gap-2 text-purple-400 bg-purple-500/10 px-2 py-1 rounded text-[10px] font-bold">
              <Users className="w-3 h-3" />
              LIVE
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={citizenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }}
                  cursor={{ fill: 'rgba(168, 85, 247, 0.05)' }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {citizenData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === citizenData.length - 1 ? '#a855f7' : '#3b4252'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Avance de Infraestructura</h4>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Cumplimiento de Metas por Proyecto</p>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded text-[10px] font-bold">
              <Activity className="w-3 h-3" />
              89.2% GLOBAL
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={worksData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }}
                  cursor={{ fill: 'rgba(6, 182, 212, 0.05)' }}
                  formatter={(value: any) => [`${value}%`, 'Avance']}
                />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={12}>
                  {worksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.progress > 80 ? '#06b6d4' : entry.progress > 50 ? '#0891b2' : '#1e293b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Mapas de Calor: Demanda Ciudadana Integrada</h4>
          <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale"></div>
            <div className="absolute top-[30%] left-[40%] w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] animate-pulse"></div>
            <div className="absolute bottom-[20%] right-[30%] w-32 h-32 rounded-full blur-[50px] animate-pulse" style={{backgroundColor: 'rgba(229,0,122,0.1)'}}></div>

            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-white/10">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase leading-none block mb-1">Capa Activa</span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight">Obras vs Quejas de Agua</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor:'var(--magenta)'}}></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[10px] font-mono text-slate-400 p-2 bg-black/40 rounded">LAT: 21.5090° N</div>
                <div className="text-[10px] font-mono text-slate-400 p-2 bg-black/40 rounded">LNG: 104.8947° W</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Implementación Territorial (Top Colonias)</h4>
          <div className="space-y-4">
            {[
              { name: 'Linda Vista', growth: 88, status: 'Saturado', color: 'bg-emerald-500' },
              { name: 'San Juan', growth: 64, status: 'Campaña', color: 'bg-cyan-500' },
              { name: 'Lomas Altas', growth: 42, status: 'Alerta', color: 'bg-rose-500' },
              { name: 'Puga', growth: 28, status: 'Pendiente', color: 'bg-slate-700' },
            ].map((col, i) => (
              <div key={i} className="space-y-2 p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[11px] font-bold text-white">{col.name}</p>
                  <span className={cn(
                    "text-[8px] font-black uppercase px-2 py-1 rounded",
                    col.status === 'Saturado' ? "bg-emerald-500/10 text-emerald-400" :
                    col.status === 'Alerta' ? "bg-rose-500/10 text-rose-400" : "bg-cyan-500/10 text-cyan-400"
                  )}>{col.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${col.growth}%` }} className={`h-full ${col.color}`} />
                  </div>
                  <span className="text-[10px] font-black text-white">{col.growth}%</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleReport}
            disabled={isGenerating}
            className="w-full mt-6 py-2.5 rounded-lg bg-cyan-500 text-white text-xs font-bold hover:bg-cyan-600 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isGenerating ? 'Generando...' : 'Desbloquear Estrategia Barrio'}
          </button>
        </div>
      </div>
    </div>
  );
}
