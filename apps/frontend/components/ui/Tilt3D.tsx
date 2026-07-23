"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Lightweight CSS-only 3D depth effect (perspective + pointer-driven tilt,
 * layered text-shadow for extrusion) — deliberately not WebGL/three.js, to
 * keep "3D" on headline text cheap and avoid reintroducing a heavy scene.
 */
export function Tilt3D({ children, maxTilt = 8, className = "" }: { children: ReactNode; maxTilt?: number; className?: string }) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 14 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 14 });

  const tilt = reduced ? 0 : maxTilt;
  const rotateX = useTransform(springY, [-1, 1], [tilt, -tilt]);
  const rotateY = useTransform(springX, [-1, 1], [-tilt, tilt]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(nx * 2);
    pointerY.set(ny * 2);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ perspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </motion.div>
  );
}
