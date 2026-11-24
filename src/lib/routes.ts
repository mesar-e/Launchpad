import type { SheetRouteId } from '../types/portfolio';

export interface SheetRouteMeta {
  id: SheetRouteId;
  index: '01' | '02' | '03' | '04';
  label: string;
  path: `/${SheetRouteId}`;
  subtitle: string;
}

export const SHEET_ROUTES: readonly SheetRouteMeta[] = [
  {
    id: 'websites',
    index: '01',
    label: 'Websites',
    path: '/websites',
    subtitle: 'Selected editorial & product web builds',
  },
  {
    id: 'apps',
    index: '02',
    label: 'Apps',
    path: '/apps',
    subtitle: 'Desktop, mobile & utility releases',
  },
  {
    id: 'about',
    index: '03',
    label: 'About',
    path: '/about',
    subtitle: 'Practice, stack & direct contact',
  },
  {
    id: 'cv',
    index: '04',
    label: 'CV',
    path: '/cv',
    subtitle: 'Experience, skills & printable resume',
  },
] as const;

export function getSheetRouteByPath(pathname: string): SheetRouteMeta | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return SHEET_ROUTES.find((route) => route.path === normalized) ?? null;
}

export function getSheetRouteById(id: SheetRouteId): SheetRouteMeta {
  const match = SHEET_ROUTES.find((route) => route.id === id);
  if (!match) {
    throw new Error(`Unknown sheet route id: ${id}`);
  }
  return match;
}
