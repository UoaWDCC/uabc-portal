import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SkeletonMemberApprovalTable() {
  return (
    <div className="rounded border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="hidden lg:table-cell">Email</TableHead>
            <TableHead colSpan={2} className="table-cell lg:hidden">
              Email
            </TableHead>
            <TableHead className="hidden w-[200px] lg:table-cell">
              Set Prepaid Sessions
            </TableHead>
            <TableHead className="hidden w-[200px] lg:table-cell">
              Approve
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index} className="h-[73px]">
              <TableCell className="w-[75px] max-w-[125px] sm:max-w-max">
                <Skeleton className="h-4 w-full bg-tertiary/20" />
              </TableCell>
              <TableCell className="min-w-[100px] max-w-[150px] xs:table-cell sm:max-w-full">
                <Skeleton className="h-4 w-full bg-tertiary/20" />
              </TableCell>
              <TableCell className="hidden text-right lg:table-cell">
                <Skeleton className="h-10 w-[200px] bg-tertiary/20" />
              </TableCell>
              <TableCell className="hidden w-[200px] gap-2 lg:flex">
                <Skeleton className="h-10 w-[74px] bg-tertiary/20" />
                <Skeleton className="h-10 w-[88px] bg-tertiary/20" />
              </TableCell>
              <TableCell className="table-cell p-4 text-right lg:hidden">
                <div className="flex h-10 items-center justify-center">
                  <Skeleton className="h-6 w-8 bg-tertiary/20" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
