"use client";

import { motion } from "framer-motion";
import { Database, Server, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import type { HeroContent, SiteSettings } from "@/types/portfolio";

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.enter.duration, ease: MOTION.enter.framerEase, delay }
  })
};

export function Hero({
  hero,
  settings
}: {
  hero: HeroContent;
  settings: SiteSettings;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headlineRef.current || !subtextRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)"
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: MOTION.scrub
            }
          });

          if (reduced) {
            tl.to([headlineRef.current, subtextRef.current], { opacity: 0.15, ease: "none" });
          } else {
            tl.to(headlineRef.current, { y: -60, opacity: 0.1, ease: "none" }, 0).to(
              subtextRef.current,
              { y: -30, opacity: 0, ease: "none" },
              0
            );
          }

          return () => tl.scrollTrigger?.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8"
    >
      <div className="light-grid absolute inset-0 opacity-80" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={entrance}
            className="mb-5 inline-flex rounded-md border border-green-500/30 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-green-400 shadow-sm"
          >
            Production backend engineer
          </motion.div>
          <motion.h1
            ref={headlineRef}
            initial="hidden"
            animate="visible"
            custom={MOTION.stagger}
            variants={entrance}
            className="max-w-4xl text-4xl font-semibold leading-tight text-slate-50 md:text-6xl lg:text-7xl"
          >
            {settings.name}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={MOTION.stagger * 2}
            variants={entrance}
            className="mt-4 text-lg font-medium text-green-400 md:text-xl"
          >
            {settings.role}
          </motion.p>
          <motion.p
            ref={subtextRef}
            initial="hidden"
            animate="visible"
            custom={MOTION.stagger * 3}
            variants={entrance}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg"
          >
            {hero.subtext}
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={MOTION.stagger * 4}
            variants={entrance}
            className="mt-8 flex flex-wrap gap-3"
          >
            <GlowButton href="#projects">{hero.primary_button}</GlowButton>
            <GlowButton href="#pipeline" variant="secondary">{hero.secondary_button}</GlowButton>
            <GlowButton href="#architecture" variant="secondary">{hero.architecture_button}</GlowButton>
            <GlowButton href="#contact" variant="secondary">{hero.contact_button}</GlowButton>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={MOTION.stagger * 5}
            variants={entrance}
            className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-3"
          >
            <div className="flex items-center gap-2"><Server className="h-4 w-4 text-blue-400" /> VPS deployments</div>
            <div className="flex items-center gap-2"><Database className="h-4 w-4 text-green-400" /> PostgreSQL schemas</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-violet-400" /> Server hardening</div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={MOTION.stagger * 3}
          variants={entrance}
          className="relative z-10"
        >
          <div className="card-glow mb-4 rounded-lg border border-slate-700/60 bg-slate-900/88 p-4 shadow-glow">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Delivery confidence</span>
              <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">available</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-violet-500" />
            </div>
          </div>
          <TerminalPanel title={hero.terminal_title} lines={hero.terminal_lines} />
        </motion.div>
      </div>
    </section>
  );
}
