# Implementation Plan: Modular Interactive Portfolio Refactor

**Branch**: `001-modular-interactive-portfolio` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-modular-interactive-portfolio/spec.md`

## Summary

Refactor Gonzalo's portfolio from a monolithic single-file HTML/CSS/JS site into a modular Astro-based static site. Each content section (About, Projects, Education, Certifications, Books, Contact) becomes an independent component fed by JSON data files. The site retains Bootstrap 5 for layout utilities and responsive design, replaces AOS.js with CSS/IntersectionObserver animations, and deploys to GitHub Pages via GitHub Actions. The refactor adds two new sections (Books, Certifications) and delivers a professional visual redesign with dark/light theme support.

## Technical Context

**Language/Version**: JavaScript/TypeScript (Astro 5.x, Node.js 18+)
**Primary Dependencies**: Astro 5.x, Bootstrap 5.3, Font Awesome 6
**Storage**: JSON files in `src/data/` (no database)
**Testing**: Manual browser testing + Lighthouse audits (no test framework — static portfolio)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari — latest 2 versions), GitHub Pages
**Project Type**: Static website (single-page portfolio)
**Performance Goals**: Lighthouse 90+ mobile, TTI < 3s on 4G, zero layout shift
**Constraints**: GitHub Pages static hosting only, no server-side processing, < 5MB total bundle
**Scale/Scope**: Single developer, ~7 sections, ~15 components, ~7 data files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. GitHub Pages Compatibility | PASS | Astro outputs pure static HTML/CSS/JS. GitHub Actions builds `dist/`. No runtime dependencies. |
| II. Professional Visual Identity | PASS | Cohesive design system with Bootstrap 5 + design tokens. Responsive layout. Clear content hierarchy. |
| III. Performance & Accessibility | PASS | Zero-JS default (Astro). Astro `<Image>` for WebP/AVIF. Semantic HTML. Lighthouse 90+ target. Reduced CDN dependencies (drop AOS.js). |
| IV. Content-First Architecture | PASS | JSON data files separate content from rendering. Each section has clear purpose. Data-driven templates. |
| V. Maintainability & Simplicity | PASS | Astro components are HTML-like. Clear folder structure. No dead code (fresh build). Single dependency: Astro + Bootstrap. |

**Post-Phase 1 Re-check**: All principles still hold. Astro's build output is pure static files. Component architecture maps 1:1 to content sections. JSON data files enable non-code content updates.

## Project Structure

### Documentation (this feature)

```text
specs/001-modular-interactive-portfolio/
  plan.md              # This file
  spec.md              # Feature specification
  research.md          # Phase 0: technology decisions
  data-model.md        # Phase 1: entity definitions
  quickstart.md        # Phase 1: developer guide
  checklists/
    requirements.md    # Spec quality checklist
```

### Source Code (repository root)

```text
src/
  pages/
    index.astro            # Single entry point, composes all sections
  layouts/
    BaseLayout.astro       # HTML shell, head, meta, global styles
  sections/                # One component per portfolio section
    Hero.astro
    About.astro
    Education.astro
    Projects.astro
    Certifications.astro
    Books.astro
    Contact.astro
  components/              # Reusable UI components
    Navbar.astro
    Footer.astro
    ThemeToggle.astro      # client:load island
    ProjectCard.astro
    CertificationCard.astro
    BookCard.astro
    EducationCard.astro
    FocusAreaCard.astro
    TechStack.astro
    ImageCarousel.astro    # client:visible island
  data/                    # Content data (JSON)
    projects.json
    certifications.json
    books.json
    education.json
    focus-areas.json
    site-config.json
    tech-stack.json
  styles/
    global.css             # Design tokens, reset, Bootstrap overrides, typography
public/
  icon/                    # Logos, favicons (migrated from current root)
  images/                  # Project screenshots and media
  site.webmanifest
astro.config.mjs           # Astro config (site URL, integrations)
package.json
.github/
  workflows/
    deploy.yml             # GitHub Actions: build + deploy to Pages
```

**Structure Decision**: Single Astro project with flat component architecture. The `sections/` directory holds page-level section components (one per portfolio area). The `components/` directory holds reusable cards, navigation, and interactive islands. The `data/` directory holds all content as JSON. This maps directly to the spec's modular requirement: each section is an independent `.astro` file that imports its own data and components.

## Complexity Tracking

No constitution violations. No complexity justifications needed.

## Key Implementation Decisions

### Astro Islands (Interactive Components)

Only two components need client-side JavaScript:

1. **ThemeToggle.astro** — `client:load` (must run immediately to avoid theme flash)
2. **ImageCarousel.astro** — `client:visible` (loads JS only when scrolled into view)

All other components render as pure HTML at build time.

### Migration Strategy

1. **Content extraction first**: Extract all current HTML content into JSON data files
2. **Component creation**: Build Astro components that consume JSON data
3. **Style migration**: Move relevant CSS from `styles.css` into Astro scoped styles + `global.css`
4. **Asset migration**: Move images from `icon/` to `public/icon/` and `public/images/`
5. **Validation**: Compare rendered output against current site to ensure no content loss (SC-007)

### Theme Toggle Implementation

Preserve current `data-theme` attribute approach on `<html>`:
- Check `localStorage` in an inline `<script>` in `BaseLayout.astro` (before render)
- ThemeToggle component toggles the attribute and persists to `localStorage`
- CSS custom properties cascade automatically based on `[data-theme="dark"]`

### GitHub Actions Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
