"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Chakra Alignment",
    desc: "Individual sessions to balance and energize each of your seven centers.",
    price: "from $90 / session",
    gradient: "linear-gradient(135deg, #FF0000, #FFD700)",
  },
  {
    title: "Group Meditation",
    desc: "Weekly guided journeys into deep collective stillness and presence.",
    price: "from $25 / week",
    gradient: "linear-gradient(135deg, #00FF7F, #00BFFF)",
  },
  {
    title: "Energy Healing",
    desc: "Distance healing to clear blockages and restore your natural flow.",
    price: "from $120 / session",
    gradient: "linear-gradient(135deg, #6A0DAD, #9B59B6)",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-cosmos-deep py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-glow text-center font-serif text-5xl font-light text-white"
        >
          Your Healing Journey
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-2"
              style={{ background: s.gradient }}
            >
              <div className="h-full rounded-2xl bg-cosmos p-8 transition-shadow duration-300 group-hover:shadow-[0_0_50px_rgba(124,58,237,0.4)]">
                <h3 className="font-serif text-2xl text-white">{s.title}</h3>
                <p className="mt-3 text-muted">{s.desc}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/80">
                  {s.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
