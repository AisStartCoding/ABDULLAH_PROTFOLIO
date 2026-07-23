import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Skills | Abdullah Ibna Siddiquie",
  description: "The stack Abdullah Ibna Siddiquie uses to build, ship, and scale full-stack production systems."
};

export default async function SkillsPage() {
  const data = await getPortfolioHome();
  return (
    <div className="pt-24">
      <Skills categories={data.skill_categories} />
      <TechStack items={data.tech_stack} />
    </div>
  );
}
