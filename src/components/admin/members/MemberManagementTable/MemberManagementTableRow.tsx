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
    // <Dialog>
      <TableRow>
        <TableCell className="w-[75px] max-w-[125px] truncate sm:max-w-max">
          {name}
        </TableCell>
        <TableCell className="min-w-[100px] max-w-[150px] truncate xs:table-cell sm:max-w-full">
          {email}
        </TableCell>
        <TableCell className="min-w-[100px] max-w-[150px] truncate xs:table-cell sm:max-w-full">
          {prepaidSessions}
        </TableCell>
        <TableCell className="p-4">
          <div className="flex h-10 items-center justify-center">
            {/* <DialogTrigger asChild> */}
              <Button className="h-6 w-8" variant="outline">
                <Ellipsis className="absolute w-4 stroke-tertiary" />
              </Button>
            {/* </DialogTrigger> */}
          </div>
        </TableCell>
      </TableRow>
  );
}
{/* <DialogContent className="w-full overflow-hidden">
        <DialogHeader>
          <DialogTitle>Approve Member</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col overflow-hidden text-foreground">
          <Card className="w-full overflow-hidden p-2" variant="card">
            <div className="w-full text-sm">
              <p className="whitespace-nowrap font-medium">Member Details</p>
              <div className="mt-1 flex w-full">
                <div className="mr-4 flex-shrink-0 whitespace-nowrap">
                  <p>First Name</p>
                  <p>Last Name</p>
                  <p>Email</p>
                </div>
                <div className="grow overflow-hidden *:truncate">
                  <p>{firstName}</p>
                  <p>{lastName}</p>
                  <p>{email}</p>
                </div>
              </div>
            </div>
          </Card>
          <form onSubmit={handleSubmit(handleApproveClick)} className="my-4">
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
            <Button variant="destructive" onClick={handleRejectClick}>
              Reject
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit(handleApproveClick)}
            >
              Approve
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog> */}