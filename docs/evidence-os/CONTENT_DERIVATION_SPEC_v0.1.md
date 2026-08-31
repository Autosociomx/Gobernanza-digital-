# Content Derivation Specification v0.1

## Purpose

Define exactly how a frozen source snapshot becomes the UTF-8 analysis content supplied to a reasoning provider.

This specification exists to prevent an extractor, a human, or an LLM from silently changing what the provider sees after `snapshot_sha256` has already been fixed.

## Integrity model

Each source has two independent integrity assertions:

1. `snapshot_sha256`: SHA-256 of the exact captured source bytes.
2. `analysis_content_sha256`: SHA-256 of the exact UTF-8 bytes produced by a named and versioned derivation method.

The derivation implementation itself MUST be version-controlled and its method identifier MUST be recorded in the source manifest.

### Important non-claim

Hash inequality between two different captures does **not** prove a substantive change in the source.

A live page may vary because of publication timestamps, ads, counters, related-content modules, experiments, or other dynamic material. `snapshot_sha256` and `analysis_content_sha256` prove exact byte/content identity for one frozen capture. A future claim that a source changed substantively requires a separate deterministic or reviewed comparison process.

Do not rewrite, normalize, or re-hash an artifact after capture merely to make two captures match.

---

# `raw_utf8_v1`

## Preconditions

- input snapshot is text intended to be interpreted as UTF-8;
- UTF-8 decoding MUST succeed without replacement characters caused by invalid byte sequences.

If decoding fails, derivation fails. Do not guess another encoding inside `raw_utf8_v1`.

## Algorithm

1. Decode the exact snapshot bytes as UTF-8.
2. Remove an initial Unicode BOM (`U+FEFF`) if and only if it is the first decoded code point.
3. Normalize line endings `CRLF` and bare `CR` to `LF`.
4. Do not change case, punctuation, numbers, accents, Unicode normalization form, internal whitespace, or wording.
5. Encode the resulting string as UTF-8.
6. Compute `analysis_content_sha256` over those exact bytes.

No trimming is performed. The exact resulting string is the provider-visible artifact.

Method metadata:

```yaml
method: raw_utf8_v1
version: "1"
```

---

# `html_text_v1`

## Definition of deterministic

For the same snapshot bytes, the same implementation version and the same declared parser version, `html_text_v1` MUST produce byte-for-byte identical UTF-8 output on every run.

Determinism is scoped to a frozen snapshot. It does not promise that two separate live captures of the same URL will have identical hashes.

## Preconditions

`html_text_v1` accepts only snapshots that satisfy all of the following:

- the captured representation is HTML;
- decoding as UTF-8 succeeds without replacement caused by invalid byte sequences;
- the parser is exactly `parse5@5.1.1` for `html_text_v1`;
- a deterministic content root can be selected by the rules below.

If any precondition fails, derivation MUST fail closed. No LLM extraction, browser summarization, manual copy/paste, readability service, or site-specific cleanup is an allowed fallback.

## 1. Decode

1. Decode exact snapshot bytes as UTF-8.
2. Remove an initial BOM only when it is the first code point.
3. Normalize parser input line endings to `LF`.
4. Do not apply Unicode compatibility normalization such as NFKC.

The implementation MUST record the exact parser package and version used. `html_text_v1` is bound to `parse5@5.1.1`. A parser upgrade requires a new derivation implementation version or an explicit reproducibility review proving no observable output change across the complete frozen fixture corpus.

## 2. Parse

Parse the complete HTML document using `parse5@5.1.1`.

Parsing errors that this parser deterministically recovers from are acceptable. Fatal decoding or parser failures are not.

## 3. Select one content root

Content root selection is structural, not semantic and not AI-assisted.

Priority:

1. If one or more `<article>` elements exist, select the `<article>` with the largest normalized visible-text length after the exclusion rules below. Ties are resolved by earliest document order.
2. Otherwise, if one or more `<main>` elements exist, select the `<main>` with the largest normalized visible-text length. Ties are resolved by earliest document order.
3. Otherwise fail with `HTML_CONTENT_ROOT_NOT_FOUND`.

`html_text_v1` deliberately has no `<body>` fallback. A noisy but apparently successful extraction is worse for P0.6 than an explicit `NOT_READY` result.

