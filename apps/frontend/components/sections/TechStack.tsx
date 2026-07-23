import { Cpu } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TechStackItem } from "@/types/portfolio";

export function TechStack({ items }: { items: TechStackItem[] }) {
  const categories = new Map<string, TechStackItem[]>();
  for (const item of items) {
    const bucket = categories.get(item.category) ?? [];
    bucket.push(item);
    categories.set(item.category, bucket);
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Runtime & production stack"
          title="Built like a scalable, production system"
          description="Beyond this repo's own frontend/backend/database/proxy/CI/CD, this reflects the wider async, real-time, and cloud stack used in production work: queues, websockets, webhooks, micro-frontends, and CDN-fronted scaling."
        />
        <div className="flex flex-col gap-4">
          {Array.from(categories.entries()).map(([category, categoryItems]) => (
            <div key={category} className="glass-panel card-glow flex flex-wrap items-center gap-3 rounded-lg p-6">
              <div className="flex items-center gap-2 pr-2 text-xs uppercase tracking-wide text-portfolio-muted">
                <Cpu className="h-4 w-4 text-green-400" />
                {category}
              </div>
              {categoryItems.map((item) => <Chip key={item.id}>{item.name}</Chip>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
