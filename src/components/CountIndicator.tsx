import { ReactNode } from "react";

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
        "flex items-center h-8 min-w-8 p-2 justify-center rounded bg-neutral font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
