"use client";

import { useMemo, useState } from "react";

import "@tanstack/react-table";

import { ChevronsUpDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
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
    <div className="mb-32 overflow-hidden rounded border md:relative">
      <Table>
        {/* {isLoading && <TableCaption>Loading..</TableCaption>} */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">
              <p className="flex items-center gap-1">
                Member <ChevronsUpDown size={16} />
              </p>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <p className="flex items-center gap-1">
                Play Level <ChevronsUpDown size={16} />
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonAttendeeList />
          ) : (
            attendees?.map((attendee, i) => (
              <>
                <TableRow key={i} className="hidden md:table-row">
                  <TableCell className="place-items-center font-medium">
                    {attendee.name}
                    {attendee.pro && <Badge className="ml-2">Pro</Badge>}
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
                </TableRow>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full md:hidden"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="p-4">
                      <p>
                        {attendee.name}
                        {attendee.pro && <Badge className="ml-2">Pro</Badge>}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="flex p-4">
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
