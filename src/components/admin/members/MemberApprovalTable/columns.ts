import type { ColumnDef } from "@tanstack/react-table";

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
