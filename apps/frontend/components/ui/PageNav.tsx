"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAdjacentRoutes } from "@/lib/portfolio-routes";

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
// Desktop relies entirely on scroll-driven navigation (useScrollPageNavigation);
// these buttons are a mobile-only affordance where scroll-threshold gestures
// are less discoverable, so they're hidden from sm and up.
export function PageNav({ current }: { current: string }) {
  const { prevHref, nextHref } = getAdjacentRoutes(current);

  return (
    <nav aria-label="Page navigation" className="sm:hidden">
      {prevHref && (
        <Link
          href={prevHref}
          aria-label={`Previous: ${LABELS[prevHref]}`}
          className="cursor-target fixed bottom-4 left-4 z-40 inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-slate-700/60 bg-slate-950/90 px-3 text-sm font-semibold text-slate-300 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-green-500/40 hover:text-green-400"
        >
          <ArrowLeft className="h-4 w-4" /> <span>{LABELS[prevHref]}</span>
        </Link>
      )}

      {nextHref && (
        <Link
          href={nextHref}
          aria-label={`Next: ${LABELS[nextHref]}`}
          className="cursor-target fixed bottom-4 right-4 z-40 inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-slate-700/60 bg-slate-950/90 px-3 text-sm font-semibold text-slate-300 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-green-500/40 hover:text-green-400"
        >
          <span>{LABELS[nextHref]}</span> <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
