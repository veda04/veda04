"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";

import { ROUTES, SITE } from "@/app/constants";

const NAV_LINKS = [
  { label: "About Me", href: ROUTES.about },
  { label: "Work", href: ROUTES.work },
  { label: "Research", href: ROUTES.publications },
  { label: "CV", href: ROUTES.resume },
  { label: "Blog", href: ROUTES.blogs },
  { label: "Contact", href: ROUTES.contact },
];

function isLinkActive(pathname: string, href: string): boolean {
  if (href === ROUTES.home) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          onClick={() => setIsOpen(false)}
          aria-label={SITE.ownerName}
          className="flex items-center text-xl font-bold tracking-tight text-foreground"
        >
          <span aria-hidden="true">V</span>
          <span
            aria-hidden="true"
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              scrolled ? "max-w-[3rem] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            EDA
          </span>
          <span aria-hidden="true" className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-10 text-sm font-medium tracking-wide text-foreground uppercase lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative pb-1 transition-colors hover:text-accent ${
                    active ? "text-accent" : ""
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={ROUTES.contact}
          className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Let&apos;s Talk
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
        >
          <HugeiconsIcon
            icon={isOpen ? Cancel01Icon : Menu01Icon}
            className="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </nav>

      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-background transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <ul className="flex flex-1 flex-col items-center justify-evenly">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`relative pb-2 text-4xl font-semibold tracking-wide uppercase transition-colors hover:text-accent ${
                    active ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
