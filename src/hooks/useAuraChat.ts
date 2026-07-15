import { useCallback, useState } from 'react';

/**
 * Lógica compartida del asistente Aura: un solo lugar que sabe cómo
 * hablarle al backend (/api/ai/chat) y construir el contexto de página.
 *
 * Antes, cada vista (App Ciudadana, C5, Salud) tenía su propio fetch con
 * su propio truco distinto para "avisarle" a la IA dónde estaba el
 * usuario — algunas ni lo hacían. Ahora toda vista describe su propio
 * estado con getPageContext() y este hook arma la llamada de forma
 * consistente, usando el campo `context` que el servidor ya soporta.
 */

export interface AuraMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AuraAccion {
  tipo: string;
  args: Record<string, any>;
}

export interface UseAuraChatOptions {
  initialGreeting?: string;
  /** Describe en una frase qué está viendo el usuario ahora mismo. */
  getPageContext?: () => string;
  /** Se dispara con cada respuesta de Aura — útil para leerla en voz alta. */
  onReply?: (respuesta: string) => void;
  /**
   * Cuando el modelo decide ejecutar una función real (p. ej. registrar un
   * reporte), el servidor regresa la acción en vez de solo texto. Este
   * callback hace la escritura real (con la sesión de Firebase ya
   * autenticada del lado del cliente) y, si falla, puede regresar un
   * mensaje que reemplaza la confirmación optimista del servidor — nunca
   * se le dice al ciudadano que algo quedó registrado si en realidad no
   * se pudo guardar.
   */
  onAccion?: (accion: AuraAccion) => Promise<string | void> | string | void;
}

export interface SendMessageOptions {
  /** Contexto adicional específico de la vista (p. ej. protocolo de triage). */
  extraContext?: string;
  useThinking?: boolean;
  useMaps?: boolean;
  useSearch?: boolean;
  /** Ofrece a Aura la función real de registrar un reporte ciudadano — ver server.ts. */
  enableReportTool?: boolean;
}

export function useAuraChat({ initialGreeting, getPageContext, onReply, onAccion }: UseAuraChatOptions = {}) {
  const [messages, setMessages] = useState<AuraMessage[]>(
    initialGreeting ? [{ role: 'assistant', content: initialGreeting }] : []
  );
  const [isTyping, setIsTyping] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState(true);

  const resetGreeting = useCallback((greeting: string) => {
    setMessages([{ role: 'assistant', content: greeting }]);
  }, []);

  const sendMessage = useCallback(
    async (texto: string, opts: SendMessageOptions = {}) => {
      const userMsg = texto.trim();
      if (!userMsg) return;

      setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
      setIsTyping(true);

      try {
        const pageContext = getPageContext?.() ?? '';
        const context = [pageContext, opts.extraContext].filter(Boolean).join('\n\n') || undefined;

        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMsg,
            context,
            useThinking: opts.useThinking,
            useMaps: opts.useMaps,
            useSearch: opts.useSearch,
            enableReportTool: opts.enableReportTool,
          }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setIsOnlineMode(true);

        let contenidoFinal: string = data.response;
        if (data.accion && onAccion) {
          const resultado = await onAccion(data.accion);
          if (typeof resultado === 'string' && resultado) contenidoFinal = resultado;
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: contenidoFinal }]);
        onReply?.(contenidoFinal);
        return contenidoFinal;
      } catch (err) {
        setIsOnlineMode(false);
        const fallback =
          'No pude conectarme con el servidor en este momento. Puedes seguir navegando la plataforma mientras se restablece la conexión.';
        setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
        onReply?.(fallback);
        return undefined;
      } finally {
        setIsTyping(false);
      }
    },
    [getPageContext, onReply, onAccion]
  );

  return { messages, isTyping, isOnlineMode, sendMessage, resetGreeting, setMessages };
}
