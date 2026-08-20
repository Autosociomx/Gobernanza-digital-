import type { IntentEnvelope, RuntimeResponse } from '../../contextos/contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../../contextos/contracts';
import {
  findSemanticContractByIntent,
  findSemanticContractForText,
  interpolateCitizenMessage,
  matchesPatternSet,
} from '../../shared/semantic/registry';
import type {
  SemanticContract,
  SemanticRoute,
  SemanticSpeechAct,
} from '../../shared/semantic/types';

export type OrbeSpeechAct = SemanticSpeechAct;
export type PublicWorksSubject = 'pothole' | 'streetlight';
export type OrbeRoute = SemanticRoute;

export interface MetalinguisticInterpretation {
  speechAct: OrbeSpeechAct;
  route: OrbeRoute;
  domain?: string;
  subject?: PublicWorksSubject;
  confidence: number;
  reasonCodes: string[];
  contractId?: string;
  contractVersion?: string;
  intentName?: string;
}

export interface IntentBuildContext {
  subjectId?: string;
  authenticated?: boolean;
  now?: Date;
  requestId?: string;
}

export function normalizeCitizenText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,;:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function contractForInterpretation(
  interpretation: MetalinguisticInterpretation,
): SemanticContract | undefined {
  if (!interpretation.intentName) return undefined;
  const contract = findSemanticContractByIntent(interpretation.intentName);
  if (
    !contract ||
    interpretation.contractId !== contract.id ||
    interpretation.contractVersion !== contract.version
  ) {
    return undefined;
  }
  return contract;
}

function defaultContract(): SemanticContract {
  const contract = findSemanticContractByIntent('report_public_infrastructure_issue');
  if (!contract) throw new Error('PUBLIC_WORKS_SEMANTIC_CONTRACT_NOT_REGISTERED');
  return contract;
}

export function isAffirmative(
  text: string,
  contract: SemanticContract = defaultContract(),
): boolean {
  const normalized = normalizeCitizenText(text);
  return (
    !matchesPatternSet(normalized, contract.confirmations.negativePatterns) &&
    matchesPatternSet(normalized, contract.confirmations.affirmativePatterns)
  );
}

export function isNegative(
  text: string,
  contract: SemanticContract = defaultContract(),
): boolean {
  return matchesPatternSet(
    normalizeCitizenText(text),
    contract.confirmations.negativePatterns,
  );
}

export function interpretCitizenUtterance(text: string): MetalinguisticInterpretation {
  const normalized = normalizeCitizenText(text);
  const semanticMatch = findSemanticContractForText(normalized);

  if (!semanticMatch) {
    return {
      speechAct: 'OTHER',
      route: 'CHAT',
      confidence: 0.2,
      reasonCodes: ['SEMANTIC_CONTRACT_NOT_MATCHED'],
    };
  }

  const { contract, subject } = semanticMatch;
  const speechAct = contract.speechActs.find((definition) =>
    matchesPatternSet(normalized, definition.patterns),
  );

  if (speechAct) {
    return {
      speechAct: speechAct.act,
      route: speechAct.route,
      domain: contract.domain,
      subject: subject.id as PublicWorksSubject,
      confidence: speechAct.confidence,
      reasonCodes: [...speechAct.reasonCodes, 'SEMANTIC_CONTRACT_MATCHED'],
      contractId: contract.id,
      contractVersion: contract.version,
      intentName: contract.intentName,
    };
  }

  return {
    speechAct: 'AMBIGUOUS',
    route: 'ASK_INTENT',
    domain: contract.domain,
    subject: subject.id as PublicWorksSubject,
    confidence: 0.65,
    reasonCodes: ['SEMANTIC_CONTRACT_MATCHED', 'SPEECH_ACT_AMBIGUOUS'],
    contractId: contract.id,
    contractVersion: contract.version,
    intentName: contract.intentName,
  };
}

function extractLocation(
  text: string,
  contract: SemanticContract,
): IntentEnvelope['data']['location'] | undefined {
  const normalized = normalizeCitizenText(text);
  if (matchesPatternSet(normalized, contract.deixis.unresolvedLocationPatterns)) {
    return undefined;
  }

  for (const pattern of contract.deixis.locationConnectorPatterns) {
    const connector = new RegExp(pattern, 'i').exec(text.trim());
    if (!connector?.[1]) continue;
    const candidate = connector[1].trim().replace(/[.,;:!?]+$/, '');
    if (candidate.length >= 4 && candidate.length <= 120) {
      return { address: candidate };
    }
  }
  return undefined;
}

function createRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `orbe-${crypto.randomUUID()}`;
  }
  return `orbe-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function buildPublicWorksIntentEnvelope(
  text: string,
  interpretation: MetalinguisticInterpretation,
  context: IntentBuildContext = {},
): IntentEnvelope {
  const contract = contractForInterpretation(interpretation);
  const subject = contract?.subjects.find(
    (candidate) => candidate.id === interpretation.subject,
  );
  if (!contract || contract.domain !== 'public_works' || !subject) {
    throw new Error('PUBLIC_WORKS_INTERPRETATION_REQUIRED');
  }

  return {
    schemaVersion: CONTEXTOS_SCHEMA_VERSION,
    requestId: context.requestId ?? createRequestId(),
    occurredAt: (context.now ?? new Date()).toISOString(),
    channel: 'orbe',
    actor: {
      type: 'citizen',
      subjectId: context.subjectId,
      authenticated: context.authenticated ?? false,
    },
    jurisdiction: { ...contract.jurisdiction },
    intent: {
      name: contract.intentName,
      subject: subject.runtimeValue,
      confidence: interpretation.confidence,
      semanticContractId: contract.id,
      semanticContractVersion: contract.version,
      semanticRegistryVersion: contract.registryVersion,
    },
    purpose: contract.purpose,
    data: {
      description: text.trim(),
      location: extractLocation(text, contract),
    },
  };
}

export function mergeLocationClarification(
  intent: IntentEnvelope,
  text: string,
): IntentEnvelope {
  const trimmed = text.trim();
  if (trimmed.length < 4 || trimmed.length > 120) return intent;

  return {
    ...intent,
    data: {
      ...intent.data,
      location: { address: trimmed },
    },
  };
}

export function semanticCitizenMessage(
  interpretation: MetalinguisticInterpretation,
  kind: 'confirmAction' | 'askIntent' | 'informational',
): string {
  const contract = contractForInterpretation(interpretation);
  if (!contract) {
    if (kind === 'askIntent') {
      return 'Entendí el tema, pero no tu intención. ¿Quieres información o iniciar una acción de laboratorio?';
    }
    if (kind === 'confirmAction') {
      return 'Detecté un posible incidente, pero no una solicitud explícita. ¿Quieres continuar en modo laboratorio?';
    }
    return 'Esto parece una consulta informativa. No ejecuté ninguna acción.';
  }

  const subject = contract.subjects.find(
    (candidate) => candidate.id === interpretation.subject,
  );
  return interpolateCitizenMessage(contract.citizenMessages[kind], {
    subject: subject?.label ?? 'incidente',
  });
}

export function runtimeResponseToCitizenMessage(response: RuntimeResponse): string {
  if (response.status === 'EXECUTED') {
    const ref = response.execution?.externalReference
      ? ` Folio de laboratorio: ${response.execution.externalReference}.`
      : '';
    return `Preparé el reporte en modo laboratorio.${ref} No es una orden municipal oficial ni produce efectos administrativos.`;
  }

  if (response.status === 'NEEDS_INPUT') {
    const fields = response.policy.requiredFields ?? [];
    if (fields.includes('data.location')) {
      return 'Para continuar necesito una ubicación concreta: calle, cruce, número aproximado o punto de referencia verificable.';
    }
    if (fields.includes('data.description')) {
      return 'Necesito una descripción breve del problema antes de preparar el reporte.';
    }
    return 'Necesito un dato adicional antes de continuar.';
  }

  if (response.status === 'NEEDS_CONSENT') {
    return 'Detecté datos personales de contacto. Necesito consentimiento explícito antes de compartirlos para seguimiento.';
  }

  if (response.status === 'DENIED') {
    return 'No puedo ejecutar esa acción con el alcance actual. No realicé ningún cambio ni generé un acto administrativo.';
  }

  return 'No pude completar el flujo de Context.OS. No se realizó ninguna acción.';
}