## 4. Exclude structural non-evidence nodes

Before text serialization, remove these elements and their descendants from the selected root:

- `script`
- `style`
- `noscript`
- `template`
- `svg`
- `canvas`
- `iframe`
- `object`
- `embed`
- `form`
- `button`
- `input`
- `select`
- `textarea`
- `nav`
- `aside`
- `footer`

Also exclude any element with:

- the boolean `hidden` attribute; or
- `aria-hidden="true"`, compared case-insensitively after ASCII whitespace trimming.

No element is removed merely because a class or id contains words such as `ad`, `sponsor`, `related`, `share`, or `cookie`. Those heuristics are unstable across sites and would make the extractor silently editorialize the source.

Site-specific selectors are forbidden in `html_text_v1`.

## 5. Included textual structures

Traverse the remaining selected root in DOM document order.

Preserve text from ordinary inline and block elements, including headings, paragraphs, blockquotes, lists, figures/captions, and tables.

### Tables

Tables are evidence-bearing and MUST NOT be flattened into an unordered text bag.

Serialize each table row in DOM order. Within each row, serialize `th` and `td` cells in DOM order separated by a single TAB (`U+0009`). Separate rows with `LF`.

Nested block text inside a cell is normalized using the ordinary text rules before cell joining.

### Lists

Serialize each `li` as one logical line in DOM order. No synthetic bullet character or numbering is added, because numbering may already exist in source text and synthetic markers would alter provider-visible content.

## 6. Text normalization

For ordinary non-`pre` text:

1. HTML character references are decoded by the parser.
2. Convert non-breaking space (`U+00A0`) to ASCII space (`U+0020`).
3. Convert tab, form-feed, carriage return, and line-feed occurring inside a logical text block to spaces before block normalization.
4. Collapse each run of Unicode whitespace characters inside a logical block to one ASCII space.
5. Trim leading and trailing whitespace from each logical block.
6. Discard empty logical blocks.
7. Join logical blocks with exactly one `LF`.

For `pre` elements:

- preserve internal spaces and line structure;
- normalize only line endings to `LF`;
- do not collapse internal whitespace.

Do not alter:

- letter case;
- punctuation;
- digits or monetary values;
- diacritics;
- dates;
- names;
- quotation marks;
- minus signs versus hyphens;
- Unicode normalization form.

## 7. Dynamic text policy

`html_text_v1` does not use regexes to delete phrases such as `hace 5 minutos`, view counts, publication dates, or update timestamps when those phrases are inside the selected content root.

If such text was part of the frozen representation used for analysis, it remains evidence of what the captured page displayed at that time.

Noise reduction is structural only. A separate future comparison layer may classify differences between two frozen captures as substantive or non-substantive; hashes alone do not make that judgment.

## 8. Output

The derivation output is exactly:

- UTF-8 encoding;
- no BOM;
- logical blocks separated by one `LF`;
- no automatically appended trailing newline.

Compute `analysis_content_sha256` over those exact UTF-8 bytes.

Method metadata:

```yaml
method: html_text_v1
version: "1"
parser:
  package: parse5
  version: "5.1.1"
```

A source MUST NOT be marked `FROZEN` with `html_text_v1` until `parse5@5.1.1` is promoted to an explicit direct development dependency and the implementation passes the reproducibility tests below.

## 9. Required reproducibility tests

The implementation MUST include fixtures proving at least:

1. identical HTML snapshot → identical output bytes and hash across repeated runs;
2. scripts/styles/navigation/aside/footer are excluded;
3. hidden and `aria-hidden=true` content is excluded;
4. article is preferred to main;
5. largest article wins deterministically; tie resolves by document order;
6. absence of article/main fails closed;
7. table row/cell order is preserved;
8. whitespace normalization is stable;
9. `pre` whitespace is preserved except line endings;
10. dynamic text inside the selected root is preserved, not guessed away;
11. malformed but parser-recoverable HTML yields stable output;
12. invalid UTF-8 fails closed.

## 10. Change control

Any change to root selection, exclusion list, whitespace rules, table serialization, encoding behavior, or parser behavior requires a new method version such as `html_text_v2` unless reproducibility analysis proves the observable output contract is unchanged for the entire frozen fixture corpus.

Never silently change the implementation behind the same method/version after a provider run has been recorded.