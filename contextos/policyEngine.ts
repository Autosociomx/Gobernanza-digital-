import type { IntentEnvelope, PolicyDecision, ServiceDescriptor } from './contracts';
import { jurisdictionCode } from './serviceCatalog';

export const POLICY_VERSION = 'contextos.policy.public-works.v0.1';
export const PUBLIC_WORKS_PURPOSE = 'report_public_infrastructure_issue';
export const CONTACT_CONSENT_SCOPE = 'citizen-contact:share-for-followup';

function hasLocation(intent: IntentEnvelope): boolean {
  const location = intent.data.location;
  if (!location) return false;
  const coordinatesPresent = Number.isFinite(location.lat) && Number.isFinite(location.lng);
  const textPresent = Boolean(location.address?.trim() || location.landmark?.trim());
  return coordinatesPresent || textPresent;
}

function hasContact(intent: IntentEnvelope): boolean {
  const contact = intent.data.contact;
  return Boolean(contact && (contact.name?.trim() || contact.phone?.trim() || contact.email?.trim()));
}

export function evaluatePolicy(intent: IntentEnvelope, service?: ServiceDescriptor): PolicyDecision {
  if (!service) {
    return {
      decision: 'DENY',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['SERVICE_NOT_REGISTERED'],
    };
  }

  const jurisdiction = jurisdictionCode(
    intent.jurisdiction.country,
    intent.jurisdiction.state,
    intent.jurisdiction.municipality,
  );
  if (!service.allowedJurisdictions.includes(jurisdiction)) {
    return {
      decision: 'DENY',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['JURISDICTION_NOT_ALLOWED'],
    };
  }

  if (intent.purpose !== PUBLIC_WORKS_PURPOSE) {
    return {
      decision: 'DENY',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['PURPOSE_NOT_ALLOWED'],
    };
  }

  const requiredFields: string[] = [];
  if (!intent.data.description || intent.data.description.trim().length < 5) {
    requiredFields.push('data.description');
  }
  if (!hasLocation(intent)) {
    requiredFields.push('data.location');
  }
  if (requiredFields.length > 0) {
    return {
      decision: 'REQUIRE_CLARIFICATION',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['MINIMUM_DATA_MISSING'],
      requiredFields,
    };
  }

  if (hasContact(intent)) {
    return {
      decision: 'REQUIRE_CONSENT',
      policyVersion: POLICY_VERSION,
      reasonCodes: ['PERSONAL_CONTACT_PRESENT'],
      requiredConsentScopes: [CONTACT_CONSENT_SCOPE],
    };
  }

  return {
    decision: 'ALLOW',
    policyVersion: POLICY_VERSION,
    reasonCodes: ['LOW_RISK_PUBLIC_REPORT', 'DATA_MINIMIZED'],
  };
}
