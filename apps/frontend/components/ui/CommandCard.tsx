"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

type CommandCardProps = {
  children: ReactNode;
  className?: string;
};

type Ring = { id: string; x: number; y: number };

export function CommandCard({ children, className = "" }: CommandCardProps) {
  const [rings, setRings] = useState<Ring[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = `${event.timeStamp}-${Math.round(x)}-${Math.round(y)}`;
    setRings((prev) => [...prev, { id, x, y }]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={handleClick}
      className={`cursor-target glass-panel card-glow relative overflow-hidden rounded-lg p-5 transition-shadow hover:shadow-[0_22px_70px_rgba(34,197,94,0.15)] ${className}`}
    >
      {children}
      {rings.map((ring) => (
        <span
          key={ring.id}
          aria-hidden
          className="pointer-events-none absolute h-10 w-10 rounded-full border-2 border-electric-blue"
          style={{ left: ring.x - 20, top: ring.y - 20 }}
          ref={(el) => {
            if (!el) return;
            gsap.set(el, { scale: 0.4, opacity: 0.9 });
            gsap.to(el, {
              scale: 2.4,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
              onComplete: () => setRings((prev) => prev.filter((r) => r.id !== ring.id))
            });
          }}
        />
      ))}
    </motion.div>
  );
}
