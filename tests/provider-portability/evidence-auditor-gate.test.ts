import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { evaluateEvidenceAuditorEnvelopeGate } from '../../contextos/portability/evidenceAuditorGate';
import { createDraft202012Validator } from './validate-schema';

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8')) as unknown;
}

const inputSchema = readJson('contracts/evidence-auditor-envelope.v0.1.schema.json') as object;
const validateInput = createDraft202012Validator(inputSchema);

describe('P0.6 schema-before-policy gate', () => {
  it('allows policy evaluation only after schema-valid canonical input', () => {
    const input = readJson('tests/provider-portability/fixtures/minimal-input.json');
    const result = evaluateEvidenceAuditorEnvelopeGate(input, validateInput);

    expect(result.stage).toBe('POLICY');
    expect(result.policyEvaluated).toBe(true);
    if (result.stage === 'POLICY') {
      expect(result.outcome).toBe('ALLOW');
      expect(result.policyDecision.policyVersion).toBe('contextos.policy.evidence-auditor.v0.1');
    }
  });

  it('rejects malformed input before policy evaluation', () => {
    const input = readJson('tests/provider-portability/fixtures/schema-invalid-input.json');
    let policyCalls = 0;

    const result = evaluateEvidenceAuditorEnvelopeGate(
      input,
      validateInput,
      () => {
        policyCalls += 1;
        throw new Error('POLICY_MUST_NOT_RUN_FOR_INVALID_CONTRACT');
      },
    );

    expect(result.stage).toBe('SCHEMA');
    expect(result.outcome).toBe('INVALID_CONTRACT');
    expect(result.policyEvaluated).toBe(false);
    expect(policyCalls).toBe(0);
    if (result.stage === 'SCHEMA') {
      expect(result.schemaErrors.length).toBeGreaterThan(0);
    }
  });
});
