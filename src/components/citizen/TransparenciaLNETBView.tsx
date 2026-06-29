// Pantalla pública de cumplimiento LNETB para el ciudadano.
// Muestra: trámites digitalizados, estatus Llave MX, código fuente, métricas de uso.
// Art. 15 LNETB: métricas de uso ciudadano obligatorias.

import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ShieldCheck, Code2, ExternalLink, ChevronLeft, BarChart2, Users, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface TransparenciaLNETBViewProps {
  onBack: () => void;
}

const METRICAS = [
  { label: 'Trámites realizados este mes', value: '1,847', icon: <TrendingUp size={18} className="text-emerald-400" />, trend: '+23%' },
  { label: 'Ciudadanos activos', value: '2,400', icon: <Users size={18} className="text-blue-400" />, trend: '+12%' },
  { label: 'Tiempo promedio de respuesta', value: '2.4 hrs', icon: <Clock size={18} className="text-amber-400" />, trend: '-18%' },
  { label: 'Recaudación digital', value: '$4.2M', icon: <BarChart2 size={18} className="text-purple-400" />, trend: '+31%' },
];

const TRAMITES_STATUS = [
  { nombre: 'Pago de Predial', estado: 'digital' },
  { nombre: 'Derechos de Agua', estado: 'digital' },
  { nombre: 'Licencia de Funcionamiento', estado: 'digital' },
  { nombre: 'Renovación de Licencia', estado: 'digital' },
  { nombre: 'Multas de Tránsito', estado: 'digital' },
  { nombre: 'Reporte Ciudadano (baches/luminarias)', estado: 'digital' },
  { nombre: 'Triaje Médico Digital', estado: 'digital' },
  { nombre: 'Inscripción Bienestar Social', estado: 'digital' },
  { nombre: 'Acta de Nacimiento', estado: 'digital' },
  { nombre: 'Licencia de Construcción', estado: 'proceso' },
  { nombre: 'Constancia de Uso de Suelo', estado: 'proceso' },
  { nombre: 'Alineamiento y Número Oficial', estado: 'proceso' },
  { nombre: 'Acta de Matrimonio', estado: 'proceso' },
  { nombre: 'Permiso de División de Predios', estado: 'pendiente' },
  { nombre: 'Dictamen de Seguridad Estructural', estado: 'pendiente' },
];

const digitalizados = TRAMITES_STATUS.filter(t => t.estado === 'digital').length;
const enProceso = TRAMITES_STATUS.filter(t => t.estado === 'proceso').length;
const pendientes = TRAMITES_STATUS.filter(t => t.estado === 'pendiente').length;
const pct = Math.round((digitalizados / TRAMITES_STATUS.length) * 100);

export function TransparenciaLNETBView({ onBack }: TransparenciaLNETBViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-14 pb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <ChevronLeft size={16} /> Inicio
        </button>
        <h2 className="text-xl font-black text-slate-900">Transparencia LNETB</h2>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">
          Ley Nacional para Eliminar Trámites Burocráticos · DOF 16-VII-2025
        </p>
      </div>

      <div className="px-4 py-5 space-y-5">

        {/* Digitalización general */}
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-slate-800">Digitalización de Trámites</p>
            <span className="text-2xl font-black text-emerald-600">{pct}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(digitalizados / TRAMITES_STATUS.length) * 100}%` }} />
            <div className="h-full bg-amber-400 transition-all" style={{ width: `${(enProceso / TRAMITES_STATUS.length) * 100}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { v: digitalizados, l: 'Digitales', c: 'text-emerald-600' },
              { v: enProceso, l: 'En proceso', c: 'text-amber-600' },
              { v: pendientes, l: 'Pendientes', c: 'text-slate-400' },
            ].map(s => (
              <div key={s.l}>
                <p className={cn('text-lg font-black', s.c)}>{s.v}</p>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Llave MX */}
        <div className="bg-[#006847] rounded-[1.5rem] p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-white">Llave MX Integrada</p>
            <p className="text-[10px] text-white/70 mt-0.5">Inicio de sesión único nacional · Art. 74 LNETB</p>
          </div>
          <CheckCircle2 size={20} className="text-white/80 shrink-0" />
        </div>

        {/* Métricas Art. 15 */}
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Métricas de Uso · Art. 15 LNETB</p>
          <div className="grid grid-cols-2 gap-3">
            {METRICAS.map(m => (
              <div key={m.label} className="bg-slate-50 rounded-2xl p-3">
                {m.icon}
                <p className="text-lg font-black text-slate-900 mt-2">{m.value}</p>
                <p className="text-[9px] text-slate-500 leading-tight">{m.label}</p>
                <span className={cn(
                  'text-[9px] font-black',
                  m.trend.startsWith('-') && m.label.includes('respuesta') ? 'text-emerald-500' :
                  m.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                )}>
                  {m.trend} vs mes anterior
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Estatus de trámites */}
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Estatus por Trámite · Arts. 51-54 LNETB
          </p>
          <div className="space-y-2">
            {TRAMITES_STATUS.map(t => (
              <div key={t.nombre} className="flex items-center gap-3">
                {t.estado === 'digital'
                  ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  : t.estado === 'proceso'
                    ? <Clock size={14} className="text-amber-500 shrink-0" />
                    : <AlertCircle size={14} className="text-slate-300 shrink-0" />}
                <span className={cn(
                  'text-xs',
                  t.estado === 'digital' ? 'text-slate-700' :
                  t.estado === 'proceso' ? 'text-slate-500' : 'text-slate-400'
                )}>
                  {t.nombre}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Código fuente — Art. 91 */}
        <div className="bg-slate-900 rounded-[1.5rem] p-5">
          <div className="flex items-start gap-3">
            <Code2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-white">Software Público</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Esta plataforma es software de propiedad municipal. El código fuente está disponible en el Repositorio Nacional de Tecnología conforme al Art. 91 de la LNETB.
              </p>
              <a
                href="https://repositorio.gob.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:underline"
              >
                Ver en Repositorio Nacional <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Portal ciudadano único */}
        <a
          href="https://www.gob.mx/tramites"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Portal Ciudadano Único</p>
              <p className="text-[10px] text-slate-400 mt-0.5">gob.mx/tramites · Directorio federal</p>
            </div>
            <ExternalLink size={16} className="text-slate-400" />
          </div>
        </a>

        <p className="text-[10px] text-slate-400 text-center leading-relaxed px-4">
          Información actualizada mensualmente · H. Ayuntamiento de Tepic · ConnectX Infraestructura Digital
        </p>
      </div>
    </div>
  );
}
