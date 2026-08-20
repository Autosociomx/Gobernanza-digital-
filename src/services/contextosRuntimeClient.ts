import type { RuntimeRequest, RuntimeResponse } from '../../contextos/contracts';
import { CONTEXTOS_SCHEMA_VERSION } from '../../contextos/contracts';

const RUNTIME_TIMEOUT_MS = 10_000;
const RUNTIME_STATUSES = new Set(['EXECUTED', 'NEEDS_INPUT', 'NEEDS_CONSENT', 'DENIED', 'ERROR']);
const POLICY_DECISIONS = new Set(['ALLOW', 'DENY', 'REQUIRE_CLARIFICATION', 'REQUIRE_CONSENT']);

function getRuntimeBaseUrl(): string {
  const env = (import.meta as any).env ?? {};
  return (env.VITE_CONTEXTOS_RUNTIME_URL || 'http://127.0.0.1:3011').replace(/\/$/, '');
}

function isRuntimeResponse(value: unknown): value is RuntimeResponse {
  if (!value || typeof value !== 'object') return false;
  const body = value as Record<string, any>;
  if (!RUNTIME_STATUSES.has(body.status) || typeof body.correlationId !== 'string') return false;
  if (!body.policy || !POLICY_DECISIONS.has(body.policy.decision) || !Array.isArray(body.policy.reasonCodes)) {
    return false;
  }
  if (
    !body.evidence ||
    body.evidence.schemaVersion !== CONTEXTOS_SCHEMA_VERSION ||
    body.evidence.correlationId !== body.correlationId ||
    body.evidence.integrityAssurance !== 'CHECKSUM_ONLY'
  ) {
    return false;
  }
  if (body.execution && body.execution.executionMode !== 'LAB_MOCK') return false;
  if (body.status === 'EXECUTED' && body.execution?.executionMode !== 'LAB_MOCK') return false;
  return true;
}

export function isContextOSBridgeEnabled(): boolean {
  const env = (import.meta as any).env ?? {};
  return env.VITE_CONTEXTOS_BRIDGE_ENABLED === 'true';
}

export async function executeContextOS(request: RuntimeRequest): Promise<RuntimeResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RUNTIME_TIMEOUT_MS);

  try {
    const response = await fetch(`${getRuntimeBaseUrl()}/api/contextos/v0.1/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      throw new Error(`CONTEXTOS_RESPONSE_NOT_JSON_${response.status}`);
    }

    const body: unknown = await response.json();

    // NEEDS_INPUT / NEEDS_CONSENT / DENIED son respuestas de dominio válidas,
    // aunque el laboratorio use 422/403 para hacerlas visibles por HTTP.
    if (isRuntimeResponse(body)) return body;

    const error =
      body && typeof body === 'object' && typeof (body as Record<string, unknown>).error === 'string'
        ? (body as Record<string, string>).error
        : `CONTEXTOS_HTTP_${response.status}`;
    throw new Error(error);
  } finally {
    clearTimeout(timeout);
  }
}
