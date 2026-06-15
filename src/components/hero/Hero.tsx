"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAKRAS, progressToSegment, type Chakra } from "@/lib/chakras";
import { useIsMobile } from "@/lib/useIsMobile";
import ChakraOverlays from "./ChakraOverlays";
import ChakraCard from "./ChakraCard";
import WelcomeText from "./WelcomeText";
import VideoReveal from "./VideoReveal";
import MobileHeroVisual from "./MobileHeroVisual";
import ThirdEyeEffect from "./ThirdEyeEffect";
import CrownEffect from "./CrownEffect";

// Third Eye = chakra 6 (segment 6), Crown = chakra 7 (segment 7).
const THIRD_EYE_SEGMENT = 6;
const CROWN_SEGMENT = 7;

gsap.registerPlugin(ScrollTrigger);

const ALL_IDS = new Set(CHAKRAS.map((c) => c.id));
const EMPTY_IDS = new Set<number>();

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
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
  const lastSegment = useRef(-1);

  const [activeIds, setActiveIds] = useState<Set<number>>(EMPTY_IDS);
  const [cardChakra, setCardChakra] = useState<Chakra | null>(null);
  const [segment, setSegment] = useState(0);
  // Bumped each time the Third Eye segment is (re)entered so its one-shot
  // effect remounts and replays.
  const [thirdEyeKey, setThirdEyeKey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const applySegment = (next: number) => {
      const prev = lastSegment.current;
      if (next === prev) return;
      lastSegment.current = next;
      setSegment(next);

      // Fire the Third Eye effect once, on entering its segment.
      if (next === THIRD_EYE_SEGMENT && prev !== THIRD_EYE_SEGMENT) {
        setThirdEyeKey((k) => k + 1);
      }

      if (next === 0) {
        setActiveIds(EMPTY_IDS);
        setCardChakra(null);
      } else if (next >= 1 && next <= 6) {
        // One chakra active at a time; the previous dims as the next lights up.
        const chakra = CHAKRAS[next - 1];
        setActiveIds(new Set([chakra.id]));
        setCardChakra(chakra);
      } else {
        // segments 7 & 8: every chakra glows together
        setActiveIds(ALL_IDS);
        setCardChakra(next === 7 ? CHAKRAS[6] : null);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        applySegment(progressToSegment(p));

        // Welcome text fades out across segment 0.
        if (welcomeRef.current) {
          const o = 1 - clamp(p / 0.09);
          welcomeRef.current.style.opacity = String(o);
          welcomeRef.current.style.transform = `translateY(${(1 - o) * -40}px)`;
        }

        // Video reveals across segment 8 (94%-100%).
        if (videoRef.current) {
          const vp = clamp((p - 0.94) / 0.05);
          videoRef.current.style.opacity = String(vp);
          videoRef.current.style.transform = `scale(${0.88 + vp * 0.12})`;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-[800vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background visual */}
        <div className="absolute inset-0 z-10">
          {isMobile ? <MobileHeroVisual /> : <GalaxyCanvas />}
        </div>

        {/* Crown awakening: upward beam + edge vignette (behind the chakras) */}
        {!isMobile && segment >= CROWN_SEGMENT && <CrownEffect />}

        {/* Chakra PNG overlays on the figure's spine */}
        <ChakraOverlays activeIds={activeIds} />

        {/* Sliding info card */}
        <ChakraCard chakra={cardChakra} />

        {/* Third Eye awakening sequence (one-shot, remounts via key) */}
        {!isMobile && segment === THIRD_EYE_SEGMENT && (
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
