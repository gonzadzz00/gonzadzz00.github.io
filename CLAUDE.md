# gonzadzz00.github.io Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-09-29

## Active Technologies
- Astro 6 (TypeScript in component frontmatter/scripts), HTML, CSS, vanilla client-side JS (no framework runtime) + `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existing, retained), Font Awesome via CDN kit script (existing, retained). No new dependencies introduced by this feature. (002-portfolio-redesign)
- Static JSON files under `src/data/` (`site-config.json`, `projects.json`, `education.json`, `certifications.json`, `books.json`, `focus-areas.json`, `tech-stack.json`) — N/A database/backend (002-portfolio-redesign)
- Astro 6 (TypeScript in component frontmatter/scripts), HTML, CSS, vanilla client-side JS (no framework runtime) + `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existing, retained), Font Awesome via CDN kit script (existing, retained). No new dependencies introduced by this addendum. (002-portfolio-redesign)
- Static JSON files under `src/data/` — unaffected by this addendum (visual/interaction layer only, no new entities or fields). (002-portfolio-redesign)
- Astro 6 (TypeScript en frontmatter/scripts de componentes), HTML, CSS, JS vanilla en cliente + `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existentes). **Nueva**: `@google/model-viewer` (import dinámico, chunk propio). Herramienta local no versionada: `@gltf-transform/cli` (solo para optimizar GLB). (003-visual-polish-3d-motion)
- Archivos JSON estáticos en `src/data/`; nuevo `assets.json`; extensiones a `focus-areas.json`, `projects.json`, `ui-strings.json` (ver [data-model.md](./data-model.md)) (003-visual-polish-3d-motion)

- (001-modular-interactive-portfolio)

## Project Structure

```text
src/
tests/
```

## Commands

# Add commands for 

## Code Style

: Follow standard conventions

## Recent Changes
- 003-visual-polish-3d-motion: Added Astro 6 (TypeScript en frontmatter/scripts de componentes), HTML, CSS, JS vanilla en cliente + `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existentes). **Nueva**: `@google/model-viewer` (import dinámico, chunk propio). Herramienta local no versionada: `@gltf-transform/cli` (solo para optimizar GLB).
- 002-portfolio-redesign: Added Astro 6 (TypeScript in component frontmatter/scripts), HTML, CSS, vanilla client-side JS (no framework runtime) + `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existing, retained), Font Awesome via CDN kit script (existing, retained). No new dependencies introduced by this addendum.
- 002-portfolio-redesign: Added Astro 6 (TypeScript in component frontmatter/scripts), HTML, CSS, vanilla client-side JS (no framework runtime) + `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existing, retained), Font Awesome via CDN kit script (existing, retained). No new dependencies introduced by this feature.


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
