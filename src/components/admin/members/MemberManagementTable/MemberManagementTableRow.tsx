"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  useApproveUserMutation,
  useRejectUserMutation,
} from "@/hooks/mutations/user";
import type { Member } from "./columns";

interface MemberManagementTableRowProps {
  row: Row<Member>;
  userId: string;
}

const formSchema = z.object({
  prepaidSessions: z
    .string()
    .min(1, "Field is required")
    .pipe(z.coerce.number().positive()),
});

export function MemberManagementTableRow({
  row,
  userId,
}: MemberManagementTableRowProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const name: string = row.getValue("name");
  const email: string = row.getValue("email");
  const prepaidSessions: string = row.getValue("prepaidSessions");

  return (
    <TableRow>
      <TableCell className="w-[75px] max-w-[125px] truncate sm:max-w-max">
        {name}
      </TableCell>
      <TableCell className="min-w-[100px] max-w-[150px] truncate xs:table-cell sm:max-w-full">
        {email}
      </TableCell>
      <TableCell className="min-w-[100px] max-w-[150px] text-left">
        {prepaidSessions}
      </TableCell>
      <TableCell className="p-4 text-center">
        <div className="flex h-10 items-center justify-left">
          <Button className="h-6 w-8" variant="outline">
            <Ellipsis className="absolute w-4 stroke-tertiary" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
