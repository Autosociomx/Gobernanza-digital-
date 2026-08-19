import type { ServiceDescriptor } from './contracts';

export const PUBLIC_WORKS_REPORT_SERVICE: ServiceDescriptor = {
  id: 'mx.nay.tepic.public-works.report',
  version: '0.1.0',
  title: 'Reporte ciudadano de bache o luminaria',
  description: 'Vertical slice de laboratorio para reportes de infraestructura urbana de bajo riesgo.',
  intentNames: ['report_public_infrastructure_issue'],
  riskLevel: 'LOW',
  adapterId: 'lab.public-works-report.v1',
  executionMode: 'LAB_MOCK',
  allowedJurisdictions: ['MX-NAY-TEPIC'],
  requiredFields: ['data.description', 'data.location'],
};

const SERVICES = [PUBLIC_WORKS_REPORT_SERVICE] as const;

export function findServiceForIntent(intentName: string): ServiceDescriptor | undefined {
  return SERVICES.find((service) => service.intentNames.includes(intentName));
}

export function jurisdictionCode(country: string, state: string, municipality: string): string {
  return [country, state, municipality]
    .map((part) => part.trim().toUpperCase().replace(/\s+/g, '-'))
    .join('-');
}
