import React from 'react';
import { Target, Zap, Server, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function RoadmapArchitectureView() {
  const roadmap = [
    { name: 'Pagos Inteligentes (QR)', desc: 'Recaudación sin ventanilla', impact: 'Alto', viab: 'Alta' },
    { name: 'Devolución SAT', desc: 'Recuperación de saldos', impact: 'Alto', viab: 'Media' },
    { name: 'Licencias Digitales', desc: 'Validación en móvil', impact: 'Alto', viab: 'Alta' },
    { name: 'Actas Instantáneas', desc: 'PDF con validez QR', impact: 'Medio', viab: 'Alta' },
    { name: 'Reporte Incidencias', desc: 'Geolocalización real', impact: 'Medio', viab: 'Alta' },
  ];

  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-lg font-black text-[var(--tinta)] mb-6 uppercase tracking-tighter">Roadmap Estratégico (Priorizado)</h3>
        <div className="grid gap-4">
          {roadmap.map((f, i) => (
            <motion.div key={i} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl items-center shadow-sm">
                <div className="w-10 h-10 bg-[var(--magenta)]/10 text-[var(--magenta)] flex items-center justify-center rounded-lg font-black">{i+1}</div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm text-[var(--tinta)]">{f.name}</h4>
                    <p className="text-[10px] text-slate-500">{f.desc}</p>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-bold uppercase text-slate-400">Impacto: {f.impact}</p>
                    <p className="text-[8px] font-bold uppercase text-slate-400">Viabilidad: {f.viab}</p>
                </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 p-8 rounded-2xl text-white">
        <h3 className="text-base font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" /> Arquitectura (Serveless)
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
                <Target className="w-6 h-6 mx-auto text-purple-400" />
                <p className="text-[9px] font-bold">Frontend</p>
                <p className="text-[8px] text-slate-400">React + Motion</p>
            </div>
            <div className="space-y-2">
                <Zap className="w-6 h-6 mx-auto text-yellow-400" />
                <p className="text-[9px] font-bold">Backend</p>
                <p className="text-[8px] text-slate-400">Firebase</p>
            </div>
            <div className="space-y-2">
                <ShieldCheck className="w-6 h-6 mx-auto text-green-400" />
                <p className="text-[9px] font-bold">IA / Seguridad</p>
                <p className="text-[8px] text-slate-400">Google Cloud / Gemini</p>
            </div>
        </div>
      </section>
    </div>
  );
}
