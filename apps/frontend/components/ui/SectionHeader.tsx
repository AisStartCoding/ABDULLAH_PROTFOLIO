type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-slate-50 md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">{description}</p>
    </div>
  );
}
