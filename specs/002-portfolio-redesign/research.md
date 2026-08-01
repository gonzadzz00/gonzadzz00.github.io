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
