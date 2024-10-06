import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const SkeletonTableAttendeeList = ({
  className,
}: {
  className?: string;
}) => {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index} className={className}>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-28 bg-tertiary/20" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-28 bg-tertiary/20" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-28 bg-tertiary/20" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-28 bg-tertiary/20" />
      </TableCell>
    </TableRow>
  ));
};

export const SkeletonAccordianAttendeeList = ({
  className,
}: {
  className?: string;
}) => {
  return Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      className={cn("flex justify-between border-b p-4", className)}
    >
      <Skeleton className="h-4 w-28 bg-tertiary/20" />
      <Skeleton className="size-4 bg-tertiary/20" />
    </div>
  ));
};
