# Local Setup Guide

This guide explains how to install dependencies and run the Roundtable project locally.

---

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher (tested on Node.js v24.15.0)
- **npm**: v9.0.0 or higher (tested on npm v11.12.0)

> **Note**: This is a pure JavaScript/TypeScript application. Do not create a `requirements.txt` file or include Python dependencies, as doing so will cause hosting platforms like Vercel to misclassify the project.

---

## Repository Structure

The repository uses a single root package setup:
- **Root directory (`/`)**: Contains the authoritative `package.json`, `package-lock.json`, and root `node_modules/`. All npm commands are executed from here.
- **`roundtable-app/`**: Contains the application source code, Vite configuration, TypeScript configs, and static assets. The root npm scripts automatically delegate to this directory.

---

## Installation

Install dependencies from the repository root:

```bash
npm install
```

All dependencies (`react`, `react-dom`, `react-router-dom`, `gsap`, `lenis`, `vite`, `typescript`) are installed from the root `package.json`.

---

## Development Server

To start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Once running, the application will be available at:
```
http://localhost:5173/
```

---

## Production Build

To run the TypeScript compiler and compile an optimized production build into `roundtable-app/dist/`:

```bash
npm run build
```

This runs `cd roundtable-app && tsc -b && vite build`.

---

## Preview Production Build

To locally preview the production build generated in `roundtable-app/dist/`:

```bash
npm run preview
```

---

## Linting

To run ESLint checks across the codebase:

```bash
npm run lint
```

---

## Deployment

Roundtable is deployed on **Vercel** as a single-page application (SPA). Vercel reads the root `package.json`, runs `npm run build`, and serves the static production output from `roundtable-app/dist/`.
