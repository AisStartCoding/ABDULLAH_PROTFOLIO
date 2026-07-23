import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPortfolioHome } from "@/lib/api";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const GridScan = dynamic(() => import("@/components/effects/GridScan").then((mod) => mod.GridScan), {
  ssr: false
});

const CodeField = dynamic(() => import("@/components/effects/CodeField").then((mod) => mod.CodeField), {
  ssr: false
});

export const metadata: Metadata = {
  title: "Abdullah Ibna Siddiquie | Full-Stack Engineer",
  description: "Dark, terminal-inspired command center portfolio for Django, Next.js/React, APIs, PostgreSQL, CI/CD, Docker, Nginx, VPS deployment, and SaaS architecture."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = await getPortfolioHome();

  return (
    <html lang="en" className={cn("dark", "font-sans", jetbrainsMono.variable)}>
      <body className={`${jetbrainsMono.variable} font-sans`}>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-20 opacity-60">
            <GridScan
              linesColor="#2a2e35"
              scanColor="#00d1ff"
              gridScale={0.14}
              lineThickness={1}
              lineJitter={0.06}
              scanOpacity={0.5}
              scanGlow={0.55}
              scanDirection="pingpong"
              scanDuration={2.4}
              scanDelay={2.6}
              enablePost
              bloomIntensity={0.35}
              chromaticAberration={0.0012}
              noiseIntensity={0.008}
              sensitivity={0.5}
            />
          </div>
          <CodeField />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar
              settings={data.settings}
              socialLinks={data.social_links}
              skillCategories={data.skill_categories}
              experiences={data.experiences}
            />
            <div className="flex-1">{children}</div>
            <Footer settings={data.settings} socialLinks={data.social_links} />
          </div>
        </div>
      </body>
    </html>
  );
}
