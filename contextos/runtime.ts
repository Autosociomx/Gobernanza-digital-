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
import { sha256 } from './canonical';
import { createEvidenceRecord } from './evidence';
import { CONTACT_CONSENT_SCOPE, evaluatePolicy, POLICY_VERSION } from './policyEngine';
import { findServiceForIntent } from './serviceCatalog';
import type { ServiceAdapter } from './adapters/types';

export interface RuntimeDependencies {
  adapters: Record<string, ServiceAdapter>;
  now?: () => Date;
  idFactory?: () => string;
}

interface CompletedRequest {
  fingerprint: string;
  response: RuntimeResponse;
}

interface InFlightRequest {
  fingerprint: string;
  response: Promise<RuntimeResponse>;
}

function invalidEnvelopePolicy(reason: string): PolicyDecision {
  return {
    decision: 'DENY',
    policyVersion: POLICY_VERSION,
    reasonCodes: [reason],
  };
}

function basicEnvelopeValidation(intent: IntentEnvelope | undefined): string | undefined {
  if (!intent || intent.schemaVersion !== CONTEXTOS_SCHEMA_VERSION) return 'INVALID_SCHEMA_VERSION';
  if (!intent.requestId?.trim()) return 'REQUEST_ID_REQUIRED';
  if (!['orbe', 'web', 'api'].includes(intent.channel)) return 'CHANNEL_INVALID';
  if (!intent.actor || intent.actor.type !== 'citizen') return 'ACTOR_INVALID';
  if (!intent.intent?.name?.trim()) return 'INTENT_NAME_REQUIRED';
  if (!intent.purpose?.trim()) return 'PURPOSE_REQUIRED';
  if (
    !intent.jurisdiction ||
    intent.jurisdiction.country !== 'MX' ||
    !intent.jurisdiction.state?.trim() ||
    !intent.jurisdiction.municipality?.trim()
  ) {
    return 'JURISDICTION_REQUIRED';
  }
  if (!intent.data || typeof intent.data !== 'object') return 'DATA_REQUIRED';
  if (
    intent.intent.confidence !== undefined &&
    (!Number.isFinite(intent.intent.confidence) || intent.intent.confidence < 0 || intent.intent.confidence > 1)
  ) {
    return 'INTENT_CONFIDENCE_INVALID';
  }
  if (!Number.isFinite(Date.parse(intent.occurredAt))) return 'OCCURRED_AT_INVALID';
  return undefined;
}

export class ContextOSRuntime {
  private readonly adapters: Record<string, ServiceAdapter>;
  private readonly now: () => Date;
  private readonly idFactory: () => string;
  private readonly completedRequests = new Map<string, CompletedRequest>();
  private readonly inFlightRequests = new Map<string, InFlightRequest>();

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

    const fingerprint = sha256({ intent: request.intent, consent: request.consent });
    const completed = this.completedRequests.get(request.intent.requestId);
    if (completed) {
      if (completed.fingerprint === fingerprint) return structuredClone(completed.response);
      const policy = invalidEnvelopePolicy('IDEMPOTENCY_CONFLICT');
      return this.policyOnlyResponse('DENIED', correlationId, undefined, policy);
    }
    const inFlight = this.inFlightRequests.get(request.intent.requestId);
    if (inFlight) {
      if (inFlight.fingerprint === fingerprint) return structuredClone(await inFlight.response);
      const policy = invalidEnvelopePolicy('IDEMPOTENCY_CONFLICT');
      return this.policyOnlyResponse('DENIED', correlationId, undefined, policy);
    }

    const service = findServiceForIntent(request.intent.intent.name);
    let policy = evaluatePolicy(request.intent, service);
    let authorizedConsentScopes: string[] = [];

    if (policy.decision === 'REQUIRE_CONSENT') {
      const requiredScopes = policy.requiredConsentScopes ?? [CONTACT_CONSENT_SCOPE];
      const consent = validateConsent(
        request.consent,
        {
          requestId: request.intent.requestId,
          subjectId: request.intent.actor.subjectId,
          purpose: request.intent.purpose,
          requiredScopes,
        },
        this.now(),
      );
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
      authorizedConsentScopes = [...requiredScopes];
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

    const responsePromise = (async (): Promise<RuntimeResponse> => {
      let execution;
      try {
        execution = await adapter.execute({
          correlationId,
          service,
          intent: request.intent,
          authorizedConsentScopes,
        });
      } catch {
        execution = {
          status: 'FAILED' as const,
          adapterId: adapter.id,
          executionMode: service.executionMode,
          resultCode: 'ADAPTER_EXECUTION_FAILED',
          message: 'El adaptador no pudo completar la operación de laboratorio.',
        };
      }

      const status =
        execution.status === 'ACCEPTED' ? 'EXECUTED' :
        execution.status === 'REJECTED' ? 'DENIED' :
        'ERROR';
      const response: RuntimeResponse = {
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
      if (status === 'EXECUTED') {
        this.completedRequests.set(request.intent.requestId, {
          fingerprint,
          response: structuredClone(response),
        });
      }
      return response;
    })();

    this.inFlightRequests.set(request.intent.requestId, { fingerprint, response: responsePromise });
    try {
      return structuredClone(await responsePromise);
    } finally {
      const current = this.inFlightRequests.get(request.intent.requestId);
      if (current?.response === responsePromise) this.inFlightRequests.delete(request.intent.requestId);
    }
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
