"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { NOT_FOR_YOU } from "@/lib/retreat";

export default function NotForYou() {
  return (
    <section className="relative overflow-hidden bg-cosmos-deep py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[380px] w-[380px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.12), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="An Honest Filter"
          title="This Retreat Is Not For You If…"
          highlight="Not"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {NOT_FOR_YOU.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: "easeOut" }}
              className="flex items-start gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-500/15 text-sm text-rose-300">
                ✕
              </span>
              <p className="text-sm leading-relaxed text-white/75">{item}</p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center font-serif text-xl italic text-muted">
          But if you&apos;re ready to truly meet yourself — this is where it begins.
        </p>
      </div>
    </section>
  );
}
