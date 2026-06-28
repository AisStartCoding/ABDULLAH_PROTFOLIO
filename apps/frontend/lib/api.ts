import { fallbackPortfolio } from "@/lib/fallback-content";
import type { PortfolioHome } from "@/types/portfolio";

export async function getPortfolioHome(): Promise<PortfolioHome> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return fallbackPortfolio;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/portfolio/home/`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return fallbackPortfolio;
    }

    const data = (await response.json()) as PortfolioHome;
    if (!data.settings || !data.hero) {
      return fallbackPortfolio;
    }
    return data;
  } catch {
    return fallbackPortfolio;
  }
}
