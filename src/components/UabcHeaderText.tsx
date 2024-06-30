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
      "text-center font-proxima font-bold text-primary dark:text-white leading-none",
      className,
    )}
  >
    <span className="text-[4rem] tracking-tight leading-none">UABC</span>
    {description && (
      <>
        <br />
        <span className="text-lg leading-none">booking portal</span>
      </>
    )}
  </div>
);
