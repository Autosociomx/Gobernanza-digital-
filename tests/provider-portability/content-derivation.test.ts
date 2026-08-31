import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  deriveRawUtf8V1,
  RAW_UTF8_DERIVATION_METHOD,
  RAW_UTF8_DERIVATION_VERSION,
} from '../../contextos/portability/contentDerivation';

function sha256(value: string): string {
  return createHash('sha256').update(Buffer.from(value, 'utf8')).digest('hex');
}

describe('raw_utf8_v1', () => {
  it('produces byte-identical content and hash across repeated runs', () => {
    const snapshot = Buffer.from('Línea 1\r\nLínea 2\rLínea 3', 'utf8');

    const first = deriveRawUtf8V1(snapshot);
    const second = deriveRawUtf8V1(snapshot);

    expect(first).toEqual(second);
    expect(first.content).toBe('Línea 1\nLínea 2\nLínea 3');
    expect(first.analysisContentSha256).toBe(sha256(first.content));
    expect(first.method).toBe(RAW_UTF8_DERIVATION_METHOD);
    expect(first.version).toBe(RAW_UTF8_DERIVATION_VERSION);
  });

  it('removes a UTF-8 BOM only when it is the first decoded code point', () => {
    const leadingBom = Buffer.concat([
      Buffer.from([0xef, 0xbb, 0xbf]),
      Buffer.from('contenido', 'utf8'),
    ]);
    const internalBom = Buffer.from(`a\uFEFFb`, 'utf8');

    expect(deriveRawUtf8V1(leadingBom).content).toBe('contenido');
    expect(deriveRawUtf8V1(internalBom).content).toBe(`a\uFEFFb`);
  });

  it('does not trim or normalize ordinary spaces, case, punctuation, accents, or Unicode form', () => {
    const source = '  MÉXICO  $120,000  cafe\u0301  ';
    expect(deriveRawUtf8V1(Buffer.from(source, 'utf8')).content).toBe(source);
  });

  it('fails closed for invalid UTF-8', () => {
    const invalid = Uint8Array.from([0xc3, 0x28]);
    expect(() => deriveRawUtf8V1(invalid)).toThrow('RAW_UTF8_INVALID_ENCODING');
  });
});
