import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Linkedin02Icon,
  LinkSquare02Icon,
  MailAtSign01Icon,
  MapPinIcon,
} from "@hugeicons/core-free-icons";

import { CAREER_START_YEAR, LOCATION, PROFILE, ROUTES } from "@/app/constants";
import { buildWebPageJsonLd, createPageMetadata, sanitizeJsonLd } from "@/app/seo";
import education from "@/data/education.json";
import skills from "@/data/skills.json";
import achievements from "@/data/achievements.json";
import work from "@/data/work.json";
import PrintResumeButton from "@/components/print-resume-button";

const RESUME_DESCRIPTION = "Education, skills, and work experience for Veda Salkar.";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description: RESUME_DESCRIPTION,
  path: ROUTES.resume,
});

const resumeJsonLd = buildWebPageJsonLd({
  title: `${PROFILE.name} — Resume`,
  description: RESUME_DESCRIPTION,
  path: ROUTES.resume,
});

const [FIRST_NAME, ...LAST_NAME_PARTS] = PROFILE.name.split(" ");
const LAST_NAME = LAST_NAME_PARTS.join(" ");

const CONTACT_ROWS = [
  { label: PROFILE.primaryEmail, href: `mailto:${PROFILE.primaryEmail}`, icon: MailAtSign01Icon },
  {
    label: `${LOCATION.locality}, ${LOCATION.region}, ${LOCATION.countryLabel}`,
    href: undefined,
    icon: MapPinIcon,
  },
  { label: PROFILE.linkedInDisplay, href: PROFILE.linkedInUrl, icon: Linkedin02Icon },
  { label: PROFILE.websiteLabel, href: PROFILE.websiteCanonicalUrl, icon: LinkSquare02Icon },
] as const;

export default function ResumePage() {
  return (
    <section className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(resumeJsonLd) }}
      />
      <div className="resume-print mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 print:px-0 print:py-0">
        <div className="no-print flex items-start justify-end">
          <PrintResumeButton />
        </div>

        <header className="mt-6 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between print:flex-col print:items-start">
          <div>
            <h1 className="text-4xl leading-tight font-bold tracking-wide text-foreground uppercase sm:text-5xl">
              {FIRST_NAME} <span className="text-muted-foreground">{LAST_NAME}</span>
            </h1>
            <p className="mt-2 text-sm tracking-[0.2em] text-muted-foreground uppercase">
              Researcher &amp; Software Engineer
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end print:items-start">
            {CONTACT_ROWS.map((row) => (
              <div key={row.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                    className="transition-colors hover:text-accent"
                  >
                    {row.label}
                  </a>
                ) : (
                  <span>{row.label}</span>
                )}
                <HugeiconsIcon
                  icon={row.icon}
                  className="resume-icon h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-12 print:flex print:flex-col print:gap-8">
          <aside className="flex flex-col gap-10 lg:border-r lg:border-border lg:pr-10 print:order-2 print:border-0 print:pr-0">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">
                Education
              </h2>
              <div className="mt-4 flex flex-col gap-5">
                {education.map((item) => (
                  <div key={item.degree}>
                    <p className="text-sm font-semibold text-foreground">{item.degree}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.institution}</p>
                    <p className="text-xs text-muted-foreground">{item.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">
                Skills
              </h2>
              <div className="mt-4 flex flex-col gap-5">
                {skills.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                      {group.category}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {group.skills.map((skill) => (
                        <li key={skill} className="text-sm text-muted-foreground">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">
                Awards
              </h2>
              <div className="mt-4 flex flex-col gap-5">
                {achievements.map((award) => (
                  <div key={award.title}>
                    <p className="text-sm font-semibold text-foreground">{award.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{award.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-10 print:order-1">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">
                Profile
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Researcher and engineer with {new Date().getFullYear() - CAREER_START_YEAR}+ years of
                experience, working across AI research, predictive maintenance, and full-stack
                software. Co-founder of Cosmokode Ltd and a Research Officer at the University of
                Huddersfield, moving comfortably between applied research and production
                engineering.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">
                Experience
              </h2>
              <div className="mt-4 flex flex-col gap-8">
                {work.map((job) => (
                  <div key={`${job.company}-${job.period}`}>
                    <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company} <span aria-hidden="true">|</span> {job.period}
                    </p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5">
                      {job.details.map((detail, index) => (
                        <li
                          key={index}
                          className="text-sm leading-relaxed text-muted-foreground marker:text-accent"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
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
