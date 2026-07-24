"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const ORDER = ["/", "/about", "/skills", "/projects", "/certificates", "/contact"];
const LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/skills": "Skills",
  "/projects": "Projects",
  "/certificates": "Certificates",
  "/contact": "Contact"
};

// Home is reachable from the real navbar's logo — this only handles
// Previous/Next, left-middle and right-middle.
export function PageNav({ current }: { current: string }) {
  const index = ORDER.indexOf(current);
  const prevHref = index > 0 ? ORDER[index - 1] : null;
  const nextHref = index >= 0 && index < ORDER.length - 1 ? ORDER[index + 1] : null;

  return (
    <nav aria-label="Page navigation">
      {prevHref && (
        <Link
          href={prevHref}
          aria-label={`Previous: ${LABELS[prevHref]}`}
          className="cursor-target fixed bottom-4 left-4 top-auto z-40 inline-flex h-11 min-w-11 translate-y-0 items-center justify-center gap-2 rounded-md border border-slate-700/60 bg-slate-950/90 px-3 text-sm font-semibold text-slate-300 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-green-500/40 hover:text-green-400 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:px-4"
        >
          <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">{LABELS[prevHref]}</span>
        </Link>
      )}

      {nextHref && (
        <Link
          href={nextHref}
          aria-label={`Next: ${LABELS[nextHref]}`}
          className="cursor-target fixed bottom-4 right-4 top-auto z-40 inline-flex h-11 min-w-11 translate-y-0 items-center justify-center gap-2 rounded-md border border-slate-700/60 bg-slate-950/90 px-3 text-sm font-semibold text-slate-300 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-green-500/40 hover:text-green-400 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:px-4"
        >
          <span className="hidden sm:inline">{LABELS[nextHref]}</span> <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
