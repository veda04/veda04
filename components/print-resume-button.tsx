"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Download04Icon } from "@hugeicons/core-free-icons";

import { PROFILE } from "@/app/constants";

function handlePrint() {
  const originalTitle = document.title;
  document.title = `${PROFILE.name} Resume`;

  const restoreTitle = () => {
    document.title = originalTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  window.addEventListener("afterprint", restoreTitle);

  window.print();
}

export default function PrintResumeButton() {
  return (
    <button
      type="button"
      onClick={handlePrint}
      className="no-print inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-xs font-semibold tracking-wide text-accent uppercase transition-colors hover:bg-accent-subtle"
    >
      <HugeiconsIcon icon={Download04Icon} className="h-4 w-4" aria-hidden="true" />
      Download PDF
    </button>
  );
}
