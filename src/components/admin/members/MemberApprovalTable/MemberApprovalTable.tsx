"use client";

import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePendingMembers } from "@/hooks/query/usePendingMembers";
import { columns } from "./columns";
import { MemberApprovalTablePagination } from "./MemberApprovalTablePagination";
import { MemberApprovalTableRow } from "./MemberApprovalTableRow";
import { SkeletonMemberApprovalTable } from "./SkeletonMemberApprovalTable";

export function MemberApprovalTable({ className }: { className?: string }) {
  const { data, isLoading } = usePendingMembers();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pendingMembers = useMemo(
    () =>
      data?.map((member) => {
        return {
          id: member.id,
          name: `${member.firstName} ${member.lastName}`,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
        };
      }),
    [data]
  );

  const table = useReactTable({
    data: pendingMembers ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  if (isLoading) {
    return <SkeletonMemberApprovalTable />;
  }

  return (
    <div className="mb-10 rounded border">
      <Table className={className}>
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
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <MemberApprovalTableRow
                  key={row.getValue("id")}
                  userId={row.getValue("id")}
                  row={row}
                />
              ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-base font-medium text-tertiary/70"
              >
                No members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 && (
        <div className="border-t border-border py-2">
          <MemberApprovalTablePagination
            hasPreviousPage={table.getCanPreviousPage()}
            hasNextPage={table.getCanNextPage()}
            pageIndex={pagination.pageIndex}
            pageCount={table.getPageCount()}
            previousPage={table.previousPage}
            nextPage={table.nextPage}
            setPageIndex={table.setPageIndex}
          />
        </div>
      )}
    </div>
  );
}
