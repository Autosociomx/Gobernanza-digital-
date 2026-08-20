import type { ConsentGrant } from './contracts';

export interface ConsentValidation {
  valid: boolean;
  reason?:
    | 'MISSING'
    | 'REVOKED'
    | 'EXPIRED'
    | 'REQUEST_MISMATCH'
    | 'SUBJECT_MISMATCH'
    | 'PURPOSE_MISMATCH'
    | 'SCOPE_MISSING';
}

export interface ConsentContext {
  requestId: string;
  subjectId?: string;
  purpose: string;
  requiredScopes: string[];
}

export function validateConsent(
  grant: ConsentGrant | undefined,
  context: ConsentContext,
  now = new Date(),
): ConsentValidation {
  if (!grant) return { valid: false, reason: 'MISSING' };
  if (grant.revokedAt) return { valid: false, reason: 'REVOKED' };

  const issuedAt = Date.parse(grant.issuedAt);
  const expiresAt = Date.parse(grant.expiresAt);
  const nowMs = now.getTime();
  if (!Number.isFinite(issuedAt) || !Number.isFinite(expiresAt) || expiresAt <= nowMs || issuedAt > nowMs) {
    return { valid: false, reason: 'EXPIRED' };
  }
  if (grant.requestId !== context.requestId) return { valid: false, reason: 'REQUEST_MISMATCH' };
  if (context.subjectId && grant.subjectId !== context.subjectId) {
    return { valid: false, reason: 'SUBJECT_MISMATCH' };
  }
  if (grant.purpose !== context.purpose) return { valid: false, reason: 'PURPOSE_MISMATCH' };
  if (context.requiredScopes.some((scope) => !grant.scopes.includes(scope))) {
    return { valid: false, reason: 'SCOPE_MISSING' };
  }
  return { valid: true };
}
