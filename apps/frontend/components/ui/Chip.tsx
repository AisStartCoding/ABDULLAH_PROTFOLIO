type ChipProps = {
  children: React.ReactNode;
};

export function Chip({ children }: ChipProps) {
  return (
    <span className="inline-flex rounded-md border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-medium text-cyan-100">
      {children}
    </span>
  );
}
