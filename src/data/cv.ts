import type { CVDocument, Language } from '../types/portfolio';

export const CV_DOCUMENTS_BY_LANG: Record<Language, readonly CVDocument[]> = {
  en: [
    {
      id: 'cv-en',
      language: 'EN',
      label: 'English',
      title: 'Resume',
      subtitle: 'Full-stack & software engineering resume.',
      pdfUrl: '/cv/Musa_Serkan_Ergul_CV_En.pdf',
      fileName: 'Musa_Serkan_Ergul_CV_En.pdf',
    },
    {
      id: 'cv-tr',
      language: 'TR',
      label: 'Türkçe',
      title: 'Özgeçmiş',
      subtitle: 'Turkish edition of full-stack & software engineering CV.',
      pdfUrl: '/cv/Musa_Serkan_Ergul_CV_Tr.pdf',
      fileName: 'Musa_Serkan_Ergul_CV_Tr.pdf',
    },
  ],
  tr: [
    {
      id: 'cv-en',
      language: 'EN',
      label: 'English',
      title: 'Resume',
      subtitle: 'Full-stack ve yazılım geliştirme özgeçmişi (İngilizce).',
      pdfUrl: '/cv/Musa_Serkan_Ergul_CV_En.pdf',
      fileName: 'Musa_Serkan_Ergul_CV_En.pdf',
    },
    {
      id: 'cv-tr',
      language: 'TR',
      label: 'Türkçe',
      title: 'Özgeçmiş',
      subtitle: 'Full-stack ve yazılım geliştirme özgeçmişi.',
      pdfUrl: '/cv/Musa_Serkan_Ergul_CV_Tr.pdf',
      fileName: 'Musa_Serkan_Ergul_CV_Tr.pdf',
    },
  ],
};
