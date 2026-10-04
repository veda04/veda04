import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

type SectionHeaderRowProps = {
  title: string;
  viewAllHref: string;
  viewAllLabel?: string;
};

export default function SectionHeaderRow({
  title,
  viewAllHref,
  viewAllLabel = "View all",
}: SectionHeaderRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <h2 className="text-lg leading-snug font-bold tracking-[0.2em] text-foreground uppercase">
        {title}
      </h2>
      <Link
        href={viewAllHref}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent px-4 py-2 text-xs font-semibold tracking-wide text-accent uppercase transition-colors hover:bg-accent-subtle"
      >
        {viewAllLabel}
        <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
