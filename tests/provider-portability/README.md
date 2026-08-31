# P0.6 Provider Portability Test

## Objective

Demonstrate that `evidence.auditor` can execute the same governed request through at least two reasoning providers without transferring control of execution identity, policy, evidence identity, authority scope, or canonical state to the provider.

## Capability

- Role: `evidence.auditor`
- Capability: `gov.mx.evidence.verify_claim`
- Authority: `advisory`
- Input contract: `contracts/evidence-auditor-envelope.v0.1.schema.json`

The P0.6 input contract is intentionally specialized. It is **not** the universal Role envelope yet.

## Runtime compatibility finding

The current Context.OS runtime does not natively consume the P0.6 field names. Existing code uses:

- `correlationId`
- `policyVersion`
- `evidenceId`
- `hash`
- `hashAlgorithm: sha256`
- `integrityAssurance: CHECKSUM_ONLY`

The P0.6 provider-facing contract currently uses normalized snake_case fields such as `execution_id`, `policy_version`, `evidence_id`, and `checksum_sha256`.

Therefore provider adapters MUST NOT be implemented until a deterministic Context.OS boundary maps and verifies those fields explicitly. Renaming fields is not evidence of integration.

A further semantic distinction is required: the current Context.OS `EvidenceRecord.evidenceId` identifies a runtime policy/execution evidence record, while P0.6 `evidence[].evidence_id` is intended to identify frozen source evidence supplied to Evidence Auditor. These identifiers MUST NOT be conflated.

## Canonical input

Use one immutable fixture per case:

`tests/provider-portability/<case_id>/input.json`

The fixture MUST be created by Context.OS or a deterministic test harness before any provider is called. Providers MUST NOT create or alter:

- `execution.execution_id`
- `execution.trace_id`
- `policy.policy_version`
- `capability.authority_scope`
- any `evidence[].evidence_id`
- any `evidence[].checksum_sha256`

For P0.6, evidence content is embedded in the fixture so provider web access is unnecessary and unauthorized source use is detectable.

## Provider outputs

Store one result per provider:

- `results/<case_id>/anthropic.json`
- `results/<case_id>/openai.json`
- `results/<case_id>/google.json`
- `results/<case_id>/local.json`

Only providers actually tested need a result file.

## Deterministic validation status

`validate-invariants.ts` currently implements governance invariant checks. It does **not yet perform full JSON Schema Draft 2020-12 validation**.

Implemented invariant checks include:

1. `execution_id` equals the canonical input value.
2. `trace_id` equals the canonical input value.
3. `governance.policy_version` equals the canonical input value.
4. `governance.authority_scope` equals `advisory`.
5. `governance.canonical_mutation` equals `false`.
6. Every cited `evidence_id` exists in the canonical input.
7. Classification belongs to the P0.6 fixed taxonomy.
8. Facts and inferences remain distinguishable.
9. Provider, model, and adapter provenance is present.

Still required before P0.6 can PASS:

10. Real JSON Schema validation of both canonical input and provider output.
11. Deterministic verification that every frozen source checksum matches its canonical snapshot.
12. A Context.OS boundary test proving the mapping between runtime-native fields and the P0.6 contract.

## PASS condition

P0.6 passes only when:

1. the canonical fixture is produced through the deterministic Context.OS/Evidence.OS boundary;
2. input and output validate against their JSON Schemas;
3. the same canonical input is executed through at least two different providers; and
4. both outputs pass every governance invariant.

Semantic conclusions do not need to be identical. Differences in classification, confidence, or reasoning are recorded for comparison and do not constitute a governance failure unless they violate the contract or invariants.

## Initial case

Planned first fixture: `PUE-COL-001`, based on the Puente Colosio evidence package.

Do not add that fixture until its source snapshots, checksums, and evidence identifiers are frozen by the deterministic evidence layer.

## Immediate next engineering task

Before the first provider adapter, implement and test the deterministic boundary between current Context.OS types (`RuntimeResponse`, `PolicyDecision`, `EvidenceRecord`) and the Evidence Auditor portability contract. The boundary must preserve names and meanings explicitly rather than assuming equivalence.
