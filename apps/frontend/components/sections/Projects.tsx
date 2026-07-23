import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/types/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="System modules"
          title="Featured production projects"
          description="Practical full-stack and infrastructure work presented as proof of planning, shipping, and production ownership."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <CaseStudyCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
