"use client";

import { motion, type Variants } from "framer-motion";
import StarField from "@/components/StarField";

const FEATURES = [
  {
    icon: "🧘",
    title: "Meditation",
    text: "Still the mind and sink into presence with guided cosmic meditations.",
  },
  {
    icon: "✶",
    title: "Healing",
    text: "Release what no longer serves you and restore your natural energetic flow.",
  },
  {
    icon: "🌌",
    title: "Transformation",
    text: "Realign your seven centers and step into your most luminous self.",
  },
];

const fade: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cosmos py-28"
    >
      <StarField count={70} />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-glow text-center font-serif text-5xl font-light text-white"
        >
          The Power Within
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="glass rounded-2xl border border-cosmos-purple/30 p-8 text-center"
              style={{ boxShadow: "0 0 40px rgba(67,56,202,0.18)" }}
            >
              <div className="mb-5 text-5xl">{f.icon}</div>
              <h3 className="font-serif text-2xl text-white">{f.title}</h3>
              <p className="mt-3 text-muted">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
