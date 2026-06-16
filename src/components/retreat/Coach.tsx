"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { COACH } from "@/lib/retreat";
import { asset } from "@/lib/asset";

export default function Coach() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="coach" className="relative overflow-hidden bg-cosmos py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Your Guide" title="Meet Your Coach" highlight="Coach" />

        <div className="mt-14 grid items-center gap-10 md:grid-cols-[300px_1fr]">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative mx-auto"
          >
            <div
              className="absolute -inset-3 rounded-full blur-2xl"
              style={{ background: "conic-gradient(from 0deg, #7c3aed, #c026d3, #60a5fa, #7c3aed)" }}
            />
            <div className="relative grid h-56 w-56 place-items-center overflow-hidden rounded-full border border-white/15 bg-cosmos-deep">
              {imgFailed ? (
                <span className="font-serif text-6xl text-white/90">AR</span>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={asset("/coach.png")}
                  alt={COACH.name}
                  className="h-full w-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              )}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className="font-serif text-2xl text-white">
              Hi, I&apos;m{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #e879f9, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {COACH.name}
              </span>
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.25em] text-cosmos-purple">
              {COACH.role}
            </p>
            <div className="mt-5 space-y-4 text-muted">
              {COACH.bio.map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {COACH.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass rounded-2xl border border-white/10 p-6 text-center"
            >
              <div
                className="font-serif text-4xl"
                style={{
                  background: "linear-gradient(110deg, #34d399, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-sm uppercase tracking-[0.15em] text-muted">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
