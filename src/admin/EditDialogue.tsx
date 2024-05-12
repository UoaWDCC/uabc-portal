import React from "react";

import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";

const EditDialogue = () => {
  return (
    <div className="fixed w-dvw h-dvh grid place-items-center px-4 bg-black/70 z-[99]">
      <Card className="bg-background w-full rounded-lg flex flex-col gap-6">
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
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </Card>
    </div>
  );
};

export default EditDialogue;
