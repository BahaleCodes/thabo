import React from "react";
import { motion } from "framer-motion";

function Expertise({ data }) {
  if (!data) return null;

  return (
    <section id="expertise" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-charcoal mb-16"
        >
          {data.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.domains.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-lg border border-warmgrey bg-cream/50 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-charcoal mb-3">
                {domain.title}
              </h3>

              <p className="text-sm text-slate leading-relaxed mb-6">
                {domain.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-xs font-medium text-slate bg-warmgrey/60 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Expertise;
