import { describe, expect, it } from 'vitest';
import type { IntentEnvelope } from '../../contextos/contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../../contextos/contracts';
import { createPublicWorksReportAdapter } from '../../contextos/adapters/publicWorksReportAdapter';
import { ContextOSRuntime } from '../../contextos/runtime';
import { bindRuntimeResponse } from '../../contextos/portability/runtimeBinding';
import { PUBLIC_WORKS_PURPOSE } from '../../contextos/policyEngine';
import { PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT } from '../../shared/semantic/contracts/publicWorksReport';

const FIXED_NOW = new Date('2026-08-31T18:30:00.000Z');
const SEMANTIC = PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT;

function makeRuntime() {
  const adapter = createPublicWorksReportAdapter({ idFactory: () => 'ticket-p06' });
  let evidenceCounter = 0;
  return new ContextOSRuntime({
    adapters: { [adapter.id]: adapter },
    now: () => FIXED_NOW,
    idFactory: () => `runtime-evidence-${++evidenceCounter}`,
  });
}

function makeIntent(): IntentEnvelope {
  return {
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    requestId: 'p06-runtime-boundary-001',
    occurredAt: '2026-08-31T18:29:00.000Z',
    channel: 'api',
    actor: { type: 'citizen', authenticated: false },
    jurisdiction: { country: 'MX', state: 'NAY', municipality: 'Tepic' },
    intent: {
      name: SEMANTIC.intentName,
      subject: 'bache',
      confidence: 1,
      semanticContractId: SEMANTIC.id,
      semanticContractVersion: SEMANTIC.version,
      semanticRegistryVersion: SEMANTIC.registryVersion,
    },
    purpose: PUBLIC_WORKS_PURPOSE,
    data: {
      description: 'Fixture mínimo para probar el boundary P0.6.',
      location: { landmark: 'Tepic' },
    },
  };
}

describe('P0.6 Context.OS runtime boundary', () => {
  it('maps current runtime-native field names without changing their meaning', async () => {
    const result = await makeRuntime().execute({ intent: makeIntent() });
    expect(result.status).toBe('EXECUTED');

    const binding = bindRuntimeResponse(result);

    expect(binding.schemaVersion).toBe(CONTEXTOS_SCHEMA_VERSION);
    expect(binding.correlationId).toBe(result.correlationId);
    expect(binding.policyVersion).toBe(result.policy.policyVersion);
    expect(binding.runtimeEvidence.evidenceId).toBe(result.evidence.evidenceId);
    expect(binding.runtimeEvidence.hash).toBe(result.evidence.hash);
    expect(binding.runtimeEvidence.hashAlgorithm).toBe('sha256');
    expect(binding.runtimeEvidence.integrityAssurance).toBe('CHECKSUM_ONLY');
  });

  it('refuses a tampered Context.OS EvidenceRecord', async () => {
    const result = await makeRuntime().execute({ intent: makeIntent() });
    const tampered = {
      ...result,
      evidence: {
        ...result.evidence,
        hash: '0'.repeat(64),
      },
    };

    expect(() => bindRuntimeResponse(tampered)).toThrow('RUNTIME_EVIDENCE_INVALID');
  });

  it('refuses policy-version drift between RuntimeResponse and EvidenceRecord', async () => {
    const result = await makeRuntime().execute({ intent: makeIntent() });
    const drifted = {
      ...result,
      policy: {
        ...result.policy,
        policyVersion: 'contextos.policy.tampered.v999',
      },
    };

    expect(() => bindRuntimeResponse(drifted)).toThrow('RUNTIME_POLICY_VERSION_MISMATCH');
  });
});
