import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CitizenReport, getCitizenReports } from '../services/citizenService';

export const CitizenOS: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    const loadData = async () => {
      const data = await getCitizenReports();
      setReports(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredReports = reports.filter(r => filter === 'ALL' || r.status === filter);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-black text-slate-900">Capa Ciudadana Unificada</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Legitimidad y Transparencia Activa en Nayarit</p>
        </div>
        <button className="px-6 py-4 bg-nayarit-orange text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform">
          <Plus size={16} />
          Nuevo Reporte Ciudadano
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Reportes Activos', value: reports.length, icon: <MessageSquare className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'En Resolución', value: reports.filter(r => r.status === 'IN_REVIEW').length, icon: <Clock className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: 'Casos Cerrados', value: reports.filter(r => r.status === 'RESOLVED').length, icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className={cn("p-6 rounded-3xl border border-slate-100 flex items-center gap-4", stat.bg)}>
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por ID Nayarit o Activo..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nayarit-orange/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest text-slate-600 focus:outline-none"
            >
              <option value="ALL">Todos los Estados</option>
              <option value="PENDING">Pendientes</option>
              <option value="IN_REVIEW">En Revisión</option>
              <option value="RESOLVED">Resueltos</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-nayarit-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sincronizando Auditoría Ciudadana...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No se encontraron reportes en esta categoría.</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                        report.status === 'PENDING' ? "bg-amber-100 text-amber-600" : 
                        report.status === 'IN_REVIEW' ? "bg-blue-100 text-blue-600" : 
                        "bg-emerald-100 text-emerald-600"
                      )}>
                        {report.status === 'PENDING' ? 'Pendiente' : report.status === 'IN_REVIEW' ? 'En Revisión' : 'Resuelto'}
                      </span>
                      <span className="text-[10px] font-mono text-nayarit-orange">{report.assetId}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-nayarit-orange transition-colors">{report.assetName}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{report.description}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                        <MapPin size={12} />
                        Reportado por: {report.citizenName}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                        <Clock size={12} />
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-center">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ID Reporte</p>
                      <p className="text-xs font-mono text-slate-900">{report.id}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-nayarit-orange group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Transparency Banner */}
      <div className="p-8 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 data-grid opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-nayarit-orange">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold">Protocolo de Transparencia Activa</h4>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Los datos clave se publican cada 30 días por mandato administrativo.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-nayarit-orange hover:text-white transition-all">
            Ver Reporte de Transparencia Mar 2026
          </button>
        </div>
      </div>
    </div>
  );
};
