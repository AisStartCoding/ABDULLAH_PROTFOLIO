"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Interests } from "@/components/sections/Interests";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { useScrollPageNavigation } from "@/lib/useScrollPageNavigation";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function ContactHero() {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLDivElement | null>(null);

  // Contact has no next route — useScrollPageNavigation's getAdjacentRoutes
  // naturally returns nextHref: null here, so forward scroll navigation is a
  // no-op; only scrolling up at the top hands back to Certificates.
  useScrollPageNavigation("/contact");

  // Infinity loop starts large and settles as this block scrolls into view.
  // Deliberately NOT a pinned/sticky driver like the other pages — Interests
  // below is a variable-height card grid, and pinning content of unknown
  // height inside an overflow-hidden viewport is exactly the class of bug
  // ("dead scroll zone" / clipped content) already hit earlier on this site.
  // A plain scroll-into-view scrub avoids that risk entirely.
  useGSAP(
    () => {
      if (reduced) return;
      const wrapper = wrapperRef.current;
      const object = objectRef.current;
      if (!wrapper || !object) return;

      gsap.set(object, { scale: 1.25, filter: "brightness(1.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 75%",
          end: "bottom 45%",
          scrub: MOTION.scrub
        }
      });

      tl.to(object, { scale: 0.85, filter: "brightness(1)", duration: 1, ease: "none" }, 0);

      return () => tl.scrollTrigger?.kill();
    },
    { scope: wrapperRef, dependencies: [reduced] }
  );

  return (
    <section className="relative overflow-hidden px-4 pb-8 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-[2/1] w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/devops-infinity.webp" className="inset-0" depth={3} duration={7.5} />
        </div>
      </div>

      <div ref={wrapperRef} className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeader
            eyebrow="Interests"
            title="What I like building"
            description="The kinds of problems and systems I gravitate toward."
          />
          <div ref={objectRef} className="als-3d-scene relative hidden aspect-[2/1] lg:block">
            <FloatingAsset src="/als-3d/devops-infinity.webp" className="inset-0" depth={3} duration={7.5} interactive />
          </div>
        </div>
        <Interests />
      </div>
    </section>
  );
}
