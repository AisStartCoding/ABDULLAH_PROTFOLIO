"use client";

// Wires up both directions of scroll-driven page navigation for a route:
// scrolling further down once at the bottom goes to the next route,
// scrolling further up once at the top goes back to the previous route.
// `getAdjacentRoutes` naturally returns null for whichever end doesn't
// exist (Home has no prevHref, Contact has no nextHref), and
// useScrollAdvance no-ops when href is null — so nothing extra is needed
// to satisfy "Home must not navigate backward" / "Contact must not
// navigate forward".
import { useEffect, useRef } from "react";
import { getAdjacentRoutes } from "@/lib/portfolio-routes";
import { useScrollAdvance } from "@/lib/useScrollAdvance";

export function useScrollPageNavigation(pathname: string) {
  const { prevHref, nextHref } = getAdjacentRoutes(pathname);
  const atTopRef = useRef(false);
  const atBottomRef = useRef(false);

  useScrollAdvance({ enabledRef: atTopRef, href: prevHref, direction: -1 });
  useScrollAdvance({ enabledRef: atBottomRef, href: nextHref, direction: 1 });

  useEffect(() => {
    const onScroll = () => {
      atTopRef.current = window.scrollY <= 4;
      atBottomRef.current = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
