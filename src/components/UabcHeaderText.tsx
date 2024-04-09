import React from "react";

import { cn } from "@/lib/utils";

export const UabcHeaderText = ({ className }: { className?: string }) => (
  <div className={cn("text-center", className)}>
    <span className="font-proxima text-[4rem] font-bold leading-[5rem] text-primary dark:text-white tracking-tight">
      UABC
    </span>
  </div>
);
