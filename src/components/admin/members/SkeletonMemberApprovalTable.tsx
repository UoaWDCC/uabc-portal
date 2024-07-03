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
            <TableHead>Email</TableHead>
            <TableHead className="w-[200px]">Set Prepaid Sessions</TableHead>
            <TableHead className="w-[200px]">Approve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-28 bg-tertiary/20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-48 bg-tertiary/20" />
              </TableCell>
              <TableCell className="text-right">
                {/* <TextInput type="number" className="h-10 w-[200px]" /> */}
                <Skeleton className="h-10 w-[200px] bg-tertiary/20" />
              </TableCell>
              <TableCell className="flex w-[200px] gap-2">
                <Skeleton className="h-10 w-[74px] bg-tertiary/20" />
                <Skeleton className="h-10 w-[88px] bg-tertiary/20" />
                {/* <Button variant={"destructive"}>Reject</Button>
                <Button>Approve</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
