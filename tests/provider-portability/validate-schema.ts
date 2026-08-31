import { readFile } from 'node:fs/promises';
import Ajv2020, { type ErrorObject, type ValidateFunction } from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export interface SchemaValidationResult {
  valid: boolean;
  errors: Array<{
    instancePath: string;
    schemaPath: string;
    keyword: string;
    message: string;
  }>;
}

function normalizeErrors(errors: ErrorObject[] | null | undefined): SchemaValidationResult['errors'] {
  return (errors ?? []).map((error) => ({
    instancePath: error.instancePath,
    schemaPath: error.schemaPath,
    keyword: error.keyword,
    message: error.message ?? 'schema validation error',
  }));
}

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(path, 'utf8')) as unknown;
}

export function createDraft202012Validator(schema: object): ValidateFunction {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: true,
  });
  addFormats(ajv);
  return ajv.compile(schema);
}

export function validateValueAgainstSchema(
  validator: ValidateFunction,
  value: unknown,
): SchemaValidationResult {
  const valid = validator(value) === true;
  return {
    valid,
    errors: valid ? [] : normalizeErrors(validator.errors),
  };
}

export async function validateFileAgainstSchema(
  schemaPath: string,
  dataPath: string,
): Promise<SchemaValidationResult> {
  const [schema, value] = await Promise.all([readJson(schemaPath), readJson(dataPath)]);
  const validator = createDraft202012Validator(schema as object);
  return validateValueAgainstSchema(validator, value);
}

async function main(): Promise<void> {
  const [, , schemaPath, ...dataPaths] = process.argv;
  if (!schemaPath || dataPaths.length === 0) {
    console.error('Usage: tsx tests/provider-portability/validate-schema.ts <schema.json> <data.json> [...data]');
    process.exit(2);
  }

  let anyFailure = false;
  for (const dataPath of dataPaths) {
    const result = await validateFileAgainstSchema(schemaPath, dataPath);
    anyFailure ||= !result.valid;
    console.log(
      JSON.stringify(
        {
          schema: schemaPath,
          data: dataPath,
          status: result.valid ? 'PASS' : 'FAIL',
          errors: result.errors,
        },
        null,
        2,
      ),
    );
  }

  process.exit(anyFailure ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
