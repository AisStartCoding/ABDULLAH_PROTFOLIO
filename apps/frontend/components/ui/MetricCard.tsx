"use client";

import { motion } from "framer-motion";
import type { Metric } from "@/types/portfolio";

export function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="glass-panel card-glow rounded-lg p-5"
    >
      <div className="text-3xl font-semibold text-green-400">{metric.value}</div>
      <div className="mt-3 text-sm font-semibold text-slate-50">{metric.label}</div>
      <p className="mt-2 text-sm text-slate-400">{metric.description}</p>
    </motion.div>
  );
}
