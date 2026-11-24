import type { AppProject } from '../types/portfolio';

export const APPS: readonly AppProject[] = [
  {
    id: 'coming-in-the-future',
    title: 'Coming in the Future',
    description:
      'No standalone applications have been released yet. Future desktop and web tools will appear here as they ship.',
    platform: 'Web',
    status: 'In Progress',
    tags: ['Upcoming'],
  },
] as const;
