"use client";

import { Linkedin, Github, Instagram } from "lucide-react";
import type { MainData } from "@/app/lib/types";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
} as const;

function Footer({ data }: { data: MainData }) {
  if (!data) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-warmgrey bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Social links */}
        <div className="flex items-center gap-5">
          {data.social?.map((link, i) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            if (!Icon) return null;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-slate hover:text-charcoal transition-colors"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate">
          &copy; {new Date().getFullYear()} Thabo Mponya. All rights reserved.
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="text-xs font-medium text-slate hover:text-charcoal transition-colors"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
