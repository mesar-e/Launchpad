import type { AppProject, Language } from '../types/portfolio';

export const APPS_BY_LANG: Record<Language, readonly AppProject[]> = {
  en: [
    {
      id: 'coming-in-the-future',
      title: 'Coming in the Future',
      description:
        'No standalone applications have been released yet. Future desktop and web tools will appear here as they ship.',
      platform: 'Web',
      status: 'In Progress',
      tags: ['Upcoming'],
    },
  ],
  tr: [
    {
      id: 'coming-in-the-future',
      title: 'Yakında',
      description:
        'Henüz yayınlanmış bağımsız bir uygulama yok. Gelecek masaüstü ve web araçları hazır oldukça burada yer alacak.',
      platform: 'Web',
      status: 'In Progress',
      tags: ['Yakında'],
    },
  ],
};
