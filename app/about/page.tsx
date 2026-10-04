import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  GithubIcon,
  JavaScriptIcon,
  PythonIcon,
  ReactIcon,
  TypescriptIcon,
} from "@hugeicons/core-free-icons";

import { CAREER_START_YEAR, LOCATION, PROFILE, ROUTES } from "@/app/constants";
import { buildWebPageJsonLd, createPageMetadata, sanitizeJsonLd } from "@/app/seo";
import { buildProfileVCard } from "@/lib/vcard";
import { FlipAvatar } from "@/components/flip-avatar";
import SocialIconLinks from "@/components/social-icon-links";

const DESCRIPTION = "Researcher and engineer working across AI, manufacturing, and full-stack software.";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: DESCRIPTION,
  path: ROUTES.about,
  image: "/images/hero_image.png",
  imageAlt: PROFILE.profileImageAlt,
});

const VCARD = buildProfileVCard();

const CORE_TOOLS = [
  { label: "Python", icon: PythonIcon },
  { label: "React", icon: ReactIcon },
  { label: "JavaScript", icon: JavaScriptIcon },
  { label: "GitHub", icon: GithubIcon },
  { label: "Typescript", icon: TypescriptIcon },
] as const;

const EXPERIENCE_YEARS = `${new Date().getFullYear() - CAREER_START_YEAR}+`;

export default function AboutPage() {
  const aboutJsonLd = buildWebPageJsonLd({
    title: `About ${PROFILE.name}`,
    description: DESCRIPTION,
    path: ROUTES.about,
    image: "/images/hero_image.png",
    type: "ProfilePage",
  });

  return (
    <section className="w-full border-t border-border bg-background-secondary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(aboutJsonLd) }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center">
            <FlipAvatar
              src="/images/hero_image.png"
              alt={PROFILE.profileImageAlt}
              vcard={VCARD}
            />
            <p className="mt-6 text-lg font-bold text-foreground">{PROFILE.name}</p>
            <a
              href={`mailto:${PROFILE.primaryEmail}`}
              className="mt-1 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {PROFILE.primaryEmail}
            </a>

            <SocialIconLinks className="flex items-center gap-4 mt-6" />

            <Link
              href={ROUTES.resume}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Download CV
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-background p-8">
              <h1 className="text-3xl font-bold text-foreground uppercase sm:text-4xl">
                About {PROFILE.name}
              </h1>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4" aria-hidden="true" />
                Open to work
              </p>

              <div className="mt-5 space-y-4 text-sm text-muted-foreground sm:text-base">
                <p>
                  I&apos;m a researcher and engineer with {" "}
                  {EXPERIENCE_YEARS} years of experience, focused on
                  turning AI research and full-stack systems into products that ship, scale, and
                  publish. As Co-founder of Cosmokode Ltd and a Research Officer at the University
                  of Huddersfield, I move between applied research and production engineering.
                </p>
                <p>
                  Born and raised in Goa, India, and now based in {LOCATION.locality},{" "}
                  {LOCATION.countryLabel}. When I&apos;m not deep in a model or a codebase,
                  you&apos;ll find me exploring data visualisation side-projects or reading up on
                  the latest in manufacturing AI.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-8">
              <h2 className="text-lg font-bold text-foreground">Core Tools</h2>
              <div className="mt-5 flex flex-wrap gap-6">
                {CORE_TOOLS.map((tool) => (
                  <div key={tool.label} className="flex flex-col items-center gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground">
                      <HugeiconsIcon icon={tool.icon} className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-xs text-muted-foreground">{tool.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
