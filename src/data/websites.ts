import type { WebsiteProject } from '../types/portfolio';

export const WEBSITES: readonly WebsiteProject[] = [
  {
    id: 'lfg-finder',
    title: 'Match Point',
    description:
      'Glassmorphic squad-matching interface for multiplayer sessions with real-time filtering, role tags, and instant lobby discovery.',
    role: 'Design & Full-Stack Web',
    year: '2025',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Glassmorphism'],
    liveUrl: 'https://lfg-finder-glassmorphic.vercel.app/',
    repos: [
      {
        label: 'Repo',
        url: 'https://github.com/mesar-e/Lfg_Finder_Glassmoprhic',
      },
    ],
    previewImage: '/previews/lfg-finder.png',
    featured: true,
  },
  {
    id: 'suslu-taslar',
    title: 'Süslü Taşlar',
    description:
      'Editorial storefront and full-stack catalog platform for handcrafted jewelry with curated collections and REST API backend.',
    role: 'Frontend & Backend Architecture',
    year: '2025',
    tags: ['React', 'JavaScript', 'Node.js', 'E-Commerce'],
    liveUrl: 'https://suslu-taslar-frontend.vercel.app/',
    repos: [
      {
        label: 'Frontend',
        url: 'https://github.com/mesar-e/SusluTaslar-Frontend',
      },
      {
        label: 'Backend',
        url: 'https://github.com/mesar-e/SusluTaslar-Backend',
      },
    ],
    previewImage: '/previews/suslu-taslar.png',
    featured: true,
  },
] as const;
