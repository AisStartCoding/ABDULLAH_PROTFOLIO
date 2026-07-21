"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Boxes, ExternalLink, X } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { CommandCard } from "@/components/ui/CommandCard";
import { MOTION } from "@/lib/motion";
import type { Project } from "@/types/portfolio";

const STAGE_LABELS: Record<string, string> = {
  problem: "Problem",
  architecture: "Architecture",
  design: "Design",
  technology: "Technology",
  result: "Result"
};

export function CaseStudyCard({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.case_study && project.case_study.length > 0);

  return (
    <CommandCard className="relative overflow-hidden">
      <div className="absolute right-5 top-5 rounded-md border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
        {project.status}
      </div>
      <Boxes className="mb-5 h-8 w-8 text-blue-400" />
      <h3 className="pr-24 text-xl font-semibold text-slate-50">{project.title}</h3>
      <p className="mt-4 min-h-24 text-sm leading-7 text-slate-400">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => <Chip key={tag.id}>{tag.name}</Chip>)}
      </div>
      <div className="mt-6 flex gap-3 text-sm">
        <a href="#architecture" className="rounded-md border border-blue-500/30 px-3 py-2 text-blue-400 hover:bg-blue-500/10">
          Architecture
        </a>
        {hasCaseStudy ? (
          <CaseStudyDialog project={project} />
        ) : (
          <a
            href={project.detail_url || "#contact"}
            className="inline-flex items-center gap-2 rounded-md border border-slate-700/60 px-3 py-2 text-slate-300 hover:border-green-500/40"
          >
            View Details <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </CommandCard>
  );
}

function CaseStudyDialog({ project }: { project: Project }) {
  const stages = project.case_study ?? [];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-slate-700/60 px-3 py-2 text-slate-300 transition-colors hover:border-green-500/40 hover:text-green-400"
        >
          View Case Study <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/95 p-6 shadow-[0_30px_100px_rgba(34,197,94,0.15)] focus:outline-none sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-semibold text-slate-50">{project.title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-slate-400">
                {project.description}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close case study"
                className="rounded-md border border-slate-700/60 p-1.5 text-slate-400 hover:border-green-500/40 hover:text-green-400"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <ol className="relative mt-8 space-y-8 border-l border-slate-800 pl-6">
            {stages.map((stage, index) => (
              <motion.li
                key={stage.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: MOTION.enter.duration, ease: MOTION.enter.framerEase, delay: index * MOTION.stagger }}
                className="relative"
              >
                <span className="absolute -left-[31px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-green-500 bg-slate-950 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                <p className="text-xs font-semibold uppercase tracking-wide text-green-400">
                  {STAGE_LABELS[stage.stage] ?? stage.title}
                </p>
                <h4 className="mt-1 text-sm font-semibold text-slate-100">{stage.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-400">{stage.body}</p>
              </motion.li>
            ))}
          </ol>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
