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
      ? "border-green-600 bg-green-600 text-slate-950 shadow-[0_14px_34px_rgba(34,197,94,.25)] hover:bg-green-500"
      : "border-slate-700/60 bg-slate-900 text-slate-200 hover:border-green-500/40 hover:text-green-400 hover:shadow-[0_12px_30px_rgba(34,197,94,.15)]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
