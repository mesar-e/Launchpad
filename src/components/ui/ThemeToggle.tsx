import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/15 transition-colors duration-200 hover:border-[var(--accent-emerald)] hover:text-[var(--accent-emerald)] cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
      )}
    </button>
  );
}
