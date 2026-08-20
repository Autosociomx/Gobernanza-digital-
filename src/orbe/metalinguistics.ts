import type { IntentEnvelope, RuntimeResponse } from '../../contextos/contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../../contextos/contracts';

export type OrbeSpeechAct =
  | 'ACTION_REQUEST'
  | 'INCIDENT_ASSERTION'
  | 'INFORMATION_REQUEST'
  | 'AMBIGUOUS'
  | 'OTHER';

export type PublicWorksSubject = 'pothole' | 'streetlight';
export type OrbeRoute = 'CONTEXTOS' | 'CONFIRM_ACTION' | 'ASK_INTENT' | 'CHAT';

export interface MetalinguisticInterpretation {
  speechAct: OrbeSpeechAct;
  route: OrbeRoute;
  domain?: 'public_works';
  subject?: PublicWorksSubject;
  confidence: number;
  reasonCodes: string[];
}

export interface IntentBuildContext {
  subjectId?: string;
  authenticated?: boolean;
  now?: Date;
  requestId?: string;
}

const INFORMATION_PATTERNS = [
  /\bcomo\s+(puedo\s+)?report(ar|o)\b/,
  /\bdonde\s+(puedo\s+)?report(ar|o)\b/,
  /\bque\s+(necesito|requisitos?)\b/,
  /\bquiero\s+saber\b/,
  /\bme\s+puedes\s+decir\b/,
  /\bcual\s+es\s+el\s+proceso\b/,
];

const ACTION_PATTERNS = [
  /\bquiero\s+reportar\b/,
  /\bnecesito\s+reportar\b/,
  /\bvengo\s+a\s+reportar\b/,
  /\breporta(r)?\b/,
  /\bregistra(r)?\s+(este|un|una)?\s*reporte\b/,
];

const INCIDENT_PATTERNS = [
  /\bhay\s+(un|una)\b/,
  /\bno\s+(sirve|funciona|prende|enciende)\b/,
  /\besta\s+(apagada|apagado|rota|roto|fundida|fundido)\b/,
  /\bse\s+(fundio|rompio|cayo)\b/,
];

const AFFIRMATIVE_PATTERNS = [/^si\b/, /^sí\b/, /\badelante\b/, /\bconfirmo\b/, /\bhazlo\b/, /\bquiero\b/];
const NEGATIVE_PATTERNS = [/^no\b/, /\bcancela\b/, /\bmejor\s+no\b/];

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,;:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectSubject(normalized: string): PublicWorksSubject | undefined {
  if (/\b(bache|baches|hoyo|hoyos|pavimento\s+roto)\b/.test(normalized)) return 'pothole';
  if (/\b(luminaria|luminarias|lampara|lamparas|alumbrado|poste\s+de\s+luz|luz\s+de\s+la\s+calle)\b/.test(normalized)) {
    return 'streetlight';
  }
  return undefined;
}

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text));
}

export function isAffirmative(text: string): boolean {
  return matchesAny(normalize(text), AFFIRMATIVE_PATTERNS);
}

export function isNegative(text: string): boolean {
  return matchesAny(normalize(text), NEGATIVE_PATTERNS);
}

export function interpretCitizenUtterance(text: string): MetalinguisticInterpretation {
  const normalized = normalize(text);
  const subject = detectSubject(normalized);

  if (!subject) {
    return {
      speechAct: 'OTHER',
      route: 'CHAT',
      confidence: 0.2,
      reasonCodes: ['PUBLIC_WORKS_SUBJECT_NOT_DETECTED'],
    };
  }

  if (matchesAny(normalized, INFORMATION_PATTERNS)) {
    return {
      speechAct: 'INFORMATION_REQUEST',
      route: 'CHAT',
      domain: 'public_works',
      subject,
      confidence: 0.96,
      reasonCodes: ['INFORMATIONAL_SPEECH_ACT', 'NO_EXECUTION_IMPLIED'],
    };
  }

  if (matchesAny(normalized, ACTION_PATTERNS)) {
    return {
      speechAct: 'ACTION_REQUEST',
      route: 'CONTEXTOS',
      domain: 'public_works',
      subject,
      confidence: 0.97,
      reasonCodes: ['EXPLICIT_ACTION_REQUEST', 'PUBLIC_WORKS_SUBJECT_DETECTED'],
    };
  }

  if (matchesAny(normalized, INCIDENT_PATTERNS)) {
    return {
      speechAct: 'INCIDENT_ASSERTION',
      route: 'CONFIRM_ACTION',
      domain: 'public_works',
      subject,
      confidence: 0.9,
      reasonCodes: ['INCIDENT_ASSERTED', 'ACTION_NOT_EXPLICIT'],
    };
  }

  return {
    speechAct: 'AMBIGUOUS',
    route: 'ASK_INTENT',
    domain: 'public_works',
    subject,
    confidence: 0.65,
    reasonCodes: ['PUBLIC_WORKS_SUBJECT_DETECTED', 'SPEECH_ACT_AMBIGUOUS'],
  };
}

function extractLocation(text: string): IntentEnvelope['data']['location'] | undefined {
  const normalized = normalize(text);

  // Expresiones deícticas como "aquí", "afuera de mi casa" o "por mi casa"
  // no identifican una ubicación verificable y no deben convertirse en dirección.
  if (/\b(aqui|aca|afuera\s+de\s+mi\s+casa|por\s+mi\s+casa|cerca\s+de\s+mi\s+casa)\b/.test(normalized)) {
    return undefined;
  }

  const connector = /\b(?:en|sobre|frente\s+a|esquina\s+de|por)\s+(.{4,120})$/i.exec(text.trim());
  if (!connector?.[1]) return undefined;

  const candidate = connector[1].trim().replace(/[.,;:!?]+$/, '');
  if (candidate.length < 4) return undefined;

  return { address: candidate };
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
  if (interpretation.domain !== 'public_works' || !interpretation.subject) {
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
    jurisdiction: {
      country: 'MX',
      state: 'NAY',
      municipality: 'TEPIC',
    },
    intent: {
      name: 'report_public_infrastructure_issue',
      subject: interpretation.subject,
      confidence: interpretation.confidence,
    },
    purpose: 'report_public_infrastructure_issue',
    data: {
      description: text.trim(),
      location: extractLocation(text),
    },
  };
}

export function mergeLocationClarification(intent: IntentEnvelope, text: string): IntentEnvelope {
  const trimmed = text.trim();
  if (trimmed.length < 4) return intent;

  return {
    ...intent,
    requestId: createRequestId(),
    occurredAt: new Date().toISOString(),
    data: {
      ...intent.data,
      location: { address: trimmed },
    },
  };
}

export function runtimeResponseToCitizenMessage(response: RuntimeResponse): string {
  if (response.status === 'EXECUTED') {
    const ref = response.execution?.externalReference ? ` Folio de laboratorio: ${response.execution.externalReference}.` : '';
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
