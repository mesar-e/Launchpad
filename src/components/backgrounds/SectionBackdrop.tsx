import { Suspense, lazy } from 'react';
import { useReducedMotion } from 'motion/react';
import type { SheetRouteId } from '../../types/portfolio';

const DotGrid = lazy(() => import('./DotGrid'));
const LetterGlitch = lazy(() => import('./LetterGlitch'));
const Antigravity = lazy(() => import('./Antigravity'));
const Lightfall = lazy(() => import('./Lightfall'));

interface SectionBackdropProps {
  routeId: SheetRouteId;
}

function BackdropScene({ routeId }: SectionBackdropProps) {
  switch (routeId) {
    case 'websites':
      return (
        <DotGrid
          baseColor="#23302A"
          activeColor="#10B981"
          shape="circle"
          dotSize={5}
          gap={18}
          proximity={140}
          strength={0.5}
          bounce={0.3}
          tension={0.4}
          returnDuration={1.4}
          shockRadius={320}
          shockStrength={5}
          swell={0.4}
          stretch={0.2}
          glow={0.25}
          fade={0.5}
          intro={true}
        />
      );
    case 'apps':
      return (
        <LetterGlitch
          backgroundColor="#0F1412"
          baseColor="#23302A"
          glitchColors={['#10B981', '#161D1A', '#23302A', '#F4F5F2']}
          baseOpacity={0.16}
          glitchAmount={0.35}
          speed={0.75}
          smooth
          edgeFade={96}
        />
      );
    case 'about':
      return (
        <Antigravity
          colors={['#10B981', '#23302A', '#F4F5F2']}
          count={220}
          particleSize={1.15}
          ambient={0.38}
          opacity={0.55}
          autoAnimate
          interactive
          clickBurst={false}
        />
      );
    case 'cv':
      return (
        <Lightfall
          backgroundColor="#0F1412"
          colors={['#10B981', '#23302A', '#161D1A']}
          opacity={0.72}
          speed={0.55}
          glow={0.55}
          bloom={0.38}
          mouseInteraction
        />
      );
  }
}

export function SectionBackdrop({ routeId }: SectionBackdropProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--surface-dark-canvas)]"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--surface-dark-canvas)]"
    >
      <Suspense fallback={null}>
        <BackdropScene routeId={routeId} />
      </Suspense>
    </div>
  );
}
