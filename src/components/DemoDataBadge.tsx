import React from 'react';
import { FlaskConical } from 'lucide-react';

/**
 * Aviso compacto para módulos cuyos datos son de muestra/demostración
 * (arreglos fijos sin servicio real detrás). No usar en módulos donde la
 * acción del usuario sí ejecuta un flujo real sobre datos de demo — para
 * eso el problema no es el dato, es que la función funcione; ver
 * docs/marco/PENDIENTES_AUDITORIA_2026-08.md.
 */
export function DemoDataBadge({ detail }: { detail?: string }) {
  return (
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-3 py-2 text-xs">
      <FlaskConical className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>
        <strong className="font-bold uppercase tracking-wide">Datos de demostración.</strong>{' '}
        {detail ?? 'Esta vista muestra información de ejemplo, no datos reales de un sistema en producción.'}
      </span>
    </div>
  );
}
