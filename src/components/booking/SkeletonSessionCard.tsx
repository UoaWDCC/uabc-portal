import React from "react";

import { Skeleton } from "../ui/skeleton";

const SkeletonSessionCard = () => {
  return (
    <Skeleton className="rounded-sm border px-6 flex-col gap-1 py-4 min-h-24 flex font-medium bg-secondary opacity-40">
      <Skeleton
        className="bg-tertiary opacity-20 h-[24px]"
        style={{ width: 100 + Math.random() * 100 }}
      />
      <Skeleton
        className="bg-tertiary opacity-40 h-[18px]"
        style={{ width: 150 + Math.random() * 100 }}
      />
      <Skeleton
        className="bg-tertiary opacity-40 h-[18px]"
        style={{ width: 125 }}
      />
    </Skeleton>
  );
};

export default SkeletonSessionCard;
