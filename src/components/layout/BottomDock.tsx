import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getSheetRoutes } from '../../lib/routes';
import { getUIStrings } from '../../services/portfolioService';
import type { SheetRouteId } from '../../types/portfolio';

interface BottomDockProps {
  activeSheet: SheetRouteId | null;
  onSelectSheet: (id: SheetRouteId) => void;
}

export function BottomDock({ activeSheet, onSelectSheet }: BottomDockProps) {
  const { lang } = useLanguage();
  const routes = getSheetRoutes(lang);
  const ui = getUIStrings(lang);

  return (
    <section
      aria-label={ui.sectionsAriaLabel}
      className="w-full border-t border-[var(--border-dark-hairline)] bg-[rgba(15,20,18,0.65)] backdrop-blur-sm"
    >
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 md:grid-cols-4">
        {routes.map((route, index) => {
          const isActive = activeSheet === route.id;
          const dividerClasses = [
            index < 2 ? 'border-b md:border-b-0' : '',
            index % 2 === 0 ? 'border-r' : '',
            index < 3 ? 'md:border-r' : 'md:border-r-0',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li
              key={route.id}
              className={`border-[var(--border-dark-hairline)] ${dividerClasses}`}
            >
              <button
                type="button"
                onClick={() => onSelectSheet(route.id)}
                aria-current={isActive ? 'page' : undefined}
                className="group flex h-full w-full cursor-pointer flex-col justify-between gap-6 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03] sm:px-7 sm:py-6 md:gap-8 md:py-7"
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--accent-emerald)]'
                        : 'text-[var(--ink-dark-muted)] group-hover:text-[var(--accent-emerald)]'
                    }`}
                  >
                    {route.index}
                  </span>
                  <ArrowDown
                    className="h-4 w-4 stroke-[1.5] text-[var(--ink-dark-muted)] transition-transform duration-200 group-hover:translate-y-1 group-hover:text-[var(--accent-emerald)]"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <span className="block text-base font-medium tracking-[-0.02em] text-[var(--ink-dark-primary)] sm:text-lg md:text-xl">
                    {route.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-[var(--ink-dark-muted)] transition-colors duration-200 group-hover:text-[var(--ink-dark-primary)] sm:text-sm">
                    {route.subtitle}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
