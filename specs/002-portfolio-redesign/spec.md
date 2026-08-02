# Feature Specification: Portfolio Redesign & Refactor

**Feature Branch**: `002-portfolio-redesign`
**Created**: 2026-08-01
**Status**: Draft
**Governed by**: Gonzalo Portfolio Constitution v1.0.0
**Input**: User description: "Refactor the existing single-developer portfolio to adopt the structure and visual language of the reference template arnobt78/Portfolio-Landing-Page-1-NextJS-Frontend while preserving all current content sections (Mi Perfil, Educación, Proyectos, Certificaciones, Libros, Contacto). Single scrollable page with in-page anchor navigation, sticky nav bar, centralized content data source, section-mapped layouts (bento hero, project showcase, timeline/cards, book grid, contact footer), cohesive visual system, light/dark theme toggle, restrained scroll animations, responsive layout, fully static GitHub Pages deployment with optimized images."

## Context

- **Current sections to preserve** (content must not be lost; appearance may change): Mi Perfil, Educación, Proyectos, Certificaciones, Libros, Contacto.
- **Reference structure/aesthetic to adopt**: single scrollable page, one component per section, all content driven from a single centralized data source, in-page anchor navigation, a cohesive modern visual system, restrained scroll-triggered animations plus subtle animated gradient/spotlight hover accents, light/dark theme toggle.
- **Reference sections with no current equivalent** (Testimonials, Experience-as-review, Approach) are out of scope unless explicitly added later.
- **Language**: the site adds an English translation alongside the existing Spanish content, with a visitor-facing language switch. Magnetic-button-style interactions are explicitly excluded (deemed unnecessary polish relative to its performance/accessibility cost).
- **Visual depth update (added 2026-08-02)**: the initial redesign and its restrained gradient/spotlight hover accents are implemented; the maintainer now wants the visual language pushed further toward a more futuristic, visually striking feel, with components that read as dynamic/alive rather than static, while keeping all existing content, structure, navigation, bilingual support, and theme toggle unchanged.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter Evaluates the Portfolio at a Glance (Priority: P1)

A recruiter or hiring manager lands on the site and scrolls a single page that introduces Gonzalo, then presents education, projects, certifications, books, and a way to make contact — with clear visual hierarchy and calls to action — so they can evaluate him in under two minutes.

**Why this priority**: This is the core value of the portfolio — if a recruiter can't quickly understand who Gonzalo is and what he's built, the site fails its primary purpose regardless of how the other stories perform.

**Independent Test**: Can be fully tested by loading the page cold and scrolling top to bottom, confirming all six sections appear in a clear order with a legible hierarchy and at least one visible call to action (e.g., "Contact me" or "View project"), without navigating via the nav bar.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the page for the first time, **When** they scroll down, **Then** they encounter, in order, an introduction (Mi Perfil), Educación, Proyectos, Certificaciones, Libros, and Contacto, each visually distinct as its own section.
2. **Given** a visitor reaches the Proyectos section, **When** they view a project entry, **Then** they see the problem, approach, tools used, and outcome for that project — not just a screenshot or a bare link.
3. **Given** a visitor reaches the Contacto section, **When** they look for a way to reach Gonzalo, **Then** at least one clear, working contact method is presented.

---

### User Story 2 - Visitor Jumps Directly to a Section via Sticky Navigation (Priority: P2)

A peer or visitor, on desktop or mobile, uses a persistent navigation bar to jump directly to any of the six sections (Mi Perfil, Educación, Proyectos, Certificaciones, Libros, Contacto) instead of scrolling through the whole page, and the layout renders correctly and loads fast on their device.

**Why this priority**: Direct navigation and responsive rendering are what make the single-page structure usable beyond a first linear read — without it, returning or targeted visitors (e.g., "let me check his projects again") have a worse experience, but the core value from Story 1 is still deliverable without it.

**Independent Test**: Can be fully tested by loading the page on a mobile-sized viewport, tapping each navigation item, and confirming the page scrolls to the corresponding section with the active section visually indicated in the nav.

**Acceptance Scenarios**:

1. **Given** a visitor is anywhere on the page, **When** they open the navigation bar, **Then** all six sections are listed in a fixed order (Mi Perfil, Educación, Proyectos, Certificaciones, Libros, Contacto) and the nav remains visible/reachable as they scroll.
2. **Given** a visitor taps or clicks a navigation item, **When** the page responds, **Then** it scrolls to the corresponding section and that item is visually marked as active.
3. **Given** a visitor is scrolling manually through the page, **When** a new section enters view, **Then** the corresponding navigation item updates to reflect it as the active section.
4. **Given** a visitor on a phone-sized screen, **When** they load any part of the page, **Then** content reflows without horizontal scrolling or overlapping elements.

---

### User Story 3 - Visitor Toggles Light/Dark Theme (Priority: P3)

