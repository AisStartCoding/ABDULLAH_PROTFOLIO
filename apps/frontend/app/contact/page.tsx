import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { CommandCard } from "@/components/ui/CommandCard";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactHero } from "@/components/sections/ContactHero";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact | Abdullah Ibna Siddiquie",
  description: "Interests and ways to get in touch about a product that needs a reliable backend."
};

export default async function ContactPage() {
  const data = await getPortfolioHome();
  const { settings, social_links } = data;

  return (
    <div className="pt-24">
      <ContactHero />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_.8fr]">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-50">Have a product that needs a reliable backend?</h2>
            <ContactForm />
          </div>
          <CommandCard>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Direct contact</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <a href={`mailto:${settings.email}`} className="cursor-target flex items-center gap-2 hover:text-green-400">
                <Mail className="h-4 w-4 text-blue-400" /> {settings.email}
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-green-400" /> {settings.location}
              </p>
            </div>
            {social_links.length > 0 ? (
              <div className="mt-6 space-y-2 border-t border-slate-800 pt-4">
                {social_links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-target block text-sm font-semibold text-slate-300 hover:text-green-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </CommandCard>
        </div>
      </section>
    </div>
  );
}
