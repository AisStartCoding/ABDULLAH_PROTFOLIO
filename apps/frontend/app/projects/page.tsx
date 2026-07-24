import type { Metadata } from "next";
import { ArchitectureLab } from "@/components/sections/ArchitectureLab";
import { Pipeline } from "@/components/sections/Pipeline";
import { Projects } from "@/components/sections/Projects";
import { ScrollCrossfade } from "@/components/effects/ScrollCrossfade";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects | Abdullah Ibna Siddiquie",
  description: "Featured production projects, architecture blueprints, and the CI/CD pipeline behind them."
};

export default async function ProjectsPage() {
  const data = await getPortfolioHome();
  return (
    <ScrollCrossfade
      sections={[
        <Projects key="projects" projects={data.projects} />,
        <ArchitectureLab key="architecture" blueprints={data.architecture_blueprints} />,
        <Pipeline key="pipeline" steps={data.pipeline_steps} />
      ]}
    />
  );
}
