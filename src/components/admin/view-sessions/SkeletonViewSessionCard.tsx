import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonViewSessionCardProps {
  className?: string;
}

export function SkeletonViewSessionCard({
  className,
}: SkeletonViewSessionCardProps) {
  return (
    <Card
      className={cn("relative p-4 flex flex-col gap-4 border", className)}
      variant="card"
    >
      <div className="flex justify-between gap-4 items-center">
        <Skeleton className="bg-tertiary/20 h-6 w-[275px]" />
      </div>
      <div className="grow flex flex-col justify-center space-y-3 ml-1">
        <Skeleton className="bg-tertiary/20 h-4 w-[150px]" />
        <div className="space-y-1">
          <Skeleton className="bg-tertiary/20 h-4 w-[175px]" />
          <Skeleton className="bg-tertiary/20 h-4 w-[225px]" />
        </div>
        <Skeleton className="bg-tertiary/20 h-4 w-[150px]" />
      </div>
      <Skeleton className="bg-tertiary/20 h-10 w-full" />
    </Card>
  );
}
