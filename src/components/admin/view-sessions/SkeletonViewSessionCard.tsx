import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonViewSessionCard = () => (
  <Card className="flex flex-col gap-4 border p-4" variant="card">
    <div className="flex items-center justify-between gap-4">
      <Skeleton className="h-6 w-[275px] bg-tertiary/20" />
      <Badge
        className="animate-pulse bg-tertiary/20 text-transparent"
        variant="outline"
      >
        Loading..
      </Badge>
    </div>
    <div className="ml-1 flex grow flex-col justify-center space-y-3">
      <Skeleton className="h-4 w-[150px] bg-tertiary/20" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[175px] bg-tertiary/20" />
        <Skeleton className="h-4 w-[225px] bg-tertiary/20" />
      </div>
      <Skeleton className="h-4 w-[150px] bg-tertiary/20" />
    </div>
    <div className="grid gap-2 sm:grid-cols-2">
      <Skeleton className="h-10 w-full bg-tertiary/20" />
      <Skeleton className="h-10 w-full bg-tertiary/20" />
    </div>
  </Card>
);
