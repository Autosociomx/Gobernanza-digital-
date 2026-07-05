import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Map as MapIcon, 
  AlertTriangle, 
  Activity, 
  Bot, 
  HeartHandshake,
  Menu,
  X,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Send,
  Loader2,
  Shield,
  Briefcase,
  AppWindow,
  Package,
  Coins,
  FileText,
  ShieldCheck,
  ChevronLeft,
  Brain,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { NayaritMap } from './NayaritMap';
import { ParlamentoView } from './dashboard/ParlamentoView';
import { AnalisisPoliticoView } from './dashboard/AnalisisPoliticoView';
import { ObservatorioView } from './dashboard/ObservatorioView';
import { RankingPresidencialView } from './dashboard/RankingPresidencialView';

type Language = 'es' | 'cora' | 'wixarika';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

type ModuleType = 'tesoreria' | 'obras' | 'servicios' | 'salud' | 'bienestar' | 'ia' | 'agrovision' | 'observatorio' | 'metricas' | 'parlamento' | 'analisis_politico' | 'interoperabilidad' | 'gabinete' | 'ranking_presidencial';

export function C5Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<ModuleType>(() => (localStorage.getItem('activeModule') as ModuleType) || 'tesoreria');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('activeModule', activeModule);
  }, [activeModule]);

  const modules = [
    { id: 'tesoreria', name: 'Tesorería Digital', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'obras', name: 'Trazabilidad Obras', icon: MapIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'servicios', name: 'Servicios Públicos', icon: AlertTriangle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'salud', name: 'Salud Inteligente Nayarit ID', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'bienestar', name: 'Bienestar Social', icon: HeartHandshake, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'gabinete', name: 'Gabinete en Tiempo Real', icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'ia', name: 'Asistente IA', icon: Bot, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'agrovision', name: 'Agrovisión 3D', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'observatorio', name: 'Observatorio Digital', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'metricas', name: 'Métricas Integrales', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'parlamento', name: 'Parlamento Municipal', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'analisis_politico', name: 'Análisis Estratégico', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'interoperabilidad', name: 'Nodo Transparencia', icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'ranking_presidencial', name: 'Posición Nacional — Gob. Digital', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-300 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-screen bg-[#161920] border-r border-slate-800 flex flex-col flex-shrink-0 relative z-20"
          >
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D81E5B] to-[#14213D] flex items-center justify-center font-bold text-white shadow-lg shadow-[#D81E5B]/30">
                  N
                </div>
                <div>
                  <h1 className="font-serif font-black text-lg text-white tracking-tight leading-none mb-1">Nayarit Digital</h1>
                  <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">C5 Governance Hub</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <div className="text-xs font-semibold text-slate-500 mb-4 px-2 tracking-wider">MÓDULOS DEL ECOSISTEMA</div>
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id as ModuleType)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group text-left",
                    activeModule === m.id
                      ? "bg-[#D81E5B]/10 border-l-2 border-[#D81E5B] text-white pl-[10px]"
                      : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border-l-2 border-transparent"
                  )}
                >
                  <div className={cn("p-1.5 rounded-md transition-colors", activeModule === m.id ? m.bg : "bg-slate-800/50 group-hover:bg-slate-800")}>
                    <m.icon className={cn("w-4 h-4", activeModule === m.id ? m.color : "text-slate-400")} />
                  </div>
                  {m.name}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
                Salir a Portal Público
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0a0a0c]">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#161920]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-1.5 rounded-md"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <h2 className="text-sm font-medium text-slate-200 flex items-center gap-2">
              <span className="text-slate-500">Módulo /</span> 
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-[#D81E5B] shadow-[0_0_8px_rgba(216,30,91,0.6)] animate-pulse"></div>
              <span className="text-xs font-mono text-[#D81E5B]">NAYARIT: EN LÍNEA</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 border-2 border-slate-800 overflow-hidden">
               <img src="/geraldine-perfil.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1586996292898-71f4036c4e07?w=100&h=100&fit=crop&crop=faces" }}/>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {activeModule === 'tesoreria' && <TesoreriaView />}
              {activeModule === 'obras' && <ObrasView />}
              {activeModule === 'servicios' && <ServiciosView />}
              {activeModule === 'salud' && <SaludView />}
              {activeModule === 'bienestar' && <BienestarView />}
              {activeModule === 'gabinete' && <GabineteView />}
              {activeModule === 'ia' && <IAView />}
              {activeModule === 'agrovision' && <AgrovisionView />}
              {activeModule === 'observatorio' && <ObservatorioView />}
              {activeModule === 'metricas' && <MetricView />}
              {activeModule === 'parlamento' && <ParlamentoView />}
              {activeModule === 'analisis_politico' && <AnalisisPoliticoView />}
              {activeModule === 'interoperabilidad' && <InteroperabilidadView />}
              {activeModule === 'ranking_presidencial' && <RankingPresidencialView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- SUB-VIEWS --- //

function InteroperabilidadView() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Infraestructura Digital ConnectX</p>
        <h3 className="text-4xl font-serif font-black text-white tracking-tighter">Nodo de Transparencia Activa</h3>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">Arquitectura de bus de servicios interoperables. Garantía de integridad de datos bajo la Ley de Gobierno Digital del Estado de Nayarit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#161920] border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Endpoints de API Activos</p>
            <p className="text-4xl font-serif font-black text-white">12<span className="text-sm text-emerald-400 ml-2">REST / SOAP</span></p>
         </div>
         <div className="bg-[#161920] border border-cyan-500/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identidades Validadas</p>
            <p className="text-4xl font-serif font-black text-white">14.2k<span className="text-sm text-cyan-400 ml-2">Nayarit ID</span></p>
         </div>
         <div className="bg-[#161920] border border-purple-500/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mensajes de Datos (Sellados)</p>
            <p className="text-4xl font-serif font-black text-white">8,401<span className="text-sm text-purple-400 ml-2">Folios</span></p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
               <ShieldCheck className="w-5 h-5 text-emerald-400" />
               <h4 className="text-sm font-semibold text-white uppercase">Trazabilidad Inter-Institucional</h4>
            </div>
            <div className="space-y-4">
               {[
                 { target: 'Tesorería Municipal', status: 'Sincronizado', ping: '12ms', query: 'GET /api/v1/taxpayer' },
                 { target: 'Registro Público Federal', status: 'Sincronizado', ping: '45ms', query: 'POST /api/v2/verify_identity' },
                 { target: 'Padrón de Obras', status: 'Sincronizado', ping: '18ms', query: 'GET /api/v1/projects' },
                 { target: 'Sistema DIF Estatal', status: 'Sincronizado', ping: '30ms', query: 'POST /api/v2/benefits' },
               ].map((api, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                    <div>
                       <p className="text-xs font-bold text-white mb-1">{api.target}</p>
                       <p className="text-[9px] font-mono text-slate-500">{api.query}</p>
                    </div>
                    <div className="text-right">
                       <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase rounded block mb-1">
                          {api.status}
                       </span>
                       <span className="text-[9px] font-mono text-slate-400">{api.ping}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
               <Briefcase className="w-5 h-5 text-purple-400" />
               <h4 className="text-sm font-semibold text-white uppercase">Blockchain Municipal (Hashes)</h4>
            </div>
            <p className="text-[11px] text-slate-400 mb-4 pr-8">
               Muestreo en tiempo real de Mensajes de Datos sellados criptográficamente para auditoría federal.
            </p>
            <div className="space-y-2 h-[240px] overflow-hidden relative">
               <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#161920] to-transparent z-10"></div>
               {[
                 { id: 'TPC-2026-9902', hash: 'e3b0c44298fc1c149afbf4c8996fb924', date: '2 min ago' },
                 { id: 'TPC-2026-9901', hash: '4a0a19218e082a343a1b17e5333409af', date: '5 min ago' },
                 { id: 'TPC-2026-9900', hash: '8f14e45fceea167a5a36dedd4bea2543', date: '12 min ago' },
                 { id: 'TPC-2026-9899', hash: 'f2c7a407e324efdc4cf611daaaa5a1f2', date: '18 min ago' },
                 { id: 'TPC-2026-9898', hash: 'bb18a5df1ab03994e410a56f6aa6a0e6', date: '21 min ago' },
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 p-3 bg-[#0f1115] border border-slate-800/50 rounded-lg">
                    <div className="text-[10px] font-mono text-magenta-400 border-r border-slate-800 pr-3">{log.id}</div>
                    <div className="flex-1 text-[8px] font-mono text-slate-500 truncate leading-relaxed">
                       SHA256: {log.hash}...<br/>
                       {log.date}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function TesoreriaView() {
  const data = [
    { name: 'Lun', ingresos: 4000, meta: 2400 },
    { name: 'Mar', ingresos: 3000, meta: 1398 },
    { name: 'Mié', ingresos: 2000, meta: 9800 },
    { name: 'Jue', ingresos: 2780, meta: 3908 },
    { name: 'Vie', ingresos: 1890, meta: 4800 },
    { name: 'Sáb', ingresos: 2390, meta: 3800 },
    { name: 'Dom', ingresos: 3490, meta: 4300 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Tesorería Digital</h3>
        <p className="text-slate-400 text-sm mt-1">Recaudación centralizada e historial único por ciudadano.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Recaudación Semanal', value: '$2.4M', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Pagos Digitales', value: '84%', icon: CheckCircle2, color: 'text-purple-400' },
          { label: 'Trámites Activos', value: '1,240', icon: Activity, color: 'text-blue-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/0 to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-6">Proyección de Ingresos (Predial & Agua)</h4>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" vertical={false} opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontFamily="'JetBrains Mono', monospace" tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} fontFamily="'JetBrains Mono', monospace" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000)}k`} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#10B981', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}
                labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                cursor={{ stroke: '#1e293b', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" activeDot={{ r: 6, fill: '#10B981', stroke: '#0f1115', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ObrasView() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Trazabilidad de Obras</h3>
        <p className="text-slate-400 text-sm mt-1">Monitoreo en tiempo real de infraestructura estatal con alertas de sobrecosto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-semibold text-slate-300">Mapa de Obras Activas</h4>
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium">42 en proceso</span>
          </div>
          <div className="aspect-video bg-slate-800/30 rounded-lg border border-slate-800 relative overflow-hidden">
             <NayaritMap 
               center={{ lat: 21.5090, lng: -104.8947 }}
               zoom={14}
               markers={[
                 { lat: 21.5090, lng: -104.8947, title: "Obra Principal Centro", color: "#F59E0B" },
                 { lat: 21.5150, lng: -104.9050, title: "Frente de Trabajo Norte", color: "#10B981" },
                 { lat: 21.5020, lng: -104.8850, title: "Reporte Crítico", color: "#F43F5E" }
               ]}
             />
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Alertas Automáticas</h4>
          <div className="space-y-4">
            {[
              { title: 'Retraso Crítico: Puente Insurgentes', desc: 'Desfase de 15 días detectado en cronograma.', status: 'rojo' },
              { title: 'Requisición de Material', desc: 'Aprobación pendiente para asfalto.', status: 'ambar' },
              { title: 'Entrega Exitosa', desc: 'Unidad médica rehabilitada en tiempo.', status: 'verde' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-800/50">
                <div className={cn(
                  "w-2 rounded-full flex-shrink-0",
                  alert.status === 'rojo' ? 'bg-rose-500' : alert.status === 'ambar' ? 'bg-amber-500' : 'bg-emerald-500'
                )}></div>
                <div>
                  <h5 className="font-semibold text-sm text-slate-200">{alert.title}</h5>
                  <p className="text-xs text-slate-500 mt-1">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiciosView() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Reporte CSV generado exitosamente. Se ha enviado una copia al correo institucional.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Servicios Públicos Inteligentes</h3>
        <p className="text-slate-400 text-sm mt-1">Clasificador de IA y asignación de cuadrillas automáticas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {/* KPI Cards */}
         {[
           { label: 'Reportes Hoy', val: '184', change: '+12%' },
           { label: 'Tiempo Resp.', val: '2.4h', change: '-15%' },
           { label: 'Baches Report.', val: '45', change: '0%' },
           { label: 'Luminarias', val: '89', change: '+5%' },
         ].map((kpi, i) => (
           <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-500 font-semibold">{kpi.label}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{kpi.val}</span>
                <span className={cn("text-xs", kpi.change.startsWith('+') ? "text-emerald-400" : "text-emerald-400")}>{kpi.change}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
          <h4 className="text-sm font-semibold text-slate-300">Flujo de Reportes en Tiempo Real</h4>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {isExporting ? 'Procesando...' : 'Exportar CSV'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-800/30 text-slate-500 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">ID Ticket</th>
                <th className="px-6 py-3 font-medium">Ciudadano RUTA</th>
                <th className="px-6 py-3 font-medium">Categoría (IA)</th>
                <th className="px-6 py-3 font-medium">Ubicación</th>
                <th className="px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { id: 'TK-092', user: 'Juan Pérez', cat: 'Fuga de Agua', loc: 'Zona Centro', status: 'Asignado' },
                { id: 'TK-093', user: 'Ana G.', cat: 'Bacheo', loc: 'Colonia X', status: 'Recibido' },
                { id: 'TK-094', user: 'Luis M.', cat: 'Luminaria', loc: 'Libramiento', status: 'Resuelto' },
                { id: 'TK-095', user: 'María D.', cat: 'Basura', loc: 'Parque', status: 'En Proceso' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{row.id}</td>
                  <td className="px-6 py-4 text-slate-300">{row.user}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">{row.cat}</span></td>
                  <td className="px-6 py-4 text-slate-400">{row.loc}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "flex items-center gap-1.5 text-xs font-medium",
                      row.status === 'Resuelto' ? 'text-emerald-400' :
                      row.status === 'En Proceso' ? 'text-amber-400' :
                      row.status === 'Asignado' ? 'text-blue-400' : 'text-slate-400'
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full",
                         row.status === 'Resuelto' ? 'bg-emerald-400' :
                         row.status === 'En Proceso' ? 'bg-amber-400' :
                         row.status === 'Asignado' ? 'bg-blue-400' : 'bg-slate-400'
                      )}></div>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SaludView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight text-rose-500">Salud Inteligente Nayarit ID</h3>
          <p className="text-slate-400 text-sm mt-1">Triaje médico Offline + Alertas Epidemiológicas (Conecta C-11).</p>
        </div>
        <div className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-mono flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          SISTEMA OFFLINE ACTIVO EN LA SIERRA
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Mapa de Calor: Alertas de Salud Pública</h4>
          <div className="aspect-[21/9] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.15] mix-blend-screen"></div>
            {/* Heat map blobs */}
            <div className="absolute top-[40%] left-[30%] w-32 h-32 bg-rose-500/30 rounded-full blur-2xl"></div>
            <div className="absolute top-[20%] left-[60%] w-20 h-20 bg-amber-500/30 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-center">
               <Activity className="w-8 h-8 text-rose-500 mx-auto mb-2 opacity-50" />
               <p className="text-sm text-slate-400">Generando inferencias geográficas en tiempo real.</p>
               <div className="mt-4 flex gap-2 justify-center">
                 <span className="text-xs px-2 py-1 bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">Dengue (+12 casos detectados)</span>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Incidencias Recientes</h4>
          <div className="space-y-4">
            {[
              { time: 'Hace 5m', desc: 'Triaje Nivel 4 (Urgencia Urgente) reportado en zona norte.', type: 'critical' },
              { time: 'Hace 12m', desc: 'Consulta automatizada off-line completada en Puga.', type: 'normal' },
              { time: 'Hace 1h', desc: 'Alerta de desabasto en Centro de Salud #4.', type: 'warning' },
            ].map((feed, i) => (
              <div key={i} className="flex gap-3 text-sm border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                <span className="text-xs text-slate-500 font-mono flex-shrink-0 w-16">{feed.time}</span>
                <p className={cn(
                  feed.type === 'critical' ? 'text-rose-400' :
                  feed.type === 'warning' ? 'text-amber-400' : 'text-slate-300'
                )}>{feed.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IAView() {
  const [lang, setLang] = useState<Language>('es');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Presidenta Geraldine Ponce, el Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?' }
  ]);

  useEffect(() => {
    const greets = {
      es: 'Presidenta Geraldine Ponce, el Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?',
      cora: "Presidenta Geraldine Ponce, ConnectX IA amu'u tyu'un. ¿Tyu'un ne'ij tyu'uti'in Tepic?",
      wixarika: 'Geraldine Ponce keniu, ConnectX IA keniu. ¿Kewa pikanetsi\'iwau Tepic?'
    };
    setMessages([{ role: 'assistant', content: greets[lang] }]);
  }, [lang]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const strategicShortcuts = [
    "Resumen Recaudación",
    "Optimización Bacheo",
    "Reporte Bienestar",
    "Visión Tepic 2027"
  ];

  const handleSendMessage = async (text?: string) => {
    const userMsg = text || inputValue.trim();
    if (!userMsg) return;
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (!text) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `${userMsg} (Context: Governance Admin, Language: ${lang})` })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-black text-white flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-xl">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
            Nucleo ConnectX AI
          </h3>
          <p className="text-slate-500 text-xs mt-2 uppercase font-black tracking-widest flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             GOBERNANZA DATA-DRIVEN · COBERTURA TOTAL
          </p>
        </div>
        <div className="flex gap-2">
          {['es', 'cora', 'wixarika'].map(l => (
            <button 
              key={l}
              onClick={() => setLang(l as Language)}
              className={cn(
                "w-12 h-12 rounded-xl font-black text-[10px] uppercase shadow-lg transition-all",
                lang === l ? "bg-purple-600 text-white ring-2 ring-purple-500/40" : "bg-slate-800 text-slate-500 hover:bg-slate-700"
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        <div className="bg-[#12141a] border border-slate-800 rounded-[2.5rem] p-8 flex flex-col h-[650px] shadow-3xl">
          <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}
              >
                 <div className={cn(
                   "p-6 rounded-[2rem] text-[1.1rem] leading-relaxed shadow-xl max-w-[90%] font-medium",
                   msg.role === 'assistant' 
                    ? "bg-slate-800/80 text-white border border-slate-700 rounded-tl-none" 
                    : "bg-purple-600 text-white rounded-tr-none shadow-purple-600/20"
                 )}>
                   {msg.content}
                 </div>
                 <span className="text-[10px] text-slate-600 mt-3 font-black uppercase tracking-widest px-2">
                   {msg.role === 'user' ? 'G. Ponce' : 'ConnectX Strategic AI'} · {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </span>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3 p-6 bg-slate-800/50 rounded-[2rem] rounded-tl-none border border-slate-700 w-28">
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50 space-y-6">
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
               {strategicShortcuts.map(s => (
                 <button 
                  key={s} 
                  onClick={() => handleSendMessage(s)}
                  className="px-6 py-3 bg-slate-800/50 hover:bg-purple-600 text-[10px] text-slate-400 hover:text-white uppercase font-black tracking-widest rounded-xl border border-slate-700 hover:border-purple-500 transition-all active:scale-95 whitespace-nowrap shadow-lg"
                 >
                   {s}
                 </button>
               ))}
            </div>
            <div className="relative">
              <input 
                type="text"
                aria-label="Introducir comando ejecutivo"
                placeholder="Introducir comando ejecutivo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white text-[1rem] pr-20 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-bold placeholder:text-slate-800"
              />
              <button 
                onClick={() => handleSendMessage()}
                aria-label="Enviar"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-xl shadow-xl hover:bg-purple-500 transition-all active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#161920] border border-slate-800 rounded-[2.5rem] p-8 shadow-3xl">
              <h4 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[0.3em] border-l-4 border-purple-500 pl-4">Eficacia del Sistema</h4>
              <div className="space-y-10">
                 {[
                   { label: 'Indice de Recaudación Digital', val: 94.2, color: 'bg-emerald-500' },
                   { label: 'Resolución Autónoma IA', val: 78.5, color: 'bg-purple-500' },
                   { label: 'Satisfacción Ciudadana (UX)', val: 91.0, color: 'bg-blue-500' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-3">
                     <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white text-lg">{item.val}%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ delay: 1, duration: 1.5 }}
                          className={`h-full ${item.color} shadow-lg`}
                        />
                     </div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 p-6 bg-purple-600/5 rounded-3xl border border-purple-600/20">
                 <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-3">Reporte Algorítmico:</p>
                 <p className="text-sm text-slate-400 italic leading-relaxed font-medium">
                   "La integración del módulo de recaudación digital en Tepic ha superado las proyecciones iniciales, eliminando el 100% de la opacidad en transferencias de ventanilla."
                 </p>
              </div>
           </div>
           
           <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-3xl">
              <TrendingUp className="w-12 h-12 mb-6 text-white/40" />
              <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter italic">Vanguardia Digital</h4>
              <p className="text-sm text-white/60 leading-relaxed font-medium mb-8">
                ConnectX es ahora el sistema operativo municipal más avanzado de México, diseñado para la trazabilidad absoluta.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

function AgrovisionView() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Certificado de Producción generado exitosamente. Disponible en la bitácora del productor.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Agrovisión 3D</h3>
        <p className="text-slate-400 text-sm mt-1">Monitoreo satelital y modelado 3D de la producción agropecuaria en Nayarit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Visualización de Parcelas / NDVI</h4>
          <div className="aspect-[16/9] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden group cursor-crosshair">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
            
            {/* Hex Grid Overlay */}
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5z' fill='none' stroke='%234ADE80' stroke-width='1'/%3E%3C/svg%3E\")"}}></div>

            <div className="relative z-10 p-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-center">
              <p className="text-xs font-mono text-emerald-400 mb-2 tracking-widest">ANALYZING CROP HEALTH</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">0.82</div>
                  <div className="text-[10px] text-slate-400 uppercase">NDVI Promedio</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">12%</div>
                  <div className="text-[10px] text-slate-400 uppercase">Humedad Suelo</div>
                </div>
              </div>
            </div>
            
            {/* 3D Mock Overlay */}
            <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-slate-400 border border-white/10">RENDER: OCTANE 3D ENGINE</div>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Inteligencia de Mercado</h4>
          <div className="space-y-4">
            {[
              { product: 'Caña de Azúcar', price: '$820/t', trend: 'up' },
              { product: 'Mango Barracuda', price: '$12/kg', trend: 'down' },
              { product: 'Cacao Real', price: '$140/kg', trend: 'stable' },
              { product: 'Maíz Híbrido', price: '$6,200/t', trend: 'up' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-800/20 border border-slate-800 rounded-lg">
                <span className="text-sm text-slate-200">{item.product}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{item.price}</div>
                  <div className={cn(
                    "text-[10px] font-bold uppercase",
                    item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-slate-500'
                  )}>
                    {item.trend === 'up' ? '↑ Alza' : item.trend === 'down' ? '↓ Baja' : '↔ Estable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-6 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {isGenerating ? 'Generando...' : 'Generar Certificado de Producción'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BienestarView() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-6 pt-12">
      <div className="rounded-full bg-pink-500/10 w-24 h-24 flex items-center justify-center mx-auto border border-pink-500/20">
         <HeartHandshake className="w-12 h-12 text-pink-400" />
      </div>
      <h3 className="text-3xl font-bold text-white">Bienestar Social</h3>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        Integración programática. <br/>
        El padrón único alinea a los beneficiarios de Estado y Municipio mediante la IDN-U, eliminando duplicidad de apoyos sociales y correlacionando datos del triaje médico con despensas o subsidios.
      </p>
      
      <div className="pt-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300">
          <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          Sincronizando padrones...
        </span>
      </div>
    </div>
  );
}

function MetricView() {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Métricas Integrales de Gobierno</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 p-6 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-400 mb-4">Adopción de Servicios Digitales</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" vertical={false} opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontFamily="'JetBrains Mono', monospace" tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={11} fontFamily="'JetBrains Mono', monospace" tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#8b5cf6', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}
                />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={32}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function GabineteView() {
  const officials = [
    {
      name: "Geraldine Ponce",
      title: "Presidenta Municipal",
      department: "Presidencia",
      kpiName: "Aprobación Ciudadana",
      kpiValue: "84%",
      kpiStatus: "positive",
      avatar: "https://images.unsplash.com/photo-1586996292898-71f4036c4e07?w=200&h=200&fit=crop&crop=faces",
      responseTime: "< 24h",
      projects: 12
    },
    {
      name: "Alejandro Galván",
      title: "Jefe de Gabinete",
      department: "Gabinete",
      kpiName: "Eficiencia Operativa",
      kpiValue: "92%",
      kpiStatus: "positive",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces",
      responseTime: "< 12h",
      projects: 8
    },
    {
      name: "Mtra. Blanca Simancas",
      title: "Secretaria del Ayuntamiento",
      department: "Secretaría",
      kpiName: "Trámites Digitalizados",
      kpiValue: "80%",
      kpiStatus: "neutral",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
      responseTime: "< 48h",
      projects: 5
    },
    {
      name: "Lic. Carlos Robles",
      title: "Director de Obras Públicas",
      department: "Infraestructura",
      kpiName: "Obras en Tiempo",
      kpiValue: "88%",
      kpiStatus: "positive",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces",
      responseTime: "< 72h",
      projects: 24
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-black text-white mb-2">Gabinete en Tiempo Real</h2>
        <p className="text-slate-400">Adiós al directorio web tradicional. Aquí los ciudadanos evalúan el desempeño real, el tiempo de respuesta y la eficiencia de cada servidor público. Cuentas claras para construir confianza.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#161920] rounded-xl p-6 border border-slate-800">
          <div className="text-slate-400 text-sm font-medium mb-1">Total Gabinete</div>
          <div className="text-3xl font-black text-white">42</div>
          <div className="text-emerald-400 text-sm font-bold mt-2">100% Declaración 3de3</div>
        </div>
        <div className="bg-[#161920] rounded-xl p-6 border border-slate-800">
          <div className="text-slate-400 text-sm font-medium mb-1">Promedio Respuesta</div>
          <div className="text-3xl font-black text-white">18h</div>
          <div className="text-emerald-400 text-sm font-bold mt-2">-40% vs Administración Anterior</div>
        </div>
        <div className="bg-[#161920] rounded-xl p-6 border border-slate-800">
          <div className="text-slate-400 text-sm font-medium mb-1">Evaluación Ciudadana</div>
          <div className="text-3xl font-black text-emerald-400">8.9/10</div>
          <div className="text-slate-500 text-sm mt-2">Basado en NayaritID</div>
        </div>
        <div className="bg-[#161920] rounded-xl p-6 border border-slate-800">
          <div className="text-slate-400 text-sm font-medium mb-1">Iniciativas Cumplidas</div>
          <div className="text-3xl font-black text-white">142</div>
          <div className="text-emerald-400 text-sm font-bold mt-2">Validadas por C5</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {officials.map((official, i) => (
          <div key={i} className="bg-[#161920] rounded-xl border border-slate-800 overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                <img src={official.avatar} alt={official.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-white text-lg">{official.name}</h3>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">{official.title}</p>
              <p className="text-slate-500 text-sm">{official.department}</p>
            </div>
            <div className="border-t border-slate-800 bg-[#0a0a0c] p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-xs">{official.kpiName}</span>
                <span className={cn("text-sm font-bold", official.kpiStatus === 'positive' ? "text-emerald-400" : "text-amber-400")}>{official.kpiValue}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-xs">Tiempo Respuesta</span>
                <span className="text-slate-300 text-sm font-mono">{official.responseTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Proyectos C5</span>
                <span className="text-slate-300 text-sm font-mono">{official.projects} Activos</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
