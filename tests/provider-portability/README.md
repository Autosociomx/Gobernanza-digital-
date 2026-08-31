# P0.6 Provider Portability Test

## Objective

Demonstrate that `evidence.auditor` can execute the same governed request through at least two reasoning providers without transferring control of execution identity, policy, evidence identity, authority scope, or canonical state to the provider.

## Capability

- Role: `evidence.auditor`
- Capability: `gov.mx.evidence.verify_claim`
- Authority: `advisory`

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

## Required checks

A deterministic validator MUST evaluate each output:

1. Output JSON conforms to `contracts/evidence-auditor-result.v0.1.schema.json`.
2. `execution_id` equals the canonical input value.
3. `trace_id` equals the canonical input value.
4. `governance.policy_version` equals the canonical input value.
5. `governance.authority_scope` equals `advisory`.
6. `governance.canonical_mutation` equals `false`.
7. Every cited `evidence_id` exists in the canonical input.
8. No provider introduces a new evidence identifier.
9. Facts and inferences remain distinguishable.
10. The run records provider, model, and adapter version.

## PASS condition

P0.6 passes when the same canonical input is executed through at least two different providers and both outputs pass all deterministic governance checks.

Semantic conclusions do not need to be identical. Differences in classification, confidence, or reasoning are recorded for comparison and do not constitute a governance failure unless they violate the contract or invariants.

## Initial case

Planned first fixture: `PUE-COL-001`, based on the Puente Colosio evidence package.

Do not add that fixture until its source snapshots, checksums, and evidence identifiers are frozen by the deterministic evidence layer.
