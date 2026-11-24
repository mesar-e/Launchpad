import type { Transition, Variants } from 'motion/react';

export const SHEET_SPRING: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 34,
  mass: 0.9,
};

export const CURSOR_SPRING = {
  stiffness: 120,
  damping: 24,
} as const;

export const MICRO_EASE = [0.22, 1, 0.36, 1] as const;

export const SHEET_VARIANTS: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: SHEET_SPRING,
  },
  exit: {
    y: '100%',
    transition: {
      duration: 0.24,
      ease: MICRO_EASE,
    },
  },
};

export const BACKDROP_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.22, ease: MICRO_EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: MICRO_EASE },
  },
};
