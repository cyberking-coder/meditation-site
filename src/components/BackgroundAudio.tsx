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
  // Tracks whether the user wants sound on, so we can resume after tab switches
  // / unexpected pauses without overriding an intentional mute.
  const wantPlaying = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;

    const play = () => {
      audio
        .play()
        .then(() => {
          wantPlaying.current = true;
          setPlaying(true);
        })
        .catch(() => {});
    };

    const start = () => {
      play();
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    // Belt-and-suspenders looping: if it ever ends or gets paused by the
    // browser (tab switch, etc.) while the user wants it on, resume it.
    const onEnded = () => {
      if (wantPlaying.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };
    const onVisible = () => {
      if (document.visibilityState === "visible" && wantPlaying.current) {
        audio.play().catch(() => {});
      }
    };
    audio.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      audio.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      wantPlaying.current = true;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      wantPlaying.current = false;
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
