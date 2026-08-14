import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function LegalComplianceDisclaimer({ onViewCert }: { onViewCert?: () => void }) {
  return (
    <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-lg border border-slate-700">
      <div className="flex items-start gap-4">
        <ShieldCheck className="w-10 h-10 text-emerald-400 flex-shrink-0" />
        <div>
          <h3 className="font-serif font-black text-lg mb-2">Estado normativo del prototipo</h3>
          <p className="text-slate-300 text-xs leading-relaxed mb-4">
              Esta plataforma es un <strong>prototipo de demostración</strong>. No cuenta con certificación ni autorización institucional, y no garantiza validez jurídica, integridad ni seguridad de trámites o transacciones. La integración con identidad federal (Llave MX) y la firma electrónica avanzada son <strong>propuestas de integración</strong>, no capacidades implementadas. Cualquier uso con validez legal depende de los convenios y autorizaciones que otorgue la autoridad competente.
          </p>
          <button 
            onClick={onViewCert}
            className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline"
          >
              Ver estado de implementación
          </button>
        </div>
      </div>
    </div>
  );
}
