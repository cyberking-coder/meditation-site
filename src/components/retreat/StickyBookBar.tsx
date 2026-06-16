"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING, RETREAT } from "@/lib/retreat";

/**
 * A persistent booking bar that slides in once the visitor reaches the retreat
 * content (past the hero) and hides again at the final CTA so it never doubles up.
 */
export default function StickyBookBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = document.getElementById("retreat-start");
    const end = document.getElementById("final-cta");
    if (!start) return;

    let pastStart = false;
    let atEnd = false;
    const update = () => setVisible(pastStart && !atEnd);

    const o1 = new IntersectionObserver(
      ([e]) => {
        // Past the hero once the intro's top scrolls above the viewport.
        pastStart = !e.isIntersecting && e.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 }
    );
    o1.observe(start);

    let o2: IntersectionObserver | undefined;
    if (end) {
      o2 = new IntersectionObserver(
        ([e]) => {
          atEnd = e.isIntersecting;
          update();
        },
        { threshold: 0 }
      );
      o2.observe(end);
    }

    return () => {
      o1.disconnect();
      o2?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass fixed inset-x-0 bottom-0 z-40 border-t border-white/10"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <div className="min-w-0">
              <p className="truncate font-serif text-lg text-white">
                Know Thyself — {RETREAT.badge}
              </p>
              <p className="hidden text-xs uppercase tracking-[0.2em] text-muted sm:block">
                Goa · Cavelossim · Limited seats
              </p>
            </div>
            <a
              href={BOOKING.tel}
              className="shrink-0 rounded-full px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:opacity-90"
              style={{
                background: "linear-gradient(110deg, #7c3aed, #c026d3 55%, #4338ca)",
                boxShadow: "0 0 24px rgba(192,38,211,0.45)",
              }}
            >
              Book Now »
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
