import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  className?: string;
  children?: ReactNode;
}
const SectionHeader = ({ className, children }: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex h-[50px] w-full border-y-2 border-border text-xs font-bold text-tertiary",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionHeader;
