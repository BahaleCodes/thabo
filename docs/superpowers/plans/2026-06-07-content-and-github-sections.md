# Repositioning + AI & GitHub Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **GIT NOTE:** The user handles ALL git operations. Do NOT run `git add/commit/checkout/push`. Where a step says "Checkpoint", pause for the user to review/commit if they wish.

**Goal:** Reposition the portfolio as an Azure Administrator & Software Engineer growing into Systems Architect, and add two new on-page sections — "Working with AI" (spec-driven workflow article) and "Featured Work" (5 curated GitHub repos enriched with live build-time data).

**Architecture:** Content lives in the typed `app/content/resumeData.ts`. A new server-side helper `app/lib/github.ts` fetches live repo metadata at build time; the Server Component `app/page.tsx` awaits it and passes data as props into two new client components (`AI.tsx`, `Projects.tsx`) for animated rendering. Repositioning is data + metadata edits.

**Tech Stack:** Next.js 16 App Router (SSG), React 19, TypeScript, Tailwind CSS 3, framer-motion, lucide-react, GitHub REST API.

---

## File Structure

- **Modify:** `app/lib/types.ts` (add `AiData`, `ProjectRepo`, `ProjectsData`, `FeaturedRepo`; extend `ResumeData`), `app/content/resumeData.ts` (repositioned copy + `ai` + `projects`), `app/layout.tsx` (metadata + JSON-LD), `app/page.tsx` (fetch + compose), `app/components/Header.tsx` (nav links).
- **Create:** `app/lib/github.ts` (`getFeaturedRepos`), `app/components/AI.tsx`, `app/components/Projects.tsx`.

---

## Task 1: Types for the new content

**Files:**
- Modify: `app/lib/types.ts`

- [ ] **Step 1: Append the new interfaces and extend `ResumeData`**

Add these interfaces to `app/lib/types.ts`:
```ts
export interface AiData {
  heading: string;
  paragraphs: string[];
  workflow: string[];
}

export interface ProjectRepo {
  slug: string;
  blurb: string;
  tags: string[];
  liveUrl: string;
}

export interface ProjectsData {
  heading: string;
  repos: ProjectRepo[];
}

// Curated repo enriched with live GitHub metadata at build time.
export interface FeaturedRepo {
  slug: string;
  blurb: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  language: string | null;
  pushedAt: string | null;
}
```

Then extend the existing `ResumeData` interface — add these two fields:
```ts
  ai: AiData;
  projects: ProjectsData;
```

- [ ] **Step 2: Type-check (will fail until Task 2 adds the data)**

Run: `yarn tsc --noEmit`
Expected: errors in `resumeData.ts` saying `ai`/`projects` are missing — this is expected and fixed in Task 2. (If errors appear in any OTHER file, investigate.)

- [ ] **Checkpoint** — user may commit.

---

## Task 2: Repositioned content + AI & projects data

**Files:**
- Modify: `app/content/resumeData.ts`

- [ ] **Step 1: Update `main.title` and `main.tagline`**

In `app/content/resumeData.ts`, set:
```ts
    title: "Azure Administrator & Software Engineer",
    tagline:
      "Azure administration and software engineering across C#/.NET and TypeScript — growing into systems architecture.",
```

- [ ] **Step 2: Replace `about.paragraphs` and `about.quote`** with the repositioned copy:
```ts
  about: {
    heading: "Philosophy & Approach",
    paragraphs: [
      "I'm an Azure administrator and software engineer. Day to day I keep cloud environments reliable, secure, and cost-aware, and I build the applications that run on them in C#/.NET and JavaScript/TypeScript.",
      "My focus is the craft of engineering: writing clear, maintainable code, automating the boring parts, and understanding the business context before I reach for a solution. I'm deliberately growing toward systems architecture — designing for resilience and growth, not just the next feature.",
      "I care about mentoring, engineering cultures rooted in ownership, and translating technical decisions into outcomes stakeholders can rally behind.",
    ],
    quote: {
      text: "Good architecture is earned one well-made decision at a time.",
    },
  },
```

