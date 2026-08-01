# Feature Specification: Portfolio Redesign & Refactor

**Feature Branch**: `001-portfolio-redesign`
**Created**: 2026-08-01
**Status**: Draft
**Governed by**: Gonzalo Portfolio Constitution v1.0.0

## Summary

Refactor the existing single-developer portfolio to adopt the structure and
visual language of the reference template
(`arnobt78/Portfolio-Landing-Page-1-NextJS-Frontend`) while preserving all
current content sections. The refactor updates *how the site looks and is
organized*, not *what content it presents*.

This specification is intentionally technology-agnostic. Framework, libraries,
and build tooling are decided in the planning phase (`/speckit.plan`), subject
to the constraints in the project constitution (notably: GitHub Pages static
hosting, Lighthouse 90+ mobile, minimal dependencies, lightweight toolchain).

## Context

- **Current sections to preserve** (content must not be lost, appearance may change):
  1. Mi Perfil
  2. Educación
  3. Proyectos
  4. Certificaciones
  5. Libros
  6. Contacto
- **Reference template characteristics to adopt** (structure/aesthetic only):
  single scrollable page, one component per section, all content driven from a
  single centralized data source, in-page anchor navigation, Tailwind-style
  visual system, scroll-triggered animations, light/dark theme toggle.
- **Reference sections with no equivalent** (Testimonials, Experience-as-review,
  Approach): out of scope unless explicitly added later.

## User Scenarios

### Primary
As a **recruiter or hiring manager** landing on the site, I can scroll a single
page that introduces Gonzalo, then presents education, projects, certifications,
books, and a way to make contact — with clear hierarchy and a call to action —
so I can evaluate him in under two minutes.

### Secondary
As a **peer or visitor on mobile**, I can navigate directly to any section via a
sticky nav bar (Mi Perfil, Educación, Proyectos, Certificaciones, Libros,
Contacto), and the layout renders correctly and loads fast on my phone.

### Maintenance
As the **sole developer**, I can update the content of any section by editing a
single centralized data source, without touching layout code.

## Functional Requirements

### Structure & Navigation
- **FR-001**: The site MUST be a single scrollable page with in-page anchor
  navigation to each of the six sections.
- **FR-002**: A persistent (sticky) navigation bar MUST expose all six sections
  in this order: Mi Perfil, Educación, Proyectos, Certificaciones, Libros,
  Contacto. The active section MUST be visually indicated.
- **FR-003**: Each section MUST be implemented as a self-contained, reusable
  component/partial, mirroring the reference's component-per-section pattern.

### Content Preservation & Data
- **FR-004**: All existing content from the six sections MUST be preserved. No
  section may be removed; content may be re-styled and reorganized only.
- **FR-005**: All section content (text, project entries, certification entries,
  book entries, contact links) MUST be sourced from a single centralized data
  source, decoupled from layout markup.

### Section Mapping (adopt reference patterns)
- **FR-006**: **Mi Perfil** MUST serve as the hero/introduction, optionally using
  a bento-grid layout (adapted from the reference) to surface a short bio, role,
  and key highlights.
- **FR-007**: **Proyectos** MUST use a project-showcase layout; each project MUST
  include context per constitution Principle IV (problem, approach, tools,
  outcome), not just a screenshot or link.
- **FR-008**: **Educación** and **Certificaciones** MUST use a consistent
  card/timeline pattern (adapted from the reference's experience layout).
- **FR-009**: **Libros** MUST use a card-grid layout (no direct reference
  equivalent; base it on the bento/project card style for visual consistency).
- **FR-010**: **Contacto** MUST provide contact links / call to action in a
  footer-style section. Any form MUST work without a custom backend (per
  constitution Principle I) or the section MUST use direct links (email, social).

### Visual System & Behavior
- **FR-011**: The site MUST apply one cohesive visual system (palette,
  typography scale, spacing rhythm) across all sections, per Principle II.
- **FR-012**: The site MUST support a light/dark theme toggle, persisted across
  visits, adapted from the reference.
- **FR-013**: The site MAY include scroll-triggered entrance animations, but they
  MUST be restrained (Principle II) and MUST NOT degrade the Lighthouse
  performance target (Principle III).
- **FR-014**: The layout MUST be responsive across mobile, tablet, and desktop.

### Deployment
- **FR-015**: The final output MUST be fully static and deployable to GitHub
  Pages at `gonzadzz00.github.io` with no server-side processing (Principle I).
- **FR-016**: Images MUST be optimized and served in modern formats
  (WebP/AVIF with fallback) per Principle III.

## Out of Scope
- Any backend, API, or database.
- Reference sections without a current equivalent: Testimonials, Experience-as-
  reviews, Approach.
- The reference's 3D globe (Three.js) — excluded by default as a heavy
  dependency conflicting with constitution Principles III and V. May be
  reconsidered only with explicit justification. See [NEEDS CLARIFICATION #1].
- Content rewriting or new copywriting (this refactor preserves existing text).

## Needs Clarification
- **[NEEDS CLARIFICATION #1]**: Which specific reference elements to adopt beyond
  the defaults above — e.g. bento grid for Mi Perfil (recommended), animated
  gradients/spotlights, magnetic buttons? Confirm the shortlist.
- **[NEEDS CLARIFICATION #2]**: Bilingual (ES/EN) support now or deferred?
  Constitution Principle IV lists it as SHOULD, not MUST.
- **[NEEDS CLARIFICATION #3]**: Contact — direct links only, or a form? If a form,
  which no-backend service is acceptable (e.g. mailto, Formspree, Google Forms)?
- **[NEEDS CLARIFICATION #4]**: Is the current stack Astro? If so, confirm whether
  to keep it (recommended) or migrate; this is resolved in `/speckit.plan`.

## Review Checklist
- [ ] All six current sections are represented and preserved.
- [ ] No technology/framework choices leak into this spec (they belong in the plan).
- [ ] Every functional requirement traces to a constitution principle.
- [ ] Out-of-scope items are explicit.
- [ ] All [NEEDS CLARIFICATION] markers are resolved before `/speckit.plan`.