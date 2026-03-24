# Quickstart: Modular Interactive Portfolio

## Prerequisites

- Node.js 18+ installed
- npm or pnpm
- Git

## Setup

```bash
# Clone and enter the project
git clone https://github.com/gonzadzz00/gonzadzz00.github.io.git
cd gonzadzz00.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

## Project Structure

```
gonzadzz00.github.io/
  src/
    components/       # Reusable Astro components
      Navbar.astro
      Footer.astro
      ThemeToggle.astro
      ProjectCard.astro
      CertificationCard.astro
      BookCard.astro
      EducationCard.astro
      FocusAreaCard.astro
      ImageCarousel.astro
    sections/         # Full page sections (one per portfolio area)
      Hero.astro
      About.astro
      Education.astro
      Projects.astro
      Certifications.astro
      Books.astro
      Contact.astro
    layouts/
      BaseLayout.astro
    data/             # Content data (JSON files)
      projects.json
      certifications.json
      books.json
      education.json
      focus-areas.json
      site-config.json
      tech-stack.json
    pages/
      index.astro     # Single entry point, composes sections
    styles/
      global.css      # Design tokens, reset, Bootstrap overrides
  public/
    icon/             # Logos, favicons (migrated from current root)
    images/           # Project screenshots and media
  astro.config.mjs    # Astro configuration
  package.json
```

## Common Tasks

### Add a New Project

1. Add an entry to `src/data/projects.json`:
   ```json
   {
     "id": "my-new-project",
     "title": "Project Title",
     "description": "What the project does...",
     "tools": ["Python", "Docker"],
     "images": [{ "src": "/images/project.jpg", "alt": "Screenshot" }],
     "links": [{ "label": "Ver Proyecto", "url": "https://github.com/...", "icon": "github" }]
   }
   ```
2. Add images to `public/images/`.
3. The project appears automatically — no code changes needed.

### Add a New Book

1. Add an entry to `src/data/books.json`:
   ```json
   {
     "id": "book-slug",
     "title": "Book Title",
     "author": "Author Name",
     "category": "data-science",
     "note": "Why this book matters"
   }
   ```

### Add a New Certification

1. Add an entry to `src/data/certifications.json`:
   ```json
   {
     "id": "cert-slug",
     "name": "Certification Name",
     "issuer": "Organization",
     "date": "2026-03",
     "verificationUrl": "https://..."
   }
   ```

### Toggle Dark/Light Theme

The theme toggle persists via `localStorage`. It is implemented as an
Astro client island (`ThemeToggle.astro`) with `client:load` directive.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. This is what GitHub Pages serves.

### Preview Production Build

```bash
npm run preview
```

## Deployment

GitHub Actions automatically builds and deploys on push to `main`.
The workflow file is at `.github/workflows/deploy.yml`.

## Validation

After any change, verify:
1. `npm run build` succeeds with no errors
2. Open `dist/index.html` locally — all sections render
3. Theme toggle works in both modes
4. All navigation links scroll to correct sections
5. Responsive layout holds on 320px and 1440px viewports
