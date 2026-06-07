# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **GIT NOTE:** The user handles ALL git operations (branching, commits, pushes). Do NOT run `git add`, `git commit`, `git checkout`, or `git push`. Where this plan says "Checkpoint", pause so the user can review and commit if they choose.

**Goal:** Migrate the portfolio from Create React App to Next.js (App Router, TypeScript, SSG) for improved performance and SEO, with pixel-identical output.

**Architecture:** In-place conversion of this repo. A root `app/layout.tsx` holds `<html>`/`<body>`, fonts, build-time metadata, JSON-LD, and analytics. `app/page.tsx` composes the seven existing section components (all marked `"use client"` for framer-motion/interactivity, but still pre-rendered to static HTML). SEO meta moves from a runtime DOM-mutating component into Next's native Metadata API; `sitemap.ts`/`robots.ts` replace the prebuild script.

**Tech Stack:** Next.js (App Router), React 18, TypeScript, Tailwind CSS 3, framer-motion, lucide-react, emailjs-com, `@next/third-parties` (GA), `next/font`, `next/image`.

---

## File Structure

**Create:**
- `next.config.mjs`, `tsconfig.json`, `next-env.d.ts`, `postcss.config.mjs`, `tailwind.config.ts`
- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/sitemap.ts`, `app/robots.ts`
- `app/lib/types.ts`, `app/content/resumeData.ts`
- `app/components/{Header,Hero,About,Journey,Expertise,Contact,Footer}.tsx`
- `.env.local` (local dev), `.env.example` (documentation)

**Delete (Task 9, after build proven):**
- `src/` (entire tree), `public/index.html`, `scripts/generate-seo-files.js`, root `tailwind.config.js`

**Unchanged:** `public/images/`, `public/*.pdf`, `public/*.ico`, `public/favicon.ico`, `public/manifest.json`, `public/logo*.png`.

---

## Task 1: Dependencies & package.json scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove CRA-only dependencies**

Run:
```bash
yarn remove react-scripts react-ga web-vitals @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

- [ ] **Step 2: Add Next.js + TypeScript dependencies**

Run:
```bash
yarn add next @next/third-parties
yarn add -D typescript @types/react @types/react-dom @types/node
```

- [ ] **Step 3: Replace the `scripts` and `eslintConfig`/`browserslist` blocks in `package.json`**

Set `scripts` to:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```
Delete the `prebuild`, CRA `eslintConfig`, and `browserslist` blocks. Keep `name`, `version`, `private`, `engines`.

- [ ] **Step 4: Verify install**

Run: `yarn install && yarn next --version`
Expected: prints a Next.js version (e.g. `15.x`), no errors.

- [ ] **Checkpoint** — user may commit "chore: swap CRA deps for Next.js".

---

## Task 2: Next.js & TypeScript config files

**Files:**
- Create: `next.config.mjs`, `tsconfig.json`, `next-env.d.ts`, `postcss.config.mjs`, `tailwind.config.ts`

- [ ] **Step 1: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 5: Create `tailwind.config.ts`** (ports existing colors; updates content globs; wires `next/font` CSS variables)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF7",
        warmgrey: "#E8E6E1",
        charcoal: "#1C1C1E",
        slate: "#4A4A4A",
        amber: "#C8973E",
        "amber-light": "#D4A84B",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Checkpoint** — verify `yarn add -D autoprefixer` is present (CRA had it transitively; add if `yarn list autoprefixer` is empty). User may commit.

---

## Task 3: Global CSS

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Create `app/globals.css`** (Tailwind directives + smooth scroll; the Google Fonts `@import` is intentionally removed — fonts come from `next/font` in Task 5)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Verify** the original `src/index.css` had no other rules beyond the font `@import`, Tailwind directives, and `scroll-behavior`. If it has additional custom rules below line 9, copy them into `app/globals.css` verbatim.

Run: `cat src/index.css`
Expected: confirm no rules were dropped.

- [ ] **Checkpoint** — user may commit.

---

## Task 4: Types & typed content module

**Files:**
- Create: `app/lib/types.ts`
- Create: `app/content/resumeData.ts`

- [ ] **Step 1: Create `app/lib/types.ts`** (models the exact shape of `resumeData.json`)

```ts
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface MainData {
  name: string;
  title: string;
  tagline: string;
  image: string;
  email: string;
  phone: string;
  location: string;
  resumedownload: string;
  contactmessage: string;
  social: SocialLink[];
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  quote: { text: string };
}

export interface Milestone {
  phase: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface JourneyData {
  heading: string;
  milestones: Milestone[];
}

export interface ExpertiseDomain {
  title: string;
  description: string;
  skills: string[];
}

export interface ExpertiseData {
  heading: string;
  domains: ExpertiseDomain[];
}

export interface ResumeData {
  main: MainData;
  about: AboutData;
  journey: JourneyData;
  expertise: ExpertiseData;
  analytics: { trackingId: string };
}
```

- [ ] **Step 2: Create `app/content/resumeData.ts`** — copy the full object from `src/content/resumeData.json` into a typed export.

```ts
import type { ResumeData } from "@/app/lib/types";

const resumeData: ResumeData = {
  // ⬇️ paste the entire JSON object from src/content/resumeData.json here, verbatim
};

export default resumeData;
```

Run: `cat src/content/resumeData.json` and paste its contents as the object literal.

- [ ] **Step 3: Verify types compile**

Run: `yarn tsc --noEmit`
Expected: no errors (proves the data matches `ResumeData`).

- [ ] **Checkpoint** — user may commit.

---

## Task 5: Root layout (fonts, metadata, JSON-LD, analytics)

**Files:**
- Create: `app/layout.tsx`

This file absorbs everything from `public/index.html` `<head>` and `src/Components/Seo.js`.

- [ ] **Step 1: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import resumeData from "@/app/content/resumeData";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tmponya.vercel.app";
const TITLE =
  "Thabo Mponya | Technology Leader, Systems Architect, Full-Stack Engineer";
const DESCRIPTION =
  "Official website of Thabo Mponya, a Johannesburg-based technology leader and systems architect focused on scalable systems, technical leadership, and full-stack engineering.";
const IMAGE = "/images/ThaboMponya.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Thabo Mponya" }],
  applicationName: "Thabo Mponya",
  keywords: [
    "Thabo Mponya",
    "technology leader",
    "systems architect",
    "full-stack engineer",
    "Johannesburg software developer",
    "South Africa software engineer",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{ url: IMAGE, alt: "Portrait of Thabo Mponya" }],
    firstName: "Thabo",
    lastName: "Mponya",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  icons: {
    icon: "/mponya.ico",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resumeData.main.name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${IMAGE}`,
    email: resumeData.main.email,
    telephone: resumeData.main.phone,
    jobTitle: resumeData.main.title,
    description: DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Johannesburg",
      addressCountry: "ZA",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: "North-West University" },
    worksFor: { "@type": "Organization", name: "Digital Solution Foundry" },
    sameAs: resumeData.main.social.map((s) => s.url),
    knowsAbout: [
      "Systems Architecture",
      "Technical Leadership",
      "Full-Stack Engineering",
      "Cloud Infrastructure",
      "React",
      "Vue.js",
      "C# .NET",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: resumeData.main.name,
    url: `${SITE_URL}/`,
    description: DESCRIPTION,
  },
];

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${lora.variable}`}>
      <head>
        <meta name="theme-color" content="#FAFAF7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream font-sans">
        {children}
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `yarn tsc --noEmit`
Expected: no errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 6: Convert the four static section components

These four use `framer-motion` but no hooks/forms. Conversion is mechanical: copy the existing file, add `"use client"` as line 1, rename to `.tsx`, and type the props.

**Files:**
- Create: `app/components/Header.tsx`, `app/components/About.tsx`, `app/components/Journey.tsx`, `app/components/Expertise.tsx`, `app/components/Footer.tsx`

> (Header & Footer take `MainData`; About takes `AboutData`; Journey takes `JourneyData`; Expertise takes `ExpertiseData`. That's five files — Header and Footer both consume `data.main`.)

- [ ] **Step 1: For each component**, copy `src/Components/<Name>.js` → `app/components/<Name>.tsx`, then:
  1. Add `"use client";` as the very first line.
  2. Remove `import React from "react";` (not needed in Next App Router) but keep `import { motion } from "framer-motion";` and any `lucide-react` imports.
  3. Replace the untyped `function X({ data })` signature with a typed one (see Step 2).
  4. Leave ALL JSX and Tailwind classes unchanged.

- [ ] **Step 2: Apply these exact prop types** (add the matching `import type` at the top of each file):

```tsx
// Header.tsx
import type { MainData } from "@/app/lib/types";
function Header({ data }: { data: MainData }) { /* ...unchanged body... */ }

