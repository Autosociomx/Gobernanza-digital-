import React, { useState } from 'react';
import {
  Globe, Mic, BookOpen, Heart, Users, GraduationCap,
  ShoppingBag, Video, Star, ArrowRight, Package,
  Wifi, Download, Calendar, TrendingUp, Leaf, CheckCircle2,
  MapPin, Building2, Flame
} from 'lucide-react';
import { cn } from '../../lib/utils';

type PatrimonioTab = 'zitacua' | 'lenguas' | 'programas' | 'mercado';

/* ─────────────────────────────── DATA ─────────────────────────────── */

const LENGUAS = [
  {
    nombre: 'Wixárika', alias: 'Huichol',
    hablantes: 45_000, municipios: ['La Yesca', 'Mezquitic', 'Bolaños'],
    pct: 38,
    recursos: { audio: 142, vocabulario: 2840, frases: 680, lecciones: 12 },
    textColor: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', bar: 'bg-rose-500',
  },
  {
    nombre: 'Náayeri', alias: 'Cora',
    hablantes: 18_000, municipios: ['El Nayar', 'Rosamorada'],
    pct: 22,
    recursos: { audio: 78, vocabulario: 1240, frases: 290, lecciones: 5 },
    textColor: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', bar: 'bg-blue-500',
  },
  {
    nombre: 'Tepehuán del Sur', alias: "O'dam",
    hablantes: 9_000, municipios: ['El Nayar', 'Huajicori'],
    pct: 14,
    recursos: { audio: 31, vocabulario: 520, frases: 110, lecciones: 2 },
    textColor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', bar: 'bg-emerald-500',
  },
];

