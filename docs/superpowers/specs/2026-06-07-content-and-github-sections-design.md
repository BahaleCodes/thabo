# Repositioning + AI & GitHub Sections — Design Spec

**Date:** 2026-06-07
**Status:** Approved
**Author:** Thabo Mponya (with Claude)

## Goal

Three additions to the Next.js portfolio:
1. **Reposition** the site as a skilled **Azure Administrator** and experienced
   **C#/.NET & JavaScript/TypeScript Software Engineer**, growing into **Systems
   Architect**.
2. Add a **"Working with AI"** section — a short article on the author's
   spec-driven development workflow with Claude & ChatGPT.
3. Add a **"Featured Work"** section that pulls 5 curated GitHub repos
   (live-fetched at build time) with authored descriptions.

## Decisions (locked)

| Decision            | Choice                                                       |
| ------------------- | ------------------------------------------------------------ |
| Positioning         | Azure Admin + Software Engineer (C#/.NET + JS/TS) → Architect |
| Featured repos      | Curated 5: Julius, apex_motus, scanYa, ClinicOS, dopest      |
| Repo data source    | Live-fetch from GitHub API at **build time** (SSG)           |
| Prose authorship    | Claude drafts; user reviews/edits                            |
| Section placement   | On-page sections (single page preserved)                     |

## Section 1 — Repositioning (content + metadata)

Edits to `app/content/resumeData.ts` and `app/layout.tsx`. No structural change.

- **`main.title`:** `Azure Administrator & Software Engineer`
- **`main.tagline`:** `Azure administration and software engineering across C#/.NET and TypeScript — growing into systems architecture.`
- **`about.paragraphs`:** reframe from the "developer → architect journey" to a
  grounded present: a skilled Azure administrator who keeps cloud environments
  reliable and secure; an experienced C#/.NET and JS/TS engineer; deliberately
  growing toward systems architecture. Retain the mentorship/craftsmanship voice.
  `about.quote` may stay or be lightly updated to fit.
- **`expertise.domains`** reordered/relabeled to:
  1. **Azure Administration & Cloud** — managing Azure resources, identity,
     DevOps pipelines, reliability and cost.
  2. **Software Engineering** — C#/.NET backends & APIs; JavaScript/TypeScript
     with React, Vue.js, Next.js.
  3. **Systems & Architecture** (growth) — designing maintainable systems, API
     and database design; framed as a growing capability.
  4. **Engineering Practice** — code review, mentorship, agile delivery, and
     AI-assisted/spec-driven development.
- **`journey.milestones[].highlights`:** tweak to surface Azure/cloud admin work
  (keep the three milestones and their roles/periods).
- **`layout.tsx` metadata:** `<title>` and description updated to the new
  positioning; JSON-LD `jobTitle` → `Azure Administrator & Software Engineer`;
  `knowsAbout` → `["Azure Administration", "Cloud Infrastructure", "C# .NET",
  "TypeScript", "JavaScript", "React", "Vue.js", "Systems Architecture"]`.

## Section 2 — "Working with AI"

New content in `resumeData.ts` under `ai`, rendered by a new client component
`app/components/AI.tsx`.

**Data shape:**
```ts
ai: {
  heading: string;        // "Working with AI"
  paragraphs: string[];   // the article (3 paragraphs, draft below)
  workflow: string[];     // ["Brainstorm","Spec","Plan","Implement","Review"]
}
```

**Draft article copy (user to review/edit):**
1. "I treat AI as an engineering collaborator, not an autocomplete. My workflow
   is spec-driven: before writing code, I work with Claude and ChatGPT to
   brainstorm the problem, pin down requirements, and write a clear
   specification."
2. "From that spec I generate an implementation plan broken into small,
   reviewable tasks, then build against it — using the models to draft, refactor
   and review while I own the architecture and the decisions. (This very site
   was rebuilt in Next.js exactly this way.)"
3. "The result is speed without losing rigor: specs catch ambiguity early, plans
   keep scope honest, and AI-assisted review lifts code quality."

**Rendering:** heading + paragraphs + a horizontal "chip" row of `workflow`
steps (Brainstorm → Spec → Plan → Implement → Review). framer-motion
`whileInView` entrance consistent with other sections. Section `id="ai"`.

## Section 3 — "Featured Work" (GitHub)

New content in `resumeData.ts` under `projects`, a build-time fetch helper
`app/lib/github.ts`, and a presentational client component
`app/components/Projects.tsx`.

**Curated data shape:**
```ts
projects: {
  heading: string;        // "Featured Work"
  repos: Array<{
    slug: string;         // GitHub repo name under ThaboMollo
    blurb: string;        // authored description
    tags: string[];       // tech tags
    liveUrl: string;      // Vercel demo URL
  }>;
}
```

**Curated repos (slug + blurb + tags + liveUrl):**
- **Julius** — "Privacy-first personal-finance PWA — tracks bills, debts,
  subscriptions and income, and imports FNB/ABSA bank-statement PDFs (even
  scanned or password-protected) to reconcile spending automatically.
  Offline-capable and installable, with optional AI financial check-ins."
  Tags: `Next.js, TypeScript, Supabase, PWA, AI`. Live:
  `https://julius-omega.vercel.app`
- **apex_motus** — "Production corporate holding-company site on Next.js 14,
  with serverless route handlers powering contact email and an AI diagnostics
  tool built on the OpenAI Responses API." Tags: `Next.js, TypeScript, OpenAI,
  Serverless`. Live: `https://apex-motus.vercel.app`
- **scanYa** — "Booking-first platform built as a monorepo over PostgreSQL —
  asset listing, availability lookup by asset and date, and conflict-checked
  booking requests with owner-side management." Tags: `TypeScript, PostgreSQL,
  Monorepo, REST`. Live: `https://scan-ya-api.vercel.app`
- **ClinicOS** — "Healthcare management system centred on patient queue and
  appointment management, with a companion admin portal for clinic staff."
  Tags: `TypeScript, Next.js, Healthcare`. Live:
  `https://clinic-os-ui.vercel.app`
- **dopest** — "Responsive studio site for a photography & media-production
  brand — a content-driven portfolio with modal gallery and image viewer."
  Tags: `Next.js, TypeScript, Tailwind`. Live: `https://dopest-phi.vercel.app`

**Build-time fetch — `app/lib/github.ts`:**
```ts
// getFeaturedRepos(): merges curated data with live GitHub metadata.
// For each curated repo, fetch https://api.github.com/repos/ThaboMollo/<slug>
// reading { language, pushed_at, html_url }. Returns an enriched array.
// Resilience: per-repo try/catch — on any error, fall back to curated fields
// only (language=null, pushedAt=null, githubUrl derived as
// `https://github.com/ThaboMollo/<slug>`). The build never fails on API error.
// fetch uses Next default caching (force-cache) so it runs at build for SSG.
```
Enriched repo type:
```ts
interface FeaturedRepo {
  slug: string;
  blurb: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;       // from html_url or derived
  language: string | null; // live
  pushedAt: string | null; // live ISO date
}
```

**Rendering — `app/components/Projects.tsx` (client, props-driven):**
Receives `repos: FeaturedRepo[]` and `heading`. Renders a responsive card grid.
Each card: repo name, blurb, tag pills, a meta line showing `language` and
"Updated {Month Year}" (formatted from `pushedAt`, hidden if null), and two
links — **GitHub** (`githubUrl`) and **Live** (`liveUrl`), `rel="noopener
noreferrer"`. Stars omitted (all repos are 0). framer-motion entrance.
Section `id="work"`.

**Data flow:** `app/page.tsx` is a Server Component — it calls
`const repos = await getFeaturedRepos()` at build and passes `repos` plus the
curated `heading` as props to `<Projects />`. No client-side fetching; no API
token (public repos, 5 calls per build, well under the 60/hr unauth limit).

## Composition & Navigation

- **`app/page.tsx`** order: `Header → main[ Hero, About, Journey, Expertise,
  Projects, AI, Contact ] → Footer`. `Projects` receives fetched `repos`; `AI`
  receives `data.ai`.
- **`app/components/Header.tsx`** nav links become: About, Journey, Expertise,
  **Work** (`work`), **Approach** (`ai`), Contact.

## Files

- **Modify:** `app/content/resumeData.ts`, `app/lib/types.ts`,
  `app/layout.tsx`, `app/page.tsx`, `app/components/Header.tsx`
- **Create:** `app/lib/github.ts`, `app/components/AI.tsx`,
  `app/components/Projects.tsx`

## Error Handling

- GitHub fetch: per-repo try/catch; fall back to curated static fields and a
  derived `githubUrl`; `console.warn` the failure. Build must not break.
- `Projects.tsx`: render gracefully when `language`/`pushedAt` are null (omit the
  meta line or the missing piece).

## Out of Scope (YAGNI)

- No separate blog/route for the AI article — it's an on-page section.
- No GitHub auth token / private repos.
- No star counts, contribution graphs, or pinned-repo auto-discovery.
- No runtime/ISR revalidation — stats refresh on each deploy (build-time).
- No visual redesign — new sections reuse existing Tailwind tokens and motion
  patterns.

## Success Criteria

- Hero, metadata, and JSON-LD reflect the Azure Admin + Software Engineer →
  Architect positioning.
- "Working with AI" section renders the article + workflow chips.
- "Featured Work" shows all 5 repos with authored blurbs, tags, live
  language/last-updated, and working GitHub + Live links.
- `yarn build` succeeds (including a simulated GitHub API failure → graceful
  fallback) and the page prerenders as Static.
- Nav links scroll to the new sections.
