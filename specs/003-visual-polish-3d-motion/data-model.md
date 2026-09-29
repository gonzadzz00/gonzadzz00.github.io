# Data Model: Refinamiento estético con 3D, ilustraciones y movimiento

**Feature**: 003-visual-polish-3d-motion | **Date**: 2026-09-29

La feature es de capa visual. No hay base de datos; los datos nuevos son archivos JSON estáticos en `src/data/`, siguiendo el patrón existente.

## Entidad: Asset de terceros (`src/data/assets.json`, nuevo)

Registro único que alimenta el pie de página y `CREDITS.md`.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | string | Único, kebab-case (`hero-brain`, `about-illustration`) |
| `kind` | `"model3d"` \| `"illustration"` | Obligatorio |
| `title` | string | Nombre del asset en su fuente |
| `author` | string | Obligatorio para modelos CC-BY; para Icons8 `"Icons8"` |
| `sourceUrl` | string (URL) | Página de origen del asset |
| `license` | `"CC0"` \| `"CC-BY"` \| `"Icons8-free"` | Obligatorio; solo valores verificados |
| `attributionRequired` | boolean | `true` para CC-BY e Icons8 |
| `file` | string | Ruta del archivo en el repo |
| `usedIn` | string[] | Secciones donde se usa (`hero`, `about`, `projects`, …) |
| `sizeBytes` | number | Debe cumplir el presupuesto (modelo ≤ 1 MB) |

**Validación**: un asset sin `license` verificada no se incorpora (FR-018). Todo asset con `attributionRequired: true` aparece en el pie de página.

## Entidad: Sección del sitio (existente, extendida)

Sin archivo nuevo. Cada sección declara su apoyo visual mediante componentes:

| Sección | Apoyo visual nuevo | Origen del contenido |
|---|---|---|
| Hero | Escena 3D + 4–6 íconos flotantes | Íconos tomados de `tech-stack.json` (Python, PyTorch, Airflow, n8n, Docker, LangChain) |
| Sobre mí | Ilustración | `assets.json` |
| Áreas de enfoque | Ilustración por tarjeta + "ver más" | `focus-areas.json` (agregar campo `illustration`) |
| Educación | Ilustración + línea de tiempo animada | `education.json` |
| Proyectos | Tilt + modelo 3D opcional | `projects.json` (agregar campo opcional `model3d`) |
| Contacto | Ilustración + CTA | `site-config.json` |

## Extensiones a JSON existentes

- `focus-areas.json`: por área, `illustration` (id de asset). No se agrega `summary`: cada área ya tiene una lista `skills`; la tarjeta muestra las 2 primeras y el resto queda tras "ver más".
- `projects.json`: `model3d` opcional `{ assetId, alt: { es, en } }`.
- `ui-strings.json`: claves nuevas `focus.more`/`focus.less`, `flow.pause`/`flow.resume`, `flow.node.*` (descripciones de nodos), `hero.modelAlt`, `contact.cta`, `credits.*`; todas con `es` y `en` (FR-017).

## Estados

- **Escena 3D del hero**: `poster` → (condiciones cumplidas + en pantalla) `loading` → `ready`; o `poster` permanente (`fallback`). Nunca vuelve a `loading` una vez en `fallback`.
- **Animación del DAG**: `idle` → (modal abierto) `playing` ⇄ `paused` → (modal cerrado) `idle`. Con reducción de movimiento se queda en `idle` con el estado final visible.
