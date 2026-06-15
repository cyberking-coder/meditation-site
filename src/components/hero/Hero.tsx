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
const CROWN_INDEX = 6;

// Bottom -> top, then a return pass back to the Third Eye where the eye opens
// and leads into the client video.
const SEGMENTS = [
  { start: 0.08, end: 0.19, index: 0 }, // Root
  { start: 0.19, end: 0.3, index: 1 }, // Sacral
  { start: 0.3, end: 0.41, index: 2 }, // Solar
  { start: 0.41, end: 0.52, index: 3 }, // Heart
  { start: 0.52, end: 0.62, index: 4 }, // Throat
  { start: 0.62, end: 0.73, index: 5 }, // Third Eye — first pass: glow only
  { start: 0.73, end: 0.84, index: 6 }, // Crown
  { start: 0.84, end: 0.94, index: 5, eyeOpen: true }, // return: the eye opens
];

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function segmentAt(p: number): number {
  for (let i = 0; i < SEGMENTS.length; i++) {
    const s = SEGMENTS[i];
    if (p >= s.start && p < s.end) return i;
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
  const lastSeg = useRef(-1);

  const [activeChakra, setActiveChakra] = useState(-1);
  // True only on the return pass to the Third Eye, where the eye opens.
  const [eyeOpen, setEyeOpen] = useState(false);
  // Bumped when the eye-opening pass is (re)entered so its one-shot effect replays.
  const [eyeKey, setEyeKey] = useState(0);

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

        const segIdx = segmentAt(p);
        if (segIdx !== lastSeg.current) {
          lastSeg.current = segIdx;
          const seg = segIdx >= 0 ? SEGMENTS[segIdx] : null;
          setActiveChakra(seg ? seg.index : -1);
          const open = !!seg?.eyeOpen;
          setEyeOpen(open);
          if (open) setEyeKey((k) => k + 1);
        }

        // Welcome text: full until 0.06, fade out by 0.10.
        if (welcomeRef.current) {
          const o = p < 0.06 ? 1 : p < 0.1 ? (0.1 - p) / 0.04 : 0;
          welcomeRef.current.style.opacity = String(o);
        }

        // Video reveal: begins as the eye finishes opening, past 0.94.
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

        {/* Third Eye opening — only on the return pass after the Crown */}
        {!isMobile && eyeOpen && <ThirdEyeEffect key={eyeKey} />}

        {/* Welcome message */}
        <WelcomeText ref={welcomeRef} />

        {/* Final video reveal */}
        <VideoReveal ref={videoRef} />
      </div>
    </section>
  );
}
