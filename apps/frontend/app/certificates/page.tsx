import type { Metadata } from "next";
import { Certificates } from "@/components/sections/Certificates";
import { ScrollCrossfade } from "@/components/effects/ScrollCrossfade";
import { getPortfolioHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Certificates | Abdullah Ibna Siddiquie",
  description: "Credentials, focused study, and continuous technical growth."
};

export default async function CertificatesPage() {
  const data = await getPortfolioHome();
  return <ScrollCrossfade sections={[<Certificates key="certificates" certificates={data.certificates} />]} />;
}
