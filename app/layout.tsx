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
    jobTitle: "Azure Administrator & Software Engineer",
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
        <Analytics />
      </body>
    </html>
  );
}