- [ ] **Step 3: Replace `expertise.domains`** with the reordered set:
```ts
  expertise: {
    heading: "Domain Expertise",
    domains: [
      {
        title: "Azure Administration & Cloud",
        description:
          "Administering Azure environments for reliability, security, and cost efficiency — resources, identity, and delivery pipelines.",
        skills: ["Azure Administration", "Identity & Access", "Azure DevOps", "CI/CD Pipelines"],
      },
      {
        title: "Software Engineering",
        description:
          "Building backends and APIs in C#/.NET and reactive frontends in JavaScript/TypeScript across modern web stacks.",
        skills: ["C# .NET", "TypeScript", "React", "Vue.js", "Node.js"],
      },
      {
        title: "Systems & Architecture",
        description:
          "Growing into systems architecture: designing maintainable, scalable systems and sound API and data models.",
        skills: ["System Design", "API Architecture", "Database Design", "Performance"],
      },
      {
        title: "Engineering Practice",
        description:
          "Raising team quality through code review, mentorship, agile delivery, and AI-assisted, spec-driven development.",
        skills: ["Code Review", "Technical Mentorship", "Agile Delivery", "Spec-Driven Development"],
      },
    ],
  },
```

- [ ] **Step 4: Update `journey.milestones` highlights** to surface Azure/cloud admin. Replace the `highlights` arrays only (keep phase/role/organization/period/summary):
  - Milestone 1 (Bahale Codes, Software Developer): 
    ```ts
        highlights: [
          "Delivered production web applications for multiple clients",
          "Built a strong foundation across the full delivery lifecycle",
        ],
    ```
  - Milestone 2 (Digital Solution Foundry, Software Developer):
    ```ts
        highlights: [
          "Administer and maintain Azure cloud environments and CI/CD pipelines",
          "Build and ship applications in C#/.NET, Vue.js, and TypeScript",
          "Lead technical initiatives and mentor junior developers",
        ],
    ```
  - Milestone 3 (North-West University, BSc IT): leave highlights unchanged.

- [ ] **Step 5: Add the `ai` block** (place after `expertise`, before `analytics`):
```ts
  ai: {
    heading: "Working with AI",
    paragraphs: [
      "I treat AI as an engineering collaborator, not an autocomplete. My workflow is spec-driven: before writing code, I work with Claude and ChatGPT to brainstorm the problem, pin down requirements, and write a clear specification.",
      "From that spec I generate an implementation plan broken into small, reviewable tasks, then build against it — using the models to draft, refactor, and review while I own the architecture and the decisions. This very site was rebuilt in Next.js exactly this way.",
      "The result is speed without losing rigor: specs catch ambiguity early, plans keep scope honest, and AI-assisted review lifts code quality.",
    ],
    workflow: ["Brainstorm", "Spec", "Plan", "Implement", "Review"],
  },
```

- [ ] **Step 6: Add the `projects` block** (after `ai`):
```ts
  projects: {
    heading: "Featured Work",
    repos: [
      {
        slug: "Julius",
        blurb:
          "Privacy-first personal-finance PWA — tracks bills, debts, subscriptions and income, and imports FNB/ABSA bank-statement PDFs (even scanned or password-protected) to reconcile spending automatically. Offline-capable and installable, with optional AI financial check-ins.",
        tags: ["Next.js", "TypeScript", "Supabase", "PWA", "AI"],
        liveUrl: "https://julius-omega.vercel.app",
      },
      {
        slug: "apex_motus",
        blurb:
          "Production corporate holding-company site on Next.js 14, with serverless route handlers powering contact email and an AI diagnostics tool built on the OpenAI Responses API.",
        tags: ["Next.js", "TypeScript", "OpenAI", "Serverless"],
        liveUrl: "https://apex-motus.vercel.app",
      },
      {
        slug: "scanYa",
        blurb:
          "Booking-first platform built as a monorepo over PostgreSQL — asset listing, availability lookup by asset and date, and conflict-checked booking requests with owner-side management.",
        tags: ["TypeScript", "PostgreSQL", "Monorepo", "REST"],
        liveUrl: "https://scan-ya-api.vercel.app",
      },
      {
        slug: "ClinicOS",
        blurb:
          "Healthcare management system centred on patient queue and appointment management, with a companion admin portal for clinic staff.",
        tags: ["TypeScript", "Next.js", "Healthcare"],
        liveUrl: "https://clinic-os-ui.vercel.app",
      },
      {
        slug: "dopest",
        blurb:
          "Responsive studio site for a photography & media-production brand — a content-driven portfolio with modal gallery and image viewer.",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        liveUrl: "https://dopest-phi.vercel.app",
      },
    ],
  },
```

- [ ] **Step 7: Type-check passes now**

Run: `yarn tsc --noEmit`
Expected: zero errors (the data now satisfies the extended `ResumeData`).

- [ ] **Checkpoint** — user may commit.

---

## Task 3: GitHub build-time fetch helper

**Files:**
- Create: `app/lib/github.ts`

- [ ] **Step 1: Create `app/lib/github.ts`**

