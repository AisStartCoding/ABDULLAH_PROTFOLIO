import { ExploreCards } from "@/components/sections/ExploreCards";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { getPortfolioHome } from "@/lib/api";

export default async function Home() {
  const data = await getPortfolioHome();

  return (
    <>
      <Hero hero={data.hero} settings={data.settings} />
      <Metrics metrics={data.metrics} />
      <ExploreCards />
    </>
  );
}
