# Phase 1 Data Model: Portfolio Redesign & Refactor

Source of truth for all entities is the JSON files under `src/data/`. Text fields that are visitor-facing MUST be bilingual objects (`{ "es": string, "en": string }`); non-text attributes (dates, URLs, image paths, ordering, icons) are shared across languages. This directly implements spec FR-005, FR-016–018 and Key Entities.

## Profile (`site-config.json`)

| Field | Type | Bilingual? | Notes |
|---|---|---|---|
| `ownerName` | string | No | Proper noun, unchanged across languages |
| `tagline` | `{es, en}` | Yes | Short role/title line |
| `bio` | `{es, en}` — each an array of strings | Yes | Paragraph list shown in Mi Perfil |
| `profileImage` | string (path) | No | |
| `socialLinks` | array of Contact Method | No (labels are proper nouns/icons) | |
| `contactMessage` | `{es, en}` | Yes | Shown in Contacto |
| `contactEmail` | string | No | |

**Validation rules**: `tagline`, each `bio` entry, and `contactMessage` MUST have both `es` and `en` populated at authoring time; if one is temporarily missing, rendering falls back to the other (FR-018) rather than showing nothing.

## Education Entry (`education.json`)

| Field | Type | Bilingual? |
|---|---|---|
| `institution` | string | No (proper noun) |
| `program` | `{es, en}` | Yes |
| `description` | `{es, en}` | Yes (corrected during implementation — visible body text, originally missed) |
| `competencies` | array of `{es, en}` | Yes (corrected during implementation — visible list text, originally missed) |
| `dateRange` / `startDate`/`endDate` | string/date | No |
| `order` | number | No |

## Project (`projects.json`)

| Field | Type | Bilingual? |
|---|---|---|
| `id` | string | No |
| `title` | `{es, en}` | Yes |
| `description` | `{es, en}` | Yes — MUST cover problem, approach, outcome (tools listed separately) per FR-007 |
| `tools` | array of string | No (technology names) |
| `images` | array of `{ src, alt }` | `alt` SHOULD be bilingual for accessibility; `src` shared |
| `links` | array of `{ label, url, icon }` | `label` yes — visible link text (e.g. "Ver Proyecto"/"View Project") |
| `category` | string | No |
| `order` | number | No |

## Certification Entry (`certifications.json`)

| Field | Type | Bilingual? |
|---|---|---|
| `name` | `{es, en}` | Yes |
| `description` | `{es, en}` | Yes (corrected during implementation — visible body text, originally missed) |
| `topics` | array of `{es, en}` | Yes (corrected during implementation — visible list text, originally missed) |
| `issuer` | string | No (proper noun) |
| `date` | string/date | No |
| `order` | number | No |

## Focus Area (`focus-areas.json`, NOT captured in the original data model — corrected during implementation)

Rendered by `About.astro` under Mi Perfil. Missed entirely in the initial pass.

| Field | Type | Bilingual? |
|---|---|---|
| `name` | `{es, en}` | Yes |
| `icon` | string (icon class) | No |
| `skills` | array of `{es, en}` | Yes |

## Book Entry (`books.json`)

| Field | Type | Bilingual? |
|---|---|---|
| `title` | string | No (proper noun) |
| `author` | string | No (proper noun) |
| `note` | `{es, en}` | Yes (optional) |
| `coverImage` | string (path) | No |
| `order` | number | No |

## Contact Method (embedded in `Profile.socialLinks`)

| Field | Type | Bilingual? |
|---|---|---|
| `label` | string | No (e.g., "LinkedIn", "Email" — proper nouns/labels kept as-is) |
| `url` | string | No |
| `icon` | string (icon class) | No |

## UI Strings (`src/data/ui-strings.json`, NEW)

Static microcopy that is not tied to a content entity — section headings, nav labels, button/aria-label text, empty-state and modal chrome, footer copyright — is hardcoded directly in section/component files today (e.g. "Educación" in `Education.astro`, "Ver Certificado" in `Certifications.astro`, "Expandir proyecto" aria-label in `Projects.astro`, the footer copyright line). These are visible text and MUST also switch with `data-lang` per FR-016, so they move into one new bilingual dictionary file, keyed by a stable string ID:

```json
{
  "nav.miPerfil": { "es": "Mi Perfil", "en": "My Profile" },
  "section.educacion.title": { "es": "Educación", "en": "Education" },
  "projects.expandAria": { "es": "Expandir proyecto", "en": "Expand project" },
  "footer.rights": { "es": "Todos los derechos reservados.", "en": "All rights reserved." }
}
```

**Validation rule**: every key MUST have both `es` and `en`; components read the active language the same way as bilingual content fields (§ Bilingual text field type in `contracts/content-schema.md`).

**Scope note**: the Projects section's flowchart-diagram modal (`src/sections/Projects.astro`) contains an inline SVG with dozens of Spanish technical annotations (table/field names, pipeline stage labels). Only the modal's chrome (title, subtitle, close-button aria-label, "Ver Diagrama" trigger button) is in scope for `ui-strings.json`; the SVG's internal diagram annotations are treated as a technical artifact (akin to code) and are out of scope for translation in this feature.

## Client-side preference state (not persisted in `src/data/`)

| Key | Storage | Values | Owner |
|---|---|---|---|
| `theme` | `localStorage` | `"light"` \| `"dark"` | Existing `ThemeToggle.astro` (unchanged by this feature) |
| `lang` | `localStorage` | `"es"` \| `"en"` | New `LanguageToggle.astro`, mirrors the `theme` key's pattern |

**State transitions**: Both `theme` and `lang` are independent two-state toggles set via user interaction, persisted immediately on change, and read once at initial page load (inline script in `BaseLayout.astro`, before first paint) to avoid a flash of the wrong theme/language. Default `lang` on first visit (no stored value) is `"es"`, matching the current site (per spec Assumptions).