```ts
import resumeData from "@/app/content/resumeData";
import type { FeaturedRepo, ProjectRepo } from "@/app/lib/types";

const GITHUB_USER = "ThaboMollo";

interface GitHubRepoResponse {
  language: string | null;
  pushed_at: string | null;
  html_url: string;
}

async function fetchRepo(repo: ProjectRepo): Promise<FeaturedRepo> {
  const fallbackUrl = `https://github.com/${GITHUB_USER}/${repo.slug}`;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repo.slug}`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status} for ${repo.slug}`);
    }
    const data = (await res.json()) as GitHubRepoResponse;
    return {
      slug: repo.slug,
      blurb: repo.blurb,
      tags: repo.tags,
      liveUrl: repo.liveUrl,
      githubUrl: data.html_url || fallbackUrl,
      language: data.language ?? null,
      pushedAt: data.pushed_at ?? null,
    };
  } catch (error) {
    console.warn(
      `[github] Falling back to curated data for ${repo.slug}:`,
      error instanceof Error ? error.message : error
    );
    return {
      slug: repo.slug,
      blurb: repo.blurb,
      tags: repo.tags,
      liveUrl: repo.liveUrl,
      githubUrl: fallbackUrl,
      language: null,
      pushedAt: null,
    };
  }
}

export async function getFeaturedRepos(): Promise<FeaturedRepo[]> {
  return Promise.all(resumeData.projects.repos.map(fetchRepo));
}
```

- [ ] **Step 2: Type-check**

Run: `yarn tsc --noEmit`
Expected: zero errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 4: "Working with AI" component

**Files:**
- Create: `app/components/AI.tsx`

- [ ] **Step 1: Create `app/components/AI.tsx`** (client component, matches existing section styling: `max-w-*` container, `py-24`, framer-motion `whileInView`, Tailwind tokens `cream/charcoal/slate/amber`)

```tsx
"use client";

import { motion } from "framer-motion";
import type { AiData } from "@/app/lib/types";

