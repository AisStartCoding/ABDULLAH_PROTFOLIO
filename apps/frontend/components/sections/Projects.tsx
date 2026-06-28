import { Boxes, ExternalLink } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { CommandCard } from "@/components/ui/CommandCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/types/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="System modules"
          title="Featured production projects"
          description="Each project is framed as a backend module with deployment status, API responsibilities, and stack signals."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <CommandCard key={project.id} className="relative overflow-hidden">
              <div className="absolute right-5 top-5 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-2 py-1 text-xs font-semibold text-emerald-200">
                {project.status}
              </div>
              <Boxes className="mb-5 h-8 w-8 text-cyan-300" />
              <h3 className="pr-24 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 min-h-24 text-sm leading-7 text-slate-300">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => <Chip key={tag.id}>{tag.name}</Chip>)}
              </div>
              <div className="mt-6 flex gap-3 text-sm">
                <a href="#architecture" className="rounded-md border border-cyan-300/30 px-3 py-2 text-cyan-100 hover:bg-cyan-300/10">Architecture</a>
                <a href={project.detail_url || "#contact"} className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-3 py-2 text-slate-200 hover:border-cyan-300">
                  View Details <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CommandCard>
          ))}
        </div>
      </div>
    </section>
  );
}
