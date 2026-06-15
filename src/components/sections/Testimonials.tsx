"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Maya R.",
    text: "I felt my heart center open for the first time. The sessions are pure magic — grounding and expansive at once.",
  },
  {
    name: "Daniel K.",
    text: "After weeks of energy healing I sleep deeper and feel lighter. Inner Cosmos changed how I move through the world.",
  },
  {
    name: "Aria L.",
    text: "The chakra alignment journey was transformative. I walked out feeling radiant, balanced, and deeply connected.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-cosmos py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-glow text-center font-serif text-5xl font-light text-white"
        >
          Transformations
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-2xl border border-white/10 p-8"
            >
              <div className="mb-4 text-cosmos-purple">
                {"★★★★★"}
              </div>
              <p className="font-serif text-lg italic text-white/90">
                “{t.text}”
              </p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted">
                — {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
