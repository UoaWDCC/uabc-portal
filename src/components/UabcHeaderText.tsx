import React from "react";

import { cn } from "@/lib/utils";

export const UabcHeaderText = ({
  className,
  noDescription,
}: {
  className?: string;
  noDescription?: boolean;
}) => (
  <div
    className={cn(
      "text-center font-proxima font-bold text-primary dark:text-white h-20 leading-none",
      className,
    )}
  >
    <span className="text-[4rem] tracking-tight leading-none">UABC</span>
    <br />
    {noDescription && (
      <span className="text-lg leading-none">booking portal</span>
    )}
  </div>
);
