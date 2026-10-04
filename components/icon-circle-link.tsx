import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

type IconType = ComponentProps<typeof HugeiconsIcon>["icon"];

export const ICON_CIRCLE_CLASS =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent text-accent transition-colors hover:bg-accent-subtle";

type IconCircleLinkProps = {
  href: string;
  icon: IconType;
  label: string;
  external?: boolean;
};

export default function IconCircleLink({ href, icon, label, external }: IconCircleLinkProps) {
  const isExternal = external ?? !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={label}
      className={ICON_CIRCLE_CLASS}
    >
      <HugeiconsIcon icon={icon} className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
