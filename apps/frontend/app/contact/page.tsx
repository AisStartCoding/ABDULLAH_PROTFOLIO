import type { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact | Abdullah Ibna Siddiquie",
  description: "Get in touch about a product that needs a reliable backend."
};

export default async function ContactPage() {
  const data = await getPortfolioHome();
  return <div className="pt-24"><ContactCTA settings={data.settings} /></div>;
}
