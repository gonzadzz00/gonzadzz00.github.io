# Tasks: Refinamiento estético con 3D, ilustraciones y movimiento

**Input**: Documentos de diseño en `/specs/003-visual-polish-3d-motion/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md), [quickstart.md](./quickstart.md)

**Tests**: No se solicitaron pruebas automatizadas y el proyecto no tiene framework de pruebas. La verificación es manual según [quickstart.md](./quickstart.md); cada historia cierra con una tarea de verificación.

**Organization**: Tareas agrupadas por historia de usuario; cada historia se puede implementar y verificar por separado.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede ejecutar en paralelo (archivos distintos, sin dependencia de tareas incompletas)
- **[Story]**: historia a la que pertenece (US1–US5)
- Rutas relativas a la raíz del repo `/home/gonzadzz/GitHub/gonzadzz00.github.io`

## Convenciones para todas las tareas

- Todo movimiento nuevo usa los tokens `--motion-*` y queda en su estado final bajo `prefers-reduced-motion: reduce`.
- Todo texto nuevo lleva `data-i18n-es`/`data-i18n-en` y su clave en `src/data/ui-strings.json` (patrón existente).
- Ningún asset se commitea sin licencia verificada y su entrada en `src/data/assets.json` y `CREDITS.md`.
- Cada fase termina con el sitio desplegable (`npm run build` sin errores).

---

## Phase 1: Setup

**Purpose**: dependencia nueva y archivos base

- [X] T001 Instalar la dependencia con `npm install @google/model-viewer` y verificar que `package.json` y `package-lock.json` se actualizan; no agregar `@gltf-transform/cli` al proyecto (se usa con `npx`)
- [X] T002 [P] Crear `src/data/assets.json` como arreglo vacío `[]` con el esquema de [data-model.md](./data-model.md) (`id`, `kind`, `title`, `author`, `sourceUrl`, `license`, `attributionRequired`, `file`, `usedIn`, `sizeBytes`)
- [X] T003 [P] Crear `CREDITS.md` en la raíz con un encabezado, una tabla vacía (`Asset | Autor | Licencia | Fuente | Uso`) y la nota de atribución "Modelos 3D vía Poly Pizza · Ilustraciones: Icons8"
- [X] T004 [P] Crear las carpetas `public/models/`, `src/assets/illustrations/` (con un `.gitkeep` cada una si hace falta)

---

## Phase 2: Foundational (bloquea todas las historias)

**Purpose**: tokens de movimiento, componentes compartidos y créditos

**⚠️ CRITICAL**: ninguna historia puede empezar hasta terminar esta fase

- [X] T005 Agregar en `src/styles/global.css` (bloque `:root`) los tokens `--motion-duration-fast: 150ms`, `--motion-duration-base: 500ms`, `--motion-duration-slow: 900ms` y `--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)`
- [X] T006 Revisar en `src/styles/global.css` las reglas `.reveal`, `.reveal-stagger` y `.card` para que usen `--motion-duration-base` y `--motion-ease` en lugar de valores propios; mantener el bloque `@media (prefers-reduced-motion: reduce)` existente
- [X] T007 [P] Crear `src/components/Illustration.astro` con props `assetId`, `alt` (`{es, en}`), `decorative?: boolean` y `float?: boolean`; que resuelva el archivo desde `src/data/assets.json`, use `astro:assets` (`<Image>`) con `width`/`height` fijos, `loading="lazy"` y `decoding="async"`, y emita `alt` con `data-i18n-attr` como en `src/sections/Hero.astro`/`Navbar.astro`; `float` aplica una clase con animación sutil bajo `prefers-reduced-motion: no-preference`
- [X] T008 [P] Crear `src/components/AssetCredits.astro` que lea `src/data/assets.json` y muestre en el pie la línea "Modelos 3D: {autores} vía Poly Pizza · Ilustraciones: Icons8" con enlaces; ocultar cada grupo si no tiene assets; agregar las claves `credits.models`, `credits.illustrations` en `src/data/ui-strings.json` (ES/EN)
- [X] T009 Montar `<AssetCredits />` dentro de `src/components/Footer.astro`

**Checkpoint**: `npm run build` pasa; los tokens existen y el pie no muestra créditos vacíos.

---

## Phase 3: User Story 1 — Primera impresión sólida y coherente (Priority: P1) 🎯 MVP

**Goal**: hero con cerebro 3D y íconos flotantes, con fallback estático, más título y vista previa social correctos.

**Independent Test**: abrir el sitio en escritorio y móvil, comprobar hero, título de la pestaña y la vista previa al pegar el enlace (checks 1–5 de quickstart).

### Metadatos (FR-004, FR-005)

- [ ] T010 [US1] Confirmar con la persona dueña del sitio que `portfolio.octopus-data-ai.com` ya sirve el sitio (ver research D8); si no, dejar `site` sin cambiar y continuar con T011–T012 usando `Astro.site`
- [ ] T011 [US1] En `astro.config.mjs` cambiar `site` a `https://portfolio.octopus-data-ai.com` (solo si T010 se confirmó); actualizar en `.specify/memory/constitution.md` la línea "Domain" de "Hosting & Deployment Constraints" y subir la versión de la constitución (PATCH) con la fecha de hoy
- [X] T012 [US1] En `src/layouts/BaseLayout.astro` reemplazar `title` y `description` por defecto por el posicionamiento "Data & AI Engineer" (sin "Data Analyst & Analytics Engineer"), construir `og:url` y `og:image` con `Astro.url`/`Astro.site`, apuntar `og:image` a `/images/og-cover.jpg`, y cambiar `twitter:card` a `summary_large_image` agregando `twitter:image`
- [X] T013 [P] [US1] Crear `public/images/og-cover.jpg` de 1200×630 (foto/logo y texto "Gonzalo Diaz · Data & AI Engineer") optimizada a menos de 200 KB

