import type { Metadata } from "next";
import { ExperienceSnapshot } from "@/components/sections/ExperienceSnapshot";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Experience | Abdullah Ibna Siddiquie",
  description: "Production role history: full-stack delivery, deployment ownership, and infrastructure work."
};

export default async function ExperiencePage() {
  const data = await getPortfolioHome();
  return <div className="pt-24"><ExperienceSnapshot experiences={data.experiences} /></div>;
}
