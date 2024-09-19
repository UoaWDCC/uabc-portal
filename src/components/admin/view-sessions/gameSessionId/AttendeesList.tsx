"use client";

import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAttendees } from "@/hooks/query/useAttendees";
import { columns } from "./columns";

export const AttendeesTable = ({
  gameSessionId,
}: {
  gameSessionId: number;
}) => {
  const { data, isLoading } = useAttendees(gameSessionId);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const attendees = useMemo(
    () =>
      data?.map((attendee) => {
        return {
          ...attendee,
          name: `${attendee.firstName} ${attendee.lastName}`,
        };
      }),
    [data]
  );

  const table = useReactTable({
    data: attendees ?? [],
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

  return (
    <div className="rounded border">
      <Table>
        {isLoading && <TableCaption>Loading..</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              <span className="flex items-center gap-1">
                Member <ChevronsUpDown size={16} />
              </span>
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-1">
                Play Level <ChevronsUpDown size={16} />
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees?.map((attendee, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{attendee.name}</TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell>{attendee.member ? "Yes" : "No"}</TableCell>
              <TableCell>{attendee.playLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