### Assets del hero

- [X] T014 [US1] Elegir el cerebro en Poly Pizza (candidatos: "Brain" de Poly by Google, "Brain In A Jar" de Chris Ross, "Brain" de J-Toastie): abrir cada ficha, registrar licencia y triángulos, descartar los de más de ~50k triángulos o sin licencia clara y preferir CC0
- [X] T015 [US1] Optimizar el GLB elegido con `npx @gltf-transform/cli optimize <entrada>.glb public/models/hero-brain.glb --compress meshopt --texture-resize 1024` y confirmar que pesa ≤ 1 MB
- [X] T016 [US1] Registrar el modelo en `src/data/assets.json` (`id: "hero-brain"`, `kind: "model3d"`, autor, URL, licencia, `sizeBytes`) y en `CREDITS.md`
- [X] T017 [P] [US1] Crear `public/images/hero-poster.webp` (render del cerebro o recorte optimizado de `public/icon/brain_portada.jpg`, ≤ 150 KB, mismo encuadre que el modelo) que actúe como póster y elemento LCP

### Componente del hero

- [X] T018 [US1] Crear `src/components/HeroScene.astro` con props `posterSrc`, `modelSrc`, `floatingIcons: string[]`: renderiza el `<img>` de póster con `width`/`height` fijos y `fetchpriority="high"`, un contenedor `data-model="hero-brain"` con el mismo tamaño (sin CLS) y los íconos flotantes (`aria-hidden="true"`) tomados de `src/data/tech-stack.json` por nombre (Python, PyTorch, Apache Airflow, n8n, Docker, LangChain)
- [X] T019 [US1] En el `<script>` de `src/components/HeroScene.astro` implementar `canLoad3D()` según research D2 (WebGL disponible, `prefers-reduced-motion: no-preference`, `deviceMemory` ≥ 4 y `hardwareConcurrency` ≥ 4 si existen, `connection.saveData` falso); si devuelve `false` no cargar nada y dejar el póster
- [X] T020 [US1] En el mismo script, cuando `canLoad3D()` sea `true`, esperar `requestIdleCallback` (con `setTimeout` de respaldo) y un `IntersectionObserver`; luego `await import('@google/model-viewer')`, crear el `<model-viewer>` con `src="/models/hero-brain.glb"`, `auto-rotate`, `camera-controls`, `disable-zoom`, `interaction-prompt="none"`, `loading="lazy"`, fondo transparente y `alt` bilingüe (clave `hero.modelAlt`); al disparar `load` ocultar el póster con transición
- [X] T021 [US1] En el mismo script agregar parallax leve: en `pointermove` (solo si `(hover: hover)`) ajustar `camera-orbit` del modelo con `requestAnimationFrame`; en móvil dejar solo la auto-rotación
- [X] T022 [US1] En el mismo script pausar el render cuando el hero sale de pantalla o la pestaña se oculta (`IntersectionObserver` + `visibilitychange`: quitar `auto-rotate` y ocultar el elemento con `visibility`/`hidden`, restaurar al volver)
- [X] T023 [US1] Estilos en `HeroScene.astro`: íconos flotantes posicionados alrededor del modelo con `@keyframes` de flotado desfasado (`animation-delay` distinto por ícono, duración de `--motion-duration-slow`), ocultos o en menor cantidad en ≤ 480 px, y sin animación bajo `prefers-reduced-motion: reduce`
- [X] T024 [US1] Agregar `hero.modelAlt` ("Modelo 3D de un cerebro" / "3D brain model") a `src/data/ui-strings.json`
- [X] T025 [US1] En `src/sections/Hero.astro` reemplazar el `<img class="hero-bg-image">` del fondo por el póster dentro de `<HeroScene />` manteniendo el título con efecto scramble y la tagline por encima (z-index) y el borde inferior; conservar la legibilidad del texto sobre el modelo (sombra/overlay existente)

