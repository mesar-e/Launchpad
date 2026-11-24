import { APPS } from '../data/apps';
import { WEBSITES } from '../data/websites';
import type {
  AppFilter,
  AppPlatform,
  AppProject,
  WebsiteProject,
} from '../types/portfolio';

export function getWebsites(): readonly WebsiteProject[] {
  return WEBSITES;
}

export function getApps(filter?: AppFilter): readonly AppProject[] {
  if (!filter) {
    return APPS;
  }

  const { platform, status } = filter;

  return APPS.filter((app) => {
    const matchesPlatform = !platform || platform === 'All' || app.platform === platform;
    const matchesStatus = !status || status === 'All' || app.status === status;
    return matchesPlatform && matchesStatus;
  });
}

export function getAppPlatforms(): readonly AppPlatform[] {
  const seen = new Set<AppPlatform>();
  for (const app of APPS) {
    seen.add(app.platform);
  }
  return Array.from(seen);
}
