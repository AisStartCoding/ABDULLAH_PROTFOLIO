"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";

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

/**
 * Generalizes the Home hero's crossfade to N sections: content stays fixed
 * in the same on-screen slot (below the navbar) the whole time — nothing
 * translates up or down with scroll. Scrolling only drives an opacity
 * crossfade, one section vanishing as the next takes its place, matching
 * the Home page's motion language across every inner page. A section taller
 * than the viewport scrolls internally rather than being clipped — the
 * fixed-slot pattern needs a bounded viewport-height area to work at all.
 */
export function ScrollCrossfade({ sections }: { sections: ReactNode[] }) {
  const reduced = useReducedMotion();
  const driverRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (reduced) return;
      const driver = driverRef.current;
      const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!driver || layers.length < 2) return;

      gsap.set(layers, { opacity: 0, pointerEvents: "none" });
      gsap.set(layers[0], { opacity: 1, pointerEvents: "auto" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: driver,
          start: "top top",
          end: "bottom bottom",
          scrub: MOTION.scrub
        }
      });

      // Sequential, not overlapping: the outgoing section fades fully to 0
      // before the incoming one starts fading in, so there's never a moment
      // with two sections' text both partially visible on top of each other
      // (which read as "blurry"/overlapping content).
      const step = 1 / (layers.length - 1);
      for (let i = 1; i < layers.length; i++) {
        const start = (i - 1) * step;
        const prev = layers[i - 1];
        const curr = layers[i];
        tl.to(prev, { opacity: 0, duration: step * 0.42, ease: "none" }, start)
          .set(prev, { pointerEvents: "none" }, start)
          .to(curr, { opacity: 1, duration: step * 0.42, ease: "none" }, start + step * 0.5)
          .set(curr, { pointerEvents: "auto" }, start + step * 0.92);
      }

      return () => tl.scrollTrigger?.kill();
    },
    { scope: driverRef, dependencies: [reduced, sections.length] }
  );

  // Nothing to crossfade between with a single section — render it plainly
  // in normal flow instead of forcing a sticky viewport-height shell on it.
  if (reduced || sections.length < 2) {
    return (
      <div className="flex flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8">
        {sections.map((section, i) => (
          <div key={i} className="mx-auto w-full max-w-6xl">
            {section}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={driverRef} className="relative" style={{ height: `${sections.length * 140}vh` }}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
        {sections.map((section, i) => (
          <div
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-y-auto bg-slate-950/95 px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center">{section}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
