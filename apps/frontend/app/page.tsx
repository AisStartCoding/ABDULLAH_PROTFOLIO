import { Hero } from "@/components/sections/Hero";
import { getPortfolioHome } from "@/lib/api";

export default async function Home() {
  const data = await getPortfolioHome();

  return <Hero hero={data.hero} settings={data.settings} />;
}
