"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

interface MemberApprovalRowProps {
  id: string;
  name: string;
  email: string;
}

const formSchema = z.object({
  prepaidSessions: z
    .string()
    .min(1, "Field is required")
    .pipe(z.coerce.number().positive()),
});

export function MemberApprovalRow({
  id: userId,
  name,
  email,
}: MemberApprovalRowProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleRejectClick = () => {
    console.log("Rejecting user with id: ", userId);
  };

  const handleApproveClick = () => {
    console.log("Approving user with id: ", userId);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="text-right">
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
