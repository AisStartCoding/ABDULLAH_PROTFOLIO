import type { Metadata } from "next";
import { ArchitectureLab } from "@/components/sections/ArchitectureLab";
import { Pipeline } from "@/components/sections/Pipeline";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Architecture | Abdullah Ibna Siddiquie",
  description: "System architecture blueprints and the CI/CD deployment pipeline behind them."
};

export default async function ArchitecturePage() {
  const data = await getPortfolioHome();
  return (
    <div className="pt-24">
      <Pipeline steps={data.pipeline_steps} />
      <ArchitectureLab blueprints={data.architecture_blueprints} />
    </div>
  );
}
