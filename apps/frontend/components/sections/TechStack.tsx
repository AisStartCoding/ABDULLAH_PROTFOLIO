import { Cpu } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TechStackItem } from "@/types/portfolio";

export function TechStack({ items }: { items: TechStackItem[] }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Runtime stack"
          title="Built like a deployable product"
          description="The portfolio itself is structured as a production app with frontend, backend, database, proxy, and CI/CD concerns."
        />
        <div className="glass-panel card-glow flex flex-wrap items-center justify-center gap-3 rounded-lg p-6">
          <Cpu className="h-5 w-5 text-green-400" />
          {items.map((item) => <Chip key={item.id}>{item.name}</Chip>)}
        </div>
      </div>
    </section>
  );
}
