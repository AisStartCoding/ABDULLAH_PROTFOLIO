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

const GridScan = dynamic(() => import("@/components/effects/GridScan").then((mod) => mod.GridScan), {
  ssr: false
});

const CodeField = dynamic(() => import("@/components/effects/CodeField").then((mod) => mod.CodeField), {
  ssr: false
});

export default async function Home() {
  const data = await getPortfolioHome();

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-20 opacity-60">
        <GridScan
          linesColor="#2a2e35"
          scanColor="#00d1ff"
          gridScale={0.14}
          lineThickness={1}
          lineJitter={0.06}
          scanOpacity={0.5}
          scanGlow={0.55}
          scanDirection="pingpong"
          scanDuration={2.4}
          scanDelay={2.6}
          enablePost
          bloomIntensity={0.35}
          chromaticAberration={0.0012}
          noiseIntensity={0.008}
          sensitivity={0.5}
        />
      </div>
      <CodeField />
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
