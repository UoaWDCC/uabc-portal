import React from "react";

import { cn } from "@/lib/utils";

interface UabcHeaderTextProps {
  className?: string;
  includeBooking?: boolean;
}

export const UabcHeaderText = ({
  includeBooking,
  className,
}: UabcHeaderTextProps) => (
  <div
    className={cn(
      "text-center font-proxima font-bold text-primary dark:text-white leading-none",
      className,
    )}
  >
    <span className="text-[4rem] tracking-tight leading-none">UABC</span>
    {includeBooking && (
      <>
        <br />
        <span className="text-lg leading-none">booking portal</span>
      </>
    )}
  </div>
);
