"use client";

import { useMemo } from "react";

// Deterministic pseudo-random — pure and SSR-stable (no Math.random in render).
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

/** Lightweight CSS-only cosmic backdrop used instead of the 3D scene on mobile. */
export default function MobileHeroVisual() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        left: rand(i + 1) * 100,
        top: rand(i + 2) * 100,
        size: rand(i + 3) * 2 + 1,
        delay: rand(i + 4) * 4,
        duration: 2 + rand(i + 5) * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-cosmos">
      {/* nebula glows */}
      <div
        className="absolute -left-1/4 top-0 h-[60%] w-[80%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)" }}
      />
      <div
        className="absolute right-0 top-1/3 h-[55%] w-[70%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(67,56,202,0.3), transparent 70%)" }}
      />

      {/* twinkling stars */}
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

      {/* glowing meditative silhouette */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-64 w-40 rounded-[50%_50%_45%_45%/60%_60%_40%_40%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(200,205,216,0.5), rgba(124,58,237,0.15))",
            boxShadow: "0 0 80px rgba(124,58,237,0.5)",
            filter: "blur(2px)",
          }}
        />
      </div>
    </div>
  );
}
