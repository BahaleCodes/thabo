import { useEffect } from "react";

const DEFAULT_TITLE =
  "Thabo Mponya | Technology Leader, Systems Architect, Full-Stack Engineer";
const DEFAULT_DESCRIPTION =
  "Official website of Thabo Mponya, a Johannesburg-based technology leader and systems architect focused on scalable systems, technical leadership, and full-stack engineering.";
const DEFAULT_IMAGE = "/images/ThaboMponya.jpg";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function getSiteUrl() {
  const configuredUrl = process.env.REACT_APP_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

function buildStructuredData(data, siteUrl, pageUrl, imageUrl) {
  const sameAs = data.main.social?.map((profile) => profile.url) ?? [];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: data.main.name,
      url: pageUrl,
      image: imageUrl,
      email: data.main.email,
      telephone: data.main.phone,
      jobTitle: data.main.title,
      description: DEFAULT_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Johannesburg",
        addressCountry: "ZA",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "North-West University",
      },
      worksFor: {
        "@type": "Organization",
        name: "Digital Solution Foundry",
      },
      sameAs,
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
      name: data.main.name,
      url: siteUrl || pageUrl,
      description: DEFAULT_DESCRIPTION,
    },
  ];
}

function Seo({ data }) {
  useEffect(() => {
    if (!data) return;

    const siteUrl = getSiteUrl();
    const pageUrl = `${siteUrl}/`;
    const imageUrl = siteUrl ? `${siteUrl}${DEFAULT_IMAGE}` : DEFAULT_IMAGE;
    const structuredData = buildStructuredData(data, siteUrl, pageUrl, imageUrl);

    document.title = DEFAULT_TITLE;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: DEFAULT_DESCRIPTION,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    });
    upsertMeta('meta[name="author"]', {
      name: "author",
      content: data.main.name,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content:
        "Thabo Mponya, technology leader, systems architect, full-stack engineer, Johannesburg software developer, South Africa software engineer",
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "profile",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: DEFAULT_TITLE,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: DEFAULT_DESCRIPTION,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: pageUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: `${data.main.name} portrait`,
    });
    upsertMeta('meta[property="profile:first_name"]', {
      property: "profile:first_name",
      content: "Thabo",
    });
    upsertMeta('meta[property="profile:last_name"]', {
      property: "profile:last_name",
      content: "Mponya",
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: DEFAULT_TITLE,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: DEFAULT_DESCRIPTION,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: pageUrl,
    });

    let script = document.head.querySelector('script[data-seo="person-jsonld"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "person-jsonld");
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);
  }, [data]);

  return null;
}

export default Seo;
