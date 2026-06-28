import { MapPin } from "lucide-react";
import { CommandCard } from "@/components/ui/CommandCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Experience } from "@/types/portfolio";

export function ExperienceSnapshot({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Production role"
          title="Experience snapshot"
          description="A concise view of real deployment, incident recovery, infrastructure, and backend ownership."
        />
        {experiences.map((experience) => (
          <CommandCard key={experience.id}>
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h3 className="text-2xl font-semibold text-white">{experience.title}</h3>
                <p className="mt-2 text-cyan-200">{experience.company}</p>
              </div>
              <div className="text-sm text-slate-300 md:text-right">
                <p>{experience.date}</p>
                <p className="mt-2 flex items-center gap-2 md:justify-end"><MapPin className="h-4 w-4" /> {experience.location}</p>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-2">
              {experience.bullets.map((bullet) => <li key={bullet.id} className="border-l border-cyan-300/40 pl-3">{bullet.text}</li>)}
            </ul>
          </CommandCard>
        ))}
      </div>
    </section>
  );
}
