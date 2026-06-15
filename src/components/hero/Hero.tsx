"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAKRAS } from "@/lib/chakras";
import { useIsMobile } from "@/lib/useIsMobile";
import ChakraOverlays from "./ChakraOverlays";
import ChakraCard from "./ChakraCard";
import WelcomeText from "./WelcomeText";
import VideoReveal from "./VideoReveal";
import MobileHeroVisual from "./MobileHeroVisual";
import ThirdEyeEffect from "./ThirdEyeEffect";
import CrownEffect from "./CrownEffect";

gsap.registerPlugin(ScrollTrigger);

// CHAKRAS array index: 0 = Root … 6 = Crown.
const THIRD_EYE_INDEX = 5;
const CROWN_INDEX = 6;

// Activation runs bottom -> top (Root first, Crown last).
const CHAKRA_SEGMENTS = [
  { start: 0.08, end: 0.22, index: 0 }, // Root
  { start: 0.22, end: 0.34, index: 1 }, // Sacral
  { start: 0.34, end: 0.46, index: 2 }, // Solar
  { start: 0.46, end: 0.58, index: 3 }, // Heart
  { start: 0.58, end: 0.7, index: 4 }, // Throat
  { start: 0.7, end: 0.82, index: 5 }, // Third Eye
  { start: 0.82, end: 0.94, index: 6 }, // Crown
];

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function activeFromProgress(p: number): number {
  for (const seg of CHAKRA_SEGMENTS) {
    if (p >= seg.start && p < seg.end) return seg.index;
  }
  return -1;
}

const GalaxyCanvas = dynamic(() => import("./GalaxyCanvas"), {
  ssr: false,
  loading: () => <Loader />,
});

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-cosmos">
      <div className="flex flex-col items-center gap-4 text-muted">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-cosmos-purple/30 border-t-cosmos-purple" />
        <span className="text-xs uppercase tracking-[0.3em]">
          Entering the cosmos
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef(-1);

  const [activeChakra, setActiveChakra] = useState(-1);
  // Bumped each time the Third Eye chakra is (re)entered so its one-shot
  // effect remounts and replays.
  const [thirdEyeKey, setThirdEyeKey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Active chakra (one at a time, Crown -> Root).
        const idx = activeFromProgress(p);
        if (idx !== lastActive.current) {
          const prev = lastActive.current;
          lastActive.current = idx;
          setActiveChakra(idx);
          if (idx === THIRD_EYE_INDEX && prev !== THIRD_EYE_INDEX) {
            setThirdEyeKey((k) => k + 1);
          }
        }

        // Welcome text: full until 0.06, fade out by 0.10.
        if (welcomeRef.current) {
          const o =
            p < 0.06 ? 1 : p < 0.1 ? (0.1 - p) / 0.04 : 0;
          welcomeRef.current.style.opacity = String(o);
        }

        // Video reveal: fades up from below past 0.94.
        if (videoRef.current) {
          const vp = clamp((p - 0.94) / 0.05);
          videoRef.current.style.opacity = String(vp);
          videoRef.current.style.transform = `translateY(${(1 - vp) * 40}px)`;
        }
      },
    });

    // Recompute trigger measurements once the canvas / fonts have settled.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      trigger.kill();
    };
  }, []);

  const cardChakra = activeChakra >= 0 ? CHAKRAS[activeChakra] : null;

  return (
    <section ref={sectionRef} id="home" className="relative h-[800vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background visual */}
        <div className="absolute inset-0 z-10">
          {isMobile ? <MobileHeroVisual /> : <GalaxyCanvas />}
        </div>

        {/* Crown awakening: upward beam + edge vignette (behind the chakras) */}
        {!isMobile && activeChakra === CROWN_INDEX && <CrownEffect />}

        {/* Chakra orbs on the figure's spine */}
        <ChakraOverlays activeIndex={activeChakra} />

        {/* Sliding info card */}
        <ChakraCard chakra={cardChakra} />

        {/* Third Eye awakening sequence (one-shot, remounts via key) */}
        {!isMobile && activeChakra === THIRD_EYE_INDEX && (
          <ThirdEyeEffect key={thirdEyeKey} />
        )}

        {/* Welcome message */}
        <WelcomeText ref={welcomeRef} />

        {/* Final video reveal */}
        <VideoReveal ref={videoRef} />
      </div>
    </section>
  );
}
