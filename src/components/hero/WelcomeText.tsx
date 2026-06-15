"use client";

import { forwardRef } from "react";

/**
 * Centered welcome message shown during segment 0. Opacity is driven imperatively
 * by the Hero's rAF loop via the forwarded ref for smooth scroll-linked fading.
 */
const WelcomeText = forwardRef<HTMLDivElement>(function WelcomeText(_, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-[8%] z-30 flex flex-col items-center px-6 text-center will-change-[opacity,transform]"
    >
      <h1 className="text-glow font-serif text-5xl font-light leading-tight text-white sm:text-6xl md:text-7xl">
        Awaken Your Inner Cosmos
      </h1>
      <p className="mt-4 max-w-xl font-sans text-base tracking-wide text-muted sm:text-lg">
        A journey through the seven energy centers
      </p>
      <div className="mt-10 flex flex-col items-center gap-2 text-muted/70">
        <span className="text-xs uppercase tracking-[0.4em]">Scroll to begin</span>
        <span className="text-xl">↓</span>
      </div>
    </div>
  );
});

export default WelcomeText;
