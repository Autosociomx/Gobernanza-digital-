import {
  evaluateEvidenceAuditorPolicy,
  type EvidenceAuditorPolicyDecision,
  type EvidenceAuditorPolicyInput,
} from '../policies/evidenceAuditorPolicy';

export interface ContractValidator {
  (value: unknown): boolean;
  errors?: unknown[] | null;
}

export type EvidenceAuditorPolicyEvaluator = (
  input: EvidenceAuditorPolicyInput,
) => EvidenceAuditorPolicyDecision;

interface ValidatedEvidenceAuditorEnvelope {
  role: { role_id: string };
  capability: { capability_id: string; authority_scope: string };
  context: {
    case_id: string;
    context_handle: string;
    jurisdiction: {
      country: string;
      state: string;
      municipality: string;
    };
    purpose: string;
  };
  request: {
    claim: {
      claim_id: string;
      text: string;
    };
  };
  evidence: Array<{
    source_evidence_id: string;
    freeze_state: 'FROZEN';
    data_classification: 'PUBLIC_ONLY';
  }>;
}

export type EvidenceAuditorGateResult =
  | {
      stage: 'SCHEMA';
      outcome: 'INVALID_CONTRACT';
      policyEvaluated: false;
      schemaErrors: unknown[];
    }
  | {
      stage: 'POLICY';
      outcome: EvidenceAuditorPolicyDecision['decision'];
      policyEvaluated: true;
      policyDecision: EvidenceAuditorPolicyDecision;
    };

function mapEnvelopeToPolicyInput(
  envelope: ValidatedEvidenceAuditorEnvelope,
): EvidenceAuditorPolicyInput {
  return {
    roleId: envelope.role.role_id,
    capabilityId: envelope.capability.capability_id,
    authorityScope: envelope.capability.authority_scope,
    purpose: envelope.context.purpose,
    context: {
      caseId: envelope.context.case_id,
      contextHandle: envelope.context.context_handle,
      jurisdiction: {
        country: envelope.context.jurisdiction.country,
        state: envelope.context.jurisdiction.state,
        municipality: envelope.context.jurisdiction.municipality,
      },
    },
    claim: {
      claimId: envelope.request.claim.claim_id,
      text: envelope.request.claim.text,
    },
    evidence: envelope.evidence.map((item) => ({
      sourceEvidenceId: item.source_evidence_id,
      state: item.freeze_state,
      dataClassification: item.data_classification,
    })),
    canonicalMutationRequested: false,
  };
}

/**
 * P0.6 contract gate. Raw provider-bound input must pass the specialized
 * JSON Schema before Evidence Auditor policy evaluation is allowed to run.
 * Schema invalidity is not a policy DENY; it is an INVALID_CONTRACT outcome.
 */
export function evaluateEvidenceAuditorEnvelopeGate(
  rawInput: unknown,
  contractValidator: ContractValidator,
  policyEvaluator: EvidenceAuditorPolicyEvaluator = evaluateEvidenceAuditorPolicy,
): EvidenceAuditorGateResult {
  if (!contractValidator(rawInput)) {
    return {
      stage: 'SCHEMA',
      outcome: 'INVALID_CONTRACT',
      policyEvaluated: false,
      schemaErrors: [...(contractValidator.errors ?? [])],
    };
  }

  const envelope = rawInput as ValidatedEvidenceAuditorEnvelope;
  const policyDecision = policyEvaluator(mapEnvelopeToPolicyInput(envelope));
  return {
    stage: 'POLICY',
    outcome: policyDecision.decision,
    policyEvaluated: true,
    policyDecision,
  };
}
