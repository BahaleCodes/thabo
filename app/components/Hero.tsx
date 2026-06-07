"use client";

import { motion } from "framer-motion";
import type { MainData } from "@/app/lib/types";

function Hero({ data }: { data: MainData }) {
  if (!data) return null;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex items-center bg-cream"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Amber accent line */}
          <div className="w-12 h-1 bg-amber mb-8" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal leading-tight">
            {data.name}
          </h1>

          <p className="mt-4 text-lg md:text-xl font-medium text-amber">
            {data.title}
          </p>

          <p className="mt-6 text-base md:text-lg text-slate max-w-xl leading-relaxed">
            {data.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={scrollToContact}
              className="px-6 py-3 bg-charcoal text-cream text-sm font-medium rounded hover:bg-slate transition-colors"
            >
              Get in Touch
            </button>
            {data.resumedownload && (
              <a
                href={data.resumedownload}
                download="Thabo_Mponya_CV_Modern.pdf"
                className="px-6 py-3 border border-charcoal text-charcoal text-sm font-medium rounded hover:bg-charcoal hover:text-cream transition-colors"
              >
                Download CV
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
