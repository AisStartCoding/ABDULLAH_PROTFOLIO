import Link from "next/link";
import type { ReactNode } from "react";

type GlowButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function GlowButton({ href, children, variant = "primary" }: GlowButtonProps) {
  const classes =
    variant === "primary"
      ? "border-cyan-300/50 bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,.28)] hover:bg-white"
      : "border-slate-500/40 bg-slate-950/50 text-slate-100 hover:border-cyan-300/70 hover:text-cyan-100";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
