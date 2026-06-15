"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Chakra } from "@/lib/chakras";

export default function ChakraCard({ chakra }: { chakra: Chakra | null }) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden items-center md:flex"
      style={{ paddingRight: 40 }}
    >
      <AnimatePresence mode="wait">
        {chakra && (
          <motion.div
            key={chakra.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-[300px] rounded-2xl p-7"
            style={{
              border: `1px solid ${chakra.color}`,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: `0 0 40px ${chakra.glowColor}`,
            }}
          >
            <h3
              className="text-xl font-semibold uppercase text-white"
              style={{ letterSpacing: "0.22em" }}
            >
              {chakra.name}
            </h3>
            <p
              className="mt-2 text-xs uppercase"
              style={{ letterSpacing: "0.35em", color: chakra.color }}
            >
              {chakra.sanskrit}
            </p>
            <p
              className="mt-5 text-sm uppercase text-white/85"
              style={{ letterSpacing: "0.14em" }}
            >
              {chakra.meaning}
            </p>
            <p
              className="mt-5 border-t border-white/15 pt-4 font-serif text-lg italic text-white/70"
            >
              “{chakra.affirmation}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
