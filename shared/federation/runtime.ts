import type {
  CitizenIntent,
  IntentResolution,
  MunicipalityCatalog,
  MunicipalityService,
} from './types';

function normalize(value?: string) {
  return (value || '').trim().toLocaleLowerCase('es-MX');
}

function findLightingService(catalog: MunicipalityCatalog): MunicipalityService | undefined {
  return catalog.services.find((service) =>
    service.id === 'tepic.reporte_servicios_publicos' ||
    (service.family === 'servicios_publicos' && normalize(service.name).includes('luminaria')),
  );
}

export function resolveCitizenIntent(
  intent: CitizenIntent,
  catalog: MunicipalityCatalog,
): IntentResolution {
  if (!intent || !intent.action || !intent.subject || !intent.territory?.municipality) {
    return {
      status: 'INVALID_INTENT',
      identity_requirement: 'NONE_FOR_RESOLUTION',
      consent_required: [],
      official_effect: 'INFORMATION_ONLY',
      next_state: 'INVALID',
      reason: 'Faltan acción, asunto o municipio.',
    };
  }

  const municipality = normalize(intent.territory.municipality);
  const state = normalize(intent.territory.state || catalog.state);

  if (municipality !== normalize(catalog.municipality) || state !== normalize(catalog.state)) {
    return {
      status: 'UNSUPPORTED_TERRITORY',
      identity_requirement: 'NONE_FOR_RESOLUTION',
      consent_required: [],
      official_effect: 'INFORMATION_ONLY',
      next_state: 'NO_ROUTE',
      reason: `El catálogo cargado sólo cubre ${catalog.municipality}, ${catalog.state}.`,
    };
  }

  if (intent.action !== 'report' || normalize(intent.subject) !== 'public-lighting') {
    return {
      status: 'NO_ROUTE',
      identity_requirement: 'NONE_FOR_RESOLUTION',
      consent_required: [],
      official_effect: 'INFORMATION_ONLY',
      next_state: 'NO_ROUTE',
      reason: 'La versión 0.1 sólo enruta reportes de alumbrado público.',
    };
  }

  const service = findLightingService(catalog);
  if (!service) {
    return {
      status: 'NO_ROUTE',
      identity_requirement: 'NONE_FOR_RESOLUTION',
      consent_required: [],
      official_effect: 'INFORMATION_ONLY',
      next_state: 'NO_ROUTE',
      reason: 'El catálogo municipal no declara una capacidad compatible.',
    };
  }

  const consentRequired: string[] = [];
  if (typeof intent.details?.lat === 'number' || typeof intent.details?.lng === 'number') {
    consentRequired.push('location');
  }
  if (intent.details?.photo_ref) {
    consentRequired.push('photo');
  }

  return {
    status: 'ROUTE_FOUND',
    service_id: service.id,
    authority: service.authority,
    office: service.office,
    source_status: service.source_status,
    identity_requirement: 'EXTERNAL_SYSTEM_DECIDES',
    consent_required: consentRequired,
    integration: service.integration,
    official_effect: 'NONE_UNTIL_EXTERNAL_ACCEPTANCE',
    next_state: 'INSTITUTIONAL_HANDOFF_PENDING',
  };
}
