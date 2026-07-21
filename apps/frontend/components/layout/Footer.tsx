import type { SiteSettings, SocialLink } from "@/types/portfolio";

export function Footer({ settings, socialLinks }: { settings: SiteSettings; socialLinks: SocialLink[] }) {
  return (
    <footer className="border-t border-slate-700/60 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-400 md:flex-row">
        <p>{settings.name} - Backend Engineering Portfolio</p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a key={link.id} href={link.url} className="hover:text-green-400">{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
