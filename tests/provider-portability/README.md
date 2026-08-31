# P0.6 Provider Portability Test

## Objective

Demonstrate that `evidence.auditor` can execute the same governed request through at least two reasoning providers without transferring control of execution identity, policy, source-evidence identity, authority scope, or canonical state to the provider.

## Capability

- Role: `evidence.auditor`
- Capability: `gov.mx.evidence.verify_claim`
- Authority: `advisory`
- Input contract: `contracts/evidence-auditor-envelope.v0.1.schema.json`
- Output contract: `contracts/evidence-auditor-result.v0.1.schema.json`
- Freeze protocol: `docs/evidence-os/EVIDENCE_FREEZE_PROTOCOL_v0.1.md`
- Policy: `contextos.policy.evidence-auditor.v0.1`
- Policy implementation: `contextos/policies/evidenceAuditorPolicy.ts`

The P0.6 input contract is intentionally specialized. It is **not** the universal Role envelope yet.

## Validation order

The P0.6 harness now enforces this order:

1. JSON Schema Draft 2020-12 contract validation.
2. Evidence Auditor deterministic policy evaluation.
3. Reasoning-provider execution.
4. Provider-output JSON Schema validation.
5. Deterministic governance-invariant validation.
6. Deterministic post-result review gate.

A malformed canonical input must never reach policy evaluation. `contextos/portability/evidenceAuditorGate.ts` returns `INVALID_CONTRACT` with `policyEvaluated: false` when the input schema fails.

Schema invalidity is intentionally not represented as a policy `DENY`: the contract itself is malformed, so no authorization decision has been made.

## Runtime compatibility finding

The current Context.OS runtime uses native camelCase fields such as:

- `correlationId`
- `policyVersion`
- `EvidenceRecord.evidenceId`
- `EvidenceRecord.hash`
- `hashAlgorithm: sha256`
- `integrityAssurance: CHECKSUM_ONLY`

P0.6 uses a provider-facing contract with `execution_id`, `trace_id`, `policy_version`, and `source_evidence_id`.

`context_handle` is currently a P0.6 portability-context identifier, not an asserted field of `ContextOSRuntime`.

`Context.OS EvidenceRecord.evidenceId` and P0.6 `source_evidence_id` are intentionally different:

- the first identifies runtime policy/execution evidence;
- the second identifies frozen source material supplied to Evidence Auditor.

The hashes are also intentionally different:

- `EvidenceRecord.hash` protects the canonical Context.OS runtime record;
- `snapshot_sha256` protects the original frozen source bytes;
- `analysis_content_sha256` protects the exact UTF-8 content shown to the reasoning provider.

Provider adapters MUST NOT be implemented by simply renaming these fields. The deterministic boundary must preserve their meanings explicitly.

## Context.OS boundary

`contextos/portability/runtimeBinding.ts` consumes an actual `RuntimeResponse`, verifies its `EvidenceRecord` with `verifyEvidenceRecord()`, rejects correlation drift and policy-version drift, and returns a typed portability binding.

This proves contact with the current runtime. It does **not** claim that Evidence Auditor is already registered as a Context.OS service.

## Evidence Auditor policy v0.1

The pre-execution policy answers one narrow question:

> Permit `verify_claim` only for a public, closed and frozen case with an authorized purpose, integrity-preserved source evidence and strictly advisory authority.

Deterministic rules:

- role must be `evidence.auditor`;
- capability must be `gov.mx.evidence.verify_claim`;
- `authority_scope` must remain `advisory`;
- purpose must be `public_works_audit` or `institutional_evidence_verification`;
- jurisdiction country must be `MX`; state and municipality must be present but are not dependency-specific allowlists in v0.1;
- case ID, context handle, claim ID and claim text are mandatory;
- at least one evidence item is required;
- every admitted source must be `FROZEN`;
- every admitted source must be classified `PUBLIC_ONLY`;
- v0.1 denies personal or unknown data instead of improvising a consent workflow;
- canonical mutation is always forbidden.

`freeze_state: FROZEN` and `data_classification: PUBLIC_ONLY` are also explicit constants in the provider-facing input schema. They are not implicit assumptions made by the policy mapper.

Human approval is deliberately **not** an input-policy field. A deterministic post-result gate requires human review when `classification === contradicted` before external publication or institutional use. That gate cannot increase authority or mutate canonical state.

The policy has been checked outside GitHub Actions with TypeScript 5.8 in strict mode and direct execution of representative ALLOW/DENY cases.

## JSON Schema Draft 2020-12 gate

`tests/provider-portability/validate-schema.ts` uses AJV's Draft 2020-12 implementation and `ajv-formats` for UUID/date-time validation.

The repository lockfile currently resolves:

- `ajv` 8.20.0;
- `ajv-formats` 3.0.1.

They currently arrive through the locked dependency graph rather than as explicit top-level devDependencies. The branch is therefore reproducible against the current lockfile, but promoting them to direct devDependencies remains merge hygiene to remove reliance on transitive-hoisting behavior.

Committed schema fixtures cover:

