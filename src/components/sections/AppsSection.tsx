import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getAppPlatforms, getApps, getUIStrings } from '../../services/portfolioService';
import type { AppPlatform, AppStatus } from '../../types/portfolio';

const STATUS_KEYS: readonly (AppStatus | 'All')[] = ['All', 'Released', 'In Progress'];

export function AppsSection() {
  const { lang } = useLanguage();
  const ui = getUIStrings(lang);

  const [selectedStatus, setSelectedStatus] = useState<AppStatus | 'All'>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<AppPlatform | 'All'>('All');

  const platforms = useMemo<readonly (AppPlatform | 'All')[]>(
    () => ['All', ...getAppPlatforms(lang)],
    [lang],
  );

  const apps = useMemo(
    () => getApps(lang, { status: selectedStatus, platform: selectedPlatform }),
    [lang, selectedStatus, selectedPlatform],
  );

  const getStatusLabel = (status: AppStatus | 'All'): string => {
    switch (status) {
      case 'All':
        return ui.statusAll;
      case 'Released':
        return ui.statusReleased;
      case 'In Progress':
        return ui.statusInProgress;
    }
  };

  const resetFilters = (): void => {
    setSelectedStatus('All');
    setSelectedPlatform('All');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-[var(--border-dark-hairline)] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={ui.statusLabel}>
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dark-muted)]">
            {ui.statusLabel}
          </span>
          {STATUS_KEYS.map((status) => {
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedStatus(status)}
                className={`cursor-pointer rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${
                  isActive
                    ? 'border-[var(--accent-emerald)] bg-[rgba(16,185,129,0.10)] text-[var(--accent-emerald)]'
                    : 'border-[var(--border-dark-hairline)] text-[var(--ink-dark-muted)] hover:border-[var(--ink-dark-muted)] hover:text-[var(--ink-dark-primary)]'
                }`}
              >
                {getStatusLabel(status)}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={ui.platformLabel}>
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dark-muted)]">
            {ui.platformLabel}
          </span>
          {platforms.map((platform) => {
            const isActive = selectedPlatform === platform;
            return (
              <button
                key={platform}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedPlatform(platform)}
                className={`cursor-pointer rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${
                  isActive
                    ? 'border-[var(--accent-emerald)] bg-[rgba(16,185,129,0.10)] text-[var(--accent-emerald)]'
                    : 'border-[var(--border-dark-hairline)] text-[var(--ink-dark-muted)] hover:border-[var(--ink-dark-muted)] hover:text-[var(--ink-dark-primary)]'
                }`}
              >
                {platform === 'All' ? ui.platformAll : platform}
              </button>
            );
          })}
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[var(--border-dark-hairline)] bg-[var(--surface-dark-elevated)]/90 p-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--ink-dark-muted)]">{ui.emptyApps}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="cursor-pointer rounded-full border border-[var(--border-dark-hairline)] px-4 py-1.5 font-mono text-xs text-[var(--ink-dark-primary)] transition-colors duration-200 hover:border-[var(--accent-emerald)] hover:text-[var(--accent-emerald)]"
          >
            {ui.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const isReleased = app.status === 'Released';
            return (
              <article
                key={app.id}
                className="flex flex-col justify-between gap-6 rounded-xl border border-[var(--border-dark-hairline)] bg-[var(--surface-dark-elevated)]/90 p-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-[var(--border-dark-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink-dark-muted)]">
                      {app.platform}
                    </span>

                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--ink-dark-muted)]">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isReleased ? 'bg-[var(--accent-emerald)]' : 'bg-[var(--ink-dark-muted)]'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{getStatusLabel(app.status)}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em] text-[var(--ink-dark-primary)]">
                      {app.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dark-muted)]">
                      {app.description}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5" aria-label={app.title}>
                    {app.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-[var(--border-dark-hairline)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink-dark-muted)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[var(--border-dark-hairline)] pt-4">
                  {app.githubUrl ? (
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--ink-dark-primary)] transition-colors duration-200 hover:text-[var(--accent-emerald)]"
                    >
                      <span>{ui.downloadGithub}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 stroke-[1.5] transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-[var(--ink-dark-muted)]">
                      {ui.noReleasesYet}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
