# Quickstart: verificar la feature

**Feature**: 003-visual-polish-3d-motion | **Date**: 2026-09-29

## Ejecutar

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build && npm run preview   # verificación de producción
```

## Preparar assets (una sola vez, fuera del build)

1. Descargar el cerebro y los modelos secundarios de Poly Pizza; anotar autor, URL y licencia (preferir CC0).
2. Optimizar cada GLB: `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt --texture-resize 1024`; confirmar ≤ 1 MB.
3. Confirmar los términos vigentes de Icons8 para repos públicos antes de commitear ilustraciones.
4. Registrar cada asset en `src/data/assets.json` y en `CREDITS.md`.

## Checklist de verificación manual

| # | Comprobación | Requisito |
|---|---|---|
| 1 | Hero: el póster aparece de inmediato; el cerebro 3D aparece después sin mover el contenido | FR-001, FR-003 |
| 2 | Mover el mouse/arrastrar rota el modelo; sin interacción rota lentamente | FR-001 |
| 3 | Desactivar WebGL (`chrome://flags`) → imagen estática, sitio completo | FR-003, SC-004 |
| 4 | Activar "reducir movimiento" del SO → sin rotación, flotado, tilt, línea de tiempo ni flujo del DAG | FR-015 |
| 5 | Pegar el enlace en 3 plataformas → dominio, título e imagen 1200×630 correctos | FR-005, SC-005 |
| 6 | Alternar ES/EN → todo texto nuevo cambia (incluidos alt, tooltips, botones) | FR-017, SC-007 |
| 7 | Tarjetas de áreas: 2–3 líneas + "ver más" con teclado | FR-007 |
| 8 | Abrir el DAG → flujo animado; pausar/reanudar; foco en nodos muestra descripción | FR-012 |
| 9 | Hover en proyectos/certificados (tilt) y libros (giro) | FR-009 |
| 10 | Barra de progreso y enlace activo al recorrer la página | FR-014 |
| 11 | Pestaña en segundo plano/modelo fuera de pantalla → el render 3D se pausa | FR-016 |
| 12 | Pie de página y `CREDITS.md` listan todos los assets | FR-018, SC-006 |
| 13 | Lighthouse móvil (build de producción): Performance ≥ 90, Accesibilidad sin regresión, CLS < 0,1 | SC-001, SC-003 |
| 14 | Peso de assets nuevos ≤ 3 MB; ningún GLB > 1 MB | SC-002 |
| 15 | Probar en Chrome de escritorio y un navegador móvil (constitución) | Flujo de trabajo |

## Resultados de medición (2026-09-29)

Lighthouse móvil sobre `npm run build && npm run preview` (Chromium local, throttling simulado por defecto).

| Métrica | `main` (antes) | Esta rama | Objetivo |
|---|---|---|---|
| Performance | 63 | 73–74 | ≥ 90 |
| CLS | 0,228 | 0,006 | < 0,1 |
| TBT | 0 ms | 0–10 ms | — |
| LCP | 95 s | 94 s | < 2,5 s |
| Accesibilidad | — | 94–95 | sin regresión |

**Por qué no llega a 90 (ya pasaba en `main`)**: la galería de proyectos descarga sus imágenes al cargar la página aunque estén dentro de modales cerrados (`loading="lazy"` no las difiere porque el overlay ocupa el viewport). Entre ellas `public/icon/0919.gif` pesa 12 MB y hay tres PNG de más de 1 MB; el peso total de la página es ~17,8 MB y el LCP simulado ronda 94 s. Los assets de esta feature suman ~0,6 MB (5 modelos GLB) más 64 KB de imágenes y no se descargan en la carga pasiva.

**Con esta feature**: el 3D se carga solo tras interactuar, el título con efecto "scramble" ya no provoca cambios de layout (CLS de 0,228 a 0,006) y con "reducir movimiento" no se descarga ningún modelo.
