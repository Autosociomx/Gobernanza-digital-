// Fundamento legal con artículos exactos de la LNETB (DOF 16-VII-2025).
import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export function LegalComplianceDisclaimer() {
  return (
    <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-lg border border-slate-700">
      <div className="flex items-start gap-4">
        <ShieldCheck className="w-10 h-10 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-3">
          <h3 className="font-serif font-black text-lg">Cumplimiento Legal — LNETB</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Esta plataforma opera en cumplimiento de la{' '}
            <strong className="text-white">
              Ley Nacional para Eliminar Trámites Burocráticos (LNETB, DOF 16-VII-2025)
            </strong>
            , que obliga al H. Ayuntamiento de Tepic como Sujeto Obligado (Art. 3, XXXIV).
          </p>
          <ul className="space-y-2">
            {[
              { art: 'Art. 74', desc: 'Inicio de sesión único Llave MX integrado.' },
              { art: 'Arts. 51–54', desc: 'Trámites inscritos en el Portal Ciudadano Único.' },
              { art: 'Art. 13, XIII–XVIII', desc: 'Ventanilla Digital y Modelo Integral de Atención Ciudadana operativos.' },
              { art: 'Art. 91', desc: 'Código fuente propiedad del municipio. Sin vendor lock-in.' },
            ].map(item => (
              <li key={item.art} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-black shrink-0">{item.art}</span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-2 border-t border-slate-700">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest">
              ConnectX Infraestructura Digital · Tepic, Nayarit
            </span>
            <a
              href="https://www.dof.gob.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:underline"
            >
              Ver DOF <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
