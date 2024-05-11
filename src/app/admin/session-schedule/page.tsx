import React from "react";
import { ArrowLeft, Ellipsis, Plus } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex px-4 h-dvh w-dvw flex-col">
      <div className="py-4 flex justify-between">
        <div className="flex">
          <ArrowLeft className="stroke-tertiary" />
          <div className="ml-3 text-tertiary text-lg font-medium">
            Edit schedules
          </div>
        </div>
        <Button
          variant="outline"
          className="border-2 aspect-square border-secondary"
        >
          <Plus className="absolute stroke-black w-5" />
        </Button>
      </div>
      <div className="gap-4 flex flex-col">
        <SessionCard />
        <SessionCard />
      </div>
    </div>
  );
};

const SessionCard = () => {
  return (
    <Card className="overflow-hidden relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm has-[:checked]:ring-primary has-[:checked]:ring-2">
      <input
        type="radio"
        name="session"
        className="absolute outline top-0 left-0 z-10 w-full h-full bg-black opacity-0 cursor-pointer"
        value="id"
      />
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-black whitespace-nowrap">
          Semester 2 (2024)
        </h3>
        <Button variant="outline" className="w-8 h-6">
          <Ellipsis className="stroke-tertiary absolute w-4" />
        </Button>
      </div>
      <p className="mt-2">Start date: 13/08/24</p>
      <p>End date: 22/11/24</p>
      <p className="mt-2">Break period: 31/09/24 - 16/04/24</p>
    </Card>
  );
};

export default page;
