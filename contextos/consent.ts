import type { ConsentGrant } from './contracts';

export interface ConsentValidation {
  valid: boolean;
  reason?: 'MISSING' | 'REVOKED' | 'EXPIRED' | 'PURPOSE_MISMATCH' | 'SCOPE_MISSING';
}

export function validateConsent(
  grant: ConsentGrant | undefined,
  requiredPurpose: string,
  requiredScopes: string[],
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
  if (grant.purpose !== requiredPurpose) return { valid: false, reason: 'PURPOSE_MISMATCH' };
  if (requiredScopes.some((scope) => !grant.scopes.includes(scope))) {
    return { valid: false, reason: 'SCOPE_MISSING' };
  }
  return { valid: true };
}
