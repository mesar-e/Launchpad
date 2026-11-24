import type { Language, SheetRouteId } from '../types/portfolio';

export interface SheetRouteMeta {
  id: SheetRouteId;
  index: '01' | '02' | '03' | '04';
  label: string;
  path: `/${SheetRouteId}`;
  subtitle: string;
}

interface SheetRouteDefinition {
  id: SheetRouteId;
  index: '01' | '02' | '03' | '04';
  path: `/${SheetRouteId}`;
  labels: Record<Language, string>;
  subtitles: Record<Language, string>;
}

const SHEET_ROUTE_DEFINITIONS: readonly SheetRouteDefinition[] = [
  {
    id: 'websites',
    index: '01',
    path: '/websites',
    labels: { en: 'Websites', tr: 'Web Siteleri' },
    subtitles: {
      en: 'Selected editorial & product web builds',
      tr: 'Seçili web uygulamaları ve arayüzler',
    },
  },
  {
    id: 'apps',
    index: '02',
    path: '/apps',
    labels: { en: 'Apps', tr: 'Uygulamalar' },
    subtitles: {
      en: 'Desktop, mobile & utility releases',
      tr: 'Masaüstü, mobil ve yardımcı araçlar',
    },
  },
  {
    id: 'about',
    index: '03',
    path: '/about',
    labels: { en: 'About', tr: 'Hakkımda' },
    subtitles: {
      en: 'Practice, stack & direct contact',
      tr: 'Yaklaşım, teknolojiler ve iletişim',
    },
  },
  {
    id: 'cv',
    index: '04',
    path: '/cv',
    labels: { en: 'CV', tr: 'Özgeçmiş' },
    subtitles: {
      en: 'English & Turkish PDF resumes',
      tr: 'İngilizce ve Türkçe PDF özgeçmiş',
    },
  },
] as const;

function toMeta(def: SheetRouteDefinition, lang: Language): SheetRouteMeta {
  return {
    id: def.id,
    index: def.index,
    label: def.labels[lang],
    path: def.path,
    subtitle: def.subtitles[lang],
  };
}

export function getSheetRoutes(lang: Language): readonly SheetRouteMeta[] {
  return SHEET_ROUTE_DEFINITIONS.map((def) => toMeta(def, lang));
}

export function getSheetRouteByPath(
  pathname: string,
  lang: Language = 'en',
): SheetRouteMeta | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const match = SHEET_ROUTE_DEFINITIONS.find((route) => route.path === normalized);
  return match ? toMeta(match, lang) : null;
}

export function getSheetRouteById(
  id: SheetRouteId,
  lang: Language = 'en',
): SheetRouteMeta {
  const match = SHEET_ROUTE_DEFINITIONS.find((route) => route.id === id);
  if (!match) {
    throw new Error(`Unknown sheet route id: ${id}`);
  }
  return toMeta(match, lang);
}
