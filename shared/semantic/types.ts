import type { RiskLevel } from '../../contextos/contracts';

export const SEMANTIC_REGISTRY_VERSION = 'orbe.semantic-registry.v0.1' as const;

export type SemanticSpeechAct =
  | 'ACTION_REQUEST'
  | 'INCIDENT_ASSERTION'
  | 'INFORMATION_REQUEST'
  | 'AMBIGUOUS'
  | 'OTHER';

export type SemanticRoute = 'CONTEXTOS' | 'CONFIRM_ACTION' | 'ASK_INTENT' | 'CHAT';

export interface SemanticSubjectDefinition {
  id: string;
  label: string;
  runtimeValue: string;
  patterns: string[];
}

export interface SemanticSpeechActDefinition {
  act: Exclude<SemanticSpeechAct, 'AMBIGUOUS' | 'OTHER'>;
  route: Exclude<SemanticRoute, 'ASK_INTENT'>;
  confidence: number;
  reasonCodes: string[];
  patterns: string[];
}

export interface SemanticSlotDefinition {
  path: string;
  required: boolean;
  source: 'utterance' | 'clarification' | 'consent';
}

export interface SemanticContract {
  id: string;
  version: string;
  registryVersion: typeof SEMANTIC_REGISTRY_VERSION;
  status: 'ACTIVE' | 'DRAFT' | 'DEPRECATED';
  domain: string;
  intentName: string;
  purpose: string;
  riskLevel: RiskLevel;
  jurisdiction: {
    country: 'MX';
    state: string;
    municipality: string;
  };
  subjects: SemanticSubjectDefinition[];
  speechActs: SemanticSpeechActDefinition[];
  slots: SemanticSlotDefinition[];
  deixis: {
    unresolvedLocationPatterns: string[];
    locationConnectorPatterns: string[];
  };
  confirmations: {
    affirmativePatterns: string[];
    negativePatterns: string[];
  };
  citizenMessages: {
    confirmAction: string;
    askIntent: string;
    informational: string;
  };
}
