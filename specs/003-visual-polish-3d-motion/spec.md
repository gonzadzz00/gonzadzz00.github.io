# Feature Specification: Refinamiento estético con 3D, ilustraciones y movimiento

**Feature Branch**: `003-visual-polish-3d-motion`  
**Created**: 2026-09-29  
**Status**: Draft  
**Input**: User description: "quiero hacer un cambio en cuanto elementos esteticos para hacer el sitio web mas estetico y profesional @spec-frontend.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Primera impresión sólida y coherente (Priority: P1)

Un reclutador o cliente potencial llega al portfolio. En los primeros segundos ve un hero con un elemento visual protagonista (modelo 3D interactivo con íconos del stack flotando), un título consistente ("Data & AI Engineer") y, al compartir el enlace, una vista previa correcta con imagen grande y dominio actual.

**Why this priority**: El hero y los metadatos definen la percepción de profesionalismo; las inconsistencias actuales (título, dominio, tarjeta social) restan credibilidad de inmediato.

**Independent Test**: Abrir el sitio en escritorio y móvil, verificar el hero, el título de la pestaña y pegar el enlace en una red social/mensajería para ver la vista previa.

**Acceptance Scenarios**:

1. **Given** un visitante en escritorio, **When** carga el sitio, **Then** ve de inmediato una imagen de póster en el hero y el modelo 3D aparece sin bloquear el resto del contenido.
2. **Given** el hero cargado, **When** el visitante mueve el mouse o arrastra el modelo, **Then** el modelo responde con una rotación suave; sin interacción rota lentamente por sí solo.
3. **Given** un navegador sin soporte de gráficos 3D o un dispositivo de gama baja, **When** carga el sitio, **Then** el hero muestra una imagen estática y el sitio se ve completo.
4. **Given** el enlace del sitio compartido en una red social, **When** se genera la vista previa, **Then** muestra el dominio actual, el título "Data & AI Engineer" y una imagen grande 1200×630.

---

### User Story 2 - Contenido técnico fácil de recorrer (Priority: P1)

El visitante recorre "Sobre mí", áreas de enfoque, educación y contacto. Cada bloque tiene apoyo visual (ilustraciones de estilo unificado), las áreas de enfoque se presentan como tarjetas con texto breve y opción de ampliar, y los elementos aparecen con transiciones suaves al hacer scroll.

**Why this priority**: Hoy hay mucho texto sin apoyo visual; reducirlo y ordenarlo mejora la lectura sin cambiar el contenido.

**Independent Test**: Recorrer la página completa y verificar ilustraciones, tarjetas, "ver más" y transiciones de entrada en cada sección.

**Acceptance Scenarios**:

1. **Given** la sección "Sobre mí", **When** entra en pantalla, **Then** se muestra una ilustración junto al texto con movimiento sutil.
2. **Given** las tres áreas de enfoque, **When** el visitante las ve, **Then** cada una es una tarjeta con su ilustración y 2–3 líneas de texto, con opción "ver más" para el resto.
3. **Given** una tarjeta, **When** el visitante pasa el cursor, **Then** se eleva e inclina levemente.
4. **Given** las secciones Educación y Contacto, **When** se visualizan, **Then** cada una incluye una ilustración del mismo estilo, y Contacto cierra con un llamado a la acción principal para escribir.

---

### User Story 3 - Diagrama del pipeline que muestra el flujo de datos (Priority: P2)

El visitante llega al diagrama del pipeline de sincronización y ve el flujo de datos animado entre pasos; puede ver una descripción breve de cada tarea y pausar la animación.

**Why this priority**: Es la pieza de mayor valor para un perfil de ingeniería de datos; animarla demuestra el trabajo de forma inmediata.

**Independent Test**: Hacer scroll hasta el diagrama, observar la animación, pasar el cursor sobre nodos y usar el botón de pausa.

**Acceptance Scenarios**:

1. **Given** el diagrama fuera de pantalla, **When** entra en pantalla, **Then** comienza la animación del flujo en el orden de las etapas.
2. **Given** la animación en curso, **When** el visitante pulsa "Pausar animación", **Then** el movimiento se detiene y el botón permite reanudarlo.
3. **Given** un nodo del diagrama, **When** el visitante pasa el cursor o lo enfoca con teclado, **Then** se resalta y muestra una descripción corta de la tarea.

