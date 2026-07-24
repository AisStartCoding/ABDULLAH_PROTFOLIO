"use client";

import { usePathname } from "next/navigation";
import { PageNav } from "@/components/ui/PageNav";

export function GlobalPageNav() {
  const pathname = usePathname();
  return <PageNav current={pathname} />;
}
