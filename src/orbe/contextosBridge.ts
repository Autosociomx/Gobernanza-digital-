import type { IntentEnvelope, RuntimeRequest, RuntimeResponse } from '../../contextos/contracts';
import {
  buildPublicWorksIntentEnvelope,
  interpretCitizenUtterance,
  isAffirmative,
  isNegative,
  mergeLocationClarification,
  runtimeResponseToCitizenMessage,
  type MetalinguisticInterpretation,
} from './metalinguistics';

export type BridgePendingState =
  | { kind: 'CONFIRM_ACTION'; originalText: string; interpretation: MetalinguisticInterpretation }
  | { kind: 'LOCATION'; intent: IntentEnvelope }
  | null;

export interface BridgeState {
  pending: BridgePendingState;
}

export interface BridgeResult {
  state: BridgeState;
  route: 'CHAT' | 'CLARIFY' | 'RUNTIME' | 'CANCELLED' | 'ERROR';
  citizenMessage: string;
  runtimeResponse?: RuntimeResponse;
}

export type RuntimeExecutor = (request: RuntimeRequest) => Promise<RuntimeResponse>;

export const INITIAL_BRIDGE_STATE: BridgeState = { pending: null };

function subjectLabel(subject?: string): string {
  if (subject === 'pothole') return 'bache';
  if (subject === 'streetlight') return 'luminaria';
  return 'incidente';
}

async function sendToRuntime(
  intent: IntentEnvelope,
  executor: RuntimeExecutor,
): Promise<BridgeResult> {
  try {
    const runtimeResponse = await executor({ intent });
    const citizenMessage = runtimeResponseToCitizenMessage(runtimeResponse);
    const needsLocation =
      runtimeResponse.status === 'NEEDS_INPUT' &&
      runtimeResponse.policy.requiredFields?.includes('data.location');

    return {
      state: { pending: needsLocation ? { kind: 'LOCATION', intent } : null },
      route: 'RUNTIME',
      citizenMessage,
      runtimeResponse,
    };
  } catch {
    return {
      state: INITIAL_BRIDGE_STATE,
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
        state: INITIAL_BRIDGE_STATE,
        route: 'CANCELLED',
        citizenMessage: 'De acuerdo. No preparé ningún reporte.',
      };
    }
    if (!isAffirmative(text)) {
      return {
        state,
        route: 'CLARIFY',
        citizenMessage: 'Necesito una confirmación clara: sí para preparar el reporte de laboratorio o no para cancelar.',
      };
    }

    const intent = buildPublicWorksIntentEnvelope(
      state.pending.originalText,
      state.pending.interpretation,
    );
    return sendToRuntime(intent, executor);
  }

  if (state.pending?.kind === 'LOCATION') {
    if (isNegative(text)) {
      return {
        state: INITIAL_BRIDGE_STATE,
        route: 'CANCELLED',
        citizenMessage: 'De acuerdo. No completé ni envié el reporte de laboratorio.',
      };
    }
    return sendToRuntime(mergeLocationClarification(state.pending.intent, text), executor);
  }

  const interpretation = interpretCitizenUtterance(text);

  if (interpretation.route === 'CONTEXTOS') {
    return sendToRuntime(buildPublicWorksIntentEnvelope(text, interpretation), executor);
  }

  if (interpretation.route === 'CONFIRM_ACTION') {
    return {
      state: {
        pending: {
          kind: 'CONFIRM_ACTION',
          originalText: text,
          interpretation,
        },
      },
      route: 'CLARIFY',
      citizenMessage: `Detecté un posible reporte de ${subjectLabel(interpretation.subject)}, pero no me pediste ejecutarlo. ¿Quieres que prepare un reporte de laboratorio?`,
    };
  }

  if (interpretation.route === 'ASK_INTENT') {
    return {
      state,
      route: 'CLARIFY',
      citizenMessage: 'Entendí el tema, pero no tu intención. ¿Quieres información o quieres preparar un reporte de laboratorio?',
    };
  }

  return {
    state,
    route: 'CHAT',
    citizenMessage: 'Esto parece una consulta informativa. No ejecuté ninguna acción y debe continuar por el canal de orientación.',
  };
}
