# Tasks: Modular Interactive Portfolio Refactor

**Input**: Design documents from `/specs/001-modular-interactive-portfolio/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: No automated tests — this is a static portfolio. Validation is manual (browser testing + Lighthouse).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Initialize Astro project and establish base structure

- [x] T001 Initialize Astro project with `npm create astro@latest` in repository root, configure `astro.config.mjs` with site URL `https://gonzadzz00.github.io` and output `static`
- [x] T002 Install dependencies: `bootstrap@5.3`, `@fontsource/montserrat`, `@fontsource/open-sans` via npm
- [x] T003 [P] Create GitHub Actions deployment workflow in `.github/workflows/deploy.yml` per plan.md spec
- [x] T004 [P] Migrate static assets from `icon/` to `public/icon/` and project images to `public/images/`, preserving filenames
- [x] T005 [P] Create `src/styles/global.css` with design tokens (CSS custom properties for colors, spacing, typography, transitions) extracted from current `styles.css`, including `[data-theme="dark"]` variable overrides

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout and navigation that ALL sections depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create `src/layouts/BaseLayout.astro` with HTML shell, `<head>` (meta, fonts, Bootstrap CSS, Font Awesome, global.css), inline `<script>` for theme detection from `localStorage` (prevents flash), and `<slot>` for page content
- [x] T007 Create `src/components/Navbar.astro` with responsive navigation bar: logo, section links (Mi Perfil, Educacion, Proyectos, Certificaciones, Libros, Contacto), mobile hamburger menu, and smooth-scroll anchor behavior
- [x] T008 Create `src/components/ThemeToggle.astro` as a `client:load` island that toggles `data-theme` attribute on `<html>` and persists to `localStorage`, integrated into Navbar
- [x] T009 Create `src/components/Footer.astro` with social links and copyright
- [x] T010 Create `src/pages/index.astro` as the single entry point that imports BaseLayout and will compose all section components (initially empty placeholder sections)
- [x] T011 Verify `npm run build` produces working `dist/` output and `npm run dev` serves the site locally with Navbar, ThemeToggle, and Footer rendering correctly

**Checkpoint**: Foundation ready — site builds, serves, has navigation and theme toggle. User story implementation can begin.

---

## Phase 3: User Story 1 — Modular Section Architecture (Priority: P1) MVP

**Goal**: Each content section is an independent Astro component fed by JSON data. Adding/removing a section requires no changes to other sections.

**Independent Test**: Add the Books section module and verify it renders without modifying any other section file.

### Content Extraction (Data Files)

- [x] T012 [P] [US1] Create `src/data/site-config.json` with owner name, tagline, bio paragraphs, and social links extracted from current `index.html` About and Contact sections
- [x] T013 [P] [US1] Create `src/data/focus-areas.json` with focus area entries (Ciencia de Datos, Visualizacion, Ingenieria de Datos) extracted from current `index.html`, each with id, name, icon, and skills array
- [x] T014 [P] [US1] Create `src/data/tech-stack.json` with technology badge entries (name + shields.io badge URL) extracted from current `index.html` tech stack section
- [x] T015 [P] [US1] Create `src/data/education.json` with education entries (ISTEA, UGR) extracted from current `index.html`, each with institution, program, description, competencies, logo path, and URL
- [x] T016 [P] [US1] Create `src/data/projects.json` with project entries (3 projects) extracted from current `index.html`, each with title, description, tools, images array, and links array
- [x] T017 [P] [US1] Create `src/data/certifications.json` with certification entries extracted from current `index.html` courses section (HUMAI Ingenieria de Datos, Docker course), each with name, issuer, date, description, topics
- [x] T018 [P] [US1] Create `src/data/books.json` as an empty array placeholder (to be populated by Gonzalo)

### Section Components

