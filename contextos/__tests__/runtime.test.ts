import { describe, expect, it } from 'vitest';
import type { ConsentGrant, IntentEnvelope } from '../contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../contracts';
import { verifyEvidenceRecord } from '../evidence';
import { CONTACT_CONSENT_SCOPE, PUBLIC_WORKS_PURPOSE } from '../policyEngine';
import { createPublicWorksReportAdapter } from '../adapters/publicWorksReportAdapter';
import { ContextOSRuntime } from '../runtime';
import { PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT } from '../../shared/semantic/contracts/publicWorksReport';

const FIXED_NOW = new Date('2026-08-19T21:30:00.000Z');
const SEMANTIC = PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT;

function makeRuntime() {
  const adapter = createPublicWorksReportAdapter({ idFactory: () => 'ticket-001' });
  let evidenceCounter = 0;
  return new ContextOSRuntime({
    adapters: { [adapter.id]: adapter },
    now: () => FIXED_NOW,
    idFactory: () => `evidence-${++evidenceCounter}`,
  });
}

function semanticIntent(subject = 'bache'): IntentEnvelope['intent'] {
  return {
    name: SEMANTIC.intentName,
    subject,
    confidence: 0.98,
    semanticContractId: SEMANTIC.id,
    semanticContractVersion: SEMANTIC.version,
    semanticRegistryVersion: SEMANTIC.registryVersion,
  };
}

