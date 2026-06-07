# Thabo Mponya — Portfolio

Personal portfolio site for Thabo Mponya (Technology Leader & Systems Architect),
built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**, and
deployed on **Vercel**.

It's a statically generated (SSG) single page composed of section components
(Hero, About, Journey, Expertise, Contact, Footer) with a client-side contact
form (EmailJS) and Google Analytics via `@next/third-parties`.

## Requirements

- Node.js **20.9+** (Next.js 16 requirement)
- [Yarn](https://classic.yarnpkg.com/) (this repo uses a `yarn.lock`)

## Getting Started

```bash
yarn install
cp .env.example .env.local   # then fill in the values (see below)
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description                                            |
| ------------- | ------------------------------------------------------ |
| `yarn dev`    | Start the dev server (hot reload) at `localhost:3000`. |
| `yarn build`  | Production build (statically prerenders the site).     |
| `yarn start`  | Serve the production build locally.                    |
| `yarn lint`   | Run Next.js / ESLint checks.                           |

## Environment Variables

Defined in `.env.local` for local dev (gitignored) and in the Vercel project
dashboard for production. See `.env.example` for the full list.

| Variable                          | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Canonical site URL (used by metadata, sitemap, OG).  |
| `NEXT_PUBLIC_GA_ID`               | GA4 measurement ID (`G-XXXX`). GA is omitted if unset.|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | EmailJS service ID for the contact form.             |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID.                                 |
| `NEXT_PUBLIC_EMAILJS_USER_ID`     | EmailJS public user/key.                             |

All are `NEXT_PUBLIC_*` (client-exposed by design — they are not secrets).

## Project Structure

```
app/
  layout.tsx        # <html>/<body>, fonts, metadata, JSON-LD, analytics
  page.tsx          # composes the section components
  globals.css       # Tailwind directives + global styles
  sitemap.ts        # generates /sitemap.xml
  robots.ts         # generates /robots.txt
  components/        # Header, Hero, About, Journey, Expertise, Contact, Footer
  content/           # resumeData.ts (site content)
  lib/               # types.ts (content type definitions)
public/              # static assets (images, CV PDF, favicon, manifest)
```

## SEO

- Page metadata (title, description, OpenGraph, Twitter, canonical) is defined
  in `app/layout.tsx` via the Next.js Metadata API and rendered at build time.
- Person + WebSite JSON-LD structured data is server-rendered in the layout.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.

## Deployment

Vercel auto-detects Next.js — no extra configuration needed. Set the environment
variables above in the Vercel project dashboard before deploying.
