"use client";

import { motion } from "framer-motion";
import type { AiData } from "@/app/lib/types";

function AI({ data }: { data: AiData }) {
  if (!data) return null;

  return (
    <section id="ai" className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-1 bg-amber mb-8" />
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
            {data.heading}
          </h2>

          <div className="space-y-5">
            {data.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg text-slate leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {data.workflow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-charcoal text-cream">
                  {step}
                </span>
                {i < data.workflow.length - 1 && (
                  <span className="text-amber" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AI;
