// Panel de Cumplimiento LNETB — Arts. 12, 13, 14-15, 51-54, 74, 91
// Ley Nacional para Eliminar Trámites Burocráticos (DOF 16-VII-2025)
// Instrumento de la Autoridad Municipal de Simplificación y Digitalización

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Clock, XCircle, ChevronDown, ChevronUp, ShieldCheck, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

type EstadoCumplimiento = 'CUMPLIDO' | 'EN_PROCESO' | 'RIESGO' | 'INCUMPLIDO';

interface ObligacionLNETB {
  articulo: string;
  titulo: string;
  descripcion: string;
  plazo: string;
  estado: EstadoCumplimiento;
  moduloConnectX: string;
  evidencia: string;
  accionPendiente?: string;
}

const OBLIGACIONES: ObligacionLNETB[] = [
  {
    articulo: 'Art. 3, XXXIV',
    titulo: 'Municipio como Sujeto Obligado',
    descripcion: 'El H. Ayuntamiento de Tepic es Sujeto Obligado por la LNETB sin excepción.',
    plazo: 'Vigente desde DOF 16-VII-2025',
    estado: 'CUMPLIDO',
    moduloConnectX: 'Nayarit ID (transversal)',
    evidencia: 'ConnectX opera como infraestructura del Sujeto Obligado. Todos los módulos generan trazabilidad legal bajo nombre del Ayuntamiento.',
  },
  {
    articulo: 'Art. 12',
    titulo: 'Autoridad Municipal de Simplificación y Digitalización',
    descripcion: 'Designar una Autoridad con áreas de Simplificación, Digitalización y Atención Ciudadana.',
    plazo: 'Trans. XIV: venció enero 2026',
    estado: 'RIESGO',
    moduloConnectX: 'Gabinete en Tiempo Real + Panel LNETB',
    evidencia: 'ConnectX provee el panel técnico para la Autoridad. La designación formal es acto administrativo del Cabildo.',
    accionPendiente: 'Presentar acuerdo de Cabildo con designación del titular de la Autoridad Municipal de Simplificación.',
  },
  {
    articulo: 'Arts. 14–15',
    titulo: 'Enlace de Simplificación (nivel Director General)',
    descripcion: 'Designar Enlace con nivel mínimo de Director General, responsable del inventario de trámites y métricas.',
    plazo: 'Trans. XV: venció febrero 2026',
    estado: 'RIESGO',
    moduloConnectX: 'Módulo Inventario de Trámites + Métricas LNETB',
    evidencia: 'ConnectX provee el Inventario de Trámites (Arts. 51-54) y las métricas de uso ciudadano para el Enlace. Designación pendiente.',
    accionPendiente: 'Designar formalmente al Enlace e integrarlo al panel de Métricas Integrales de ConnectX.',
  },
  {
    articulo: 'Art. 13, fracc. XIII–XVIII',
    titulo: 'Soluciones Tecnológicas y Ventanillas Digitales',
    descripcion: 'Desarrollar e implementar soluciones para digitalizar trámites, habilitar Ventanillas Digitales interinstitucionales y operar el Modelo Integral de Atención Ciudadana.',
    plazo: 'Vigente',
    estado: 'CUMPLIDO',
    moduloConnectX: 'Tesorería Digital · MostradorPro · Servicios Públicos · Asistente IA',
    evidencia: '12 tipos de pago en línea. Ventanilla Digital habilitada via CitizenApp. Atención 24/7 en español, Cora y Wixárika. 2,400 ciudadanos atendidos. $4.2M MXN procesados.',
  },
  {
    articulo: 'Arts. 51–54',
    titulo: 'Portal Ciudadano Único — Inventario de Trámites',
    descripcion: 'Todo trámite municipal debe inscribirse en el Portal Ciudadano Único. Ningún cobro fuera del Portal tiene validez legal.',
    plazo: 'Vigente',
    estado: 'EN_PROCESO',
    moduloConnectX: 'Inventario de Trámites ConnectX',
    evidencia: '9 de 12 trámites registrados en el módulo de Inventario (75%). 3 trámites en proceso de registro.',
    accionPendiente: 'Completar registro de Registro Civil (actas) en el Portal Ciudadano Único gob.mx/tramites.',
  },
  {
    articulo: 'Art. 74',
    titulo: 'Integración Llave MX — Inicio de Sesión Único Nacional',
    descripcion: 'Toda plataforma digital habilitada por el Municipio debe integrar "Llave MX". Operar sin esta integración constituye irregularidad normativa activa.',
    plazo: 'Vigente — irregularidad activa sin ConnectX',
    estado: 'EN_PROCESO',
    moduloConnectX: 'Módulo Llave MX (integración lista para activar)',
    evidencia: 'ConnectX tiene implementado el servicio OAuth PKCE para Llave MX (llaveMXService.ts). Pendiente: registro del CLIENT_ID ante la CEDN (Autoridad Nacional).',
    accionPendiente: 'Registrar la plataforma ante la CEDN para obtener CLIENT_ID de Llave MX. Proceso: 3-5 días hábiles.',
  },
  {
    articulo: 'Art. 91 + Trans. XVI',
    titulo: 'Reporte de Código Fuente al Repositorio Nacional',
    descripcion: 'El municipio debe reportar a la Autoridad Nacional el código fuente de toda solución tecnológica. Las licencias cerradas impiden este cumplimiento.',
    plazo: 'Trans. XVI: venció febrero 2026',
    estado: 'CUMPLIDO',
    moduloConnectX: 'Soberanía del Código — Repositorio ConnectX',
    evidencia: 'ConnectX entrega propiedad intelectual 100% al municipio. El código reside en repositorio controlado por el Ayuntamiento (GitHub/Repositorio Nacional). Sin vendor lock-in. El municipio puede reportarlo a la Autoridad Nacional en cualquier momento.',
  },
];

