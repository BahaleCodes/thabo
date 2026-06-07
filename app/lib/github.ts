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
      {
        headers: { Accept: "application/vnd.github+json" },
        // Cache at build time so the page stays statically prerendered (SSG);
        // stats refresh on each deploy. (Next 16 fetch is uncached by default.)
        cache: "force-cache",
      }
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
