"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import BookButton from "./BookButton";
import { WHY_JOIN } from "@/lib/retreat";

export default function WhyJoin() {
  return (
    <section className="relative overflow-hidden bg-cosmos py-24 sm:py-32">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.14), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="This Is For You"
          title="Why Join — Know Thyself"
          highlight="Know Thyself"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {WHY_JOIN.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: "easeOut" }}
              className="glass flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition-colors duration-300 hover:border-emerald-400/40"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-sm text-emerald-300">
                ✓
              </span>
              <p className="text-sm leading-relaxed text-white/85">{item}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <BookButton size="lg" />
        </div>
      </div>
    </section>
  );
}
