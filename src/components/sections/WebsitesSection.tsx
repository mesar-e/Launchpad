import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { getWebsites } from '../../services/portfolioService';
import type { WebsiteProject } from '../../types/portfolio';

function WebsiteCard({ project }: { project: WebsiteProject }) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(project.previewImage) && !imgError;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-dark-hairline)] bg-[var(--surface-dark-elevated)]/90">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-dark-hairline)] px-5 py-4">
        <div className="min-w-0">
          <h3 className="text-base font-medium tracking-[-0.02em] text-[var(--ink-dark-primary)] sm:text-lg">
            {project.title}
          </h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[var(--ink-dark-muted)]">
            <span className="font-mono">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.repos.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-dark-hairline)] px-2.5 py-1 font-mono text-[11px] text-[var(--ink-dark-muted)] transition-colors duration-200 hover:border-[var(--accent-emerald)] hover:text-[var(--ink-dark-primary)]"
            >
              <Github className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
              <span>{repo.label}</span>
              <ArrowUpRight className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </header>

      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title} live website`}
        className="group relative block aspect-[16/10] w-full overflow-hidden bg-[var(--surface-dark-canvas)]"
      >
        {showImage ? (
          <img
            src={project.previewImage}
            alt={`${project.title} live preview`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--surface-dark-canvas)] p-6 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-emerald)]">
              {project.year}
            </span>
            <span className="text-xl font-medium tracking-[-0.02em] text-[var(--ink-dark-primary)]">
              {project.title}
            </span>
            <span className="text-xs text-[var(--ink-dark-muted)]">{project.role}</span>
          </div>
        )}

        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-dark-hairline)] bg-[rgba(15,20,18,0.88)] px-3 py-1.5 font-mono text-[11px] text-[var(--ink-dark-primary)] backdrop-blur-md transition-colors duration-200 group-hover:border-[var(--accent-emerald)] group-hover:text-[var(--accent-emerald)]">
          <span>Visit Live</span>
          <ArrowUpRight className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
        </span>
      </a>

      <footer className="flex flex-1 flex-col justify-between gap-4 border-t border-[var(--border-dark-hairline)] px-5 py-4">
        <p className="text-sm leading-relaxed text-[var(--ink-dark-muted)]">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-[var(--border-dark-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink-dark-muted)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}

export function WebsitesSection() {
  const websites = getWebsites();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {websites.map((project) => (
        <WebsiteCard key={project.id} project={project} />
      ))}
    </div>
  );
}
