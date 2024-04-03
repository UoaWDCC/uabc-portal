import React from "react";

import { Skeleton } from "../ui/skeleton";

const SkeletonSelectSessionCard = () => {
  return (
    <div className="border px-6 py-4 mx-4 min-h-24 flex font-medium align-middle flex-col gap-0.5">
      <Skeleton className="h-min" style={{ width: 100 + Math.random() * 100 }}>
        &nbsp;
      </Skeleton>
      <Skeleton className="h-min" style={{ width: 150 + Math.random() * 100 }}>
        &nbsp;
      </Skeleton>
      <Skeleton className="h-min" style={{ width: 125 }}>
        &nbsp;
      </Skeleton>
    </div>
  );
};

export default SkeletonSelectSessionCard;
