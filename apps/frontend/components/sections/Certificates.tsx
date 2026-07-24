"use client";

import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CommandCard } from "@/components/ui/CommandCard";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { useScrollPageNavigation } from "@/lib/useScrollPageNavigation";
import type { Certificate } from "@/types/portfolio";

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

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  const reduced = useReducedMotion();
  const driverRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useScrollPageNavigation("/certificates");

  // Ring starts large and glowing, then settles to its resting scale as the
  // reader scrolls — desktop only, same technique as About/Skills/Projects.
  useGSAP(
    () => {
      if (reduced) return;
      const driver = driverRef.current;
      const ring = ringRef.current;
      if (!driver || !ring) return;

      gsap.set(ring, { scale: 1.2, filter: "brightness(1.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: driver,
          start: "top top",
          end: "bottom bottom",
          scrub: MOTION.scrub
        }
      });

      tl.to(ring, { scale: 0.92, filter: "brightness(1)", duration: 1, ease: "none" }, 0);

      return () => tl.scrollTrigger?.kill();
    },
    { scope: driverRef, dependencies: [reduced] }
  );

  const categories = useMemo(() => {
    const unique = Array.from(new Set(certificates.map((cert) => cert.category)));
    return ["All", ...unique];
  }, [certificates]);
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? certificates : certificates.filter((cert) => cert.category === activeCategory);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const count = filtered.length;
  const active = filtered[activeIndex];
  const prev = count > 0 ? filtered[(activeIndex - 1 + count) % count] : null;
  const next = count > 0 ? filtered[(activeIndex + 1) % count] : null;

  const goPrev = () => setActiveIndex((i) => (i - 1 + count) % count);
  const goNext = () => setActiveIndex((i) => (i + 1) % count);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Header + object pinned together and settle from focus to resting
          scale as the reader scrolls, matching About/Skills/Projects —
          desktop only. The certificate list/carousel lives below, in normal
          flow, so it's fully visible with details once the object settles. */}
      <div ref={driverRef} className={reduced ? "relative" : "relative lg:h-[140vh]"}>
        <div
          className={
            reduced
              ? "relative"
              : "relative z-10 lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:overflow-hidden"
          }
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <SectionHeader
              eyebrow="Certificates"
              title="Learning that supports the work"
              description="Credentials, focused study, and continuous technical growth."
            />
            <div ref={ringRef} className="relative mx-auto flex w-full max-w-md items-center justify-center py-8">
                <div aria-hidden className="als-3d-scene absolute inset-[8%] opacity-15">
                  <FloatingAsset src="/als-3d/devops-infinity.webp" className="inset-0" depth={1} duration={9} />
                </div>

                <div className="als-3d-scene relative aspect-square w-full">
                  <FloatingAsset src="/als-3d/nextjs-portal.webp" className="inset-0" depth={2} motion="portal-spin" />

                  {active ? (
                    <div className="absolute inset-[16%] z-20 flex">
                      <CommandCard className="flex w-full flex-col items-center justify-center text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                          <Award className="h-6 w-6 text-blue-400" />
                        </span>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Certificate of completion
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-50">{active.title}</h3>
                        {active.issuer ? <p className="mt-1 text-sm text-green-400">{active.issuer}</p> : null}
                        <div className="mt-4 flex w-full items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
                          <span>Issuer</span>
                          <span>Date</span>
                        </div>
                        <div className="flex w-full items-center justify-between text-sm text-slate-300">
                          <span>{active.issuer ?? "—"}</span>
                          <span>{active.completed_at ?? "In progress"}</span>
                        </div>
                        {active.credential_url ? (
                          <a
                            href={active.credential_url}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-target mt-5 inline-flex items-center gap-2 rounded-md border border-electric-blue/40 bg-electric-blue/10 px-4 py-2 text-sm font-semibold text-electric-blue hover:bg-electric-blue/20"
                          >
                            View Credential <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </CommandCard>
                    </div>
                  ) : null}
                </div>

                {active && prev && prev !== active ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={`Previous: ${prev.title}`}
                    className="cursor-target absolute left-0 top-1/2 z-10 hidden w-24 -translate-x-1/3 -translate-y-1/2 rounded-lg border border-slate-700/60 bg-slate-900/80 p-3 text-left opacity-60 backdrop-blur-sm transition-opacity hover:opacity-90 sm:block"
                  >
                    <p className="truncate text-xs font-semibold text-slate-300">{prev.title}</p>
                  </button>
                ) : null}

                {active && next && next !== active ? (
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={`Next: ${next.title}`}
                    className="cursor-target absolute right-0 top-1/2 z-10 hidden w-24 -translate-y-1/2 translate-x-1/3 rounded-lg border border-slate-700/60 bg-slate-900/80 p-3 text-right opacity-60 backdrop-blur-sm transition-opacity hover:opacity-90 sm:block"
                  >
                    <p className="truncate text-xs font-semibold text-slate-300">{next.title}</p>
                  </button>
                ) : null}

                {count > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous certificate"
                      className="cursor-target absolute -left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700/60 bg-slate-950/90 text-slate-300 hover:border-electric-blue/40 hover:text-electric-blue"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next certificate"
                      className="cursor-target absolute -right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700/60 bg-slate-950/90 text-slate-300 hover:border-electric-blue/40 hover:text-electric-blue"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      {/* Category filter + certificate list — normal flow, below the
          pinned header/object, fully visible with details once settled. */}
      <div className="relative z-10 mx-auto mt-10 max-w-7xl lg:mt-16">
        {certificates.length === 0 ? (
          <CommandCard className="mx-auto max-w-md text-center">
            <Award className="mx-auto h-8 w-8 text-slate-500" />
            <p className="mt-4 text-slate-400">No certificates published yet — check back soon.</p>
          </CommandCard>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-target rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    activeCategory === category
                      ? "border-electric-blue bg-electric-blue/10 text-electric-blue"
                      : "border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cert, index) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-target flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                    index === activeIndex
                      ? "border-electric-blue bg-electric-blue/10"
                      : "border-slate-700/60 bg-slate-900 hover:border-slate-600"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blue-500/30 bg-blue-500/10">
                    <Award className="h-5 w-5 text-blue-400" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-50">{cert.title}</p>
                    {index === activeIndex ? (
                      <span className="text-xs font-semibold uppercase tracking-wide text-green-400">Active</span>
                    ) : (
                      <span className="truncate text-xs text-slate-500">{cert.category}</span>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
