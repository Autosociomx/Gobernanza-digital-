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
import {
  allowedPolicyReason,
  CONTACT_CONSENT_SCOPE,
  evaluatePolicy,
  POLICY_VERSION,
} from './policyEngine';
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

function validOptionalString(value: unknown, maxLength: number): boolean {
  return value === undefined ||
    (typeof value === 'string' && value.length <= maxLength);
}

function basicEnvelopeValidation(intent: IntentEnvelope | undefined): string | undefined {
  if (!intent || intent.schemaVersion !== CONTEXTOS_SCHEMA_VERSION) return 'INVALID_SCHEMA_VERSION';
  if (typeof intent.requestId !== 'string' || !intent.requestId.trim()) return 'REQUEST_ID_REQUIRED';
  if (intent.requestId.length > 128) return 'REQUEST_ID_TOO_LONG';
  if (!['orbe', 'web', 'api'].includes(intent.channel)) return 'CHANNEL_INVALID';
  if (!intent.actor || typeof intent.actor !== 'object' || intent.actor.type !== 'citizen') {
    return 'ACTOR_INVALID';
  }
  if (
    intent.actor.subjectId !== undefined &&
    (typeof intent.actor.subjectId !== 'string' || !intent.actor.subjectId.trim())
  ) {
    return 'ACTOR_SUBJECT_INVALID';
  }
  if (!intent.intent || typeof intent.intent !== 'object') return 'INTENT_INVALID';
  if (typeof intent.intent.name !== 'string' || !intent.intent.name.trim()) return 'INTENT_NAME_REQUIRED';
  if (!validOptionalString(intent.intent.subject, 128)) return 'INTENT_SUBJECT_INVALID';
  if (
    intent.intent.requestedCapability !== undefined &&
    !['INFORMATION', 'GUIDANCE', 'ACTION'].includes(intent.intent.requestedCapability)
  ) {
    return 'CAPABILITY_INVALID';
  }
  if (typeof intent.purpose !== 'string' || !intent.purpose.trim()) return 'PURPOSE_REQUIRED';
  if (
    !intent.jurisdiction ||
    typeof intent.jurisdiction !== 'object' ||
    intent.jurisdiction.country !== 'MX'
  ) {
    return 'JURISDICTION_REQUIRED';
  }

  const state = intent.jurisdiction.state;
  const municipality = intent.jurisdiction.municipality;
  if (
    (state !== undefined && (typeof state !== 'string' || !state.trim())) ||
    (municipality !== undefined && (typeof municipality !== 'string' || !municipality.trim())) ||
    (municipality !== undefined && state === undefined)
  ) {
    return 'JURISDICTION_REQUIRED';
  }

  if (!intent.data || typeof intent.data !== 'object' || Array.isArray(intent.data)) {
    return 'DATA_REQUIRED';
  }
  if (!validOptionalString(intent.data.description, 2_000)) return 'DESCRIPTION_INVALID';

  const location = intent.data.location;
  if (location !== undefined) {
    if (!location || typeof location !== 'object' || Array.isArray(location)) {
      return 'LOCATION_INVALID';
    }
    if (!validOptionalString(location.address, 200) || !validOptionalString(location.landmark, 200)) {
      return 'LOCATION_TEXT_INVALID';
    }
    if (
      (location.lat !== undefined && typeof location.lat !== 'number') ||
      (location.lng !== undefined && typeof location.lng !== 'number')
    ) {
      return 'LOCATION_COORDINATES_INVALID';
    }
  }

  const contact = intent.data.contact;
  if (contact !== undefined) {
    if (!contact || typeof contact !== 'object' || Array.isArray(contact)) {
      return 'CONTACT_INVALID';
    }
    if (
      !validOptionalString(contact.name, 160) ||
      !validOptionalString(contact.phone, 40) ||
      !validOptionalString(contact.email, 254)
    ) {
      return 'CONTACT_INVALID';
    }
  }

  const semanticFields = [
    intent.intent.semanticContractId,
    intent.intent.semanticContractVersion,
    intent.intent.semanticRegistryVersion,
  ];
  if (
    semanticFields.some(
      (value) =>
        value !== undefined &&
        (typeof value !== 'string' || !value.trim() || value.length > 160),
    )
  ) {
    return 'SEMANTIC_PROVENANCE_INVALID';
  }
  if (
    intent.intent.confidence !== undefined &&
    (!Number.isFinite(intent.intent.confidence) ||
      intent.intent.confidence < 0 ||
      intent.intent.confidence > 1)
  ) {
    return 'INTENT_CONFIDENCE_INVALID';
  }
  if (typeof intent.occurredAt !== 'string' || !Number.isFinite(Date.parse(intent.occurredAt))) {
    return 'OCCURRED_AT_INVALID';
  }
  return undefined;
}

