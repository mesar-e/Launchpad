import type { RefObject } from 'react';
import { motion, type MotionValue } from 'motion/react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface TopNavbarProps {
  name: string;
  dockNameRef: RefObject<HTMLSpanElement | null>;
  dockOpacity: MotionValue<number>;
  borderOpacity: MotionValue<number>;
  isAct2: boolean;
  activeRouteLabel?: string;
  onNameClick: () => void;
}

export function TopNavbar({
  name,
  dockNameRef,
  dockOpacity,
  borderOpacity,
  isAct2,
  activeRouteLabel,
  onNameClick,
}: TopNavbarProps) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 h-16 transition-colors duration-300 ${
        isAct2 ? 'text-[var(--ink-dark-primary)]' : 'text-[var(--ink-primary)]'
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute inset-0 border-b border-[var(--border-dark-hairline)] bg-[rgba(15,20,18,0.78)] backdrop-blur-md"
      />

      <nav
        aria-label="Primary"
        className="relative mx-auto grid h-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10"
      >
        <div className="flex items-center justify-self-start">
          {activeRouteLabel ? (
            <motion.span
              style={{ opacity: dockOpacity }}
              className="hidden items-center gap-2 font-mono text-xs text-[var(--ink-dark-muted)] sm:inline-flex"
            >
              <span aria-hidden="true">/</span>
              <span>{activeRouteLabel}</span>
            </motion.span>
          ) : null}
        </div>

        <motion.button
          type="button"
          onClick={onNameClick}
          style={{ opacity: dockOpacity }}
          tabIndex={isAct2 ? 0 : -1}
          aria-hidden={!isAct2}
          aria-label={`${name} — return to top`}
          className={`group inline-flex items-center justify-center justify-self-center py-1 text-center focus-visible:rounded-sm ${
            isAct2 ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
          }`}
        >
          <span
            ref={dockNameRef}
            className="inline-block whitespace-nowrap text-sm font-medium tracking-[-0.015em] text-[var(--ink-dark-primary)] transition-colors duration-200 group-hover:text-[var(--accent-emerald)]"
          >
            {name}
          </span>
        </motion.button>

        <div className="flex items-center justify-self-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
