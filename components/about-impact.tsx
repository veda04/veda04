import Link from "next/link";
import publications from "@/data/publications.json";

import { CAREER_START_YEAR, EXTERNAL_LINKS, PROFILE } from "@/app/constants";
import { reinata } from "@/lib/fonts";
import { buildProfileVCard } from "@/lib/vcard";
import { FlipAvatar } from "@/components/flip-avatar";
import Kicker from "@/components/kicker";

const STATS = [
  { value: `${String(new Date().getFullYear() - CAREER_START_YEAR).padStart(2, "0")}+`, label: "Years of Experience" },
  { value: "15+", label: "Projects Delivered" },
  { value: `${String(publications.length).padStart(2, "0")}+`, label: "Academic Publications" },
] as const;

const VCARD = buildProfileVCard();

export default function AboutImpact() {
  return (
    <section className="w-full border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-center md:gap-10 lg:gap-16">
          <div className="flex flex-col gap-6 sm:gap-8 md:col-span-3">
            <div>
              <Kicker>About Me</Kicker>
            </div>

            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              I lead where applied research meets product engineering, turning AI research,
              predictive maintenance, and full-stack systems into outcomes that ship, scale,
              and publish. As Co-founder of {" "}
              <Link
                href={EXTERNAL_LINKS.cosmokode}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Cosmokode Ltd
              </Link> {" "}
              and a Research Officer at the {" "}
              <Link
                href={PROFILE.affiliationUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent transition-colors hover:text-accent/80"
              >
                University of Huddersfield
              </Link>, I partner with clients and institutions that need
              leadership, not just code.
            </p>

            <div>
              <p className={`${reinata.className} text-3xl lg:text-6xl text-foreground select-none`}>
                {PROFILE.name}
              </p>
            </div>

            <div>
              <h2 className="text-lg leading-snug font-bold tracking-[0.2em] text-foreground uppercase">
                Impact &amp; Experience
              </h2>
              <span className="mt-3 block h-0.5 w-10 bg-accent" aria-hidden="true" />

              <div className="max-w-md lg:max-w-full mt-8 grid grid-cols-3 gap-4 sm:gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="border-l border-border pl-4 first:border-l-0 first:pl-0">
                    <p className="text-4xl font-light text-foreground sm:text-4xl lg:text-6xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="md:col-span-2">
            <FlipAvatar
              src="/images/hero_image.png"
              alt={PROFILE.profileImageAlt}
              vcard={VCARD}
              variant="portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
