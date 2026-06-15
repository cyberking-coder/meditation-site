"use client";

import { motion } from "framer-motion";

/**
 * Crown awakening: a golden/white light beam shooting upward from the crown
 * (top 8%) and a soft purple vignette around the screen edges. Shown while the
 * Crown segment is active (all seven chakras glow together, handled upstream).
 */
export default function CrownEffect() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[15]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Light beam shooting upward from the crown to the top of the screen. */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          height: "9%",
          width: 80,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(to top, rgba(255,215,140,0.95), rgba(255,255,255,0.55) 35%, transparent)",
          filter: "blur(7px)",
          transformOrigin: "bottom center",
          animation: "crown-beam 2.5s ease-in-out infinite",
        }}
      />

      {/* Subtle purple vignette on the screen edges. */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 50px rgba(124,58,237,0.45)" }}
      />
    </motion.div>
  );
}
