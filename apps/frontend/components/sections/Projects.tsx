"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { useScrollPageNavigation } from "@/lib/useScrollPageNavigation";
import type { Project } from "@/types/portfolio";

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

export function Projects({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const driverRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLDivElement | null>(null);

  useScrollPageNavigation("/projects");

  // Portal begins large and glowing, scales down to its resting position as
  // the reader scrolls — desktop only, same technique as About/Skills.
  useGSAP(
    () => {
      if (reduced) return;
      const driver = driverRef.current;
      const object = objectRef.current;
      if (!driver || !object) return;

      gsap.set(object, { scale: 1.3, filter: "brightness(1.15)" });

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
    <section id="projects" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-square w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/glass-card-placeholder.webp" className="inset-0" depth={3} duration={6.5} />
        </div>
      </div>

      <div ref={driverRef} className={reduced ? "relative" : "relative lg:h-[140vh]"}>
        <div className={reduced ? "relative" : "relative z-10 lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:overflow-hidden"}>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <SectionHeader
              eyebrow="System modules"
              title="Featured production projects"
              description="Practical full-stack and infrastructure work presented as proof of planning, shipping, and production ownership."
            />
            <div ref={objectRef} className="als-3d-scene relative hidden aspect-square lg:block">
              <FloatingAsset src="/als-3d/glass-card-placeholder.webp" className="inset-0" depth={3} duration={6.5} interactive />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : (index % 2) * 0.08, ease: "easeOut" }}
            >
              <CaseStudyCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
