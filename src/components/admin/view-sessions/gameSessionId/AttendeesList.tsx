"use client";

import { useMemo } from "react";

import "@tanstack/react-table";

import { ChevronsUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import SkeletonAttendeeList from "./EmptySkeletonAttendeeList";

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
    <div className="absolute left-0 w-dvw overflow-hidden rounded border md:relative">
      <Table>
        {/* {isLoading && <TableCaption>Loading..</TableCaption>} */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">
              <span className="flex items-center gap-1">
                Member <ChevronsUpDown size={16} />
              </span>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <span className="flex items-center gap-1">
                Play Level <ChevronsUpDown size={16} />
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonAttendeeList />
          ) : (
            attendees?.map((attendee, i) => (
              <TableRow key={i}>
                <TableCell className="place-items-center p-0 pl-4 font-medium md:p-4">
                  {attendee.name} <br className="md:hidden" />
                  {attendee.pro && <Badge className="md:ml-2">Pro</Badge>}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {attendee.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {attendee.member ? "Yes" : "No"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {attendee.playLevel}
                </TableCell>
                <TableCell className="flex md:hidden">
                  <div className="mr-1 flex flex-col">
                    <strong>Email:</strong>
                    <strong>Member:</strong>
                    <strong>Level:</strong>
                  </div>
                  <div className="w-60 truncate">
                    <p>{attendee.email} </p>
                    <p>{attendee.member ? "Yes" : "No"}</p>
                    <p>{attendee.playLevel}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
