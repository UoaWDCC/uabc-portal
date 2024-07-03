"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePendingMembers } from "@/hooks/query/usePendingMembers";
import { MemberApprovalTableRow } from "./MemberApprovalTableRow";

export function MemberApprovalTable({ className }: { className?: string }) {
  const { data: pendingMembers, isLoading } = usePendingMembers();

  if (isLoading || !pendingMembers) return <p>Loading...</p>;

  return (
    <div className="rounded border">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Set Prepaid Sessions</TableHead>
            <TableHead className="w-[200px]">Approve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingMembers.map((pendingMember) => (
            <MemberApprovalTableRow
              key={pendingMember.id}
              id={pendingMember.id}
              name={`${pendingMember.firstName} ${pendingMember.lastName}`}
              email={pendingMember.email}
            ></MemberApprovalTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
