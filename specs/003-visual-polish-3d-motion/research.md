# Research: Refinamiento estético con 3D, ilustraciones y movimiento

**Feature**: 003-visual-polish-3d-motion | **Date**: 2026-09-29

## Hallazgos sobre el estado real del sitio

`spec-frontend.md` describe un sitio HTML estático "sin build system". El repositorio ya es distinto, y el plan se ajusta a eso:

| Supuesto de `spec-frontend.md` | Realidad en el repo |
|---|---|
| Sitio estático sin build | Astro 6 con GitHub Actions (`.github/workflows/deploy.yml`) |
| Hay que crear scroll reveal | Ya existe `ScrollReveal.astro` (`.reveal`, `.reveal-stagger`, `.reveal-title`) |
| Hay que crear hover con efecto | Ya existe `SpotlightHover.astro` (spotlight en `.card`, `.btn-*`); falta tilt |
| Estructura `/js`, `/css` | Se usa `src/components`, `src/sections`, `src/styles/global.css` |
| Diagrama DAG visible en la página | Está en un **modal** (`#flowchart-modal` en `Projects.astro`); la animación debe activarse al abrirlo, no al entrar en pantalla |
| i18n a agregar | Ya existe (`data-i18n-es/en`, `ui-strings.json`, `I18nRuntime.astro`) |
| Metadatos OG a corregir | Confirmado: `BaseLayout.astro` usa `Data Analyst & Analytics Engineer`, `og:url` de `gonzadzz00.github.io` y `twitter:card=summary` |
| Dominio `portfolio.octopus-data-ai.com` | `astro.config.mjs` tiene `site: 'https://gonzadzz00.github.io'` y no hay `CNAME` en `public/` |

Además el hero ya tiene título con efecto "scramble" y fondo `brain_portada.jpg`; el modelo 3D se **superpone** a ese fondo en lugar de reemplazarlo.

## Decisiones

### D1. Renderizado 3D: `<model-viewer>`

- **Decision**: usar `@google/model-viewer` como dependencia npm, importada dinámicamente (`import()`) solo cuando el hero/modelo entra en pantalla y el dispositivo cumple las condiciones (D2).
- **Rationale**: es el camino de menor código (auto-rotate, póster, control de cámara, pausa fuera de pantalla). Principio V exige que cada dependencia "gane su lugar"; esta reemplaza cientos de líneas de three.js propio. Importada desde npm queda en un chunk propio, sin depender de un CDN adicional (Principio III).
- **Alternatives considered**: three.js + `GLTFLoader` (más control, pero más código a mantener); cargar `model-viewer` desde CDN (agrega un punto único de falla externo).
- **Riesgo**: el chunk pesa cientos de KB. Mitigación: nunca en la ruta crítica; carga en `requestIdleCallback` tras el LCP y solo si hay WebGL y no es gama baja.

### D2. Detección de fallback (sin WebGL / gama baja)

- **Decision**: cargar 3D solo si se cumplen todas: WebGL disponible, `prefers-reduced-motion: no-preference`, `navigator.deviceMemory` ≥ 4 (si está disponible), `hardwareConcurrency` ≥ 4 (si está disponible) y `navigator.connection.saveData` no activo.
- **Rationale**: FR-003/SC-004 piden imagen estática en gama baja; no existe una API única, así que se usa una heurística conservadora. Los valores ausentes (Safari/Firefox) se tratan como "capaz".
- **Alternatives considered**: benchmark de FPS en runtime (complejo, parpadea); solo WebGL (no cubre gama baja).
- **Enmienda (implementación)**: además de las condiciones anteriores, el bundle de `model-viewer` se importa recién tras la **primera interacción** del visitante (movimiento del puntero, toque, tecla, rueda o scroll) y con el contenedor en pantalla. Motivo: medido con Lighthouse móvil, cargarlo de forma pasiva subía el Total Blocking Time de 0 a 3–4 s (unos 6,8 s de evaluación de script con CPU limitada) y bajaba el puntaje de 63 a 29. Quien no interactúa sigue viendo el póster estático.

### D3. Reducción de movimiento

- **Decision**: con `prefers-reduced-motion: reduce` no se carga el modelo 3D interactivo (se queda el póster), no hay auto-rotación, flotado, tilt, línea de tiempo animada ni flujo del DAG; solo estados finales.
- **Rationale**: FR-015 y SC-004. El hero ya respeta esta preferencia para el título.

### D4. Animaciones: CSS + `IntersectionObserver`, sin GSAP

- **Decision**: extender `ScrollReveal.astro` y `global.css`; tilt con un componente nuevo `TiltHover.astro` junto a `SpotlightHover.astro`; animación del DAG con `stroke-dashoffset` en CSS.
- **Rationale**: los mecanismos ya existen; GSAP añadiría una dependencia sin necesidad (Principio V). La línea de tiempo y el DAG se resuelven con CSS + un observer.
- **Alternatives considered**: GSAP + ScrollTrigger (descartado por peso y por duplicar el sistema actual).

