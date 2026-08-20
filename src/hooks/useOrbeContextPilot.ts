import { useCallback, useRef, useState } from 'react';
import { processCitizenUtterance, INITIAL_BRIDGE_STATE, type BridgeState } from '../orbe/contextosBridge';
import { executeContextOS } from '../services/contextosRuntimeClient';
import { useAuraVoice } from './useAuraVoice';

export function useOrbeContextPilot() {
  const voice = useAuraVoice();
  const [bridgeState, setBridgeState] = useState<BridgeState>(INITIAL_BRIDGE_STATE);
  const [statusText, setStatusText] = useState(
    'Laboratorio ORBE + Context.OS. Sin efectos administrativos.',
  );
  const [isThinking, setIsThinking] = useState(false);
  const [hasError, setHasError] = useState(false);
  const inFlightRef = useRef(false);

  const submit = useCallback(
    async (text: string) => {
      if (inFlightRef.current) return undefined;
      inFlightRef.current = true;
      setIsThinking(true);
      setHasError(false);
      try {
        const result = await processCitizenUtterance(bridgeState, text, executeContextOS);
        setBridgeState(result.state);
        setStatusText(result.citizenMessage);
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
    setStatusText('Laboratorio ORBE + Context.OS. Sin efectos administrativos.');
  }, []);

  return {
    voice,
    bridgeState,
    statusText,
    isThinking,
    hasError,
    submit,
    startListening,
    reset,
  };
}
