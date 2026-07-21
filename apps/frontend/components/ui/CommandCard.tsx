"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CommandCardProps = {
  children: ReactNode;
  className?: string;
};

export function CommandCard({ children, className = "" }: CommandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`glass-panel card-glow rounded-lg p-5 transition-shadow hover:shadow-[0_22px_70px_rgba(34,197,94,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
