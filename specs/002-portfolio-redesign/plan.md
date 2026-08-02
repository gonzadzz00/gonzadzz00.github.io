# Implementation Plan: Portfolio Redesign & Refactor — Visual Depth Addendum

**Branch**: `002-portfolio-redesign` | **Date**: 2026-08-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-portfolio-redesign/spec.md` (User Story 6, FR-021–FR-024, SC-010–SC-012, added 2026-08-02)

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

The bilingual ES/EN support and the initial restrained gradient/spotlight hover accents (the first planning round for this feature) are already implemented and shipped. This addendum plans the follow-up visual-depth request: push the existing cohesive visual system toward a more futuristic, dynamic feel — layered/glass surfaces with glow accents, richer hover/focus micro-interactions, and more dynamic (staggered/depth-based) entrance motion — without adding new content, sections, or heavy dependencies. The technical approach extends the three CSS/JS mechanisms already in place (`global.css` design tokens, `SpotlightHover.astro`, `ScrollReveal.astro`) rather than introducing new ones: new CSS custom properties for a glass/glow surface treatment, an extended hover/focus state on `.card`/`.btn-primary`/`.btn-outline`/nav items, and richer `.reveal`/`.reveal-stagger` keyframe motion — all gated behind the existing `prefers-reduced-motion` and touch-device checks.

## Technical Context

**Language/Version**: Astro 6 (TypeScript in component frontmatter/scripts), HTML, CSS, vanilla client-side JS (no framework runtime)
**Primary Dependencies**: `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existing, retained), Font Awesome via CDN kit script (existing, retained). No new dependencies introduced by this addendum.
**Storage**: Static JSON files under `src/data/` — unaffected by this addendum (visual/interaction layer only, no new entities or fields).
**Testing**: No automated test framework in the project; validation is manual per the constitution's Design & Development Workflow — Chrome + one mobile browser verification, plus a Lighthouse mobile audit before merge, with an added manual pass for `prefers-reduced-motion` fallback (SC-011).
**Target Platform**: Static site served via GitHub Pages, evaluated on modern desktop and mobile browsers
**Project Type**: Web — single static Astro site (no separate frontend/backend split)
**Performance Goals**: Lighthouse Performance score 90+ on mobile continues to hold after the added treatments (SC-003, SC-012)
**Constraints**: Fully static output; WCAG 2.1 AA color contrast and keyboard navigation preserved on new glow/glass surfaces; all new motion/glow effects MUST respect `prefers-reduced-motion` (FR-024); no new external dependency; `backdrop-filter`/glow usage kept scoped (nav + cards/buttons only) to avoid paint-cost regressions
**Scale/Scope**: Same six sections, same low content volume; this addendum touches only shared CSS (`global.css`) and the two existing interaction scripts (`SpotlightHover.astro`, `ScrollReveal.astro`) — no per-section component rewrites

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. GitHub Pages Compatibility | ✅ PASS | Pure CSS/vanilla-JS change to existing static output; no new build step or server dependency. |
| II. Professional Visual Identity | ✅ PASS | Principle II warns against "excessive animations, clashing colors, or inconsistent icon styles." FR-021–FR-024 explicitly bound the new treatments as "restrained," "purposeful," and consistent across all six sections via the existing single design-token system (`global.css`) — extending, not replacing, the cohesive visual system. Not a violation requiring Complexity Tracking. |
| III. Performance & Accessibility | ✅ PASS | No new dependency; glow/glass surfaces use CSS only (`box-shadow`, `backdrop-filter`, existing custom properties); richer entrance motion reuses the existing `IntersectionObserver` in `ScrollReveal.astro`. All effects gated behind `prefers-reduced-motion` (FR-024) and re-verified against the Lighthouse 90+ mobile target (SC-012) before merge. |
| IV. Content-First Architecture | ✅ PASS | No content, copy, or data-model change; purely a presentation-layer addendum. |
| V. Maintainability & Simplicity | ✅ PASS | Reuses existing design-token, spotlight, and scroll-reveal mechanisms instead of introducing an animation library or new component pattern; changes remain centralized in `global.css` plus the two existing interaction scripts. |
| Hosting & Deployment Constraints | ✅ PASS | No change to hosting platform, domain, or CI/CD approach. |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-redesign/
├── plan.md              # This file (/speckit.plan command output) — visual depth addendum
├── research.md          # Phase 0 output — extended with addendum research items
├── data-model.md        # Phase 1 output — unchanged (no new entities)
├── quickstart.md        # Phase 1 output — extended with reduced-motion/visual-depth verification steps
├── contracts/           # Phase 1 output — unchanged (no new content-schema fields)
└── tasks.md             # Phase 2 output (/speckit.tasks command) — existing tasks cover the prior round; addendum tasks to be appended by a follow-up /speckit.tasks run
```

### Source Code (repository root)

```text
src/
├── styles/
│   └── global.css          # Extend: glass/glow surface tokens, richer hover/focus states, dynamic reveal motion, reduced-motion fallbacks
├── components/
│   ├── SpotlightHover.astro # Extend: same pointermove-driven CSS vars, reused by the new glow treatment (no new listener needed)
│   ├── ScrollReveal.astro   # Extend (if needed): same IntersectionObserver, richer CSS-driven motion on `.reveal`/`.reveal-stagger`
│   ├── ThemeToggle.astro    # Unchanged
│   └── LanguageToggle.astro # Unchanged
├── layouts/
│   └── BaseLayout.astro     # Unchanged
├── sections/                # Unchanged markup; inherit new treatment via existing `.card`/`.btn-*`/`.reveal*` classes
└── data/                    # Unchanged — no new entities or fields
```

**Structure Decision**: Single static Astro project (unchanged from the prior round). This addendum is scoped to the shared design-token stylesheet (`src/styles/global.css`) and the two existing interaction scripts; no new files, components, or directories are required, and no section markup needs structural changes since sections already consume the shared `.card`/`.btn-primary`/`.btn-outline`/`.reveal`/`.reveal-stagger` classes.

## Complexity Tracking

*No violations — table not needed.*
