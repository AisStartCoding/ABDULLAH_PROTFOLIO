import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Ibna Siddiquie | Backend Engineer & DevOps Builder",
  description: "A dynamic backend command center portfolio for Django, APIs, PostgreSQL, CI/CD, Docker, Nginx, and SaaS architecture."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
