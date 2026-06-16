"use client";

import { motion } from "framer-motion";

/**
 * Shared premium section heading: a small animated eyebrow with a gradient
 * rule, and a large serif title where `highlight` is rendered in a gradient.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  align?: "center" | "left";
}) {
  const parts = highlight ? title.split(highlight) : [title];
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className={`flex flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em] text-cosmos-purple">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cosmos-purple" />
          {eyebrow}
          {align === "center" && (
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-cosmos-purple" />
          )}
        </span>
      )}
      <h2 className="font-serif text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
        {parts[0]}
        {highlight && (
          <span
            style={{
              background: "linear-gradient(110deg, #e879f9, #a78bfa 50%, #60a5fa)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {highlight}
          </span>
        )}
        {parts[1]}
      </h2>
    </motion.div>
  );
}
