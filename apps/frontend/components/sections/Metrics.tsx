import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Metric } from "@/types/portfolio";

export function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Operational impact"
          title="Production numbers that matter"
          description="The portfolio highlights deployment reliability, server uptime, backend speed, and practical release automation."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => <MetricCard key={metric.id} metric={metric} index={index} />)}
        </div>
      </div>
    </section>
  );
}
