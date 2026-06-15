"use client";

import type { CSSProperties } from "react";
import { CHAKRAS } from "@/lib/chakras";

/**
 * Seven layered CSS chakra orbs down the spine. `activeIndex` is the CHAKRAS
 * array index of the currently-activated chakra (-1 when none).
 */
export default function ChakraOverlays({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {CHAKRAS.map((chakra, i) => {
        const active = i === activeIndex;
        return (
          <div
            key={chakra.id}
            className={`chakra-orb${active ? " active" : ""}`}
            style={
              {
                "--chakra-color": chakra.color,
                left: "50%",
                top: `${chakra.top}%`,
              } as CSSProperties
            }
          >
            <div className="orb-outer-ring" />
            <div className="orb-middle-ring" />
            <div className="orb-inner" />
            <div className="orb-center-dot" />
          </div>
        );
      })}
    </div>
  );
}
