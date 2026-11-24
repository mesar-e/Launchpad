import { useCallback, useEffect, useRef } from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BottomDock } from './components/layout/BottomDock';
import { DownwardSectionStage } from './components/motion/DownwardSectionStage';
import { ScrollStage } from './components/motion/ScrollStage';
import { SectionRouter } from './components/sections/SectionRouter';
import { ThemeProvider } from './context/ThemeContext';
import { useActiveSheet } from './hooks/useActiveSheet';
import { smoothScrollTo } from './lib/smoothScroll';
import { getProfile } from './services/portfolioService';
import type { SheetRouteId } from './types/portfolio';

function PortfolioShell() {
  const profile = getProfile();
  const { activeSheet, activeRoute, openSheet, closeSheet } = useActiveSheet();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pendingScrollRef = useRef<'smooth' | null>(null);
  const cancelScrollRef = useRef<(() => void) | null>(null);
  const hasInitializedRef = useRef(false);

  // Align initial deep-link loads (e.g. /websites) straight to the section
  // while leaving Act 2 directly above when scrolling back up.
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      if (activeSheet !== null && sectionRef.current) {
        smoothScrollTo(sectionRef.current.offsetTop, { instant: true });
      }
      return;
    }

    if (activeSheet === null || pendingScrollRef.current !== 'smooth') {
      return;
    }

    pendingScrollRef.current = null;
    const frameId = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      cancelScrollRef.current?.();
      cancelScrollRef.current = smoothScrollTo(sectionRef.current.offsetTop);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [activeSheet]);

  useEffect(() => {
    return () => {
      cancelScrollRef.current?.();
    };
  }, []);

  const handleSelectSection = useCallback(
    (id: SheetRouteId): void => {
      cancelScrollRef.current?.();

      if (activeSheet === id && sectionRef.current) {
        cancelScrollRef.current = smoothScrollTo(sectionRef.current.offsetTop);
        return;
      }

      pendingScrollRef.current = 'smooth';
      openSheet(id);
    },
    [activeSheet, openSheet],
  );

  const handleReturnToIndex = useCallback((): void => {
    cancelScrollRef.current?.();
    cancelScrollRef.current = smoothScrollTo(window.innerHeight);
  }, []);

  const handleResetScroll = useCallback((): void => {
    cancelScrollRef.current?.();
    if (activeSheet !== null) {
      closeSheet();
    }
    cancelScrollRef.current = smoothScrollTo(0);
  }, [activeSheet, closeSheet]);

  return (
    <main>
      <ScrollStage
        name={profile.name}
        tagline={profile.tagline}
        availability={profile.availability}
        activeRouteLabel={activeRoute?.label}
        onResetScroll={handleResetScroll}
      >
        <BottomDock activeSheet={activeSheet} onSelectSheet={handleSelectSection} />
      </ScrollStage>

      <DownwardSectionStage
        route={activeRoute}
        sectionRef={sectionRef}
        onReturnToIndex={handleReturnToIndex}
      >
        {activeRoute ? <SectionRouter route={activeRoute} /> : null}
      </DownwardSectionStage>
    </main>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={null} />
            <Route path="/websites" element={null} />
            <Route path="/apps" element={null} />
            <Route path="/about" element={null} />
            <Route path="/cv" element={null} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <PortfolioShell />
        </BrowserRouter>
      </ThemeProvider>
    </MotionConfig>
  );
}
