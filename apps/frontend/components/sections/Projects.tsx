import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/types/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-square w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/glass-card-placeholder.webp" className="inset-0" depth={3} duration={6.5} />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeader
            eyebrow="System modules"
            title="Featured production projects"
            description="Practical full-stack and infrastructure work presented as proof of planning, shipping, and production ownership."
          />
          <div className="als-3d-scene relative hidden aspect-square lg:block">
            <FloatingAsset src="/als-3d/glass-card-placeholder.webp" className="inset-0" depth={3} duration={6.5} interactive />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <CaseStudyCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
