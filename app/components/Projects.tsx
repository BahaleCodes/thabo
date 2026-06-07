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
