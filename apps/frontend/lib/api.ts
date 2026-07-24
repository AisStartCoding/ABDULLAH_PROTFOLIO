import { fallbackPortfolio } from "@/lib/fallback-content";
import type { PortfolioHome } from "@/types/portfolio";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; errors: Record<string, string[]> };

export async function getPortfolioHome(): Promise<PortfolioHome> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return fallbackPortfolio;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/portfolio/home`, {
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

export async function submitContactMessage(payload: ContactPayload): Promise<ContactResult> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return { ok: false, errors: { detail: ["Contact API is not configured."] } };
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { ok: true };
    }

    const errors = (await response.json().catch(() => ({}))) as Record<string, string[]>;
    return { ok: false, errors };
  } catch {
    return { ok: false, errors: { detail: ["Network error — please try again."] } };
  }
}
