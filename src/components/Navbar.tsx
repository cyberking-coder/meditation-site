"use client";

import { useEffect, useState } from "react";
import { BOOKING } from "@/lib/retreat";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Coach", href: "#coach" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/10 py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="font-serif text-xl font-medium tracking-wide text-white"
        >
          ✦ Inner Cosmos
        </a>
        <ul className="flex items-center gap-6 text-sm text-muted sm:gap-7">
          {LINKS.map((link) => (
            <li key={link.href} className="hidden sm:block">
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={BOOKING.tel}
              className="rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:opacity-90"
              style={{
                background: "linear-gradient(110deg, #7c3aed, #c026d3 55%, #4338ca)",
                boxShadow: "0 0 20px rgba(192,38,211,0.4)",
              }}
            >
              Book Slot
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
