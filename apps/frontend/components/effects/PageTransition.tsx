"use client";

// Client-side route transition: the background/navbar never unmount, only
// this content region swaps — old page "wraps" away in 3D (rotateY +
// translateZ) while the new page wraps in from the opposite side, direction
// aware (Next = forward, Previous/Home = backward) based on page order.
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const ORDER = ["/", "/about", "/skills", "/projects", "/certificates", "/contact"];

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

const variants = {
  initial: (direction: number) => ({
    opacity: 0,
    rotateY: direction * 50,
    x: direction * 90,
    transformPerspective: 1600
  }),
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transformPerspective: 1600
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction * -50,
    x: direction * -90,
    transformPerspective: 1600
  })
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const prevPathRef = useRef(pathname);
  const directionRef = useRef(1);

  // Let us own scroll position entirely on route change instead of the
  // browser trying to restore whatever offset a history entry had.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // The most reliable fix: reset scroll the instant the user clicks an
  // internal link — before React re-renders, before Next.js starts the
  // route change, before any exit/enter animation. Every other reset here
  // depends on some render/animation lifecycle timing lining up correctly;
  // this one doesn't depend on any of that.
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    document.addEventListener("click", onClickCapture, { capture: true });
    return () => document.removeEventListener("click", onClickCapture, { capture: true });
  }, []);

  if (pathname !== prevPathRef.current) {
    const prevIndex = ORDER.indexOf(prevPathRef.current);
    const currIndex = ORDER.indexOf(pathname);
    directionRef.current = currIndex >= prevIndex ? 1 : -1;
    prevPathRef.current = pathname;
  }

  // Every page should open at the top, not wherever the user had scrolled to
  // on the previous page — reset the instant the route changes (before the
  // exit/enter animation even starts), rather than waiting for it to finish.
  // This runs regardless of reduced-motion, since that path skips the
  // AnimatePresence wrapper below entirely but still needs the reset.
  //
  // `behavior: "instant"` bypasses any CSS scroll-behavior:smooth so this
  // never animates — an animated reset was still mid-scroll when a shorter
  // page's content swapped in, and the browser clamped the in-flight
  // position to the new (shorter) document's max scroll, landing at the
  // bottom instead of the top. Runs both immediately (before the exit
  // animation starts) and once more after paint, in case anything async
  // (images, fonts) grows the page and shifts scroll in between.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Home's Hero uses a scroll-driven crossfade whose ScrollTrigger positions
  // must match the current document layout. Since this is a client-side
  // route swap (not a full reload), ScrollTrigger doesn't know the DOM
  // changed size/content on its own — without this, landing back on Home
  // mid-scroll-position from another page showed a stale/half-scrolled
  // crossfade state that upward scrolling couldn't correct. Reset scroll and
  // recompute once the new page's own GSAP contexts have had a chance to
  // register.
  const handleExitComplete = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  };

  if (reduced) return <>{children}</>;

  return (
    <div style={{ perspective: 1600 }}>
      <AnimatePresence mode="wait" initial={false} custom={directionRef.current} onExitComplete={handleExitComplete}>
        <motion.div
          key={pathname}
          custom={directionRef.current}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
