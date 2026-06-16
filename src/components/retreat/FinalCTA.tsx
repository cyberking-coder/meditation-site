"use client";

import { motion } from "framer-motion";
import BookButton from "./BookButton";
import { BOOKING } from "@/lib/retreat";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-cosmos py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 text-center sm:p-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(192,38,211,0.35) 50%, rgba(67,56,202,0.5))",
            boxShadow: "0 0 80px rgba(124,58,237,0.35)",
          }}
        >
          {/* drifting glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(232,121,249,0.4), transparent 70%)" }}
          />

          <h2 className="text-glow relative font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            The Unforgettable{" "}
            <span className="italic">Experience</span> Awaits
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl leading-relaxed text-white/85">
            A 6-day journey of spiritual, emotional, and mental renewal. A space for
            silence, release, joy, and awakening — an experience that stays with you
            long after the retreat ends.
          </p>

          <div className="relative mt-9 flex flex-col items-center gap-5">
            <BookButton size="lg" label="Reserve Your Seat" />
            <a
              href={BOOKING.tel}
              className="group inline-flex items-center gap-2 text-lg text-white transition-colors hover:text-amber-200"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sm transition-transform group-hover:scale-110">
                ☎
              </span>
              <span className="font-medium tracking-wide">{BOOKING.phoneDisplay}</span>
              <span className="text-sm text-white/60">for booking</span>
            </a>
            <p className="text-sm text-white/70">
              Begin your journey toward inner peace, clarity, and transformation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
