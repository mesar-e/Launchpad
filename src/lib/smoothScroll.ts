export interface SmoothScrollOptions {
  duration?: number;
  instant?: boolean;
}

export function smoothScrollTo(
  targetY: number,
  options: SmoothScrollOptions = {},
): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const clampedTarget = Math.max(0, Math.min(targetY, maxScroll));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (options.instant || prefersReducedMotion) {
    window.scrollTo({ top: clampedTarget, behavior: 'auto' });
    return () => undefined;
  }

  const startY = window.scrollY;
  const distance = clampedTarget - startY;
  if (Math.abs(distance) < 1) {
    window.scrollTo({ top: clampedTarget, behavior: 'auto' });
    return () => undefined;
  }

  const duration = options.duration ?? 600;
  const startTime = performance.now();
  let frameId = 0;
  let active = true;

  const cancel = (): void => {
    if (!active) return;
    active = false;
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('touchmove', cancel);
    window.removeEventListener('pointerdown', cancel);
    window.removeEventListener('keydown', cancel);
  };

  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('touchmove', cancel, { passive: true });
  window.addEventListener('pointerdown', cancel, { passive: true });
  window.addEventListener('keydown', cancel);

  const step = (now: number): void => {
    if (!active) return;
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - progress, 3);

    window.scrollTo({ top: startY + distance * eased, behavior: 'auto' });

    if (progress < 1) {
      frameId = requestAnimationFrame(step);
    } else {
      cancel();
    }
  };

  frameId = requestAnimationFrame(step);
  return cancel;
}
