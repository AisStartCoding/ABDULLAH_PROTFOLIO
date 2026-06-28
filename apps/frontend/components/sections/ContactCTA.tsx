import { Mail, MapPin } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import type { SiteSettings } from "@/types/portfolio";

export function ContactCTA({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-lg border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-slate-950/80 to-emerald-300/10 p-8 text-center shadow-glow md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Contact</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Need a backend system shipped and deployed?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-slate-300">
          Available for backend engineering, Django/DRF APIs, VPS deployment, Docker pipelines, and SaaS architecture planning.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" /> {settings.email}</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-300" /> {settings.location}</span>
        </div>
        <div className="mt-8">
          <GlowButton href={`mailto:${settings.email}`}>Contact Me</GlowButton>
        </div>
      </div>
    </section>
  );
}
