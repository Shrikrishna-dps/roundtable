# Technical Overview

Roundtable is built as a two-page interactive product presentation experience rather than a traditional static landing page. It showcases conceptual meeting-intelligence capabilities through animated workflows, reactive interface demonstrations, and smooth scroll transitions across a primary homepage (`/`) and a dedicated workflow walkthrough page (`/how-it-works`).

---

## Core Technologies

### Frontend: React 19 & TypeScript
The interface is built with React 19 and typed with TypeScript. TypeScript interfaces define all UI content, interactive states, and component properties to maintain type safety across the application without external data fetching.

### Build Tooling: Vite
Vite is used for local development and production bundling via `@vitejs/plugin-react`. It delivers fast Hot Module Replacement (HMR) during development and compiles an optimized static production bundle.

### Routing: React Router
Client-side routing is handled by React Router (`react-router-dom` v7). It manages seamless navigation between the homepage (`/`) and the "How It Works" page (`/how-it-works`), paired with a scroll listener that resets the viewport to the top on every route change.

### Animation: GSAP (GreenSock Animation Platform)
GSAP 3 powers choreographed UI animations, including the hero product demonstration window alternating between raw meeting dialogue and structured action cards, subtle ambient lighting shifts, and animated statistics counters.

### Scroll-Driven Motion: GSAP ScrollTrigger
ScrollTrigger pins sections and scrubs timelines directly against user scroll progress. Key implementations include "The Shift" (where dialogue fragments disperse and assemble into structured cards) and the cinematic 4-stage workflow demo that guides viewers through meeting capture, task extraction, Google Calendar scheduling, and Slack notification.

### Smooth Scrolling: Lenis
Lenis provides inertial smooth scrolling across the entire site. It is wrapped in a React context provider (`LenisProvider`) and synchronized with GSAP's animation ticker to ensure scroll positions and visual animations remain in lockstep.

### Styling: Custom CSS & Design Tokens
The visual design uses vanilla CSS organized around CSS custom properties (design tokens) for dark-mode surfaces, cyan and emerald accents, fluid typography (`clamp()`), and responsive spacing. No third-party utility or UI framework (such as Tailwind) is used.

---

## Interactive State & React Usage

React state (`useState`, `useRef`, `useEffect`) drives user-controlled interactive components:
- **Meeting Memory (`AskDemo`)**: Stores the active question index to display contextual answers, verbatim transcript quotes, and timestamps.
- **Pricing Calculator (`Pricing`)**: Toggles between monthly and annual billing rates with calculated discounts.
- **Feature Explorer (`FeatureExplorer`)**: Tracks active capability tabs. On first pass, tabs auto-advance on downward scroll; user click or reverse scrolling immediately cancels the scroll trigger and gives full manual state control to the visitor.
- **Navigation (`Nav`)**: Monitors scroll offset to toggle frosted glass background styling.

---

## Responsive & Mobile Adaptation

The application is responsive across desktop, tablet, and mobile viewports:
- Rather than shrinking desktop layouts, complex pinned interactions (such as the 4-stage workflow demo) adapt on viewports under 760px into a stacked vertical narrative using CSS flexbox.
- ScrollTrigger auto-advance in the Feature Explorer automatically disables on mobile and when `prefers-reduced-motion` is active, defaulting to clean manual touch/click navigation.
- Fluid typography and layout grids adapt cleanly across screen widths.

---

## High-Level Project Structure

```
f101/                          # Repository root (holds root package configuration)
├── docs/                      # Documentation and walkthrough assets
│   ├── SETUP.md               # Local development and build instructions
│   └── TECHNICAL_OVERVIEW.md  # Architecture and technology summary
├── node_modules/              # Project dependencies installed from root
├── package.json               # Authoritative dependencies and scripts
├── package-lock.json          # Dependency lockfile
└── roundtable-app/            # Application source code and Vite project
    ├── index.html             # HTML entry point
    ├── vite.config.ts         # Vite configuration
    ├── tsconfig*.json         # TypeScript configuration
    └── src/
        ├── App.tsx            # Root shell, router, and providers
        ├── main.tsx           # Application entry point
        ├── components/
        │   ├── home/          # Homepage sections (Hero, Shift, Memory, Pricing)
        │   ├── how-it-works/  # How It Works sections (FeatureExplorer, WorkflowDemo)
        │   └── layout/        # Shared chrome (Nav, Footer, LenisProvider, Background)
        ├── data/              # Static content, mock transcripts, and tier data
        └── styles/            # Design tokens and component stylesheets
```