### Verificación

- [X] T026 [US1] Verificar checks 1–6 de [quickstart.md](./quickstart.md): póster inmediato, modelo diferido sin CLS, fallback sin WebGL y con reducir movimiento, vista previa social en 3 plataformas, cambio ES/EN; medir Lighthouse móvil con `npm run build && npm run preview` y anotar el resultado (si baja de 90, mover la carga del modelo a después del evento `load` de la ventana)

**Checkpoint**: US1 completa y desplegable — MVP.

> Cambio posterior (2026-09-29): el cerebro 3D se movió del hero a la columna derecha de "Sobre mí" (`HeroScene.astro` pasó a `BrainScene.astro`, con la portada como póster y fallback). El hero volvió a su diseño original centrado. La ranura de ilustración de Sobre mí se eliminó (ya no hace falta el asset `about`).

> Nota de implementación (T010–T011 pendientes): el dominio no se cambió en `astro.config.mjs` hasta que se confirme que `portfolio.octopus-data-ai.com` sirve el sitio. Los metadatos ya se construyen con `Astro.site`, así que es un cambio de una línea. T026: el 3D se carga tras la primera interacción (ver [research.md](./research.md) D2); Lighthouse móvil quedó en 73–74 frente a 63 de `main` (ver [quickstart.md](./quickstart.md)).

---

## Phase 4: User Story 2 — Contenido técnico fácil de recorrer (Priority: P1)

**Goal**: ilustraciones de estilo unificado, áreas de enfoque como tarjetas con "ver más", línea de tiempo de Educación y cierre de Contacto con CTA.

**Independent Test**: recorrer la página y verificar ilustraciones, tarjetas, "ver más" y transiciones (checks 6–7 de quickstart).

