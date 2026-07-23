import { CommandCard } from "@/components/ui/CommandCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import type { SkillCategory } from "@/types/portfolio";

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Core systems"
          title="Full-stack, API, and infrastructure toolkit"
          description="A focused stack for building APIs, data models, deployment workflows, and stable production environments."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CommandCard key={category.id}>
              <h3 className="mb-4 text-lg font-semibold text-slate-50">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => <Chip key={skill.id}>{skill.name}</Chip>)}
              </div>
            </CommandCard>
          ))}
        </div>
      </div>
    </section>
  );
}
