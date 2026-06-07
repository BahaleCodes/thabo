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

export interface ResumeData {
  main: MainData;
  about: AboutData;
  journey: JourneyData;
  expertise: ExpertiseData;
  ai: AiData;
  projects: ProjectsData;
  analytics: { trackingId: string };
}
