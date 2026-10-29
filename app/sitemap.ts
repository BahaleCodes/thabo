import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tmponya.vercel.app";

// Bumped by hand when the page's content actually changes. Using `new Date()`
// here would stamp every crawl with "just now", which Google learns to ignore.
const LAST_MODIFIED = new Date("2026-10-29");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
      // Declaring the portrait here is what gets it into Google Images for a
      // "Thabo Mponya" search. It must be the same URL the <img> in Hero.tsx
      // uses, or the two signals do not reinforce each other.
      images: [`${SITE_URL}/images/thabo-mponya.jpg`],
    },
  ];
}
