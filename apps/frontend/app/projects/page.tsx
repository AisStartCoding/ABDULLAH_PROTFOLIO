import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects | Abdullah Ibna Siddiquie",
  description: "Featured production projects: backend systems, full-stack platforms, and infrastructure work."
};

export default async function ProjectsPage() {
  const data = await getPortfolioHome();
  return <div className="pt-24"><Projects projects={data.projects} /></div>;
}
