import { Card } from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonSemesterCard = () => {
  return (
    <Card
      className="relative flex min-h-36 w-full select-none flex-col gap-1 px-6 py-4 text-sm font-medium tracking-tight text-tertiary"
      variant="card"
    >
      <Skeleton className="h-6 w-40 bg-tertiary/20" />
      <Skeleton className="mt-1 h-4 w-60 bg-tertiary/20" />
      <Skeleton className="mt-2 h-4 w-36 bg-tertiary/20" />
      <Skeleton className="h-4 w-32 bg-tertiary/20" />
      <Skeleton className="mt-4 h-4 w-60 bg-tertiary/20" />
    </Card>
  );
};
