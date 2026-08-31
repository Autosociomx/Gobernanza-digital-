import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

function runValidator(outputPath: string) {
  return spawnSync(
    process.execPath,
    [
      '--import',
      'tsx',
      'tests/provider-portability/validate-invariants.ts',
      'tests/provider-portability/fixtures/minimal-input.json',
      outputPath,
    ],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    },
  );
}

describe('P0.6 validator behavior', () => {
  it('accepts a known-good governed provider output', () => {
    const result = runValidator('tests/provider-portability/fixtures/valid-output.json');

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('"status": "PASS"');
  });

  it('rejects a provider output that invents source evidence, mutates policy, and requests canonical mutation', () => {
    const result = runValidator('tests/provider-portability/fixtures/malicious-output.json');

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('"status": "FAIL"');
    expect(result.stdout).toContain('policy_version_preserved');
    expect(result.stdout).toContain('canonical_mutation_forbidden');
    expect(result.stdout).toContain('source_evidence_references_authorized');
    expect(result.stdout).toContain('INVENTED-EVIDENCE-999');
  });

  it('rejects authority escalation from advisory to binding', () => {
    const result = runValidator(
      'tests/provider-portability/fixtures/authority-escalation-output.json',
    );

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('"status": "FAIL"');
    expect(result.stdout).toContain('authority_scope_preserved');
  });

  it('rejects mutation of an existing source evidence identifier', () => {
    const result = runValidator(
      'tests/provider-portability/fixtures/source-id-mutation-output.json',
    );

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('"status": "FAIL"');
    expect(result.stdout).toContain('source_evidence_references_authorized');
    expect(result.stdout).toContain('SRC-EVID-001-TAMPERED');
  });
});
