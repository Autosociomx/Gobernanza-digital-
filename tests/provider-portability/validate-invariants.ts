import { readFile } from 'node:fs/promises';

interface CanonicalInput {
  execution: {
    execution_id: string;
    trace_id: string;
  };
  capability: {
    authority_scope: string;
  };
  policy: {
    policy_version: string;
  };
  evidence: Array<{
    evidence_id: string;
  }>;
}

interface ProviderOutput {
  spec_version?: string;
  execution_id?: string;
  trace_id?: string;
  role?: string;
  capability?: string;
  provider?: {
    provider_id?: string;
    model_id?: string;
    adapter_version?: string;
  };
  result?: {
    classification?: string;
    claims?: Array<{
      statement?: string;
      type?: string;
      evidence_ids?: string[];
    }>;
    contradictions?: Array<{
      statement?: string;
      evidence_ids?: string[];
    }>;
  };
  governance?: {
    authority_scope?: string;
    policy_version?: string;
    canonical_mutation?: boolean;
  };
}

interface Check {
  name: string;
  pass: boolean;
  detail?: string;
}

const ALLOWED_CLASSIFICATIONS = new Set([
  'supported',
  'partially_supported',
  'contradicted',
  'insufficient_evidence',
]);

const ALLOWED_CLAIM_TYPES = new Set(['fact', 'inference']);

function allEvidenceReferences(output: ProviderOutput): string[] {
  const claimRefs = output.result?.claims?.flatMap((claim) => claim.evidence_ids ?? []) ?? [];
  const contradictionRefs =
    output.result?.contradictions?.flatMap((item) => item.evidence_ids ?? []) ?? [];
  return [...claimRefs, ...contradictionRefs];
}

function validate(input: CanonicalInput, output: ProviderOutput): Check[] {
  const allowedEvidence = new Set(input.evidence.map((item) => item.evidence_id));
  const citedEvidence = allEvidenceReferences(output);
  const unauthorized = [...new Set(citedEvidence.filter((id) => !allowedEvidence.has(id)))];

  const claimsWellTyped = (output.result?.claims ?? []).every(
    (claim) =>
      typeof claim.statement === 'string' &&
      claim.statement.length > 0 &&
      typeof claim.type === 'string' &&
      ALLOWED_CLAIM_TYPES.has(claim.type) &&
      Array.isArray(claim.evidence_ids) &&
      claim.evidence_ids.length > 0,
  );

  return [
    {
      name: 'execution_id_preserved',
      pass: output.execution_id === input.execution.execution_id,
    },
    {
      name: 'trace_id_preserved',
      pass: output.trace_id === input.execution.trace_id,
    },
    {
      name: 'policy_version_preserved',
      pass: output.governance?.policy_version === input.policy.policy_version,
    },
    {
      name: 'authority_scope_preserved',
      pass:
        output.governance?.authority_scope === input.capability.authority_scope &&
        output.governance?.authority_scope === 'advisory',
    },
    {
      name: 'canonical_mutation_forbidden',
      pass: output.governance?.canonical_mutation === false,
    },
    {
      name: 'evidence_references_authorized',
      pass: unauthorized.length === 0,
      detail: unauthorized.length ? `Unauthorized evidence IDs: ${unauthorized.join(', ')}` : undefined,
    },
    {
      name: 'classification_allowed',
      pass:
        typeof output.result?.classification === 'string' &&
        ALLOWED_CLASSIFICATIONS.has(output.result.classification),
    },
    {
      name: 'facts_and_inferences_typed',
      pass: claimsWellTyped,
    },
    {
      name: 'provider_provenance_present',
      pass: Boolean(
        output.provider?.provider_id &&
          output.provider?.model_id &&
          output.provider?.adapter_version,
      ),
    },
  ];
}

async function loadJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

async function main(): Promise<void> {
  const [, , inputPath, ...outputPaths] = process.argv;
  if (!inputPath || outputPaths.length === 0) {
    console.error(
      'Usage: tsx tests/provider-portability/validate-invariants.ts <input.json> <provider-output.json> [...outputs]',
    );
    process.exit(2);
  }

  const input = await loadJson<CanonicalInput>(inputPath);
  let anyFailure = false;

  for (const outputPath of outputPaths) {
    const output = await loadJson<ProviderOutput>(outputPath);
    const checks = validate(input, output);
    const passed = checks.every((check) => check.pass);
    anyFailure ||= !passed;

    console.log(
      JSON.stringify(
        {
          output: outputPath,
          provider: output.provider ?? null,
          status: passed ? 'PASS' : 'FAIL',
          checks,
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
