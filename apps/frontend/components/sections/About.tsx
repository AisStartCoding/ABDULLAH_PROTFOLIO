import { CheckCircle2 } from "lucide-react";
import { CommandCard } from "@/components/ui/CommandCard";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
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
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-square w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/fullstack-workstation.webp" className="inset-0" depth={3} duration={7} />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeader
            eyebrow="About"
            title="I build systems that stay reliable"
            description={hero.subtext}
          />
          <div className="als-3d-scene relative hidden aspect-square lg:block">
            <FloatingAsset src="/als-3d/fullstack-workstation.webp" className="inset-0" depth={3} duration={7} interactive />
          </div>
        </div>
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
