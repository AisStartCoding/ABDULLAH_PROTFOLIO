import { CommandCard } from "@/components/ui/CommandCard";
import { SkillsScene } from "@/components/sections/SkillsScene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import type { SkillCategory } from "@/types/portfolio";

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <SkillsScene className="aspect-square w-4/5 max-w-xs" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeader
            eyebrow="Core systems"
            title="Full-stack, API, and infrastructure toolkit"
            description="A focused stack for building APIs, data models, deployment workflows, and stable production environments."
          />
          <SkillsScene className="hidden aspect-square lg:block" />
        </div>
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
