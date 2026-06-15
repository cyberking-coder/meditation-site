"use client";

import { motion } from "framer-motion";
import { CHAKRAS } from "@/lib/chakras";

const INDIGO = "#6A0DAD";

// Anchored on the Third Eye chakra's spine position (kept in sync with data).
const POS = { left: "50%", top: `${CHAKRAS[5].top}%` } as const;

// Deterministic particle directions (pure — no Math.random in render).
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  const dist = 110 + (i % 5) * 22; // 110 - 198px
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, i };
});

/**
 * One-shot Third Eye awakening: a screen flash, an eye opening over the brow,
 * three vision ripples, and an indigo particle burst. Plays once on mount; the
 * parent remounts it (via key) each time the Third Eye segment is entered.
 */
export default function ThirdEyeEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[45] overflow-hidden">
      {/* 1. Screen flash (white/indigo), opacity 0 -> 0.4 -> 0 over 0.8s */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 15%, rgba(196,178,255,0.95), rgba(106,13,173,0.5) 38%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.8, times: [0, 0.45, 1], ease: "easeOut" }}
      />

      {/* 2. Eye opening — an almond eye that scales open vertically, revealing
          an expanding indigo point of light, then fades. */}
      <motion.div
        className="absolute"
        style={{ ...POS, transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, times: [0, 0.2, 0.75, 1], ease: "easeInOut" }}
      >
        <motion.svg
          width={300}
          height={150}
          viewBox="0 0 300 150"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          <defs>
            <radialGradient id="te-eye" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e6dbff" />
              <stop offset="55%" stopColor={INDIGO} />
              <stop offset="100%" stopColor="rgba(106,13,173,0)" />
            </radialGradient>
            <clipPath id="te-clip">
              <path d="M8 75 Q150 2 292 75 Q150 148 8 75 Z" />
            </clipPath>
          </defs>
          <path d="M8 75 Q150 2 292 75 Q150 148 8 75 Z" fill="url(#te-eye)" />
          <g clipPath="url(#te-clip)">
            <motion.circle
              cx={150}
              cy={75}
              fill="#1a0033"
              initial={{ r: 0 }}
              animate={{ r: [0, 46, 30] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <circle cx={150} cy={75} r={14} fill="#d9c8ff" />
          </g>
          <path
            d="M8 75 Q150 2 292 75 Q150 148 8 75 Z"
            fill="none"
            stroke="#c9b6ff"
            strokeWidth={2}
          />
        </motion.svg>
      </motion.div>

      {/* 3. Vision ripples — three indigo circles expanding to 300px, staggered */}
      {[0, 1, 2].map((k) => (
        <motion.span
          key={`ripple-${k}`}
          className="absolute rounded-full"
          style={{
            ...POS,
            x: "-50%",
            y: "-50%",
            border: `2px solid ${INDIGO}`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.85 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 1.4, delay: 1.1 + k * 0.3, ease: "easeOut" }}
        />
      ))}

      {/* 4. Particle burst — 20 indigo particles flung outward, fading over 1s */}
      {PARTICLES.map((p) => (
        <motion.span
          key={`particle-${p.i}`}
          className="absolute rounded-full"
          style={{
            ...POS,
            width: 6,
            height: 6,
            background: INDIGO,
            boxShadow: `0 0 8px ${INDIGO}`,
          }}
          initial={{ x: "-50%", y: "-50%", opacity: 1 }}
          animate={{
            x: `calc(-50% + ${p.x}px)`,
            y: `calc(-50% + ${p.y}px)`,
            opacity: 0,
          }}
          transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
