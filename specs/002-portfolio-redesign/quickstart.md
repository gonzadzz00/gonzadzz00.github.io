# Quickstart: Portfolio Redesign & Refactor

## Run locally

```bash
npm ci
npm run dev
```

Opens the Astro dev server (default `http://localhost:4321`). The site is a single page (`src/pages/index.astro`) assembling `Navbar`, all six sections, and `Footer`.

## Verify the primary flows (maps to spec User Stories)

1. **Recruiter scroll-through (US1)**: Load the page, scroll top to bottom, confirm all six sections appear in order (Mi Perfil, Educación, Proyectos, Certificaciones, Libros, Contacto) with a project entry showing problem/approach/tools/outcome, and a working contact method in Contacto.
2. **Sticky nav (US2)**: Resize to a mobile viewport, tap each nav item, confirm the page scrolls to the right section and the nav highlights the active one as you scroll manually.
3. **Theme toggle (US3)**: Toggle light/dark via the navbar switch, reload the page, confirm the theme persisted.
4. **Language toggle (US4)**: Toggle ES/EN via the new language switch, confirm every section's visible text changes (not just headings), reload, confirm the language persisted.
5. **Content update without layout changes (US5)**: Add a new entry to `src/data/books.json` (see `contracts/content-schema.md` for the shape, including `es`/`en` fields), reload, confirm it appears in Libros with no other file touched.

## Build & performance check

```bash
npm run build
npm run preview
```

Run a Lighthouse mobile audit against the preview URL and confirm Performance ≥ 90 (spec SC-003) before merging, per the constitution's browser-testing requirement.

## Where to edit content

All visitor-facing text lives in `src/data/*.json`. See `contracts/content-schema.md` for the exact shape of each file, including which fields must be bilingual (`{ "es": ..., "en": ... }`) and which are shared across languages (dates, URLs, image paths).
