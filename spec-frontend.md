# Especificación: Portfolio interactivo con 3D e ilustraciones

**Proyecto:** portfolio.octopus-data-ai.com
**Autor:** Gonzalo Diaz — Data & AI Engineer
**Versión:** 1.0 · Septiembre 2026

---

## 1. Objetivo

Hacer el portfolio más amigable, dinámico y con movimiento, sin perder claridad ni velocidad de carga. Se incorporan:

- **Modelos 3D** gratuitos de [poly.pizza](https://poly.pizza/) (formato GLB).
- **Ilustraciones** gratuitas de [icons8.com/illustrations](https://icons8.com/illustrations).
- **Animaciones** de entrada, scroll e interacción.

**Principio rector:** el movimiento acompaña el contenido técnico, no compite con él. Los proyectos (scraping, Airflow/n8n, OCR) siguen siendo el foco.

## 2. Estado actual (según revisión del sitio)

Sitio estático, bilingüe (ES/EN), con estas secciones:

| Sección | Contenido actual | Oportunidad |
|---|---|---|
| Hero | Foto `brain_portada.jpg`, nombre, "Data & AI" | Punto focal ideal para un modelo 3D |
| Sobre mí + Áreas de enfoque | Texto largo, 3 áreas (Ciencia de Datos, IA, Ingeniería de Datos) | Mucho texto sin apoyo visual |
| Tech Stack | Íconos de Simple Icons + nombre | Sumar hover/entrada animada |
| Educación | 2 instituciones con logo y listas | Ilustración de apoyo |
| Proyectos | 3 proyectos con carrusel de capturas | Micro-interacciones y 3D temático |
| Diagrama DAG `shipsgo_sync_pipeline` | Diagrama SVG detallado | Animar el flujo de datos |
| Certificaciones | Carrusel de 5 certificados | Ilustración/insignia |
| Libros | 3 portadas | Efecto 3D en CSS (sin assets) |
| Contacto | Email, LinkedIn, GitHub, WhatsApp | Cierre con ilustración y CTA |

**Observaciones para resolver junto con este cambio**

1. **Inconsistencia de título:** el `<title>`/meta dice *"Data Analyst & Analytics Engineer"* pero el hero dice *"Data & AI"*. Unificar a *Data & AI Engineer*.
2. **Metadatos sociales:** `og:url` y `og:image` apuntan a `gonzadzz00.github.io`, no al dominio actual. Actualizar a `portfolio.octopus-data-ai.com`.
3. **Twitter card** en modo `summary`; usar `summary_large_image` con una imagen 1200×630.
4. **Dominio "octopus":** hay una oportunidad de identidad de marca. Ver sección 4.1.

> Nota: la revisión se hizo sobre el contenido y la estructura del HTML. No pude evaluar CSS, paleta ni rendimiento real; los valores visuales de esta spec deben adaptarse a tu paleta actual.

## 3. Alcance

**Incluido**
- 1 escena 3D principal (hero) y hasta 3 modelos 3D secundarios (proyectos/contacto).
- 6–8 ilustraciones 2D.
- Animaciones de scroll, hover y flujo de datos en el diagrama.
- Fallbacks para móvil, sin WebGL y `prefers-reduced-motion`.
- Créditos y atribución según licencias.

**Excluido**
- Reescritura del contenido, cambio de stack del sitio o migración a un framework.
- Assets de pago.

## 4. Requerimientos funcionales

### 4.1 Hero — modelo 3D principal

- Reemplazar (o superponer sobre) `brain_portada.jpg` con un modelo 3D interactivo.
- **Candidatos a buscar en poly.pizza:** `octopus` (alineado al dominio y a la marca), `brain`, `robot`. Elegir uno; el pulpo permite construir identidad de marca ("Octopus Data & AI") y el cerebro/robot refuerza el perfil de IA.
- Comportamiento:
  - Rotación lenta automática.
  - Respuesta suave al movimiento del mouse (parallax leve) o arrastre para rotar.
  - En móvil: rotación automática por giroscopio no requerida; solo auto-rotación.
- Elementos flotantes alrededor: 4–6 íconos del stack (Python, PyTorch, Airflow, n8n, Docker, LangChain) con animación *float* desfasada.
- Fallback: imagen estática (`brain_portada.jpg` o un render del modelo) si no hay WebGL o si el dispositivo es de gama baja.

### 4.2 Sobre mí y Áreas de enfoque

- Una ilustración de icons8 junto al texto de "Sobre mí" (persona con laptop / trabajo con datos), con animación *float* sutil.
- Las 3 áreas de enfoque como **tarjetas** con una ilustración cada una:
  - Ciencia de Datos → estilo gráficos/modelos.
  - Inteligencia Artificial → estilo robot/agente.
  - Ingeniería de Datos → estilo base de datos/pipeline.
- Entrada con *fade + slide-up* escalonada al hacer scroll; hover con elevación y leve inclinación (tilt).
- Reducir el texto visible: mostrar 2–3 líneas por área con opción "ver más" (accordion).

### 4.3 Tech Stack

- Mantener Simple Icons (ya cargan por CDN).
- Agregar entrada escalonada y hover con elevación y color de marca.
- Opcional: cinta horizontal en loop (marquee) en móvil para ahorrar espacio.

### 4.4 Educación y Certificaciones

- Una ilustración por sección (graduación / logro), compartiendo el mismo estilo visual.
- Línea de tiempo vertical con animación de dibujo al hacer scroll para Educación.
- Certificaciones: mantener el carrusel; sumar efecto tilt al hover en cada tarjeta.

### 4.5 Proyectos

- Tarjetas con tilt 3D en CSS al hover y transición suave al abrir el carrusel.
- **Modelo 3D pequeño por proyecto** (opcional, cargado solo al hover o al entrar en pantalla):
  - Proyecto 1 (Price Intelligence): carrito de compras / etiqueta de precio.
  - Proyecto 2 (Logística ShipsGo): barco de carga.
  - Proyecto 3 (Container OCR): contenedor de carga.
- Los modelos deben ser livianos y con fondo transparente.

### 4.6 Diagrama del DAG `shipsgo_sync_pipeline`

Es el elemento más valioso para un perfil de ingeniería de datos y el que más se beneficia de animación:

- Animar las flechas/conectores con `stroke-dashoffset` para simular el flujo de datos: descubrimiento → selección → sincronización → estados → CDC → n8n.
- Resaltar nodos al hover con tooltip corto (qué hace cada tarea).
- Activar la animación solo cuando el diagrama entra en pantalla.
- Botón "Pausar animación".

### 4.7 Libros

- Efecto de libro en 3D con CSS (`transform: rotateY`) al hover. No requiere assets externos.

### 4.8 Contacto

- Ilustración de cierre (correo / conversación) y CTA principal "Escribime".
- Opcional: modelo 3D pequeño (avión de papel o buzón) con animación al entrar en pantalla.

### 4.9 Navegación y globales

- Indicador de progreso de scroll en la parte superior.
- Enlace activo en la barra de navegación según la sección visible.
- Scroll suave entre anclas.
- Transiciones de entrada consistentes (misma curva y duración en todo el sitio).

## 5. Requerimientos no funcionales

| Área | Criterio de aceptación |
|---|---|
| Rendimiento | Lighthouse móvil ≥ 85; LCP < 2.5 s; CLS < 0.1 |
| Peso agregado | ≤ 3 MB en total por assets nuevos; cada modelo GLB ≤ 1 MB tras optimizar |
| Carga | Modelos 3D con *lazy loading* (`IntersectionObserver`); el hero muestra el póster de inmediato |
| Accesibilidad | `prefers-reduced-motion` desactiva animaciones y auto-rotación; `alt` en ES/EN; contraste AA; navegación por teclado intacta |
| Compatibilidad | Últimas 2 versiones de Chrome, Firefox, Safari y Edge; iOS Safari y Chrome Android |
| Fallbacks | Sin WebGL → imagen estática; dispositivos de gama baja → 3D desactivado |
| Batería | Pausar render cuando la pestaña o el modelo no son visibles |
| i18n | Todo texto nuevo disponible en ES y EN |

## 6. Propuesta técnica

Como el sitio es estático, se evita agregar un build system.

- **3D:** [`<model-viewer>`](https://modelviewer.dev/) (web component de Google). Carga GLB directo, incluye auto-rotate, póster, lazy load y control de cámara. Es la opción recomendada por su bajo costo de integración.
  - Alternativa si se quiere una escena más personalizada (seguimiento del mouse, partículas): **three.js** con `GLTFLoader`.
- **Animaciones:** CSS + `IntersectionObserver` para la mayoría. **GSAP + ScrollTrigger** solo si se necesita una secuencia compleja (línea de tiempo, diagrama).
- **Ilustraciones:** SVG cuando esté disponible; de lo contrario PNG optimizado a WebP.
- **Optimización de modelos:** convertir/comprimir con `gltf-transform` (Draco o meshopt) y texturas a ≤ 1024 px.

**Estructura sugerida**

```
/assets
  /3d          hero-octopus.glb, ship.glb, container.glb ...
  /illustrations   about.svg, data-science.svg, ai.svg, data-eng.svg ...
  /posters     hero-poster.webp ...
/js
  animations.js    (IntersectionObserver, scroll progress, tilt)
  viewer-loader.js (lazy load de model-viewer)
/css
  motion.css       (variables de duración/easing, reduced-motion)
CREDITS.md
```

## 7. Fuentes de assets y licencias

> Verificar la licencia de **cada** asset al descargarlo. Las condiciones pueden cambiar.

### poly.pizza
- Los modelos se publican con licencias **CC0** (uso libre) o **CC-BY** (requiere atribución al autor). Se descargan en GLB.
- Preferir CC0 para simplificar. Para CC-BY, registrar: nombre del modelo, autor, URL y licencia en `CREDITS.md` y en el footer.

### icons8 (ilustraciones)
- El uso gratuito es válido para fines personales y comerciales **a condición de incluir un enlace a Icons8** en el trabajo publicado.
- Los formatos gratuitos suelen tener limitaciones (baja resolución o estilos específicos); el SVG y los tamaños grandes normalmente requieren plan de pago. **Antes de elegir un estilo, confirmar qué formato entrega en gratis.**
- Las animaciones (Lottie/JSON) no suelen estar en el plan gratuito, por lo que el movimiento se resuelve con CSS/GSAP sobre imágenes estáticas.
- Su licencia no permite redistribuir los archivos como recursos independientes. Si el repositorio del portfolio es público en GitHub, evaluar este punto (mantener los assets fuera del repo o revisar los términos vigentes).

### Atribución
Agregar en el footer: *"Modelos 3D: [autores] vía Poly Pizza · Ilustraciones: Icons8"* con los enlaces correspondientes, y un `CREDITS.md`.

## 8. Criterios de selección de assets

- **Coherencia visual:** elegir **un solo estilo** de icons8 para todas las ilustraciones y modelos 3D de tipo *low-poly* similar.
- **Paleta:** recolorear ilustraciones para que coincidan con la paleta del sitio.
- **Peso:** descartar modelos con más de ~50k triángulos.
- **Tono:** amigable y profesional; evitar estilos infantiles o de "clipart".

## 9. Plan de implementación

| Fase | Entregable | Prioridad |
|---|---|---|
| 1 | Correcciones globales (título, metadatos, OG) + scroll reveal + progreso de scroll | Alta |
| 2 | Hero 3D con fallback + íconos flotantes | Alta |
| 3 | Ilustraciones en Sobre mí, Áreas de enfoque, Educación, Contacto | Alta |
| 4 | Animación del diagrama DAG | Alta |
| 5 | Tilt en tarjetas de proyectos, certificados y libros | Media |
| 6 | Modelos 3D secundarios por proyecto | Media |
| 7 | Auditoría de rendimiento, accesibilidad y créditos | Alta |

## 10. Criterios de aceptación globales

- [ ] El hero carga con el póster y el modelo 3D aparece sin bloquear el contenido.
- [ ] Con `prefers-reduced-motion` no hay auto-rotación ni animaciones de entrada.
- [ ] Sin WebGL el sitio se ve completo con imágenes estáticas.
- [ ] Lighthouse móvil ≥ 85 y sin regresión de accesibilidad.
- [ ] El diagrama del DAG se anima al entrar en pantalla y se puede pausar.
- [ ] Todos los assets tienen licencia verificada y figuran en `CREDITS.md` y el footer.
- [ ] Textos nuevos disponibles en ES y EN.

## 11. Decisiones pendientes

1. ¿Mascota/identidad: **pulpo**, cerebro o robot para el hero?
2. ¿Paleta actual a mantener o aprovechar el cambio para ajustarla?
3. ¿El repositorio del portfolio es público? (afecta el manejo de assets de icons8)
4. ¿Se prefiere `<model-viewer>` (más simple) o three.js (más control)?