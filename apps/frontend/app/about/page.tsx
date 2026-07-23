import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "About | Abdullah Ibna Siddiquie",
  description: "Engineering approach and principles behind Abdullah Ibna Siddiquie's full-stack and DevOps work."
};

export default async function AboutPage() {
  const data = await getPortfolioHome();
  return <div className="pt-24"><About hero={data.hero} /></div>;
}
