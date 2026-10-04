import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  LinkSquare02Icon,
  News01Icon,
  PlayCircleIcon,
} from "@hugeicons/core-free-icons";

import type { ArticleAddonLink } from "@/services/articles";

const KNOWN_ICONS: Record<string, typeof LinkSquare02Icon> = {
  git: GithubIcon,
  github: GithubIcon,
  repo: GithubIcon,
  repository: GithubIcon,
  source: GithubIcon,
  demo: PlayCircleIcon,
  live: PlayCircleIcon,
  preview: PlayCircleIcon,
  article: News01Icon,
  blog: News01Icon,
  post: News01Icon,
};

export default function AddonLink({ item }: { item: ArticleAddonLink }) {
  const key = item.type?.trim().toLowerCase();
  const knownIcon = key ? KNOWN_ICONS[key] : undefined;
  const label = item.label?.trim() || item.type;

  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noreferrer"
      title={label}
      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      <HugeiconsIcon icon={knownIcon ?? LinkSquare02Icon} className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
