"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CHAKRAS } from "@/lib/chakras";

export default function ChakraOverlays({
  activeIds,
}: {
  activeIds: Set<number>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {CHAKRAS.map((chakra) => {
        const active = activeIds.has(chakra.id);
        return (
          <div
            key={chakra.id}
            className="absolute"
            style={{
              left: "50%",
              top: `${chakra.top}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Expanding glow ring (active only) */}
            {active && (
              <>
                <span
                  className="absolute left-1/2 top-1/2 h-[60px] w-[60px] rounded-full"
                  style={{
                    border: `2px solid ${chakra.color}`,
                    animation: "ring-pulse 2.4s ease-out infinite",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[60px] w-[60px] rounded-full"
                  style={{
                    border: `2px solid ${chakra.color}`,
                    animation: "ring-pulse 2.4s ease-out infinite 1.2s",
                  }}
                />
              </>
            )}

            <motion.div
              animate={
                active
                  ? { scale: [1, 1.2, 1], rotate: [0, 360] }
                  : { scale: 1, rotate: 0 }
              }
              transition={
                active
                  ? {
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    }
                  : { duration: 0.6 }
              }
              style={{
                width: 60,
                height: 60,
                filter: active
                  ? `grayscale(0%) drop-shadow(0 0 12px ${chakra.glowColor})`
                  : "grayscale(100%)",
                opacity: active ? 1 : 0.3,
                transition: "opacity 0.8s ease, filter 0.8s ease",
              }}
            >
              <Image
                src={chakra.image}
                alt={chakra.name}
                width={60}
                height={60}
                className="h-[60px] w-[60px] object-contain"
                priority={chakra.id <= 3}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
