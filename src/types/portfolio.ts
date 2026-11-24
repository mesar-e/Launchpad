export type SheetRouteId = 'websites' | 'apps' | 'about' | 'cv';
export type AppPlatform = 'macOS' | 'Windows' | 'Web' | 'Mobile';
export type AppStatus = 'Released' | 'In Progress';

export interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  previewImage?: string;
  featured: boolean;
}

export interface AppProject {
  id: string;
  title: string;
  description: string;
  platform: AppPlatform;
  status: AppStatus;
  tags: string[];
  githubUrl: string;
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

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface CVData {
  summary: string;
  skills: { group: string; items: string[] }[];
  experience: ExperienceItem[];
  education: EducationItem[];
}
