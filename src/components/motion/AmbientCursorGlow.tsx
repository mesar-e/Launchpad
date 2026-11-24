import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'motion/react';
import { CURSOR_SPRING } from '../../lib/motion';

interface AmbientCursorGlowProps {
  opacity: MotionValue<number>;
}

export function AmbientCursorGlow({ opacity }: AmbientCursorGlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);

  const springX = useSpring(pointerX, CURSOR_SPRING);
  const springY = useSpring(pointerY, CURSOR_SPRING);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const updatePointerType = (): void => {
      setIsCoarsePointer(mediaQuery.matches);
    };
    updatePointerType();
    mediaQuery.addEventListener('change', updatePointerType);
    return () => mediaQuery.removeEventListener('change', updatePointerType);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isCoarsePointer) return;

    const handlePointerMove = (event: PointerEvent): void => {
      if (event.pointerType === 'touch') return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, isCoarsePointer, pointerX, pointerY]);

  if (prefersReducedMotion || isCoarsePointer) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="pointer-events-none absolute top-0 left-0 will-change-transform"
        style={{ x: springX, y: springY }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(16, 185, 129, 0.11) 0%, rgba(16, 185, 129, 0.04) 38%, rgba(16, 185, 129, 0) 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
