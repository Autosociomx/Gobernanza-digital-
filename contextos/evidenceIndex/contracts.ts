/**
 * Evidence Index v0.1 — índice reproducible para Context.OS.
 *
 * Este módulo no abre archivos, no descarga fuentes y no guarda contenido.
 * Un adaptador de ingestión autorizado entrega el contenido ya localizado; el
 * índice conserva sólo metadatos y huellas. CodeLens consume el resultado.
 */
import type {
  CodeLensCanonicalClaim,
  CodeLensEvidenceRef,
  CodeLensIndex,
} from '../codelens/contracts';

export const EVIDENCE_INDEX_SCHEMA_VERSION = 'contextos.evidence-index.v0.1' as const;

export interface EvidenceSourceInput {
  /** Referencia estable, por ejemplo repo:docs/marco/BIBLIOTECA_LEGAL.md#hacienda. */
  ref: string;
  kind: CodeLensEvidenceRef['kind'];
  status: CodeLensEvidenceRef['status'];
  /** Versión aportada por el custodio: commit, edición, fecha o identificador oficial. */
  sourceVersion: string;
  /** Contenido obtenido por un adaptador autorizado. Nunca se conserva en la salida. */
  content: string;
}

export interface EvidenceIndexRecord {
  evidenceId: string;
  ref: string;
  kind: CodeLensEvidenceRef['kind'];
  status: CodeLensEvidenceRef['status'];
  sourceVersion: string;
  digest: string;
  hashAlgorithm: 'sha256';
  integrityAssurance: 'CHECKSUM_ONLY';
}

export interface EvidenceIndexRejection {
  refDigest: string;
  reasonCode: string;
}

export interface EvidenceIndexBuildResult {
  schemaVersion: typeof EVIDENCE_INDEX_SCHEMA_VERSION;
  /** Compatible directamente con evaluateCandidate(candidate, index). */
  index: CodeLensIndex;
  records: readonly EvidenceIndexRecord[];
  rejected: readonly EvidenceIndexRejection[];
  canonicalClaims: readonly CodeLensCanonicalClaim[];
}
