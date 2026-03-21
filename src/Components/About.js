import React from "react";
import { motion } from "framer-motion";

function About({ data }) {
  if (!data) return null;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-12">
            {data.heading}
          </h2>

          <div className="space-y-6">
            {data.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base text-slate leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {data.quote && (
            <blockquote className="mt-12 pl-6 border-l-4 border-amber">
              <p className="text-lg font-serif italic text-charcoal leading-relaxed">
                "{data.quote.text}"
              </p>
            </blockquote>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
