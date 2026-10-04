import type { ReactNode } from "react";

export default function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{children}</p>;
}
