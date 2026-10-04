"use client";

import { useTheme } from "./theme-provider";
import { HugeiconsIcon } from '@hugeicons/react'
import { Sun, Moon } from '@hugeicons/core-free-icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="ui-theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span aria-hidden="true">{isDark ? <HugeiconsIcon icon={Moon} size={14} /> : <HugeiconsIcon icon={Sun} size={14} />}</span>
    </button>
  );
}
