import type { ResumeData } from "@/app/lib/types";

const resumeData: ResumeData = {
  main: {
    name: "Thabo Mponya",
    title: "Azure Administrator & Software Engineer",
    tagline:
      "Azure administration and software engineering across C#/.NET and TypeScript — growing into systems architecture.",
    image: "ThaboMponya.jpg",
    email: "mollo.t.mponya@gmail.com",
    phone: "0795208970",
    location: "Johannesburg, South Africa",
    resumedownload: "/Thabo_Mponya_CV_Modern.pdf",
    contactmessage:
      "I am always open to discussing technology strategy, systems architecture, or potential collaborations.",
    social: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/thabo-mponya-6538a219b/",
        icon: "linkedin",
      },
      {
        name: "GitHub",
        url: "https://github.com/ThaboMollo",
        icon: "github",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/materialteddybear/",
        icon: "instagram",
      },
    ],
  },
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
  journey: {
    heading: "Career Journey",
    milestones: [
      {
        phase: "Foundation",
        role: "Software Developer",
        organization: "Bahale Codes Software",
        period: "2020 - 2021",
        summary:
          "Built full-stack web applications for clients, establishing a strong foundation in JavaScript ecosystems, client communication, and end-to-end delivery.",
        highlights: [
          "Delivered production web applications for multiple clients",
          "Built a strong foundation across the full delivery lifecycle",
        ],
      },
      {
        phase: "Growth",
        role: "Software Developer",
        organization: "Digital Solution Foundry",
        period: "2022 - Present",
        summary:
          "Evolved from feature development into systems thinking - designing application architectures, mentoring junior developers, and driving technical decisions across projects.",
        highlights: [
          "Administer and maintain Azure cloud environments and CI/CD pipelines",
          "Build and ship applications in C#/.NET, Vue.js, and TypeScript",
          "Lead technical initiatives and mentor junior developers",
        ],
      },
      {
        phase: "Education",
        role: "BSc Information Technology",
        organization: "North-West University",
        period: "Graduated 2022",
        summary:
          "Formal education in computer science fundamentals, object-oriented design, and software engineering principles.",
        highlights: [
          "Standard Bank Tech Impact Hackathon participant",
          "Cisco DevNet certified instructor",
        ],
      },
    ],
  },
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
  ai: {
    heading: "Working with AI",
    paragraphs: [
      "I treat AI as an engineering collaborator, not an autocomplete. My workflow is spec-driven: before writing code, I work with Claude and ChatGPT to brainstorm the problem, pin down requirements, and write a clear specification.",
      "From that spec I generate an implementation plan broken into small, reviewable tasks, then build against it — using the models to draft, refactor, and review while I own the architecture and the decisions. This very site was rebuilt in Next.js exactly this way.",
      "The result is speed without losing rigor: specs catch ambiguity early, plans keep scope honest, and AI-assisted review lifts code quality.",
    ],
    workflow: ["Brainstorm", "Spec", "Plan", "Implement", "Review"],
  },
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
  analytics: {
    trackingId: "UA-110570651-1",
  },
};

export default resumeData;
