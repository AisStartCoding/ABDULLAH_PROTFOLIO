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

  // Header + object pinned together and settle from focus to resting scale,
  // matching About/Skills/Projects/Certificates — desktop only. Interests
  // (variable-height card grid) lives below the driver in normal flow, so
  // pinning never has to contain unknown-height content (the clipping risk
  // that ruled out a sticky driver here previously no longer applies once
  // Interests is outside it).
  useGSAP(
    () => {
      if (reduced) return;
      const driver = wrapperRef.current;
      const object = objectRef.current;
      if (!driver || !object) return;

      gsap.set(object, { scale: 1.25, filter: "brightness(1.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: driver,
          start: "top top",
          end: "bottom bottom",
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
      <div ref={wrapperRef} className={reduced ? "relative z-10 mx-auto max-w-6xl" : "relative z-10 mx-auto max-w-6xl lg:h-[140vh]"}>
        <div
          className={
            reduced
              ? "relative"
              : "relative lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:overflow-hidden"
          }
        >
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <SectionHeader
              eyebrow="Interests"
              title="What I like building"
              description="The kinds of problems and systems I gravitate toward."
            />
            <div ref={objectRef} className="als-3d-scene relative hidden aspect-[2/1] lg:block">
              <FloatingAsset src="/als-3d/devops-infinity.webp" className="inset-0" depth={3} duration={7.5} interactive />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-[2/1] w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/devops-infinity.webp" className="inset-0" depth={3} duration={7.5} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Interests />
      </div>
    </section>
  );
}
