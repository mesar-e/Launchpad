import { APPS_BY_LANG } from '../data/apps';
import { CV_DOCUMENTS_BY_LANG } from '../data/cv';
import { PROFILE_BY_LANG } from '../data/profile';
import { UI_STRINGS } from '../data/ui';
import { WEBSITES_BY_LANG } from '../data/websites';
import type {
  AppFilter,
  AppPlatform,
  AppProject,
  CVDocument,
  Language,
  ProfileInfo,
  UIStrings,
  WebsiteProject,
} from '../types/portfolio';

export function getUIStrings(lang: Language): UIStrings {
  return UI_STRINGS[lang];
}

export function getWebsites(lang: Language): readonly WebsiteProject[] {
  return WEBSITES_BY_LANG[lang];
}

export function getApps(lang: Language, filter?: AppFilter): readonly AppProject[] {
  const apps = APPS_BY_LANG[lang];
  if (!filter) {
    return apps;
  }

  const { platform, status } = filter;

  return apps.filter((app) => {
    const matchesPlatform = !platform || platform === 'All' || app.platform === platform;
    const matchesStatus = !status || status === 'All' || app.status === status;
    return matchesPlatform && matchesStatus;
  });
}

export function getAppPlatforms(lang: Language): readonly AppPlatform[] {
  const seen = new Set<AppPlatform>();
  for (const app of APPS_BY_LANG[lang]) {
    seen.add(app.platform);
  }
  return Array.from(seen);
}

export function getProfile(lang: Language): ProfileInfo {
  return PROFILE_BY_LANG[lang];
}

export function getCVDocuments(lang: Language): readonly CVDocument[] {
  return CV_DOCUMENTS_BY_LANG[lang];
}
