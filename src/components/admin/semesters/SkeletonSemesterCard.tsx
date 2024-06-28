import { Skeleton } from "../../ui/skeleton";

export const SkeletonSemesterCard = () => {
  return (
    <Skeleton className="min-h-36 px-6 py-4 w-full gap-1 flex flex-col relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm select-none">
      <Skeleton className="bg-tertiary/50 w-40 h-6 " />
      <Skeleton className="bg-tertiary/50 w-36 h-4 mt-2" />
      <Skeleton className="bg-tertiary/50 w-32 h-4" />
      <Skeleton className="bg-tertiary/50 w-60 h-4 mt-4" />
    </Skeleton>
  );
};
