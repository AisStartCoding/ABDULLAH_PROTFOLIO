"use client";

// Small decorative icons tucked in the far corners of the Home hero, well
// outside the centered content column — behind the portrait/headline/cards,
// low-opacity, and only one icon per corner slot at a time (cycling through
// a small pool every few seconds) rather than several floating objects at
// once. Deliberately separate from the pretty main portrait/scene, which
// stays untouched.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/utils";

const SLOT_A = ["/als-3d/infrastructure-02.png", "/als-3d/infrastructure-03.png"];
const SLOT_B = ["/als-3d/python-core-cube.webp", "/als-3d/data-connector.webp"];

function CyclingIcon({ srcs, className, interval }: { srcs: string[]; className: string; interval: number }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || srcs.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % srcs.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, srcs.length, interval]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={srcs[index]}
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? {} : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <div className="motion-float-slow h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(srcs[index])}
              alt=""
              draggable={false}
              className="h-full w-full object-contain"
              style={{ filter: "drop-shadow(0 16px 24px rgba(0,209,255,0.18))" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function HomeFloaters({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <CyclingIcon srcs={SLOT_A} className="absolute left-[3%] top-[12%] h-14 w-14 opacity-25 xl:h-20 xl:w-20" interval={5200} />
      <CyclingIcon
        srcs={SLOT_B}
        className="absolute bottom-[12%] right-[3%] h-14 w-14 opacity-25 xl:h-20 xl:w-20"
        interval={4600}
      />
    </div>
  );
}
