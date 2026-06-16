"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import BookButton from "./BookButton";
import { PRACTICES, type Practice } from "@/lib/retreat";

function Check() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] text-emerald-300">
      ✓
    </span>
  );
}

function PracticeCard({ practice, index }: { practice: Practice; index: number }) {
  const reversed = index % 2 === 1;
  const parts = practice.name.split(practice.highlight);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass group grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 p-6 transition-colors duration-500 hover:border-cosmos-purple/50 sm:p-8 md:grid-cols-[260px_1fr]"
      style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
    >
      {/* Visual panel */}
      <div
        className={`relative flex h-44 items-center justify-center overflow-hidden rounded-2xl md:h-full md:min-h-[220px] ${
          reversed ? "md:order-2" : ""
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(192,38,211,0.22) 50%, rgba(67,56,202,0.3))",
        }}
      >
        <span
          className="absolute -bottom-6 -left-2 font-serif text-[7rem] leading-none text-white/10 transition-transform duration-500 group-hover:scale-110"
          aria-hidden
        >
          {practice.no}
        </span>
        <span className="relative text-5xl transition-transform duration-500 group-hover:scale-110">
          {practice.glyph}
        </span>
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(232,121,249,0.25), transparent 65%)" }}
        />
      </div>

      {/* Content */}
      <div className={reversed ? "md:order-1" : ""}>
        <h3 className="font-serif text-3xl text-white">
          {parts[0]}
          <span
            style={{
              background: "linear-gradient(110deg, #e879f9, #60a5fa)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {practice.highlight}
          </span>
          {parts[1]}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{practice.description}</p>
        <ul className="mt-5 space-y-2.5">
          {practice.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-white/85">
              <Check />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative bg-cosmos-deep py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Journey"
          title="What You Will Experience"
          highlight="Experience"
        />

        <div className="mt-16 space-y-8">
          {PRACTICES.map((p, i) => (
            <PracticeCard key={p.no} practice={p} index={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <BookButton size="lg" />
        </div>
      </div>
    </section>
  );
}
