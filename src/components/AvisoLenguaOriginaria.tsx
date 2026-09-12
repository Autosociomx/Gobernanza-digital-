import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { ETIQUETA_SIN_VERIFICAR } from '../../shared/traduccion/guardia';
import { descriptorLengua, type LenguaClave } from '../../shared/traduccion/lenguas';
import { coberturaPorLengua } from '../../shared/traduccion/registro';

/**
 * Etiqueta obligatoria del semáforo cuando la interfaz se muestra en una
 * lengua originaria.
 *
 * `GuardiaPreEnvio` marca cada cadena heredada como PUBLICAR_ETIQUETADO: se
 * muestra, pero no puede presentarse como traducción validada. Este aviso es
 * la realización visual de esa etiqueta, y las cifras que cita salen del
 * registro (`coberturaPorLengua`), no de un texto escrito a mano que se
 * desactualiza.
 */
export function AvisoLenguaOriginaria({
  lengua,
  tono = 'claro',
}: {
  lengua: LenguaClave;
  tono?: 'claro' | 'oscuro';
}) {
  if (lengua === 'es') return null;

  const descriptor = descriptorLengua(lengua);
  const cobertura = coberturaPorLengua().find((entrada) => entrada.lengua === lengua);
  if (!cobertura) return null;

  const mostradas = cobertura.porVerificar;
  const enEspanol = cobertura.rechazadas + cobertura.sinTraduccion;

  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-2xl border px-4 py-3',
        tono === 'oscuro'
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-100'
          : 'border-amber-300 bg-amber-50 text-amber-900',
      )}
    >
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="space-y-1">
        <p className="text-[11px] font-black uppercase tracking-widest">
          {descriptor.autonimo} · Traducción {ETIQUETA_SIN_VERIFICAR}
        </p>
        <p className="text-[11px] leading-relaxed">
          {mostradas} de {cobertura.total} cadenas de la interfaz vienen de la versión heredada y
          ningún hablante de {descriptor.nombre} las ha revisado
          {enEspanol > 0 ? `; ${enEspanol} se retiraron por no estar en la lengua y se muestran en español` : ''}
          . El asistente responde en español y la voz se sintetiza en es-MX:{' '}
          {descriptor.nombre} no tiene voz nativa en ningún navegador.
        </p>
      </div>
    </div>
  );
}
