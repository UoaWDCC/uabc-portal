import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonSessionCard = () => {
  return (
    <Skeleton className="flex min-h-24 flex-col gap-1 rounded-sm border bg-secondary px-6 py-4 font-medium *:opacity-50">
      <Skeleton className="h-6 w-[200px] bg-tertiary/50" />
      <Skeleton className="h-4 w-[125px] bg-tertiary/50" />
      <Skeleton className="h-4 w-[150px] bg-tertiary/50" />
    </Skeleton>
  );
};

export default SkeletonSessionCard;
