# Next.js Migration — Design Spec

**Date:** 2026-06-07
**Status:** Approved
**Author:** Thabo Mponya (with Claude)

## Goal

Migrate the personal portfolio site from Create React App (CRA) to Next.js to
improve **performance** (SSG, image/font optimization, code-splitting) and
**SEO** (server-rendered HTML, native metadata, sitemap/robots conventions).

## Decisions (locked)

| Decision        | Choice                                  |
| --------------- | --------------------------------------- |
| Router          | App Router (Next 13+)                   |
| Language        | TypeScript                              |
| Rendering       | Static Site Generation (SSG)            |
| Contact form    | Client-side EmailJS (unchanged flow)    |
| Analytics       | `@next/third-parties` (GA)              |
| Migration style | In-place conversion of this repo        |
| Hosting         | Vercel (unchanged project)              |

## Current State (baseline)

- CRA single-page portfolio: React 18, `react-scripts` 5, Tailwind 3.
- 7 components composed in `src/App.js`: Header, Hero, About, Journey,
  Expertise, Contact, Footer.
- All 7 use `framer-motion` and/or interactivity (hooks, onClick, forms).
- SEO today: static meta tags in `public/index.html` + a runtime
  DOM-mutating `src/Components/Seo.js` (`useEffect` injects meta/JSON-LD).
- `scripts/generate-seo-files.js` runs as a `prebuild` step to emit
  `sitemap.xml` and `robots.txt`.
- Content lives in `src/content/resumeData.json`.
- Analytics via `react-ga` with a Universal Analytics ID (`UA-110570651-1`).
- Contact form uses `emailjs-com` with hardcoded service/template/user keys.
- Deployed to Vercel at `https://tmponya.vercel.app`.

## Target File Structure

```
app/
  layout.tsx          # <html>/<body>, next/font, metadata, JSON-LD, GA
  page.tsx            # composes the 7 sections (single page)
  globals.css         # from src/index.css (Tailwind directives + smooth scroll)
  sitemap.ts          # replaces generate-seo-files.js (sitemap)
  robots.ts           # replaces generate-seo-files.js (robots)
  components/
    Header.tsx  Hero.tsx  About.tsx  Journey.tsx
    Expertise.tsx  Contact.tsx  Footer.tsx   # all "use client"
  content/
    resumeData.ts     # typed export (was content/resumeData.json)
  lib/
    types.ts          # ResumeData interface
next.config.mjs
tsconfig.json
next-env.d.ts
tailwind.config.ts
postcss.config.mjs
public/               # unchanged (images, CV PDF, favicon, manifest)
```

**Deleted after migration:** `src/` tree, `public/index.html`, `src/index.js`,
`src/App.js`, `src/reportWebVitals.js`, `src/setupTests.js`, `src/App.test.js`,
`src/Components/Seo.js`, `scripts/generate-seo-files.js`.

## Component Conversion Plan

- Each `.js` → `.tsx`; add `"use client"` directive at top (all 7 need it).
- Type each component's props against interfaces in `lib/types.ts`.
- JSX, Tailwind classes, and component logic stay **identical** — low risk.
- `Hero`/`Contact` retain EmailJS + smooth-scroll logic verbatim.
- `App.js`'s `useEffect` GA init is removed (replaced by `@next/third-parties`).

## SEO Plan (core upgrade)

1. **Delete `Seo.js`.** Its responsibilities split into static, build-time output:
   - Title, description, keywords, robots, author, OpenGraph, Twitter, canonical
     → typed `export const metadata: Metadata` in `layout.tsx`.
   - `metadataBase` set to the site URL so OG/Twitter image paths resolve to
     absolute URLs automatically.
   - JSON-LD Person + WebSite structured data → server-rendered
     `<script type="application/ld+json">` in `layout.tsx`.
2. **`app/sitemap.ts`** and **`app/robots.ts`** replace the prebuild script using
   Next's native file conventions.
3. Env var rename: `REACT_APP_SITE_URL` → `NEXT_PUBLIC_SITE_URL`.

## Performance Plan

- **`next/image`** for the portrait/hero image: auto resize, lazy-load,
  WebP/AVIF, no layout shift.
- **`next/font`** for Plus Jakarta Sans + Lora: self-hosted, no render-blocking
  Google Fonts `@import`, no FOUT. Wired into Tailwind's `fontFamily` via CSS
  variables.
- SSG + automatic code-splitting; static HTML served from Vercel edge.

## Analytics Plan

- Remove `react-ga` and the `App.js` init effect.
- Add `<GoogleAnalytics gaId={...} />` from `@next/third-parties/google` in
  `layout.tsx`.
- **Note:** current ID is Universal Analytics (`UA-110570651-1`), which Google
  has sunset. Integration will be wired; a GA4 `G-XXXX` ID is needed for data.
  GA ID sourced from an env var (`NEXT_PUBLIC_GA_ID`).

## Dependencies

- **Add:** `next`, `typescript`, `@types/react`, `@types/react-dom`,
  `@types/node`, `@next/third-parties`.
- **Remove:** `react-scripts`, `react-ga`, `web-vitals`,
  `@testing-library/jest-dom`, `@testing-library/react`,
  `@testing-library/user-event`.
- **Keep:** `react`, `react-dom`, `framer-motion`, `lucide-react`,
  `emailjs-com`, `tailwindcss`.
- **Scripts:** `dev: next dev`, `build: next build`, `start: next start`,
  `lint: next lint`.

## Configuration

- `next.config.mjs` — minimal; image config if needed.
- `tsconfig.json` — Next.js defaults (strict mode, `jsx: preserve`, path alias
  `@/*` → project root).
- `tailwind.config.ts` — port existing colors/fonts; update `content` globs to
  `./app/**/*.{ts,tsx}`; wire `next/font` CSS variables into `fontFamily`.
- `postcss.config.mjs` — Tailwind + autoprefixer.

## Environment Variables (Vercel + local)

- `NEXT_PUBLIC_SITE_URL` = `https://tmponya.vercel.app`
- `NEXT_PUBLIC_GA_ID` = GA4 measurement ID (was `UA-110570651-1`)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`,
  `NEXT_PUBLIC_EMAILJS_USER_ID` (moved out of hardcoded source; same client-side
  exposure as today).

## Out of Scope (YAGNI)

- No multi-page routing — stays single-page with anchor-scroll navigation.
- No server-side contact form / email provider migration.
- No test framework re-setup (CRA tests were boilerplate).
- No design/visual changes — pure platform migration, pixel-identical output.

## Success Criteria

- `next build` produces a statically pre-rendered page; HTML response contains
  all section text (verifiable with `curl` / view-source).
- `<head>` contains title, description, OG/Twitter, canonical, and JSON-LD at
  build time (no JS execution required).
- `sitemap.xml` and `robots.txt` served at their routes.
- Visual output identical to current site across breakpoints.
- Contact form sends successfully; CV download works.
- Deploys cleanly on Vercel.
