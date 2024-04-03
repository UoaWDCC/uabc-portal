import React from "react";

import { Skeleton } from "../ui/skeleton";

const SelectSessionSkeletonCard = () => {
  return (
    <Skeleton className="rounded-sm border px-6 flex-col gap-0.5 py-4 min-h-24 flex font-medium bg-secondary opacity-40">
      <Skeleton
        className="bg-tertiary opacity-20 h-[21px]"
        style={{ width: 100 + Math.random() * 100 }}
      />
      <Skeleton
        className="bg-tertiary opacity-40 h-[20px]"
        style={{ width: 150 + Math.random() * 100 }}
      />
      <Skeleton
        className="bg-tertiary opacity-40 h-[20px]"
        style={{ width: 125 }}
      />
    </Skeleton>
  );
};

export default SelectSessionSkeletonCard;