- [ ] T027 [US2] **Verificar la licencia de Icons8** para el repositorio público: leer los términos vigentes desde un navegador (la página devolvió 403 a la herramienta automática), confirmar atribución, formatos gratis y si se pueden commitear los archivos; registrar la conclusión en `specs/003-visual-polish-3d-motion/research.md` (D6). Si no se permite, elegir otra fuente gratuita compatible con repos públicos manteniendo un solo estilo antes de continuar
- [ ] T028 [US2] Elegir **un solo estilo** y descargar 6–8 ilustraciones: sobre mí (persona con laptop), ciencia de datos, inteligencia artificial, ingeniería de datos, educación (graduación/logro), contacto (correo/conversación) y, opcional, certificaciones; recolorear a la paleta (`--accent-color` `#00a4ef`, `--accent-color-2` `#7b2ff7`) si el formato lo permite
- [ ] T029 [US2] Optimizar las ilustraciones a WebP (o SVG limpio de metadatos de editor), guardarlas en `src/assets/illustrations/` (`about.webp`, `data-science.webp`, `ai.webp`, `data-eng.webp`, `education.webp`, `contact.webp`) y registrarlas en `src/data/assets.json` y `CREDITS.md`
- [X] T030 [P] [US2] Agregar el campo `illustration` (id de asset) a cada área en `src/data/focus-areas.json` (`data-science`, `ai`, `data-eng`)
- [X] T031 [US2] En `src/sections/About.astro` insertar `<Illustration assetId="about" float />` junto al bloque `.about-bio` en una maqueta de dos columnas que colapsa a una columna en móvil; estilos en el bloque `<style>` de la sección
- [X] T032 [US2] En `src/sections/About.astro` mostrar en cada `.focus-card` su `<Illustration>` y solo las 2 primeras `skills`; las restantes van en un contenedor colapsable con un botón "Ver más"/"Ver menos" (`aria-expanded`, `aria-controls`, alcanzable con teclado, foco visible)
- [X] T033 [US2] Agregar el script del "ver más" en `src/sections/About.astro` (o un componente `FocusMore`) que alterne `aria-expanded` y la clase de apertura con transición de altura usando los tokens `--motion-*`; sin transición bajo reducir movimiento
- [X] T034 [P] [US2] Agregar a `src/data/ui-strings.json` las claves `focus.more` ("Ver más"/"Show more") y `focus.less` ("Ver menos"/"Show less")
- [X] T035 [US2] En `src/sections/Education.astro` agregar `<Illustration assetId="education" />` junto al título de la sección o encima de la grilla, respetando el diseño responsive
- [X] T036 [US2] En `src/sections/Education.astro` y `src/styles/global.css` dibujar una línea de tiempo vertical (`data-timeline`) que crece con `scaleY` al entrar en pantalla (reutilizar el observer de `ScrollReveal.astro` agregando la clase `visible`) y con puntos por institución; en móvil colapsar a un solo lado; estado final visible con reducir movimiento
- [X] T037 [US2] En `src/sections/Contact.astro` agregar `<Illustration assetId="contact" float />` y un botón principal `.btn-primary` "Escribime" que enlace a `mailto:` con `siteConfig.contactEmail`; agregar la clave `contact.writeMe` ("Escribime"/"Write me") en `src/data/ui-strings.json`
- [X] T038 [US2] Confirmar que las secciones tocadas conservan `reveal`/`reveal-stagger` con la misma curva y duración (FR-008) y que las tarjetas se elevan/inclinan según los estilos actuales de `.card`
- [ ] T039 [US2] Verificar checks 6–7 de [quickstart.md](./quickstart.md) en claro/oscuro, escritorio y móvil: ilustraciones nítidas, sin desbordes, contraste AA, "ver más" con teclado y ES/EN

**Checkpoint**: US1 y US2 funcionan de forma independiente.

> Nota de implementación (T027–T029 y T039 pendientes): el código de las ilustraciones (`Illustration.astro`, ranuras en Sobre mí, áreas, Educación y Contacto) está listo y no renderiza nada mientras no exista el asset en `src/data/assets.json`. Falta verificar la licencia de Icons8 y cargar las imágenes.

---

## Phase 5: User Story 3 — Diagrama del pipeline con flujo de datos (Priority: P2)

**Goal**: animación del flujo dentro del modal del DAG, descripciones por nodo y botón de pausa.

**Independent Test**: abrir el modal del diagrama, observar el flujo, pasar cursor/foco por nodos y pausar (check 8 de quickstart).

