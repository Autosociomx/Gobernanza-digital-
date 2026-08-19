import { randomUUID } from 'node:crypto';
import type {
  IntentEnvelope,
  PolicyDecision,
  RuntimeRequest,
  RuntimeResponse,
  ServiceDescriptor,
} from './contracts';
import { CONTEXTOS_SCHEMA_VERSION } from './contracts';
import { validateConsent } from './consent';
import { createEvidenceRecord } from './evidence';
import { CONTACT_CONSENT_SCOPE, evaluatePolicy, POLICY_VERSION } from './policyEngine';
import { findServiceForIntent } from './serviceCatalog';
import type { ServiceAdapter } from './adapters/types';

export interface RuntimeDependencies {
  adapters: Record<string, ServiceAdapter>;
  now?: () => Date;
  idFactory?: () => string;
}

function invalidEnvelopePolicy(reason: string): PolicyDecision {
  return {
    decision: 'DENY',
    policyVersion: POLICY_VERSION,
    reasonCodes: [reason],
  };
}

function basicEnvelopeValidation(intent: IntentEnvelope): string | undefined {
  if (!intent || intent.schemaVersion !== CONTEXTOS_SCHEMA_VERSION) return 'INVALID_SCHEMA_VERSION';
  if (!intent.requestId?.trim()) return 'REQUEST_ID_REQUIRED';
  if (!intent.intent?.name?.trim()) return 'INTENT_NAME_REQUIRED';
  if (!intent.purpose?.trim()) return 'PURPOSE_REQUIRED';
  if (!intent.jurisdiction?.municipality?.trim()) return 'JURISDICTION_REQUIRED';
  if (!Number.isFinite(Date.parse(intent.occurredAt))) return 'OCCURRED_AT_INVALID';
  return undefined;
}

export class ContextOSRuntime {
  private readonly adapters: Record<string, ServiceAdapter>;
  private readonly now: () => Date;
  private readonly idFactory: () => string;

  constructor(dependencies: RuntimeDependencies) {
    this.adapters = dependencies.adapters;
    this.now = dependencies.now ?? (() => new Date());
    this.idFactory = dependencies.idFactory ?? randomUUID;
  }

  async execute(request: RuntimeRequest): Promise<RuntimeResponse> {
    const correlationId = request?.intent?.requestId || this.idFactory();
    const validationError = basicEnvelopeValidation(request?.intent);
    if (validationError) {
      const policy = invalidEnvelopePolicy(validationError);
      return {
        status: 'DENIED',
        correlationId,
        policy,
        evidence: createEvidenceRecord(
          { correlationId, policy },
          { now: this.now, idFactory: this.idFactory },
        ),
      };
    }

    const service = findServiceForIntent(request.intent.intent.name);
    let policy = evaluatePolicy(request.intent, service);

    if (policy.decision === 'REQUIRE_CONSENT') {
      const requiredScopes = policy.requiredConsentScopes ?? [CONTACT_CONSENT_SCOPE];
      const consent = validateConsent(request.consent, request.intent.purpose, requiredScopes, this.now());
      if (!consent.valid) {
        policy = {
          ...policy,
          reasonCodes: [...policy.reasonCodes, `CONSENT_${consent.reason ?? 'INVALID'}`],
        };
        return this.policyOnlyResponse('NEEDS_CONSENT', correlationId, service, policy);
      }
      policy = {
        decision: 'ALLOW',
        policyVersion: policy.policyVersion,
        reasonCodes: ['LOW_RISK_PUBLIC_REPORT', 'CONSENT_VALIDATED'],
      };
    }

    if (policy.decision === 'REQUIRE_CLARIFICATION') {
      return this.policyOnlyResponse('NEEDS_INPUT', correlationId, service, policy);
    }
    if (policy.decision === 'DENY' || !service) {
      return this.policyOnlyResponse('DENIED', correlationId, service, policy);
    }

    const adapter = this.adapters[service.adapterId];
    if (!adapter) {
      const unavailablePolicy: PolicyDecision = {
        decision: 'DENY',
        policyVersion: policy.policyVersion,
        reasonCodes: ['ADAPTER_NOT_REGISTERED'],
      };
      return this.policyOnlyResponse('ERROR', correlationId, service, unavailablePolicy);
    }

    const execution = await adapter.execute({
      correlationId,
      service,
      intent: request.intent,
      authorizedConsentScopes: request.consent?.scopes ?? [],
    });

    const status = execution.status === 'ACCEPTED' ? 'EXECUTED' : execution.status === 'REJECTED' ? 'DENIED' : 'ERROR';
    return {
      status,
      correlationId,
      service,
      policy,
      execution,
      evidence: createEvidenceRecord(
        { correlationId, serviceId: service.id, policy, execution },
        { now: this.now, idFactory: this.idFactory },
      ),
    };
  }

  private policyOnlyResponse(
    status: RuntimeResponse['status'],
    correlationId: string,
    service: ServiceDescriptor | undefined,
    policy: PolicyDecision,
  ): RuntimeResponse {
    return {
      status,
      correlationId,
      service,
      policy,
      evidence: createEvidenceRecord(
        { correlationId, serviceId: service?.id, policy },
        { now: this.now, idFactory: this.idFactory },
      ),
    };
  }
}
