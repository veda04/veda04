import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, IdCardLanyardIcon, MailAtSign01Icon } from "@hugeicons/core-free-icons";

import { PROFILE, ROUTES, SITE, SOCIAL_LINKS } from "@/app/constants";
import { SOCIAL_ICON_MAP } from "@/lib/social-icons";

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: PROFILE.primaryEmail,
    href: `mailto:${PROFILE.primaryEmail}`,
    icon: MailAtSign01Icon,
  },
  {
    label: "ORCiD",
    value: PROFILE.orcidLabel,
    href: PROFILE.orcidUrl,
    icon: IdCardLanyardIcon,
  },
  {
    label: "LinkedIn",
    value: PROFILE.linkedInDisplay,
    href: PROFILE.linkedInUrl,
    icon: SOCIAL_ICON_MAP.Linkedin02Icon,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-border bg-background">
      <div className="py-12 sm:py-16">
        <div className="border border-border bg-surface p-6 sm:p-10 lg:p-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-center lg:gap-10">
            <div>
              <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground uppercase sm:text-3xl">
                Let&apos;s
                <br />
                Connect
              </h2>
              <span className="mt-3 block h-0.5 w-10 bg-accent" aria-hidden="true" />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                I&apos;m currently available for freelance and full-time opportunities.
              </p>
            </div>

            <div className="h-px w-full bg-border lg:h-auto lg:w-px lg:self-stretch" aria-hidden="true" />

            <div className="space-y-5">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent text-accent">
                    <HugeiconsIcon icon={item.icon} className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-foreground transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={ROUTES.contact}
              className="flex min-h-[140px] w-full flex-col justify-between rounded-xl border border-accent bg-background p-6 text-foreground transition-colors hover:bg-accent-subtle lg:w-56"
            >
              <p className="text-lg leading-snug font-semibold uppercase">
                Let&apos;s build something great together
              </p>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-6 w-6 text-accent" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>
            &copy; {year} {SITE.ownerName}. {SITE.copyrightSuffix}
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const isExternal = !social.url.startsWith("mailto:");
              return (
                <a
                  key={social.handle}
                  href={social.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="text-foreground transition-colors hover:text-accent"
                >
                  <HugeiconsIcon
                    icon={SOCIAL_ICON_MAP[social.icon as keyof typeof SOCIAL_ICON_MAP]}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
