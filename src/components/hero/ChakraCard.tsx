"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Chakra } from "@/lib/chakras";

export default function ChakraCard({ chakra }: { chakra: Chakra | null }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden items-center pr-6 md:flex lg:pr-16">
      <AnimatePresence mode="wait">
        {chakra && (
          <motion.div
            key={chakra.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass w-[320px] rounded-2xl p-7"
            style={{
              border: `1px solid ${chakra.color}`,
              boxShadow: `0 0 40px ${chakra.glowColor}, inset 0 0 24px rgba(255,255,255,0.04)`,
            }}
          >
            <div
              className="mb-4 text-6xl leading-none"
              style={{
                color: chakra.color,
                textShadow: `0 0 24px ${chakra.glowColor}`,
              }}
            >
              {chakra.symbol}
            </div>
            <h3 className="font-serif text-3xl font-semibold text-white">
              {chakra.name}
            </h3>
            <p
              className="mt-1 text-sm uppercase tracking-[0.3em]"
              style={{ color: chakra.color }}
            >
              {chakra.sanskrit}
            </p>
            <p className="mt-4 text-lg text-white/90">{chakra.meaning}</p>
            <p className="mt-4 border-t border-white/10 pt-4 font-serif text-xl italic text-muted">
              “{chakra.affirmation}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
