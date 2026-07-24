"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { ScrollStackNav } from "@/components/sections/ScrollStackNav";
import { Tilt3D } from "@/components/ui/Tilt3D";
import TextType from "@/components/text/TextType";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { withBasePath } from "@/lib/utils";
import type { HeroContent, SiteSettings } from "@/types/portfolio";

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

function HeroText({ hero, settings }: { hero: HeroContent; settings: SiteSettings }) {
  return (
    <>
      <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-green-500/30 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-green-400 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> {settings.open_status}
      </div>
      <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-5xl lg:text-6xl">
        <TextType
          as="span"
          text={settings.name}
          typingSpeed={55}
          initialDelay={300}
          loop={false}
          showCursor
          cursorCharacter="_"
          cursorClassName="text-electric-blue"
          className="text-3d inline-block"
        />
      </h1>
      <p className="mt-3 text-lg font-medium text-green-400 md:text-xl">{settings.role}</p>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
        Backend systems. Modern interfaces. Reliable deployments.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <GlowButton href="/projects">{hero.primary_button}</GlowButton>
        {settings.resume_pdf ? (
          <GlowButton href={settings.resume_pdf} variant="secondary">Download CV</GlowButton>
        ) : null}
        <GlowButton href="/contact" variant="secondary">{hero.contact_button}</GlowButton>
      </div>
    </>
  );
}

function Portrait() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-xs justify-center lg:mx-0 lg:ml-0 lg:mr-auto lg:max-w-sm lg:-translate-x-12 xl:-translate-x-16">
      <Tilt3D maxTilt={4} globalTilt>
        <div className="relative">
          <div aria-hidden className="absolute inset-0 -z-10 scale-90 rounded-full bg-electric-blue/20 blur-3xl" />
          <Image
            src={withBasePath("/avatar-portrait.webp")}
            alt="Illustrated portrait of Abdullah Ibna Siddiquie"
            width={700}
            height={1400}
            priority
            className="h-[42vh] w-auto select-none object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] sm:h-[48vh] lg:h-auto lg:w-full"
            draggable={false}
          />
        </div>
      </Tilt3D>
    </div>
  );
}

export function Hero({
  hero,
  settings
}: {
  hero: HeroContent;
  settings: SiteSettings;
}) {
  const scrollDriverRef = useRef<HTMLDivElement | null>(null);
  const textLayerRef = useRef<HTMLDivElement | null>(null);
  const cardsLayerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const driver = scrollDriverRef.current;
      const textLayer = textLayerRef.current;
      const cardsLayer = cardsLayerRef.current;
      if (!driver || !textLayer || !cardsLayer) return;

      // Landing on Home from another page (via the navbar logo, PageNav,
      // or browser back) can leave window scroll partway down this driver's
      // height — leftover from wherever the user was on the previous page.
      // That made the scrub-based crossfade render already half-transitioned
      // (cards partially shown, headline gone) instead of its initial state.
      // Always start Home at the top so the timeline's scroll progress is
      // computed correctly from 0.
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();

      const cards = gsap.utils.toArray<HTMLElement>(".nav-card", cardsLayer);

      gsap.set(cardsLayer, { opacity: 0, y: 24, pointerEvents: "none" });
      gsap.set(textLayer, { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(cards, { opacity: 0, y: 28, scale: 0.94 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: driver,
          start: "top top",
          end: "bottom bottom",
          scrub: MOTION.scrub
        }
      });

      // Crossfade within the same on-screen slot: text exits first
      // (slightly faster, per "exit faster than enter"), cards enter with
      // a small overlap for a smooth handoff. Each card then staggers in
      // one-after-another as the user keeps scrolling — driven entirely by
      // this same window-scroll timeline, no nested scroll container.
      tl.to(textLayer, { opacity: 0, y: -20, duration: 0.4, ease: "none" }, 0)
        .set(textLayer, { pointerEvents: "none" }, 0.35)
        .to(cardsLayer, { opacity: 1, y: 0, duration: 0.5, ease: "none" }, 0.3)
        .set(cardsLayer, { pointerEvents: "auto" }, 0.55)
        .to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "none", stagger: 0.12 }, 0.4);

      return () => tl.scrollTrigger?.kill();
    },
    { scope: scrollDriverRef, dependencies: [reduced] }
  );

  // On phones/tablets, seeing the full object → cards crossfade means a lot
  // of manual scrolling. If the user hasn't scrolled or touched the page
  // shortly after landing on it, auto-scroll through the crossfade once so
  // the animation plays on its own — any real scroll/touch/key input cancels
  // it immediately and hands control back.
  useEffect(() => {
    if (reduced || typeof window === "undefined" || window.innerWidth >= 1024) return;

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      const driver = scrollDriverRef.current;
      if (!driver) return;
      const rect = driver.getBoundingClientRect();
      const target = window.scrollY + rect.bottom - window.innerHeight;
      window.scrollTo({ top: target, behavior: "smooth" });
    }, 1400);

    const events: Array<keyof WindowEventMap> = ["wheel", "touchstart", "keydown", "pointerdown"];
    events.forEach((event) => window.addEventListener(event, cancel, { passive: true, once: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, cancel));
    };
  }, [reduced]);

  // Reduced motion: no scroll-jacked sticky/crossfade — just a normal,
  // fully-scrollable stack with both blocks reachable in document flow.
  if (reduced) {
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <Portrait />
          <div>
            <HeroText hero={hero} settings={settings} />
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-6xl">
          <ScrollStackNav />
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollDriverRef} className="relative h-[220vh]">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="light-grid absolute inset-0 opacity-80" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          {/* Portrait: fixed in place for the entire scroll — never
              transformed by scroll position, only pointer-tilt. On mobile it
              shares the same grid cell as the text/cards slot (stacked via
              col-start-1 row-start-1) so content overlays it directly
              instead of pushing it below the fold; from lg it splits into
              its own column as before. */}
          <div className="relative col-start-1 row-start-1 flex justify-center lg:static lg:col-auto lg:row-auto">
            <Portrait />
          </div>

          {/* Same on-screen slot, two layers crossfading via scroll. */}
          <div className="relative z-10 col-start-1 row-start-1 min-h-[30rem] lg:col-auto lg:row-auto">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent lg:hidden"
            />
            <div ref={textLayerRef} className="absolute inset-0 flex flex-col justify-end lg:static lg:block">
              <HeroText hero={hero} settings={settings} />
            </div>

            <div ref={cardsLayerRef} className="absolute inset-0 -mx-4 flex items-end sm:-mx-6 lg:-mx-8 lg:block">
              <ScrollStackNav compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
