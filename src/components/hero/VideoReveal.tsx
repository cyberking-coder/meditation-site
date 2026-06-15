"use client";

import { forwardRef, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Full-screen video reveal for segment 8. Container opacity/scale is driven by
 * the Hero rAF loop via the forwarded ref. The testimonial source lives at
 * /videos/client.mp4 — if that asset is absent we show a graceful fallback.
 */
const VideoReveal = forwardRef<HTMLDivElement>(function VideoReveal(_, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center bg-cosmos/90 px-6 opacity-0 will-change-[opacity,transform]"
    >
      <h2 className="text-glow mb-2 font-serif text-4xl font-light text-white sm:text-5xl">
        Meet Your Guide
      </h2>
      <p className="mb-8 text-muted">Begin your healing journey</p>

      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10"
        style={{ boxShadow: "0 0 60px rgba(124,58,237,0.35)" }}
      >
        {failed ? (
          <div className="flex aspect-video flex-col items-center justify-center bg-cosmos-deep text-center text-muted">
            <span className="text-5xl">✦</span>
            <p className="mt-4 px-6 text-sm">
              Your guide&apos;s message is being prepared.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={asset("/videos/client.mp4")}
            className="aspect-video w-full bg-black"
            autoPlay
            muted
            loop
            playsInline
            controls
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {!failed && (
        <button
          type="button"
          onClick={toggleMute}
          className="pointer-events-auto mt-6 rounded-full border border-cosmos-purple/60 bg-cosmos-purple/20 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-cosmos-purple/40"
          style={{ boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}
        >
          {muted ? "🔊 Unmute" : "🔇 Mute"}
        </button>
      )}
    </div>
  );
});

export default VideoReveal;
