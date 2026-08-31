import { createHash } from 'node:crypto';

export const RAW_UTF8_DERIVATION_METHOD = 'raw_utf8_v1' as const;
export const RAW_UTF8_DERIVATION_VERSION = '1' as const;

export interface ContentDerivationResult {
  method: typeof RAW_UTF8_DERIVATION_METHOD;
  version: typeof RAW_UTF8_DERIVATION_VERSION;
  content: string;
  analysisContentSha256: string;
}

function sha256Utf8(value: string): string {
  return createHash('sha256').update(Buffer.from(value, 'utf8')).digest('hex');
}

/**
 * Deterministic raw UTF-8 derivation defined by
 * docs/evidence-os/CONTENT_DERIVATION_SPEC_v0.1.md.
 *
 * The decoder is fatal by design: invalid UTF-8 is a derivation failure,
 * never an invitation to guess another encoding.
 */
export function deriveRawUtf8V1(snapshot: Uint8Array): ContentDerivationResult {
  let content: string;
  try {
    content = new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(snapshot);
  } catch {
    throw new Error('RAW_UTF8_INVALID_ENCODING');
  }

  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }

  content = content.replace(/\r\n?/g, '\n');

  return {
    method: RAW_UTF8_DERIVATION_METHOD,
    version: RAW_UTF8_DERIVATION_VERSION,
    content,
    analysisContentSha256: sha256Utf8(content),
  };
}
