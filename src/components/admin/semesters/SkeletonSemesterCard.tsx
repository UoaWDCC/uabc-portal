import { Skeleton } from "../../ui/skeleton";

export const SkeletonSemesterCard = () => {
  return (
    <Skeleton className="relative flex min-h-36 w-full select-none flex-col gap-1 bg-secondary/20 px-6 py-4 text-sm font-medium tracking-tight text-tertiary ring-1 ring-secondary">
      <Skeleton className="h-6 w-40 bg-tertiary/50 " />
      <Skeleton className="mt-2 h-4 w-36 bg-tertiary/50" />
      <Skeleton className="h-4 w-32 bg-tertiary/50" />
      <Skeleton className="mt-4 h-4 w-60 bg-tertiary/50" />
    </Skeleton>
  );
};
