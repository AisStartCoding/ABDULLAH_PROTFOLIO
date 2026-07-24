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
 *
 * `globalTilt` switches from "tilt on hover over this element" to "tilt with
 * the whole-window cursor position" — used on the Home portrait so it reads
 * as moving in the same direction as the GridScan background, which reacts
 * to cursor position across the entire viewport, not just this element.
 */
export function Tilt3D({
  children,
  maxTilt = 8,
  className = "",
  globalTilt = false
}: {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
  globalTilt?: boolean;
}) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 14 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 14 });

  const tilt = reduced ? 0 : maxTilt;
  const rotateX = useTransform(springY, [-1, 1], [tilt, -tilt]);
  const rotateY = useTransform(springX, [-1, 1], [-tilt, tilt]);

  useEffect(() => {
    if (!globalTilt || reduced) return;
    const onMove = (event: globalThis.PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      pointerX.set(nx);
      pointerY.set(ny);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [globalTilt, reduced, pointerX, pointerY]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || globalTilt) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(nx * 2);
    pointerY.set(ny * 2);
  }

  function handlePointerLeave() {
    if (globalTilt) return;
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
