export interface AiChatOptions {
  context?: string;
  useThinking?: boolean;
  useMaps?: boolean;
  useSearch?: boolean;
}

// Cliente único para /api/ai/chat — reemplaza los fetch duplicados en C5Dashboard, CitizenApp y SaludNayaritID.
export async function sendAiChat(message: string, opts: AiChatOptions = {}): Promise<string> {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, ...opts }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.response;
}
