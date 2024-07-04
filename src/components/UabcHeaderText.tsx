import React from "react";

import { cn } from "@/lib/utils";

interface UabcHeaderTextProps {
  className?: string;
  description?: boolean;
}

export const UabcHeaderText = ({
  description,
  className,
}: UabcHeaderTextProps) => (
  <div
    className={cn(
      "text-center font-proxima font-bold leading-none text-primary dark:text-white",
      className
    )}
  >
    <span className="text-[4rem] leading-none tracking-tight">UABC</span>
    {description && (
      <>
        <br />
        <span className="text-lg leading-none">booking portal</span>
      </>
    )}
  </div>
);
