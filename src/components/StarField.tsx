"use client";

import { useMemo } from "react";

// Deterministic pseudo-random — pure and SSR-stable (no Math.random in render).
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

/** Subtle CSS twinkling star layer for non-hero sections. */
export default function StarField({ count = 60 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rand(i + 1) * 100,
        top: rand(i + 2) * 100,
        size: rand(i + 3) * 1.6 + 0.6,
        delay: rand(i + 4) * 5,
        duration: 2 + rand(i + 5) * 4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
