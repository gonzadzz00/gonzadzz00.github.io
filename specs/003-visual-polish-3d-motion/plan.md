# Implementation Plan: Refinamiento estético con 3D, ilustraciones y movimiento

**Branch**: `003-visual-polish-3d-motion` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-visual-polish-3d-motion/spec.md`

## Summary

Hacer el portfolio más estético y profesional sumando un hero con cerebro 3D (con íconos del stack flotando), ilustraciones de estilo unificado, tarjetas de áreas con "ver más", tilt/giro 3D en hover, línea de tiempo animada, flujo animado en el diagrama del DAG y un indicador de progreso, además de corregir título y metadatos sociales. El enfoque extiende lo que el sitio Astro ya tiene (`ScrollReveal`, `SpotlightHover`, i18n, temas, tokens de `global.css`) en lugar de crear sistemas nuevos. La única dependencia nueva es `@google/model-viewer`, cargada de forma diferida y solo cuando el dispositivo es capaz y no hay preferencia de reducir movimiento; en cualquier otro caso el hero queda con el póster estático. Ver [research.md](./research.md).

## Technical Context

**Language/Version**: Astro 6 (TypeScript en frontmatter/scripts de componentes), HTML, CSS, JS vanilla en cliente
**Primary Dependencies**: `astro` ^6.0.8, `@fontsource/montserrat`, `@fontsource/open-sans`, Bootstrap 5.3 (existentes). **Nueva**: `@google/model-viewer` (import dinámico, chunk propio). Herramienta local no versionada: `@gltf-transform/cli` (solo para optimizar GLB).
**Storage**: Archivos JSON estáticos en `src/data/`; nuevo `assets.json`; extensiones a `focus-areas.json`, `projects.json`, `ui-strings.json` (ver [data-model.md](./data-model.md))
**Testing**: Sin framework de pruebas automatizadas en el proyecto; verificación manual según [quickstart.md](./quickstart.md) (Chrome + un navegador móvil, Lighthouse móvil, pasada con reducción de movimiento y sin WebGL)
**Target Platform**: Sitio estático en GitHub Pages; últimas 2 versiones de Chrome, Firefox, Safari, Edge; iOS Safari y Chrome Android
**Project Type**: Web, sitio estático Astro único (sin backend)
**Performance Goals**: Lighthouse móvil ≥ 90 (constitución); LCP < 2,5 s; CLS < 0,1
**Constraints**: Salida 100 % estática; assets nuevos ≤ 3 MB en total y cada GLB ≤ 1 MB (≤ ~50k triángulos); el 3D nunca en la ruta crítica; todo movimiento nuevo respeta `prefers-reduced-motion`; texto nuevo en ES y EN; AA de contraste en ambos temas
**Scale/Scope**: Un hero 3D + hasta 3 modelos secundarios, 6–8 ilustraciones; se tocan 7 secciones y componentes compartidos, sin cambiar el contenido existente

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Estado | Notas |
|---|---|---|
| I. Compatibilidad con GitHub Pages | ✅ PASS | Todo es estático; assets en el repo; `model-viewer` empaquetado por el build, sin CDN nuevo ni servicio propio. |
| II. Identidad visual profesional | ⚠️ PASS con condiciones | El principio pide "evitar animaciones excesivas". Mitigación: un solo vocabulario de movimiento (tokens `--motion-*`), efectos solo al entrar/hover, un único elemento animado continuo por vista (el hero), y sin marquee. Ilustraciones y modelos de un único estilo (FR-019). |
| III. Rendimiento y accesibilidad | ⚠️ PASS con condiciones | Exige Lighthouse ≥ 90 (no 85 como en `spec-frontend.md`; la spec se ajusta). El riesgo es el peso de `model-viewer`: carga diferida tras el LCP, solo con WebGL y dispositivo capaz. Imágenes en WebP. Se mide tras cada fase; si baja de 90 se recorta 3D secundario (P3) antes que el hero. |
| IV. Arquitectura centrada en contenido | ✅ PASS | No cambia el contenido; el texto de las áreas se acorta en la vista y se conserva completo en "ver más". |
| V. Mantenibilidad y simplicidad | ✅ PASS con justificación | Una dependencia nueva que reemplaza código 3D propio (ver Complexity Tracking). Sin GSAP; se reutilizan los mecanismos existentes. |
| Hosting y despliegue | ⚠️ A confirmar | La constitución fija el dominio `gonzadzz00.github.io` y admite dominio personalizado "sin romper GitHub Pages". Cambiar `site` a `portfolio.octopus-data-ai.com` requiere confirmar que ese dominio ya sirve el sitio (ver research D8) y actualizar la constitución en el mismo cambio. |

**Post-diseño (Phase 1)**: sin violaciones nuevas. Las tres condiciones se convierten en tareas de verificación (medición de Lighthouse por fase, confirmación del dominio, revisión de licencias).

## Project Structure

### Documentation (this feature)

```text
specs/003-visual-polish-3d-motion/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contracts.md
├── checklists/
│   └── requirements.md
└── tasks.md             # lo genera /speckit.tasks
```

### Source Code (repository root)

```text
astro.config.mjs                 # site → dominio actual (D8)
CREDITS.md                       # nuevo: atribuciones
public/
├── models/                      # nuevo: hero-brain.glb, cart.glb, ship.glb, container.glb (opcionales)
└── images/
    ├── hero-poster.webp         # nuevo: póster/LCP del hero
    └── og-cover.jpg             # nuevo: 1200×630
