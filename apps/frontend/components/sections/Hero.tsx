import { Database, Server, ShieldCheck } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import type { HeroContent, SiteSettings } from "@/types/portfolio";

export function Hero({ hero, settings }: { hero: HeroContent; settings: SiteSettings }) {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
      <div className="command-grid absolute inset-0 opacity-60" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10">
          <div className="mb-5 inline-flex rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Backend Command Center
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">{settings.name}</h1>
          <p className="mt-4 text-lg font-medium text-cyan-100 md:text-xl">{settings.role}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{hero.subtext}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlowButton href="#projects">{hero.primary_button}</GlowButton>
            <GlowButton href="#pipeline" variant="secondary">{hero.secondary_button}</GlowButton>
            <GlowButton href="#architecture" variant="secondary">{hero.architecture_button}</GlowButton>
            <GlowButton href="#contact" variant="secondary">{hero.contact_button}</GlowButton>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <div className="flex items-center gap-2"><Server className="h-4 w-4 text-cyan-300" /> VPS deployments</div>
            <div className="flex items-center gap-2"><Database className="h-4 w-4 text-emerald-300" /> PostgreSQL schemas</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-violet-300" /> Server hardening</div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="mb-4 rounded-lg border border-cyan-300/20 bg-slate-950/60 p-4 shadow-glow">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Live deployment status</span>
              <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-xs font-semibold text-emerald-200">healthy</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300" />
            </div>
          </div>
          <TerminalPanel title={hero.terminal_title} lines={hero.terminal_lines} />
        </div>
      </div>
    </section>
  );
}