- [X] T040 [US3] En `src/sections/Projects.astro` (SVG del modal `#flowchart-modal`, aprox. líneas 115–291) agregar la clase `flow-edge` a los conectores sólidos con `marker-end="url(#fc-arrow)"` (los `<line>` y `<path>` de las etapas 1–5) y `flow-edge--dashed` a los conectores punteados de las líneas ~286–290
- [X] T041 [US3] En `src/sections/Projects.astro` agregar `data-flow-node="<clave>"` y `tabindex="0"` a cada `<g>` de nodo del SVG, con claves estables (`pedidos`, `seleccion`, `registro`, `estados`, `cdc`, `n8n`, etc., según los nodos que contenga el diagrama) y `role="img"` con `aria-label` bilingüe
- [X] T042 [US3] En `src/sections/Projects.astro` (bloque `<style>`) definir la animación del flujo: `.flowchart-modal.is-playing .flow-edge { stroke-dasharray: 6 6; animation: flow-dash var(--motion-duration-slow) linear infinite; }` con `@keyframes flow-dash { to { stroke-dashoffset: -12; } }`; escalonar el arranque por etapa con `animation-delay`; sin animación bajo `prefers-reduced-motion: reduce`
- [X] T043 [US3] En `src/sections/Projects.astro` estilos de resaltado de nodo en hover/foco (`[data-flow-node]:hover, :focus-visible` con trazo/relleno de acento y `outline` visible) y de un tooltip HTML posicionado sobre el modal
- [X] T044 [P] [US3] Agregar a `src/data/ui-strings.json` las claves `flow.pause`, `flow.resume` y una `flow.node.<clave>` por nodo con una descripción corta (ES/EN)
- [X] T045 [US3] En `src/sections/Projects.astro` agregar dentro del modal el botón `data-flow-toggle` "Pausar animación"/"Reanudar" (`aria-pressed`), con texto que cambia según el estado
- [X] T046 [US3] En el `<script>` de `src/sections/Projects.astro` extender `initFlowchartModal()` y los `openModal`/`closeModal` existentes: al abrir agregar `is-playing` (salvo reducir movimiento), al cerrar quitarla y resetear el botón; alternar con el botón; mostrar/ocultar el tooltip en `pointerenter`/`focus`/`blur` leyendo el texto de la clave `flow.node.*` según `data-lang`; el `Escape` existente debe seguir cerrando
- [X] T047 [US3] Verificar check 8 de [quickstart.md](./quickstart.md): flujo visible, pausa/reanudación, tooltips por mouse y teclado, cierre con Escape y que el flujo no corre con el modal cerrado

**Checkpoint**: US3 completa e independiente.

---

## Phase 6: User Story 4 — Navegación clara y micro-interacciones (Priority: P2)

**Goal**: progreso de scroll, enlace activo, tilt, libro 3D y entrada escalonada del stack.

**Independent Test**: navegar con mouse y teclado observando indicador, enlace activo y hover (checks 9–10 de quickstart).

- [X] T048 [P] [US4] Crear `src/components/ScrollProgress.astro`: barra fija superior (`position: fixed`, altura 3 px, degradado `--accent-color`→`--accent-color-2`, `aria-hidden="true"`), actualizada con `scroll` + `requestAnimationFrame` usando `transform: scaleX`; oculta bajo reducir movimiento
- [X] T049 [P] [US4] Crear `src/components/TiltHover.astro` (script global como `src/components/SpotlightHover.astro`): en elementos `[data-tilt]` aplicar `rotateX`/`rotateY` de máximo 6° con perspectiva en `pointermove` y restablecer en `pointerleave`; salir si `prefers-reduced-motion: reduce` o `(hover: none)`
- [X] T050 [US4] Montar `<ScrollProgress />` y `<TiltHover />` en `src/pages/index.astro` (junto a `SpotlightHover`)
- [X] T051 [US4] En `src/components/Navbar.astro` (script) marcar como activo el enlace de la sección visible con `IntersectionObserver` (clase `active` y `aria-current="true"`), con estilo en `src/styles/global.css` o en el bloque `<style>` de la barra; incluir `mi-perfil`, `educacion`, `mis-proyectos`, `certificaciones`, `libros`, `contacto`
- [X] T052 [US4] Confirmar que `scroll-behavior: smooth` de `src/styles/global.css` (línea ~103) queda anulado bajo `prefers-reduced-motion: reduce`; agregar la regla si falta
- [X] T053 [P] [US4] Agregar `data-tilt` a las tarjetas de proyecto en `src/sections/Projects.astro` y a `.cert-card` en `src/sections/Certifications.astro`, y verificar que no choque con el spotlight (`--mouse-x/--mouse-y`) ni con el carrusel de certificados
- [X] T054 [P] [US4] En `src/sections/Books.astro` aplicar el efecto de libro 3D con CSS puro a `.book-cover`: contenedor con `perspective`, `transform-style: preserve-3d`, `rotateY(-18deg)` en hover/`:focus-within` y lomo simulado con pseudo-elemento; sin transformación bajo reducir movimiento
- [X] T055 [US4] En `src/sections/About.astro` (Tech Stack) hacer que los `.tech-chip` aparezcan de forma escalonada al entrar en pantalla (`--i` por índice, `transition-delay`) y que en hover se eleven y usen `--tech-color` (ya definido por chip); conservar la cinta con auto-desplazamiento existente sin duplicar movimiento (pausarla en hover como ahora)
- [ ] T056 [US4] Verificar checks 9–10 de [quickstart.md](./quickstart.md) y que el orden de tabulación no cambió; probar en móvil que no hay tilt ni efectos de hover pegados

