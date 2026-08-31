import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

interface CanonicalInput {
  spec_version: string;
  execution: {
    execution_id: string;
    trace_id: string;
  };
  role: {
    role_id: string;
  };
  capability: {
    capability_id: string;
    authority_scope: string;
  };
  policy: {
    policy_version: string;
  };
  evidence: Array<{
    source_evidence_id: string;
    data_classification: string;
    snapshot_sha256: string;
    analysis_content_sha256: string;
    content: string;
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
    confidence?: number;
    summary?: string;
    claims?: Array<{
      statement?: string;
      type?: string;
      source_evidence_ids?: string[];
    }>;
    contradictions?: Array<{
      statement?: string;
      source_evidence_ids?: string[];
    }>;
    limitations?: string[];
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
const SHA256_HEX = /^[a-fA-F0-9]{64}$/;

function sha256Utf8(value: string): string {
  return createHash('sha256').update(Buffer.from(value, 'utf8')).digest('hex');
}

function unique(values: string[]): boolean {
  return new Set(values).size === values.length;
}

function allSourceEvidenceReferences(output: ProviderOutput): string[] {
  const claimRefs =
    output.result?.claims?.flatMap((claim) => claim.source_evidence_ids ?? []) ?? [];
  const contradictionRefs =
    output.result?.contradictions?.flatMap((item) => item.source_evidence_ids ?? []) ?? [];
  return [...claimRefs, ...contradictionRefs];
}

function classificationPayloadCoherent(output: ProviderOutput): boolean {
  const classification = output.result?.classification;
  const claims = output.result?.claims ?? [];
  const contradictions = output.result?.contradictions ?? [];
  const limitations = output.result?.limitations ?? [];

  if (classification === 'supported') return claims.length > 0;
  if (classification === 'partially_supported') return claims.length > 0;
  if (classification === 'contradicted') return contradictions.length > 0;
  if (classification === 'insufficient_evidence') return limitations.length > 0;
  return false;
}

export function validateInvariants(input: CanonicalInput, output: ProviderOutput): Check[] {
  const sourceEvidenceIds = input.evidence.map((item) => item.source_evidence_id);
  const allowedEvidence = new Set(sourceEvidenceIds);
  const citedEvidence = allSourceEvidenceReferences(output);
  const unauthorized = [...new Set(citedEvidence.filter((id) => !allowedEvidence.has(id)))];

  const claimsWellTyped = Array.isArray(output.result?.claims) &&
    output.result.claims.every(
      (claim) =>
        typeof claim.statement === 'string' &&
        claim.statement.trim().length > 0 &&
        typeof claim.type === 'string' &&
        ALLOWED_CLAIM_TYPES.has(claim.type) &&
        Array.isArray(claim.source_evidence_ids) &&
        claim.source_evidence_ids.length > 0 &&
        unique(claim.source_evidence_ids),
    );

  const contradictionsWellFormed = Array.isArray(output.result?.contradictions) &&
    output.result.contradictions.every(
      (item) =>
        typeof item.statement === 'string' &&
        item.statement.trim().length > 0 &&
        Array.isArray(item.source_evidence_ids) &&
        item.source_evidence_ids.length > 0 &&
        unique(item.source_evidence_ids),
    );

  const resultCorePresent = Boolean(
    output.result &&
      typeof output.result.summary === 'string' &&
      output.result.summary.trim().length > 0 &&
      typeof output.result.confidence === 'number' &&
      Number.isFinite(output.result.confidence) &&
      output.result.confidence >= 0 &&
      output.result.confidence <= 1 &&
      Array.isArray(output.result.claims) &&
      Array.isArray(output.result.contradictions) &&
      Array.isArray(output.result.limitations),
  );

  const sourceSnapshotHashesWellFormed = input.evidence.every(
    (item) => SHA256_HEX.test(item.snapshot_sha256),
  );

  const analysisContentHashesValid = input.evidence.every(
    (item) =>
      SHA256_HEX.test(item.analysis_content_sha256) &&
      sha256Utf8(item.content) === item.analysis_content_sha256.toLowerCase(),
  );

  const providerInputPublicOnly = input.evidence.every(
    (item) => item.data_classification === 'PUBLIC_ONLY',
  );

  return [
    {
      name: 'spec_version_preserved',
      pass: input.spec_version === '0.1' && output.spec_version === input.spec_version,
    },
    {
      name: 'role_preserved',
      pass: input.role.role_id === 'evidence.auditor' && output.role === input.role.role_id,
    },
    {
      name: 'capability_preserved',
      pass:
        input.capability.capability_id === 'gov.mx.evidence.verify_claim' &&
        output.capability === input.capability.capability_id,
    },
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
      name: 'source_evidence_ids_unique_in_input',
      pass: unique(sourceEvidenceIds),
    },
    {
      name: 'provider_input_public_only',
      pass: providerInputPublicOnly,
    },
    {
      name: 'source_snapshot_hashes_well_formed',
      pass: sourceSnapshotHashesWellFormed,
    },
    {
      name: 'analysis_content_hashes_valid',
      pass: analysisContentHashesValid,
    },
    {
      name: 'source_evidence_references_authorized',
      pass: unauthorized.length === 0,
      detail: unauthorized.length
        ? `Unauthorized source evidence IDs: ${unauthorized.join(', ')}`
        : undefined,
    },
    {
      name: 'classification_allowed',
      pass:
        typeof output.result?.classification === 'string' &&
        ALLOWED_CLASSIFICATIONS.has(output.result.classification),
    },
    {
      name: 'result_core_present',
      pass: resultCorePresent,
    },
    {
      name: 'facts_and_inferences_typed',
      pass: claimsWellTyped,
    },
    {
      name: 'contradictions_well_formed',
      pass: contradictionsWellFormed,
    },
    {
      name: 'classification_payload_coherent',
      pass: classificationPayloadCoherent(output),
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
  const providerIds = new Set<string>();

  for (const outputPath of outputPaths) {
    const output = await loadJson<ProviderOutput>(outputPath);
    const checks = validateInvariants(input, output);
    const passed = checks.every((check) => check.pass);
    anyFailure ||= !passed;

    if (output.provider?.provider_id) providerIds.add(output.provider.provider_id);

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

  if (outputPaths.length >= 2 && providerIds.size < 2) {
    anyFailure = true;
    console.log(
      JSON.stringify(
        {
          status: 'FAIL',
          suite_check: 'distinct_reasoning_providers',
          detail: `Expected at least 2 provider_id values, received ${providerIds.size}.`,
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
