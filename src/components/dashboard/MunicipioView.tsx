import React from 'react';
import {
  Landmark, Megaphone, Coins, Shield, ScrollText,
  Wrench, HardHat, Map, FileSearch, Briefcase,
  HeartHandshake, Stethoscope, GraduationCap,
  TreePine, Leaf, Globe, Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';

type DepStatus = 'activo' | 'proximo';

interface Dep {
  nombre: string;
  funcion: string;
  modulo: string;
  status: DepStatus;
  icon: React.ElementType;
  iconColor: string;
  borderColor: string;
}

interface Nivel {
  num: string;
  titulo: string;
  subtitulo: string;
  badgeColor: string;
  deps: Dep[];
}

const NIVELES: Nivel[] = [
  {
    num: '01',
    titulo: 'Presidencia y Comunicación',
    subtitulo: 'El centro de mando del municipio',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    deps: [
      {
        nombre: 'Presidencia Municipal',
        funcion: 'Conducción del gobierno, agenda ejecutiva y toma de decisiones estratégicas en tiempo real',
        modulo: 'Gabinete en Tiempo Real',
        status: 'activo',
        icon: Landmark,
        iconColor: 'text-blue-400',
        borderColor: 'border-blue-500/20',
      },
      {
        nombre: 'Comunicación Social',
        funcion: 'Difusión institucional, relación con medios, redes sociales y gestión de opinión pública',
        modulo: 'Observatorio Digital',
        status: 'activo',
        icon: Megaphone,
        iconColor: 'text-blue-300',
        borderColor: 'border-blue-500/20',
      },
    ],
  },
  {
    num: '02',
    titulo: 'Finanzas y Legalidad',
    subtitulo: 'Recaudación, contratos y transparencia activa',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    deps: [
      {
        nombre: 'Tesorería Municipal',
        funcion: 'Recaudación de predial, pago de agua, finanzas públicas y facturación electrónica',
        modulo: 'Tesorería Digital',
        status: 'activo',
        icon: Coins,
        iconColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/20',
      },
      {
        nombre: 'Contraloría Municipal',
        funcion: 'Fiscalización de contratos, auditorías internas y prevención activa de corrupción',
        modulo: 'Auditoría de Acciones',
        status: 'activo',
        icon: Shield,
        iconColor: 'text-emerald-300',
        borderColor: 'border-emerald-500/20',
      },
      {
        nombre: 'Secretaría del Ayuntamiento',
        funcion: 'Actas de cabildo, convocatorias, firma de acuerdos y gestión jurídica municipal',
        modulo: 'Parlamento Municipal',
        status: 'activo',
        icon: ScrollText,
        iconColor: 'text-emerald-500',
        borderColor: 'border-emerald-500/20',
      },
    ],
  },
  {
    num: '03',
    titulo: 'Servicios al Ciudadano',
    subtitulo: 'Lo que la gente ve y vive cada día',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    deps: [
      {
        nombre: 'Seguridad Pública y Vialidad',
        funcion: 'Policía municipal, tráfico, videovigilancia, C5 y canal de denuncia ciudadana',
        modulo: 'C5 Hub · Seguridad',
        status: 'activo',
        icon: Shield,
        iconColor: 'text-amber-400',
        borderColor: 'border-amber-500/20',
      },
      {
        nombre: 'Servicios Públicos Municipales',
        funcion: 'Alumbrado, recolección de basura, pipas, baches y mantenimiento de espacios públicos',
        modulo: 'Servicios Públicos',
        status: 'activo',
        icon: Wrench,
        iconColor: 'text-amber-300',
        borderColor: 'border-amber-500/20',
      },
      {
        nombre: 'Obras Públicas',
        funcion: 'Construcción de infraestructura, seguimiento de contratos y rendición de cuentas de obra',
        modulo: 'Trazabilidad Obras',
        status: 'activo',
        icon: HardHat,
        iconColor: 'text-amber-500',
        borderColor: 'border-amber-500/20',
      },
    ],
  },
  {
    num: '04',
    titulo: 'Desarrollo Urbano y Económico',
    subtitulo: 'El plano de la ciudad del futuro',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    deps: [
      {
        nombre: 'Ordenamiento Territorial · IMPLAN',
        funcion: 'Planeación urbana, usos de suelo, Plan de Desarrollo Municipal 2040 y crecimiento ordenado',
        modulo: 'TepicVisión Urbana',
        status: 'proximo',
        icon: Map,
        iconColor: 'text-indigo-400',
        borderColor: 'border-indigo-500/20',
      },
      {
        nombre: 'Catastro Municipal',
        funcion: 'Registro de predios, actualización de valores catastrales y detección de cambios de uso de suelo',
        modulo: 'CatastroVisión',
        status: 'proximo',
        icon: FileSearch,
        iconColor: 'text-indigo-300',
        borderColor: 'border-indigo-500/20',
      },
      {
        nombre: 'Desarrollo Económico',
        funcion: 'Licencias de negocio, atracción de inversión, empleo y ventanilla única empresarial digital',
        modulo: 'Economía Digital',
        status: 'proximo',
        icon: Briefcase,
        iconColor: 'text-indigo-500',
        borderColor: 'border-indigo-500/20',
      },
    ],
  },
  {
    num: '05',
    titulo: 'Personas y Comunidad',
    subtitulo: 'Salud, educación y bienestar para la gente',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    deps: [
      {
        nombre: 'Bienestar Social',
        funcion: 'Programas de apoyo, adultos mayores, personas con discapacidad y grupos en situación de vulnerabilidad',
        modulo: 'Bienestar Social',
        status: 'activo',
        icon: HeartHandshake,
        iconColor: 'text-rose-400',
        borderColor: 'border-rose-500/20',
      },
      {
        nombre: 'Salud Municipal',
        funcion: 'Clínicas comunitarias, brigadas de salud y servicios de primer nivel de atención médica',
        modulo: 'Salud Inteligente',
        status: 'activo',
        icon: Stethoscope,
        iconColor: 'text-rose-300',
        borderColor: 'border-rose-500/20',
      },
      {
        nombre: 'Educación y Cultura',
        funcion: 'Becas municipales, bibliotecas, centros culturales e infraestructura educativa local',
        modulo: 'Educación Inteligente',
        status: 'proximo',
        icon: GraduationCap,
        iconColor: 'text-rose-500',
        borderColor: 'border-rose-500/20',
      },
    ],
  },
  {
    num: '06',
    titulo: 'Territorio y Patrimonio',
    subtitulo: 'El campo, el ambiente y los pueblos originarios',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    deps: [
      {
        nombre: 'Medio Ambiente y Sustentabilidad',
        funcion: 'Bosques urbanos, residuos sólidos, calidad del aire, agua y áreas naturales protegidas',
        modulo: 'Agrovisión 3D',
        status: 'activo',
        icon: TreePine,
        iconColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/20',
      },
      {
        nombre: 'Pueblos Indígenas y Cultura',
        funcion: 'Comunidades originarias, lenguas vivas, artesanía wixárika y patrimonio cultural de Nayarit',
        modulo: 'Nayarit Originario',
        status: 'activo',
        icon: Leaf,
        iconColor: 'text-emerald-300',
        borderColor: 'border-emerald-500/20',
      },
    ],
  },
];

function StatusBadge({ status }: { status: DepStatus }) {
  if (status === 'activo') {
    return (
      <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Activo</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
      <Clock className="w-2.5 h-2.5 text-amber-400" />
      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">Próximo</span>
    </div>
  );
}

export function MunicipioView() {
  const total = NIVELES.reduce((acc, n) => acc + n.deps.length, 0);
  const activos = NIVELES.reduce((acc, n) => acc + n.deps.filter(d => d.status === 'activo').length, 0);
  const proximos = total - activos;
  const pct = Math.round((activos / total) * 100);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">
          Ecosistema Municipal · H. Ayuntamiento de Tepic, Nayarit
        </p>
        <h3 className="text-4xl font-serif font-black text-white tracking-tighter">
          Sistema Operativo del Municipio
        </h3>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          Mapa completo de las {total} dependencias municipales de Tepic y el módulo de Nayarit Digital
          que digitaliza cada una. El primer municipio en México con cobertura digital integral en
          una sola plataforma.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#161920] border border-slate-800 p-4 rounded-xl">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Dependencias</p>
          <p className="text-3xl font-serif font-black text-white">{total}</p>
          <p className="text-xs text-slate-600 mt-0.5">del H. Ayuntamiento</p>
        </div>
        <div className="bg-[#161920] border border-emerald-500/20 p-4 rounded-xl">
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-1">Módulos activos</p>
          <p className="text-3xl font-serif font-black text-emerald-400">{activos}</p>
          <p className="text-xs text-slate-600 mt-0.5">{pct}% de cobertura</p>
        </div>
        <div className="bg-[#161920] border border-amber-500/20 p-4 rounded-xl">
          <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-1">Próximamente</p>
          <p className="text-3xl font-serif font-black text-amber-400">{proximos}</p>
          <p className="text-xs text-slate-600 mt-0.5">en hoja de ruta</p>
        </div>
        <div className="bg-[#161920] border border-blue-500/20 p-4 rounded-xl">
          <p className="text-[10px] text-blue-500 uppercase tracking-widest mb-1">Niveles</p>
          <p className="text-3xl font-serif font-black text-blue-400">6</p>
          <p className="text-xs text-slate-600 mt-0.5">estratégicos de gobierno</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-[#161920] border border-slate-800 p-5 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-slate-400">Progreso de digitalización municipal</p>
          <p className="text-xs font-black text-emerald-400">{activos} / {total} dependencias</p>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-slate-600">Reglamento de Administración Pública Municipal · Dic. 2024</p>
          <p className="text-[10px] text-slate-500">Meta 2027: 100%</p>
        </div>
      </div>

      {/* Niveles */}
      <div className="space-y-10">
        {NIVELES.map((nivel) => (
          <div key={nivel.num} className="space-y-4">

            {/* Section header */}
            <div className="flex items-center gap-3">
              <span className={cn('text-xs font-black px-2.5 py-1 rounded-md border tracking-widest', nivel.badgeColor)}>
                {nivel.num}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">{nivel.titulo}</h4>
                <p className="text-xs text-slate-500">{nivel.subtitulo}</p>
              </div>
              <div className="flex-1 h-px bg-slate-800 ml-2" />
              <span className="text-[10px] text-slate-600 font-mono">
                {nivel.deps.filter(d => d.status === 'activo').length}/{nivel.deps.length} activos
              </span>
            </div>

            {/* Cards */}
            <div className={cn(
              'grid gap-4',
              nivel.deps.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
            )}>
              {nivel.deps.map((dep) => (
                <div
                  key={dep.nombre}
                  className={cn(
                    'bg-[#161920] border p-5 rounded-xl transition-all hover:bg-[#1c2030] group cursor-default',
                    dep.borderColor
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn('p-2 rounded-lg bg-slate-800/60 group-hover:bg-slate-800')}>
                      <dep.icon className={cn('w-4 h-4', dep.iconColor)} />
                    </div>
                    <StatusBadge status={dep.status} />
                  </div>

                  <h5 className="text-sm font-bold text-white mb-1.5 leading-tight">{dep.nombre}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{dep.funcion}</p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5">
                    <span className="text-[9px] text-slate-600 uppercase tracking-widest">Módulo</span>
                    <span className={cn('text-[10px] font-bold', dep.iconColor)}>{dep.modulo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5 flex items-start gap-3">
        <Globe className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-semibold">El primer municipio con sistema operativo digital completo</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ningún municipio en México tiene este nivel de cobertura digital integrada en una sola plataforma.
            Tepic puede ser el primero — con tecnología ya construida, datos abiertos de INEGI y SEDATU,
            e infraestructura federal instalada (Ciudad de las Artes Indígenas).
            <span className="text-blue-400 font-medium"> Eso es el Océano Azul.</span>
          </p>
          <p className="text-[10px] text-slate-600 mt-2">
            Fuente: Reglamento de Administración Pública Municipal de Tepic, Gaceta Extraordinaria No. 4, diciembre 2024.
          </p>
        </div>
      </div>

    </div>
  );
}
