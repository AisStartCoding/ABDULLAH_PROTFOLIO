import { CheckCircle2 } from "lucide-react";
import { CommandCard } from "@/components/ui/CommandCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HeroContent } from "@/types/portfolio";

const PRINCIPLES = [
  { title: "Business requirements first", body: "Every schema and endpoint traces back to an actual workflow, not a speculative feature." },
  { title: "Clean domain boundaries", body: "Modules stay decoupled so one team's change doesn't ripple into another's." },
  { title: "Reliable APIs", body: "Versioned, validated, and documented contracts that don't break consumers." },
  { title: "Secure infrastructure", body: "Server hardening, HTTPS, firewalls, and least-privilege access by default." },
  { title: "Measurable performance", body: "Caching, indexing, and query plans checked against real load, not guesses." },
  { title: "Maintainable architecture", body: "Code a future engineer (or future me) can read and extend without an oral history." }
];

export function About({ hero }: { hero: HeroContent }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="About"
          title="I build systems that stay reliable"
          description={hero.subtext}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <CommandCard key={principle.title}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <div>
                  <h3 className="font-semibold text-slate-50">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{principle.body}</p>
                </div>
              </div>
            </CommandCard>
          ))}
        </div>
      </div>
    </section>
  );
}
