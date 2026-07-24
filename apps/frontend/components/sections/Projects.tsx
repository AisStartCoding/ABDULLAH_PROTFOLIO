import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { LayeredObject } from "@/components/ui/LayeredObject";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/types/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeader
            eyebrow="System modules"
            title="Featured production projects"
            description="Practical full-stack and infrastructure work presented as proof of planning, shipping, and production ownership."
          />
          <LayeredObject family="projects" className="hidden lg:block" />
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
