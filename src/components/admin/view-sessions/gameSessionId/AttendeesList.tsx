"use client";

import { useMemo } from "react";

import "@tanstack/react-table";

import { ChevronsUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

export const AttendeesTable = ({
  gameSessionId,
}: {
  gameSessionId: number;
}) => {
  const { data, isLoading } = useAttendees(gameSessionId);

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
              <TableCell className="font-medium">
                {attendee.name}{" "}
                {attendee.pro && <Badge className="ml-2">Pro</Badge>}
              </TableCell>
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
