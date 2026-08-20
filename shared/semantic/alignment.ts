import { getRegisteredServices, jurisdictionCode } from '../../contextos/serviceCatalog';
import { getSemanticContracts } from './registry';
import type { SemanticContract } from './types';

export interface SemanticRuntimeAlignmentResult {
  valid: boolean;
  errors: string[];
  checkedContracts: number;
}

function requiredSemanticSlots(contract: SemanticContract): string[] {
  return contract.slots
    .filter((slot) => slot.required)
    .map((slot) => slot.path)
    .sort();
}

export function auditSemanticRuntimeAlignment(): SemanticRuntimeAlignmentResult {
  const errors: string[] = [];
  const services = getRegisteredServices();
  const contracts = getSemanticContracts();

  for (const contract of contracts) {
    const candidates = services.filter((service) =>
      service.intentNames.includes(contract.intentName),
    );

    if (candidates.length === 0) {
      errors.push(`NO_RUNTIME_SERVICE_FOR_INTENT:${contract.intentName}`);
      continue;
    }
    if (candidates.length > 1) {
      errors.push(`AMBIGUOUS_RUNTIME_SERVICE_FOR_INTENT:${contract.intentName}`);
      continue;
    }

    const service = candidates[0];
    if (service.semanticContractId !== contract.id) {
      errors.push(`SEMANTIC_CONTRACT_ID_DRIFT:${contract.id}:${service.id}`);
    }
    if (service.semanticContractVersion !== contract.version) {
      errors.push(`SEMANTIC_CONTRACT_VERSION_DRIFT:${contract.id}:${service.id}`);
    }
    if (service.semanticRegistryVersion !== contract.registryVersion) {
      errors.push(`SEMANTIC_REGISTRY_VERSION_DRIFT:${contract.id}:${service.id}`);
    }
    if (service.purpose !== contract.purpose) {
      errors.push(`PURPOSE_DRIFT:${contract.id}:${service.id}`);
    }
    if (service.riskLevel !== contract.riskLevel) {
      errors.push(`RISK_DRIFT:${contract.id}:${service.id}`);
    }

    const jurisdiction = jurisdictionCode(
      contract.jurisdiction.country,
      contract.jurisdiction.state,
      contract.jurisdiction.municipality,
    );
    if (!service.allowedJurisdictions.includes(jurisdiction)) {
      errors.push(`JURISDICTION_DRIFT:${contract.id}:${service.id}:${jurisdiction}`);
    }

    const semanticSlots = requiredSemanticSlots(contract);
    const runtimeSlots = [...service.requiredFields].sort();
    if (semanticSlots.join('|') !== runtimeSlots.join('|')) {
      errors.push(`REQUIRED_FIELDS_DRIFT:${contract.id}:${service.id}`);
    }

    const semanticSubjects = contract.subjects.map((subject) => subject.runtimeValue).sort();
    const runtimeSubjects = [...service.allowedSubjects].sort();
    if (semanticSubjects.join('|') !== runtimeSubjects.join('|')) {
      errors.push(`ALLOWED_SUBJECTS_DRIFT:${contract.id}:${service.id}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    checkedContracts: contracts.length,
  };
}