**Checkpoint**: US4 completa; todo el sitio comparte la misma curva y duración.

---

## Phase 7: User Story 5 — Acompañamiento 3D en proyectos y contacto (Priority: P3)

**Goal**: modelos 3D pequeños por proyecto, cargados solo al acercarse; opcional en Contacto.

**Independent Test**: en Proyectos y Contacto, los modelos cargan solo al acercarse y no afectan el resto (checks 1, 11, 14 de quickstart).

- [X] T057 [US5] Elegir y optimizar hasta 3 modelos en Poly Pizza (etiqueta de precio/carrito, barco de carga, contenedor) según T014–T016, ≤ 1 MB cada uno y ≤ ~50k triángulos; guardarlos en `public/models/` (`cart.glb`, `ship.glb`, `container.glb`) y registrarlos en `src/data/assets.json` y `CREDITS.md`
- [X] T058 [US5] Extraer la lógica de carga diferida de `src/components/HeroScene.astro` a un módulo compartido `src/components/modelLoader.ts` (función `mountModel(container)` con `canLoad3D()`, import dinámico, pausa fuera de pantalla) y hacer que el hero lo use, sin cambiar su comportamiento
- [X] T059 [P] [US5] Agregar el campo opcional `model3d` (`{ assetId, alt: { es, en } }`) a los tres proyectos en `src/data/projects.json`
- [X] T060 [US5] En `src/sections/Projects.astro` renderizar por proyecto un contenedor `data-model="<assetId>"` de tamaño fijo (con póster/`aria-hidden` mientras no cargue) y llamar a `mountModel` solo cuando la tarjeta entra en pantalla o recibe hover
- [X] T061 [P] [US5] (Opcional) En `src/sections/Contact.astro` agregar un modelo pequeño (avión de papel o buzón) con `data-model` y animación al entrar en pantalla, siguiendo el mismo patrón
- [X] T062 [US5] Verificar que con reducir movimiento o sin WebGL los modelos secundarios no se descargan (pestaña Network) y que el peso total de assets nuevos sigue ≤ 3 MB; si Lighthouse baja de 90, recortar primero estos modelos

**Checkpoint**: las cinco historias completas.

> Revertido a pedido (2026-09-29): T057–T062 se implementaron y luego se quitaron. Los modelos 3D de proyectos y el buzón de Contacto ya no existen (se eliminaron `ModelBadge.astro`, los GLB secundarios y el campo `model3d`). El 3D queda solo en el hero. En su lugar se animaron los botones de Contacto (Escribime, redes y enlace de email).

---

## Phase 8: Polish & Cross-Cutting

**Purpose**: auditoría final y cierre