function intent(overrides: Partial<IntentEnvelope> = {}): IntentEnvelope {
  const base: IntentEnvelope = {
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    requestId: 'req-001',
    occurredAt: '2026-08-19T21:29:00.000Z',
    channel: 'orbe',
    actor: { type: 'citizen', authenticated: false },
    jurisdiction: { country: 'MX', state: 'NAY', municipality: 'Tepic' },
    intent: semanticIntent(),
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
    requestId: 'req-001',
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
    expect(result.policy.reasonCodes).toContain('SEMANTIC_CONTRACT_BOUND');
    expect(result.evidence.semantic).toEqual({
      contractId: SEMANTIC.id,
      contractVersion: SEMANTIC.version,
      registryVersion: SEMANTIC.registryVersion,
    });
    expect(verifyEvidenceRecord(result.evidence)).toBe(true);
  });

  it('denies ORBE envelopes without complete semantic provenance', async () => {
    const missing = await makeRuntime().execute({
      intent: intent({
        intent: {
          name: SEMANTIC.intentName,
          subject: 'bache',
          confidence: 0.98,
        },
      }),
    });
    expect(missing.status).toBe('DENIED');
    expect(missing.policy.reasonCodes).toContain('SEMANTIC_CONTRACT_REQUIRED');
  });

  it('denies semantic contract, contract-version and registry-version drift', async () => {
    const contractMismatch = await makeRuntime().execute({
      intent: intent({ intent: { ...semanticIntent(), semanticContractId: 'tampered.contract' } }),
    });
    const versionMismatch = await makeRuntime().execute({
      intent: intent({
        requestId: 'req-version',
        intent: { ...semanticIntent(), semanticContractVersion: '99.0.0' },
      }),
    });
    const registryMismatch = await makeRuntime().execute({
      intent: intent({
        requestId: 'req-registry',
        intent: { ...semanticIntent(), semanticRegistryVersion: 'tampered.registry' },
      }),
    });

    expect(contractMismatch.policy.reasonCodes).toContain('SEMANTIC_CONTRACT_MISMATCH');
    expect(versionMismatch.policy.reasonCodes).toContain('SEMANTIC_CONTRACT_VERSION_MISMATCH');
    expect(registryMismatch.policy.reasonCodes).toContain('SEMANTIC_REGISTRY_VERSION_MISMATCH');
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

  it('blocks unsupported report subjects before adapter execution', async () => {
    const result = await makeRuntime().execute({
      intent: intent({ intent: semanticIntent('fuga-agua') }),
    });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('SUBJECT_NOT_SUPPORTED');
    expect(result.execution).toBeUndefined();
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
    expect(result.evidence.integrityAssurance).toBe('CHECKSUM_ONLY');
  });

  it('denies malformed envelopes before service execution', async () => {
    const malformed = intent({ requestId: '' });
    const result = await makeRuntime().execute({ intent: malformed });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('REQUEST_ID_REQUIRED');
    expect(result.execution).toBeUndefined();
  });

  it('returns the original result for an identical idempotent retry', async () => {
    const runtime = makeRuntime();
    const first = await runtime.execute({ intent: intent() });
    const retry = await runtime.execute({ intent: intent() });
    expect(retry.status).toBe('EXECUTED');
    expect(retry.execution?.externalReference).toBe(first.execution?.externalReference);
    expect(retry.evidence.evidenceId).toBe(first.evidence.evidenceId);
  });

  it('coalesces concurrent retries into one adapter execution', async () => {
    const runtime = makeRuntime();
    const [first, retry] = await Promise.all([
      runtime.execute({ intent: intent() }),
      runtime.execute({ intent: intent() }),
    ]);
    expect(retry.status).toBe('EXECUTED');
    expect(retry.execution?.externalReference).toBe(first.execution?.externalReference);
    expect(retry.evidence.evidenceId).toBe(first.evidence.evidenceId);
  });

  it('denies reuse of a completed requestId with a different payload', async () => {
    const runtime = makeRuntime();
    await runtime.execute({ intent: intent() });
    const conflict = await runtime.execute({
      intent: intent({ data: { description: 'Otro bache distinto.', location: { landmark: 'Otra calle' } } }),
    });
    expect(conflict.status).toBe('DENIED');
    expect(conflict.policy.reasonCodes).toContain('IDEMPOTENCY_CONFLICT');
  });

  it('binds consent to the requestId', async () => {
    const result = await makeRuntime().execute({
      intent: intent({
        data: {
          description: 'Luminaria apagada desde hace tres días.',
          location: { landmark: 'Parque de la colonia' },
          contact: { phone: '3110000000' },
        },
      }),
      consent: consent({ requestId: 'another-request' }),
    });
    expect(result.status).toBe('NEEDS_CONSENT');
    expect(result.policy.reasonCodes).toContain('CONSENT_REQUEST_MISMATCH');
  });

  it('binds consent to an authenticated subject when present', async () => {
    const result = await makeRuntime().execute({
      intent: intent({
        actor: { type: 'citizen', authenticated: true, subjectId: 'citizen-001' },
        data: {
          description: 'Luminaria apagada desde hace tres días.',
          location: { landmark: 'Parque de la colonia' },
          contact: { phone: '3110000000' },
        },
      }),
      consent: consent({ subjectId: 'citizen-002' }),
    });
    expect(result.status).toBe('NEEDS_CONSENT');
    expect(result.policy.reasonCodes).toContain('CONSENT_SUBJECT_MISMATCH');
  });

  it('requires the report subject before execution', async () => {
    const result = await makeRuntime().execute({
      intent: intent({ intent: { ...semanticIntent(), subject: undefined } }),
    });
    expect(result.status).toBe('NEEDS_INPUT');
    expect(result.policy.requiredFields).toContain('intent.subject');
  });

  it('requires clarification for out-of-range coordinates', async () => {
    const result = await makeRuntime().execute({
      intent: intent({
        data: {
          description: 'Bache profundo frente a la escuela.',
          location: { lat: 999, lng: 999 },
        },
      }),
    });
    expect(result.status).toBe('NEEDS_INPUT');
    expect(result.policy.reasonCodes).toContain('LOCATION_COORDINATES_INVALID');
  });

  it('denies malformed jurisdiction without throwing', async () => {
    const result = await makeRuntime().execute({
      intent: {
        ...intent(),
        jurisdiction: { country: 'MX', municipality: 'Tepic' },
      } as unknown as IntentEnvelope,
    });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('JURISDICTION_REQUIRED');
  });


  it('denies malformed nested fields without throwing', async () => {
    const malformed = {
      ...intent(),
      data: {
        description: 123,
        location: { address: 456 },
      },
    } as unknown as IntentEnvelope;
    const result = await makeRuntime().execute({ intent: malformed });
    expect(result.status).toBe('DENIED');
    expect(result.policy.reasonCodes).toContain('DESCRIPTION_INVALID');
    expect(result.execution).toBeUndefined();
  });

  it('turns adapter exceptions into auditable ERROR responses', async () => {
    const runtime = new ContextOSRuntime({
      adapters: {
        'lab.public-works-report.v1': {
          id: 'lab.public-works-report.v1',
          async execute() {
            throw new Error('adapter failure');
          },
        },
      },
      now: () => FIXED_NOW,
      idFactory: () => 'evidence-error',
    });
    const result = await runtime.execute({ intent: intent() });
    expect(result.status).toBe('ERROR');
    expect(result.execution?.resultCode).toBe('ADAPTER_EXECUTION_FAILED');
    expect(verifyEvidenceRecord(result.evidence)).toBe(true);
  });
});
