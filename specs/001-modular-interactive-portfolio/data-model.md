# Data Model: Modular Interactive Portfolio

**Date**: 2026-03-23
**Feature**: 001-modular-interactive-portfolio

## Entities

### Project

Represents a data science/engineering project showcased in the portfolio.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier (slug) |
| title | string | yes | Project display name |
| description | string | yes | Problem context and approach (1-3 paragraphs) |
| tools | string[] | yes | Technologies and tools used |
| images | Image[] | yes | Screenshots, diagrams, or GIFs |
| links | Link[] | yes | External links (GitHub, YouTube, demo) |
| category | string | no | Grouping label (e.g., "visualization", "ml", "data-engineering") |
| order | number | no | Display sort order |

### Certification

Represents a professional certification or course completion.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier |
| name | string | yes | Certification or course name |
| issuer | string | yes | Issuing organization |
| issuerLogo | string | no | Path to issuer logo image |
| issuerUrl | string | no | Link to issuer website |
| date | string | yes | Date obtained (YYYY-MM or YYYY) |
| verificationUrl | string | no | Link to verify the credential |
| description | string | no | Brief summary of content covered |
| topics | string[] | no | Key topics list |
| order | number | no | Display sort order |

### Book

Represents a book relevant to professional development.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier |
| title | string | yes | Book title |
| author | string | yes | Author name(s) |
| category | string | yes | Category (e.g., "data-science", "leadership", "engineering") |
| note | string | no | Brief takeaway or relevance note |
| coverImage | string | no | Path to book cover image |
| order | number | no | Display sort order |

### EducationEntry

Represents a formal degree or academic program.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier |
| institution | string | yes | Institution name |
| program | string | yes | Degree or program title |
| institutionLogo | string | no | Path to institution logo |
| institutionUrl | string | no | Link to program page |
| description | string | yes | Program summary (1-2 paragraphs) |
| competencies | string[] | yes | Key skills/competencies list |
| order | number | no | Display sort order |

### FocusArea

Represents a professional focus area or domain of expertise.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier |
| name | string | yes | Area name (e.g., "Ciencia de Datos") |
| icon | string | yes | Emoji or icon identifier |
| skills | string[] | yes | Specific skills within this area |
| order | number | no | Display sort order |

### SiteConfig

Global site configuration (not a content entity — used for site-wide settings).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ownerName | string | yes | "Gonzalo Diaz" |
| tagline | string | yes | Professional tagline for hero section |
| bio | string | yes | About me text (supports paragraphs) |
| socialLinks | Link[] | yes | LinkedIn, GitHub, email links |
| techStack | TechBadge[] | yes | Technology badges for the stack section |

## Shared Types

### Image

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| src | string | yes | Image file path |
| alt | string | yes | Accessible alt text |

### Link

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | string | yes | Display text (e.g., "Ver Proyecto") |
| url | string | yes | Target URL |
| icon | string | no | Icon class or identifier (e.g., "github", "youtube") |

### TechBadge

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Technology name |
| badgeUrl | string | yes | shields.io badge URL |

## Relationships

- **SiteConfig** → has many **FocusArea** (displayed in About section)
- **SiteConfig** → has many **TechBadge** (displayed in tech stack)
- **Project** → has many **Image** and **Link**
- **Certification** → standalone (no foreign key relationships)
- **Book** → standalone
- **EducationEntry** → standalone

## Data Storage

All entities stored as JSON arrays in `src/data/`:

```
src/data/
  projects.json
  certifications.json
  books.json
  education.json
  focus-areas.json
  site-config.json
  tech-stack.json
```

Each JSON file is imported directly by the corresponding Astro component.
No database, no API, no build-time data fetching from external sources.