### D5. Movimiento consistente

- **Decision**: definir tokens `--motion-duration-*` y `--motion-ease` en `global.css` y usarlos en todas las transiciones nuevas.
- **Rationale**: FR-008; Principio II pide un sistema visual cohesivo y evitar "animaciones excesivas".

### D6. Ilustraciones

- **Decision**: 6–8 ilustraciones de un único estilo de Icons8, optimizadas a WebP (o SVG si el plan gratuito lo entrega), guardadas en `src/assets/illustrations/` para que Astro las optimice. Atribución con enlace a Icons8 en el pie.
- **Rationale**: FR-006/FR-019. No pude leer la página de licencia de Icons8 (respuesta 403 desde esta sesión), así que **los términos no están verificados**. Lo que dice `spec-frontend.md` (atribución obligatoria, sin redistribución como recurso independiente, SVG/alta resolución a menudo de pago) se toma como hipótesis a confirmar en la descarga.
- **Punto de decisión bloqueante para tareas de assets**: el repositorio es público; si los términos vigentes no permiten commitear los archivos, se debe optar por otra fuente gratuita compatible con repos públicos (p. ej. ilustraciones con licencia abierta) manteniendo un único estilo. Esta verificación es la primera tarea de la fase de ilustraciones.
- **Alternatives considered**: ilustraciones propias en SVG (más trabajo, control total de paleta); íconos de Font Awesome ya cargados (no aportan el efecto buscado).

### D7. Modelos 3D (Poly Pizza)

- **Decision**: elegir un cerebro low-poly (≤ 50k triángulos, ≤ 1 MB tras optimizar) entre los resultados de Poly Pizza; para proyectos, carrito/etiqueta, barco de carga y contenedor. Preferir CC0.
- **Rationale**: la búsqueda "brain" devuelve al menos tres candidatos (de Poly by Google, Chris Ross y J-Toastie). El listado no muestra licencia ni triángulos: hay que abrir cada ficha. Se registra en `CREDITS.md` cada modelo con autor, URL y licencia.
- **Optimización**: `gltf-transform` (meshopt/Draco, texturas ≤ 1024 px) como herramienta local de una sola vez; no entra en `package.json` ni en el build.

### D8. Metadatos, dominio y OG

- **Decision**: cambiar `site` en `astro.config.mjs` a `https://portfolio.octopus-data-ai.com` y construir `og:url`/`og:image` con `Astro.site`; título/descripción "Data & AI Engineer"; `twitter:card=summary_large_image`; crear `public/images/og-cover.jpg` (1200×630).
- **Rationale**: FR-004/FR-005. Con `Astro.site` el dominio queda en un solo lugar.
- **Riesgo/supuesto a confirmar**: el repo no tiene `CNAME` y el workflow despliega por Actions; si el dominio se configura en los ajustes de GitHub Pages no hace falta el archivo, pero conviene confirmar que el dominio ya sirve el sitio antes de cambiar `site`, porque los assets con rutas absolutas dependen de él.

### D9. Diagrama del DAG dentro del modal

- **Decision**: la animación del flujo se activa al abrir el modal y se detiene al cerrarlo; botón de pausa dentro del modal; nodos con `tabindex="0"` y tooltip por hover/foco con textos bilingües en `ui-strings.json`.
- **Rationale**: el diagrama vive en `#flowchart-modal`; "entrar en pantalla" equivale a abrir el modal. Se anota como supuesto en la spec.

### D10. Objetivo de Lighthouse

- **Decision**: el objetivo es **≥ 90** en móvil (constitución, Principio III), no 85 como en `spec-frontend.md`.
- **Rationale**: la constitución prevalece sobre preferencias ad hoc. Se ajusta SC-001 en la spec.
- **Riesgo**: 3D + assets nuevos pueden bajar el puntaje. Mitigación: póster como LCP, carga diferida del 3D, presupuesto de 3 MB y medición tras cada fase. El repo ya pesa 32 MB en `public/`, por lo que conviene no sumar más peso al camino crítico.

### D11. Libros y "marquee"

- **Decision**: libros con `rotateY` en CSS puro. El marquee de Tech Stack en móvil queda **fuera**: era opcional en `spec-frontend.md` y no está en la spec de esta feature.
- **Rationale**: acotar el alcance y evitar exceso de movimiento (Principio II).

## Preguntas abiertas resueltas

Ninguna `NEEDS CLARIFICATION` pendiente. Quedan dos verificaciones externas antes de implementar (licencias de Icons8 y confirmación del dominio), registradas como riesgos, no como bloqueos del diseño.
