import type { CVDocument } from '../types/portfolio';

export const CV_DOCUMENTS: readonly CVDocument[] = [
  {
    id: 'cv-en',
    language: 'EN',
    label: 'English',
    title: 'Curriculum Vitae',
    subtitle: 'Full-stack & software engineering resume.',
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
] as const;
