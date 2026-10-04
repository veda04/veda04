"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`no-print fixed bottom-6 right-5 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ui-border-soft)] bg-background/90 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[var(--ui-text-muted)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ui-text-link)] focus-visible:outline-offset-2 sm:bottom-8 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="6.5" y1="10.5" x2="6.5" y2="2.5" />
        <polyline points="3,6 6.5,2.5 10,6" />
      </svg>
    </button>
  );
}
