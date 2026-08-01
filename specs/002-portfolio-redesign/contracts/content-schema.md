# Contract: Centralized Content Data Source

This is a static site with no external API. Its "interface" is the contract between the **content author** (the maintainer, editing JSON) and the **section components** (Astro components that render it), per spec FR-005 and User Story 5. A section component MUST render correctly for any JSON conforming to the shape below, and MUST NOT require edits when only content — not shape — changes.

## Bilingual text field type

Every visitor-facing text field uses this shape:

```json
{ "es": "Texto en español", "en": "Text in English" }
```

A section component reading a bilingual field MUST:
1. Read the currently active language from the `data-lang` attribute on `<html>` (or an equivalent passed-in value).
2. Fall back to whichever of `es`/`en` is non-empty if the active language's value is missing (FR-018) — never render an empty string or a literal placeholder.

## File contracts

### `src/data/site-config.json`

```json
{
  "ownerName": "string",
  "tagline": { "es": "string", "en": "string" },
  "bio": [{ "es": "string", "en": "string" }],
  "profileImage": "string (path under /icon)",
  "socialLinks": [{ "label": "string", "url": "string", "icon": "string (icon class)" }],
  "contactMessage": { "es": "string", "en": "string" },
  "contactEmail": "string"
}
```

### `src/data/projects.json` (array)

```json
[{
  "id": "string (unique)",
  "title": { "es": "string", "en": "string" },
  "description": { "es": "string", "en": "string" },
  "tools": ["string"],
  "images": [{ "src": "string (path)", "alt": "string" }],
  "links": [{ "label": { "es": "string", "en": "string" }, "url": "string", "icon": "string" }],
  "category": "string",
  "order": "number"
}]
```

### `src/data/education.json` (array)

```json
[{
  "institution": "string",
  "program": { "es": "string", "en": "string" },
  "dateRange": "string",
  "order": "number"
}]
```

### `src/data/certifications.json` (array)

```json
[{
  "name": { "es": "string", "en": "string" },
  "issuer": "string",
  "date": "string",
  "order": "number"
}]
```

### `src/data/books.json` (array)

```json
[{
  "title": "string",
  "author": "string",
  "note": { "es": "string", "en": "string" },
  "coverImage": "string (path)",
  "order": "number"
}]
```

## Adding a new entry (User Story 5 — Independent Test)

To add a new project, certification, or book:

1. Append one object to the corresponding array in `src/data/*.json`, following the shape above, with both `es` and `en` populated for every bilingual field.
2. Do not edit any file under `src/sections/`, `src/components/`, or `src/layouts/`.
3. Rebuild/reload — the new entry MUST appear in the correct section, in the position dictated by its `order` field, styled consistently with existing entries.

If step 3 requires touching a section/component/layout file, the section is not honoring this contract and must be fixed.

## `src/data/ui-strings.json` (NEW)

Static microcopy not tied to a content entity (section headings, nav labels, aria-labels, button text, footer copyright). Flat map of string ID → bilingual value:

```json
{ "<string.id>": { "es": "string", "en": "string" } }
```

Section components MUST read heading/label text from this file instead of hardcoding Spanish inline. See `data-model.md` § UI Strings for the scope note on the Projects flowchart modal's SVG diagram (out of scope for translation).
