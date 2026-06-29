// Arts. 51-54 LNETB: Todo trámite municipal debe estar inscrito en el Portal Ciudadano Único.
// Ningún cobro o requisito fuera del Portal tiene validez legal.
// Este módulo es el inventario oficial de trámites del H. Ayuntamiento de Tepic.

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Clock, ExternalLink, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

type EstadoPortal = 'REGISTRADO' | 'EN_PROCESO' | 'PENDIENTE';
type AreaMunicipal = 'TESORERIA' | 'OBRAS' | 'SERVICIOS' | 'SALUD' | 'DESARROLLO' | 'REGISTRO_CIVIL';

interface Tramite {
  id: string;
  nombre: string;
  area: AreaMunicipal;
  costo: string;
  plazo: string;
  requisitos: string[];
  portalUnico: EstadoPortal;
  moduloConnectX: string;
  articuloLNETB: string;
}

const TRAMITES: Tramite[] = [
  {
    id: 'TES-001',
    nombre: 'Pago de Predial',
    area: 'TESORERIA',
    costo: 'Variable según valor catastral',
    plazo: 'Inmediato',
    requisitos: ['CURP o RFC', 'Número de cuenta catastral', 'Identificación oficial'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'Tesorería Digital',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'TES-002',
    nombre: 'Pago de Derechos de Agua',
    area: 'TESORERIA',
    costo: 'Variable por consumo',
    plazo: 'Inmediato',
    requisitos: ['Número de contrato', 'Identificación oficial'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'Tesorería Digital',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'TES-003',
    nombre: 'Licencia de Funcionamiento (nueva)',
    area: 'TESORERIA',
    costo: '$1,200 - $8,500 MXN según giro',
    plazo: '5 días hábiles',
    requisitos: ['CURP / RFC', 'Acta constitutiva', 'Constancia de uso de suelo', 'Identificación oficial', 'Comprobante de domicilio'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'MostradorPro',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'TES-004',
    nombre: 'Renovación de Licencia de Funcionamiento',
    area: 'TESORERIA',
    costo: '$600 - $4,200 MXN según giro',
    plazo: '3 días hábiles',
    requisitos: ['Licencia anterior', 'CURP / RFC', 'Comprobante de pago anterior'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'MostradorPro',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'TES-005',
    nombre: 'Pago de Multas de Tránsito',
    area: 'TESORERIA',
    costo: 'Según infracción',
    plazo: 'Inmediato',
    requisitos: ['Folio de infracción', 'Identificación oficial'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'Tesorería Digital',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'OBR-001',
    nombre: 'Licencia de Construcción',
    area: 'OBRAS',
    costo: 'Variable según m²',
    plazo: '10 días hábiles',
    requisitos: ['Planos firmados por DRO', 'Constancia de uso de suelo', 'CURP / RFC', 'Boleta predial al corriente'],
    portalUnico: 'EN_PROCESO',
    moduloConnectX: 'Trazabilidad de Obras',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'OBR-002',
    nombre: 'Constancia de Uso de Suelo',
    area: 'OBRAS',
    costo: '$350 MXN',
    plazo: '5 días hábiles',
    requisitos: ['Croquis de ubicación', 'Escritura o contrato', 'Identificación oficial'],
    portalUnico: 'EN_PROCESO',
    moduloConnectX: 'Trazabilidad de Obras',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'SER-001',
    nombre: 'Reporte de Infraestructura Pública (bache, luminaria, fuga)',
    area: 'SERVICIOS',
    costo: 'Gratuito',
    plazo: '48-72 horas respuesta',
    requisitos: ['Ubicación GPS o dirección', 'Foto evidencia (opcional)'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'Servicios Públicos Inteligente',
    articuloLNETB: 'Art. 13, fracc. XV',
  },
  {
    id: 'SAL-001',
    nombre: 'Triaje Médico Digital (orientación de síntomas)',
    area: 'SALUD',
    costo: 'Gratuito',
    plazo: 'Inmediato (IA 24/7)',
    requisitos: ['Nayarit ID o CURP'],
    portalUnico: 'REGISTRADO',
    moduloConnectX: 'Salud Inteligente — Nayarit ID',
    articuloLNETB: 'Art. 13, fracc. XVI',
  },
  {
    id: 'DES-001',
    nombre: 'Inscripción a Programas de Bienestar Social',
    area: 'DESARROLLO',
    costo: 'Gratuito',
    plazo: '15 días hábiles evaluación',
    requisitos: ['CURP', 'Comprobante de domicilio', 'Estudio socioeconómico'],
    portalUnico: 'EN_PROCESO',
    moduloConnectX: 'Bienestar Social',
    articuloLNETB: 'Art. 13, fracc. XIII',
  },
  {
    id: 'RC-001',
    nombre: 'Acta de Nacimiento (copia certificada)',
    area: 'REGISTRO_CIVIL',
    costo: '$50 MXN',
    plazo: 'Inmediato (digital) / 1 día (física)',
    requisitos: ['CURP', 'Datos del registrado'],
    portalUnico: 'PENDIENTE',
    moduloConnectX: 'Asistente IA (en integración)',
    articuloLNETB: 'Arts. 51-54',
  },
  {
    id: 'RC-002',
    nombre: 'Acta de Matrimonio (copia certificada)',
    area: 'REGISTRO_CIVIL',
    costo: '$80 MXN',
    plazo: '1 día hábil',
    requisitos: ['CURP de ambos contrayentes', 'Número de acta'],
    portalUnico: 'PENDIENTE',
    moduloConnectX: 'Asistente IA (en integración)',
    articuloLNETB: 'Arts. 51-54',
  },
];

const AREA_LABELS: Record<AreaMunicipal, string> = {
  TESORERIA: 'Tesorería',
  OBRAS: 'Obras Públicas',
  SERVICIOS: 'Servicios Públicos',
  SALUD: 'Salud',
  DESARROLLO: 'Desarrollo Social',
  REGISTRO_CIVIL: 'Registro Civil',
};

const ESTADO_CONFIG: Record<EstadoPortal, { label: string; color: string; icon: React.ReactNode }> = {
  REGISTRADO: {
    label: 'Registrado en Portal Único',
    color: 'text-emerald-400 bg-emerald-400/10',
    icon: <CheckCircle2 size={14} />,
  },
  EN_PROCESO: {
    label: 'Registro en proceso',
    color: 'text-amber-400 bg-amber-400/10',
    icon: <Clock size={14} />,
  },
  PENDIENTE: {
    label: 'Pendiente de registro',
    color: 'text-red-400 bg-red-400/10',
    icon: <AlertCircle size={14} />,
  },
};

export function InventarioTramitesView() {
  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState<AreaMunicipal | 'ALL'>('ALL');
  const [estadoFilter, setEstadoFilter] = useState<EstadoPortal | 'ALL'>('ALL');
  const [expanded, setExpanded] = useState<string | null>(null);

  const registrados = TRAMITES.filter(t => t.portalUnico === 'REGISTRADO').length;
  const enProceso = TRAMITES.filter(t => t.portalUnico === 'EN_PROCESO').length;
  const pendientes = TRAMITES.filter(t => t.portalUnico === 'PENDIENTE').length;
  const cumplimientoPct = Math.round((registrados / TRAMITES.length) * 100);

  const filtered = TRAMITES.filter(t => {
    const matchSearch = t.nombre.toLowerCase().includes(search.toLowerCase()) ||
      t.moduloConnectX.toLowerCase().includes(search.toLowerCase());
    const matchArea = areaFilter === 'ALL' || t.area === areaFilter;
    const matchEstado = estadoFilter === 'ALL' || t.portalUnico === estadoFilter;
    return matchSearch && matchArea && matchEstado;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
          Inventario de Trámites Municipales
        </h3>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">
          Arts. 51–54 LNETB · Portal Ciudadano Único · H. Ayuntamiento de Tepic
        </p>
      </div>

      {/* Compliance bar */}
      <div className="bg-[#161920] border border-slate-700 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-300">
            Cumplimiento Arts. 51-54 LNETB
          </span>
          <span className="text-2xl font-black text-emerald-400">{cumplimientoPct}%</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
            style={{ width: `${cumplimientoPct}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: 'Registrados', value: registrados, color: 'text-emerald-400' },
            { label: 'En proceso', value: enProceso, color: 'text-amber-400' },
            { label: 'Pendientes', value: pendientes, color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={cn('text-xl font-black', s.color)}>{s.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar trámite..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#161920] border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <select
          value={areaFilter}
          onChange={e => setAreaFilter(e.target.value as any)}
          className="bg-[#161920] border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-400 focus:outline-none uppercase tracking-widest"
        >
          <option value="ALL">Todas las áreas</option>
          {Object.entries(AREA_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          value={estadoFilter}
          onChange={e => setEstadoFilter(e.target.value as any)}
          className="bg-[#161920] border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-400 focus:outline-none uppercase tracking-widest"
        >
          <option value="ALL">Todos los estados</option>
          <option value="REGISTRADO">Registrados</option>
          <option value="EN_PROCESO">En proceso</option>
          <option value="PENDIENTE">Pendientes</option>
        </select>
      </div>

      {/* Tramite list */}
      <div className="space-y-3">
        {filtered.map(tramite => {
          const estado = ESTADO_CONFIG[tramite.portalUnico];
          const isExpanded = expanded === tramite.id;
          return (
            <div
              key={tramite.id}
              className="bg-[#161920] border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-600 transition-colors"
              onClick={() => setExpanded(isExpanded ? null : tramite.id)}
            >
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-[10px] font-black text-slate-600 shrink-0">{tramite.id}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-200 truncate">{tramite.nombre}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      {AREA_LABELS[tramite.area]} · {tramite.moduloConnectX}
                    </p>
                  </div>
                </div>
                <div className={cn(
                  'shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest',
                  estado.color
                )}>
                  {estado.icon}
                  <span className="hidden sm:inline">{estado.label}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Costo</p>
                      <p className="text-sm text-slate-300 font-medium">{tramite.costo}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Plazo de resolución</p>
                      <p className="text-sm text-slate-300 font-medium">{tramite.plazo}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Requisitos</p>
                    <ul className="space-y-1">
                      {tramite.requisitos.map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Fundamento: <span className="text-slate-400">{tramite.articuloLNETB}</span>
                    </span>
                    <a
                      href="https://www.gob.mx/tramites"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-[10px] text-emerald-400 hover:underline font-bold uppercase tracking-widest"
                    >
                      Portal Ciudadano Único <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest">
        Total: {TRAMITES.length} trámites municipales · Actualización: junio 2026 · Art. 53 LNETB
      </p>
    </div>
  );
}
