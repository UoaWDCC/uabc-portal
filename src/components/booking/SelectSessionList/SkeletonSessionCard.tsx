import React from "react";

import { Skeleton } from "../../ui/skeleton";

const SkeletonSessionCard = () => {
  return (
    <Skeleton className="rounded-sm border px-6 flex-col gap-1 py-4 min-h-24 flex font-medium bg-secondary *:opacity-50">
      <Skeleton className="bg-tertiary/50 h-6 w-[200px]" />
      <Skeleton className="bg-tertiary/50 h-4 w-[125px]" />
      <Skeleton className="bg-tertiary/50 h-4 w-[150px]" />
    </Skeleton>
  );
};

export default SkeletonSessionCard;
