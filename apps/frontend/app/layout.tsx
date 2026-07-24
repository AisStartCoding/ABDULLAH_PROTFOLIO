import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/effects/PageTransition";
import { GlobalPageNav } from "@/components/ui/GlobalPageNav";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { getPortfolioHome } from "@/lib/api";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const GridScan = dynamic(() => import("@/components/effects/GridScan"), {
  ssr: false
});

const MouseEffects = dynamic(() => import("@/components/effects/MouseEffects"), {
  ssr: false
});

const TargetCursor = dynamic(() => import("@/components/effects/TargetCursor"), {
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
          <div className="fixed inset-0 -z-20 opacity-80">
            <GridScan
              linesColor="#1c2333"
              scanColor="#00d1ff"
              gridScale={0.14}
              lineThickness={1}
              scanOpacity={0.45}
              bloomIntensity={0.5}
              chromaticAberration={0.0015}
              noiseIntensity={0.006}
              scanDuration={2.6}
              scanDelay={2.6}
            />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar settings={data.settings} socialLinks={data.social_links} />
            <div className="flex-1">
              <PageTransition>{children}</PageTransition>
            </div>
          </div>
          {/* Rendered outside PageTransition's transformed subtree — a CSS
              transform on an ancestor redefines the containing block for
              `position: fixed` descendants, which was making these buttons
              jump around relative to page content instead of the viewport. */}
          <GlobalPageNav />
          <ScrollHint />
          <div className="pointer-events-none fixed inset-0 z-[60]">
            <MouseEffects />
          </div>
          <TargetCursor targetSelector=".cursor-target" cursorColor="#00d1ff" cursorColorOnTarget="#22c55e" />
        </div>
      </body>
    </html>
  );
}
