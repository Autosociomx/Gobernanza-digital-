import { describe, expect, it } from 'vitest';
import type { IntentEnvelope, ServiceDescriptor } from '../contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../contracts';
import { evaluatePolicy } from '../policyEngine';
import { jurisdictionCode } from '../serviceCatalog';

const INFORMATION_SERVICE: ServiceDescriptor = {
  id: 'mx.gov.birth-certificate.info',
  version: '0.1.0',
  title: 'Orientación sobre acta de nacimiento',
  description: 'Servicio sintético de prueba para validar el contrato universal de capacidades.',
  intentNames: ['birth_certificate_information'],
  purpose: 'citizen.guidance',
  semanticContractId: 'orbe.semantic.birth-certificate.v0.1',
  semanticContractVersion: '0.1.0',
  semanticRegistryVersion: 'orbe.semantic-registry.v0.1',
  riskLevel: 'LOW',
  policyVersion: 'contextos.policy.public-information.v0.1',
  policyProfile: 'PUBLIC_INFORMATION',
  capabilityKind: 'INFORMATION',
  authorityLevel: 'NONE',
  requiresContactConsent: false,
  adapterId: 'none',
  executionMode: 'LAB_MOCK',
  allowedJurisdictions: ['MX'],
  requiredFields: [],
  allowedSubjects: ['birth_certificate'],
};

function informationIntent(overrides: Partial<IntentEnvelope> = {}): IntentEnvelope {
  const base: IntentEnvelope = {
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    requestId: 'req-info-001',
    occurredAt: '2026-09-04T22:00:00.000Z',
    channel: 'web',
    actor: { type: 'citizen', authenticated: false },
    jurisdiction: { country: 'MX' },
    intent: {
      name: 'birth_certificate_information',
      subject: 'birth_certificate',
    },
    purpose: 'citizen.guidance',
    data: {},
  };
  return { ...base, ...overrides };
}

describe('Context.OS capability contract v0.1', () => {
  it('builds jurisdiction codes for federal, state and municipal scopes', () => {
    expect(jurisdictionCode('MX')).toBe('MX');
    expect(jurisdictionCode('MX', 'NAY')).toBe('MX-NAY');
    expect(jurisdictionCode('MX', 'NAY', 'Tepic')).toBe('MX-NAY-TEPIC');
  });

  it('evaluates public information using the service policy instead of public-works constants', () => {
    const result = evaluatePolicy(informationIntent(), INFORMATION_SERVICE);
    expect(result.decision).toBe('ALLOW');
    expect(result.policyVersion).toBe('contextos.policy.public-information.v0.1');
    expect(result.reasonCodes).toContain('PUBLIC_INFORMATION');
    expect(result.reasonCodes).toContain('DATA_MINIMIZED');
  });

  it('does not request contact consent when the capability explicitly does not require it', () => {
    const result = evaluatePolicy(
      informationIntent({ data: { contact: { email: 'persona@example.com' } } }),
      INFORMATION_SERVICE,
    );
    expect(result.decision).toBe('ALLOW');
    expect(result.requiredConsentScopes).toBeUndefined();
  });

  it('still enforces the jurisdiction declared by the capability', () => {
    const stateOnly = {
      ...INFORMATION_SERVICE,
      allowedJurisdictions: ['MX-NAY'],
    } satisfies ServiceDescriptor;
    const denied = evaluatePolicy(informationIntent(), stateOnly);
    const allowed = evaluatePolicy(
      informationIntent({ jurisdiction: { country: 'MX', state: 'NAY' } }),
      stateOnly,
    );

    expect(denied.decision).toBe('DENY');
    expect(denied.reasonCodes).toContain('JURISDICTION_NOT_ALLOWED');
    expect(allowed.decision).toBe('ALLOW');
  });
});
