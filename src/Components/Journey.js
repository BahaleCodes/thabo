import React from "react";
import { motion } from "framer-motion";

function Journey({ data }) {
  if (!data) return null;

  return (
    <section id="journey" className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-charcoal mb-16"
        >
          {data.heading}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-warmgrey" />

          <div className="space-y-16">
            {data.milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-8 md:pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-4 top-1 w-2 h-2 rounded-full bg-amber -translate-x-[3px]" />

                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber mb-2">
                  {milestone.phase}
                </span>

                <h3 className="text-xl font-semibold text-charcoal">
                  {milestone.role}
                </h3>

                <p className="text-sm font-medium text-slate mt-1">
                  {milestone.organization}
                  <span className="mx-2 text-warmgrey">|</span>
                  {milestone.period}
                </p>

                <p className="mt-4 text-base text-slate leading-relaxed">
                  {milestone.summary}
                </p>

                {milestone.highlights && milestone.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {milestone.highlights.map((highlight, j) => (
                      <li
                        key={j}
                        className="text-sm text-slate flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;
