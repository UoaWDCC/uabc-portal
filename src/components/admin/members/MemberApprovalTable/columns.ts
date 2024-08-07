import type { ColumnDef } from "@tanstack/react-table";

export type Member = {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
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
  {
    accessorKey: "firstName",
    header: "FirstName",
  },
  {
    accessorKey: "lastName",
    header: "LastName",
  },
];
