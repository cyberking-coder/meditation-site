"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAKRAS } from "@/lib/chakras";
import { asset } from "@/lib/asset";
import { useIsMobile } from "@/lib/useIsMobile";

// Cosmic nebula background — matches the reference palette (pink left, blue
// right, bright core). Used as a fallback under the real image so the hero is
// never blank; drop public/images/cosmos-bg.png in to use the photo.
const NEBULA_BG =
  "radial-gradient(60% 50% at 24% 42%, rgba(196,70,180,0.5), transparent 62%)," +
  "radial-gradient(55% 48% at 72% 56%, rgba(64,116,236,0.5), transparent 62%)," +
  "radial-gradient(38% 32% at 50% 52%, rgba(255,255,255,0.45), transparent 30%)," +
  "radial-gradient(90% 80% at 50% 48%, rgba(86,32,128,0.4), transparent 72%)," +
  "linear-gradient(180deg, #08021c 0%, #030010 100%)";
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
  const portalRef = useRef<HTMLDivElement>(null);
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

        // Zoom INTO the opened eye: a bright portal grows from the third-eye
        // point to fill the screen (0.86 -> 0.95), then fades to reveal video.
        if (portalRef.current) {
          const zp = clamp((p - 0.86) / 0.09);
          const scale = 0.2 + zp * 48;
          let op: number;
          if (p < 0.86) op = 0;
          else if (p <= 0.95) op = clamp(zp * 1.5);
          else op = clamp((1 - p) / 0.05); // fade out 0.95 -> 1.0
          portalRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
          portalRef.current.style.opacity = String(op);
        }

        // Video opens OUT of the portal: zoom-reveal once the portal whites out.
        if (videoRef.current) {
          const vp = clamp((p - 0.95) / 0.05);
          videoRef.current.style.opacity = String(vp);
          videoRef.current.style.transform = `scale(${0.9 + vp * 0.1})`;
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
        {/* Cosmic nebula background: gradient stand-in + (optional) image,
            gently drifting. The 3D canvas above is transparent. */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0" style={{ background: NEBULA_BG }} />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${asset("/images/cosmos-bg.png")})`,
              animation: "bg-drift 45s ease-in-out infinite",
              willChange: "transform",
            }}
          />
        </div>

        {/* Background visual (transparent 3D canvas / mobile CSS) */}
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

        {/* Zoom portal: bright light that grows out of the eye into the video */}
        <div
          ref={portalRef}
          className="pointer-events-none absolute z-[46] h-10 w-10 rounded-full"
          style={{
            left: "50%",
            top: `${CHAKRAS[5].top}%`,
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 0,
            background:
              "radial-gradient(circle, #ffffff 0%, #e6dbff 30%, rgba(155,107,255,0.6) 55%, rgba(106,13,173,0) 75%)",
            willChange: "transform, opacity",
          }}
        />

        {/* Welcome message */}
        <WelcomeText ref={welcomeRef} />

        {/* Final video reveal */}
        <VideoReveal ref={videoRef} />
      </div>
    </section>
  );
}