- [x] T019 [P] [US1] Create `src/sections/Hero.astro` that imports `site-config.json` and renders hero header with name, tagline, and scroll-down call to action
- [x] T020 [P] [US1] Create `src/sections/About.astro` that imports `site-config.json`, `focus-areas.json`, and `tech-stack.json`, and renders the bio, focus area cards, and tech stack badges
- [x] T021 [P] [US1] Create `src/sections/Education.astro` that imports `education.json` and renders education cards with institution logo, program, description, and competencies
- [x] T022 [P] [US1] Create `src/sections/Projects.astro` that imports `projects.json` and renders project cards with title, description, tools, and links (carousel deferred to US3)
- [x] T023 [P] [US1] Create `src/sections/Certifications.astro` that imports `certifications.json` and renders certification cards with issuer, name, date, and topics
- [x] T024 [P] [US1] Create `src/sections/Books.astro` that imports `books.json` and renders book entries, or shows a placeholder message if array is empty
- [x] T025 [P] [US1] Create `src/sections/Contact.astro` that imports `site-config.json` and renders contact links (LinkedIn, GitHub, email)

### Assembly

- [x] T026 [US1] Update `src/pages/index.astro` to import and compose all section components (Hero, About, Education, Projects, Certifications, Books, Contact) in order with section `id` attributes matching Navbar anchors
- [x] T027 [US1] Update `src/components/Navbar.astro` to dynamically generate nav links based on which sections are present in `index.astro`, ensuring removed sections do not leave broken links
- [x] T028 [US1] Verify modularity: temporarily remove Books section import from `index.astro`, confirm site builds and remaining sections render with no errors or visual gaps, then restore it

**Checkpoint**: All content from current site is migrated into modular Astro components. Each section is independent. Adding a new section means creating one `.astro` file + one `.json` data file.

---

## Phase 4: User Story 2 — Professional Visual Redesign (Priority: P2)

**Goal**: Cohesive, polished design system with consistent typography, colors, spacing, responsive layout, and dark/light theme across all sections.

**Independent Test**: Load site on desktop (1440px) and mobile (375px), verify consistent visual system and theme toggle across all sections.

### Design System

- [x] T029 [US2] Refine `src/styles/global.css` design tokens: establish a spacing scale (4px/8px/16px/24px/32px/48px/64px), typography scale (h1-h4, body, small), and transition tokens. Define both light and dark palettes in CSS custom properties
- [x] T030 [US2] Add Bootstrap utility overrides and custom component base styles (cards, buttons, badges, section containers) to `src/styles/global.css` using the design token variables

### Section Styling

- [x] T031 [P] [US2] Style `src/sections/Hero.astro` with full-viewport hero, centered name/tagline, professional gradient or background treatment, responsive typography, and animated entrance
- [x] T032 [P] [US2] Style `src/sections/About.astro` with refined bio layout, focus area card grid (responsive 1/2/3 columns), and tech stack badge wrap
- [x] T033 [P] [US2] Style `src/sections/Education.astro` with polished education cards: institution logo alignment, clean typography hierarchy, responsive stacking
- [x] T034 [P] [US2] Style `src/sections/Projects.astro` with professional project card grid, hover effects, consistent spacing, and responsive 1/2 column layout
- [x] T035 [P] [US2] Style `src/sections/Certifications.astro` with clean certification card layout, issuer branding, responsive grid
- [x] T036 [P] [US2] Style `src/sections/Books.astro` with book list/card design, category grouping visual treatment
- [x] T037 [P] [US2] Style `src/sections/Contact.astro` with professional contact section, social icon links, clear CTA

### Navigation & Theme

- [x] T038 [US2] Style `src/components/Navbar.astro` with sticky positioning, backdrop blur, smooth show/hide on scroll, active section highlighting, and mobile hamburger animation
- [x] T039 [US2] Verify dark/light theme: toggle between themes and confirm every section, card, navbar, and footer renders correctly in both modes with no visual artifacts

### Scroll Animations

