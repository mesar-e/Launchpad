import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => void copy(email)}
      aria-label={copied ? `Copied ${email} to clipboard` : `Copy email address ${email}`}
      className={`group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors duration-200 ${
        copied
          ? 'border-[var(--accent-emerald)] bg-[rgba(16,185,129,0.08)]'
          : 'border-[var(--border-dark-hairline)] bg-[var(--surface-dark-canvas)]/60 hover:border-[var(--accent-emerald)]/70'
      }`}
    >
      <span className="truncate font-mono text-xs text-[var(--ink-dark-primary)]">
        {email}
      </span>

      <span
        aria-live="polite"
        className={`inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] transition-colors duration-200 ${
          copied
            ? 'text-[var(--accent-emerald)]'
            : 'text-[var(--ink-dark-muted)] group-hover:text-[var(--ink-dark-primary)]'
        }`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
            <span>Copy</span>
          </>
        )}
      </span>
    </button>
  );
}
