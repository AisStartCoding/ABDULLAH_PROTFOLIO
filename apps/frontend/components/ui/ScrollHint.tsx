"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Small "scroll to explore" hint, top-center of every page, below the
 * navbar. Blinks in and out on a loop rather than staying static, and hides
 * itself once the user has actually scrolled — reappearing if they scroll
 * back to the top, so it doesn't linger and get in the way.
 */
export function ScrollHint() {
  const reducedMotion = useReducedMotion();
  const [nearTop, setNearTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!nearTop) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-20 z-30 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={reducedMotion ? { opacity: 0.85 } : { opacity: [0, 1, 1, 0] }}
      transition={
        reducedMotion
          ? { duration: 0.4 }
          : { duration: 3.2, repeat: Infinity, repeatDelay: 1.6, times: [0, 0.25, 0.75, 1], ease: "easeInOut" }
      }
    >
      <span className="flex flex-col items-center gap-1 rounded-full border border-slate-700/60 bg-slate-950/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 backdrop-blur-md">
        Scroll to explore
        <ChevronDown className="h-3 w-3 text-electric-blue" />
      </span>
    </motion.div>
  );
}
