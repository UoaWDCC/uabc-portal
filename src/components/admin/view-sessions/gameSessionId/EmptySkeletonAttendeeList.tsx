import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const SkeletonAttendeeList = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index} className="hidden md:table-row">
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

export default SkeletonAttendeeList;
