import { Cloud, Cpu, GitBranch, Network, Server } from "lucide-react";
import { CommandCard } from "@/components/ui/CommandCard";

const INTERESTS = [
  { icon: Server, title: "Backend Systems", description: "APIs, data models, and business logic that hold up under real load." },
  { icon: Cpu, title: "Full-Stack Products", description: "Owning a feature end-to-end, from schema to shipped UI." },
  { icon: GitBranch, title: "DevOps & Automation", description: "CI/CD pipelines that make deploys boring and reversible." },
  { icon: Cloud, title: "Cloud Infrastructure", description: "VPS, containers, and CDN-fronted services that scale." },
  { icon: Network, title: "Software Architecture", description: "Clean domain boundaries that stay maintainable as systems grow." }
];

export function Interests() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {INTERESTS.map((interest) => (
        <CommandCard key={interest.title}>
          <interest.icon className="h-6 w-6 text-blue-400" />
          <h3 className="mt-3 font-semibold text-slate-50">{interest.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-slate-400">{interest.description}</p>
        </CommandCard>
      ))}
    </div>
  );
}
