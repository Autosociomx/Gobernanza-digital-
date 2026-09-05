import type { CapabilityKind, ServiceDescriptor } from './contracts';
import { BIRTH_CERTIFICATE_SEMANTIC_CONTRACT } from '../shared/semantic/contracts/birthCertificate';
import { PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT } from '../shared/semantic/contracts/publicWorksReport';

const PUBLIC_WORKS_SEMANTIC = PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT;
const BIRTH_CERTIFICATE_SEMANTIC = BIRTH_CERTIFICATE_SEMANTIC_CONTRACT;

export const PUBLIC_WORKS_REPORT_SERVICE: ServiceDescriptor = {
  id: 'mx.nay.tepic.public-works.report',
  version: '0.2.0',
  title: 'Reporte ciudadano de bache o luminaria',
  description: 'Vertical slice de laboratorio para reportes de infraestructura urbana de bajo riesgo.',
  intentNames: [PUBLIC_WORKS_SEMANTIC.intentName],
  purpose: PUBLIC_WORKS_SEMANTIC.purpose,
  semanticContractId: PUBLIC_WORKS_SEMANTIC.id,
  semanticContractVersion: PUBLIC_WORKS_SEMANTIC.version,
  semanticRegistryVersion: PUBLIC_WORKS_SEMANTIC.registryVersion,
  riskLevel: PUBLIC_WORKS_SEMANTIC.riskLevel,
  policyVersion: 'contextos.policy.public-works.v0.2',
  policyProfile: 'LOW_RISK_PUBLIC_REPORT',
  capabilityKind: 'ACTION',
  authorityLevel: 'LAB',
  requiresContactConsent: true,
  adapterId: 'lab.public-works-report.v1',
  executionMode: 'LAB_MOCK',
  allowedJurisdictions: [
    jurisdictionCode(
      PUBLIC_WORKS_SEMANTIC.jurisdiction.country,
      PUBLIC_WORKS_SEMANTIC.jurisdiction.state,
      PUBLIC_WORKS_SEMANTIC.jurisdiction.municipality,
    ),
  ],
  requiredFields: PUBLIC_WORKS_SEMANTIC.slots
    .filter((slot) => slot.required)
    .map((slot) => slot.path),
  allowedSubjects: PUBLIC_WORKS_SEMANTIC.subjects.map((subject) => subject.runtimeValue),
};

export const BIRTH_CERTIFICATE_INFORMATION_SERVICE: ServiceDescriptor = {
  id: 'mx.gov.civil-registry.birth-certificate.info',
  version: '0.1.0',
  title: 'Orientación sobre acta de nacimiento',
  description: 'Capacidad informativa nacional. No expide actas ni ejecuta actos administrativos.',
  intentNames: [BIRTH_CERTIFICATE_SEMANTIC.intentName],
  purpose: BIRTH_CERTIFICATE_SEMANTIC.purpose,
  semanticContractId: BIRTH_CERTIFICATE_SEMANTIC.id,
  semanticContractVersion: BIRTH_CERTIFICATE_SEMANTIC.version,
  semanticRegistryVersion: BIRTH_CERTIFICATE_SEMANTIC.registryVersion,
  riskLevel: BIRTH_CERTIFICATE_SEMANTIC.riskLevel,
  policyVersion: 'contextos.policy.public-information.v0.1',
  policyProfile: 'PUBLIC_INFORMATION',
  capabilityKind: 'INFORMATION',
  authorityLevel: 'NONE',
  requiresContactConsent: false,
  allowedJurisdictions: [
    jurisdictionCode(BIRTH_CERTIFICATE_SEMANTIC.jurisdiction.country),
  ],
  requiredFields: BIRTH_CERTIFICATE_SEMANTIC.slots
    .filter((slot) => slot.required)
    .map((slot) => slot.path),
  allowedSubjects: BIRTH_CERTIFICATE_SEMANTIC.subjects.map((subject) => subject.runtimeValue),
};

const SERVICES: readonly ServiceDescriptor[] = [
  PUBLIC_WORKS_REPORT_SERVICE,
  BIRTH_CERTIFICATE_INFORMATION_SERVICE,
];

export function getRegisteredServices(): readonly ServiceDescriptor[] {
  return SERVICES;
}

export function findServiceForIntent(
  intentName: string,
  requestedCapability?: CapabilityKind,
): ServiceDescriptor | undefined {
  return SERVICES.find(
    (service) =>
      service.intentNames.includes(intentName) &&
      (!requestedCapability || service.capabilityKind === requestedCapability),
  );
}

export function jurisdictionCode(country: string, state?: string, municipality?: string): string {
  return [country, state, municipality]
    .filter((part): part is string => typeof part === 'string' && Boolean(part.trim()))
    .map((part) => part.trim().toUpperCase().replace(/\s+/g, '-'))
    .join('-');
}