---

### User Story 4 - Navegación clara y micro-interacciones consistentes (Priority: P2)

El visitante ve un indicador de progreso de lectura, el enlace de la sección actual resaltado en la barra de navegación, desplazamiento suave entre secciones, y efectos de hover (elevación, inclinación, libro en 3D) en tecnologías, proyectos, certificados y libros, todos con la misma curva y duración.

**Why this priority**: Aporta cohesión y sensación de pulido, pero el sitio ya es utilizable sin esto.

**Independent Test**: Navegar por el sitio con mouse y teclado observando indicador, enlace activo y efectos de hover.

**Acceptance Scenarios**:

1. **Given** el visitante haciendo scroll, **When** avanza por la página, **Then** una barra superior refleja su progreso y el enlace de la sección visible se marca como activo.
2. **Given** una tarjeta de proyecto, certificado o libro, **When** el cursor pasa por encima, **Then** aparece el efecto correspondiente (inclinación o giro de libro) de forma suave.
3. **Given** el bloque de Tech Stack, **When** entra en pantalla, **Then** los íconos aparecen de forma escalonada y en hover se elevan con su color de marca.

---

### User Story 5 - Acompañamiento 3D temático en proyectos y contacto (Priority: P3)

Cada proyecto puede mostrar un pequeño modelo 3D temático (precios, barco de carga, contenedor) y el contacto un objeto de cierre, cargados solo al acercarse o al hover.

**Why this priority**: Refuerza la temática pero es opcional; no debe afectar la carga inicial.

**Independent Test**: Hacer scroll a Proyectos y Contacto y verificar que los modelos cargan solo al acercarse y no afectan el resto.

**Acceptance Scenarios**:

1. **Given** una tarjeta de proyecto fuera de pantalla, **When** aún no se acerca, **Then** su modelo 3D no se descarga.
2. **Given** la tarjeta en pantalla, **When** el visitante interactúa, **Then** el modelo se muestra con fondo transparente y sin retraso perceptible.

---

### Edge Cases

- Visitante con preferencia de "reducir movimiento" activada: sin auto-rotación, sin animaciones de entrada ni flujo animado; el contenido sigue completo.
- Conexión lenta: el póster y el contenido textual aparecen primero; los modelos 3D cargan después sin desplazar el diseño.
- Pestaña en segundo plano o modelo fuera de pantalla: el renderizado 3D se pausa.
- Navegación solo con teclado: todos los elementos interactivos (tarjetas, "ver más", nodos del diagrama, botón de pausa) son alcanzables y muestran foco visible.
- Cambio de idioma ES/EN: todo texto nuevo (incluidos alt, tooltips y botones) cambia con el idioma.
- Un asset con licencia que exige atribución: debe figurar en los créditos o el asset no se usa.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El hero MUST mostrar un modelo 3D interactivo con rotación lenta automática y respuesta al mouse/arrastre; en móvil solo auto-rotación.
- **FR-002**: El hero MUST mostrar 4–6 íconos del stack flotando alrededor del modelo con animaciones desfasadas.
- **FR-003**: El hero MUST mostrar una imagen de póster inmediatamente y una imagen estática como alternativa cuando no haya soporte 3D o el dispositivo sea de gama baja.
- **FR-004**: El título del sitio, la descripción y el hero MUST usar el mismo posicionamiento "Data & AI Engineer".
- **FR-005**: Los metadatos de vista previa social MUST apuntar al dominio actual (portfolio.octopus-data-ai.com) y usar tarjeta de imagen grande 1200×630.
- **FR-006**: "Sobre mí", Educación y Contacto MUST incluir una ilustración de estilo unificado (6–8 ilustraciones en total en el sitio).
- **FR-007**: Las tres áreas de enfoque MUST presentarse como tarjetas con ilustración, 2–3 líneas visibles y opción "ver más".
- **FR-008**: Las secciones MUST entrar con transición de aparición y desplazamiento escalonada al hacer scroll, con la misma curva y duración en todo el sitio.
- **FR-009**: Tarjetas de áreas, proyectos y certificados MUST elevarse/inclinarse en hover; las portadas de libros MUST girar como un libro 3D en hover.
- **FR-010**: Tech Stack MUST aparecer de forma escalonada y resaltar con el color de marca en hover.
- **FR-011**: Educación MUST mostrar una línea de tiempo vertical que se dibuja al hacer scroll.
- **FR-012**: El diagrama del pipeline MUST animar el flujo de datos entre etapas al entrar en pantalla, resaltar nodos con descripción corta en hover/foco, y ofrecer un botón de pausa/reanudar.
- **FR-013**: Cada proyecto MAY mostrar un modelo 3D pequeño de fondo transparente, descargado solo al acercarse o al hover; Contacto MAY incluir un objeto 3D de cierre.
- **FR-014**: El sitio MUST mostrar un indicador de progreso de scroll, resaltar la sección activa en la navegación y desplazarse suavemente entre secciones.
- **FR-015**: Con la preferencia de reducir movimiento, el sitio MUST desactivar auto-rotación y animaciones no esenciales sin perder contenido.
- **FR-016**: El renderizado 3D MUST pausarse cuando la pestaña o el modelo no son visibles.
- **FR-017**: Todo texto nuevo (incluidos alt, tooltips y botones) MUST estar disponible en español e inglés.
- **FR-018**: Todo asset de terceros MUST tener licencia verificada y figurar en un archivo de créditos y en el pie de página con los enlaces requeridos (Poly Pizza / Icons8).
- **FR-019**: Los modelos 3D y las ilustraciones MUST seguir un estilo visual único y recolorearse según la paleta actual del sitio, que se mantiene.
- **FR-020**: El modelo 3D del hero MUST representar un cerebro, manteniendo la continuidad con la portada actual y reforzando el perfil de IA.
- **FR-021**: El contenido existente, las secciones y la estructura del sitio MUST conservarse; no se altera el texto ni se agregan secciones nuevas.

