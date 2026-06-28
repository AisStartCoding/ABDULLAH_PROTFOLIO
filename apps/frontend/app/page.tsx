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

export default async function Home() {
  const data = await getPortfolioHome();

  return (
    <main className="relative min-h-screen">
      {data.animation.enable_3d ? <CommandScene /> : null}
      <div className="relative z-10">
        <Navbar settings={data.settings} socialLinks={data.social_links} />
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
