import type { SheetRouteMeta } from '../../lib/routes';
import { AboutSection } from './AboutSection';
import { AppsSection } from './AppsSection';
import { CvSection } from './CvSection';
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
      return <AboutSection />;
    case 'cv':
      return <CvSection />;
  }
}
