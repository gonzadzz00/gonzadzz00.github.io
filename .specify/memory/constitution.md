<!--
  Sync Impact Report
  ===================
  Version change: N/A → 1.0.0 (initial constitution)
  Modified principles: N/A (first version)
  Added sections:
    - Core Principles (5 principles)
    - Hosting & Deployment Constraints
    - Design & Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md — ✅ no updates needed (generic)
    - .specify/templates/spec-template.md — ✅ no updates needed (generic)
    - .specify/templates/tasks-template.md — ✅ no updates needed (generic)
  Follow-up TODOs: None
-->

# Gonzalo Portfolio Constitution

## Core Principles

### I. GitHub Pages Compatibility (NON-NEGOTIABLE)

All code MUST deploy and run on GitHub Pages without server-side processing.

- The site MUST be fully static: HTML, CSS, and client-side JavaScript only.
- No server-side languages, no build servers, no databases.
- If a build step is introduced (e.g., a static site generator), it MUST
  produce output compatible with GitHub Pages and be runnable via
  GitHub Actions or locally before push.
- All assets (images, fonts, icons) MUST be served from the repository
  or from reliable public CDNs. No self-hosted API dependencies.

### II. Professional Visual Identity

The portfolio MUST convey a polished, professional image consistent
with a senior data professional.

- Design MUST follow a cohesive visual system: consistent color palette,
  typography scale, and spacing rhythm across all sections.
- Layout MUST be responsive and render correctly on mobile, tablet,
  and desktop viewports.
- Content hierarchy MUST guide visitors from introduction to projects
  to contact, with clear calls to action.
- Visual noise MUST be minimized: avoid excessive animations, clashing
  colors, or inconsistent icon styles.

### III. Performance & Accessibility

The site MUST load fast and be usable by everyone.

- Pages MUST achieve a Lighthouse Performance score of 90+ on mobile.
- Images MUST use modern formats (WebP/AVIF with fallbacks) and be
  appropriately sized — no uncompressed full-resolution images.
- The site MUST meet WCAG 2.1 Level AA for color contrast, keyboard
  navigation, and semantic HTML structure.
- External dependencies (CDN libraries, fonts, icon kits) MUST be
  kept to a minimum to reduce load time and single-point-of-failure
  risk.

### IV. Content-First Architecture

Content is the primary asset; structure MUST serve the content, not
the other way around.

- Every section MUST have a clear purpose: who Gonzalo is, what he
  has built, what skills he brings, and how to reach him.
- Project showcases MUST include context (problem, approach, tools,
  outcome) — not just screenshots or links.
- Text MUST be concise, scannable, and free of filler. Prefer bullet
  points and short paragraphs over long prose blocks.
- Bilingual support (Spanish/English) SHOULD be considered but MUST
  NOT compromise the design or maintainability if implemented.

### V. Maintainability & Simplicity

The codebase MUST remain easy to update by a single developer.

- Prefer vanilla HTML/CSS/JS or a lightweight framework over heavy
  toolchains. Complexity MUST be justified by clear user-facing value.
- CSS MUST use a consistent methodology (e.g., BEM, utility classes,
  or CSS custom properties) to prevent style conflicts and sprawl.
- File and folder structure MUST be intuitive: assets grouped by type,
  sections easy to locate and edit.
- No dead code, unused libraries, or commented-out legacy blocks.
  Every dependency MUST earn its place.

## Hosting & Deployment Constraints

- **Platform**: GitHub Pages (static hosting from `main` branch or
  `/docs` folder).
- **Domain**: `gonzadzz00.github.io` (custom domain optional but
  MUST NOT break GitHub Pages serving).
- **CI/CD**: GitHub Actions MAY be used for build steps (e.g., image
  optimization, HTML minification) but the final output MUST be
  commit-ready static files.
- **Version Control**: All changes MUST go through git commits with
  descriptive messages. Feature work SHOULD use branches and PRs
  when the change scope is large.

## Design & Development Workflow

- **Design before code**: New sections or major visual changes MUST
  be sketched or wireframed (even roughly) before implementation.
- **Incremental delivery**: Refactor in slices — each slice MUST
  leave the site in a deployable, visually coherent state. No
  half-finished sections in production.
- **Browser testing**: Changes MUST be verified in at least Chrome
  and one mobile browser before merging.
- **Asset pipeline**: Images MUST be optimized before commit. SVGs
  MUST be cleaned of editor metadata.

## Governance

This constitution governs all design and development decisions for
the portfolio refactor. It supersedes ad-hoc preferences when
conflicts arise.

- **Amendments**: Any principle change MUST be documented with a
  rationale and reflected in a version bump.
- **Versioning**: MAJOR for principle removals/redefinitions, MINOR
  for new principles or expanded guidance, PATCH for clarifications.
- **Compliance**: Every PR or commit that touches user-facing code
  SHOULD be reviewed against these principles before merge.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
