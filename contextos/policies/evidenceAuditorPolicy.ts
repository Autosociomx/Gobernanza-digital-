export const EVIDENCE_AUDITOR_POLICY_VERSION = 'contextos.policy.evidence-auditor.v0.1' as const;
export const EVIDENCE_AUDITOR_ROLE_ID = 'evidence.auditor' as const;
export const EVIDENCE_AUDITOR_CAPABILITY_ID = 'gov.mx.evidence.verify_claim' as const;
export const EVIDENCE_AUDITOR_AUTHORITY_SCOPE = 'advisory' as const;

export const EVIDENCE_AUDITOR_ALLOWED_PURPOSES = [
  'public_works_audit',
  'institutional_evidence_verification',
] as const;

export type EvidenceFreezeState =
  | 'CANDIDATE'
  | 'APPROVED_PENDING_SNAPSHOT'
  | 'FROZEN'
  | 'BLOCKED'
  | 'EXCLUDED';
export type EvidenceDataClassification = 'PUBLIC_ONLY' | 'CONTAINS_PERSONAL_DATA' | 'UNKNOWN';

export interface EvidenceAuditorPolicyInput {
  roleId: string;
  capabilityId: string;
  authorityScope: string;
  purpose: string;
  context: {
    caseId?: string;
    contextHandle?: string;
    jurisdiction?: {
      country?: string;
      state?: string;
      municipality?: string;
    };
  };
  claim: {
    claimId?: string;
    text?: string;
  };
  evidence: Array<{
    sourceEvidenceId?: string;
    state: EvidenceFreezeState;
    dataClassification: EvidenceDataClassification;
  }>;
  canonicalMutationRequested?: boolean;
}

export interface EvidenceAuditorPolicyDecision {
  decision: 'ALLOW' | 'DENY' | 'REQUIRE_CLARIFICATION';
  policyVersion: typeof EVIDENCE_AUDITOR_POLICY_VERSION;
  authorityScope: typeof EVIDENCE_AUDITOR_AUTHORITY_SCOPE;
  consentRequired: false;
  reasonCodes: string[];
  requiredFields?: string[];
}

export interface EvidenceAuditorPostResultGate {
  policyVersion: typeof EVIDENCE_AUDITOR_POLICY_VERSION;
  authorityScope: typeof EVIDENCE_AUDITOR_AUTHORITY_SCOPE;
  canonicalMutationAllowed: false;
  humanApprovalRequired: boolean;
  externalUseAllowed: boolean;
  reasonCodes: string[];
}

function deny(reasonCode: string): EvidenceAuditorPolicyDecision {
  return {
    decision: 'DENY',
    policyVersion: EVIDENCE_AUDITOR_POLICY_VERSION,
    authorityScope: EVIDENCE_AUDITOR_AUTHORITY_SCOPE,
    consentRequired: false,
    reasonCodes: [reasonCode],
  };
}

function requiredFields(input: EvidenceAuditorPolicyInput): string[] {
  const missing: string[] = [];
  if (!input.context.caseId?.trim()) missing.push('context.case_id');
  if (!input.context.contextHandle?.trim()) missing.push('context.context_handle');
  if (!input.context.jurisdiction?.state?.trim()) missing.push('context.jurisdiction.state');
  if (!input.context.jurisdiction?.municipality?.trim()) {
    missing.push('context.jurisdiction.municipality');
  }
  if (!input.claim.claimId?.trim()) missing.push('claim.claim_id');
  if (!input.claim.text?.trim()) missing.push('claim.text');
  if (!Array.isArray(input.evidence) || input.evidence.length === 0) missing.push('evidence');
  return missing;
}

export function evaluateEvidenceAuditorPolicy(
  input: EvidenceAuditorPolicyInput,
): EvidenceAuditorPolicyDecision {
  if (input.roleId !== EVIDENCE_AUDITOR_ROLE_ID) return deny('ROLE_NOT_ALLOWED');
  if (input.capabilityId !== EVIDENCE_AUDITOR_CAPABILITY_ID) return deny('CAPABILITY_NOT_ALLOWED');
  if (input.authorityScope !== EVIDENCE_AUDITOR_AUTHORITY_SCOPE) {
    return deny('AUTHORITY_SCOPE_ESCALATION_FORBIDDEN');
  }
  if (!(EVIDENCE_AUDITOR_ALLOWED_PURPOSES as readonly string[]).includes(input.purpose)) {
    return deny('PURPOSE_NOT_ALLOWED');
  }
  if (input.context.jurisdiction?.country !== 'MX') return deny('COUNTRY_NOT_ALLOWED');
  if (input.canonicalMutationRequested === true) return deny('CANONICAL_MUTATION_FORBIDDEN');

  const missing = requiredFields(input);
  if (missing.length > 0) {
    return {
      decision: 'REQUIRE_CLARIFICATION',
      policyVersion: EVIDENCE_AUDITOR_POLICY_VERSION,
      authorityScope: EVIDENCE_AUDITOR_AUTHORITY_SCOPE,
      consentRequired: false,
      reasonCodes: ['MINIMUM_CONTEXT_MISSING'],
      requiredFields: missing,
    };
  }

  if (input.evidence.some((item) => item.state !== 'FROZEN')) {
    return deny('SOURCE_NOT_FROZEN');
  }
  if (input.evidence.some((item) => !item.sourceEvidenceId?.trim())) {
    return deny('SOURCE_EVIDENCE_ID_REQUIRED');
  }
  if (input.evidence.some((item) => item.dataClassification !== 'PUBLIC_ONLY')) {
    return deny('PERSONAL_OR_UNKNOWN_DATA_NOT_SUPPORTED_V0_1');
  }

  return {
    decision: 'ALLOW',
    policyVersion: EVIDENCE_AUDITOR_POLICY_VERSION,
    authorityScope: EVIDENCE_AUDITOR_AUTHORITY_SCOPE,
    consentRequired: false,
    reasonCodes: [
      'ROLE_BOUND',
      'CAPABILITY_BOUND',
      'PURPOSE_ALLOWED',
      'MX_JURISDICTION_BOUND',
      'ALL_SOURCES_FROZEN',
      'PUBLIC_ONLY_EVIDENCE',
      'ADVISORY_ONLY',
      'CANONICAL_MUTATION_FORBIDDEN',
    ],
  };
}

export function evaluateEvidenceAuditorPostResultGate(
  classification: 'supported' | 'partially_supported' | 'contradicted' | 'insufficient_evidence',
): EvidenceAuditorPostResultGate {
  const humanApprovalRequired = classification === 'contradicted';
  return {
    policyVersion: EVIDENCE_AUDITOR_POLICY_VERSION,
    authorityScope: EVIDENCE_AUDITOR_AUTHORITY_SCOPE,
    canonicalMutationAllowed: false,
    humanApprovalRequired,
    externalUseAllowed: !humanApprovalRequired,
    reasonCodes: humanApprovalRequired
      ? ['CONTRADICTED_RESULT_REQUIRES_HUMAN_REVIEW']
      : ['ADVISORY_RESULT_NO_ESCALATION'],
  };
}
