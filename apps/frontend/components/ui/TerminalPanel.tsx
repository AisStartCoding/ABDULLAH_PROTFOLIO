"use client";

import { motion } from "framer-motion";

type TerminalPanelProps = {
  title: string;
  lines: string[];
};

export function TerminalPanel({ title, lines }: TerminalPanelProps) {
  return (
    <div className="glass-panel overflow-hidden rounded-lg">
      <div className="flex items-center gap-2 border-b border-slate-700/70 bg-slate-950/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs text-slate-400">{title}</span>
      </div>
      <div className="space-y-3 p-4 font-mono text-xs text-cyan-100 md:text-sm">
        {lines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span className="text-emerald-300">[{String(index + 1).padStart(2, "0")}]</span> {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
