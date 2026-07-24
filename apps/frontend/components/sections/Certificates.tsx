"use client";

import { Award, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { CommandCard } from "@/components/ui/CommandCard";
import { FloatingAsset } from "@/components/effects/FloatingAsset";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Certificate } from "@/types/portfolio";

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(certificates.map((cert) => cert.category)));
    return ["All", ...unique];
  }, [certificates]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? certificates : certificates.filter((cert) => cert.category === active);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20 lg:hidden">
        <div className="als-3d-scene relative aspect-square w-4/5 max-w-xs">
          <FloatingAsset src="/als-3d/nextjs-portal.webp" className="inset-0" depth={2} motion="portal-spin" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeader
            eyebrow="Certificates"
            title="Learning that supports the work"
            description="Credentials, focused study, and continuous technical growth."
          />
          <div className="als-3d-scene relative hidden aspect-square lg:block">
            <FloatingAsset src="/als-3d/nextjs-portal.webp" className="inset-0" depth={2} motion="portal-spin" interactive />
          </div>
        </div>

        {certificates.length === 0 ? (
          <CommandCard className="mx-auto max-w-xl text-center">
            <Award className="mx-auto h-8 w-8 text-slate-500" />
            <p className="mt-4 text-slate-400">No certificates published yet — check back soon.</p>
          </CommandCard>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  className={`cursor-target rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active === category
                      ? "border-electric-blue bg-electric-blue/10 text-electric-blue"
                      : "border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cert) => (
                <CommandCard key={cert.id}>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-blue-500/30 bg-blue-500/10">
                      <Award className="h-5 w-5 text-blue-400" />
                    </span>
                    <Chip>{cert.category}</Chip>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-50">{cert.title}</h3>
                  {cert.issuer ? <p className="mt-1 text-sm text-green-400">{cert.issuer}</p> : null}
                  {cert.description ? (
                    <p className="mt-3 text-sm leading-6 text-slate-400">{cert.description}</p>
                  ) : null}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
                    <span>{cert.completed_at ?? "In progress"}</span>
                    {cert.credential_url ? (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-target inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300"
                      >
                        View credential <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                </CommandCard>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
