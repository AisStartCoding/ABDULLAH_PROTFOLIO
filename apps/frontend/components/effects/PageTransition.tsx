"use client";

// Client-side route transition: the background/navbar never unmount, only
// this content region swaps — old page "wraps" away in 3D (rotateY +
// translateZ) while the new page wraps in from the opposite side, direction
// aware (Next = forward, Previous/Home = backward) based on page order.
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
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

  if (pathname !== prevPathRef.current) {
    const prevIndex = ORDER.indexOf(prevPathRef.current);
    const currIndex = ORDER.indexOf(pathname);
    directionRef.current = currIndex >= prevIndex ? 1 : -1;
    prevPathRef.current = pathname;
  }

  // Each page's scroll-crossfade (Home's Hero, and every inner page's
  // ScrollCrossfade) relies on ScrollTrigger positions matching the current
  // document layout. Since this is a client-side route swap (not a full
  // reload), ScrollTrigger doesn't know the DOM changed size/content on its
  // own — without this, landing back on a page mid-scroll-position from the
  // previous page showed a stale/half-scrolled crossfade state that upward
  // scrolling couldn't correct. Reset scroll and recompute once the new
  // page's own GSAP contexts have had a chance to register.
  const handleExitComplete = () => {
    window.scrollTo(0, 0);
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
