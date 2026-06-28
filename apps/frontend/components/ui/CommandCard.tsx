import type { ReactNode } from "react";

type CommandCardProps = {
  children: ReactNode;
  className?: string;
};

export function CommandCard({ children, className = "" }: CommandCardProps) {
  return <div className={`glass-panel rounded-lg p-5 ${className}`}>{children}</div>;
}
