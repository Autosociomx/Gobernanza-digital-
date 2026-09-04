import { useCallback, useRef, useState } from 'react';
import { processCitizenUtterance, INITIAL_BRIDGE_STATE, type BridgeState } from '../orbe/contextosBridge';
import { executeContextOS } from '../services/contextosRuntimeClient';
import { useAuraVoice } from './useAuraVoice';

export interface OrbeLabReceipt {
  evidenceId: string;
  sha256: string;
  policyVersion: string;
  status: string;
  executionMode?: string;
  labReference?: string;
}

export function useOrbeContextPilot() {
  const voice = useAuraVoice();
  const [bridgeState, setBridgeState] = useState<BridgeState>(INITIAL_BRIDGE_STATE);
  const [statusText, setStatusText] = useState(
    'Laboratorio ORBE + Context.OS. Sin efectos administrativos.',
  );
  const [isThinking, setIsThinking] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<OrbeLabReceipt | null>(null);
  const inFlightRef = useRef(false);

  const submit = useCallback(
    async (text: string) => {
      if (inFlightRef.current) return undefined;
      inFlightRef.current = true;
      setIsThinking(true);
      setHasError(false);
      setLastReceipt(null);
      try {
        const result = await processCitizenUtterance(bridgeState, text, executeContextOS);
        setBridgeState(result.state);
        setStatusText(result.citizenMessage);
        if (result.runtimeResponse?.evidence) {
          setLastReceipt({
            evidenceId: result.runtimeResponse.evidence.evidenceId,
            sha256: result.runtimeResponse.evidence.hash,
            policyVersion: result.runtimeResponse.policy.policyVersion,
            status: result.runtimeResponse.status,
            executionMode: result.runtimeResponse.execution?.executionMode,
            labReference: result.runtimeResponse.execution?.externalReference,
          });
        }
        voice.speak(result.citizenMessage);
        return result;
      } catch (error) {
        console.error('ORBE Context.OS LAB bridge error', error);
        setHasError(true);
        const safeMessage = 'No pude completar el flujo de laboratorio. No se realizó ninguna acción.';
        setStatusText(safeMessage);
        return undefined;
      } finally {
        inFlightRef.current = false;
        setIsThinking(false);
      }
    },
    [bridgeState, voice],
  );

  const startListening = useCallback(() => {
    voice.startListening(
      (text) => void submit(text),
      () => {
        setHasError(true);
        setStatusText('No pude capturar la voz. Usa la entrada de texto.');
      },
    );
  }, [submit, voice]);

  const reset = useCallback(() => {
    setBridgeState(INITIAL_BRIDGE_STATE);
    setHasError(false);
    setLastReceipt(null);
    setStatusText('Laboratorio ORBE + Context.OS. Sin efectos administrativos.');
  }, []);

  return {
    voice,
    bridgeState,
    statusText,
    isThinking,
    hasError,
    lastReceipt,
    submit,
    startListening,
    reset,
  };
}