A visitor switches between light and dark visual themes to match their preference or environment, and that preference is remembered on their next visit.

**Why this priority**: Improves comfort and polish but the site is fully functional and evaluable without it; it's an enhancement layered on top of Stories 1 and 2.

**Independent Test**: Can be fully tested by toggling the theme, confirming all sections re-render legibly in the new theme, then reloading the page and confirming the chosen theme persists.

**Acceptance Scenarios**:

1. **Given** a visitor activates the theme toggle, **When** the theme changes, **Then** every section (not just some) updates to the new color scheme with readable contrast.
2. **Given** a visitor has chosen a theme, **When** they reload the page or return later, **Then** the site opens in their previously chosen theme.

---

### User Story 4 - Visitor Switches Between Spanish and English (Priority: P2)

An international recruiter or visitor who doesn't read Spanish switches the site's language to English (or back to Spanish) and reads every section — profile, education, projects, certifications, books, and contact — in that language.

**Why this priority**: Without this, non-Spanish-speaking visitors cannot evaluate Gonzalo at all, which directly limits the reach of Story 1's core value for an international audience; it ranks alongside navigation as essential to making the site usable by its intended broader audience.

**Independent Test**: Can be fully tested by loading the page, switching the language control, and confirming every section's visible text (not just headings) changes to the selected language, with no leftover untranslated fragments.

**Acceptance Scenarios**:

1. **Given** a visitor is on the page in the default language, **When** they activate the language switch, **Then** all six sections' text content updates to the selected language.
2. **Given** a visitor has selected a language, **When** they navigate between sections or reload the page, **Then** their selected language is retained (does not silently revert to the default).
3. **Given** the site is in English, **When** a visitor views the Proyectos section, **Then** the project's problem/approach/tools/outcome context is fully translated, not just the section title.

---

### User Story 5 - Maintainer Updates Content Without Touching Layout (Priority: P3)

As the sole developer, the maintainer updates the content of any section (e.g., adds a project, a certification, or a book) by editing a single centralized data source, without modifying layout or component code.

**Why this priority**: This is a maintainability property rather than an end-visitor-facing outcome; it doesn't block launch value delivered by Stories 1–3, but it directly affects how sustainable the site is to keep current afterward.

**Independent Test**: Can be fully tested by adding a new entry (e.g., a book) to the centralized content source only, then confirming it appears correctly styled and positioned on the live page without any other file being touched.

**Acceptance Scenarios**:

1. **Given** the maintainer wants to add a new project, certification, or book, **When** they add an entry to the centralized content source, **Then** it appears on the page in the correct section with the section's established layout, with no layout code changes required.
2. **Given** the maintainer edits existing text in the centralized content source (e.g., a bio line or a project description), **When** the page is rebuilt/reloaded, **Then** the updated text appears in place, with formatting/styling unchanged.

---

### User Story 6 - Visitor Perceives a Modern, Dynamic Interface Rather Than a Static Page (Priority: P2)

A visitor browsing the site senses a more futuristic, visually rich interface — components have depth, subtle motion, and glow/accent treatments that respond to their presence — rather than a flat, static page, while everything still loads fast and remains fully readable.

**Why this priority**: This is the differentiating impression the portfolio makes in the first few seconds of a recruiter's visit — it doesn't change what content is delivered (Story 1 still holds), but it materially affects whether the site is perceived as current and polished versus generic.

**Independent Test**: Can be fully tested by loading the page and interacting with representative components from each section type (hero, project card, timeline entry, book card, nav, buttons), confirming each exhibits a distinctive dynamic/futuristic treatment (e.g., layered depth, glow accents, animated micro-interactions on interaction or scroll) beyond a flat static card, without any layout shift, jank, or unreadable content.

**Acceptance Scenarios**:

1. **Given** a visitor loads any section, **When** the section's components render, **Then** they exhibit a distinct futuristic visual treatment (e.g., layered/glass or glow surfaces, gradient depth, animated accents) consistent with the site's overall visual system, not just flat single-color cards.
2. **Given** a visitor hovers, focuses, or taps an interactive component (card, button, nav item), **When** they interact with it, **Then** it responds with a smooth, purposeful micro-interaction (e.g., glow intensification, elevation/depth shift, subtle motion) that reinforces the futuristic feel without being distracting.
3. **Given** a visitor scrolls through the page, **When** sections and components enter the viewport, **Then** they present richer, more dynamic entrance motion than a simple static fade, while still resolving to fully readable, stable content.
4. **Given** a visitor has "reduce motion" enabled at the OS level, **When** they load or interact with the page, **Then** all dynamic/futuristic treatments that rely on motion are disabled or reduced to a static equivalent, with content still fully present and legible.
5. **Given** a visitor loads the page on a low/mid-range mobile device, **When** the dynamic visual treatments render, **Then** the page still meets the Lighthouse 90+ mobile performance target with no visible jank.

