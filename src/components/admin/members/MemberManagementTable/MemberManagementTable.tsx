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
import { useMembers } from "@/hooks/query/useMembers";
import { columns } from "./columns";
import { MemberManagementTableRow } from "./MemberManagementTableRow";

export function MemberManagementTable({ className }: { className?: string }) {
  const { data, isLoading } = useMembers();

  const pendingMembers = useMemo(
    () =>
      data?.map((member) => {
        return {
          id: member.id,
          name: `${member.firstName} ${member.lastName}`,
          email: member.email,
          prepaidSessions: member.prepaidSessions,
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
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="mb-10 rounded border">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="lg:table-cell">Email</TableHead>
            <TableHead className="w-[200px] lg:table-cell text-center">
              Prepaid Sessions
            </TableHead>
            <TableHead className="w-[200px] lg:table-cell text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <MemberManagementTableRow
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
    </div>
  );
}
