/**
 * Lista cerrada de documentos del repositorio que pueden alimentar el índice.
 *
 * Añadir una fuente es un cambio de código revisable; no hay glob, URL ni ruta
 * recibida de un modelo o de un usuario.
 */
import type { EvidenceSourceInput } from './contracts';

export interface AllowlistedRepositorySource {
  readonly path: string;
  readonly ref: string;
  readonly kind: EvidenceSourceInput['kind'];
  readonly status: EvidenceSourceInput['status'];
}

export const REPOSITORY_EVIDENCE_ALLOWLIST: readonly AllowlistedRepositorySource[] = Object.freeze([
  Object.freeze({
    path: 'docs/marco/BIBLIOTECA_LEGAL.md',
    ref: 'repo:docs/marco/BIBLIOTECA_LEGAL.md',
    kind: 'repo',
    status: 'VERIFICADO',
  }),
  Object.freeze({
    path: 'docs/marco/GOBERNANZA_REPOSITORIO.md',
    ref: 'repo:docs/marco/GOBERNANZA_REPOSITORIO.md',
    kind: 'repo',
    status: 'VERIFICADO',
  }),
  Object.freeze({
    path: 'docs/PARLAMENTO_PROMPT.md',
    ref: 'repo:docs/PARLAMENTO_PROMPT.md',
    kind: 'repo',
    status: 'POR_VERIFICAR',
  }),
]);
