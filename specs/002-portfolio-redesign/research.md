# Phase 0 Research: Portfolio Redesign & Refactor

All items below were resolved by inspecting the existing codebase (`src/`, `astro.config.mjs`, `package.json`, `.github/workflows/deploy.yml`) rather than by open unknowns in the Technical Context — the project already has an established stack and patterns to extend. No `NEEDS CLARIFICATION` markers remain.

## 1. Keep Astro as the stack (vs. migrating toward the reference's Next.js stack)

- **Decision**: Keep the existing Astro 6 static site. Do not migrate to Next.js or any other framework.
- **Rationale**: The current codebase already satisfies most structural requirements (single scrollable page, component-per-section, JSON-driven content, static output, GitHub Pages deploy via Actions). Astro's zero-JS-by-default static output is a better fit for constitution Principle III (performance) and Principle V (simplicity/minimal dependencies) than a Next.js SSR-oriented stack, and Principle I explicitly forbids server-side processing, which a Next.js migration would put at risk if not carefully constrained to static export.
- **Alternatives considered**: Migrate to Next.js to mirror the reference template's stack literally — rejected: higher build complexity, larger dependency surface, no functional requirement demands it (the spec explicitly scopes structure/aesthetic adoption, not a specific framework), and it would require re-implementing already-working features (theme toggle, scroll-spy nav, section components) from scratch.

## 2. Bilingual (ES/EN) content delivery mechanism

- **Decision**: Store bilingual text as `{ "es": "...", "en": "..." }` pairs directly in the existing JSON data files. Render content for both languages at build time (no client fetch). Toggle visible language client-side via a `data-lang` attribute on `<html>`, following the exact pattern already used for theme (`data-theme` + `localStorage`, see `ThemeToggle.astro` and the inline flash-prevention script in `BaseLayout.astro`). Add a new `LanguageToggle.astro` component alongside `ThemeToggle.astro` in the navbar.
- **Rationale**: The site is required to remain a single scrollable page at one URL (FR-001) — this rules out per-language routes. Reusing the proven `data-attribute` + `localStorage` + inline pre-render script pattern keeps implementation minimal (Principle V), avoids a runtime fetch/flash-of-wrong-language (Principle III), and requires no new dependency.
- **Alternatives considered**:
  - Astro's built-in i18n routing (`/en/`, `/es/` path prefixes) — rejected: creates separate URLs per language, which breaks the single-page/single-URL requirement and complicates anchor-based navigation (FR-001, FR-002).
  - Client-side fetch/swap of language JSON at runtime — rejected: adds unnecessary runtime complexity and a visible flash of the wrong language for a small, static content set; no benefit over build-time rendering here.
  - A dedicated i18n library (e.g., `astro-i18next`) — rejected: unnecessary dependency weight for six sections' worth of static text; conflicts with Principle V's "every dependency must earn its place."

## 3. Gradient/spotlight hover accents

- **Decision**: Implement as CSS custom properties (`--mouse-x`, `--mouse-y`) updated by a lightweight `pointermove` listener scoped to hoverable card/button containers, driving a `radial-gradient` background. Effect is skipped entirely when `prefers-reduced-motion: reduce` is set, and does not attach listeners on touch-only devices.
- **Rationale**: No new dependency; extends the existing hover-lift pattern already present on `.card:hover` and `.social-links a:hover` in `src/styles/global.css` rather than replacing it. Satisfies FR-014's requirement to respect reduced-motion and stay within the Lighthouse 90+ budget.
- **Alternatives considered**: A motion/animation library — rejected as unjustified dependency weight (Principle V) for a small set of hover accents; magnetic-button JS interactions — explicitly out of scope per the resolved spec clarification.

## 4. Contact method

- **Decision**: No structural change. `Contact.astro` already implements direct links only (mailto + social links from `site-config.json`), matching the resolved FR-010. Only the text content needs bilingual fields.
- **Rationale**: Confirmed by reading `src/sections/Contact.astro` — it contains no form, only a `mailto:` link and a social-links list driven by `site-config.json`.
- **Alternatives considered**: N/A — this was a verification, not an open decision.

## 5. Testing/validation approach

- **Decision**: No automated test framework is introduced. Validation follows the constitution's existing Design & Development Workflow: manual verification in Chrome and one mobile browser, plus a Lighthouse mobile performance/accessibility audit before merge.
- **Rationale**: The project currently has no test suite (`package.json` defines no `test` script), and the constitution does not mandate automated testing — it mandates browser verification. Introducing a test framework (e.g., Playwright/Vitest) for a six-section static personal portfolio is complexity not justified by the feature's scope (Principle V).
- **Alternatives considered**: Adding Playwright for E2E checks of the language/theme toggles — deferred; can be reconsidered later if the site's interactivity grows, but not justified now.

## 6. Glass/glow depth surface treatment (FR-021)