---

### Edge Cases

- What happens when a project, certification, or book entry is missing an image? The layout MUST NOT break or leave a visibly broken image placeholder.
- What happens when a visitor's browser has JavaScript disabled? Content in all six sections MUST still be readable; the theme toggle and scroll-spy navigation highlighting MAY be unavailable.
- What happens when a visitor loads the page directly at a section anchor (e.g., a shared link to `#proyectos`)? The page MUST land on that section already in view, not the top of the page.
- What happens when a visitor has no stored theme preference (first visit)? The site MUST fall back to a sensible default (e.g., matching system preference or light theme).
- How does the system handle an entry with unusually long text (e.g., a long project description)? The card/section layout MUST accommodate it without overlapping neighboring content.
- What happens when an external contact link (email client, social profile) is unavailable or blocked? The link MUST still be visibly present and correctly labeled even if the visitor's environment can't complete the action.
- What happens when scroll-triggered animations are disabled by the visitor's OS-level "reduce motion" setting? Content MUST still appear fully and correctly without requiring the animation to complete.
- What happens when an entry is missing its English (or Spanish) translation? The site MUST NOT display an empty field or raw placeholder text; at minimum it MUST fall back to the other available language rather than showing nothing.

## Requirements *(mandatory)*

### Functional Requirements

#### Structure & Navigation
- **FR-001**: The site MUST be a single scrollable page with in-page anchor navigation to each of the six sections.
- **FR-002**: A persistent (sticky) navigation bar MUST expose all six sections in this order: Mi Perfil, Educación, Proyectos, Certificaciones, Libros, Contacto. The active section MUST be visually indicated as the visitor scrolls. The navigation bar MUST also expose the language switch and theme toggle controls.
- **FR-003**: Each section MUST be implemented as a self-contained, reusable unit so that a section can be updated or reordered without affecting the others' internals.

#### Content Preservation & Data
- **FR-004**: All existing content from the six sections MUST be preserved. No section may be removed; content may be re-styled and reorganized only.
- **FR-005**: All section content (profile text, project entries, certification entries, book entries, contact links) MUST be sourced from a single centralized content source, decoupled from layout, with each text field available in both Spanish and English.

#### Section-Specific Presentation
- **FR-006**: **Mi Perfil** MUST serve as the hero/introduction, surfacing a short bio, role, and key highlights in a visually prominent grid-style layout.
- **FR-007**: **Proyectos** MUST use a project-showcase layout; each project MUST include context (problem, approach, tools, outcome), not just a screenshot or link.
- **FR-008**: **Educación** and **Certificaciones** MUST use a consistent card/timeline pattern.
- **FR-009**: **Libros** MUST use a card-grid layout, visually consistent with the project/highlight card style used elsewhere on the page.
- **FR-010**: **Contacto** MUST provide direct contact links only (e.g., email `mailto:` link, LinkedIn, GitHub, or other social profiles) in a footer-style section. No contact form or third-party form-submission service is included.

#### Visual System & Behavior
- **FR-011**: The site MUST apply one cohesive visual system (palette, typography scale, spacing rhythm) across all sections.
- **FR-012**: The site MUST support a light/dark theme toggle, and the chosen theme MUST persist across visits.
- **FR-013**: The site MAY include scroll-triggered entrance animations, but they MUST be restrained and MUST respect a visitor's "reduce motion" preference, and MUST NOT degrade page performance below the Lighthouse 90+ mobile target.
- **FR-014**: The site MAY include subtle animated gradient or spotlight hover accents (e.g., on cards or buttons) as long as they respect "reduce motion" preferences and do not degrade the Lighthouse 90+ mobile target. Magnetic-cursor-style button interactions are explicitly excluded.
- **FR-015**: The layout MUST be responsive and render correctly across mobile, tablet, and desktop viewports, with no horizontal scrolling or overlapping content.
- **FR-021**: Interactive components (cards, buttons, nav items) MUST express a more futuristic visual language than flat single-color surfaces — e.g., layered depth, glass/translucent surfaces, glow or gradient-edge accents — applied consistently across all six sections as part of the one cohesive visual system (FR-011), not as one-off per-section styling.
- **FR-022**: Interactive components MUST provide a purposeful micro-interaction on hover/focus/tap (e.g., glow intensification, elevation/depth shift, subtle scale or motion) that goes beyond the existing gradient/spotlight hover accent (FR-014), while remaining restrained enough not to distract from content.
- **FR-023**: Section and component entrance animations MUST read as more dynamic than a plain static fade (e.g., staggered reveals, depth/parallax-style transitions), while remaining subject to the same constraints as FR-013: respecting "reduce motion" and not degrading the Lighthouse 90+ mobile target.
- **FR-024**: All motion and glow/depth effects introduced under FR-021–FR-023 MUST degrade gracefully to a fully static, legible equivalent when the visitor has "reduce motion" enabled, consistent with FR-013.

