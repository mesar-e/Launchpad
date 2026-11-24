import { useId, type ReactNode, type RefObject } from 'react';
import { ArrowUp } from 'lucide-react';
import type { SheetRouteMeta } from '../../lib/routes';
import { SectionBackdrop } from '../backgrounds/SectionBackdrop';

interface DownwardSectionStageProps {
  route: SheetRouteMeta | null;
  sectionRef: RefObject<HTMLElement | null>;
  onReturnToIndex: () => void;
  children: ReactNode;
}

export function DownwardSectionStage({
  route,
  sectionRef,
  onReturnToIndex,
  children,
}: DownwardSectionStageProps) {
  const headingId = useId();

  if (!route) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id={`section-${route.id}`}
      aria-labelledby={headingId}
      className="relative z-20 flex min-h-dvh w-full flex-col justify-between border-t border-[var(--border-dark-hairline)] bg-[var(--surface-dark-canvas)] text-[var(--ink-dark-primary)]"
    >
      <SectionBackdrop key={route.id} routeId={route.id} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-24 pb-16 sm:px-10 sm:pt-28">
        <div className="rounded-2xl border border-[var(--border-dark-hairline)] bg-[rgba(15,20,18,0.84)] p-6 backdrop-blur-md sm:p-10">
          <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--border-dark-hairline)] pb-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs tracking-wider text-[var(--accent-emerald)]">
                {route.index}
              </span>
              <h2
                id={headingId}
                className="text-2xl font-medium tracking-[-0.025em] text-[var(--ink-dark-primary)] sm:text-3xl"
              >
                {route.label}
              </h2>
            </div>
          </header>

          <div className="pt-8">{children}</div>
        </div>
      </div>

      <div className="pointer-events-none sticky bottom-6 z-30 mx-auto flex w-full max-w-5xl justify-end px-6 pb-6 sm:px-10">
        <button
          type="button"
          onClick={onReturnToIndex}
          aria-label="Return to Act 2 index"
          className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-dark-hairline)] bg-[rgba(15,20,18,0.88)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--ink-dark-primary)] shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-[var(--accent-emerald)] hover:text-[var(--accent-emerald)]"
        >
          <ArrowUp className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
          <span>Index</span>
        </button>
      </div>
    </section>
  );
}
