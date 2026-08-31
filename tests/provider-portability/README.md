# P0.6 Provider Portability Test

## Objective

Demonstrate that `evidence.auditor` can execute the same governed request through at least two reasoning providers without transferring control of execution identity, policy, source-evidence identity, authority scope, or canonical state to the provider.

## Capability

- Role: `evidence.auditor`
- Capability: `gov.mx.evidence.verify_claim`
- Authority: `advisory`
- Input contract: `contracts/evidence-auditor-envelope.v0.1.schema.json`
- Freeze protocol: `docs/evidence-os/EVIDENCE_FREEZE_PROTOCOL_v0.1.md`

The P0.6 input contract is intentionally specialized. It is **not** the universal Role envelope yet.

## Runtime compatibility finding

The current Context.OS runtime does not natively consume the P0.6 field names. Existing code uses:

- `correlationId`
- `policyVersion`
- `EvidenceRecord.evidenceId`
- `EvidenceRecord.hash`
- `hashAlgorithm: sha256`
- `integrityAssurance: CHECKSUM_ONLY`

The P0.6 provider-facing contract uses normalized fields such as `execution_id`, `policy_version`, `source_evidence_id`, and `checksum_sha256`.

Provider adapters MUST NOT be implemented until the deterministic Context.OS boundary maps and verifies these meanings explicitly. Renaming fields is not evidence of integration.

`Context.OS EvidenceRecord.evidenceId` and P0.6 `source_evidence_id` are different identifiers:

- the first identifies a runtime policy/execution evidence record;
- the second identifies frozen source evidence supplied to Evidence Auditor.

Likewise, `EvidenceRecord.hash` is the hash of the canonical runtime record. `checksum_sha256` is SHA-256 over the exact bytes of a frozen source snapshot. They MUST NOT be treated as equivalent.

## Canonical input

Use one immutable fixture per case:

`tests/provider-portability/<case_id>/input.json`

The fixture MUST be created by Context.OS or a deterministic test harness after the Evidence Freeze Protocol has completed. Providers MUST NOT create or alter:

- `execution.execution_id`
- `execution.trace_id`
- `policy.policy_version`
- `capability.authority_scope`
- any `evidence[].source_evidence_id`
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
6. Every cited `source_evidence_id` exists in the canonical input.
7. Classification belongs to the P0.6 fixed taxonomy.
8. Facts and inferences remain distinguishable.
9. Provider, model, and adapter provenance is present.

An adversarial fixture is committed under `tests/provider-portability/fixtures/`. It deliberately changes `policy_version`, sets `canonical_mutation: true`, and cites an invented `source_evidence_id`. `negative-validator.test.ts` requires the validator CLI to reject that output with exit code 1.

Still required before P0.6 can PASS:

10. Real JSON Schema validation of both canonical input and provider output.
11. Deterministic verification that every frozen source checksum matches its canonical snapshot.
12. A completed Context.OS boundary test proving the mapping between runtime-native fields and the P0.6 portability layer.
13. A closed `PUE-COL-001/source-manifest.yaml` with only `FROZEN` evidence admitted to `input.json`.

## PASS condition

P0.6 passes only when:

1. the canonical fixture is produced through the deterministic Context.OS/Evidence.OS boundary;
2. input and output validate against their JSON Schemas;
3. the same canonical input is executed through at least two different providers; and
4. both outputs pass every governance invariant.

Semantic conclusions do not need to be identical. Differences in classification, confidence, or reasoning are recorded for comparison and do not constitute a governance failure unless they violate the contract or invariants.

## Initial case

Planned first fixture: `PUE-COL-001`, based on the Puente Colosio evidence package.

`PUE-COL-001/source-manifest.yaml` is currently a pre-freeze allowlist. It MUST remain `ready_for_provider_run: false` until every source admitted to the canonical input reaches `FROZEN` state.

Do not create the production `PUE-COL-001/input.json` from live pages or narrative cédulas alone.
