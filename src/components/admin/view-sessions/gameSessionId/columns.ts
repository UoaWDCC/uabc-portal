import type { ColumnDef } from "@tanstack/react-table";

export type Attendee = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  playLevel: "beginner" | "intermediate" | "advanced";
  member: boolean;
  isPro: boolean;
};

export const columns: ColumnDef<Attendee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "firstName",
    header: "FirstName",
  },
  {
    accessorKey: "lastName",
    header: "LastName",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "playLevel",
    header: "PlayLevel",
  },
  {
    accessorKey: "member",
    header: "Member",
  },
  {
    accessorKey: "isPro",
    header: "IsPro",
  },
];
