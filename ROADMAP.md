# Launchpad — Iterative Implementation Roadmap (ROADMAP.md)

**Rule:** Complete and verify each sub-phase (2–5 files) before advancing. Run `npm run typecheck && npm run build` at every checkpoint.

## Milestone 1 — Project Scaffold, Theme Tokens & Core Motion Choreography

### Phase 1A — Project Scaffold, Tooling & Design Tokens (5 files)
- [x] Scaffold Vite + React + TypeScript project and install `tailwindcss`, `@tailwindcss/vite`, `motion`, `react-router-dom`, `lucide-react`
- [x] Configure `vite.config.ts` (Tailwind v4 plugin), `vercel.json` (SPA rewrite), and `index.html` (editorial fonts + metadata)
- [x] Create `src/styles/index.css` with Cool Stone (`#F4F5F2`) & Forest Charcoal (`#0F1412`) semantic CSS variables and `@theme` tokens
- [x] Create `src/context/ThemeContext.tsx` and `src/components/ui/ThemeToggle.tsx` (persisted Light/Dark toggle)
- [x] **Verify:** `npm run typecheck && npm run build` passes cleanly; `npm run dev` renders themed canvas and working Light/Dark toggle

### Phase 1B — Act 1 → Act 2 Scroll Choreography & Ambient Cursor Glow (4 files)
- [x] Create `src/lib/motion.ts` (centralized spring presets, scroll easing curves, reduced-motion helpers)
- [x] Create `src/components/motion/AmbientCursorGlow.tsx` (zero-rerender `useMotionValue` + `useSpring` emerald glow, disabled on touch & reduced motion)
- [x] Create `src/components/layout/TopNavbar.tsx` (docked Name target, subtle route label, `ThemeToggle`)
- [x] Create `src/components/motion/ScrollStage.tsx` (Act 1 spacious hero Name + tagline smoothly morphing/docking into Act 2 navbar + canvas crossfade)
- [x] **Verify:** Scroll smoothly from 0% to 100% at 60fps; Name docks cleanly into navbar; cursor glow tracks smoothly in Act 2 without layout shift

### Phase 1C — Bottom-Docked Rows, Upward Sheet Shell & URL Route Sync (5 files)
- [x] Create `src/types/portfolio.ts` and `src/lib/routes.ts` (typed registry for `01 / Websites`, `02 / Apps`, `03 / About`, `04 / CV`)
- [x] Create `src/hooks/useActiveSheet.ts` and `src/hooks/useBodyScrollLock.ts`
- [x] Create `src/components/layout/BottomDock.tsx` (4 hairline-bordered rows docked at the bottom of Act 2)
- [x] Create `src/components/motion/UpwardSheet.tsx` (spring-physics upward sheet with backdrop, Esc close, ARIA dialog attributes, placeholder content)
- [x] Wire `src/App.tsx` with `<MotionConfig reducedMotion="user">`, `<ThemeProvider>`, `<BrowserRouter>`, and persistent shell routes
- [x] **Verify:** Clicking any row opens the upward sheet and updates URL (`/websites`, `/apps`, `/about`, `/cv`); direct URL load opens the matching sheet; browser Back/Forward and Esc close smoothly without losing scroll position

## Milestone 2 — Websites & Apps Sheets

### Phase 2A — Portfolio Data Modules & Service Layer (3 files)
- [ ] Create `src/data/websites.ts` with typed `WebsiteProject[]` entries
- [ ] Create `src/data/apps.ts` with typed `AppProject[]` entries
- [ ] Create `src/services/portfolioService.ts` exposing `getWebsites()`, `getApps(filter?)`, and platform/status filter helpers
- [ ] **Verify:** `npm run typecheck` passes with strict typing; zero UI imports from `src/data/*`

### Phase 2B — Websites & Apps Sheet Views (3 files)
- [ ] Create `src/components/sheets/WebsitesSheet.tsx` (editorial rows/cards with year, role, tags, live preview link, optional repo link)
- [ ] Create `src/components/sheets/AppsSheet.tsx` (platform & status filter pills + `Download on GitHub →` CTAs)
- [ ] Create `src/components/sheets/SheetRouter.tsx` and wire it into `App.tsx` (replacing placeholder content for 01 and 02)
- [ ] **Verify:** `/websites` and `/apps` render real data; platform/status filters update results instantaneously; external links open safely (`target="_blank" rel="noopener noreferrer"`)

## Milestone 3 — About & CV Sheets

### Phase 3A — Profile & CV Data + Clipboard Hook (4 files)
- [ ] Create `src/data/profile.ts` (`ProfileInfo`) and `src/data/cv.ts` (`CVData`)
- [ ] Extend `src/services/portfolioService.ts` with `getProfile()` and `getCV()`
- [ ] Create `src/hooks/useCopyToClipboard.ts` and `src/components/ui/CopyEmailButton.tsx`
- [ ] **Verify:** `npm run typecheck` passes; clipboard hook handles success and fallback cleanly

### Phase 3B — About & CV Sheet Views + Print Stylesheet (3 files)
- [ ] Create `src/components/sheets/AboutSheet.tsx` (editorial bio, categorized stack, `CopyEmailButton`, direct social links)
- [ ] Create `src/components/sheets/CvSheet.tsx` (structured summary, experience timeline, skills, education + `Print / Save as PDF` button)
- [ ] Create `src/styles/print.css` (hides chrome/dock/ambient glow, formats CV cleanly for A4/Letter PDF export) and wire 03 & 04 in `SheetRouter.tsx`
- [ ] **Verify:** One-click email copy shows inline confirmation; Print Preview on `/cv` produces a clean, single-column/editorial PDF with zero navigation artifacts

## Milestone 4 — Polish, Accessibility & Vercel Readiness

### Phase 4A — Touch Gestures, Keyboard Focus & Reduced-Motion Audit (3 files)
- [ ] Enhance `src/components/motion/UpwardSheet.tsx` with mobile drag-to-dismiss handle (velocity + offset threshold) and focus restoration on close
- [ ] Audit `ScrollStage.tsx` and `AmbientCursorGlow.tsx` under `prefers-reduced-motion: reduce` and mobile viewports (375px–1440px)
- [ ] Verify semantic landmarks, focus-visible emerald rings, and contrast ratios in both Light and Dark themes
- [ ] **Verify:** Full keyboard-only walkthrough (`Tab`, `Enter`, `Esc`) and touch-viewport drag-to-dismiss work without scroll bleed

### Phase 4B — Production Build & Vercel Deployment Check (2 files)
- [ ] Finalize `index.html` (Open Graph meta tags, page title, favicon) and verify `vercel.json` rewrites
- [ ] Run full verification suite: `npm run typecheck && npm run lint && npm run build && npm run preview`
- [ ] **Verify:** Zero console errors, zero TypeScript/ESLint warnings, clean production bundle, and direct deep-link refresh works on `/websites`, `/apps`, `/about`, and `/cv`
