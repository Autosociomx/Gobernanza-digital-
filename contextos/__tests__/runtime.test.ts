import { describe, expect, it } from 'vitest';
import type { ConsentGrant, IntentEnvelope } from '../contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../contracts';
import { verifyEvidenceRecord } from '../evidence';
import { CONTACT_CONSENT_SCOPE, PUBLIC_WORKS_PURPOSE } from '../policyEngine';
import { createPublicWorksReportAdapter } from '../adapters/publicWorksReportAdapter';
import { ContextOSRuntime } from '../runtime';

const FIXED_NOW = new Date('2026-08-19T21:30:00.000Z');

function makeRuntime() {
  const adapter = createPublicWorksReportAdapter({ idFactory: () => 'ticket-001' });
  let evidenceCounter = 0;
  return new ContextOSRuntime({
    adapters: { [adapter.id]: adapter },
    now: () => FIXED_NOW,
    idFactory: () => `evidence-${++evidenceCounter}`,
  });
}

function intent(overrides: Partial<IntentEnvelope> = {}): IntentEnvelope {
  const base: IntentEnvelope = {
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    requestId: 'req-001',
    occurredAt: '2026-08-19T21:29:00.000Z',
    channel: 'orbe',
    actor: { type: 'citizen', authenticated: false },
    jurisdiction: { country: 'MX', state: 'NAY', municipality: 'Tepic' },
    intent: { name: 'report_public_infrastructure_issue', subject: 'bache', confidence: 0.98 },
    purpose: PUBLIC_WORKS_PURPOSE,
    data: {
      description: 'Bache profundo frente a la escuela.',
      location: { address: 'Av. Insurgentes y calle Ejemplo, Tepic' },
    },
  };
  return { ...base, ...overrides };
}

function consent(overrides: Partial<ConsentGrant> = {}): ConsentGrant {
  return {
    grantId: 'consent-001',
    purpose: PUBLIC_WORKS_PURPOSE,
    scopes: [CONTACT_CONSENT_SCOPE],
    issuedAt: '2026-08-19T21:00:00.000Z',
    expiresAt: '2026-08-19T22:00:00.000Z',
    ...overrides,
  };
}

describe('ContextOSRuntime vertical slice 001', () => {
  it('executes a low-risk bache report in LAB_MOCK mode', async () => {
    const result = await makeRuntime().execute({ intent: intent() });
    expect(result.status).toBe('EXECUTED');
    expect(result.policy.decision).toBe('ALLOW');
    expect(result.execution?.externalReference).toBe('LAB-PW-ticket-001');
    expect(result.execution?.executionMode).toBe('LAB_MOCK');
    expect(verifyEvidenceRecord(result.evidence)).toBe(true);
  });

  it('requires clarification when minimum location is missing', async () => {
    const result = await makeRuntime().execute({
      intent: intent({ data: { description: 'Hay una luminaria apagada.' } }),
    });
    expect(result.status).toBe('NEEDS_INPUT');
    expect(result.policy.requiredFields).toContain('data.location');
    expect(result.execution).toBeUndefined();
  });

  it('denies unsupported jurisdiction', async () => {
    const result = await makeRuntime().execute({
      intent: intent({ jurisdiction: { country: 'MX', state: 'NAY', municipality: 'Xalisco' } }),
    });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('JURISDICTION_NOT_ALLOWED');
  });

  it('denies an unregistered intent instead of guessing a service', async () => {
    const result = await makeRuntime().execute({
      intent: intent({ intent: { name: 'pay_property_tax' } }),
    });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('SERVICE_NOT_REGISTERED');
  });

  it('requires consent when personal contact is supplied', async () => {
    const result = await makeRuntime().execute({
      intent: intent({
        data: {
          description: 'Luminaria apagada desde hace tres días.',
          location: { landmark: 'Parque de la colonia' },
          contact: { phone: '3110000000' },
        },
      }),
    });
    expect(result.status).toBe('NEEDS_CONSENT');
    expect(result.policy.requiredConsentScopes).toEqual([CONTACT_CONSENT_SCOPE]);
    expect(result.policy.reasonCodes).toContain('CONSENT_MISSING');
  });

  it('executes when contact consent is valid', async () => {
    const result = await makeRuntime().execute({
      intent: intent({
        data: {
          description: 'Luminaria apagada desde hace tres días.',
          location: { landmark: 'Parque de la colonia' },
          contact: { phone: '3110000000' },
        },
      }),
      consent: consent(),
    });
    expect(result.status).toBe('EXECUTED');
    expect(result.policy.reasonCodes).toContain('CONSENT_VALIDATED');
    expect(result.evidence.dataMinimization.personalContactStored).toBe(false);
  });

  it('rejects expired consent', async () => {
    const result = await makeRuntime().execute({
      intent: intent({
        data: {
          description: 'Luminaria apagada desde hace tres días.',
          location: { landmark: 'Parque de la colonia' },
          contact: { email: 'persona@example.com' },
        },
      }),
      consent: consent({ expiresAt: '2026-08-19T21:20:00.000Z' }),
    });
    expect(result.status).toBe('NEEDS_CONSENT');
    expect(result.policy.reasonCodes).toContain('CONSENT_EXPIRED');
  });

  it('blocks unsupported report subjects at the adapter boundary', async () => {
    const result = await makeRuntime().execute({
      intent: intent({ intent: { name: 'report_public_infrastructure_issue', subject: 'fuga-agua' } }),
    });
    expect(result.status).toBe('DENIED');
    expect(result.execution?.resultCode).toBe('SUBJECT_NOT_SUPPORTED');
  });

  it('does not store raw citizen payload in evidence', async () => {
    const result = await makeRuntime().execute({ intent: intent() });
    const serialized = JSON.stringify(result.evidence);
    expect(serialized).not.toContain('Bache profundo');
    expect(serialized).not.toContain('Av. Insurgentes');
    expect(result.evidence.dataMinimization.rawCitizenPayloadStored).toBe(false);
  });

  it('detects evidence tampering', async () => {
    const result = await makeRuntime().execute({ intent: intent() });
    const tampered = {
      ...result.evidence,
      policy: { ...result.evidence.policy, reasonCodes: ['TAMPERED'] },
    };
    expect(verifyEvidenceRecord(tampered)).toBe(false);
  });

  it('denies malformed envelopes before service execution', async () => {
    const malformed = intent({ requestId: '' });
    const result = await makeRuntime().execute({ intent: malformed });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('REQUEST_ID_REQUIRED');
    expect(result.execution).toBeUndefined();
  });
});