- [ ] T063 [P] Completar `CREDITS.md` y `src/data/assets.json` con todos los assets usados; confirmar que el pie de página los lista con enlaces (FR-018, SC-006)
- [ ] T064 [P] Revisar que todo texto nuevo existe en ES y EN (alt, tooltips, botones, "ver más", pausa, créditos) alternando el idioma en cada sección (FR-017, SC-007)
- [ ] T065 Auditoría de accesibilidad: recorrer el sitio solo con teclado (tarjetas, "ver más", nodos del DAG, botón de pausa, menú), comprobar foco visible y contraste AA en tema claro y oscuro, y correr Lighthouse Accesibilidad sin regresión (SC-003)
- [ ] T066 Prueba de reducción de movimiento y sin WebGL: activar la preferencia del sistema y desactivar WebGL; confirmar que no hay rotación, flotado, tilt, línea de tiempo animada ni flujo del DAG y que el contenido está completo (FR-015, SC-004)
- [ ] T067 Medir Lighthouse móvil sobre `npm run build && npm run preview`: Performance ≥ 90, LCP < 2,5 s, CLS < 0,1; sumar el peso de assets nuevos (≤ 3 MB, cada GLB ≤ 1 MB) y registrar los resultados en `specs/003-visual-polish-3d-motion/quickstart.md` (SC-001, SC-002)
- [ ] T068 Probar en Chrome de escritorio y en un navegador móvil real (Chrome Android o iOS Safari), además de Firefox y Safari si están disponibles
- [ ] T069 Ejecutar la checklist completa de [quickstart.md](./quickstart.md) (15 checks) y marcar los resultados
- [ ] T070 Eliminar código muerto o comentado, imágenes sin uso y estilos duplicados que hayan quedado (constitución, Principio V); confirmar `npm run build` sin advertencias nuevas
- [ ] T071 Revisión final con 5 personas ajenas al proyecto para SC-008 (al menos 4 califican el sitio como "más profesional"); anotar el resultado en `specs/003-visual-polish-3d-motion/checklists/requirements.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias.
- **Foundational (Phase 2)**: depende de Setup; bloquea todas las historias.
- **US1 y US2 (P1)**: dependen de Foundational y pueden ir en paralelo entre sí (archivos distintos salvo `ui-strings.json` y `assets.json`, que se editan en tareas separadas).
- **US3 y US4 (P2)**: dependen de Foundational; no dependen de US1/US2. US4 usa las tarjetas de US2 solo para verificar el tilt.
- **US5 (P3)**: depende de US1 (T058 reutiliza la lógica del hero).
- **Polish (Phase 8)**: depende de las historias que se decidan entregar.

### User Story Dependencies

- **US1**: independiente tras Foundational.
- **US2**: independiente; T027 (licencia) bloquea T028–T029.
- **US3**: independiente; toca solo `Projects.astro` y `ui-strings.json`.
- **US4**: independiente; T053 y T054 tocan archivos distintos.
- **US5**: requiere T018–T022 (US1) para extraer el módulo compartido.

### Dentro de cada historia

- Assets y licencias antes de los componentes que los usan.
- Datos JSON antes de las secciones que los leen.
- Implementación antes de la tarea de verificación.

### Conflictos de archivo a coordinar

`src/sections/Projects.astro` lo tocan T040–T046 (US3), T053 (US4) y T060 (US5); `src/sections/About.astro` lo tocan T031–T033 (US2) y T055 (US4); `src/data/ui-strings.json` recibe claves en T008, T024, T034, T037, T044. Editar estos archivos de forma secuencial, no en paralelo.

---

## Parallel Examples

```text
# Setup
T002, T003, T004 juntos

# Foundational
T007 (Illustration.astro) y T008 (AssetCredits.astro) juntos

# US1
T013 (og-cover.jpg) y T017 (hero-poster.webp) mientras se hace T014–T016

# US4
T048 (ScrollProgress), T049 (TiltHover), T054 (libros 3D) y T053 (tilt en tarjetas) juntos
```

---

## Implementation Strategy

### MVP primero (solo US1)

1. Phase 1 y Phase 2.
2. Phase 3 (US1): metadatos + hero 3D con fallback.
3. **Detenerse y validar**: quickstart checks 1–6 y Lighthouse ≥ 90. Desplegar.

### Entrega incremental

1. Setup + Foundational.
2. US1 → validar → desplegar (MVP).
3. US2 → validar → desplegar.
4. US3 y US4 → validar → desplegar.
5. US5 solo si Lighthouse sigue ≥ 90.
6. Polish.

### Riesgos a vigilar

- **Licencia de Icons8** (T027): si no permite commitear los archivos, cambiar de fuente antes de gastar tiempo en T028–T036.
- **Dominio** (T010–T011): no cambiar `site` hasta confirmar que el dominio sirve el sitio.
- **Rendimiento** (T026, T067): el 3D es lo primero que se recorta si Lighthouse baja de 90 (primero US5, luego el modelo del hero en gama media).

---

## Notes

- `[P]` = archivos distintos y sin dependencias pendientes.
- Confirmar `npm run build` al cerrar cada fase.
- Commit por tarea o por grupo lógico; mensajes en el estilo del repo (`[ADD]`, `[MOD]`, `[FIX]`).
