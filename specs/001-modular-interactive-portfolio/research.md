# Research: Modular Interactive Portfolio Refactor

**Date**: 2026-03-23
**Feature**: 001-modular-interactive-portfolio

## Decision 1: JavaScript Framework

**Decision**: Astro (static site generator with component islands)

**Rationale**:
- Zero JavaScript by default — ships pure HTML/CSS, JS only where needed
- Component-based `.astro` files map directly to portfolio sections
- Lighthouse 98-100 scores are routine, exceeding the 90+ target
- Lowest learning curve for a data professional (HTML-like syntax, no JSX)
- Perfect GitHub Pages deployment — `npm run build` outputs static files
- Can progressively add interactivity via "islands" (e.g., theme toggle, carousels)
- Rich ecosystem: 100+ integrations, pre-built themes, Bootstrap compatible

**Alternatives Considered**:

| Framework | Verdict | Reason Rejected |
|-----------|---------|-----------------|
| Vue.js (Vite SPA) | Good but overkill | Reactive runtime unnecessary for content site; 45KB baseline |
| React (Vite/Next.js) | Too heavy | 85KB runtime; steep learning curve; overkill for portfolio |
| Svelte/SvelteKit | Close second | Excellent performance but smaller ecosystem; fewer portfolio themes |
| Vanilla JS + Web Components | Too manual | Shadow DOM complexity; no community components; slow development |

## Decision 2: CSS Strategy

**Decision**: Keep Bootstrap 5 + refined custom CSS with design tokens

**Rationale**:
- Current site already uses Bootstrap 5 and a mature custom CSS system (1,896 lines)
- CSS custom properties (`:root` variables) already implement dark/light theming
- Zero migration cost — existing patterns are understood by the developer
- Bootstrap grid + utilities handle responsive design without manual media queries
- Refactoring means organizing, not rewriting: split CSS into logical modules

**Enhancements planned**:
1. Split monolithic `styles.css` into per-section CSS modules (Astro scoped styles)
2. Expand design token system (spacing scale, transitions, typography)
3. Leverage Bootstrap utilities more (reduce redundant custom CSS)
4. Eliminate unused custom CSS during migration

**Alternatives Considered**:

| Strategy | Verdict | Reason Rejected |
|----------|---------|-----------------|
| Tailwind CSS | Good but costly migration | 8+ hours rewrite for ~8KB savings; new paradigm to learn |
| Pure vanilla CSS | More work | Loses Bootstrap grid/utilities; more media queries needed |
| CSS Modules | Framework-dependent | Astro scoped styles achieve the same goal natively |

## Decision 3: Build & Deployment Pipeline

**Decision**: Astro build via GitHub Actions, deploy to GitHub Pages

**Rationale**:
- `npm run build` produces a `dist/` folder of pure static files
- GitHub Actions workflow runs build on push to main
- Output deployed directly to GitHub Pages (no runtime dependencies)
- Astro has an official `@astrojs/github-pages` integration

## Decision 4: Content Data Architecture

**Decision**: JSON data files in a `src/data/` directory, consumed by Astro components

**Rationale**:
- Separates content from presentation (FR-009: adding entries without touching rendering)
- JSON is familiar to a data professional (Python/pandas background)
- No external CMS needed — all data lives in the repository
- Type-safe via Astro's built-in content collections or direct imports
- Easy to validate and maintain with standard tooling

**Structure**:
- `src/data/projects.json` — project entries
- `src/data/certifications.json` — certification entries
- `src/data/books.json` — book entries
- `src/data/education.json` — education entries
- `src/data/focus-areas.json` — focus area cards

## Decision 5: Animation & Interactivity

**Decision**: Replace AOS.js with CSS animations + minimal Astro client islands

**Rationale**:
- AOS.js adds 14KB for scroll animations achievable with CSS `@keyframes` + `IntersectionObserver`
- Astro islands allow isolated interactive components (theme toggle, carousels) without global JS
- Reduces external dependencies per Constitution Principle III (minimize CDN dependencies)
- CSS-only animations are more performant and don't block page load

## Decision 6: Image Optimization

**Decision**: Use Astro's built-in `<Image>` component with sharp

**Rationale**:
- Automatic WebP/AVIF conversion with fallbacks
- Responsive image sizing (srcset generation)
- Lazy loading by default
- Meets Constitution Principle III (modern formats, appropriately sized)
- No manual optimization pipeline needed