function AI({ data }: { data: AiData }) {
  if (!data) return null;

  return (
    <section id="ai" className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-1 bg-amber mb-8" />
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
            {data.heading}
          </h2>

          <div className="space-y-5">
            {data.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg text-slate leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {data.workflow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-charcoal text-cream">
                  {step}
                </span>
                {i < data.workflow.length - 1 && (
                  <span className="text-amber" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AI;
```

- [ ] **Step 2: Type-check**

Run: `yarn tsc --noEmit`
Expected: zero errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 5: "Featured Work" component

**Files:**
- Create: `app/components/Projects.tsx`

- [ ] **Step 1: Create `app/components/Projects.tsx`** (client, presentational; receives enriched repos via props)

```tsx
"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { FeaturedRepo } from "@/app/lib/types";

function formatUpdated(pushedAt: string | null): string | null {
  if (!pushedAt) return null;
  const date = new Date(pushedAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function Projects({
  heading,
  repos,
}: {
  heading: string;
  repos: FeaturedRepo[];
}) {
  if (!repos?.length) return null;

  return (
    <section id="work" className="py-24 bg-warmgrey/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-1 bg-amber mb-8" />
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-12">
            {heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => {
            const updated = formatUpdated(repo.pushedAt);
            return (
              <motion.article
                key={repo.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col bg-cream border border-warmgrey rounded-lg p-6 hover:shadow-sm transition-shadow"
              >
                <h3 className="text-lg font-semibold text-charcoal">
                  {repo.slug}
                </h3>

                <p className="mt-3 text-sm text-slate leading-relaxed flex-grow">
                  {repo.blurb}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded bg-warmgrey text-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {(repo.language || updated) && (
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate/80">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber" />
                        {repo.language}
                      </span>
                    )}
                    {updated && <span>Updated {updated}</span>}
                  </div>
                )}

                <div className="mt-5 flex items-center gap-5 pt-4 border-t border-warmgrey">
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-amber transition-colors"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href={repo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-amber transition-colors"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
```

- [ ] **Step 2: Type-check**

Run: `yarn tsc --noEmit`
Expected: zero errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 6: Compose the page (fetch + new sections)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`** with the async version that fetches repos and renders the new sections in order:

```tsx
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Journey from "@/app/components/Journey";
import Expertise from "@/app/components/Expertise";
import Projects from "@/app/components/Projects";
import AI from "@/app/components/AI";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import data from "@/app/content/resumeData";
import { getFeaturedRepos } from "@/app/lib/github";

export default async function Home() {
  const repos = await getFeaturedRepos();

  return (
    <>
      <Header />
      <main>
        <Hero data={data.main} />
        <About data={data.about} />
        <Journey data={data.journey} />
        <Expertise data={data.expertise} />
        <Projects heading={data.projects.heading} repos={repos} />
        <AI data={data.ai} />
        <Contact data={data.main} />
      </main>
      <Footer data={data.main} />
    </>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `yarn tsc --noEmit`
Expected: zero errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 7: Navigation links

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Update the `navLinks` array** in `app/components/Header.tsx` to include the new sections (the existing scroll logic uses `href` as the element id):

```tsx
const navLinks = [
  { label: "About", href: "about" },
  { label: "Journey", href: "journey" },
  { label: "Expertise", href: "expertise" },
  { label: "Work", href: "work" },
  { label: "Approach", href: "ai" },
  { label: "Contact", href: "contact" },
];
```

> Note: confirm the existing section components render matching `id`s — `About` → `id="about"`, `Journey` → `id="journey"`, `Expertise` → `id="expertise"`, `Contact` → `id="contact"`. The new `Projects` uses `id="work"` and `AI` uses `id="ai"` (Tasks 4 & 5). If any existing section's wrapper lacks its `id`, add it (read the component first).

- [ ] **Step 2: Type-check**

Run: `yarn tsc --noEmit`
Expected: zero errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 8: Repositioned metadata & JSON-LD

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the title/description constants** in `app/layout.tsx`:

```tsx
const TITLE =
  "Thabo Mponya | Azure Administrator & Software Engineer";
const DESCRIPTION =
  "Thabo Mponya — a Johannesburg-based Azure administrator and software engineer (C#/.NET, JavaScript/TypeScript), growing into systems architecture.";
```

- [ ] **Step 2: Update the JSON-LD `jobTitle` and `knowsAbout`** in the `jsonLd` Person object:

```tsx
    jobTitle: "Azure Administrator & Software Engineer",
```
and
```tsx
    knowsAbout: [
      "Azure Administration",
      "Cloud Infrastructure",
      "C# .NET",
      "TypeScript",
      "JavaScript",
      "React",
      "Vue.js",
      "Systems Architecture",
    ],
```

> Leave `metadataBase`, openGraph, twitter, icons, fonts, and GA wiring unchanged — they reference `TITLE`/`DESCRIPTION` and update automatically.

- [ ] **Step 3: Type-check**

Run: `yarn tsc --noEmit`
Expected: zero errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 9: Build, fetch, and render verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `yarn build`
Expected: succeeds; `/` listed as Static (`○`). The build performs the 5 GitHub fetches. Watch for any `[github] Falling back` warnings (acceptable — means fallback worked).

- [ ] **Step 2: Verify the new sections render server-side**

Run: `yarn start > /tmp/next.log 2>&1 &` then `sleep 4`, then:
```bash
/usr/bin/curl -s http://localhost:3000 | grep -c "Featured Work"      # expect >=1
/usr/bin/curl -s http://localhost:3000 | grep -c "Working with AI"    # expect >=1
/usr/bin/curl -s http://localhost:3000 | grep -c "Azure Administrator" # expect >=1 (repositioning)
/usr/bin/curl -s http://localhost:3000 | grep -c "julius-omega.vercel.app" # expect >=1 (live link)
```
Expected: each count ≥ 1.

- [ ] **Step 3: Verify live GitHub enrichment landed**

Run: `/usr/bin/curl -s http://localhost:3000 | grep -oE "Updated [A-Z][a-z]{2} [0-9]{4}" | head -3`
Expected: at least one "Updated <Mon> <Year>" string (proves live `pushed_at` was fetched and formatted). If empty, the API may have been rate-limited at build — re-build once and recheck; fallback (no meta line) is acceptable but note it.

- [ ] **Step 4: Verify repositioned title**

Run: `/usr/bin/curl -s http://localhost:3000 | grep -o '<title>[^<]*</title>'`
Expected: `<title>Thabo Mponya | Azure Administrator & Software Engineer</title>`

- [ ] **Step 5: Stop the server**

Run: `kill %1` (ensure no stray `next start` remains).

- [ ] **Checkpoint** — user does final commit / deploy.

---

## Post-Implementation Notes (for the summary)

- The GitHub fetch is unauthenticated (60 req/hr); 5 calls per build is safe. If builds ever get rate-limited, add a `GITHUB_TOKEN` env var and an `Authorization` header in `app/lib/github.ts`.
- Repo stats refresh on each deploy (build-time SSG), not continuously.
- All new content (article + blurbs) is drafted copy — the user should review wording in `resumeData.ts` before deploying.
