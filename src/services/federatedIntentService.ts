import { tepicCatalog } from '../../shared/federation/catalog';
import { resolveCitizenIntent } from '../../shared/federation/runtime';
import type {
  CitizenIntent,
  FederatedResolutionResponse,
} from '../../shared/federation/types';

export interface LightingReportInput {
  description: string;
  lat?: number;
  lng?: number;
}

function buildLightingIntent(input: LightingReportInput): CitizenIntent {
  return {
    action: 'report',
    subject: 'public-lighting',
    territory: {
      municipality: 'Tepic',
      state: 'Nayarit',
      country: 'MX',
    },
    details: input,
  };
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function resolveLocally(intent: CitizenIntent): Promise<FederatedResolutionResponse> {
  const intentId = intent.intent_id || crypto.randomUUID();
  const resolution = resolveCitizenIntent({ ...intent, intent_id: intentId }, tepicCatalog);
  const createdAt = new Date().toISOString();
  const evidencePayload = {
    intent_id: intentId,
    event_type: 'INTENT_RESOLVED',
    created_at: createdAt,
    resolution,
  };
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(evidencePayload)),
  );
  const payloadHash = bytesToHex(new Uint8Array(digest));
  const response: FederatedResolutionResponse = {
    intent_id: intentId,
    resolution,
    receipt: {
      receipt_id: crypto.randomUUID(),
      intent_id: intentId,
      event_type: 'INTENT_RESOLVED',
      created_at: createdAt,
      payload_hash: payloadHash,
      previous_hash: null,
    },
  };

  localStorage.setItem(`federation.receipts.${intentId}`, JSON.stringify([response.receipt]));
  return response;
}

export async function resolveLightingReport(
  input: LightingReportInput,
): Promise<FederatedResolutionResponse> {
  const intent = buildLightingIntent(input);

  try {
    const response = await fetch('/api/federation/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(intent),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return resolveLocally(intent);
    }

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.error || payload?.resolution?.reason || 'No fue posible resolver el reporte.');
    }
    return payload as FederatedResolutionResponse;
  } catch {
    // Netlify actual publica la SPA como estática. El resolver puro sigue
    // funcionando en el navegador y conserva un recibo local verificable.
    return resolveLocally(intent);
  }
}

export async function getIntentReceipts(intentId: string) {
  try {
    const response = await fetch(`/api/federation/intents/${encodeURIComponent(intentId)}/receipts`);
    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      return response.json();
    }
  } catch {
    // Fallback local below.
  }

  const stored = localStorage.getItem(`federation.receipts.${intentId}`);
  return {
    intent_id: intentId,
    receipts: stored ? JSON.parse(stored) : [],
  };
}
