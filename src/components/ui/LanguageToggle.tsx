import { useLanguage } from '../../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={isEn ? 'Switch language to Turkish' : 'Dili İngilizceye çevir'}
      title={isEn ? 'Türkçeye geç' : 'Switch to English'}
      className={`inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-dark-hairline)] bg-[var(--surface-dark-elevated)]/70 px-3 font-mono text-[11px] tracking-wider text-[var(--ink-dark-primary)] transition-colors duration-200 hover:border-[var(--accent-emerald)] ${className}`}
    >
      <span
        className={
          isEn ? 'font-medium text-[var(--accent-emerald)]' : 'text-[var(--ink-dark-muted)]'
        }
      >
        EN
      </span>
      <span className="text-[var(--ink-dark-muted)]/50" aria-hidden="true">
        /
      </span>
      <span
        className={
          !isEn ? 'font-medium text-[var(--accent-emerald)]' : 'text-[var(--ink-dark-muted)]'
        }
      >
        TR
      </span>
    </button>
  );
}
