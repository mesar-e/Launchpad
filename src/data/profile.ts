import type { Language, ProfileInfo } from '../types/portfolio';

export const PROFILE_BY_LANG: Record<Language, ProfileInfo> = {
  en: {
    name: 'Musa Serkan Ergül',
    tagline: 'Full-stack developer building web apps and desktop tools.',
    availability: 'Available for select projects',
    location: 'Turkey (EN / TR)',
    email: 'mserkanergul@gmail.com',
    bio: [
      'I’m Musa Serkan, a developer who went from translating human languages to writing machine ones.',
      'After studying Interpreting & Translation and training in Full-Stack Development, I’ve spent my time building whatever catches my curiosity—from React and Spring Boot web apps to native Windows utilities. I love figuring out how complex systems tick, tweaking them until they run smoothly, and turning rough ideas into working tools. This site is a collection of the things I’ve built along the way.',
    ],
    socials: [
      {
        label: 'GitHub',
        handle: '@mesar-e',
        url: 'https://github.com/mesar-e',
      },
      {
        label: 'LinkedIn',
        handle: 'musa-serkan-ergul',
        url: 'https://www.linkedin.com/in/musa-serkan-ergul-2b2bb3321',
      },
    ],
    stack: [
      {
        category: 'Frontend',
        items: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Motion'],
      },
      {
        category: 'Backend',
        items: ['Java', 'Spring Boot', 'REST APIs', 'SQL'],
      },
      {
        category: 'Desktop & Tooling',
        items: ['Windows Utilities', 'Git', 'Vite', 'Vercel'],
      },
    ],
  },
  tr: {
    name: 'Musa Serkan Ergül',
    tagline: 'Web uygulamaları ve masaüstü araçları geliştiren full-stack yazılımcı.',
    availability: 'Seçili projeler için uygun',
    location: 'Türkiye (EN / TR)',
    email: 'mserkanergul@gmail.com',
    bio: [
      'Ben Musa Serkan — insan dillerini çevirmekten makine dillerini yazmaya geçen bir geliştiriciyim.',
      'Mütercim Tercümanlık eğitimi ve Full-Stack Yazılım geliştirme sürecinin ardından, ilgimi çeken projeler üretmeye odaklandım: React ve Spring Boot tabanlı web uygulamalarından yerel Windows araçlarına kadar. Karmaşık sistemlerin nasıl çalıştığını çözmeyi, pürüzsüz hale gelene kadar iyileştirmeyi ve ham fikirleri çalışan araçlara dönüştürmeyi seviyorum. Bu site, bu yolculukta geliştirdiğim işlerin bir derlemesi.',
    ],
    socials: [
      {
        label: 'GitHub',
        handle: '@mesar-e',
        url: 'https://github.com/mesar-e',
      },
      {
        label: 'LinkedIn',
        handle: 'musa-serkan-ergul',
        url: 'https://www.linkedin.com/in/musa-serkan-ergul-2b2bb3321',
      },
    ],
    stack: [
      {
        category: 'Frontend',
        items: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Motion'],
      },
      {
        category: 'Backend',
        items: ['Java', 'Spring Boot', 'REST APIs', 'SQL'],
      },
      {
        category: 'Masaüstü & Araçlar',
        items: ['Windows Araçları', 'Git', 'Vite', 'Vercel'],
      },
    ],
  },
};
