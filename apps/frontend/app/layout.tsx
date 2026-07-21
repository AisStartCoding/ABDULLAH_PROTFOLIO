import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Abdullah Ibna Siddiquie | Backend Engineer",
  description: "Dark, terminal-inspired command center portfolio for Django, APIs, PostgreSQL, CI/CD, Docker, Nginx, VPS deployment, and SaaS architecture."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-sans`}>{children}</body>
    </html>
  );
}
