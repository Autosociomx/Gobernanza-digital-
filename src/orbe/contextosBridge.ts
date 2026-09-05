import type { IntentEnvelope, RuntimeRequest, RuntimeResponse } from '../../contextos/contracts';
import {
  buildCapabilityEscalationIntent,
  buildIntentEnvelope,
  interpretCitizenUtterance,
  isActionFollowUp,
  isAffirmative,
  isNegative,
  mergeLocationClarification,
  runtimeResponseToCitizenMessage,
  semanticCitizenMessage,
  type MetalinguisticInterpretation,
} from './metalinguistics';

export type BridgePendingState =
  | { kind: 'CONFIRM_ACTION'; originalText: string; interpretation: MetalinguisticInterpretation }
  | { kind: 'LOCATION'; intent: IntentEnvelope }
  | null;

export interface BridgeState {
  pending: BridgePendingState;
  lastResolvedIntent?: IntentEnvelope;
}

export interface BridgeResult {
  state: BridgeState;
  route: 'CHAT' | 'CLARIFY' | 'RUNTIME' | 'CANCELLED' | 'ERROR';
  citizenMessage: string;
  runtimeResponse?: RuntimeResponse;
}

export type RuntimeExecutor = (request: RuntimeRequest) => Promise<RuntimeResponse>;

export const INITIAL_BRIDGE_STATE: BridgeState = { pending: null };

async function sendToRuntime(
  intent: IntentEnvelope,
  executor: RuntimeExecutor,
  previousState: BridgeState = INITIAL_BRIDGE_STATE,
): Promise<BridgeResult> {
  try {
    const runtimeResponse = await executor({ intent });
    const citizenMessage = runtimeResponseToCitizenMessage(runtimeResponse);
    const needsLocation =
      runtimeResponse.status === 'NEEDS_INPUT' &&
      runtimeResponse.policy.requiredFields?.includes('data.location');
    const lastResolvedIntent =
      runtimeResponse.status === 'RESOLVED'
        ? intent
        : previousState.lastResolvedIntent;

    return {
      state: {
        pending: needsLocation ? { kind: 'LOCATION', intent } : null,
        lastResolvedIntent,
      },
      route: 'RUNTIME',
      citizenMessage,
      runtimeResponse,
    };
  } catch {
    return {
      state: previousState,
      route: 'ERROR',
      citizenMessage: 'No pude contactar Context.OS. No se realizó ninguna acción.',
    };
  }
}

export async function processCitizenUtterance(
  state: BridgeState,
  rawText: string,
  executor: RuntimeExecutor,
): Promise<BridgeResult> {
  const text = rawText.trim();
  if (!text) {
    return {
      state,
      route: 'CLARIFY',
      citizenMessage: 'Necesito que expreses tu solicitud para poder continuar.',
    };
  }

  if (state.pending?.kind === 'CONFIRM_ACTION') {
    if (isNegative(text)) {
      return {
        state: { pending: null, lastResolvedIntent: state.lastResolvedIntent },
        route: 'CANCELLED',
        citizenMessage: 'De acuerdo. No preparé ninguna acción.',
      };
    }
    if (!isAffirmative(text)) {
      return {
        state,
        route: 'CLARIFY',
        citizenMessage: 'Necesito una confirmación clara: sí para continuar o no para cancelar.',
      };
    }

    const intent = buildIntentEnvelope(
      state.pending.originalText,
      state.pending.interpretation,
    );
    return sendToRuntime(intent, executor, state);
  }

  if (state.pending?.kind === 'LOCATION') {
    if (isNegative(text)) {
      return {
        state: { pending: null, lastResolvedIntent: state.lastResolvedIntent },
        route: 'CANCELLED',
        citizenMessage: 'De acuerdo. No completé ni envié el reporte de laboratorio.',
      };
    }
    return sendToRuntime(mergeLocationClarification(state.pending.intent, text), executor, state);
  }

  const interpretation = interpretCitizenUtterance(text);

  if (
    interpretation.route === 'CHAT' &&
    interpretation.speechAct === 'OTHER' &&
    state.lastResolvedIntent &&
    isActionFollowUp(text)
  ) {
    return sendToRuntime(
      buildCapabilityEscalationIntent(state.lastResolvedIntent, text),
      executor,
      state,
    );
  }

  if (interpretation.route === 'CONTEXTOS') {
    return sendToRuntime(buildIntentEnvelope(text, interpretation), executor, state);
  }

  if (interpretation.route === 'CONFIRM_ACTION') {
    return {
      state: {
        pending: {
          kind: 'CONFIRM_ACTION',
          originalText: text,
          interpretation,
        },
        lastResolvedIntent: state.lastResolvedIntent,
      },
      route: 'CLARIFY',
      citizenMessage: semanticCitizenMessage(interpretation, 'confirmAction'),
    };
  }

  if (interpretation.route === 'ASK_INTENT') {
    return {
      state,
      route: 'CLARIFY',
      citizenMessage: semanticCitizenMessage(interpretation, 'askIntent'),
    };
  }

  return {
    state,
    route: 'CHAT',
    citizenMessage: semanticCitizenMessage(interpretation, 'informational'),
  };
}
