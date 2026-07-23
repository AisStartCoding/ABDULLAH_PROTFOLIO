import Link from "next/link";
import type { SiteSettings, SocialLink } from "@/types/portfolio";

const FOOTER_NAV = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" }
];

export function Footer({ settings, socialLinks }: { settings: SiteSettings; socialLinks: SocialLink[] }) {
  return (
    <footer className="border-t border-slate-700/60 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green-400">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col justify-between gap-4 border-t border-slate-800 pt-4 md:flex-row">
          <p>{settings.name} - Full-Stack Engineering Portfolio</p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a key={link.id} href={link.url} className="hover:text-green-400">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
