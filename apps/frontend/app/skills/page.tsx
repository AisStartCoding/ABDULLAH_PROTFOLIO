import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { ScrollCrossfade } from "@/components/effects/ScrollCrossfade";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Skills | Abdullah Ibna Siddiquie",
  description: "The stack Abdullah Ibna Siddiquie uses to build, ship, and scale full-stack production systems."
};

export default async function SkillsPage() {
  const data = await getPortfolioHome();
  return (
    <ScrollCrossfade
      sections={[
        <Skills key="skills" categories={data.skill_categories} />,
        <TechStack key="tech-stack" items={data.tech_stack} />
      ]}
    />
  );
}
