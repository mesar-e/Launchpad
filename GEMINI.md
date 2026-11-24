# Launchpad — Project Constitution (GEMINI.md)

## 1. Project Overview & Tech Stack

Launchpad is a frontend-only personal portfolio where smooth, purposeful motion is the signature experience—minimalist, calm, and free of visual clutter.

### Three-Act Experience
- **Act 1 — Landing (Scroll 0):** Spacious Cool Stone canvas (`#F4F5F2`) featuring the developer's Name front and center with a subtle tagline/availability pill. Zero project or bio clutter.
- **Act 2 — Scroll Transition:** Scrolling smoothly shrinks and docks the Name into the fixed top navbar, transitions the canvas into deep Forest Charcoal (`#0F1412`) with a 60fps emerald-tinted (`#10B981`) cursor-reactive ambient glow, and brings 4 bottom-docked navigation rows into view.
- **Act 3 — Upward-Opening Sheets:** Selecting any row (`01 / Websites`, `02 / Apps`, `03 / About`, `04 / CV`) expands an upward spring-physics overlay sheet synced with URL routes (`/websites`, `/apps`, `/about`, `/cv`) for direct sharing and browser back/forward navigation.

### Tech Stack
- **Framework:** React 19 + TypeScript (strict mode) + Vite 6
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + semantic CSS custom properties
- **Motion:** `motion` (`motion/react`) — `useScroll`, `useTransform`, `useMotionValue`, `useSpring`, `AnimatePresence`, `MotionConfig`
- **Routing:** `react-router-dom` v7 (SPA client routing)
- **Icons:** `lucide-react` (thin, consistent stroke weights)
- **Deployment:** Static SPA on Vercel with `vercel.json` fallback rewrite to `/index.html`

## 2. Repository & Folder Structure

```text
Launchpad/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNavbar.tsx          # Docked name slot, active route indicator, theme toggle
│   │   │   └── BottomDock.tsx         # 4 bottom-docked rows (01–04) triggering sheets
│   │   ├── motion/
│   │   │   ├── ScrollStage.tsx        # Act 1 → Act 2 scroll container & name morph choreography
│   │   │   ├── AmbientCursorGlow.tsx  # 60fps pointer-tracking emerald wash (GPU-composited)
│   │   │   └── UpwardSheet.tsx        # Reusable spring-physics sheet + drag-to-dismiss + Esc close
│   │   ├── sheets/
│   │   │   ├── SheetRouter.tsx        # Maps active route (/websites, /apps, /about, /cv) to sheet content
│   │   │   ├── WebsitesSheet.tsx      # Editorial project list with live & repo links
│   │   │   ├── AppsSheet.tsx          # Platform/status filters + GitHub download CTAs
│   │   │   ├── AboutSheet.tsx         # Bio, stack, one-click copy email, social links
│   │   │   └── CvSheet.tsx            # Structured resume + Print / Save as PDF support
│   │   └── ui/
│   │       ├── ThemeToggle.tsx        # Light / Dark mode toggle button
│   │       └── CopyEmailButton.tsx    # One-click clipboard copy with inline feedback
│   ├── context/
│   │   └── ThemeContext.tsx           # Light/Dark theme state, system fallback & localStorage sync
│   ├── data/                          # Typed static data modules (ONLY imported by src/services/)
│   │   ├── websites.ts
│   │   ├── apps.ts
│   │   ├── profile.ts
│   │   └── cv.ts
│   ├── hooks/
│   │   ├── useActiveSheet.ts          # Derives active sheet from URL + open/close navigation helpers
│   │   ├── useBodyScrollLock.ts       # Locks background scroll while preserving scroll position
│   │   └── useCopyToClipboard.ts      # Clipboard write + timed "Copied" feedback state
│   ├── lib/
│   │   ├── motion.ts                  # Centralized spring configs, easing curves & sheet variants
│   │   └── routes.ts                  # Typed sheet route registry (01–04 metadata & paths)
│   ├── services/
│   │   └── portfolioService.ts        # Read-only repository/query layer isolating src/data/* from UI
│   ├── styles/
│   │   ├── index.css                  # Tailwind v4 entry, @theme tokens, typography & base styles
│   │   └── print.css                  # Clean @media print rules for CV PDF export
│   ├── types/
│   │   └── portfolio.ts               # Core TypeScript domain interfaces
│   ├── App.tsx                        # Providers (MotionConfig, ThemeProvider, BrowserRouter) + Shell
│   └── main.tsx                       # React DOM root entry
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vercel.json                        # SPA rewrite rule for /websites, /apps, /about, /cv
├── vite.config.ts
├── GEMINI.md
└── ROADMAP.md
```

## 3. Core Architectural Patterns

### 3.1 Repository / Service Isolation
- UI components (`src/components/**`) must never import directly from `src/data/**`.
- All data access goes through `src/services/portfolioService.ts` (`getWebsites`, `getApps`, `getProfile`, `getCV`).
- Filtering/sorting (e.g., filtering `AppProject` by platform or status) lives in pure service functions, keeping UI components declarative and allowing a future headless CMS swap without editing UI code.

