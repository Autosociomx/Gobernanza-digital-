import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Motor de voz de Aura — Web Speech API del navegador, sin dependencias
 * ni costo por uso. Soportado en Chrome, Edge y Safari; Firefox no
 * implementa reconocimiento de voz y se degrada a solo texto (isSupported
 * queda en false y la UI debe ocultar el botón de micrófono).
 *
 * El español mexicano (es-MX) es la única variante con voces confiables
 * en la mayoría de navegadores: cora y wixárika no tienen voz nativa, así
 * que el habla (entrada y salida) siempre usa es-MX aunque el texto de la
 * interfaz esté en otro idioma.
 */

const VOICE_LOCALE = 'es-MX';

function getSpeechRecognitionCtor(): any {
  if (typeof window === 'undefined') return undefined;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
}

// El TTS lee literalmente los símbolos de markdown ("asterisco asterisco").
// Se limpian antes de hablarlos; el texto visual en el chat conserva el markdown.
function paraVoz(texto: string): string {
  return texto
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/`{1,3}([^`]*)`{1,3}/g, '$1')
    .replace(/^[-•]\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

export function useAuraVoice() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const recognitionSupported = !!getSpeechRecognitionCtor();
  const isSupported = speechSupported && recognitionSupported;

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(
    (onResult: (texto: string) => void, onError?: () => void) => {
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) return;

      window.speechSynthesis?.cancel();

      const recognition = new Ctor();
      recognition.lang = VOICE_LOCALE;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const texto = event.results?.[0]?.[0]?.transcript ?? '';
        if (texto) onResult(texto);
      };
      recognition.onerror = () => {
        setIsListening(false);
        onError?.();
      };
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      try {
        recognition.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
        onError?.();
      }
    },
    []
  );

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((texto: string) => {
    if (!speechSupported || !texto) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(paraVoz(texto));
    utterance.lang = VOICE_LOCALE;
    utterance.rate = 1.02;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [speechSupported]);

  // Limpieza al desmontar: nunca dejar el micrófono abierto ni una voz sonando de fondo
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  return {
    isSupported,
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
