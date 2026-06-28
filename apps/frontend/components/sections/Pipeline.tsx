"use client";

import { motion } from "framer-motion";
import { GitBranch, ServerCog } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PipelineStep } from "@/types/portfolio";

export function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <section id="pipeline" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="CI/CD workflow"
          title="From commit to VPS in under a minute"
          description="A deployment path built around GitHub Actions, Docker images, secure SSH rollout, and Nginx/Gunicorn production serving."
        />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass-panel rounded-lg p-6">
            <div className="mb-6 flex items-center gap-3">
              <ServerCog className="h-8 w-8 text-cyan-300" />
              <div>
                <h3 className="text-xl font-semibold text-white">Production pipeline</h3>
                <p className="text-sm text-slate-400">Scroll-triggered release sequence</p>
              </div>
            </div>
            <div className="relative space-y-4">
              <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-cyan-300 via-emerald-300 to-violet-300" />
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0.4, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.7 }}
                  className="relative flex gap-4"
                >
                  <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-300/40 bg-slate-950 text-sm font-semibold text-cyan-100">
                    {index + 1}
                  </span>
                  <div className="rounded-lg border border-slate-700/70 bg-slate-950/45 p-4">
                    <h4 className="font-semibold text-white">{step.title}</h4>
                    <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-lg p-6 font-mono text-sm">
            <div className="mb-4 flex items-center gap-2 text-cyan-200">
              <GitBranch className="h-4 w-4" />
              deployment.log
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-md border border-slate-800 bg-black/30 p-3 text-slate-300"
                >
                  <span className="text-emerald-300">ok</span> {step.command || step.title}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
