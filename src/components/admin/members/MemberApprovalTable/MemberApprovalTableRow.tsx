"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const name: string[] = (row.getValue("name") as string).split(" ");
  const firstName = name.splice(0, name.length - 1).join(" ");
  const lastName = name.splice(-1).join(" ");
  const email: string = row.getValue("email");

  console.log(firstName, lastName);

  return (
    <Dialog>
      <TableRow>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
        <TableCell>
          <form
            onSubmit={handleSubmit(handleApproveClick)}
            className="hidden lg:block"
          >
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
        <TableCell className="hidden w-[200px] gap-2 lg:flex">
          <Button variant={"destructive"} onClick={handleRejectClick}>
            Reject
          </Button>
          <Button
            asChild
            disabled={
              !!errors.prepaidSessions || !touchedFields.prepaidSessions
            }
          >
            <label htmlFor={userId}>Approve</label>
          </Button>
        </TableCell>
        <TableCell className="p-4 lg:hidden">
          <div className="flex h-10 items-center justify-center">
            <DialogTrigger asChild>
              <Button className="h-6 w-8" variant="outline">
                <Ellipsis className="absolute w-4 stroke-tertiary" />
              </Button>
            </DialogTrigger>
          </div>
        </TableCell>
      </TableRow>
      {/* didn't move this to a new component due to or else it get really messy */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Member</DialogTitle>
        </DialogHeader>
        <div className="text-foregroun">
          <p>Member Details</p>
          <hr className="mb-0.5" />
          <p>FirstName: {firstName}</p>
          <p>LastName: {lastName}</p>
          <p className="mb-2">Email: {email}</p>
          <form onSubmit={handleSubmit(handleApproveClick)} className="mb-2">
            <TextInput
              type="number"
              className="h-10 w-full"
              {...register("prepaidSessions")}
              label="Prepaid Sessions"
              isError={!!errors.prepaidSessions}
              errorMessage={errors.prepaidSessions?.message}
            />
            <input type="submit" id={userId} className="hidden" />
          </form>
          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Reject</Button>
            <Button variant="default">Approve</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