function semanticProvenance(intent?: IntentEnvelope):
  | {
      contractId: string;
      contractVersion?: string;
      registryVersion?: string;
    }
  | undefined {
  const contractId = intent?.intent?.semanticContractId;
  if (!contractId) return undefined;
  return {
    contractId,
    contractVersion: intent.intent.semanticContractVersion,
    registryVersion: intent.intent.semanticRegistryVersion,
  };
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
    const correlationId =
      typeof request?.intent?.requestId === 'string' && request.intent.requestId
        ? request.intent.requestId
        : this.idFactory();
    const validationError = basicEnvelopeValidation(request?.intent);
    if (validationError) {
      const policy = invalidEnvelopePolicy(validationError);
      return {
        status: 'DENIED',
        correlationId,
        policy,
        evidence: createEvidenceRecord(
          {
            correlationId,
            policy,
            semantic: semanticProvenance(request?.intent),
          },
          { now: this.now, idFactory: this.idFactory },
        ),
      };
    }

    const fingerprint = sha256({ intent: request.intent, consent: request.consent });
    const completed = this.completedRequests.get(request.intent.requestId);
    if (completed) {
      if (completed.fingerprint === fingerprint) return structuredClone(completed.response);
      const policy = invalidEnvelopePolicy('IDEMPOTENCY_CONFLICT');
      return this.policyOnlyResponse('DENIED', correlationId, undefined, policy, request.intent);
    }
    const inFlight = this.inFlightRequests.get(request.intent.requestId);
    if (inFlight) {
      if (inFlight.fingerprint === fingerprint) return structuredClone(await inFlight.response);
      const policy = invalidEnvelopePolicy('IDEMPOTENCY_CONFLICT');
      return this.policyOnlyResponse('DENIED', correlationId, undefined, policy, request.intent);
    }

    const service = findServiceForIntent(
      request.intent.intent.name,
      request.intent.intent.requestedCapability,
    );
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
        return this.policyOnlyResponse(
          'NEEDS_CONSENT',
          correlationId,
          service,
          policy,
          request.intent,
        );
      }
      const reasonCodes = [allowedPolicyReason(service!), 'CONSENT_VALIDATED'];
      if (request.intent.intent.semanticContractId) {
        reasonCodes.push('SEMANTIC_CONTRACT_BOUND');
      }
      policy = {
        decision: 'ALLOW',
        policyVersion: policy.policyVersion,
        reasonCodes,
      };
      authorizedConsentScopes = [...requiredScopes];
    }

    if (policy.decision === 'REQUIRE_CLARIFICATION') {
      return this.policyOnlyResponse('NEEDS_INPUT', correlationId, service, policy, request.intent);
    }
    if (policy.decision === 'DENY' || !service) {
      return this.policyOnlyResponse('DENIED', correlationId, service, policy, request.intent);
    }

    if (service.capabilityKind !== 'ACTION') {
      return this.policyOnlyResponse('RESOLVED', correlationId, service, policy, request.intent);
    }

    const adapterId = service.adapterId;
    const executionMode = service.executionMode;
    if (!adapterId || !executionMode) {
      const invalidServicePolicy: PolicyDecision = {
        decision: 'DENY',
        policyVersion: policy.policyVersion,
        reasonCodes: ['SERVICE_EXECUTION_CONFIG_INVALID'],
      };
      return this.policyOnlyResponse(
        'ERROR',
        correlationId,
        service,
        invalidServicePolicy,
        request.intent,
      );
    }

    const adapter = this.adapters[adapterId];
    if (!adapter) {
      const unavailablePolicy: PolicyDecision = {
        decision: 'DENY',
        policyVersion: policy.policyVersion,
        reasonCodes: ['ADAPTER_NOT_REGISTERED'],
      };
      return this.policyOnlyResponse(
        'ERROR',
        correlationId,
        service,
        unavailablePolicy,
        request.intent,
      );
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
          executionMode,
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
          {
            correlationId,
            serviceId: service.id,
            semantic: semanticProvenance(request.intent),
            policy,
            execution,
          },
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
    intent?: IntentEnvelope,
  ): RuntimeResponse {
    return {
      status,
      correlationId,
      service,
      policy,
      evidence: createEvidenceRecord(
        {
          correlationId,
          serviceId: service?.id,
          semantic: semanticProvenance(intent),
          policy,
        },
        { now: this.now, idFactory: this.idFactory },
      ),
    };
  }
}