const ESTADO_CONFIG: Record<EstadoCumplimiento, {
  label: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
}> = {
  CUMPLIDO: {
    label: 'Cumplido',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
    icon: <CheckCircle2 size={16} />,
  },
  EN_PROCESO: {
    label: 'En proceso',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/20',
    icon: <Clock size={16} />,
  },
  RIESGO: {
    label: 'Acción urgente',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10 border-orange-400/20',
    icon: <AlertTriangle size={16} />,
  },
  INCUMPLIDO: {
    label: 'Incumplido',
    color: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/20',
    icon: <XCircle size={16} />,
  },
};

export function LNETBComplianceView() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const cumplidos = OBLIGACIONES.filter(o => o.estado === 'CUMPLIDO').length;
  const enProceso = OBLIGACIONES.filter(o => o.estado === 'EN_PROCESO').length;
  const riesgo = OBLIGACIONES.filter(o => o.estado === 'RIESGO').length;
  const pct = Math.round(((cumplidos + enProceso * 0.5) / OBLIGACIONES.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
            Cumplimiento LNETB
          </h3>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">
            Ley Nacional para Eliminar Trámites Burocráticos · DOF 16-VII-2025
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 px-4 py-2 rounded-2xl">
          <ShieldCheck size={18} className="text-emerald-400" />
          <span className="text-2xl font-black text-emerald-400">{pct}%</span>
        </div>
      </div>

      {/* Summary bar */}
      <div className="bg-[#161920] border border-slate-700 rounded-2xl p-5 space-y-4">
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
          <div
            className="h-full bg-emerald-500 rounded-l-full transition-all"
            style={{ width: `${(cumplidos / OBLIGACIONES.length) * 100}%` }}
          />
          <div
            className="h-full bg-amber-400 transition-all"
            style={{ width: `${(enProceso / OBLIGACIONES.length) * 100}%` }}
          />
          <div
            className="h-full bg-orange-400 rounded-r-full transition-all"
            style={{ width: `${(riesgo / OBLIGACIONES.length) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Cumplidos', value: cumplidos, color: 'text-emerald-400' },
            { label: 'En proceso', value: enProceso, color: 'text-amber-400' },
            { label: 'Acción urgente', value: riesgo, color: 'text-orange-400' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={cn('text-xl font-black', s.color)}>{s.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal context */}
      <div className="bg-[#0f1115] border border-amber-400/20 rounded-2xl p-4">
        <p className="text-xs text-amber-300 leading-relaxed">
          <span className="font-black uppercase tracking-widest">Plazos fatales vencidos: </span>
          Trans. XIV (Autoridad de Simplificación) — venció enero 2026.
          Trans. XV (Enlace de Simplificación) — venció febrero 2026.
          Trans. XVI (Reporte de código fuente) — venció febrero 2026.
          ConnectX resuelve los tres mediante actos técnicos y administrativos combinados.
        </p>
      </div>

      {/* Obligations list */}
      <div className="space-y-3">
        {OBLIGACIONES.map(ob => {
          const estado = ESTADO_CONFIG[ob.estado];
          const isExpanded = expanded === ob.articulo;
          return (
            <div
              key={ob.articulo}
              className={cn(
                'bg-[#161920] border rounded-2xl overflow-hidden cursor-pointer transition-colors',
                isExpanded ? 'border-slate-600' : 'border-slate-700/50 hover:border-slate-600'
              )}
              onClick={() => setExpanded(isExpanded ? null : ob.articulo)}
            >
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn(
                    'shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border',
                    estado.bg, estado.color
                  )}>
                    {estado.icon}
                    <span className="hidden sm:inline">{estado.label}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-200">{ob.titulo}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{ob.articulo}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-slate-500 shrink-0" />
                )}
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-4 space-y-4">
                  <p className="text-sm text-slate-400 leading-relaxed">{ob.descripcion}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Módulo ConnectX</p>
                      <p className="text-xs text-slate-300 font-medium">{ob.moduloConnectX}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Plazo legal</p>
                      <p className="text-xs text-slate-300 font-medium">{ob.plazo}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-3">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1 font-black">Evidencia de cumplimiento</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{ob.evidencia}</p>
                  </div>

                  {ob.accionPendiente && (
                    <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-3">
                      <p className="text-[10px] text-amber-400 uppercase tracking-widest mb-1 font-black">Acción pendiente</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{ob.accionPendiente}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest">
          Fuente: LNETB DOF 16-VII-2025 · Actualización: junio 2026
        </p>
        <a
          href="https://www.dof.gob.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 uppercase tracking-widest"
        >
          Ver DOF <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
