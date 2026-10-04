"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link05Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { ICON_CIRCLE_CLASS } from "@/components/icon-circle-link";

type CopyUrlButtonProps = {
  path: string;
  className?: string;
};

export default function CopyUrlButton({ path, className }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const value = `${window.location.origin}${normalizedPath}`;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Link copied" : "Copy link to this article"}
      className={className ?? ICON_CIRCLE_CLASS}
    >
      <HugeiconsIcon icon={copied ? Tick02Icon : Link05Icon} className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
