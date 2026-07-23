import { ArrowRight, Briefcase, Mail, Network, User, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { CommandCard } from "@/components/ui/CommandCard";

const CARDS = [
  { href: "/about", icon: User, title: "About", description: "Get to know my engineering approach and principles." },
  { href: "/skills", icon: Wrench, title: "Skills", description: "The stack I use to build, ship, and scale." },
  { href: "/projects", icon: Briefcase, title: "Projects", description: "Production systems spanning backend, frontend, and infra." },
  { href: "/architecture", icon: Network, title: "Architecture", description: "Blueprints and the CI/CD pipeline behind them." },
  { href: "/experience", icon: Zap, title: "Experience", description: "Where I've delivered full-stack and DevOps work." },
  { href: "/contact", icon: Mail, title: "Contact", description: "Have a product that needs a reliable backend?" }
];

export function ExploreCards() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link key={card.href} href={card.href} className="group block">
            <CommandCard className="h-full">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-blue-500/30 bg-blue-500/10">
                  <card.icon className="h-5 w-5 text-blue-400" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-green-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-50">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
            </CommandCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
