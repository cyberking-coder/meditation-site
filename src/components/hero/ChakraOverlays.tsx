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
            className="absolute"
            style={{
              left: "50%",
              top: `${chakra.top}%`,
              transform: "translateX(-50%)",
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

            {/* Pulsing wrapper (scale 1 -> 1.15 -> 1). */}
            <div
              style={{
                animation: active
                  ? "chakra-pulse 2s ease-in-out infinite"
                  : "none",
              }}
            >
              {/* Glowing colored orb: bright center fading to the chakra colour,
                  with the chakra's double glow. Dim and grey when inactive. */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "9999px",
                  background: active
                    ? `radial-gradient(circle, #ffffff 0%, ${chakra.color} 60%, ${chakra.color} 100%)`
                    : "radial-gradient(circle, rgba(120,124,140,0.7), rgba(40,42,58,0.4))",
                  boxShadow: active
                    ? `0 0 12px ${chakra.color}, 0 0 25px ${chakra.color}`
                    : "none",
                  opacity: active ? 1 : 0.25,
                  transition:
                    "opacity 0.5s ease, box-shadow 0.5s ease, background 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
