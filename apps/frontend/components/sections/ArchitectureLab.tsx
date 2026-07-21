import { Network } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { CommandCard } from "@/components/ui/CommandCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ArchitectureBlueprint } from "@/types/portfolio";

export function ArchitectureLab({ blueprints }: { blueprints: ArchitectureBlueprint[] }) {
  return (
    <section id="architecture" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Architecture lab"
          title="Blueprints for systems that run businesses"
          description="This section turns planning ability into a visible asset: modules, API groups, and database relationships for SaaS and healthcare platforms."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {blueprints.map((blueprint) => (
            <CommandCard key={blueprint.id} className="overflow-hidden">
              <div className="mb-5 flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-blue-500/30 bg-blue-500/10">
                  <Network className="h-5 w-5 text-blue-400" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-50">{blueprint.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{blueprint.description}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {blueprint.modules.map((module) => <Chip key={module.id}>{module.name}</Chip>)}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">API groups</p>
                  <div className="space-y-2 font-mono text-xs text-blue-400">
                    {blueprint.api_groups.map((api) => <div key={api.id} className="rounded-md bg-blue-500/10 px-3 py-2">{api.path}</div>)}
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-slate-700/60 bg-slate-900/60 p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">Database relationships</p>
                <div className="grid gap-2 text-sm text-slate-400">
                  {blueprint.relationships.map((relationship) => (
                    <div key={relationship.id} className="flex items-center justify-between gap-3 rounded-md border border-slate-700/60 bg-slate-950/60 px-3 py-2">
                      <span>{relationship.source}</span>
                      <span className="text-green-400">-&gt;</span>
                      <span>{relationship.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CommandCard>
          ))}
        </div>
      </div>
    </section>
  );
}
