import { sha256 } from '../canonical';
import type { CodeLensCanonicalClaim, CodeLensEvidenceRef } from '../codelens/contracts';
import {
  EVIDENCE_INDEX_SCHEMA_VERSION,
} from './contracts';
import type {
  EvidenceIndexBuildResult,
  EvidenceIndexRecord,
  EvidenceIndexRejection,
  EvidenceSourceInput,
} from './contracts';

function sourceFingerprint(source: Partial<EvidenceSourceInput>): string {
  return sha256({
    ref: typeof source.ref === 'string' ? source.ref : '',
    sourceVersion: typeof source.sourceVersion === 'string' ? source.sourceVersion : '',
  });
}

/**
 * Construye un índice determinístico a partir de fuentes ya obtenidas.
 *
 * No persiste contenido, no resuelve rutas y no interpreta la fuente. Eso evita
 * que CodeLens o el índice se conviertan en un lector de disco o red con poderes
 * implícitos. La ingestión y persistencia siguen siendo responsabilidad de
 * Context.OS y de una autorización humana posterior.
 */
export function buildEvidenceIndex(
  sources: readonly EvidenceSourceInput[],
  canonicalClaims: readonly CodeLensCanonicalClaim[] = [],
): EvidenceIndexBuildResult {
  const records: EvidenceIndexRecord[] = [];
  const rejected: EvidenceIndexRejection[] = [];
  const seenRefs = new Set<string>();

  for (const source of sources) {
    const fingerprint = sourceFingerprint(source);
    if (!source || typeof source !== 'object') {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_INVALID' });
      continue;
    }
    if (typeof source.ref !== 'string' || !source.ref.trim()) {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_REF_REQUIRED' });
      continue;
    }
    if (seenRefs.has(source.ref)) {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_REF_DUPLICATE' });
      continue;
    }
    seenRefs.add(source.ref);
    if (!['repo', 'acta', 'externa'].includes(source.kind)) {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_KIND_INVALID' });
      continue;
    }
    if (!['VERIFICADO', 'POR_VERIFICAR'].includes(source.status)) {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_STATUS_INVALID' });
      continue;
    }
    if (typeof source.sourceVersion !== 'string' || !source.sourceVersion.trim()) {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_VERSION_REQUIRED' });
      continue;
    }
    if (typeof source.content !== 'string' || !source.content.length) {
      rejected.push({ refDigest: fingerprint, reasonCode: 'SOURCE_CONTENT_REQUIRED' });
      continue;
    }

    const digest = sha256(source.content);
    records.push({
      evidenceId: `evidence:${sha256({
        ref: source.ref,
        kind: source.kind,
        status: source.status,
        sourceVersion: source.sourceVersion,
        digest,
      })}`,
      ref: source.ref,
      kind: source.kind,
      status: source.status,
      sourceVersion: source.sourceVersion,
      digest,
      hashAlgorithm: 'sha256',
      integrityAssurance: 'CHECKSUM_ONLY',
    });
  }

  records.sort((a, b) => a.ref.localeCompare(b.ref));
  rejected.sort((a, b) => a.refDigest.localeCompare(b.refDigest) || a.reasonCode.localeCompare(b.reasonCode));

  const evidence: CodeLensEvidenceRef[] = records.map((record) => ({
    ref: record.ref,
    kind: record.kind,
    status: record.status,
    digest: record.digest,
  }));

  return {
    schemaVersion: EVIDENCE_INDEX_SCHEMA_VERSION,
    index: { evidence, canonicalClaims: [...canonicalClaims] },
    records,
    rejected,
    canonicalClaims: [...canonicalClaims],
  };
}

export * from './contracts';
export * from './allowlist';
export * from './repositoryAdapter';
