import type { Language, WebsiteProject } from '../types/portfolio';

export const WEBSITES_BY_LANG: Record<Language, readonly WebsiteProject[]> = {
  en: [
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
        'Full-stack e-commerce platform for handcrafted decorative stones, featuring a React storefront, admin inventory panel, and a Spring Boot REST API with JWT authentication.',
      role: 'Frontend & Backend Architecture',
      year: '2025',
      tags: ['React', 'Spring Boot', 'PostgreSQL', 'JWT'],
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
  ],
  tr: [
    {
      id: 'lfg-finder',
      title: 'Match Point',
      description:
        'Çok oyunculu oturumlar için gerçek zamanlı filtreleme, rol etiketleri ve anlık lobi keşfi sunan glassmorphic takım bulma arayüzü.',
      role: 'Tasarım & Full-Stack Web',
      year: '2025',
      tags: ['React', 'JavaScript', 'Tailwind CSS', 'Glassmorphism'],
      liveUrl: 'https://lfg-finder-glassmorphic.vercel.app/',
      repos: [
        {
          label: 'Kaynak Kod',
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
        'El yapımı dekoratif taşlar için geliştirilmiş; React arayüzü, admin stok yönetim paneli ve JWT kimlik doğrulamalı Spring Boot REST API altyapısına sahip tam kapsamlı e-ticaret platformu.',
      role: 'Frontend & Backend Mimarisi',
      year: '2025',
      tags: ['React', 'Spring Boot', 'PostgreSQL', 'JWT'],
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
  ],
};
