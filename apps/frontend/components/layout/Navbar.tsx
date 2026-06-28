import { Activity, Github } from "lucide-react";
import Link from "next/link";
import type { SiteSettings, SocialLink } from "@/types/portfolio";

export function Navbar({ settings, socialLinks }: { settings: SiteSettings; socialLinks: SocialLink[] }) {
  const github = socialLinks.find((link) => link.label.toLowerCase() === "github");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800/70 bg-slate-950/72 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/10">
            <Activity className="h-4 w-4 text-cyan-300" />
          </span>
          <span className="hidden sm:block">{settings.name}</span>
        </Link>
        <div className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 md:flex">
          <Link href="#projects" className="hover:text-cyan-200">Projects</Link>
          <Link href="#pipeline" className="hover:text-cyan-200">Pipeline</Link>
          <Link href="#architecture" className="hover:text-cyan-200">Architecture</Link>
          <Link href="#contact" className="hover:text-cyan-200">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200 sm:inline-flex">
            {settings.open_status}
          </span>
          {github ? (
            <Link href={github.url} aria-label="GitHub" className="rounded-md border border-slate-700 p-2 text-slate-300 hover:border-cyan-300 hover:text-cyan-200">
              <Github className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
