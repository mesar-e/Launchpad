export type Language = 'en' | 'tr';

export interface UIStrings {
  scroll: string;
  index: string;
  returnToTop: string;
  returnToIndex: string;
  visitLive: string;
  statusLabel: string;
  platformLabel: string;
  statusAll: string;
  statusReleased: string;
  statusInProgress: string;
  platformAll: string;
  downloadGithub: string;
  noReleasesYet: string;
  emptyApps: string;
  resetFilters: string;
  focusStack: string;
  location: string;
  email: string;
  socials: string;
  copy: string;
  copied: string;
  openPdf: string;
  download: string;
  sectionsAriaLabel: string;
  contactAriaLabel: string;
}

export type SheetRouteId = 'websites' | 'apps' | 'about' | 'cv';
export type AppPlatform = 'macOS' | 'Windows' | 'Web' | 'Mobile';
export type AppStatus = 'Released' | 'In Progress';

export interface ProjectRepo {
  label: string;
  url: string;
}

export interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  liveUrl: string;
  repos: ProjectRepo[];
  previewImage?: string;
  featured: boolean;
}

export interface AppFilter {
  platform?: AppPlatform | 'All';
  status?: AppStatus | 'All';
}

export interface AppProject {
  id: string;
  title: string;
  description: string;
  platform: AppPlatform;
  status: AppStatus;
  tags: string[];
  githubUrl?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  handle: string;
}

export interface ProfileInfo {
  name: string;
  tagline: string;
  availability: string;
  bio: string[];
  email: string;
  location: string;
  stack: { category: string; items: string[] }[];
  socials: SocialLink[];
}

export type CVLanguage = 'EN' | 'TR';

export interface CVDocument {
  id: string;
  language: CVLanguage;
  label: string;
  title: string;
  subtitle: string;
  pdfUrl: string;
  fileName: string;
}
