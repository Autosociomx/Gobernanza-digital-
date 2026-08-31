import { describe, expect, it } from 'vitest';
import {
  EVIDENCE_AUDITOR_POLICY_VERSION,
  evaluateEvidenceAuditorPolicy,
  evaluateEvidenceAuditorPostResultGate,
  type EvidenceAuditorPolicyInput,
} from '../../contextos/policies/evidenceAuditorPolicy';

function validInput(): EvidenceAuditorPolicyInput {
  return {
    roleId: 'evidence.auditor',
    capabilityId: 'gov.mx.evidence.verify_claim',
    authorityScope: 'advisory',
    purpose: 'public_works_audit',
    context: {
      caseId: 'PUE-COL-001',
      contextHandle: 'ctx-pue-col-001',
      jurisdiction: { country: 'MX', state: 'NAY', municipality: 'Tepic' },
    },
    claim: {
      claimId: 'AF-06',
      text: 'El aumento de monto ya prueba sobrecosto.',
    },
    evidence: [
      {
        sourceEvidenceId: 'PUE-COL-001:SRC-001:0123456789abcdef',
        state: 'FROZEN',
        dataClassification: 'PUBLIC_ONLY',
      },
    ],
    canonicalMutationRequested: false,
  };
}

describe('Evidence Auditor policy v0.1', () => {
  it('allows a public, frozen, advisory verification request with an authorized purpose', () => {
    const decision = evaluateEvidenceAuditorPolicy(validInput());
    expect(decision.decision).toBe('ALLOW');
    expect(decision.policyVersion).toBe(EVIDENCE_AUDITOR_POLICY_VERSION);
    expect(decision.authorityScope).toBe('advisory');
    expect(decision.consentRequired).toBe(false);
  });

  it('rejects evidence that is not FROZEN', () => {
    const input = validInput();
    input.evidence[0].state = 'APPROVED_PENDING_SNAPSHOT';
    const decision = evaluateEvidenceAuditorPolicy(input);
    expect(decision.decision).toBe('DENY');
    expect(decision.reasonCodes).toContain('SOURCE_NOT_FROZEN');
  });

  it('rejects authority escalation', () => {
    const decision = evaluateEvidenceAuditorPolicy({
      ...validInput(),
      authorityScope: 'binding',
    });
    expect(decision.decision).toBe('DENY');
    expect(decision.reasonCodes).toContain('AUTHORITY_SCOPE_ESCALATION_FORBIDDEN');
  });

  it('rejects personal or unknown data instead of improvising consent in v0.1', () => {
    const input = validInput();
    input.evidence[0].dataClassification = 'CONTAINS_PERSONAL_DATA';
    const decision = evaluateEvidenceAuditorPolicy(input);
    expect(decision.decision).toBe('DENY');
    expect(decision.reasonCodes).toContain('PERSONAL_OR_UNKNOWN_DATA_NOT_SUPPORTED_V0_1');
  });

  it('requires human review after a contradicted result', () => {
    const gate = evaluateEvidenceAuditorPostResultGate('contradicted');
    expect(gate.humanApprovalRequired).toBe(true);
    expect(gate.externalUseAllowed).toBe(false);
    expect(gate.canonicalMutationAllowed).toBe(false);
  });
});
