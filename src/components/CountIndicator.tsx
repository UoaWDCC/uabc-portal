import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CountIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function CountIndicator({
  children,
  className,
  ...props
}: CountIndicatorProps) {
  return (
    <div
      className={cn(
        "flex h-8 min-w-8 items-center justify-center rounded bg-neutral p-2 font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
