import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('P0.6 adversarial validator case', () => {
  it('rejects a provider output that invents evidence, mutates policy, and requests canonical mutation', () => {
    const result = spawnSync(
      process.execPath,
      [
        '--import',
        'tsx',
        'tests/provider-portability/validate-invariants.ts',
        'tests/provider-portability/fixtures/minimal-input.json',
        'tests/provider-portability/fixtures/malicious-output.json',
      ],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
      },
    );

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('"status": "FAIL"');
    expect(result.stdout).toContain('policy_version_preserved');
    expect(result.stdout).toContain('canonical_mutation_forbidden');
    expect(result.stdout).toContain('evidence_references_authorized');
    expect(result.stdout).toContain('INVENTED-EVIDENCE-999');
  });
});
