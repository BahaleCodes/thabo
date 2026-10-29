import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
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
  "Thabo Mponya | Azure Administrator & Software Engineer";
const DESCRIPTION =
  "Thabo Mponya — a Johannesburg-based Azure administrator and software engineer (C#/.NET, JavaScript/TypeScript), growing into systems architecture.";
// The portrait is ALSO rendered as a real <img> in Hero.tsx at this exact path.
// That is what makes it eligible for Google Images — structured data and og:image
// alone are never indexed as pictures. Keep these three in sync: the <img> src,
// the ImageObject below, and the sitemap image entry.
const IMAGE = "/images/thabo-mponya.jpg";
const IMAGE_WIDTH = 1001;
const IMAGE_HEIGHT = 1001;
const IMAGE_ALT =
  "Thabo Mponya, Azure administrator and software engineer based in Johannesburg, South Africa";
// Web-optimized portrait for social link previews (WhatsApp/X/LinkedIn).
// Kept well under WhatsApp's ~300KB fetch limit so it never falls back to the icon.
const OG_IMAGE = "/images/thabo-mponya-og.jpg";

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
    images: [
      {
        url: OG_IMAGE,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        alt: IMAGE_ALT,
        type: "image/jpeg",
      },
    ],
    firstName: "Thabo",
    lastName: "Mponya",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: IMAGE_ALT }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// One connected @graph instead of loose, duplicated nodes. The Person, the
// page, and the portrait each carry a stable @id and reference each other, so
// Google resolves them into a single entity ("Thabo Mponya" + this face)
// rather than three unrelated facts.
const PERSON_ID = `${SITE_URL}/#thabo-mponya`;
const IMAGE_ID = `${SITE_URL}/#portrait`;
const PAGE_ID = `${SITE_URL}/#profilepage`;
const SITE_ID = `${SITE_URL}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageObject",
      "@id": IMAGE_ID,
      url: `${SITE_URL}${IMAGE}`,
      contentUrl: `${SITE_URL}${IMAGE}`,
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      encodingFormat: "image/jpeg",
      caption: IMAGE_ALT,
      representativeOfPage: true,
      creditText: resumeData.main.name,
      about: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: resumeData.main.name,
      givenName: "Thabo",
      familyName: "Mponya",
      url: `${SITE_URL}/`,
      mainEntityOfPage: { "@id": PAGE_ID },
      image: { "@id": IMAGE_ID },
      email: resumeData.main.email,
      telephone: resumeData.main.phone,
      jobTitle: "Azure Administrator & Software Engineer",
      description: DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Johannesburg",
        addressRegion: "Gauteng",
        addressCountry: "ZA",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "North-West University",
      },
      worksFor: { "@type": "Organization", name: "Digital Solution Foundry" },
      sameAs: resumeData.main.social.map((s) => s.url),
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
    },
    {
      // ProfilePage (not plain WebPage) is what tells Google this URL IS the
      // canonical profile for the person, which is the page type it draws on
      // for name queries and knowledge panels.
      "@type": "ProfilePage",
      "@id": PAGE_ID,
      url: `${SITE_URL}/`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      mainEntity: { "@id": PERSON_ID },
      about: { "@id": PERSON_ID },
      primaryImageOfPage: { "@id": IMAGE_ID },
      image: { "@id": IMAGE_ID },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: resumeData.main.name,
      alternateName: TITLE,
      url: `${SITE_URL}/`,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

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
        <Analytics />
      </body>
    </html>
  );
}