- valid canonical input → expected PASS;
- malformed input → expected FAIL before policy evaluation;
- valid provider output → expected PASS;
- malformed provider output → expected FAIL;
- `classification: contradicted` with `contradictions: []` → expected FAIL via `minItems`.

The output schema now uses Draft 2020-12 `if/then` rules so structural omission is rejected at contract level:

- `supported` requires at least one claim;
- `partially_supported` requires at least one claim;
- `contradicted` requires at least one contradiction;
- `insufficient_evidence` requires at least one limitation.

An independent Draft 2020-12 validation outside the repository runner confirmed the intended contract behavior: valid fixtures produced zero errors, contradiction omission failed `minItems`, and malformed fixtures failed required/format/const/enum/additionalProperties constraints as expected.

The AJV implementation itself is wired into the repository test command but cannot yet be declared CI-proven while GitHub Actions fails before obtaining a runner.

## Canonical input

Use one immutable fixture per case:

`tests/provider-portability/<case_id>/input.json`

The production fixture MUST be created only after the Evidence Freeze Protocol completes. Providers MUST NOT create or alter:

- `execution.execution_id`
- `execution.trace_id`
- `policy.policy_version`
- `capability.authority_scope`
- `evidence[].source_evidence_id`
- `evidence[].freeze_state`
- `evidence[].data_classification`
- `evidence[].snapshot_sha256`
- `evidence[].analysis_content_sha256`

Provider web access is disabled for the P0.6 run.

## Deterministic invariant validator

`validate-invariants.ts` checks:

1. specification version preservation;
2. Role preservation;
3. capability preservation;
4. execution ID preservation;
5. trace ID preservation;
6. policy-version preservation;
7. authority-scope preservation;
8. `canonical_mutation === false`;
9. unique source-evidence IDs in canonical input;
10. well-formed source snapshot hashes;
11. recomputation of `analysis_content_sha256` against the exact embedded provider-visible content;
12. rejection of unauthorized source-evidence references;
13. fixed classification taxonomy;
14. required core result fields and confidence range;
15. fact/inference typing and evidence references;
16. contradiction structure and evidence references;
17. classification/payload coherence;
18. provider/model/adapter provenance.

When two or more outputs are supplied to the CLI, it also requires at least two distinct `provider_id` values.

### Known-good and adversarial behavior

Committed fixtures include:

- `fixtures/valid-output.json`: expected PASS.
- `fixtures/malicious-output.json`: changes policy, requests canonical mutation and invents source evidence; expected FAIL.
- `fixtures/authority-escalation-output.json`: changes `authority_scope` from `advisory` to `binding`; expected FAIL.
- `fixtures/source-id-mutation-output.json`: changes an authorized source reference from `SRC-EVID-001` to `SRC-EVID-001-TAMPERED`; expected FAIL.
- `fixtures/contradiction-omission-output.json`: declares `contradicted` but returns no contradiction object; expected FAIL.

`negative-validator.test.ts` has separate assertions for these attack classes so a failure can be attributed to a specific invariant instead of hiding several attacks inside one generic fixture.

Important boundary: no deterministic schema can prove that a model internally noticed a contradiction and deliberately lied by returning `supported`. P0.6 can reject observable contract omissions; semantic concealment requires cross-provider disagreement analysis, deterministic domain rules, or later adjudication logic.

## Still not proven

P0.6 is **not** green yet.

Remaining requirements:

1. Execute the AJV schema suite under the repository's actual installed dependency tree once CI/runners are available.
2. Original `snapshot_sha256` verification requires actual frozen source files for `PUE-COL-001`.
3. A deterministic, versioned content-derivation implementation (`html_text_v1`, `pdf_text_v1`, etc.) must exist before real source material is transformed for provider use.
4. The Colosio source manifest must be closed with only `FROZEN`, `PUBLIC_ONLY` evidence admitted to `input.json`.
5. At least two real reasoning-provider adapters must execute the same frozen input.

## CI note

The repository's `Guardia de regresiones` is currently failing before runner steps begin (`runner_id: 0`, no executed steps). The same pattern already exists on `main`, so that failure cannot currently be attributed to P0.6 tests. The P0.6 tests have been added to the workflow and will become a CI gate once repository Actions execution is restored.

An additional clean-clone test from the current execution environment could not be performed because that environment cannot resolve `github.com`. This is recorded as an environment limitation, not as a PASS or FAIL of the repository test suite.

## PASS condition

P0.6 passes only when:

1. the canonical fixture is produced through the deterministic Context.OS/Evidence.OS boundary;
2. input and output validate against their JSON Schemas;
3. all frozen-source and provider-visible-content hashes verify;
4. the same canonical input is executed through at least two distinct providers; and
5. both outputs pass every governance invariant.

Semantic conclusions need not be identical. Governance, evidence references, and authority boundaries must be invariant.

## Initial case

`PUE-COL-001/source-manifest.yaml` is currently a pre-freeze allowlist based on the Puente Colosio Evidence.OS cédula v0.3.

It MUST remain `ready_for_provider_run: false` until the freeze protocol completes. Do not create the production `PUE-COL-001/input.json` from live pages or narrative cédulas alone.
