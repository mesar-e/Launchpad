import type { SheetRouteMeta } from '../../lib/routes';
import { AppsSection } from './AppsSection';
import { WebsitesSection } from './WebsitesSection';

interface SectionRouterProps {
  route: SheetRouteMeta;
}

export function SectionRouter({ route }: SectionRouterProps) {
  switch (route.id) {
    case 'websites':
      return <WebsitesSection />;
    case 'apps':
      return <AppsSection />;
    case 'about':
    case 'cv':
      return (
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ink-dark-muted)]">
            Section {route.index} · {route.path}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--ink-dark-primary)]">
            Placeholder content for <strong>{route.label}</strong>. {route.subtitle}. Structured
            portfolio modules will populate here in Milestone 3.
          </p>
        </div>
      );
  }
}
