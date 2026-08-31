# Evidence Freeze Protocol v0.1

## Purpose

Freeze a closed, auditable set of source evidence before any reasoning provider is allowed to analyze a case. The protocol exists to prevent provider portability tests from passing on mutable, unverifiable, or retrospectively edited source material.

## Governing rule

No LLM may create, alter, replace, re-hash, or silently expand the authorized evidence set.

A source is usable by Evidence Auditor only after the deterministic freeze layer has produced all required metadata and verified the snapshot checksum.

## Evidence identities

Two identities MUST remain separate:

1. `Context.OS EvidenceRecord.evidenceId`: identifies an auditable runtime policy/execution record produced by Context.OS.
2. `source_evidence_id`: identifies a frozen source snapshot supplied to Evidence Auditor.

They are not aliases and MUST NOT be mapped one-to-one by name alone.

## Freeze states

Each candidate source has exactly one state:

- `CANDIDATE`: relevant source identified, not yet approved for capture.
- `APPROVED_PENDING_SNAPSHOT`: exact locator approved, snapshot not yet frozen.
- `FROZEN`: exact bytes captured, SHA-256 verified, metadata complete; eligible for provider input.
- `BLOCKED`: source is relevant but cannot yet be frozen because the exact resource, authenticated access, or primary document is unavailable.
- `EXCLUDED`: duplicate, unrelated, superseded, unverifiable, or outside the authorized evidence set.

Only `FROZEN` sources may appear in a provider-facing canonical input.

## Closed-source rule

Before a case run, create `source-manifest.yaml` with the complete source set for that run. Once the run begins, no source may be added or replaced.

If new evidence appears, create a new freeze version and a new run. Never mutate the prior run's manifest.

## Capture method

For each approved source:

1. Resolve the exact final locator. Generic portals, search pages, truncated URLs, and descriptions without a concrete resource are not sufficient.
2. Capture the exact response/file bytes without LLM transformation.
3. Record UTC capture timestamp, requested locator, resolved/final locator, media type, byte length, and capture method.
4. Compute SHA-256 over the exact captured bytes.
5. Store the snapshot and its metadata together.
6. Recompute SHA-256 from the stored snapshot and require an exact match before changing state to `FROZEN`.

## Hashing rule

Source snapshot checksums are SHA-256 of raw captured bytes.

Allowed implementations include:

- `sha256sum <file>`
- Node.js `createHash('sha256').update(buffer).digest('hex')`

Do **not** use `contextos/canonical.ts#sha256` for raw source snapshots. That function hashes canonical JSON serialization of a JavaScript value and serves a different purpose.

## Snapshot storage for P0.6

For the P0.6 portability test, the authoritative snapshot location is the Git branch/commit that contains the case fixture:

`tests/provider-portability/<case_id>/snapshots/`

Store small public-source snapshots directly when redistribution and repository size are reasonable.

If a source is too large, binary-only, access-restricted, or unsuitable for repository storage, mark it `BLOCKED` for P0.6 until an approved immutable object store is configured. Do not substitute a live URL for a missing frozen snapshot and call it equivalent.

No Supabase bucket, external Evidence.OS object store, or institutional repository is assumed by this protocol until one is actually configured and verified.

## Required manifest fields

Every source entry must contain:

- `source_id`
- `source_evidence_id`
- `state`
- `title`
- `source_type`
- `requested_locator`
- `resolved_locator`
- `captured_at_utc`
- `media_type`
- `byte_length`
- `checksum_sha256`
- `snapshot_path`
- `provenance_note`
- `admission_reason`

Fields that are unknown before capture remain `null`; they MUST NOT be fabricated.

## Source evidence ID assignment

For P0.6, `source_evidence_id` is assigned by the deterministic freeze process only after a successful snapshot hash.

Recommended format:

`PUE-COL-001:SRC-001:<first-16-hex-of-sha256>`

The full SHA-256 remains separately stored in `checksum_sha256`. The identifier is a stable reference, not a substitute for checksum verification.

## Admission checks

A source can become `FROZEN` only if all are true:

- exact resource locator is known;
- capture succeeded without truncation;
- stored bytes can be re-read;
- SHA-256 is 64 hexadecimal characters;
- recomputed checksum matches the manifest;
- source is relevant to at least one auditable claim;
- source is not a duplicate masquerading as independent corroboration;
- provenance is recorded;
- no LLM generated or edited the frozen source bytes.

## Duplicates and syndicated reporting

Near-identical articles or syndicated copies may be preserved for provenance, but they must be flagged as a probable shared-origin cluster. They do not count automatically as independent corroboration.

## Dynamic web pages

For dynamic pages, freeze the actual returned representation used for analysis and record the capture timestamp. A later change to the live page does not alter the frozen snapshot.

If JavaScript execution is necessary to reveal content and raw HTTP capture does not contain the evidence, the capture method must say so explicitly and preserve the rendered artifact used for analysis.

## Primary-source preference

Primary institutional documents have priority when available. Secondary reporting remains admissible when it documents contemporaneous statements or when the primary record is unavailable, but its evidentiary weight must be explicit.

A missing primary source is not silently upgraded by repetition across multiple secondary outlets.

## Provider boundary

Providers receive only:

- the canonical request;
- the closed set of `FROZEN` source evidence;
- their immutable `source_evidence_id` values;
- the policy and authority constraints supplied by the deterministic layer.

Provider web browsing must be disabled for the P0.6 run.

## Freeze completion criteria

A case is `READY_FOR_PROVIDER_RUN` only when:

1. the source manifest is closed and versioned;
2. every included source is `FROZEN`;
3. every checksum has been recomputed successfully;
4. every provider-visible evidence item maps to one frozen snapshot;
5. blocked or excluded sources are absent from the provider input;
6. the canonical input has not yet been sent to any provider.

## Failure behavior

Any checksum mismatch, missing snapshot, ambiguous locator, unexpected redirect to unrelated content, truncated capture, or untracked source addition causes freeze failure.

The correct result is `NOT_READY`, not a best-effort provider run.
