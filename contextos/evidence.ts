import { randomUUID } from 'node:crypto';
import type { EvidenceRecord, ExecutionResult, PolicyDecision } from './contracts';
import { CONTEXTOS_SCHEMA_VERSION } from './contracts';
import { sha256 } from './canonical';

export interface EvidenceInput {
  correlationId: string;
  serviceId?: string;
  policy: PolicyDecision;
  execution?: ExecutionResult;
}

export interface EvidenceOptions {
  now?: () => Date;
  idFactory?: () => string;
}

export function createEvidenceRecord(input: EvidenceInput, options: EvidenceOptions = {}): EvidenceRecord {
  const now = options.now ?? (() => new Date());
  const idFactory = options.idFactory ?? randomUUID;

  const unsigned = {
    evidenceId: idFactory(),
    correlationId: input.correlationId,
    createdAt: now().toISOString(),
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    eventType: input.execution ? ('EXECUTION' as const) : ('POLICY_ONLY' as const),
    serviceId: input.serviceId,
    policy: {
      decision: input.policy.decision,
      policyVersion: input.policy.policyVersion,
      reasonCodes: [...input.policy.reasonCodes],
    },
    execution: input.execution
      ? {
          status: input.execution.status,
          adapterId: input.execution.adapterId,
          executionMode: input.execution.executionMode,
          resultCode: input.execution.resultCode,
          externalReference: input.execution.externalReference,
        }
      : undefined,
    dataMinimization: {
      rawCitizenPayloadStored: false as const,
      personalContactStored: false as const,
    },
    integrityAssurance: 'CHECKSUM_ONLY' as const,
    hashAlgorithm: 'sha256' as const,
  };

  return { ...unsigned, hash: sha256(unsigned) };
}

export function verifyEvidenceRecord(record: EvidenceRecord): boolean {
  const { hash, ...unsigned } = record;
  return hash === sha256(unsigned);
}
