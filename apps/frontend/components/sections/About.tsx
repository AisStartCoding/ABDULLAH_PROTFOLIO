"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CommandCard } from "@/components/ui/CommandCard";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { getAdjacentRoutes } from "@/lib/portfolio-routes";
import { useScrollAdvance } from "@/lib/useScrollAdvance";
import type { HeroContent } from "@/types/portfolio";

const PRINCIPLES = [
  { title: "Business requirements first", body: "Every schema and endpoint traces back to an actual workflow, not a speculative feature." },
  { title: "Clean domain boundaries", body: "Modules stay decoupled so one team's change doesn't ripple into another's." },
  { title: "Reliable APIs", body: "Versioned, validated, and documented contracts that don't break consumers." },
  { title: "Secure infrastructure", body: "Server hardening, HTTPS, firewalls, and least-privilege access by default." },
  { title: "Measurable performance", body: "Caching, indexing, and query plans checked against real load, not guesses." },
  { title: "Maintainable architecture", body: "Code a future engineer (or future me) can read and extend without an oral history." }
];

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

export function About({ hero }: { hero: HeroContent }) {
  const reduced = useReducedMotion();
  const driverRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLDivElement | null>(null);

  // COMPLETED for this page means "reached the bottom of About's own
  // content" (principles + ExperienceSnapshot below), not just the object
  // choreography finishing — the object settles early in the scroll, well
  // before the reader has actually seen the rest of the page.
  const sceneCompleteRef = useRef(false);
  const { nextHref } = getAdjacentRoutes("/about");
  useScrollAdvance({ enabledRef: sceneCompleteRef, href: nextHref, direction: 1 });

  useEffect(() => {
    const onScroll = () => {
      sceneCompleteRef.current = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Object choreography: the workstation starts large and dominant, then
  // scales down and settles into its final resting position as the user
  // scrolls — desktop only, matching the "current object mapping" already
  // established (About = fullstack-workstation) rather than the more
  // generic python-core example in the spec.
  useGSAP(
    () => {
      if (reduced) return;
      const driver = driverRef.current;
      const object = objectRef.current;
      if (!driver || !object) return;

      gsap.set(object, { scale: 1.35, filter: "brightness(1.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: driver,
          start: "top top",
          end: "bottom bottom",
          scrub: MOTION.scrub
        }
      });

      tl.to(object, { scale: 0.8, filter: "brightness(1)", duration: 1, ease: "none" }, 0);

      return () => tl.scrollTrigger?.kill();
    },
    { scope: driverRef, dependencies: [reduced] }
  );

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-square w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/fullstack-workstation.webp" className="inset-0" depth={3} duration={7} />
        </div>
      </div>

      <div ref={driverRef} className={reduced ? "relative" : "relative lg:h-[140vh]"}>
        <div className={reduced ? "relative" : "relative z-10 lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:overflow-hidden"}>
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <SectionHeader eyebrow="About" title="I build systems that stay reliable" description={hero.subtext} />
            <div ref={objectRef} className="als-3d-scene relative hidden aspect-square lg:block">
              <FloatingAsset src="/als-3d/fullstack-workstation.webp" className="inset-0" depth={3} duration={7} interactive />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : (index % 2) * 0.08, ease: "easeOut" }}
            >
              <CommandCard>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-slate-50">{principle.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{principle.body}</p>
                  </div>
                </div>
              </CommandCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