- **Decision**: Add new CSS custom properties to `global.css` — a semi-transparent glass background (`--glass-bg`, derived from `--card-bg` with alpha), a `backdrop-filter: blur(...)` (with `-webkit-` prefix), a secondary accent hue (`--accent-color-2`) for a subtle gradient border/edge glow, and a glow-shadow token (`--glow-shadow`, an accent-tinted `box-shadow` blur) layered onto the existing `.card`, `.btn-primary`, `.btn-outline`, and navbar surfaces. Scope `backdrop-filter` usage to a small, bounded set of elements (nav bar + cards/buttons in view at once) rather than the whole page background, to control paint cost.
- **Rationale**: Reuses the existing single design-token system (`:root` custom properties, light/dark theme overrides) instead of introducing a parallel styling mechanism — satisfies Principle V (simplicity) and Principle II (one cohesive visual system). CSS-only `backdrop-filter`/`box-shadow` has negligible JS cost and is well-supported in evergreen browsers; falls back gracefully (opaque background, no blur) in browsers without `backdrop-filter` support, since the base `--card-bg` remains a solid fallback color.
- **Alternatives considered**: A dedicated glassmorphism/UI-effects library — rejected, unjustified dependency for a token-driven CSS effect the project can implement directly (Principle V). Applying `backdrop-filter` globally (e.g., full-page blurred background layers) — rejected as an unbounded paint-cost risk against the Lighthouse 90+ mobile target (SC-012).

## 7. Richer hover/focus micro-interactions (FR-022)

- **Decision**: Extend the existing `.card:hover`/`:focus-within`, `.btn-primary:hover`, `.btn-outline:hover`, and nav-item hover states with a stronger elevation shift (larger negative `translateY` plus a small `scale`) and the new `--glow-shadow` token, layered on top of (not replacing) the existing pointer-driven spotlight `::after` radial gradient from `SpotlightHover.astro`. No new event listeners are added — the same `pointermove`-updated `--mouse-x`/`--mouse-y` custom properties already set by `SpotlightHover.astro` continue to drive the spotlight; the glow/elevation layer is pure CSS `:hover`/`:focus-visible`, so it also works via keyboard focus and on touch (tap) where `pointermove` doesn't fire.
- **Rationale**: Keeps interactivity keyboard-accessible (Principle III / WCAG 2.1 AA — a `pointermove`-only effect would exclude keyboard users, but `:hover`/`:focus-visible` cover both) and avoids adding new JS for a purely presentational state change. Builds directly on the already-implemented, already-tested spotlight mechanism rather than replacing it.
- **Alternatives considered**: A JS-driven "magnetic" cursor-follow interaction — explicitly excluded by the spec's Context note and Out of Scope section; a dedicated micro-interaction/animation library — rejected as unjustified dependency weight (Principle V).

## 8. More dynamic entrance motion (FR-023)

- **Decision**: Extend the existing `.reveal`/`.reveal-stagger` CSS transitions (already driven by the `IntersectionObserver` in `ScrollReveal.astro`) with a small `scale` (e.g., `scale(0.96)` → `scale(1)`) combined with the existing `translateY`, and consider a subtle `filter: blur(...)` → `blur(0)` "materialize" effect on the hero/section titles only (not every card, to limit paint cost). No changes to `ScrollReveal.astro`'s observer logic are needed — only the CSS driving `.reveal`/`.reveal-stagger`'s initial/visible state changes.
- **Rationale**: Reuses the existing, already-tested `IntersectionObserver` + class-toggle mechanism (Principle V); purely additive CSS keeps the change low-risk and easy to tune/revert. Scoping the `blur` "materialize" effect to headings only (rather than every card) bounds the additional paint/composite cost against the Lighthouse 90+ mobile target.
- **Alternatives considered**: A scroll-linked JS animation library (e.g., GSAP ScrollTrigger) — rejected as unjustified dependency weight for effects achievable with the existing CSS-transition + IntersectionObserver pattern (Principle V); true parallax (JS-computed scroll-offset transforms) — deferred, higher implementation/perf risk than staggered/scale/blur reveal for the requested "more dynamic than a static fade" bar (User Story 6).

## 9. Reduced-motion equivalence for the new treatments (FR-024)

- **Decision**: Extend the existing `@media (prefers-reduced-motion: reduce)` block in `global.css` (which already neutralizes the spotlight `::after` and the `.reveal`/`.reveal-stagger` transitions) to also disable the new `scale`/`blur` entrance motion and any hover elevation `transform`/`transition`, while leaving the static glass/glow *appearance* (background, border, shadow — non-animated properties) intact, since FR-024 requires a "static, legible equivalent," not the removal of all styling.
- **Rationale**: Directly extends the proven pattern already in the codebase rather than inventing a new one; keeps the reduced-motion contract consistent across old (FR-013/FR-014) and new (FR-021–FR-023) treatments in a single media-query block, per SC-011.
- **Alternatives considered**: A JS-based motion toggle independent of the OS-level `prefers-reduced-motion` — rejected, unnecessary complexity when the OS-level media query already covers the requirement and is what FR-013 already commits to.
