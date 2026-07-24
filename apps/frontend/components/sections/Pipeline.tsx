"use client";

import { motion } from "framer-motion";
import { GitBranch, ServerCog } from "lucide-react";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import type { PipelineStep } from "@/types/portfolio";

export function Pipeline({ steps }: { steps: PipelineStep[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !progressLineRef.current) return;
      if (steps.length === 0) return;

      // Non-pinned, non-scroll-hijacking reveal for every viewport and motion
      // preference: pinning this section previously froze scroll for 1.5
      // viewport-heights while only badge glows changed, which read as a
      // "blank page" bug. Everything here scrolls naturally.
      const badges = badgeRefs.current.filter(Boolean) as HTMLSpanElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const logs = logRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(progressLineRef.current, { scaleY: 1 });

      badges.forEach((badge, index) => {
        gsap.fromTo(
          badge,
          { boxShadow: "0 0 0 rgba(34,197,94,0)" },
          {
            boxShadow: "0 0 18px rgba(34,197,94,0.55)",
            borderColor: "rgba(34,197,94,0.9)",
            duration: MOTION.enter.duration,
            ease: MOTION.enter.ease,
            scrollTrigger: {
              trigger: cards[index] ?? badge,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      logs.forEach((log, index) => {
        gsap.fromTo(
          log,
          { opacity: 0.35, borderColor: "rgba(51,65,85,0.6)" },
          {
            opacity: 1,
            borderColor: "rgba(34,197,94,0.6)",
            duration: MOTION.enter.duration,
            ease: MOTION.enter.ease,
            scrollTrigger: {
              trigger: cards[index] ?? log,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [steps] }
  );

  return (
    <section id="pipeline" ref={sectionRef} className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="CI/CD workflow"
          title="From commit to VPS in under a minute"
          description="A deployment path built around GitHub Actions, Docker images, secure SSH rollout, and Nginx/Gunicorn production serving."
        />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass-panel card-glow rounded-lg p-6">
            <div className="mb-6 flex items-center gap-3">
              <ServerCog className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-slate-50">Production pipeline</h3>
                <p className="text-sm text-slate-400">Release sequence with visible ownership</p>
              </div>
            </div>
            <div className="relative space-y-4">
              <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-700/50" />
              <div
                ref={progressLineRef}
                className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-green-500 via-blue-500 to-violet-500"
              />
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0.4, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.7 }}
                  className="relative flex gap-4"
                >
                  <span
                    ref={(el) => {
                      badgeRefs.current[index] = el;
                    }}
                    className="cursor-target z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-green-500/30 bg-slate-900 text-sm font-semibold text-green-400"
                  >
                    {index + 1}
                  </span>
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="cursor-target rounded-lg border border-slate-700/60 bg-slate-900 p-4"
                  >
                    <h4 className="font-semibold text-slate-50">{step.title}</h4>
                    <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="glass-panel card-glow rounded-lg p-6 font-mono text-sm">
            <div className="mb-4 flex items-center gap-2 text-green-400">
              <GitBranch className="h-4 w-4" />
              deployment.log
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    logRefs.current[index] = el;
                  }}
                  className="cursor-target rounded-md border border-slate-700/60 bg-slate-900 p-3 text-slate-300"
                >
                  <span className="text-green-400">ok</span> {step.command || step.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
