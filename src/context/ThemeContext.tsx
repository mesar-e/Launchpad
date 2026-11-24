import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'launchpad-theme';

interface ThemeContextValue {
  theme: ThemeMode;
  isSystemDefault: boolean;
  toggleTheme: () => void;
  setTheme: (next: ThemeMode | 'system') => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function syncDocumentTheme(resolved: ThemeMode, stored: ThemeMode | null): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', resolved);
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.setAttribute('content', stored ?? 'light dark');
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [storedTheme, setStoredTheme] = useState<ThemeMode | null>(() => readStoredTheme());
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(() => getSystemTheme());

  const resolvedTheme: ThemeMode = storedTheme ?? systemTheme;

  useEffect(() => {
    syncDocumentTheme(resolvedTheme, storedTheme);
  }, [resolvedTheme, storedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (event: MediaQueryListEvent): void => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent): void => {
      if (event.key !== STORAGE_KEY) return;
      const next = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
      setStoredTheme(next);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setTheme = useCallback(
    (next: ThemeMode | 'system'): void => {
      try {
        if (next === 'system') {
          window.localStorage.removeItem(STORAGE_KEY);
          setStoredTheme(null);
        } else {
          window.localStorage.setItem(STORAGE_KEY, next);
          setStoredTheme(next);
        }
      } catch {
        setStoredTheme(next === 'system' ? null : next);
      }
    },
    [],
  );

  const toggleTheme = useCallback((): void => {
    const target: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    // Returning to the active system preference clears the override so OS auto-switching stays intact.
    if (target === systemTheme) {
      setTheme('system');
    } else {
      setTheme(target);
    }
  }, [resolvedTheme, systemTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: resolvedTheme,
      isSystemDefault: storedTheme === null,
      toggleTheme,
      setTheme,
    }),
    [resolvedTheme, storedTheme, toggleTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
