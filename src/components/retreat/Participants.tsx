"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { PARTICIPANT_QUOTES } from "@/lib/retreat";

export default function Participants() {
  return (
    <section className="relative bg-cosmos-deep py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Transformations"
          title="What Our Participants Say"
          highlight="Participants"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PARTICIPANT_QUOTES.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass flex flex-col rounded-2xl border border-white/10 p-7"
            >
              <span className="text-amber-300">★★★★★</span>
              <blockquote className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-white/90">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 text-sm uppercase tracking-[0.2em] text-muted">
                — {t.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
