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
      className="min-h-[85vh] flex items-center bg-cream py-20 md:py-0"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1"
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

          {/*
            Rendered as a real <img> (not next/image) so the indexable URL is the
            descriptive, human-readable path that the image sitemap and the
            Person/ImageObject structured data both point at. Google Images keys
            off the src in the HTML; a /_next/image?url=... wrapper buries the
            filename in a query string and splits the signal.
          */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="order-1 md:order-2 m-0 justify-self-start md:justify-self-end"
          >
            <img
              src="/images/thabo-mponya.jpg"
              srcSet="/images/thabo-mponya-400.jpg 400w, /images/thabo-mponya-640.jpg 640w, /images/thabo-mponya-800.jpg 800w, /images/thabo-mponya.jpg 1001w"
              sizes="(max-width: 768px) 60vw, 340px"
              width={1001}
              height={1001}
              alt="Thabo Mponya, Azure administrator and software engineer based in Johannesburg, South Africa"
              title="Thabo Mponya"
              fetchPriority="high"
              decoding="async"
              className="w-48 md:w-full md:max-w-[340px] aspect-square object-cover rounded-lg border border-warmgrey shadow-sm"
            />
            <figcaption className="sr-only">
              Portrait of Thabo Mponya, Azure administrator and software engineer
              in Johannesburg, South Africa.
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

export default Hero;