- [x] T040 [US2] Add CSS scroll-triggered entrance animations to section components using `@keyframes` and `IntersectionObserver` in a shared `src/components/ScrollReveal.astro` utility component (replaces AOS.js)
- [x] T041 [US2] Apply ScrollReveal to all section components in `src/pages/index.astro` or within each section's markup

### Responsive Validation

- [x] T042 [US2] Test and fix responsive layout at breakpoints: 320px, 375px, 768px, 1024px, 1440px, 2560px. Ensure no horizontal overflow, readable text, and usable touch targets on mobile

**Checkpoint**: The site has a professional, cohesive visual design. All sections styled consistently. Dark/light theme works flawlessly. Responsive on all viewports.

---

## Phase 5: User Story 3 — Interactive Project Showcases (Priority: P3)

**Goal**: Projects section features engaging interactive cards with image carousels, expandable details, and smooth transitions.

**Independent Test**: Click project cards to expand, navigate image carousels, confirm smooth animations and complete content.

- [x] T043 [P] [US3] Create `src/components/ImageCarousel.astro` as a `client:visible` island with prev/next buttons, dot indicators, touch swipe support, and smooth CSS transitions between images
- [x] T044 [P] [US3] Create `src/components/ProjectCard.astro` with expandable detail view: collapsed state shows title + brief description + tools, expanded state shows full description + carousel + links
- [x] T045 [US3] Update `src/sections/Projects.astro` to use the new ProjectCard and ImageCarousel components, passing data from `projects.json`
- [x] T046 [US3] Add expand/collapse animation to ProjectCard using CSS transitions (max-height or grid-template-rows technique) for smooth open/close
- [x] T047 [US3] Verify carousel interactions: prev/next navigation, dot indicators, touch swipe on mobile, keyboard arrow key support for accessibility
- [x] T048 [US3] Ensure project cards maintain layout stability during expand/collapse (no cumulative layout shift)

**Checkpoint**: Projects section is fully interactive. Carousels work smoothly. Cards expand/collapse with clean animations. Accessible via keyboard.

---

## Phase 6: User Story 4 — Structured Books & Certifications Sections (Priority: P4)

**Goal**: Dedicated, data-driven sections for Books and Certifications that Gonzalo can update by editing JSON only.

**Independent Test**: Add a new entry to `books.json` and `certifications.json`, verify they appear without code changes.

- [x] T049 [P] [US4] Create `src/components/CertificationCard.astro` with fields: name, issuer logo, issuer name, date, optional verification link badge, and description toggle
- [x] T050 [P] [US4] Create `src/components/BookCard.astro` with fields: title, author, category badge, and optional note tooltip/expandable
- [x] T051 [US4] Update `src/sections/Certifications.astro` to use CertificationCard component, loop over `certifications.json`, render in chronological order
- [x] T052 [US4] Update `src/sections/Books.astro` to use BookCard component, group by category, render book entries from `books.json`
- [x] T053 [US4] Populate `src/data/certifications.json` with all existing course/certification data from current site (HUMAI Data Engineering, Docker course) plus any additional certifications Gonzalo provides
- [x] T054 [US4] Handle empty state: if `books.json` or `certifications.json` is empty, hide the section from navigation and display nothing (no broken empty section)
- [x] T055 [US4] Verify data-only workflow: add a test book entry to `books.json`, confirm it renders without touching any `.astro` file, then remove the test entry

**Checkpoint**: Books and Certifications sections are fully functional. New entries require only JSON edits. Empty states handled gracefully.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final optimization, accessibility, deployment validation, and content integrity check