#### Language
- **FR-016**: The site MUST provide a visitor-facing control to switch all page content between Spanish and English.
- **FR-017**: The visitor's selected language MUST persist across navigation within the session and across return visits.
- **FR-018**: If a translation is missing for a given content field, the site MUST fall back to the other available language rather than rendering empty or placeholder text.

#### Deployment
- **FR-019**: The final output MUST be fully static and deployable to GitHub Pages at `gonzadzz00.github.io` with no server-side processing.
- **FR-020**: Images MUST be optimized and served in modern formats (WebP/AVIF with fallback).

### Key Entities

Each entity's text fields are stored per-language (Spanish and English); non-text attributes (dates, links, images) are shared across languages.

- **Profile**: Gonzalo's introductory information — name, role/title, short bio, key highlights shown in Mi Perfil.
- **Education Entry**: An institution, program/degree, and date range shown in Educación.
- **Project**: A portfolio project with title, problem statement, approach, tools/technologies used, outcome, and optional media/link, shown in Proyectos.
- **Certification Entry**: A certification name, issuing organization, and date, shown in Certificaciones.
- **Book Entry**: A book title, author, and optional note/cover image, shown in Libros.
- **Contact Method**: A single reachable direct channel (e.g., email address, social profile link) shown in Contacto.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can visually identify who Gonzalo is, his role, and locate all six content sections within 2 minutes of landing on the page.
- **SC-002**: A visitor can reach any of the six sections from anywhere on the page in a single navigation interaction (one click/tap).
- **SC-003**: The page achieves a Lighthouse Performance score of 90 or higher on mobile.
- **SC-004**: The page meets WCAG 2.1 Level AA requirements for color contrast and keyboard navigation.
- **SC-005**: The layout renders with no horizontal scrolling and no overlapping content across mobile, tablet, and desktop viewport widths.
- **SC-006**: The maintainer can publish a new project, certification, or book entry by editing only the centralized content source, without editing any layout file.
- **SC-007**: A visitor's chosen theme (light/dark) is correctly restored on 100% of subsequent visits from the same browser, absent cleared storage.
- **SC-008**: A visitor can switch the entire page to their preferred language (Spanish or English) in a single interaction, with 100% of visible section text reflecting that language.
- **SC-009**: A visitor's chosen language is correctly restored on 100% of subsequent visits from the same browser, absent cleared storage.
- **SC-010**: Every interactive component type (cards, buttons, nav items) across all six sections exhibits a distinctive dynamic/futuristic visual treatment (depth, glow, or motion-based), verifiable by visual inspection of each component type with no section left visually flat/static.
- **SC-011**: With "reduce motion" enabled, 100% of pages remain fully readable with no missing content, broken layout, or stuck mid-animation state.
- **SC-012**: The Lighthouse Performance score of 90+ on mobile (SC-003) continues to hold after the added visual/motion treatments.

## Out of Scope

- Any backend, API, or database.
- Reference-template sections without a current equivalent: Testimonials, Experience-as-reviews, Approach.
- The reference template's 3D globe / heavy interactive visualization — excluded as a dependency that conflicts with the site's performance and simplicity requirements. May be reconsidered later with explicit justification.
- Content rewriting or restructuring of meaning — this refactor preserves the existing Spanish text's meaning as-is; the only new copy introduced is its faithful English translation.
- Contact forms and third-party form-submission services — Contacto uses direct links only.
- Magnetic-cursor-style button interactions.

## Assumptions

- The current site's existing Spanish copy (profile bio, project descriptions, certification/education/book entries, contact details) is preserved in meaning; an English translation of each is added as new content for this refactor.
- "Optimized images" means appropriately compressed, modern-format images sized for their display context — no specific tooling is prescribed here (decided in planning).
- Scroll-triggered animations, where used, default to subtle fade/slide-in effects rather than elaborate motion, to stay within the performance and "restrained" requirements; animated gradient/spotlight hover accents are included but kept lightweight for the same reason.
- Default language on first visit (before any explicit selection) is Spanish, matching the current site.
- "Futuristic" and "not static" (FR-021–FR-024, User Story 6) are interpreted as: depth/glass/glow surface treatments, richer hover/focus micro-interactions, and staggered/parallax-style entrance motion, introduced without any new heavy dependency, to stay within the constitution's minimal-dependency and Lighthouse 90+ constraints. Magnetic-cursor button interactions remain explicitly excluded per the existing Context note.
- The specific color palette, shapes, and named visual motif ("futuristic") are decided during planning/design, not prescribed at the requirements level; the requirement is the presence and consistency of dynamic/depth treatment, not a specific aesthetic recipe.
