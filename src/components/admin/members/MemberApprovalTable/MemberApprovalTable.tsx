"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePendingMembers } from "@/hooks/query/usePendingMembers";
import { SkeletonMemberApprovalTable } from "../SkeletonMemberApprovalTable";
import { MemberApprovalTablePagination } from "./MemberApprovalTablePagination";
import { MemberApprovalTableRow } from "./MemberApprovalTableRow";

export type Member = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

export function MemberApprovalTable({
  data,
  className,
}: {
  data: Member[];
  className?: string;
}) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      //...
      pagination,
    },
  });

  return (
    <div className="rounded border">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[200px]">Set Prepaid Sessions</TableHead>
            <TableHead className="w-[200px]">Approve</TableHead>
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
      <div className="flex items-center justify-end space-x-2 border-t py-2">
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
    </div>
  );
}
