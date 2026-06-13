import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { NayaritMap } from './NayaritMap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

type ModuleType = 'tesoreria' | 'obras' | 'servicios' | 'salud' | 'bienestar' | 'ia' | 'agrovision' | 'observatorio';

export function C5Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<ModuleType>('tesoreria');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const modules = [
    { id: 'tesoreria', name: 'Tesorería Digital', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'obras', name: 'Trazabilidad Obras', icon: MapIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'servicios', name: 'Servicios Públicos', icon: AlertTriangle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'salud', name: 'TEPICTU Salud', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'bienestar', name: 'Bienestar Social', icon: HeartHandshake, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'ia', name: 'Asistente IA', icon: Bot, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'agrovision', name: 'Agrovisión 3D', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'observatorio', name: 'Observatorio Digital', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
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
                <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center font-bold text-white shadow-lg">
                  N
                </div>
                <div>
                  <h1 className="font-bold text-white tracking-tight leading-none mb-1">Nayarit Digital</h1>
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
                      ? "bg-slate-800/50 text-white" 
                      : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200"
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
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">STATE: ONLINE</span>
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
              {activeModule === 'ia' && <IAView />}
              {activeModule === 'agrovision' && <AgrovisionView />}
              {activeModule === 'observatorio' && <ObservatorioView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- SUB-VIEWS --- //

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
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#10B981' }}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorIngresos)" />
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
          <h3 className="text-2xl font-bold text-white tracking-tight text-rose-500">TEPICTU Salud</h3>
          <p className="text-slate-400 text-sm mt-1">Triaje médico Offline + Alertas Epidemiológicas.</p>
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
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Presidenta Geraldine Ponce, el Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
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
      <div className="text-center max-w-2xl mx-auto py-8">
        <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <Bot className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-3xl font-bold text-white tracking-tight mb-2">ConnectX AI Governance</h3>
        <p className="text-slate-400 text-sm">Control centralizado de inteligencia artificial para el municipio de Tepic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-6 flex flex-col h-[500px] shadow-2xl">
          <h4 className="text-sm font-semibold text-slate-300 mb-4 pb-4 border-b border-slate-800 flex justify-between items-center">
             <span>Consola de Comando IA</span>
             <span className="text-[10px] text-emerald-500 font-mono">LATENCY: 42ms</span>
          </h4>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.map((msg, i) => (
               <div key={i} className={cn("flex gap-3", msg.role === 'user' && "flex-row-reverse")}>
                 <div className={cn(
                   "w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold",
                   msg.role === 'assistant' ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300"
                 )}>
                   {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : 'GP'}
                 </div>
                 <div className={cn(
                   "px-4 py-2.5 rounded-2xl text-sm border transition-all",
                   msg.role === 'assistant' 
                     ? "bg-purple-600/20 border-purple-500/30 text-slate-200 rounded-tl-none" 
                     : "bg-slate-800/80 border-slate-700 text-slate-300 rounded-tr-none"
                 )}>
                   {msg.content}
                 </div>
               </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                <div className="bg-purple-600/10 px-4 py-2.5 rounded-2xl rounded-tl-none border border-purple-500/20">
                   <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <input 
               type="text" 
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
               placeholder="Consultar estatus de colonias o eficiencia..." 
               className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping}
              className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#161920] border border-slate-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-slate-300 mb-4">Métricas del LLM</h4>
              <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-400">Precisión de Intención (Intent)</span>
                     <span className="text-purple-400 font-mono">94.2%</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-[94.2%]"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-400">Trámites Resueltos sin Humano</span>
                     <span className="text-emerald-400 font-mono">78.5%</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[78.5%]"></div>
                   </div>
                 </div>
              </div>
           </div>
           
           <div className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl">
             <h4 className="font-semibold text-purple-300 mb-2">Traducción Indígena Activa</h4>
             <p className="text-sm text-purple-200/70 mb-4">Procesamiento de lenguaje natural mapeado a dialectos regionales.</p>
             <div className="flex gap-2">
               <span className="px-2.5 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded text-xs">Wixárika (Huichol)</span>
               <span className="px-2.5 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded text-xs">Náayeri (Cora)</span>
             </div>
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

function ObservatorioView() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Informe de Gobernanza generado. Descarga completa en formato Ejecutivo.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
       <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Observatorio Digital de Nayarit</h3>
        <p className="text-slate-400 text-sm mt-1">Central de Inteligencia Territorial para la toma de decisiones basada en datos longitudinales.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Índice Madurez (IMDM)', val: '68/100', status: '+4 pts este mes', color: 'text-cyan-400' },
          { label: 'Gobernanza Abierta', val: '92.1%', status: 'Nivel: Transparente', color: 'text-emerald-400' },
          { label: 'Confianza Ciudadana', val: '74%', status: '↑ 12% vs 2021', color: 'text-purple-400' },
          { label: 'Ahorro Operativo', val: '$14.2M', status: 'Corte semestral', color: 'text-amber-400' },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#161920] border border-slate-800 rounded-xl p-5 border-b-[3px] border-b-cyan-500/50">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className={cn("text-2xl font-black mb-1", kpi.color)}>{kpi.val}</p>
            <p className="text-[10px] text-slate-400 font-medium">{kpi.status}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#161920] border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Mapas de Calor: Demanda Ciudadana Integrada</h4>
          <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale"></div>
             {/* Dynamic Blobs */}
             <div className="absolute top-[30%] left-[40%] w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] animate-pulse"></div>
             <div className="absolute bottom-[20%] right-[30%] w-32 h-32 bg-magenta-500/20 rounded-full blur-[50px] animate-pulse" style={{backgroundColor: 'rgba(229,0,122,0.1)'}}></div>
             
             <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-white/10">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase leading-none block mb-1">Capa Activa</span>
                      <span className="text-xs font-bold text-white uppercase tracking-tight">Obras vs Quejas de Agua</span>
                   </div>
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <div className="w-3 h-3 rounded-full bg-magenta-500" style={{backgroundColor:'var(--magenta)'}}></div>
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
          <h4 className="text-sm font-semibold text-slate-300 mb-6">Últimas Decisiones Data-Driven</h4>
          <div className="space-y-4">
            {[
              { id: 'OD-401', action: 'Reasignación de cuadrilla de bacheo a zona norte por pico de reportes IA.', date: 'Hoy' },
              { id: 'OD-402', action: 'Ajuste de presupuesto TEPICTU Salud en sierra de El Nayar.', date: 'Ayer' },
              { id: 'OD-403', action: 'Apertura de ventanilla digital en Jala por baja penetración IMDM.', date: '2 días' },
            ].map((decision, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-cyan-400">{decision.id}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">{decision.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{decision.action}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={handleReport}
            disabled={isGenerating}
            className="w-full mt-6 py-2.5 rounded-lg bg-cyan-500 text-white text-xs font-bold hover:bg-cyan-600 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isGenerating ? 'Generando...' : 'Ver Informe de Gobernanza'}
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
