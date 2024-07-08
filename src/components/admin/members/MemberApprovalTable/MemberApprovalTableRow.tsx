"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  useApproveUserMutation,
  useRejectUserMutation,
} from "@/hooks/mutations/user";
import type { Member } from "./columns";

interface MemberApprovalTableRowProps {
  row: Row<Member>;
  userId: string;
}

const formSchema = z.object({
  prepaidSessions: z
    .string()
    .min(1, "Field is required")
    .pipe(z.coerce.number().positive()),
});

export function MemberApprovalTableRow({
  row,
  userId,
}: MemberApprovalTableRowProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: approveUser } = useApproveUserMutation(queryClient);
  const { mutate: rejectUser } = useRejectUserMutation(queryClient);

  const handleRejectClick = () => {
    rejectUser({ userId });
  };

  const handleApproveClick = ({
    prepaidSessions,
  }: z.infer<typeof formSchema>) => {
    approveUser({ userId, prepaidSessions });
  };

  return (
    <TableRow>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      <TableCell>
        <form onSubmit={handleSubmit(handleApproveClick)}>
          <TextInput
            type="number"
            className="h-10 w-[200px]"
            {...register("prepaidSessions")}
            isError={!!errors.prepaidSessions}
            errorMessage={errors.prepaidSessions?.message}
          />
          <input type="submit" id={userId} className="hidden" />
        </form>
      </TableCell>
      <TableCell className="flex w-[200px] gap-2">
        <Button variant={"destructive"} onClick={handleRejectClick}>
          Reject
        </Button>
        <Button
          asChild
          disabled={!!errors.prepaidSessions || !touchedFields.prepaidSessions}
        >
          <label htmlFor={userId}>Approve</label>
        </Button>
      </TableCell>
    </TableRow>
  );
}