// Footer.tsx
import type { MainData } from "@/app/lib/types";
function Footer({ data }: { data: MainData }) { /* ...unchanged body... */ }

// About.tsx
import type { AboutData } from "@/app/lib/types";
function About({ data }: { data: AboutData }) { /* ...unchanged body... */ }

// Journey.tsx
import type { JourneyData } from "@/app/lib/types";
function Journey({ data }: { data: JourneyData }) { /* ...unchanged body... */ }

// Expertise.tsx
import type { ExpertiseData } from "@/app/lib/types";
function Expertise({ data }: { data: ExpertiseData }) { /* ...unchanged body... */ }
```

Keep each file's existing `export default <Name>;`.

- [ ] **Step 3: Verify type-check**

Run: `yarn tsc --noEmit`
Expected: no errors. If a component reads a field not in its type, that's a real bug — fix the type or the access.

- [ ] **Checkpoint** — user may commit.

---

## Task 7: Convert Hero (with next/image)

**Files:**
- Create: `app/components/Hero.tsx`

- [ ] **Step 1: Create `app/components/Hero.tsx`** by copying `src/Components/Hero.js` and applying: `"use client"`, typed props, drop `import React`.

```tsx
"use client";

import { motion } from "framer-motion";
import type { MainData } from "@/app/lib/types";

