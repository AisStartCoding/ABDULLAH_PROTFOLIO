import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { ExperienceSnapshot } from "@/components/sections/ExperienceSnapshot";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "About | Abdullah Ibna Siddiquie",
  description: "Engineering approach, principles, and journey behind Abdullah Ibna Siddiquie's full-stack and DevOps work."
};

export default async function AboutPage() {
  const data = await getPortfolioHome();
  return (
    <div className="pt-24">
      <About hero={data.hero} />
      <ExperienceSnapshot experiences={data.experiences} />
    </div>
  );
}
