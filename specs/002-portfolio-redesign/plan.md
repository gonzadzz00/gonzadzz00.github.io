# Implementation Plan: Portfolio Redesign & Refactor

**Branch**: `002-portfolio-redesign` | **Date**: 2026-08-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-portfolio-redesign/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

The site is already an Astro static build with a component-per-section architecture, JSON-driven content, sticky scroll-spy navigation, and a light/dark theme toggle — most functional requirements are already satisfied by the current codebase. The two genuinely new capabilities this feature adds are: (1) bilingual ES/EN content with a persistent, single-page language switch (no route change), and (2) restrained animated gradient/spotlight hover accents on cards/buttons. The technical approach extends the existing bilingual-ready JSON data files with `{es, en}` field pairs and reuses the proven `data-theme` localStorage-toggle pattern (already used by `ThemeToggle.astro`) for a new `data-lang` toggle, keeping the site fully static with no new backend, build tooling, or heavy dependency.

## Technical Context

**Language/Version**: Astro 6 (TypeScript in component frontmatter/scripts), HTML, CSS, vanilla client-side JS (no framework runtime)
**Primary Dependencies**: `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existing, retained), Font Awesome via CDN kit script (existing, retained). No new dependencies introduced by this feature.
**Storage**: Static JSON files under `src/data/` (`site-config.json`, `projects.json`, `education.json`, `certifications.json`, `books.json`, `focus-areas.json`, `tech-stack.json`) — N/A database/backend
**Testing**: No automated test framework in the project; validation is manual per the constitution's Design & Development Workflow — Chrome + one mobile browser verification, plus a Lighthouse mobile audit before merge
**Target Platform**: Static site served via GitHub Pages, evaluated on modern desktop and mobile browsers
**Project Type**: Web — single static Astro site (no separate frontend/backend split)
**Performance Goals**: Lighthouse Performance score 90+ on mobile (constitution Principle III / spec SC-003)
**Constraints**: Fully static output (no server-side processing); WCAG 2.1 AA color contrast and keyboard navigation; animations must respect `prefers-reduced-motion`; minimal external dependencies
**Scale/Scope**: Single-developer personal portfolio; 6 sections; low content volume (currently 3 projects, a handful of education/certification/book entries) — optimizing for maintainability, not throughput

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. GitHub Pages Compatibility | ✅ PASS | No new build step, no server code, no new backend dependency. `astro build` continues to emit static output deployed via the existing `.github/workflows/deploy.yml`. |
| II. Professional Visual Identity | ✅ PASS | New gradient/spotlight hover accents extend, not replace, the existing single cohesive visual system (`src/styles/global.css` custom properties); scoped and restrained per FR-014. |
| III. Performance & Accessibility | ✅ PASS | No new heavy dependency; hover accents are CSS/lightweight-JS only and gated behind `prefers-reduced-motion`; bilingual content is pre-rendered at build time (no runtime fetch), preserving the Lighthouse 90+ target. Images are unaffected (already optimized under `public/icon/`, out of scope for this feature to re-touch further than FR-020 requires). |
| IV. Content-First Architecture | ✅ PASS | Existing project entries already carry problem/approach/tools/outcome context (FR-007); bilingual fields extend content without adding filler. |
| V. Maintainability & Simplicity | ✅ PASS | Reuses the existing `data-theme`/localStorage toggle pattern for language, avoiding a new i18n routing framework; JSON data files remain the single source of truth (FR-005), decoupled from layout. |
| Hosting & Deployment Constraints | ✅ PASS | No change to hosting platform, domain, or CI/CD approach. |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/          # Reusable UI: Navbar, Footer, ThemeToggle, ScrollReveal, ImageCarousel
│   └── LanguageToggle.astro   # NEW — mirrors ThemeToggle.astro's data-attribute + localStorage pattern
├── data/                 # Centralized content source (JSON), consumed by sections — no layout logic
│   ├── site-config.json  # Profile: bio, tagline, contact — bilingual text fields become {es, en}
│   ├── projects.json     # Bilingual title/description fields become {es, en}
│   ├── education.json    # Bilingual program field becomes {es, en}
│   ├── certifications.json  # Bilingual name field becomes {es, en}
│   ├── books.json        # Bilingual note field becomes {es, en}
│   ├── focus-areas.json
│   └── tech-stack.json
├── layouts/
│   └── BaseLayout.astro  # Sets initial data-theme (existing) and data-lang (NEW) before render, to avoid FOUC
├── sections/              # One component per portfolio section (Hero, About, Education, Projects,
│                           # Certifications, Books, Contact) — already matches FR-003's self-contained pattern
└── pages/
    └── index.astro        # Single page assembling Navbar + all sections + Footer, in section order

public/
└── icon/                  # Existing optimized images/icons (FR-020), unaffected by this feature

.github/workflows/
└── deploy.yml              # Existing static build + GitHub Pages deploy, unaffected by this feature
```

**Structure Decision**: Single static Astro project (no frontend/backend split — the site itself has no backend). This feature works entirely within the existing structure: it adds one new component (`LanguageToggle.astro`, following the established `ThemeToggle.astro` pattern), extends existing JSON data files with bilingual `{es, en}` field pairs, and adds hover-accent styles to existing section/card CSS. No new top-level directories, no new build step, no framework migration. Legacy root-level `index.html`, `styles.css`, and `carousel.js` predate the Astro migration, are not referenced by the Astro build, and are out of scope for this feature (left untouched).

## Complexity Tracking

*No violations — table intentionally omitted.*
