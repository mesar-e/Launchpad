import { ArrowUpRight, Download } from 'lucide-react';
import { getCVDocuments } from '../../services/portfolioService';

export function CvSection() {
  const documents = getCVDocuments();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {documents.map((doc) => (
        <article
          key={doc.id}
          className="group relative flex min-h-[240px] flex-col justify-between rounded-xl border border-[var(--border-dark-hairline)] bg-[var(--surface-dark-elevated)]/90 p-7 transition-colors duration-200 hover:border-[var(--accent-emerald)]/70"
        >
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="rounded-md border border-[var(--border-dark-hairline)] px-2 py-0.5 font-mono text-xs text-[var(--accent-emerald)]">
                {doc.language}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dark-muted)]">
                PDF
              </span>
            </div>

            <ArrowUpRight
              className="h-4 w-4 stroke-[1.5] text-[var(--ink-dark-muted)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-emerald)]"
              aria-hidden="true"
            />
          </div>

          <div className="my-6 space-y-2">
            <h3 className="text-2xl font-medium tracking-[-0.025em] text-[var(--ink-dark-primary)] sm:text-3xl">
              {doc.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--ink-dark-muted)]">
              {doc.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--border-dark-hairline)] pt-4">
            <a
              href={doc.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-dark-primary)] transition-colors duration-200 after:absolute after:inset-0 group-hover:text-[var(--accent-emerald)]"
            >
              <span>Open PDF</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
            </a>

            <a
              href={doc.pdfUrl}
              download={doc.fileName}
              className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-dark-hairline)] px-3 py-1 font-mono text-xs text-[var(--ink-dark-muted)] transition-colors duration-200 hover:border-[var(--accent-emerald)] hover:text-[var(--accent-emerald)]"
            >
              <span>Download</span>
              <Download className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
