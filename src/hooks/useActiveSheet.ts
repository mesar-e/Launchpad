import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getSheetRouteById, getSheetRouteByPath, type SheetRouteMeta } from '../lib/routes';
import type { SheetRouteId } from '../types/portfolio';

export interface UseActiveSheetResult {
  activeSheet: SheetRouteId | null;
  activeRoute: SheetRouteMeta | null;
  openSheet: (id: SheetRouteId) => void;
  closeSheet: () => void;
}

export function useActiveSheet(): UseActiveSheetResult {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoute = useMemo<SheetRouteMeta | null>(
    () => getSheetRouteByPath(location.pathname, lang),
    [location.pathname, lang],
  );

  const openSheet = useCallback(
    (id: SheetRouteId): void => {
      const target = getSheetRouteById(id, lang);
      if (location.pathname !== target.path) {
        navigate(target.path);
      }
    },
    [location.pathname, navigate, lang],
  );

  const closeSheet = useCallback((): void => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return {
    activeSheet: activeRoute?.id ?? null,
    activeRoute,
    openSheet,
    closeSheet,
  };
}