### 3.2 Persistent Shell + URL-Driven Sheets
- `App.tsx` renders a single persistent `PortfolioShell` across `/`, `/websites`, `/apps`, `/about`, and `/cv` so opening or closing a sheet never unmounts the scroll stage or resets scroll position.
- `useActiveSheet()` reads `useLocation().pathname` against `SHEET_ROUTES` (`src/lib/routes.ts`) and exposes `openSheet(id)` and `closeSheet()` (navigating to `/`).
- Deep-linking directly to `/websites` (or any sheet route) opens that sheet immediately on mount while keeping Act 2 ready underneath when dismissed.

### 3.3 60fps Scroll & Cursor Motion Boundaries
- **Scroll Choreography (`ScrollStage.tsx`):** Uses `useScroll` + `useTransform` mapped exclusively to GPU-composited properties (`transform`, `opacity`). Background crossfade between Light Landing (`#F4F5F2`) and Dark Scroll Canvas (`#0F1412`) uses an opacity-faded overlay layer rather than animating `background-color` on layout-heavy containers.
- **Cursor Glow (`AmbientCursorGlow.tsx`):** Uses `useMotionValue` + `useSpring` updated via a passive `pointermove` listener—zero React state updates or re-renders per frame. Automatically disabled on coarse pointers (`(pointer: coarse)`) and when `prefers-reduced-motion: reduce` is active.
- **Reduced Motion:** Root app is wrapped in `<MotionConfig reducedMotion="user">`. Non-essential ambient motion and scroll-linked parallax gracefully simplify to clean opacity fades.

### 3.4 Theme & Color Token System
| Token | Light Mode | Dark Mode / Act 2 Canvas | Usage |
| :--- | :--- | :--- | :--- |
| `--surface-canvas` | `#F4F5F2` (Cool Stone) | `#0F1412` (Forest Charcoal) | Primary viewport canvas |
| `--surface-elevated` | `#FFFFFF` | `#161D1A` | Upward sheet surface & cards |
| `--ink-primary` | `#121714` | `#F0F2EE` | Primary headings & body copy |
| `--ink-muted` | `#525C56` | `#8E9A93` | Secondary metadata & indices |
| `--border-hairline` | `rgba(18, 23, 20, 0.10)` | `rgba(240, 242, 238, 0.10)` | 1px editorial dividers |
| `--accent-emerald` | `#10B981` | `#10B981` | Cursor wash, active indicators, focus rings |

## 4. Data Schema (`src/types/portfolio.ts`)

```ts
export type SheetRouteId = 'websites' | 'apps' | 'about' | 'cv';
export type AppPlatform = 'macOS' | 'Windows' | 'Web' | 'Mobile';
export type AppStatus = 'Released' | 'In Progress';

export interface WebsiteProject {
  id: string;
  title: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  previewImage?: string;
  featured: boolean;
}

export interface AppProject {
  id: string;
  title: string;
  description: string;
  platform: AppPlatform;
  status: AppStatus;
  tags: string[];
  githubUrl: string;
}

export interface SocialLink {
  label: string;
  url: string;
  handle: string;
}

export interface ProfileInfo {
  name: string;
  tagline: string;
  availability: string;
  bio: string[];
  email: string;
  location: string;
  stack: { category: string; items: string[] }[];
  socials: SocialLink[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface CVData {
  summary: string;
  skills: { group: string; items: string[] }[];
  experience: ExperienceItem[];
  education: EducationItem[];
}
```

## 5. Strict Coding Guardrails
- **Design Restraint (`design-taste-frontend`):** Crisp editorial typography, generous whitespace, 1px hairline borders, and subtle micro-interactions. No sci-fi/terminal gimmicks, no neon gradients, no generic card clutter.
- **Frontend-Only Scope:** No backend, no CMS, no database, no contact form (use one-click Copy Email + direct social links).
- **No Heavy 3D / WebGL:** Cursor reactivity and transitions must use CSS/Motion composited properties (`transform`, `opacity`) only. Never animate `width`, `height`, `top`, `left`, or `margin`.
- **Clean Act 1 Hero:** Keep Act 1 strictly typographic and spacious (Name + optional subtle availability pill). All dense content belongs inside the 4 upward sheets.
- **TypeScript Hygiene:** Zero `any`, zero `@ts-ignore`, explicit return types on service and hook functions.
- **Accessibility First:** Full keyboard navigation (`Tab` order, `Esc` to close sheets, focus return to triggering row), ARIA dialog semantics on `UpwardSheet`, and `prefers-reduced-motion` compliance.
- **Iterative Delivery:** Implement and verify one sub-milestone at a time (2–5 files per step). Never dump the entire application in one pass.

## 6. CLI Verification Commands

Run these commands after every milestone before moving to the next:

```bash
npm run dev         # Start local Vite dev server for interactive motion & visual verification
npm run typecheck   # tsc --noEmit (strict TypeScript validation)
npm run lint        # ESLint check across src/
npm run build       # Production Vite bundle (tsc -b && vite build)
npm run preview     # Serve production dist/ locally to verify SPA routes & assets
```
