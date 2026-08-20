import { PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT } from './contracts/publicWorksReport';
import type { SemanticContract, SemanticSubjectDefinition } from './types';

const CONTRACTS: readonly SemanticContract[] = [PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT];
const REGEX_CACHE = new Map<string, RegExp>();

function compile(pattern: string): RegExp {
  const cached = REGEX_CACHE.get(pattern);
  if (cached) return cached;
  const compiled = new RegExp(pattern, 'i');
  REGEX_CACHE.set(pattern, compiled);
  return compiled;
}

export function matchesPatternSet(text: string, patterns: readonly string[]): boolean {
  return patterns.some((pattern) => compile(pattern).test(text));
}

export interface RegistryValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateSemanticRegistry(
  contracts: readonly SemanticContract[] = CONTRACTS,
): RegistryValidationResult {
  const errors: string[] = [];
  const ids = new Set<string>();
  const activeIntents = new Set<string>();

  for (const contract of contracts) {
    if (!contract.id.trim()) errors.push('CONTRACT_ID_REQUIRED');
    if (ids.has(contract.id)) errors.push(`DUPLICATE_CONTRACT_ID:${contract.id}`);
    ids.add(contract.id);

    if (contract.status === 'ACTIVE') {
      if (activeIntents.has(contract.intentName)) {
        errors.push(`DUPLICATE_ACTIVE_INTENT:${contract.intentName}`);
      }
      activeIntents.add(contract.intentName);
    }

    if (!contract.subjects.length) errors.push(`CONTRACT_WITHOUT_SUBJECTS:${contract.id}`);
    if (!contract.speechActs.length) errors.push(`CONTRACT_WITHOUT_SPEECH_ACTS:${contract.id}`);

    const subjectIds = new Set<string>();
    const runtimeValues = new Set<string>();
    for (const subject of contract.subjects) {
      if (subjectIds.has(subject.id)) {
        errors.push(`DUPLICATE_SUBJECT_ID:${contract.id}:${subject.id}`);
      }
      subjectIds.add(subject.id);
      if (!subject.runtimeValue.trim()) {
        errors.push(`SUBJECT_RUNTIME_VALUE_REQUIRED:${contract.id}:${subject.id}`);
      } else if (runtimeValues.has(subject.runtimeValue)) {
        errors.push(`DUPLICATE_SUBJECT_RUNTIME_VALUE:${contract.id}:${subject.runtimeValue}`);
      }
      runtimeValues.add(subject.runtimeValue);
    }

    const patterns = [
      ...contract.subjects.flatMap((subject) => subject.patterns),
      ...contract.speechActs.flatMap((definition) => definition.patterns),
      ...contract.deixis.unresolvedLocationPatterns,
      ...contract.deixis.locationConnectorPatterns,
      ...contract.confirmations.affirmativePatterns,
      ...contract.confirmations.negativePatterns,
    ];

    for (const pattern of patterns) {
      try {
        compile(pattern);
      } catch {
        errors.push(`INVALID_REGEX:${contract.id}:${pattern}`);
      }
    }

    for (const definition of contract.speechActs) {
      if (definition.confidence < 0 || definition.confidence > 1) {
        errors.push(`INVALID_CONFIDENCE:${contract.id}:${definition.act}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export const SEMANTIC_REGISTRY_HEALTH = validateSemanticRegistry();

if (!SEMANTIC_REGISTRY_HEALTH.valid) {
  throw new Error(
    `SEMANTIC_REGISTRY_INVALID:${SEMANTIC_REGISTRY_HEALTH.errors.join(',')}`,
  );
}

export function getSemanticContracts(
  options: { includeInactive?: boolean } = {},
): readonly SemanticContract[] {
  return options.includeInactive
    ? CONTRACTS
    : CONTRACTS.filter((contract) => contract.status === 'ACTIVE');
}

export function findSemanticContractByIntent(intentName: string): SemanticContract | undefined {
  return getSemanticContracts().find((contract) => contract.intentName === intentName);
}

export function findSemanticContractForText(
  normalizedText: string,
): { contract: SemanticContract; subject: SemanticSubjectDefinition } | undefined {
  for (const contract of getSemanticContracts()) {
    const subject = contract.subjects.find((candidate) =>
      matchesPatternSet(normalizedText, candidate.patterns),
    );
    if (subject) return { contract, subject };
  }
  return undefined;
}

export function interpolateCitizenMessage(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(
    /\{([a-zA-Z0-9_]+)\}/g,
    (_match, key: string) => values[key] ?? `{${key}}`,
  );
}
