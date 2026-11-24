import { ArrowUpRight, MapPin } from 'lucide-react';
import { getProfile } from '../../services/portfolioService';
import { CopyEmailButton } from '../ui/CopyEmailButton';

export function AboutSection() {
  const profile = getProfile();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-8">
        <div className="space-y-4">
          {profile.bio.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? 'text-lg font-medium leading-relaxed tracking-[-0.015em] text-[var(--ink-dark-primary)] sm:text-xl'
                  : 'text-sm leading-relaxed text-[var(--ink-dark-muted)] sm:text-base'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-dark-muted)]">
            Focus &amp; Stack
          </h3>

          <dl className="divide-y divide-[var(--border-dark-hairline)] border-y border-[var(--border-dark-hairline)]">
            {profile.stack.map((group) => (
              <div
                key={group.category}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="shrink-0 font-mono text-xs text-[var(--ink-dark-muted)]">
                  {group.category}
                </dt>
                <dd className="flex flex-wrap gap-1.5 sm:justify-end">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[var(--border-dark-hairline)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--ink-dark-primary)]"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <aside
        aria-label="Contact and links"
        className="flex h-fit flex-col gap-6 rounded-xl border border-[var(--border-dark-hairline)] bg-[var(--surface-dark-elevated)]/90 p-6"
      >
        <div className="space-y-1.5">
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dark-muted)]">
            Location
          </span>
          <p className="inline-flex items-center gap-2 text-sm text-[var(--ink-dark-primary)]">
            <MapPin className="h-3.5 w-3.5 stroke-[1.5] text-[var(--accent-emerald)]" aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
        </div>

        <div className="space-y-2">
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dark-muted)]">
            Email
          </span>
          <CopyEmailButton email={profile.email} />
        </div>

        <div className="space-y-2 border-t border-[var(--border-dark-hairline)] pt-4">
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-dark-muted)]">
            Socials
          </span>
          <ul className="divide-y divide-[var(--border-dark-hairline)]">
            {profile.socials.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-2.5 text-sm transition-colors duration-200"
                >
                  <span className="font-medium text-[var(--ink-dark-primary)] group-hover:text-[var(--accent-emerald)]">
                    {social.label}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--ink-dark-muted)] group-hover:text-[var(--ink-dark-primary)]">
                    <span>{social.handle}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 stroke-[1.5] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-emerald)]"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
