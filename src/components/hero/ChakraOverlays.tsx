"use client";

import { CHAKRAS } from "@/lib/chakras";
import { asset } from "@/lib/asset";

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

            {/* Pulsing scale wrapper (separate element so spin + scale don't
                fight over `transform`). */}
            <div
              style={{
                animation: active
                  ? "chakra-pulse 2s ease-in-out infinite"
                  : "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(chakra.image)}
                alt={chakra.name}
                width={65}
                height={65}
                style={{
                  width: 65,
                  height: 65,
                  objectFit: "contain",
                  opacity: active ? 1 : 0.25,
                  filter: active
                    ? `grayscale(0%) brightness(1.2) drop-shadow(0 0 12px ${chakra.color}) drop-shadow(0 0 25px ${chakra.color})`
                    : "grayscale(100%) brightness(0.2)",
                  animation: active ? "chakra-spin 6s linear infinite" : "none",
                  transition: "opacity 0.5s ease, filter 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
