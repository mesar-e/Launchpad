import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { getUIStrings } from '../../services/portfolioService';
import { TopNavbar } from '../layout/TopNavbar';
import { AmbientCursorGlow } from './AmbientCursorGlow';

interface ScrollStageProps {
  name: string;
  tagline: string;
  activeRouteLabel?: string;
  onResetScroll: () => void;
  children?: ReactNode;
}

interface MorphMetrics {
  dy: number;
  scale: number;
}

export function ScrollStage({
  name,
  tagline,
  activeRouteLabel,
  onResetScroll,
  children,
}: ScrollStageProps) {
  const { lang } = useLanguage();
  const ui = getUIStrings(lang);
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const dockNameRef = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [isAct2, setIsAct2] = useState(false);
  const [isDockInteractive, setIsDockInteractive] = useState(false);
  const [showHeroMeta, setShowHeroMeta] = useState(true);
  const [metrics, setMetrics] = useState<MorphMetrics>({ dy: -280, scale: 0.28 });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  // Bypass Motion's ViewTimeline acceleration on target scroll progress so opacity
  // sub-ranges (e.g. [0, 0.12] and [0.68, 0.78]) always track JS scrollYProgress cleanly.
  const progress = useTransform(scrollYProgress, (latest) =>
    Math.min(1, Math.max(0, latest)),
  );

  useMotionValueEvent(progress, 'change', (latest) => {
    const nextIsAct2 = latest >= 0.42;
    const nextIsDockInteractive = latest >= 0.5;
    const nextShowHeroMeta = latest < 0.22;
    setIsAct2((prev) => (prev !== nextIsAct2 ? nextIsAct2 : prev));
    setIsDockInteractive((prev) => (prev !== nextIsDockInteractive ? nextIsDockInteractive : prev));
    setShowHeroMeta((prev) => (prev !== nextShowHeroMeta ? nextShowHeroMeta : prev));
  });

  useEffect(() => {
    const currentProgress = progress.get();
    setIsAct2(currentProgress >= 0.42);
    setIsDockInteractive(currentProgress >= 0.5);
    setShowHeroMeta(currentProgress < 0.22);
  }, [progress]);

  useLayoutEffect(() => {
    const measure = (): void => {
      const stickyEl = stickyRef.current;
      const heroEl = heroSlotRef.current;
      const dockEl = dockNameRef.current;
      if (!stickyEl || !heroEl || !dockEl) return;

      const stickyRect = stickyEl.getBoundingClientRect();
      const heroRect = heroEl.getBoundingClientRect();
      const dockRect = dockEl.getBoundingClientRect();
      if (heroRect.width === 0 || dockRect.width === 0) return;

      // Measure hero slot relative to the sticky 100dvh frame so scrolling past
      // sticky range (into DownwardSectionStage) never flips dy positive.
      const heroCenterYInStage = heroRect.top + heroRect.height / 2 - stickyRect.top;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      setMetrics({
        dy: dockCenterY - heroCenterYInStage,
        scale: dockRect.width / heroRect.width,
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (stickyRef.current) resizeObserver.observe(stickyRef.current);
    if (heroSlotRef.current) resizeObserver.observe(heroSlotRef.current);
    if (dockNameRef.current) resizeObserver.observe(dockNameRef.current);
    window.addEventListener('resize', measure);

    let active = true;
    document.fonts?.ready.then(() => {
      if (active) measure();
    });

    return () => {
      active = false;
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [name]);

  // Act 2 dark Forest Charcoal overlay fade
  const darkOverlayOpacity = useTransform(progress, [0.14, 0.58], [0, 1]);

  // Act 1 availability pill, hero tagline & scroll cue fade out cleanly before Act 2 settles
  const heroMetaOpacity = useTransform(progress, [0, 0.24], [1, 0]);
  const heroMetaY = useTransform(progress, [0, 0.24], [0, prefersReducedMotion ? 0 : -14]);
  const scrollCueOpacity = useTransform(progress, [0, 0.12], [1, 0]);
  const scrollCueY = useTransform(progress, [0, 0.12], [0, prefersReducedMotion ? 0 : 8]);

  // Hero Name morph straight up along the vertical center axis into TopNavbar
  const heroY = useTransform(progress, [0.05, 0.72], [0, prefersReducedMotion ? 0 : metrics.dy]);
  const heroScale = useTransform(
    progress,
    [0.05, 0.72],
    [1, prefersReducedMotion ? 1 : metrics.scale],
  );
  const heroLightInkOpacity = useTransform(progress, [0.22, 0.52], [1, 0]);
  const heroDarkInkOpacity = useTransform(progress, [0.22, 0.52], [0, 1]);
  const heroVisibleOpacity = useTransform(
    progress,
    prefersReducedMotion ? [0.25, 0.55] : [0.68, 0.78],
    [1, 0],
  );

  // TopNavbar docked name + hairline border fade in
  const navbarDockOpacity = useTransform(
    progress,
    prefersReducedMotion ? [0.35, 0.6] : [0.68, 0.78],
    [0, 1],
  );
  const navbarBorderOpacity = useTransform(progress, [0.55, 0.8], [0, 1]);

  // Ambient emerald cursor glow fades in cleanly over a 4-point plateau
  const glowOpacity = useTransform(progress, [0, 0.45, 0.7, 1], [0, 0, 1, 1]);

  // Act 2 BottomDock reveal (4-point plateau locked at opacity: 1, y: 0 through max scroll)
  const dockContentOpacity = useTransform(progress, [0, 0.45, 0.7, 1], [0, 0, 1, 1]);
  const dockContentY = useTransform(
    progress,
    [0, 0.45, 0.7, 1],
    [prefersReducedMotion ? 0 : 24, prefersReducedMotion ? 0 : 24, 0, 0],
  );

  return (
    <div ref={stageRef} className="relative h-[200dvh] w-full">
      <TopNavbar
        name={name}
        dockNameRef={dockNameRef}
        dockOpacity={navbarDockOpacity}
        borderOpacity={navbarBorderOpacity}
        isAct2={isAct2}
        activeRouteLabel={activeRouteLabel}
        returnToTopLabel={ui.returnToTop}
        onNameClick={onResetScroll}
      />

      <AmbientCursorGlow opacity={glowOpacity} />

      <div ref={stickyRef} className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Act 2 Forest Charcoal canvas layer */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: darkOverlayOpacity }}
          className="pointer-events-none absolute inset-0 bg-[var(--surface-dark-canvas)]"
        />

        {/* Act 1 Centered Hero Typography */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <div ref={heroSlotRef} className="relative">
            <motion.div
              style={{
                y: heroY,
                scale: heroScale,
                opacity: heroVisibleOpacity,
              }}
              className="relative origin-center will-change-transform"
            >
              <h1 className="relative whitespace-nowrap text-center text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em] select-none">
                <motion.span
                  style={{ opacity: heroLightInkOpacity }}
                  className="block text-[var(--ink-primary)]"
                >
                  {name}
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  style={{ opacity: heroDarkInkOpacity }}
                  className="absolute inset-0 block text-[var(--ink-dark-primary)]"
                >
                  {name}
                </motion.span>
              </h1>
            </motion.div>
          </div>

          <motion.p
            style={{ opacity: heroMetaOpacity, y: heroMetaY }}
            aria-hidden={!showHeroMeta}
            className="mt-4 max-w-md text-center text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base"
          >
            {tagline}
          </motion.p>
        </div>

        {/* Act 1 Bottom Scroll Cue — non-interactive and fades out immediately */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: scrollCueOpacity, y: scrollCueY }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)] sm:bottom-10"
        >
          <span>{ui.scroll}</span>
          <span className="h-5 w-px bg-current opacity-35" />
        </motion.div>

        {/* Act 2 Bottom-Docked Navigation Area (sticky-scoped so downward unfold scrolls it out naturally) */}
        <motion.div
          inert={!isDockInteractive}
          style={{
            opacity: dockContentOpacity,
            y: dockContentY,
            pointerEvents: isDockInteractive ? 'auto' : 'none',
          }}
          className="absolute inset-x-0 bottom-0 z-20"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