- [x] T056 [P] Optimize all images in `public/` using Astro's `<Image>` component or manual optimization: convert to WebP where possible, set appropriate dimensions, add `loading="lazy"` and `decoding="async"`
- [x] T057 [P] Add semantic HTML landmarks to all sections: `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, proper heading hierarchy (single `<h1>` in Hero, `<h2>` per section)
- [x] T058 [P] Add `<meta>` tags for SEO: description, Open Graph (og:title, og:description, og:image), and Twitter card meta in `src/layouts/BaseLayout.astro`
- [x] T059 [P] Ensure all interactive elements have `aria-label`, `role`, and keyboard focus styles: ThemeToggle, Navbar hamburger, carousel controls, expandable cards
- [x] T060 Run Lighthouse audit on built site (`npm run build && npx serve dist`). Target: Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+. Fix any issues found
- [x] T061 Content integrity check: compare every text block, image, and link from the original `index.html` against the Astro build output. Ensure zero content loss (SC-007)
- [x] T062 Cross-browser test: verify site in Chrome, Firefox, and Safari (latest 2 versions). Check theme toggle, navigation, carousels, and responsive layout
- [x] T063 Final build validation: `npm run build` succeeds with zero warnings, `dist/` output is under 5MB, all pages render correctly from `dist/index.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — foundational architecture
- **US2 (Phase 4)**: Depends on Phase 3 — needs sections to exist before styling
- **US3 (Phase 5)**: Depends on Phase 3 — needs Projects section component
- **US4 (Phase 6)**: Depends on Phase 3 — needs modular architecture in place
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2 — no dependencies on other stories
- **US2 (P2)**: Starts after US1 — needs all section components to exist for styling
- **US3 (P3)**: Can start after US1 — only touches Projects section (can parallel with US2 styling of other sections)
- **US4 (P4)**: Can start after US1 — only touches Books and Certifications sections (can parallel with US2/US3)

### Within Each User Story

- Data files before section components (components import data)
- Section components before assembly (index.astro composes sections)
- All tasks marked [P] within a phase can run in parallel

### Parallel Opportunities

- T003, T004, T005 (Setup phase) — independent files
- T012-T018 (US1 data files) — all independent JSON files
- T019-T025 (US1 section components) — all independent .astro files
- T031-T037 (US2 section styling) — all independent sections
- T043-T044 (US3 carousel + card) — independent components
- T049-T050 (US4 cert + book cards) — independent components
- T056-T059 (Polish) — independent concerns

---

## Parallel Example: User Story 1 — Data Files

```bash
# All data extraction tasks can run simultaneously:
Task: "Create src/data/site-config.json"
Task: "Create src/data/focus-areas.json"
Task: "Create src/data/tech-stack.json"
Task: "Create src/data/education.json"
Task: "Create src/data/projects.json"
Task: "Create src/data/certifications.json"
Task: "Create src/data/books.json"
```

## Parallel Example: User Story 2 — Section Styling

```bash
# All section styling tasks can run simultaneously:
Task: "Style src/sections/Hero.astro"
Task: "Style src/sections/About.astro"
Task: "Style src/sections/Education.astro"
Task: "Style src/sections/Projects.astro"
Task: "Style src/sections/Certifications.astro"
Task: "Style src/sections/Books.astro"
Task: "Style src/sections/Contact.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Astro init, dependencies, assets)
2. Complete Phase 2: Foundational (BaseLayout, Navbar, ThemeToggle)
3. Complete Phase 3: US1 — Modular Architecture (data + sections + assembly)
4. **STOP and VALIDATE**: All current content rendered in modular components
5. Deploy to GitHub Pages — functional but unstyled MVP

### Incremental Delivery

1. Setup + Foundational → Astro site builds and serves
2. US1 (Modular Architecture) → Content migrated, modular structure verified → Deploy (MVP!)
3. US2 (Visual Redesign) → Professional styling applied → Deploy
4. US3 (Interactive Projects) → Carousels and expandable cards → Deploy
5. US4 (Books & Certifications) → New sections populated → Deploy
6. Polish → Lighthouse, accessibility, cross-browser → Final Deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Each user story is independently completable and testable
- No automated test tasks — validation is manual browser testing + Lighthouse
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