const PROGRAMAS = [
  { id: 1, nombre: 'Alfabetización Digital Wixárika',   cat: 'Educación',       bene: 320,  estado: 'activo',     icon: GraduationCap, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { id: 2, nombre: 'Certificación de Artesanas',        cat: 'Economía',        bene: 147,  estado: 'activo',     icon: Star,          color: 'text-amber-400',  bg: 'bg-amber-500/10'  },
  { id: 3, nombre: 'Telesalud Comunitaria',             cat: 'Salud',           bene: 1240, estado: 'activo',     icon: Heart,         color: 'text-rose-400',   bg: 'bg-rose-500/10'   },
  { id: 4, nombre: 'Registro de Patrimonio Cultural',   cat: 'Cultura',         bene: 89,   estado: 'activo',     icon: Globe,         color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  { id: 5, nombre: 'Capacitación en Comercio Digital',  cat: 'Economía',        bene: 210,  estado: 'en proceso', icon: ShoppingBag,   color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 6, nombre: 'Conectividad Rural Nayarit',        cat: 'Infraestructura', bene: 3800, estado: 'planeación', icon: Wifi,          color: 'text-cyan-400',   bg: 'bg-cyan-500/10'   },
];

const ARTESANOS = [
  { id: 1, nombre: 'María de los Ángeles H.', comunidad: 'La Zitacua, Tepic', esp: 'Nierika · arte de estambre',  productos: 12, ventas: 48,  av: 'M', color: 'bg-rose-500'   },
  { id: 2, nombre: 'José Ramón B.',           comunidad: 'La Zitacua, Tepic', esp: 'Chaquira y joyería',           productos: 8,  ventas: 31,  av: 'J', color: 'bg-amber-500'  },
  { id: 3, nombre: 'Lucía Carrillo T.',        comunidad: 'El Nayar, Nayarit', esp: 'Textiles y bordados',          productos: 15, ventas: 67,  av: 'L', color: 'bg-purple-500' },
  { id: 4, nombre: 'Cooperativa Wixárika',    comunidad: 'La Zitacua, Tepic', esp: 'Arte colectivo certificado',   productos: 34, ventas: 152, av: 'C', color: 'bg-blue-600'   },
];

const WEBINARS = [
  { titulo: 'Arte Wixárika desde La Zitacua para todo México', fecha: '15 Jul 2026', hora: '17:00', inscritos: 89 },
  { titulo: 'Cómo vender artesanía nayarita en línea',          fecha: '22 Jul 2026', hora: '18:00', inscritos: 54 },
  { titulo: 'Fotografía de producto para artesanas',            fecha: '29 Jul 2026', hora: '16:00', inscritos: 41 },
];

const PRODUCTOS_DIGITALES = [
  { titulo: 'Patrón Nierika — flor de peyote',  tipo: 'PDF descargable',  precio: '$120', descargas: 34, icon: Download },
  { titulo: 'Licencia diseño wixárika vol. 1',  tipo: 'Pack de imágenes', precio: '$280', descargas: 18, icon: Package  },
  { titulo: 'Tutorial: tejido de chaquira',      tipo: 'Video HD',         precio: '$90',  descargas: 61, icon: Video   },
  { titulo: 'Colección de iconos originarios',   tipo: 'SVG / PNG',        precio: '$150', descargas: 27, icon: Star    },
];

/* ──────────────────────────── ZITACUA TAB ─────────────────────────── */

function ZitacuaTab() {
  return (
    <div className="space-y-5">

      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-amber-950/60 to-[#161920] border border-amber-600/30 rounded-2xl p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Piloto activo · Fase 1 iniciando</span>
          </div>
          <h4 className="text-3xl font-serif font-black text-white mb-0.5">La Zitacua</h4>
          <p className="text-amber-400/90 text-sm font-bold mb-3 italic">"El lugar donde crece el maíz" · Tepic, Nayarit</p>
          <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
            En 1987, cinco Marakames (líderes espirituales wixáritari) tuvieron un sueño colectivo que los
            llamó a fundar una colonia indígena en el Cerro de los Metates, dentro de la ciudad de Tepic.
            El 19 de octubre de ese año, el gobierno les concedió 121 lotes. Hoy, 1,200 personas de cuatro
            pueblos originarios preservan su lengua, su arte y su cosmovisión a 5 minutos del centro.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { val: '1,200', label: 'Habitantes',         color: 'text-amber-400'   },
          { val: '121',   label: 'Lotes originales',   color: 'text-blue-400'    },
          { val: '1987',  label: 'Año de fundación',   color: 'text-purple-400'  },
          { val: '4',     label: 'Pueblos presentes',  color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#161920] border border-slate-800 rounded-xl p-4 text-center">
            <p className={cn('text-2xl font-serif font-black', s.color)}>{s.val}</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Composición + Ventaja */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Composición */}
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Composición de la comunidad</p>
          {[
            { pueblo: 'Wixárika (Huichol)',  pct: 80, n: 960, color: 'bg-rose-500',    text: 'text-rose-400'    },
            { pueblo: 'Náayeri (Cora)',       pct: 10, n: 120, color: 'bg-blue-500',    text: 'text-blue-400'    },
            { pueblo: 'Tepehuán del Sur',     pct: 5,  n: 60,  color: 'bg-emerald-500', text: 'text-emerald-400' },
            { pueblo: 'Mexicaneros',          pct: 5,  n: 60,  color: 'bg-slate-500',   text: 'text-slate-400'   },
          ].map(p => (
            <div key={p.pueblo} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-1">
                <span className={cn('text-xs font-bold', p.text)}>{p.pueblo}</span>
                <span className="text-[10px] text-slate-500">{p.pct}% · {p.n} personas</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full">
                <div className={cn('h-1.5 rounded-full transition-all', p.color)} style={{ width: `${p.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Ventaja estratégica */}
        <div className="bg-[#161920] border border-slate-800 rounded-xl p-5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Por qué Zitacua primero</p>
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: '5 minutos del centro de Tepic',
                desc: 'Comunidad urbana — acceso inmediato, sin logística de sierra ni traslados largos.',
                color: 'text-amber-400', bg: 'bg-amber-500/10',
              },
              {
                icon: Building2,
                title: 'Ciudad de las Artes Indígenas',
                desc: '$498M de inversión federal, inaugurada ago 2024. La infraestructura física ya existe — Nayarit Digital es su capa digital.',
                color: 'text-blue-400', bg: 'bg-blue-500/10',
              },
              {
                icon: Star,
                title: 'Destino turístico ya reconocido',
                desc: 'Ya recibe visitantes locales e internacionales. La plataforma potencia lo que ya funciona.',
                color: 'text-emerald-400', bg: 'bg-emerald-500/10',
              },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', a.bg)}>
                    <Icon className={cn('w-4 h-4', a.color)} />
                  </div>
                  <div>
                    <p className={cn('text-xs font-black', a.color)}>{a.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plan de implementación */}
      <div className="bg-[#161920] border border-slate-800 rounded-xl p-5">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5">Plan de implementación</p>
        <div className="space-y-1">
          {[
            {
              fase: '01', label: 'Confianza comunitaria',
              tiempo: 'Semanas 1–4', status: 'activa',
              desc: 'Reunión con los Marakames — ellos son la autoridad real. Grabación de 200 palabras en Wixárika como primer entregable. Sin tablets ni presentaciones: solo escucha activa.',
            },
            {
              fase: '02', label: 'Identidad digital individual',
              tiempo: 'Mes 2–3', status: 'próxima',
              desc: '30 artesanos con perfil digital activo. QR físico impreso para cada puesto de la Ciudad de las Artes. Catálogo WhatsApp operativo. Meta: primeras 10 ventas digitales.',
            },
            {
              fase: '03', label: 'Mercado + Ciudad de las Artes',
              tiempo: 'Mes 3–6', status: 'planeada',
              desc: 'Pantallas con QR dentro de la Ciudad de las Artes que conectan al Mercado Originario. Webinar mensual transmitido en vivo desde ahí. 100% del ingreso va al artesano.',
            },
            {
              fase: '04', label: 'Escala a la Sierra de Nayarit',
              tiempo: 'Mes 6–12', status: 'planeada',
              desc: 'Con el caso Zitacua documentado, replicar en las 8 comunidades wixárikas de la sierra. Presentar ante gobierno estatal como evidencia de impacto y modelo a escalar.',
            },
          ].map((f, idx, arr) => {
            const statusColor =
              f.status === 'activa'   ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
              f.status === 'próxima'  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                                        'text-slate-500 bg-slate-700/30 border-slate-600/30';
            return (
              <div key={f.fase} className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0 w-8">
                  <span className="text-blue-500 font-black text-xs">{f.fase}</span>
                  {idx < arr.length - 1 && <div className="w-px flex-1 bg-slate-800 my-1 min-h-[32px]" />}
                </div>
                <div className="flex-1 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-black text-white">{f.label}</p>
                    <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full border', statusColor)}>
                      {f.status}
                    </span>
                    <span className="text-[9px] text-slate-600 font-mono">{f.tiempo}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Los Marakames */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
        <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-black text-amber-300">Nota clave: los Marakames son la autoridad</p>
          <p className="text-xs text-amber-600/80 mt-1 leading-relaxed">
            En la cosmovisión wixárika, los Marakames (cantadores y curanderos espirituales) tienen
            mayor peso que cualquier representante civil. La primera reunión debe ser con ellos,
            no con la mesa directiva de la colonia. Su aval es la puerta de entrada real.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20">
          Unirse al piloto — La Zitacua <ArrowRight className="w-4 h-4" />
        </button>
        <button className="w-full py-4 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 rounded-xl font-black text-sm transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> Plan estratégico completo
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────── LENGUAS TAB ─────────────────────────── */

function LenguasTab() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
        <Globe className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-300">Misión: 100% de las lenguas originarias de Nayarit digitalizadas para 2028</p>
          <p className="text-xs text-blue-500 mt-0.5">Primer punto de captura: La Zitacua, Tepic — hablantes nativos a 5 minutos del centro.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LENGUAS.map(l => (
          <div key={l.nombre} className={cn('bg-[#161920] border rounded-xl p-5', l.border)}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className={cn('text-base font-black', l.textColor)}>{l.nombre}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{l.alias}</p>
              </div>
              <span className={cn('text-xs font-black px-2 py-1 rounded-full', l.bg, l.textColor)}>
                {l.pct}% digital
              </span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full mb-4">
              <div className={cn('h-1.5 rounded-full', l.bar)} style={{ width: `${l.pct}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Hablantes', val: l.hablantes.toLocaleString('es-MX') },
                { label: 'Audios',    val: l.recursos.audio.toString()          },
                { label: 'Palabras',  val: l.recursos.vocabulario.toLocaleString('es-MX') },
                { label: 'Lecciones', val: l.recursos.lecciones.toString()      },
              ].map(s => (
                <div key={s.label} className="bg-slate-800/50 rounded-lg p-2 text-center">
                  <p className="text-white text-sm font-black">{s.val}</p>
                  <p className="text-slate-500 text-[9px] uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {l.municipios.map(m => (
                <span key={m} className="text-[9px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{m}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button className={cn('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold border transition-colors hover:opacity-80', l.border, l.textColor)}>
                <Mic className="w-3 h-3" /> Escuchar
              </button>
              <button className={cn('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold border transition-colors hover:opacity-80', l.border, l.textColor)}>
                <BookOpen className="w-3 h-3" /> Aprender
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl p-5">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Proceso de digitalización</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { num: '01', label: 'Grabación con hablantes nativos en La Zitacua', icon: Mic          },
            { num: '02', label: 'Transcripción y validación con la comunidad',    icon: CheckCircle2 },
            { num: '03', label: 'Integración al motor de IA de voz',              icon: Globe        },
            { num: '04', label: 'Publicación en la plataforma',                   icon: Wifi         },
          ].map(s => (
            <div key={s.num} className="flex items-start gap-3">
              <span className="text-blue-600 font-black text-xs shrink-0 mt-0.5">{s.num}</span>
              <div className="flex items-start gap-2">
                <s.icon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-snug">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PROGRAMAS TAB ────────────────────────── */

function ProgramasTab() {
  const totalBeneficiarios = PROGRAMAS.reduce((s, p) => s + p.bene, 0);
  const activos = PROGRAMAS.filter(p => p.estado === 'activo').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Beneficiarios totales', val: totalBeneficiarios.toLocaleString('es-MX'), color: 'text-emerald-400' },
          { label: 'Programas activos',     val: activos.toString(),                         color: 'text-blue-400'    },
          { label: 'Municipios alcanzados', val: '8',                                        color: 'text-amber-400'   },
        ].map(k => (
          <div key={k.label} className="bg-[#161920] border border-slate-800 rounded-xl p-4 text-center">
            <p className={cn('text-3xl font-serif font-black', k.color)}>{k.val}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Programas activos y en desarrollo</p>
        </div>
        <div className="divide-y divide-slate-800/50">
          {PROGRAMAS.map(p => {
            const Icon = p.icon;
            const estadoColor =
              p.estado === 'activo'     ? 'text-emerald-400 bg-emerald-500/10' :
              p.estado === 'en proceso' ? 'text-amber-400 bg-amber-500/10' :
                                         'text-slate-400 bg-slate-500/10';
            return (
              <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', p.bg)}>
                  <Icon className={cn('w-5 h-5', p.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white leading-tight">{p.nombre}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{p.cat}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-white">{p.bene.toLocaleString('es-MX')}</p>
                  <p className="text-[9px] text-slate-600">beneficiarios</p>
                </div>
                <span className={cn('text-[9px] font-black px-2 py-1 rounded-full shrink-0', estadoColor)}>
                  {p.estado}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-dashed border-slate-700 rounded-xl p-5 text-center">
        <Leaf className="w-6 h-6 text-slate-600 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-500 mb-1">¿Tienes una propuesta de programa comunitario?</p>
        <p className="text-xs text-slate-600 mb-3">Cualquier comunidad puede proponer nuevos programas a través del módulo de participación ciudadana.</p>
        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 mx-auto">
          Enviar propuesta <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────── MERCADO TAB ─────────────────────────── */

function MercadoTab() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
        <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-300">Mercado Originario Digital — Piloto: La Zitacua, Tepic</p>
          <p className="text-xs text-amber-600 mt-0.5">Artesanas y artesanos vendiendo al mundo desde su comunidad. Sin intermediarios. 100% del precio va al artesano.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { num: '01', titulo: 'El artesano publica',    desc: 'Sube fotos y precio desde su celular, en español, wixárika o náayeri.',   icon: Package,    color: 'text-amber-400'   },
          { num: '02', titulo: 'El cliente compra',       desc: 'Pago en línea o en OXXO. El artesano recibe el dinero directo a su cuenta.', icon: ShoppingBag, color: 'text-blue-400'  },
          { num: '03', titulo: 'El arte llega al mundo', desc: 'Guía de envío prepagada. Rastreo en tiempo real para ambas partes.',       icon: TrendingUp,  color: 'text-emerald-400' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.num} className="bg-[#161920] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-slate-600">{s.num}</span>
                <Icon className={cn('w-4 h-4', s.color)} />
                <p className={cn('text-xs font-black', s.color)}>{s.titulo}</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Artesanos y cooperativas</p>
            <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">4 activos</span>
          </div>
          <div className="divide-y divide-slate-800/50">
            {ARTESANOS.map(a => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
                <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0', a.color)}>
                  {a.av}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-none">{a.nombre}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">{a.esp}</p>
                  <p className="text-[9px] text-slate-600 mt-0.5">{a.comunidad}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-white">{a.ventas} ventas</p>
                  <p className="text-[9px] text-slate-600">{a.productos} productos</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-800">
            <button className="w-full py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-2">
              Registrar artesano <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Productos digitales</p>
            <span className="text-[9px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full">PDF · Video · SVG</span>
          </div>
          <div className="divide-y divide-slate-800/50">
            {PRODUCTOS_DIGITALES.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white leading-tight truncate">{p.titulo}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{p.tipo}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-emerald-400">{p.precio}</p>
                    <p className="text-[9px] text-slate-600">{p.descargas} descargas</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-slate-800">
            <button className="w-full py-2.5 rounded-lg border border-purple-500/30 text-purple-400 text-xs font-bold hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2">
              Publicar producto digital <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#161920] border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-400" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Webinars programados</p>
          </div>
          <button className="text-[9px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            <Calendar className="w-3 h-3" /> Ver todos
          </button>
        </div>
        <div className="divide-y divide-slate-800/50">
          {WEBINARS.map((w, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white leading-tight">{w.titulo}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{w.fecha} · {w.hora} hrs · {w.inscritos} inscritos</p>
              </div>
              <button className="shrink-0 text-[10px] font-black text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-colors">
                Inscribirse
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── MAIN VIEW ───────────────────────────── */

const TABS: { id: PatrimonioTab; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: 'zitacua',   label: 'Piloto Zitacua',    icon: Flame,      badge: 'ACTIVO' },
  { id: 'lenguas',   label: 'Lenguas Vivas',      icon: Globe                       },
  { id: 'programas', label: 'Programas',           icon: Heart                       },
  { id: 'mercado',   label: 'Mercado Originario',  icon: ShoppingBag                 },
];

export function PatrimonioView() {
  const [tab, setTab] = useState<PatrimonioTab>('zitacua');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Nayarit Originario</h3>
        </div>
        <p className="text-slate-400 text-sm">
          Digitalización de lenguas, programas comunitarios y mercado digital para los pueblos originarios de Nayarit.
          Piloto activo: La Zitacua, Tepic.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
                active
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-slate-800 hover:border-slate-700'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
              {t.badge && (
                <span className="text-[8px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === 'zitacua'   && <ZitacuaTab   />}
      {tab === 'lenguas'   && <LenguasTab   />}
      {tab === 'programas' && <ProgramasTab />}
      {tab === 'mercado'   && <MercadoTab   />}
    </div>
  );
}
