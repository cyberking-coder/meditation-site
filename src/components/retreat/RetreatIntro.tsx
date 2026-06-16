"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StarField from "@/components/StarField";
import BookButton from "./BookButton";
import { asset } from "@/lib/asset";
import { RETREAT } from "@/lib/retreat";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function RetreatIntro() {
  const [failed, setFailed] = useState(false);

  return (
    <section
      id="retreat-start"
      className="relative overflow-hidden bg-cosmos py-24 sm:py-32"
    >
      <StarField count={50} />
      {/* soft nebula glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(192,38,211,0.22), transparent 70%)" }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full border border-cosmos-purple/40 px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/90"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {RETREAT.badge}
        </motion.span>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-glow font-serif text-4xl font-light leading-tight text-white sm:text-6xl"
        >
          {RETREAT.titleLead}{" "}
          <span
            style={{
              background: "linear-gradient(110deg, #34d399, #22d3ee)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {RETREAT.titleHighlight}
          </span>{" "}
          {RETREAT.titleTail}
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {RETREAT.subtitle}
        </motion.p>

        {/* Invitation video */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-10 w-full overflow-hidden rounded-3xl border border-white/10"
          style={{ boxShadow: "0 0 60px rgba(124,58,237,0.3)" }}
        >
          {failed ? (
            <div className="flex aspect-video flex-col items-center justify-center bg-cosmos-deep text-muted">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 text-2xl text-white">
                ▶
              </span>
              <p className="mt-4 text-sm">A personal invitation from your guide</p>
            </div>
          ) : (
            <video
              src={asset("/videos/client.mp4")}
              className="aspect-video w-full bg-black"
              controls
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
            />
          )}
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <BookButton size="lg" />
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="text-amber-300">★★★★★</span>
            <span className="text-white">{RETREAT.ratingValue}/5</span>
            <span className="text-white/30">·</span>
            <span>{RETREAT.ratingCount}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
