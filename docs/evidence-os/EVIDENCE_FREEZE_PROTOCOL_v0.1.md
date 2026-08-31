# Evidence Freeze Protocol v0.1

## Purpose

Freeze a closed, auditable set of source evidence before any reasoning provider is allowed to analyze a case. The protocol prevents a portability test from passing on mutable, unverifiable, retrospectively edited, differently transformed, or improperly classified source material.

## Governing rule

No LLM may create, alter, replace, re-hash, silently expand, silently transform, or silently reclassify the authorized evidence set.

A source is usable by Evidence Auditor only after the deterministic freeze layer has captured the source, verified the original snapshot hash, derived the provider-visible content through a recorded method, verified the hash of that exact provider-visible content, and assigned an admissible data classification.

## Evidence identities

Two identities MUST remain separate:

1. `Context.OS EvidenceRecord.evidenceId`: identifies an auditable runtime policy/execution record produced by Context.OS.
2. `source_evidence_id`: identifies a frozen source snapshot supplied to Evidence Auditor.

They are not aliases and MUST NOT be mapped one-to-one by name alone.

## Two-hash rule

Every admitted source has two independent SHA-256 values:

- `snapshot_sha256`: SHA-256 of the exact captured source bytes.
- `analysis_content_sha256`: SHA-256 of the exact UTF-8 content string that will be supplied to the reasoning provider.

This distinction is mandatory. A valid hash of a PDF or HTML response does not prove that the extracted text shown to a model is unchanged.

## Data classification

Every source must carry exactly one `data_classification` value:

- `PUBLIC_ONLY`: public institutional material or publicly disseminated information admitted for P0.6. Public officials, contractors, public acts and other information already present in the authorized public source may appear; this classification does not authorize unrelated private citizen data.
- `CONTAINS_PERSONAL_DATA`: the source contains personal information outside the P0.6 public-only boundary.
- `UNKNOWN`: the source has not yet been captured or classified with sufficient certainty.

P0.6 Evidence Auditor only admits `PUBLIC_ONLY` into the canonical provider input.

`CONTAINS_PERSONAL_DATA` and `UNKNOWN` are blocked by `contextos.policy.evidence-auditor.v0.1`. The v0.1 policy does not improvise a consent workflow for them.

Classification is assigned by the deterministic freeze process or approved human review before provider execution. A reasoning provider cannot promote a source from `UNKNOWN` or `CONTAINS_PERSONAL_DATA` to `PUBLIC_ONLY`.

## Freeze states

Each candidate source has exactly one state:

- `CANDIDATE`: relevant source identified, not yet approved for capture.
- `APPROVED_PENDING_SNAPSHOT`: exact locator approved, snapshot not yet frozen.
- `FROZEN`: snapshot and provider-visible content both captured and verified; eligible for canonical provider input only when `data_classification` is `PUBLIC_ONLY`.
- `BLOCKED`: relevant source cannot yet be frozen because the exact resource, authenticated access, primary document, approved storage, or admissible classification is unavailable.
- `EXCLUDED`: duplicate, unrelated, superseded, unverifiable, or outside the authorized evidence set.

Only `FROZEN` + `PUBLIC_ONLY` sources may appear in a provider-facing canonical input.

## Closed-source rule

Before a provider run, close and version `source-manifest.yaml`. Once the run begins, no source may be added, replaced, re-derived, re-hashed, or reclassified.

If new evidence appears, create a new freeze version and a new provider run. Never mutate the prior run's manifest or snapshots.

## Capture method

For each approved source:

1. Resolve the exact final locator. Generic portals, search pages, truncated URLs, and descriptions without a concrete resource are insufficient.
2. Capture the exact response/file bytes without LLM transformation.
3. Record UTC capture timestamp, requested locator, resolved/final locator, media type, byte length, capture method, and any redirect chain relevant to provenance.
4. Compute `snapshot_sha256` over the exact captured bytes.
5. Store the original snapshot.
6. Re-read the stored snapshot and recompute SHA-256. Require an exact match.
7. Assign or verify `data_classification`.
8. Derive provider-visible content using a deterministic, named, versioned method.
9. Store the exact provider-visible UTF-8 content separately.
10. Compute `analysis_content_sha256` over the exact UTF-8 bytes of that stored content.
11. Re-read the stored provider-visible content and recompute its SHA-256.
12. Only after both hashes and classification verify may the source change to `FROZEN`.

## Hashing rule

Allowed raw-byte implementations include:

- `sha256sum <file>`
- Node.js `createHash('sha256').update(buffer).digest('hex')`

The provider-visible content hash must be calculated over UTF-8 bytes exactly as sent to the model.

Do **not** use `contextos/canonical.ts#sha256` for source snapshot bytes. That function hashes canonical JSON serialization of a JavaScript value and serves a different runtime-integrity purpose.

## Content derivation

Every derived analysis artifact must record:

- `method`
- `version`
- input snapshot path
- output analysis-content path
- `analysis_content_sha256`

Examples of acceptable method identifiers are `raw_utf8`, `html_text_v1`, or `pdf_text_v1`, but an identifier is not sufficient by itself. The corresponding implementation must be deterministic and version-controlled before it is used for a real provider run.

