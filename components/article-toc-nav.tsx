"use client";

import { useEffect, useMemo, useState } from "react";

import type { TocItem } from "@/services/articles";

type ArticleTocNavProps = {
  items: TocItem[];
};

export default function ArticleTocNav({ items }: ArticleTocNavProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (ids.length === 0) return;

    const headingElements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] },
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="Table of contents">
      <div className="relative">
        {/* Track line */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />

        <ul className="space-y-0">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const indent = Math.max(0, item.level - 2) * 10;

            return (
              <li key={item.id} className="relative">
                {/* Active accent - sits on top of the gray track */}
                <span
                  className={`absolute top-0.5 bottom-0.5 left-0 w-0.5 rounded-full transition-all duration-200 ${
                    isActive ? "bg-accent" : "bg-transparent"
                  }`}
                />

                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block truncate py-[5px] text-[12.5px] leading-snug transition-colors duration-150 ${
                    isActive
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } ${item.level > 2 ? "opacity-90" : ""}`}
                  style={{ paddingLeft: `${indent + 14}px` }}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
