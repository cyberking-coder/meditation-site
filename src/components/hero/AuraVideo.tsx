"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

/**
 * A decorative video that plays *behind* the meditator figure. It sits between
 * the nebula background (z-0) and the transparent 3D canvas (z-10), so the
 * glowing silhouette reads on top of it.
 *
 * `mix-blend-mode: screen` drops the video's dark areas (they become the cosmos
 * behind them) and keeps only the light/colour, so any clip blends seamlessly
 * into the scene instead of sitting in a hard rectangle. A radial mask
 * concentrates it around the figure and feathers the edges into the nebula.
 *
 * Drop a clip at `public/videos/aura.mp4` (loopable, ideally on a dark
 * background) and it appears automatically; until then the layer stays invisible
 * so the hero is never broken.
 */
export default function AuraVideo() {
  const [ready, setReady] = useState(false);

  const mask =
    "radial-gradient(58% 62% at 50% 46%, #000 28%, rgba(0,0,0,0.65) 55%, transparent 78%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s ease",
        mixBlendMode: "screen",
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      <video
        src={asset("/videos/aura.mp4")}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        onError={() => setReady(false)}
      />
    </div>
  );
}
