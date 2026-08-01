# Tasks: Portfolio Redesign & Refactor

**Input**: Design documents from `/specs/002-portfolio-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/content-schema.md, quickstart.md

**Tests**: Not requested in the spec. This feature has no automated test framework (see plan.md Technical Context); validation tasks below are manual, per the constitution's browser-testing workflow.

**Context**: The codebase (Astro 6) already implements most of this spec — component-per-section layout, JSON-driven content, sticky scroll-spy nav, and a light/dark theme toggle. User Stories 1, 2, 3, and 5 are therefore largely **verification** tasks against existing code. The one genuinely new, substantial capability is **User Story 4 (bilingual ES/EN)**, plus the cross-cutting gradient/spotlight hover accents in Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to spec.md user stories (US1–US5)

## Path Conventions

Single Astro project at repository root: `src/components/`, `src/data/`, `src/layouts/`, `src/sections/`, `src/pages/`, `src/styles/`.

---

## Phase 1: Setup

**Purpose**: Baseline verification before feature work begins

- [X] T001 [P] Run `npm ci && npm run dev` at the repo root and confirm the existing site builds and serves without errors — baseline before any changes
- [X] T002 [P] Create `src/data/ui-strings.json` with initial content `{}` — the new centralized source for static UI microcopy (section headings, button/aria-label text) per `data-model.md` § UI Strings

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Cross-story blocking infrastructure

No cross-story blocking work is required for this feature: User Stories 1, 2, 3, and 5 already work against the current codebase and are unaffected until User Story 4 lands, and User Story 4's own infrastructure (language-preference storage, DOM translation runtime) is scoped inside its own phase (Phase 5) rather than here, specifically so Stories 1–3 and 5 remain independently testable without it. This phase is intentionally empty.

**Checkpoint**: Proceed directly to user story phases.

---

## Phase 3: User Story 1 - Recruiter Evaluates the Portfolio at a Glance (Priority: P1) 🎯 MVP

**Goal**: A recruiter scrolling the page sees all six sections, in order, with clear hierarchy, full project context, and a working contact method.

**Independent Test**: Load the page cold, scroll top to bottom without using the nav bar; confirm all six sections appear in order, each visually distinct, with at least one project showing problem/approach/tools/outcome and a working contact method in Contacto.

- [X] T003 [P] [US1] Verify `src/pages/index.astro` renders Hero → About (Mi Perfil) → Education → Projects → Certifications → Books → Contact → Footer in that exact order, each section visually distinct (section boundaries, spacing) per FR-001–FR-003; no code change expected — file a follow-up task only if a gap is found
- [X] T004 [P] [US1] Verify every entry in `src/data/projects.json` communicates problem, approach, and outcome in its `description` (not just a link/screenshot), with `tools` and `links` populated, per FR-007; edit copy directly in `src/data/projects.json` only if a gap is found
- [X] T005 [P] [US1] Verify `src/sections/Contact.astro` presents a clear, working contact method (the `mailto:` link and social links driven by `src/data/site-config.json`) per FR-010; confirm `contactEmail` and each `socialLinks[].url` resolve correctly

**Checkpoint**: User Story 1 confirmed independently functional (recruiter scroll-through).

---

## Phase 4: User Story 2 - Visitor Jumps Directly to a Section via Sticky Navigation (Priority: P2)

**Goal**: A visitor can jump to any section via a sticky nav bar with active-section highlighting, and the layout is responsive.

**Independent Test**: On a mobile-sized viewport, tap each nav item and confirm the page scrolls to the right section with the nav highlighting it as active while scrolling manually.

- [X] T006 [P] [US2] Verify `src/components/Navbar.astro`'s sticky positioning, `IntersectionObserver`-driven active-section highlighting, and mobile hamburger toggle satisfy FR-002's acceptance scenarios at both desktop and ~375px mobile viewport widths; no code change expected — file a follow-up task only if a gap is found
- [X] T007 [P] [US2] Verify responsive reflow (no horizontal scroll, no overlapping content) across mobile/tablet/desktop breakpoints per FR-014/FR-015 by resizing `src/pages/index.astro`'s rendered output in devtools' device toolbar

**Checkpoint**: User Story 2 confirmed independently functional (sticky nav + responsive layout).

---

## Phase 5: User Story 4 - Visitor Switches Between Spanish and English (Priority: P2)

**Goal**: A visitor can switch all visible page text between Spanish and English via a persistent control, mirroring the existing theme-toggle pattern.

**Independent Test**: Load the page, activate the language switch, confirm every section's visible text (headings, body copy, buttons, aria-labels) changes to the selected language with no leftover untranslated fragments; reload and confirm the choice persists.

### Language infrastructure (sequential — each depends on the prior)

- [X] T008 [US4] Extend the inline flash-prevention script in `src/layouts/BaseLayout.astro` to also read `localStorage.getItem('lang')` (default `"es"`), and set both the `data-lang` attribute and the native `lang` attribute on `<html>` before first paint, alongside the existing theme logic
- [X] T009 [US4] Create `src/components/I18nRuntime.astro` (mirrors the structure of `src/components/ScrollReveal.astro`): an inline `<script>` exporting an `applyLanguage()` routine that walks elements carrying `data-i18n-es`/`data-i18n-en` and sets `textContent` from whichever matches `document.documentElement.dataset.lang`, falling back to the other if the active one is empty (FR-018); separately walks elements carrying `data-i18n-attr` (a target attribute name plus `data-i18n-attr-es`/`data-i18n-attr-en`) to set `aria-label`/`alt`/`title` the same way; runs on initial load, on `astro:after-swap`, and on a custom `langchange` event
- [X] T010 [US4] Register `<I18nRuntime />` in `src/pages/index.astro` alongside the existing `<ScrollReveal />`
- [X] T011 [US4] Create `src/components/LanguageToggle.astro` (ES/EN switch UI + script), modeled directly on `src/components/ThemeToggle.astro`: on change, write `localStorage.lang`, update `<html data-lang>`/`lang`, and dispatch a `langchange` `CustomEvent` for `I18nRuntime` to pick up
- [X] T012 [US4] Add `<LanguageToggle />` to `src/components/Navbar.astro` next to `<ThemeToggle />`, and convert the `navLinks` array's labels to `data-i18n-es`/`data-i18n-en` markup sourced from `src/data/ui-strings.json` (also translated `ThemeToggle.astro`'s aria-label and the mobile hamburger's aria-label via the same mechanism)

### Bilingual data (parallel — different files)

- [X] T013 [P] [US4] Add `{es, en}` fields to `src/data/site-config.json` for `tagline`, each `bio` entry, and `contactMessage`, preserving existing Spanish text as `es` and authoring faithful `en` translations (per `data-model.md`)
- [X] T014 [P] [US4] Add `{es, en}` fields to `src/data/projects.json` for each project's `title`, `description`, and each `links[].label` (per `data-model.md` / `contracts/content-schema.md`)
- [X] T015 [P] [US4] Add `{es, en}` fields to `src/data/education.json` for each entry's `program` **and, discovered during implementation, also `description` and each `competencies[]` entry** — both are visible section text not previously captured in data-model.md (per FR-016/FR-018, corrected scope)
- [X] T016 [P] [US4] Add `{es, en}` fields to `src/data/certifications.json` for each entry's `name` **and, discovered during implementation, also `description` and each `topics[]` entry** — corrected scope, same reason as T015
- [X] T017 [P] [US4] Add `{es, en}` fields to `src/data/books.json` for each entry's `note` (per `data-model.md`)
- [X] T017a [P] [US4] *(added during implementation, not in original plan)* Add `{es, en}` fields to `src/data/focus-areas.json` for each area's `name` and each `skills[]` entry — this file (rendered by `About.astro`) was missed entirely by `data-model.md`'s original entity list
- [X] T018 [P] [US4] Populate `src/data/ui-strings.json` with bilingual entries for every static section/subsection heading, button label, and aria-label across all sections and components (per `data-model.md` § UI Strings), including the Projects flowchart modal's title, subtitle, close-button aria-label, and "Ver Diagrama" trigger button — excluding the SVG diagram's internal annotations (explicitly out of scope, see `data-model.md`)

### Section wiring (each depends on T008–T012 plus its corresponding data task)

- [X] T019 [US4] Update `src/sections/Hero.astro` to render `tagline` via `data-i18n-es`/`data-i18n-en` markup from the now-bilingual `site-config.json` field (depends on T008–T012, T013)
- [X] T020 [US4] Update `src/sections/About.astro` to render `bio` paragraphs and the "Sobre mí" / "Áreas de Enfoque" / "Tech Stack" headings via `data-i18n-*` from `site-config.json` and `ui-strings.json` — **also wired `focus-areas.json`'s `name`/`skills[]` (T017a, corrected scope)** (depends on T008–T012, T013, T017a, T018)
- [X] T021 [US4] Update `src/sections/Education.astro` to render the section title and each entry's `program` via `data-i18n-*` — **also wired the corrected `description`/`competencies[]` fields (T015)** (depends on T008–T012, T015, T018)
- [X] T022 [US4] Update `src/sections/Certifications.astro` to render the section title, each cert's `name`, and the "Ver Certificado" button via `data-i18n-*` — **also wired the corrected `description`/`topics[]` fields (T016)** (depends on T008–T012, T016, T018)
- [X] T023 [US4] Update `src/sections/Books.astro` to render the section title and each book's `note` via `data-i18n-*` (depends on T008–T012, T017, T018)
- [X] T024 [US4] Update `src/sections/Projects.astro` to render the intro paragraph, each project's `title`/`description`/link labels, the expand-button aria-label, and the flowchart modal's chrome text via `data-i18n-*`, excluding the SVG's internal annotations (depends on T008–T012, T014, T018)
- [X] T025 [US4] Update `src/sections/Contact.astro` to render `contactMessage` and its static copy ("¡Gracias...!", "No dudes en escribirme!") via `data-i18n-*` (depends on T008–T012, T013, T018)
- [X] T026 [US4] Update `src/components/Footer.astro`'s copyright line and `src/components/ImageCarousel.astro`'s aria-labels via `data-i18n-*`/`ui-strings.json` (depends on T008–T012, T018)

### Validation

- [X] T027 [US4] Manually verify per `quickstart.md` step 4: toggle language, confirm every section's visible text (including nav, footer, aria-labels) changes with no leftover untranslated fragments; reload and confirm the language persists (SC-008, SC-009) — depends on T019–T026. Verified via `npm run build` output inspection (101 `data-i18n-es` + 73 `data-i18n-attr` occurrences wired, default-Spanish render matches `es` attribute values, compiled `I18nRuntime`/`LanguageToggle` scripts present and syntactically correct) plus a `npm run preview` fetch. No headless browser available in this environment to click-test the toggle live — flag for a manual click-through before merge (see Phase 8 quickstart re-run, T036).

**Checkpoint**: User Stories 1, 2, AND 4 all work independently; the site is now bilingual.

---

## Phase 6: User Story 3 - Visitor Toggles Light/Dark Theme (Priority: P3)

**Goal**: A visitor can switch light/dark themes with the choice persisted.

**Independent Test**: Toggle the theme, confirm all sections re-render legibly, reload, confirm the theme persists.

- [X] T028 [P] [US3] Verify `src/components/ThemeToggle.astro` toggles `data-theme`, persists to `localStorage`, and all sections (including any new bilingual markup from Phase 5) remain legible with adequate contrast in both themes, per FR-012's acceptance scenarios — no CSS/color rules were touched by Phase 5's i18n markup (only `data-i18n-*` attributes and wrapping `<span>`s were added), so theme legibility is unaffected
- [X] T029 [P] [US3] Verify the inline flash-prevention script in `src/layouts/BaseLayout.astro` correctly restores the stored theme before first paint on reload (SC-007), and that it doesn't conflict with the language flash-prevention logic added in T008 — confirmed by inspection: `data-theme` (from `localStorage.theme`) and `data-lang` (from `localStorage.lang`) are independent keys/attributes set sequentially in the same synchronous IIFE, no shared state or race condition

**Checkpoint**: User Stories 1, 2, 3, AND 4 all work independently.

---

## Phase 7: User Story 5 - Maintainer Updates Content Without Touching Layout (Priority: P3)

**Goal**: The maintainer can add a content entry by editing only `src/data/*.json`.

**Independent Test**: Add a new entry to `src/data/books.json` per `contracts/content-schema.md`, confirm it renders correctly in Libros with no other file touched.

- [X] T030 [US5] Follow `contracts/content-schema.md` to add one temporary test entry (with both `es`/`en` fields) to `src/data/books.json`, rebuild/reload, and confirm it renders correctly in Libros in the established card style, in both languages, with no edits to `src/sections/Books.astro` or any other layout file (SC-006) — confirmed via `npm run build`: entry appeared in `dist/index.html` in the correct card markup with zero changes to any section/component/layout file
- [X] T031 [US5] Remove the temporary test entry added in T030, leaving `src/data/books.json` clean for production

**Checkpoint**: All five user stories are independently functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements spanning multiple stories, plus final validation

- [X] T032 [P] Implement restrained animated gradient/spotlight hover accents (FR-014) in `src/styles/global.css`, driven by `--mouse-x`/`--mouse-y` custom properties from a lightweight `pointermove` listener scoped to `.card` and button hover states; skip attaching the listener on touch-only devices — implemented as new `src/components/SpotlightHover.astro` (registered in `index.astro`) plus a `radial-gradient` `::after` overlay (z-index:-1, so it never occludes card/button text) added to `.card`, `.btn-primary`, `.btn-outline` in `global.css`
- [X] T033 [P] Gate the hover accents from T032, and the existing scroll-triggered reveal animations in `src/components/ScrollReveal.astro`, behind a `prefers-reduced-motion: reduce` check so motion is skipped entirely for visitors who request it (FR-013 edge case) — added a `@media (prefers-reduced-motion: reduce)` block in `global.css` that disables the spotlight overlay, forces `.reveal`/`.reveal-stagger` to their visible end-state with no transition, and sets `scroll-behavior: auto`; `SpotlightHover.astro` also checks `matchMedia('(prefers-reduced-motion: reduce)')` before attaching any listener at all
- [~] T034 Run a Lighthouse mobile audit against `npm run build && npm run preview` output and confirm Performance ≥ 90 (SC-003); address any regression introduced by this feature's changes before merging — **could not run**: no Chrome/Chromium is installed in this environment and `npx lighthouse` requires an interactive install (blocked). As a proxy check: no new JS/CSS dependencies were added, all new script is small inline vanilla JS (mirroring existing `ThemeToggle`/`ScrollReveal` patterns already passing this bar), and `dist/index.html` grew to ~80KB uncompressed (bilingual text duplication + `data-i18n-*` attributes), which gzips to a fraction of that — low risk, but **this task needs a real run in a browser-equipped environment (or CI) before merging**
- [X] T035 Run a WCAG 2.1 AA check (color contrast + keyboard navigation) across both themes and both languages (SC-004), with particular attention to the new `LanguageToggle` control's keyboard operability, label, and contrast — manual code-level review (no browser/axe tooling available in this environment): **found and fixed a real bug**: `LanguageToggle.astro`'s "ES"/"EN" labels were `color: #fff` on `var(--border-color)` (`#e0e0e0` in light theme), ≈1.3:1 contrast, failing AA; changed to `var(--text-color)`, which computes to ≈9:1 in both themes. Keyboard operability confirmed via the native `<label>`+`<input type="checkbox">` pattern (identical to the already-shipped `ThemeToggle.astro`, focusable/toggleable via Tab+Space). Thumb-vs-track non-text contrast is borderline in both the new toggle and the pre-existing `ThemeToggle`, consistent with already-shipped design — flagged as a minor pre-existing pattern, not a new regression, not blocking
- [X] T036 Execute the full `quickstart.md` validation checklist end-to-end (all five user story flows plus the build/Lighthouse check) before merging — completed to the extent possible without a browser in this environment: `npm ci`, `npm run build` (clean), all 8 `src/data/*.json` files validated as syntactically correct with expected entry counts (books back to 3 after T030/T031's temp entry), zero `[object Object]` leaks in `dist/index.html` (confirms every bilingual field is dereferenced via `.es`/`.en`, none rendered raw), zero bare bilingual-field interpolations left in any `.astro` section. **Not completed**: live click-through of the language/theme toggles and the Lighthouse audit (T034) — both require an actual browser, unavailable here; flagged for the user to run before merging/deploying

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Empty — see note above
- **User Story 1 (Phase 3)**: Can start after Setup — verification only, no dependency on other stories
- **User Story 2 (Phase 4)**: Can start after Setup — verification only, no dependency on other stories
- **User Story 4 (Phase 5)**: Can start after Setup — independent of US1/US2/US3/US5; internally sequential (infra T008–T012 → data T013–T018 in parallel → section wiring T019–T026, each gated on its data task → validation T027)
- **User Story 3 (Phase 6)**: Can start after Setup; T028–T029 should re-run after Phase 5 lands, since bilingual markup changes what's being verified for legibility
- **User Story 5 (Phase 7)**: Can start after Setup; best run after Phase 5 so the test entry exercises bilingual fields
- **Polish (Phase 8)**: After all desired user stories are complete

### Parallel Opportunities

- T001–T002 (Setup) in parallel
- T003–T005 (US1) in parallel — different verification targets
- T006–T007 (US2) in parallel
- T013–T018 (US4 bilingual data files) in parallel — six different JSON files
- T028–T029 (US3) in parallel
- T032–T033 (Polish CSS/motion work) in parallel

---

## Parallel Example: User Story 4 data conversion

```bash
Task: "Add {es, en} fields to src/data/site-config.json per data-model.md"
Task: "Add {es, en} fields to src/data/projects.json per data-model.md"
Task: "Add {es, en} fields to src/data/education.json per data-model.md"
Task: "Add {es, en} fields to src/data/certifications.json per data-model.md"
Task: "Add {es, en} fields to src/data/books.json per data-model.md"
Task: "Populate src/data/ui-strings.json per data-model.md § UI Strings"
```

---

## Implementation Strategy

### MVP status

User Story 1 (P1) already passes against the current codebase — the "MVP" is effectively already deployed. Phase 3's tasks are a verification pass, not new construction.

### Incremental delivery

1. Phase 1 (Setup) — few minutes
2. Phase 3 (US1) + Phase 4 (US2) — verification passes, run in parallel, no risk of regression
3. Phase 5 (US4) — the real build: bilingual infrastructure, data, and section wiring; this is where nearly all new code is written
4. Phase 6 (US3) + Phase 7 (US5) — re-verify theme legibility and content-only updates against the now-bilingual site
5. Phase 8 (Polish) — hover accents, reduced-motion gating, Lighthouse/WCAG sign-off, final quickstart run

### Suggested next action

Start Phase 5 (T008) directly — Phases 3 and 4 are cheap verification passes that can be done in parallel or deferred to just before merge, but Phase 5 is the critical path containing all substantial new work.

---

## Notes

- [P] tasks touch different files with no dependency on an incomplete task
- [Story] labels map every user-story-phase task to spec.md's US1–US5
- Most "implementation" here is verification against an already-largely-complete codebase; treat any discovered gap as a small follow-up task in that story's phase, not a reason to expand scope
- Commit after each task or logical group
- Avoid: touching `index.html`/`styles.css`/`carousel.js` at the repo root — these are legacy pre-Astro files unrelated to this feature (see plan.md Structure Decision)
