import { describe, expect, it } from 'vitest';
import { buildEvidenceIndex } from '../evidenceIndex';

describe('Evidence Index v0.1 — fuente reproducible para CodeLens', () => {
  const source = {
    ref: 'repo:docs/marco/BIBLIOTECA_LEGAL.md#nucleo',
    kind: 'repo' as const,
    status: 'VERIFICADO' as const,
    sourceVersion: 'commit:b4738fc',
    content: 'Texto de prueba: LNETB e interoperabilidad.',
  };

  it('genera una referencia consumible por CodeLens sin conservar contenido', () => {
    const result = buildEvidenceIndex([source]);

    expect(result.rejected).toEqual([]);
    expect(result.records).toHaveLength(1);
    expect(result.records[0]).toMatchObject({
      ref: source.ref,
      digest: expect.stringMatching(/^[0-9a-f]{64}$/),
      integrityAssurance: 'CHECKSUM_ONLY',
    });
    expect(result.index.evidence[0].ref).toBe(source.ref);
    expect(JSON.stringify(result)).not.toContain(source.content);
  });

  it('misma fuente produce mismo índice; contenido cambiado cambia la huella', () => {
    const first = buildEvidenceIndex([source]);
    const second = buildEvidenceIndex([{ ...source }]);
    const changed = buildEvidenceIndex([{ ...source, content: `${source.content} Cambio.` }]);

    expect(second).toEqual(first);
    expect(changed.records[0].digest).not.toBe(first.records[0].digest);
    expect(changed.records[0].evidenceId).not.toBe(first.records[0].evidenceId);
  });

  it('rechaza metadatos incompletos sin exponer contenido sensible', () => {
    const sensitive = 'CURP sintética: MAAL900101HNTRRS09';
    const result = buildEvidenceIndex([
      { ...source, ref: '', content: sensitive },
      { ...source, ref: 'repo:duplicada', sourceVersion: '', content: sensitive },
    ]);

    expect(result.records).toEqual([]);
    expect(result.rejected.map((item) => item.reasonCode)).toEqual(
      expect.arrayContaining(['SOURCE_REF_REQUIRED', 'SOURCE_VERSION_REQUIRED']),
    );
    expect(JSON.stringify(result)).not.toContain(sensitive);
  });

  it('rechaza referencias duplicadas y conserva afirmaciones canónicas aparte', () => {
    const result = buildEvidenceIndex(
      [source, { ...source, content: 'otra versión' }],
      [{ claim_id: 'nodo:uno', statement: 'La fuente requiere revisión humana.' }],
    );

    expect(result.records).toHaveLength(1);
    expect(result.rejected.map((item) => item.reasonCode)).toContain('SOURCE_REF_DUPLICATE');
    expect(result.index.canonicalClaims).toEqual([{ claim_id: 'nodo:uno', statement: 'La fuente requiere revisión humana.' }]);
  });
});
