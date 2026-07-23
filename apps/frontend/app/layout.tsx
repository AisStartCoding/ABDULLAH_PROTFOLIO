import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Abdullah Ibna Siddiquie | Full-Stack Engineer",
  description: "Dark, terminal-inspired command center portfolio for Django, Next.js/React, APIs, PostgreSQL, CI/CD, Docker, Nginx, VPS deployment, and SaaS architecture."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", jetbrainsMono.variable)}>
      <body className={`${jetbrainsMono.variable} font-sans`}>{children}</body>
    </html>
  );
}
