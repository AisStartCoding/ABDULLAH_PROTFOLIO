type ChipProps = {
  children: React.ReactNode;
};

export function Chip({ children }: ChipProps) {
  return (
    <span className="inline-flex rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
      {children}
    </span>
  );
}
