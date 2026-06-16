"use client";

import { motion } from "framer-motion";
import { BOOKING } from "@/lib/retreat";

export default function BookButton({
  label = "Book Your Slot",
  size = "md",
}: {
  label?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-10 py-4 text-base" : "px-8 py-3 text-sm";
  return (
    <motion.a
      href={BOOKING.tel}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium uppercase tracking-[0.15em] text-white ${pad}`}
      style={{
        background: "linear-gradient(110deg, #7c3aed, #c026d3 55%, #4338ca)",
        boxShadow: "0 0 28px rgba(192,38,211,0.45), 0 0 8px rgba(124,58,237,0.5)",
      }}
    >
      {/* sheen sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{label}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1">
        »
      </span>
    </motion.a>
  );
}
