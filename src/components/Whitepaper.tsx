import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  ArrowRight,
  Landmark,
  Scale,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Whitepaper() {
  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
        
        {/* Cover Page */}
        <header className="bg-slate-900 text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-magenta-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-magenta-400 mb-8">
              <FileText className="w-6 h-6" />
              <span className="text-sm font-black uppercase tracking-widest">Whitepaper Ejecutivo</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              TEPIC <span className="text-magenta-400">2026</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-serif italic">
              El Primer Municipio de Nayarit en Cumplimiento Total de la Ley de Gobierno Digital y Firma Electrónica
            </p>
            
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs uppercase tracking-widest font-bold text-slate-400">
              <div>
                <span className="block text-slate-500 text-[10px] mb-1">Tecnología</span>
                BrigadaMX / C5
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] mb-1">Clasificación</span>
                Uso Ejecutivo
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] mb-1">Emisión</span>
                Junio 2026
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-16">
          
          {/* Section 1 */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <Landmark className="w-6 h-6 text-magenta-500" />
              <h2 className="text-2xl font-black uppercase tracking-tight">1. Resumen Ejecutivo</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              El Estado de Nayarit cuenta con una <strong>Ley de Gobierno Digital y Firma Electrónica</strong> vigente que obliga a los 20 municipios a implementar identidad digital, interoperabilidad, mensajes de datos con validez jurídica y trazabilidad de operaciones. Sin embargo, <strong>ningún municipio del estado ha logrado un cumplimiento superior al 20%</strong> de estos mandatos.
            </p>
            <div className="bg-magenta-50 border-l-4 border-magenta-500 p-6 rounded-r-xl">
              <p className="text-xl font-serif font-medium text-slate-800 italic">
                Tepic tiene la oportunidad histórica de ser el primero.
              </p>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              BrigadaMX / Nayarit SO Digital no es una aplicación de campaña ni un portal web más. Es la <strong>infraestructura operativa completa</strong> que permite a un municipio pasar del incumplimiento normativo al <strong>cumplimiento total (100%)</strong> de la Ley de Gobierno Digital en los primeros <strong>100 días de administración</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <Scale className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-black uppercase tracking-tight">2. Brecha Legal vs. Realidad</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Lo que exige la ley</h3>
                <ul className="space-y-3">
                  {['Identidad Digital Ciudadana', 'Interoperabilidad', 'Firma Electrónica', 'Trazabilidad y evidencia', 'Notificaciones electrónicas'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-rose-900 mb-4">El Costo del Incumplimiento</h3>
                <ul className="space-y-3">
                  <li className="text-sm text-rose-700">❌ <strong>Sanciones administrativas</strong> del Órgano Garante.</li>
                  <li className="text-sm text-rose-700">❌ <strong>Pérdida de recursos</strong> federales.</li>
                  <li className="text-sm text-rose-700">❌ <strong>Desconfianza ciudadana</strong> y rezago.</li>
                  <li className="text-sm text-rose-700">❌ <strong>Auditorías vulnerables</strong>.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <Layers className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-black uppercase tracking-tight">3. Los 4 Pilares de Cumplimiento</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Identidad Digital Gubernamental', desc: 'Cada ciudadano atendido por brigada es dado de alta en Nayarit ID, con firma táctil.', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { title: 'Mensajes de Datos Jurídicos', desc: 'Cada reporte genera un Folio Criptográfico con valor de notificación oficial.', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                { title: 'Interoperabilidad Obligatoria', desc: 'El API Gateway conecta brigadas, tesorería y obras. Cero redundancia documental.', icon: Cpu, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                { title: 'Trazabilidad Fiduciaria', desc: 'Blockchain Municipal inmutable. Prueba pericial digital irrefutable para la ASF.', icon: Activity, color: 'text-magenta-500', bg: 'bg-magenta-50' },
              ].map((pilar, i) => (
                <div key={i} className={cn("p-6 rounded-2xl border border-slate-200", pilar.bg)}>
                  <div className="flex items-center gap-3 mb-3">
                    <pilar.icon className={cn("w-5 h-5", pilar.color)} />
                    <h3 className="font-bold text-slate-800">{pilar.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{pilar.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <section className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-4">El futuro digital se construye puerta por puerta.</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                La Ley no es una opción; es una obligación. BrigadaMX no es un gasto, es la póliza de seguro legal, operativo y político para garantizar Tepic 2026.
              </p>
              <div className="inline-flex items-center gap-2 text-magenta-400 font-bold uppercase tracking-widest text-sm bg-magenta-500/10 px-6 py-3 rounded-full">
                Siguiente Paso: Mesa Técnica de Instalación <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
