import type { RuntimeRequest, RuntimeResponse } from '../../contextos/contracts';

function getRuntimeBaseUrl(): string {
  const env = (import.meta as any).env ?? {};
  return (env.VITE_CONTEXTOS_RUNTIME_URL || 'http://127.0.0.1:3011').replace(/\/$/, '');
}

export function isContextOSBridgeEnabled(): boolean {
  const env = (import.meta as any).env ?? {};
  return env.VITE_CONTEXTOS_BRIDGE_ENABLED === 'true';
}

export async function executeContextOS(request: RuntimeRequest): Promise<RuntimeResponse> {
  const response = await fetch(`${getRuntimeBaseUrl()}/api/contextos/v0.1/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const body = await response.json();

  // NEEDS_INPUT / NEEDS_CONSENT / DENIED son respuestas de dominio válidas,
  // aunque el laboratorio use 422/403 para hacerlas visibles por HTTP.
  if (body?.status && body?.policy && body?.evidence) {
    return body as RuntimeResponse;
  }

  throw new Error(body?.error || `CONTEXTOS_HTTP_${response.status}`);
}
