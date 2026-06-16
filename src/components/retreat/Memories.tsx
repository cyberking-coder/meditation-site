"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const MEMORIES = [
  { caption: "Sunrise Sadhana", glyph: "☀" },
  { caption: "Group Catharsis", glyph: "🌊" },
  { caption: "Silent Walks", glyph: "🌿" },
  { caption: "Fire Ceremony", glyph: "🔥" },
];

export default function Memories() {
  return (
    <section className="relative bg-cosmos py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Goa · Cavelossim"
          title="Previous Retreat Memories"
          highlight="Memories"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {MEMORIES.map((m, i) => (
            <motion.div
              key={m.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(160deg, rgba(124,58,237,0.3), rgba(192,38,211,0.18) 50%, rgba(15,8,40,0.6))",
              }}
            >
              <span className="absolute inset-0 grid place-items-center text-4xl opacity-70 transition-transform duration-500 group-hover:scale-110">
                {m.glyph}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-white/90">
                  {m.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-muted/60">
          Moments from past gatherings
        </p>
      </div>
    </section>
  );
}
