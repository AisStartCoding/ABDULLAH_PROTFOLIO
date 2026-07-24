"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CommandCard } from "@/components/ui/CommandCard";
import { SkillsScene } from "@/components/sections/SkillsScene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { getAdjacentRoutes } from "@/lib/portfolio-routes";
import { useScrollAdvance } from "@/lib/useScrollAdvance";
import type { SkillCategory } from "@/types/portfolio";

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

export function Skills({ categories }: { categories: SkillCategory[] }) {
  const reduced = useReducedMotion();
  const driverRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  const sceneCompleteRef = useRef(false);
  const { nextHref } = getAdjacentRoutes("/skills");
  useScrollAdvance({ enabledRef: sceneCompleteRef, href: nextHref, direction: 1 });

  useEffect(() => {
    const onScroll = () => {
      sceneCompleteRef.current = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The whole cube+node composition starts large and dominant, then scales
  // down and settles into its resting position as the reader scrolls —
  // desktop only, mirroring About's object choreography.
  useGSAP(
    () => {
      if (reduced) return;
      const driver = driverRef.current;
      const scene = sceneRef.current;
      if (!driver || !scene) return;

      gsap.set(scene, { scale: 1.3, filter: "brightness(1.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: driver,
          start: "top top",
          end: "bottom bottom",
          scrub: MOTION.scrub
        }
      });

      tl.to(scene, { scale: 0.82, filter: "brightness(1)", duration: 1, ease: "none" }, 0);

      return () => tl.scrollTrigger?.kill();
    },
    { scope: driverRef, dependencies: [reduced] }
  );

  return (
    <section id="skills" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <SkillsScene className="aspect-square w-4/5 max-w-xs" />
      </div>

      <div ref={driverRef} className={reduced ? "relative" : "relative lg:h-[140vh]"}>
        <div className={reduced ? "relative" : "relative z-10 lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:overflow-hidden"}>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <SectionHeader
              eyebrow="Core systems"
              title="Full-stack, API, and infrastructure toolkit"
              description="A focused stack for building APIs, data models, deployment workflows, and stable production environments."
            />
            <div ref={sceneRef} className="hidden aspect-square lg:block">
              <SkillsScene className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : (index % 3) * 0.08, ease: "easeOut" }}
            >
              <CommandCard>
                <h3 className="mb-4 text-lg font-semibold text-slate-50">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => <Chip key={skill.id}>{skill.name}</Chip>)}
                </div>
              </CommandCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
