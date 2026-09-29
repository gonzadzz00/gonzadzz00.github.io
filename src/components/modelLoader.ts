/**
 * Lazy 3D model mounting shared by the hero and the project cards.
 * The <model-viewer> bundle is imported only when the device is capable,
 * the user has not asked for reduced motion, the container is on screen
 * and the visitor has interacted with the page.
 */

interface NavigatorHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

export interface MountOptions {
  /** Base colour applied to the first material, as [r, g, b] in 0–1. */
  tint?: [number, number, number];
  /** Tilt the camera vertically following the pointer (desktop only). */
  parallax?: boolean;
  /** Let the visitor drag to rotate. Decorative badges set this to false. Defaults to true. */
  interactive?: boolean;
}

export function canLoad3D(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function whenVisible(el: Element): Promise<void> {
  return new Promise(resolve => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(el);
  });
}

/**
 * The <model-viewer> bundle is heavy to evaluate, so it waits for the first sign of a
 * real visitor (pointer, touch, key or scroll). Passive loads keep the static poster.
 */
function whenInteracted(): Promise<void> {
  return new Promise(resolve => {
    const events = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel', 'scroll'];
    const done = () => {
      events.forEach(name => window.removeEventListener(name, done));
      resolve();
    };
    events.forEach(name => window.addEventListener(name, done, { passive: true, once: true }));
  });
}

function whenIdle(): Promise<void> {
  return new Promise(resolve => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => resolve(), { timeout: 2500 });
    } else {
      setTimeout(resolve, 1200);
    }
  });
}

function currentLang(): 'es' | 'en' {
  return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'es';
}

export async function mountModel(container: HTMLElement, options: MountOptions = {}): Promise<HTMLElement | null> {
  if (container.dataset.mounted === 'true') return null;
  if (!canLoad3D()) return null;

  const src = container.dataset.src;
  if (!src) return null;

  container.dataset.mounted = 'true';
  await whenVisible(container);
  await whenInteracted();
  await whenIdle();

  try {
    await import('@google/model-viewer');
  } catch {
    container.dataset.mounted = 'false';
    return null;
  }

  const viewer = document.createElement('model-viewer') as any;
  viewer.setAttribute('src', src);
  viewer.setAttribute('auto-rotate', '');
  viewer.setAttribute('rotation-per-second', '18deg');
  if (options.interactive !== false) {
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('disable-zoom', '');
    viewer.setAttribute('disable-pan', '');
  }
  viewer.setAttribute('interaction-prompt', 'none');
  viewer.setAttribute('touch-action', 'pan-y');
  viewer.setAttribute('shadow-intensity', '0');
  viewer.setAttribute('exposure', '1.15');
  viewer.setAttribute('environment-image', 'neutral');
  viewer.setAttribute('camera-orbit', '0deg 75deg auto');
  viewer.setAttribute('reveal', 'auto');
  viewer.className = 'model-viewer-el';

  const applyAlt = () => {
    const alt = currentLang() === 'en' ? container.dataset.altEn : container.dataset.altEs;
    viewer.setAttribute('alt', alt ?? '');
  };
  applyAlt();
  document.addEventListener('langchange', applyAlt);

  viewer.addEventListener('load', () => {
    if (options.tint) {
      try {
        const material = viewer.model?.materials?.[0];
        material?.pbrMetallicRoughness.setBaseColorFactor([...options.tint, 1]);
        material?.pbrMetallicRoughness.setMetallicFactor(0.3);
        material?.pbrMetallicRoughness.setRoughnessFactor(0.38);
      } catch {
        /* keep the model's own material */
      }
    }
    container.classList.add('is-ready');
  }, { once: true });

  viewer.addEventListener('error', () => {
    viewer.remove();
    container.classList.remove('is-ready');
    container.dataset.mounted = 'false';
  }, { once: true });

  container.appendChild(viewer);

  // Stop spinning while off screen (the renderer also pauses on hidden tabs).
  const visibility = new IntersectionObserver(entries => {
    const onScreen = entries.some(e => e.isIntersecting);
    if (onScreen) viewer.setAttribute('auto-rotate', '');
    else viewer.removeAttribute('auto-rotate');
  });
  visibility.observe(container);

  if (options.parallax && window.matchMedia('(hover: hover)').matches) {
    let frame = 0;
    window.addEventListener('pointermove', (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        const orbit = viewer.getCameraOrbit?.();
        if (!orbit) return;
        viewer.cameraOrbit = `${orbit.theta}rad ${75 + ny * 10}deg ${orbit.radius}m`;
      });
    }, { passive: true });
  }

  return viewer;
}
