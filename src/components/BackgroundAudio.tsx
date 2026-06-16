"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Looping ambient background music. Browsers block autoplay with sound, so it
 * starts on the first user interaction and can be toggled with the button.
 */
export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    const start = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={asset("/audio/ambient.mp3")} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
        className="glass fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-cosmos-purple"
        style={{ boxShadow: "0 0 20px rgba(124,58,237,0.35)" }}
      >
        <span className="flex items-end gap-[2px]" aria-hidden>
          <span
            className="w-[3px] rounded-full bg-current"
            style={{
              height: 8,
              animation: playing ? "audio-bar 0.9s ease-in-out infinite" : "none",
            }}
          />
          <span
            className="w-[3px] rounded-full bg-current"
            style={{
              height: 14,
              animation: playing
                ? "audio-bar 0.9s ease-in-out 0.15s infinite"
                : "none",
            }}
          />
          <span
            className="w-[3px] rounded-full bg-current"
            style={{
              height: 10,
              animation: playing
                ? "audio-bar 0.9s ease-in-out 0.3s infinite"
                : "none",
            }}
          />
        </span>
      </button>
    </>
  );
}
