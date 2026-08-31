import type { RuntimeResponse } from '../contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../contracts';
import { verifyEvidenceRecord } from '../evidence';

export interface RuntimeBinding {
  schemaVersion: typeof CONTEXTOS_SCHEMA_VERSION;
  correlationId: string;
  policyVersion: string;
  runtimeEvidence: {
    evidenceId: string;
    createdAt: string;
    hash: string;
    hashAlgorithm: 'sha256';
    integrityAssurance: 'CHECKSUM_ONLY';
  };
}

/**
 * Creates the deterministic portability boundary from an actual Context.OS
 * RuntimeResponse. This does not register Evidence Auditor as a runtime service;
 * it only proves and centralizes the mapping from current runtime-native fields.
 */
export function bindRuntimeResponse(response: RuntimeResponse): RuntimeBinding {
  if (!verifyEvidenceRecord(response.evidence)) {
    throw new Error('RUNTIME_EVIDENCE_INVALID');
  }

  if (response.evidence.correlationId !== response.correlationId) {
    throw new Error('RUNTIME_CORRELATION_MISMATCH');
  }

  if (response.evidence.policy.policyVersion !== response.policy.policyVersion) {
    throw new Error('RUNTIME_POLICY_VERSION_MISMATCH');
  }

  return {
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    correlationId: response.correlationId,
    policyVersion: response.policy.policyVersion,
    runtimeEvidence: {
      evidenceId: response.evidence.evidenceId,
      createdAt: response.evidence.createdAt,
      hash: response.evidence.hash,
      hashAlgorithm: response.evidence.hashAlgorithm,
      integrityAssurance: response.evidence.integrityAssurance,
    },
  };
}
