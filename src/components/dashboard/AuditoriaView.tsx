import React, { useState } from 'react';
import { Shield, AlertTriangle, Download, Eye, Trash2, Edit3, LogIn, Settings, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

type ActionType = 'access' | 'write' | 'export' | 'delete' | 'denied' | 'system';

interface AuditEntry {
  id: number;
  user: string;
  avatar: string;
  role: string;
  action: string;
  module: string;
  target: string;
  ts: string;
  ip: string;
  type: ActionType;
}

function tsFromNow(minutesAgo: number): string {
  const d = new Date(Date.now() - minutesAgo * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return `${date} ${time}`;
}

const AUDIT_ENTRIES: AuditEntry[] = [
  { id: 1,  user: 'Geraldine R.',  avatar: 'G', role: 'Tesorera Municipal',   action: 'Aprobó pago',           module: 'Tesorería',  target: 'Folio #TPC-2026-9902',              ts: tsFromNow(4),    ip: '192.168.1.45',  type: 'write'  },
  { id: 2,  user: 'Carlos M.',     avatar: 'C', role: 'Dir. Obras Públicas',   action: 'Actualizó avance',      module: 'Obras',      target: 'Bacheo Av. México km 3',             ts: tsFromNow(38),   ip: '192.168.1.12',  type: 'write'  },
  { id: 3,  user: 'Miguel A.',     avatar: 'M', role: 'Administrador',         action: 'Accedió al sistema',    module: 'C5 Hub',     target: 'Módulo Tesorería',                  ts: tsFromNow(66),   ip: '10.0.0.2',      type: 'access' },
  { id: 4,  user: 'Geraldine R.',  avatar: 'G', role: 'Tesorera Municipal',   action: 'Exportó reporte',       module: 'Tesorería',  target: 'Recaudación Semanal PDF',            ts: tsFromNow(197),  ip: '192.168.1.45',  type: 'export' },
  { id: 5,  user: 'Ana L.',        avatar: 'A', role: 'Servicios Públicos',    action: 'Cerró incidencia',      module: 'Servicios',  target: 'Reporte #INC-0445',                 ts: tsFromNow(228),  ip: '192.168.1.88',  type: 'write'  },
  { id: 6,  user: 'Roberto S.',    avatar: 'R', role: 'Dir. Bienestar Social', action: 'Eliminó beneficiario',  module: 'Bienestar',  target: 'Ciudadano ID #84920',               ts: tsFromNow(302),  ip: '192.168.2.33',  type: 'delete' },
  { id: 7,  user: 'Geraldine R.',  avatar: 'G', role: 'Tesorera Municipal',   action: 'Modificó meta fiscal',  module: 'Tesorería',  target: 'Meta recaudación Q3-2026',          ts: tsFromNow(1335), ip: '192.168.1.45',  type: 'write'  },
  { id: 8,  user: 'Carlos M.',     avatar: 'C', role: 'Dir. Obras Públicas',   action: 'Subió documento',       module: 'Obras',      target: 'Contrato licitación LC-2026-12',    ts: tsFromNow(1420), ip: '192.168.1.12',  type: 'write'  },
  { id: 9,  user: 'Sistema',       avatar: 'S', role: 'Proceso automático',    action: 'Backup programado',     module: 'Sistema',    target: 'DB snapshot automático',            ts: tsFromNow(1650), ip: 'localhost',     type: 'system' },
  { id: 10, user: 'Roberto S.',    avatar: 'R', role: 'Dir. Bienestar Social', action: 'Acceso denegado',       module: 'Tesorería',  target: 'Módulo restringido — sin permiso',  ts: tsFromNow(2738), ip: '192.168.2.33',  type: 'denied' },
  { id: 11, user: 'Ana L.',        avatar: 'A', role: 'Servicios Públicos',    action: 'Editó trámite',         module: 'Servicios',  target: 'Trámite #TRM-2026-0088',            ts: tsFromNow(2870), ip: '192.168.1.88',  type: 'write'  },
  { id: 12, user: 'Roberto S.',    avatar: 'R', role: 'Dir. Bienestar Social', action: 'Eliminó registro',      module: 'Bienestar',  target: 'Padrón beneficiarios — 3 entradas', ts: tsFromNow(2885), ip: '192.168.2.33',  type: 'delete' },
  { id: 13, user: 'Miguel A.',     avatar: 'M', role: 'Administrador',         action: 'Cambió permisos',       module: 'Sistema',    target: 'Usuario Roberto S. — rol modificado', ts: tsFromNow(2940), ip: '10.0.0.2',    type: 'write'  },
  { id: 14, user: 'Geraldine R.',  avatar: 'G', role: 'Tesorera Municipal',   action: 'Consultó expediente',   module: 'Tesorería',  target: 'Contribuyente RFC: JMHL890102',     ts: tsFromNow(3090), ip: '192.168.1.45',  type: 'access' },
  { id: 15, user: 'Carlos M.',     avatar: 'C', role: 'Dir. Obras Públicas',   action: 'Cerró licitación',      module: 'Obras',      target: 'LC-2026-12 — monto $2.8M',          ts: tsFromNow(3240), ip: '192.168.1.12',  type: 'write'  },
];

const TYPE_META: Record<ActionType, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  access: { label: 'Consulta',  color: 'text-blue-400',   bg: 'bg-blue-500/10',   icon: Eye      },
  write:  { label: 'Escritura', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: Edit3   },
  export: { label: 'Exportación', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Download },
  delete: { label: 'Eliminación', color: 'text-rose-400',  bg: 'bg-rose-500/10',   icon: Trash2  },
  denied: { label: 'Denegado',  color: 'text-amber-400',  bg: 'bg-amber-500/10',  icon: AlertTriangle },
  system: { label: 'Sistema',   color: 'text-slate-400',  bg: 'bg-slate-500/10',  icon: Settings },
};

const AVATAR_COLORS: Record<string, string> = {
  G: 'bg-rose-500',
  C: 'bg-amber-500',
  M: 'bg-blue-600',
  A: 'bg-emerald-500',
  R: 'bg-purple-500',
  S: 'bg-slate-600',
};

const ALERT_TYPES: ActionType[] = ['delete', 'denied'];

export function AuditoriaView() {
  const [filterType, setFilterType] = useState<ActionType | 'all'>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  const users = Array.from(new Set(AUDIT_ENTRIES.map(e => e.user)));
  const alerts = AUDIT_ENTRIES.filter(e => ALERT_TYPES.includes(e.type));

  const filtered = AUDIT_ENTRIES.filter(e => {
    if (filterType !== 'all' && e.type !== filterType) return false;
    if (filterUser !== 'all' && e.user !== filterUser) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Auditoría de Acciones</h3>
        <p className="text-slate-400 text-sm mt-1">
          Registro inmutable de cada acción realizada en el sistema. Visible para la autoridad en todo momento.
        </p>
      </div>

      {/* Alert strip */}
      {alerts.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-300">
              {alerts.length} evento{alerts.length > 1 ? 's' : ''} que requiere{alerts.length === 1 ? '' : 'n'} atención
            </p>
            <p className="text-xs text-amber-500 mt-0.5">
              {alerts.filter(e => e.type === 'denied').length} acceso{alerts.filter(e => e.type === 'denied').length !== 1 ? 's' : ''} denegado{alerts.filter(e => e.type === 'denied').length !== 1 ? 's' : ''} ·{' '}
              {alerts.filter(e => e.type === 'delete').length} eliminación{alerts.filter(e => e.type === 'delete').length !== 1 ? 'es' : ''} registrada{alerts.filter(e => e.type === 'delete').length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-slate-500" />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value as ActionType | 'all')}
          className="bg-[#161920] border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="all">Todos los tipos</option>
          {(Object.keys(TYPE_META) as ActionType[]).map(t => (
            <option key={t} value={t}>{TYPE_META[t].label}</option>
          ))}
        </select>
        <select
          value={filterUser}
          onChange={e => setFilterUser(e.target.value)}
          className="bg-[#161920] border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="all">Todos los usuarios</option>
          {users.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <span className="text-xs text-slate-600 ml-auto">{filtered.length} registro{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Log */}
      <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 text-[10px] font-bold uppercase tracking-wider text-slate-600 px-5 py-3 border-b border-slate-800">
          <span className="w-32">Usuario</span>
          <span className="pl-4">Acción · Objetivo</span>
          <span className="w-20 text-center">Módulo</span>
          <span className="w-20 text-center">Tipo</span>
          <span className="w-32 text-right">Fecha / IP</span>
        </div>

        <div className="divide-y divide-slate-800/50">
          {filtered.map(entry => {
            const meta = TYPE_META[entry.type];
            const Icon = meta.icon;
            const isAlert = ALERT_TYPES.includes(entry.type);
            return (
              <div
                key={entry.id}
                className={cn(
                  'grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 items-center px-5 py-3.5 hover:bg-slate-800/30 transition-colors',
                  isAlert && 'bg-amber-500/5'
                )}
              >
                {/* Avatar + User */}
                <div className="flex items-center gap-2.5 w-32">
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0', AVATAR_COLORS[entry.avatar] || 'bg-slate-600')}>
                    {entry.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-none">{entry.user}</p>
                    <p className="text-[9px] text-slate-600 mt-0.5">{entry.role}</p>
                  </div>
                </div>

                {/* Action + Target */}
                <div className="pl-4">
                  <p className="text-xs font-semibold text-slate-200">{entry.action}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[280px]">{entry.target}</p>
                </div>

                {/* Module */}
                <div className="w-20 text-center">
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{entry.module}</span>
                </div>

                {/* Type badge */}
                <div className="w-20 flex justify-center">
                  <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold', meta.bg, meta.color)}>
                    <Icon className="w-2.5 h-2.5" />
                    {meta.label}
                  </span>
                </div>

                {/* Timestamp + IP */}
                <div className="w-32 text-right">
                  <p className="text-[10px] font-mono text-slate-400">{entry.ts.split(' ')[1]}</p>
                  <p className="text-[9px] text-slate-600 mt-0.5">{entry.ts.split(' ')[0]}</p>
                  <p className="text-[9px] font-mono text-slate-700 mt-0.5">{entry.ip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-slate-700 text-center font-mono">
        Registro sellado criptográficamente · Inmutable · Exportable a PDF para auditoría de SFP
      </p>
    </div>
  );
}
