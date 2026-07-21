import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ArchitectureLab } from "@/components/sections/ArchitectureLab";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ExperienceSnapshot } from "@/components/sections/ExperienceSnapshot";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Pipeline } from "@/components/sections/Pipeline";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { getPortfolioHome } from "@/lib/api";

const CommandScene = dynamic(() => import("@/components/three/CommandScene").then((mod) => mod.CommandScene), {
  ssr: false
});

const Lightfall = dynamic(() => import("@/components/effects/Lightfall").then((mod) => mod.Lightfall), {
  ssr: false
});

export default async function Home() {
  const data = await getPortfolioHome();

  return (
    <main className="relative min-h-screen bg-[#020617]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <Lightfall
          colors={["#22c55e", "#3b82f6", "#8b5cf6"]}
          backgroundColor="#020617"
          speed={0.35}
          streakCount={3}
          streakWidth={0.8}
          streakLength={1.1}
          glow={0.8}
          density={0.4}
          twinkle={0.6}
          zoom={3.2}
          backgroundGlow={0.35}
          opacity={0.6}
          mouseInteraction={false}
        />
      </div>
      <CommandScene categories={data.skill_categories.map((category) => category.title)} />
      <div className="relative z-10">
        <Navbar
          settings={data.settings}
          socialLinks={data.social_links}
          skillCategories={data.skill_categories}
          experiences={data.experiences}
        />
        <Hero hero={data.hero} settings={data.settings} />
        <Metrics metrics={data.metrics} />
        <Skills categories={data.skill_categories} />
        <ExperienceSnapshot experiences={data.experiences} />
        <Projects projects={data.projects} />
        <Pipeline steps={data.pipeline_steps} />
        <ArchitectureLab blueprints={data.architecture_blueprints} />
        <TechStack items={data.tech_stack} />
        <ContactCTA settings={data.settings} />
        <Footer settings={data.settings} socialLinks={data.social_links} />
      </div>
    </main>
  );
}
