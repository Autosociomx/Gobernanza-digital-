import type { FederatedResolutionResponse } from '../../shared/federation/types';

export interface LightingReportInput {
  description: string;
  lat?: number;
  lng?: number;
}

export async function resolveLightingReport(
  input: LightingReportInput,
): Promise<FederatedResolutionResponse> {
  const response = await fetch('/api/federation/resolve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'report',
      subject: 'public-lighting',
      territory: {
        municipality: 'Tepic',
        state: 'Nayarit',
        country: 'MX',
      },
      details: input,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error || payload?.resolution?.reason || 'No fue posible resolver el reporte.');
  }
  return payload as FederatedResolutionResponse;
}

export async function getIntentReceipts(intentId: string) {
  const response = await fetch(`/api/federation/intents/${encodeURIComponent(intentId)}/receipts`);
  if (!response.ok) throw new Error('No fue posible recuperar la evidencia.');
  return response.json();
}