Manual paraphrase by a person or LLM is not a valid content-derivation method for P0.6.

## Snapshot storage for P0.6

For P0.6 the authoritative artifacts live in the Git branch/commit containing the case fixture:

- original snapshots: `tests/provider-portability/<case_id>/snapshots/`
- provider-visible content: `tests/provider-portability/<case_id>/analysis/`
- manifest: `tests/provider-portability/<case_id>/source-manifest.yaml`

Store small public-source artifacts directly when redistribution and repository size are reasonable.

If a source is too large, binary-only, access-restricted, or unsuitable for repository storage, mark it `BLOCKED` until an approved immutable object store is actually configured. A live URL is not a frozen snapshot.

No Supabase bucket, external Evidence.OS object store, or institutional repository is assumed until it exists and has been verified.

## Required manifest fields

Every source entry must contain:

- `source_id`
- `source_evidence_id`
- `state`
- `data_classification`
- `title`
- `source_type`
- `requested_locator`
- `resolved_locator`
- `captured_at_utc`
- `media_type`
- `byte_length`
- `capture_method`
- `snapshot_sha256`
- `snapshot_path`
- `analysis_content_path`
- `analysis_content_sha256`
- `content_derivation.method`
- `content_derivation.version`
- `provenance_note`
- `admission_reason`

Unknown values remain `null` or the explicit `UNKNOWN` classification; they MUST NOT be fabricated.

## Source evidence ID assignment

`source_evidence_id` is assigned by the deterministic freeze process only after successful snapshot hashing.

P0.6 format:

`<case_id>:<source_id>:<first-16-hex-of-snapshot_sha256>`

The full hash remains in `snapshot_sha256`. The identifier is a stable reference, not a replacement for checksum verification.

## Admission checks

A source becomes provider-eligible only if all are true:

- exact resource locator is known;
- capture succeeded without truncation;
- stored snapshot bytes can be re-read;
- `snapshot_sha256` is valid and recomputes exactly;
- `data_classification` is explicitly resolved;
- provider-visible content was derived by a recorded deterministic method;
- stored provider-visible content can be re-read;
- `analysis_content_sha256` is valid and recomputes exactly;
- source is relevant to at least one auditable claim or documented contradiction/control;
- source is not counted as independent corroboration when it is a duplicate or syndicated copy;
- provenance is recorded;
- no LLM generated or edited frozen source bytes, classification, or provider-visible analysis content.

A `FROZEN` source with a classification other than `PUBLIC_ONLY` remains ineligible for P0.6 provider input.

## Duplicates and syndicated reporting

Near-identical articles or syndicated copies may be preserved for provenance, but must be flagged as a probable shared-origin cluster. They do not count automatically as independent corroboration.

## Dynamic web pages

Freeze the actual representation used for analysis and record the capture method and UTC timestamp. A later change to the live page does not alter the frozen snapshot.

If JavaScript execution is necessary to reveal content, preserve the rendered artifact actually used and record that capture method explicitly.

## Primary-source preference

Primary institutional documents have priority when available. Secondary reporting remains admissible when it documents contemporaneous statements or when a primary record is unavailable, but its evidentiary weight must be explicit.

A missing primary source is not silently upgraded by repetition across secondary outlets.

## Policy requirement for Evidence Auditor

P0.6 is bound to `contextos.policy.evidence-auditor.v0.1`, implemented in `contextos/policies/evidenceAuditorPolicy.ts`.

The policy MUST NOT reuse `contextos.policy.public-works.v0.2`, which belongs to the bache/luminaria runtime slice.

The pre-execution policy permits only the intended Role/capability, approved purposes, MX jurisdiction context, `FROZEN` evidence, `PUBLIC_ONLY` classification, advisory authority, and no canonical mutation.

The post-result gate requires human review when the provider classification is `contradicted` before external publication or institutional use. This gate never raises authority above `advisory` and never mutates canonical state.

## Provider boundary

Providers receive only:

- the canonical request;
- the closed set of `FROZEN` + `PUBLIC_ONLY` provider-visible content;
- immutable `source_evidence_id` values;
- `data_classification` metadata;
- `snapshot_sha256` and `analysis_content_sha256` metadata;
- policy and authority constraints supplied by the deterministic layer.

Provider web browsing must be disabled for the P0.6 run.

## Freeze completion criteria

A case is `READY_FOR_PROVIDER_RUN` only when:

1. the source manifest is closed and versioned;
2. every source included in canonical input is `FROZEN`;
3. every included source is `PUBLIC_ONLY`;
4. every snapshot hash has been recomputed successfully;
5. every provider-visible content hash has been recomputed successfully;
6. every provider-visible evidence item maps to exactly one frozen snapshot and one derived analysis artifact;
7. blocked, excluded, personal-data, and unknown-classification sources are absent from canonical input;
8. `contextos.policy.evidence-auditor.v0.1` is fixed for the run;
9. canonical input has not yet been sent to any provider.

## Failure behavior

Any checksum mismatch, missing snapshot, missing analysis artifact, ambiguous locator, unexpected redirect to unrelated content, truncated capture, non-versioned derivation, unresolved data classification, or untracked source addition causes freeze failure.

The correct result is `NOT_READY`, not a best-effort provider run.
