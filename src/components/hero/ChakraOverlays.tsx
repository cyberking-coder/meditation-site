"use client";

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
            className="absolute flex items-center justify-center"
            style={{
              left: "50%",
              top: `${chakra.top}%`,
              width: 0,
              height: 0,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Outer ripple rings (active only): expand 65px -> 120px and fade. */}
            {active && (
              <>
                <span
                  className="absolute left-1/2 top-1/2 h-[65px] w-[65px] rounded-full"
                  style={{
                    border: `2px solid ${chakra.color}`,
                    animation: "chakra-ring 2s ease-out infinite",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[65px] w-[65px] rounded-full"
                  style={{
                    border: `2px solid ${chakra.color}`,
                    animation: "chakra-ring 2s ease-out infinite 1s",
                  }}
                />
              </>
            )}

            {/* Pulsing wrapper (active scales 1 -> 1.15 -> 1). */}
            <div
              style={{
                animation: active
                  ? "chakra-pulse 2s ease-in-out infinite"
                  : "none",
              }}
            >
              {/* Always-visible colored orb. Faint in its colour when inactive,
                  bright white-cored with a strong double glow when active. */}
              <div
                style={{
                  width: active ? 38 : 22,
                  height: active ? 38 : 22,
                  borderRadius: "9999px",
                  background: active
                    ? `radial-gradient(circle, #ffffff 0%, ${chakra.color} 60%, ${chakra.color} 100%)`
                    : `radial-gradient(circle, ${chakra.color} 0%, ${chakra.color} 100%)`,
                  boxShadow: active
                    ? `0 0 12px ${chakra.color}, 0 0 25px ${chakra.color}, 0 0 45px ${chakra.color}`
                    : `0 0 8px ${chakra.color}`,
                  opacity: active ? 1 : 0.5,
                  transition:
                    "width 0.5s ease, height 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease, background 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
