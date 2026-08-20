import type { IntentEnvelope, PolicyDecision, ServiceDescriptor } from './contracts';
import { jurisdictionCode, PUBLIC_WORKS_REPORT_SERVICE } from './serviceCatalog';

export const POLICY_VERSION = 'contextos.policy.public-works.v0.2';
export const PUBLIC_WORKS_PURPOSE = PUBLIC_WORKS_REPORT_SERVICE.purpose;
export const CONTACT_CONSENT_SCOPE = 'citizen-contact:share-for-followup';
export const SUPPORTED_PUBLIC_WORKS_SUBJECTS = PUBLIC_WORKS_REPORT_SERVICE.allowedSubjects;

function coordinatesPresent(intent: IntentEnvelope): boolean {
  const location = intent.data.location;
  return Boolean(location && (location.lat !== undefined || location.lng !== undefined));
}

function coordinatesValid(intent: IntentEnvelope): boolean {
  const location = intent.data.location;
  if (!location) return false;
  return (
    Number.isFinite(location.lat) &&
    Number.isFinite(location.lng) &&
    Number(location.lat) >= -90 &&
    Number(location.lat) <= 90 &&
    Number(location.lng) >= -180 &&
    Number(location.lng) <= 180
  );
}

function hasLocation(intent: IntentEnvelope): boolean {
  const location = intent.data.location;
  if (!location) return false;
  return Boolean(
    coordinatesValid(intent) ||
    location.address?.trim() ||
    location.landmark?.trim(),
  );
}

function hasContact(intent: IntentEnvelope): boolean {
  const contact = intent.data.contact;
  return Boolean(
    contact && (contact.name?.trim() || contact.phone?.trim() || contact.email?.trim()),
  );
}

function readPath(value: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (!current || typeof current !== 'object') return undefined;
    return (current as Record<string, unknown>)[key];
  }, value);
}

function requiredFieldPresent(intent: IntentEnvelope, path: string): boolean {
  if (path === 'data.location') return hasLocation(intent);
  const value = readPath(intent, path);
  if (typeof value === 'string') {
    if (path === 'data.description') return value.trim().length >= 5;
    return value.trim().length > 0;
  }
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null;
}

function deny(reasonCode: string): PolicyDecision {
  return {
    decision: 'DENY',
    policyVersion: POLICY_VERSION,
    reasonCodes: [reasonCode],
  };
}

function semanticBindingError(
  intent: IntentEnvelope,
  service: ServiceDescriptor,
): string | undefined {
  const {
    semanticContractId,
    semanticContractVersion,
    semanticRegistryVersion,
  } = intent.intent;
  const anyProvenance = Boolean(
    semanticContractId || semanticContractVersion || semanticRegistryVersion,
  );
  if (intent.channel !== 'orbe' && !anyProvenance) return undefined;
  if (!semanticContractId || !semanticContractVersion || !semanticRegistryVersion) {
    return 'SEMANTIC_CONTRACT_REQUIRED';
  }
  if (semanticContractId !== service.semanticContractId) {
    return 'SEMANTIC_CONTRACT_MISMATCH';
  }
  if (semanticContractVersion !== service.semanticContractVersion) {
    return 'SEMANTIC_CONTRACT_VERSION_MISMATCH';
  }
  if (semanticRegistryVersion !== service.semanticRegistryVersion) {
    return 'SEMANTIC_REGISTRY_VERSION_MISMATCH';
  }
  return undefined;
}

export function evaluatePolicy(
  intent: IntentEnvelope,
  service?: ServiceDescriptor,
): PolicyDecision {
  if (!service) return deny('SERVICE_NOT_REGISTERED');

  const jurisdiction = jurisdictionCode(
    intent.jurisdiction.country,
    intent.jurisdiction.state,
    intent.jurisdiction.municipality,
  );
  if (!service.allowedJurisdictions.includes(jurisdiction)) {
    return deny('JURISDICTION_NOT_ALLOWED');
  }

  if (intent.purpose !== service.purpose) {
    return deny('PURPOSE_NOT_ALLOWED');
  }

  const semanticError = semanticBindingError(intent, service);
  if (semanticError) return deny(semanticError);

  if (coordinatesPresent(intent) && !coordinatesValid(intent)) {
    return {
      decision: 'REQUIRE_CLARIFICATION',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['LOCATION_COORDINATES_INVALID'],
      requiredFields: ['data.location'],
    };
  }

  const requiredFields = service.requiredFields.filter(
    (requiredPath) => !requiredFieldPresent(intent, requiredPath),
  );
  if (requiredFields.length > 0) {
    return {
      decision: 'REQUIRE_CLARIFICATION',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['MINIMUM_DATA_MISSING'],
      requiredFields,
    };
  }

  const subject = intent.intent.subject?.trim().toLowerCase();
  if (!subject || !service.allowedSubjects.includes(subject)) {
    return deny('SUBJECT_NOT_SUPPORTED');
  }

  if (hasContact(intent)) {
    return {
      decision: 'REQUIRE_CONSENT',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['PERSONAL_CONTACT_PRESENT'],
      requiredConsentScopes: [CONTACT_CONSENT_SCOPE],
    };
  }

  const reasonCodes = ['LOW_RISK_PUBLIC_REPORT', 'DATA_MINIMIZED'];
  if (intent.intent.semanticContractId) reasonCodes.push('SEMANTIC_CONTRACT_BOUND');
  return {
    decision: 'ALLOW',
    policyVersion: POLICY_VERSION,
    reasonCodes,
  };
}
