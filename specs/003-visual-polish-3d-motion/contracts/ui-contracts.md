# UI Contracts: Refinamiento estético

**Feature**: 003-visual-polish-3d-motion | **Date**: 2026-09-29

El sitio no expone APIs. Los contratos son las convenciones de marcado y de CSS que comparten componentes y scripts.

## 1. Tokens de movimiento (`src/styles/global.css`)

```css
--motion-duration-fast: 150ms;   /* hover, foco */
--motion-duration-base: 500ms;   /* entrada de elementos */
--motion-duration-slow: 900ms;   /* línea de tiempo, DAG */
--motion-ease: cubic-bezier(0.22, 1, 0.36, 1);   /* misma curva que hero */
```

Toda transición o animación nueva MUST usar estos tokens. Bajo `@media (prefers-reduced-motion: reduce)` los efectos nuevos MUST quedar en su estado final, sin transición.

## 2. Atributos y clases de comportamiento

| Contrato | Quién lo consume | Efecto |
|---|---|---|
| `.reveal`, `.reveal-stagger`, `.reveal-title` (existentes) | `ScrollReveal.astro` | Añade `.visible` al entrar en pantalla |
| `data-tilt` | `TiltHover.astro` (nuevo) | Inclinación 3D en hover; ignorado en táctil y con reducción de movimiento |
| `.book-3d` | CSS | `rotateY` en hover/foco, sin JS |
| `data-model="<assetId>"` | `ModelLoader` (script en `HeroScene`/`Projects`) | Carga diferida del modelo al entrar en pantalla |
| `data-timeline` | script de Educación | Dibuja la línea al hacer scroll |
| `data-flow-node="<key>"` | script del DAG | Tooltip por hover/foco con `ui-strings` `flow.node.<key>` |
| `data-flow-toggle` | script del DAG | Alterna `playing`/`paused`; `aria-pressed` refleja el estado |

## 3. Componentes nuevos

| Componente | Props | Salida |
|---|---|---|
| `HeroScene.astro` | `posterSrc`, `modelSrc`, `floatingIcons: string[]` | Póster inmediato; `<model-viewer>` inyectado luego; íconos flotantes; `alt` bilingüe |
| `Illustration.astro` | `assetId`, `alt` `{es,en}`, `float?: boolean` | Imagen optimizada con `width`/`height` fijos (evita CLS) |
| `ScrollProgress.astro` | — | Barra fija superior con `role="progressbar"` oculta a lectores de pantalla o con `aria-hidden` |
| `TiltHover.astro` | — | Script global que aplica `data-tilt` |
| `AssetCredits.astro` (en `Footer`) | — | Lista generada desde `assets.json` |

## 4. Accesibilidad

- Toda imagen/ilustración: `alt` en ES y EN (mediante los atributos `data-i18n-*` existentes) o `alt=""` si es decorativa.
- El modelo 3D lleva `alt` descriptivo; los íconos flotantes son decorativos (`aria-hidden="true"`).
- Nodos del DAG, "ver más" y botón de pausa: alcanzables con teclado y con foco visible; tooltips accesibles por foco.
- Contraste AA en tarjetas, tooltips y barra de progreso en ambos temas (claro/oscuro existentes).

## 5. Metadatos (`BaseLayout.astro`)

- `title` por defecto y `description` en el posicionamiento "Data & AI Engineer".
- `og:url`, `og:image` construidos con `Astro.site`; `twitter:card = summary_large_image`; imagen 1200×630.
