import { Card } from "@/components/Card";
import { Skeleton } from "../../ui/skeleton";

export const SkeletonScheduleCard = () => {
  // Update to be more similar if time
  return (
    <Card
      className="relative flex min-h-36 w-full select-none flex-col gap-1 bg-secondary/20 px-6 py-4 text-sm font-medium tracking-tight text-tertiary"
      variant="card"
    >
      <Skeleton className="mt-1 h-6 w-40 bg-tertiary/20" />
      <Skeleton className="mt-2 h-4 w-60 bg-tertiary/20" />
      <Skeleton className="mt-4 h-4 w-40 bg-tertiary/20" />
      <Skeleton className="mt-1 h-4 w-48 bg-tertiary/20" />
      <Skeleton className="mt-4 h-4 w-28 bg-tertiary/20" />
      <Skeleton className="mt-1 h-4 w-24 bg-tertiary/20" />
    </Card>
  );
};