src/
├── assets/illustrations/        # nuevo: 6–8 ilustraciones optimizadas por Astro
├── components/
│   ├── HeroScene.astro          # nuevo: póster + model-viewer diferido + íconos flotantes
│   ├── Illustration.astro       # nuevo
│   ├── ScrollProgress.astro     # nuevo
│   ├── TiltHover.astro          # nuevo (junto a SpotlightHover.astro)
│   ├── ScrollReveal.astro       # se reutiliza (posible ajuste de tokens)
│   ├── Navbar.astro             # enlace activo por sección
│   └── Footer.astro             # créditos generados desde assets.json
├── data/
│   ├── assets.json              # nuevo
│   ├── focus-areas.json         # + illustration, summary
│   ├── projects.json            # + model3d opcional
│   └── ui-strings.json          # + claves nuevas ES/EN
├── layouts/BaseLayout.astro     # título, descripción, OG, Twitter card
├── pages/index.astro            # monta los componentes nuevos
├── sections/                    # Hero, About, Education, Projects (DAG en modal), Books, Contact
└── styles/global.css            # tokens --motion-*, tilt, libro 3D, línea de tiempo, flujo del DAG
```

**Structure Decision**: se mantiene la estructura Astro actual (`components` / `sections` / `data` / `styles`) y se agregan componentes por responsabilidad. No se adoptan las carpetas `/js` y `/css` de `spec-frontend.md`, porque el sitio ya no es HTML plano.

## Fases de entrega

Cada fase deja el sitio desplegable y coherente (constitución, "Incremental delivery"). Orden alineado con las prioridades de la spec.

| Fase | Contenido | Historia | Prioridad |
|---|---|---|---|
| 1 | Título, metadatos, OG, `site`; tokens `--motion-*`; barra de progreso; enlace activo | US1, US4 | P1 |
| 2 | Hero: póster, cerebro 3D diferido, íconos flotantes, fallbacks | US1 | P1 |
| 3 | Ilustraciones (verificar licencia primero), tarjetas de áreas con "ver más", línea de tiempo de Educación, cierre de Contacto | US2 | P1 |
| 4 | Animación del DAG en el modal: flujo, tooltips, pausa | US3 | P2 |
| 5 | Tilt en tarjetas y certificados, libro 3D, entrada escalonada del stack | US4 | P2 |
| 6 | Modelos 3D secundarios (proyectos, contacto) | US5 | P3 |
| 7 | Auditoría: Lighthouse, accesibilidad, reducción de movimiento, créditos | Todas | P1 |

## Complexity Tracking

| Violación / adición | Por qué se necesita | Alternativa más simple descartada porque |
|---|---|---|
| Nueva dependencia `@google/model-viewer` (Principio V) | Da auto-rotación, control de cámara, pausa fuera de pantalla y póster con poco código propio | Escribir la escena con three.js implica mucho más código a mantener; una imagen estática no cumple FR-001 |
| Cambio de dominio del sitio (Hosting) | La spec exige metadatos con `portfolio.octopus-data-ai.com` | Dejar `gonzadzz00.github.io` contradice FR-005 y el objetivo de marca |