function Hero({ data }: { data: MainData }) {
  if (!data) return null;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // ⬇️ paste the EXACT JSX from src/Components/Hero.js return(...) here, unchanged
  );
}

export default Hero;
```

> The current Hero has no `<img>` — the portrait is referenced in metadata/JSON-LD only. **If** during visual QA you find an image should appear here, use `next/image`:
> ```tsx
> import Image from "next/image";
> <Image src="/images/ThaboMponya.jpg" alt="Portrait of Thabo Mponya" width={480} height={480} priority />
> ```
> Otherwise leave Hero markup identical to the original.

- [ ] **Step 2: Verify type-check**

Run: `yarn tsc --noEmit`
Expected: no errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 8: Convert Contact (env vars for EmailJS)

**Files:**
- Create: `app/components/Contact.tsx`

- [ ] **Step 1: Create `app/components/Contact.tsx`** from `src/Components/Contact.js` with `"use client"`, typed props, and EmailJS keys read from env vars instead of hardcoded strings.

Top of file:
```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, MapPin, FileDown } from "lucide-react";
import type { MainData } from "@/app/lib/types";

function Contact({ data }: { data: MainData }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"sending" | "success" | "error" | null>(null);

  if (!data) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name: form.name,
      to_name: "Ntate Thabo Mponya",
      subject: form.subject,
      message_html: form.message,
      from_email: form.email,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    // ⬇️ paste the EXACT JSX from src/Components/Contact.js return(...) here, unchanged
  );
}

export default Contact;
```

- [ ] **Step 2: Verify type-check**

Run: `yarn tsc --noEmit`
Expected: no errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 9: Page composition

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create `app/page.tsx`** (mirrors `src/App.js`'s composition; no `<Seo>`, no GA effect — those moved to layout)

```tsx
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Journey from "@/app/components/Journey";
import Expertise from "@/app/components/Expertise";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import data from "@/app/content/resumeData";

