import React from "react";
import { DialogClose, DialogContent } from "@radix-ui/react-dialog";

import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";

const EditDialogue = () => {
  return (
    <DialogContent>
      <div className="fixed left-0 top-0 h-dvh grid place-items-center w-dvw bg-black/70 z-[99] pointer-events-none">
        <Card className="bg-background w-full rounded-lg flex flex-col gap-6 pointer-events-auto">
          <h1 className="font-semibold tracking-tight text-lg">
            Edit Semester 1 (2024)
          </h1>
          <div className="flex gap-2 *:grow">
            <TextInput label="Start Date" type="input" />
            <TextInput label="End Date" type="input" />
          </div>
          <div className="flex gap-2 *:grow">
            <TextInput label="Break start Date" type="input" />
            <TextInput label="Break start Date" type="input" />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </div>
        </Card>
      </div>
    </DialogContent>
  );
};

export default EditDialogue;
