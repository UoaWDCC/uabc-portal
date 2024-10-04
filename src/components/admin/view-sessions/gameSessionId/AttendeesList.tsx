"use client";

import React, { useEffect, useMemo, useState } from "react";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAttendees,
  type AttendeesListResponse,
} from "@/hooks/query/useAttendees";
import {
  SkeletonAccordianAttendeeList,
  SkeletonTableAttendeeList,
} from "./EmptySkeletonAttendeeList";

const sortByMember = (a: AttendeesListResponse) => (a.member ? -1 : 1);

const playLevelMap = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

const sortByPlayLevel = (a: AttendeesListResponse, b: AttendeesListResponse) =>
  playLevelMap[a.playLevel] - playLevelMap[b.playLevel];
const sortByEmail = (a: AttendeesListResponse, b: AttendeesListResponse) =>
  a.email.localeCompare(b.email);

const sortByName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);

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

  const [sortedPlayers, setPlayers] = useState({
    sortid: "none",
    attendees: attendees ? [...attendees] : undefined, // copies original attendees
  });

  const defaultAttendeesTable = () =>
    setPlayers({
      sortid: "none",
      attendees: attendees ? [...attendees] : undefined,
    });

  const handleSelect = (sortid: string) => {
    switch (sortid) {
      case "name":
        handleSort(sortid, sortByName);
        break;
      case "email":
        handleSort(sortid, sortByEmail);
        break;
      case "member":
        handleSort(sortid, sortByMember);
        break;
      case "playlevel":
        handleSort(sortid, sortByPlayLevel);
        break;
      default:
        defaultAttendeesTable();
        break;
    }
  };

  useEffect(() => {
    setPlayers({
      sortid: "none",
      attendees: attendees ? [...attendees] : undefined,
    });
  }, [attendees]);

  type attendeeType = NonNullable<typeof attendees>[number];
  const handleSort = (
    sortid: string,
    sortFn: (a: attendeeType, b: attendeeType) => number
  ) => {
    setPlayers((prev) => {
      if (prev.sortid === sortid) {
        // slice is here because of react weird behavior
        return { sortid, attendees: prev.attendees?.slice().reverse() };
      }

      return {
        sortid,
        attendees: prev.attendees?.sort((a, b) => sortFn(a, b)),
      };
    });
  };

  return (
    <>
      <Select onValueChange={handleSelect} disabled={isLoading}>
        <div className="flex w-full items-center justify-end gap-4 md:hidden">
          <p className="text-foreground">Sort by:</p>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="playlevel">Play level</SelectItem>
            </SelectGroup>
          </SelectContent>
        </div>
      </Select>
      <div className="mb-32 overflow-hidden rounded border md:relative">
        <Table className="hidden md:table">
          <TableHeader>
            <TableRow className="whitespace-nowrap">
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort("name", sortByName)}
                >
                  Name <ChevronsUpDown size={16} />
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort("email", sortByEmail)}
                >
                  Email <ChevronsUpDown size={16} />
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort("member", sortByMember)}
                >
                  Member <ChevronsUpDown size={16} />
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort("playLevel", sortByPlayLevel)}
                >
                  Play Level <ChevronsUpDown size={16} />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonTableAttendeeList />
            ) : (
              sortedPlayers.attendees?.map((attendee, i) => (
                <TableRow key={i} className="hidden md:table-row">
                  <TableCell className="place-items-center whitespace-nowrap font-medium">
                    {attendee.name}
                    {attendee.pro && <Badge className="ml-2">Pro</Badge>}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {attendee.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {attendee.member ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="hidden capitalize md:table-cell">
                    {attendee.playLevel}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {isLoading ? (
          <SkeletonAccordianAttendeeList className="md:hidden" />
        ) : (
          sortedPlayers.attendees?.map((attendee, i) => (
            <Accordion
              key={`accordian-${i}`}
              type="single"
              collapsible
              className="md:hidden"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-4">
                  <div>
                    {attendee.name}
                    {attendee.pro && <Badge className="ml-2">Pro</Badge>}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex w-full truncate p-4">
                  <div className="mr-1 flex flex-col">
                    <strong>Email:</strong>
                    <strong>Member:</strong>
                    <strong>Play Level:</strong>
                  </div>
                  <div>
                    <p className="max-w-[200px] truncate xs:max-w-max">
                      {attendee.email}{" "}
                    </p>
                    <p>{attendee.member ? "Yes" : "No"}</p>
                    <p className="capitalize">{attendee.playLevel}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </>
  );
};