export default function Home() {
  return (
    <>
      <Header data={data.main} />
      <main>
        <Hero data={data.main} />
        <About data={data.about} />
        <Journey data={data.journey} />
        <Expertise data={data.expertise} />
        <Contact data={data.main} />
      </main>
      <Footer data={data.main} />
    </>
  );
}
```

> Note: the `min-h-screen bg-cream font-sans` wrapper from `App.js` now lives on `<body>` in `layout.tsx`, so it's not repeated here.

- [ ] **Step 2: Verify type-check**

Run: `yarn tsc --noEmit`
Expected: no errors.

- [ ] **Checkpoint** — user may commit.

---

## Task 10: SEO routes (sitemap + robots)

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tmponya.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tmponya.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Checkpoint** — user may commit.

---

## Task 11: Environment variables

**Files:**
- Create: `.env.local`, `.env.example`
- Modify/Delete: `.env.production`

- [ ] **Step 1: Create `.env.local`** (real values for local dev; gitignored already via `.env.local`)

```
NEXT_PUBLIC_SITE_URL=https://tmponya.vercel.app
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_ymndnah
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_bwg2p3c
NEXT_PUBLIC_EMAILJS_USER_ID=user_iyyo8AYtN3opeCzdbnjvS
```

> `NEXT_PUBLIC_GA_ID` is left blank: the existing `UA-110570651-1` is Universal Analytics (sunset). Fill a GA4 `G-XXXX` ID to enable analytics. Blank = GA simply not rendered (handled in layout).

- [ ] **Step 2: Create `.env.example`** (committed reference, no secrets needed — these are all public client vars)

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_USER_ID=
```

- [ ] **Step 3: Delete `.env.production`** (CRA-specific `REACT_APP_*` var; replaced by Vercel dashboard env + `.env.local`).

Run: `rm .env.production`

- [ ] **Step 4: Reminder** — the user must add `NEXT_PUBLIC_*` vars in the Vercel project dashboard before deploy (note this in the final summary).

- [ ] **Checkpoint** — user may commit.

---

## Task 12: Remove CRA files

**Files:**
- Delete: `src/`, `public/index.html`, `scripts/generate-seo-files.js`, root `tailwind.config.js`

- [ ] **Step 1: Confirm the new app builds BEFORE deleting anything** (sanity gate — do not delete on a broken build).

Run: `yarn build`
Expected: build succeeds, output shows `Route (app) / ○ (Static)`.

- [ ] **Step 2: Delete CRA artifacts**

Run:
```bash
rm -rf src
rm public/index.html
rm -rf scripts
rm tailwind.config.js
```

- [ ] **Step 3: Update `.gitignore`** — add Next.js entries:

```
# next.js
/.next/
/out/

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```
(Keep existing entries; the CRA `/build` entry can stay or be removed — harmless.)

- [ ] **Checkpoint** — user may commit "feat: remove CRA scaffolding".

---

## Task 13: Build, render, and visual verification

**Files:** none (verification only)

- [ ] **Step 1: Clean production build**

Run: `yarn build`
Expected: succeeds; `/` listed as Static (`○`). No type or lint errors.

- [ ] **Step 2: Verify content is in the server-rendered HTML (the SEO win)**

Run: `yarn start &` then `curl -s http://localhost:3000 | grep -c "Technology Leader"`
Expected: count ≥ 1 (the tagline/title text is present in raw HTML — proves SSG, not client-only render).

- [ ] **Step 3: Verify `<head>` metadata + JSON-LD in HTML**

Run: `curl -s http://localhost:3000 | grep -o 'application/ld+json'`
Expected: matches (structured data is server-rendered).

- [ ] **Step 4: Verify sitemap & robots routes**

Run: `curl -s http://localhost:3000/sitemap.xml && curl -s http://localhost:3000/robots.txt`
Expected: valid XML sitemap with the site URL; robots.txt with `Allow: /` and `Sitemap:` line.

- [ ] **Step 5: Visual parity dogfood** — use the `browse` skill (or open `http://localhost:3000`) to compare against the live CRA site at mobile (375px), tablet (768px), and desktop (1280px). Check: fonts render (Jakarta/Lora), colors match, framer-motion animations fire, anchor nav scrolls, "Download CV" downloads the PDF, contact form submits (success state).

Run: stop the dev server when done (`kill %1`).

- [ ] **Checkpoint** — user does final commit / opens PR / deploys.

---

## Post-Migration Notes (for the summary, not the build)

- Add all `NEXT_PUBLIC_*` env vars to the Vercel project dashboard.
- Replace the GA Universal Analytics ID with a GA4 `G-XXXX` ID to restore analytics.
- Vercel auto-detects Next.js — no `vercel.json` or build-command change needed.