### Key Entities

- **Asset de terceros**: modelo 3D o ilustración; atributos: nombre, autor, origen, licencia, obligación de atribución, ubicación de uso.
- **Sección del sitio**: bloque de contenido (hero, sobre mí, áreas, stack, educación, proyectos, diagrama, certificaciones, libros, contacto) con su apoyo visual y comportamiento de entrada.

## Assumptions

- Se mantiene la paleta de colores actual; solo se recolorean los assets nuevos para que coincidan.
- El repositorio es público (sitio en GitHub Pages); por eso se revisan los términos de Icons8 sobre redistribución de archivos y, si no lo permiten, los assets se incorporan de forma que cumplan la licencia.
- Solo se usan assets gratuitos; las ilustraciones se animan sobre imágenes estáticas (sin animaciones prefabricadas de pago).
- La elección de la herramienta para renderizar 3D se define en la fase de planificación.
- Fuera de alcance: reescritura de contenido, cambio de tecnología del sitio y assets de pago.
- Solo se usa la escena 3D principal del hero; los modelos 3D secundarios (proyectos y contacto) se descartaron tras probarlos, y en Contacto se animan los botones en su lugar.
- El diagrama del pipeline se muestra en una ventana modal; "entrar en pantalla" equivale a abrir esa ventana, y la animación se detiene al cerrarla.
- El modelo 3D del cerebro (con los íconos del stack flotando) se ubica en el espacio vacío a la derecha del texto de "Sobre mí", no en el hero, que conserva la portada original. La imagen de portada sirve como póster y como alternativa estática dentro de ese recuadro.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En móvil, el puntaje de rendimiento de Lighthouse es ≥ 90 (umbral de la constitución del proyecto), el contenido principal es visible en < 2,5 s y el desplazamiento inesperado del diseño es < 0,1.
- **SC-002**: Los assets nuevos pesan ≤ 3 MB en total y ningún modelo 3D supera 1 MB.
- **SC-003**: El 100 % de los elementos nuevos se puede usar con teclado y no hay regresión en el puntaje de accesibilidad; el contraste cumple nivel AA.
- **SC-004**: Con reducción de movimiento activada o sin soporte 3D, el 100 % del contenido sigue visible y utilizable.
- **SC-005**: La vista previa al compartir el enlace muestra dominio, título e imagen correctos en al menos 3 plataformas.
- **SC-006**: El 100 % de los assets de terceros figuran en créditos con licencia verificada.
- **SC-007**: El 100 % del texto nuevo está disponible en ES y EN.
- **SC-008**: En una revisión con 5 personas ajenas al proyecto, al menos 4 califican el sitio como "más profesional" que la versión anterior.
