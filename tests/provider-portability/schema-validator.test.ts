import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

function runSchemaValidator(schemaPath: string, dataPath: string) {
  return spawnSync(
    process.execPath,
    [
      '--import',
      'tsx',
      'tests/provider-portability/validate-schema.ts',
      schemaPath,
      dataPath,
    ],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    },
  );
}

const INPUT_SCHEMA = 'contracts/evidence-auditor-envelope.v0.1.schema.json';
const OUTPUT_SCHEMA = 'contracts/evidence-auditor-result.v0.1.schema.json';

describe('P0.6 JSON Schema Draft 2020-12 validation', () => {
  it('accepts the known-good canonical input fixture', () => {
    const result = runSchemaValidator(
      INPUT_SCHEMA,
      'tests/provider-portability/fixtures/minimal-input.json',
    );

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('"status": "PASS"');
  });

  it('rejects malformed canonical input before policy evaluation', () => {
    const result = runSchemaValidator(
      INPUT_SCHEMA,
      'tests/provider-portability/fixtures/schema-invalid-input.json',
    );

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('"status": "FAIL"');
    expect(result.stdout).toContain('required');
    expect(result.stdout).toContain('format');
  });

  it('accepts the known-good provider output fixture', () => {
    const result = runSchemaValidator(
      OUTPUT_SCHEMA,
      'tests/provider-portability/fixtures/valid-output.json',
    );

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('"status": "PASS"');
  });

  it('rejects malformed provider output', () => {
    const result = runSchemaValidator(
      OUTPUT_SCHEMA,
      'tests/provider-portability/fixtures/schema-invalid-output.json',
    );

    expect(result.status).toBe(1);
    expect(result.stdout).toContain('"status": "FAIL"');
    expect(result.stdout).toContain('additionalProperties');
    expect(result.stdout).toContain('const');
    expect(result.stdout).toContain('enum');
  });
});
