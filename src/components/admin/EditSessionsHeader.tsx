import React from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const EditSessionsHeader = () => {
  return (
    <div className="py-4 flex justify-between">
      <div className="flex items-center">
        <Link
          href="/admin"
          className="h-full aspect-square grid place-items-center rounded-full hover:bg-tertiary/10 bg-black/0 transition-color"
        >
          <ArrowLeft className="stroke-tertiary" />
        </Link>
        <div className="ml-3 text-tertiary text-lg font-medium whitespace-nowrap">
          Edit schedules
        </div>
      </div>
      <Button
        variant="outline"
        className="border-2 aspect-square border-secondary"
      >
        <Plus className="absolute stroke-foreground w-5" />
      </Button>
    </div>
  );
};

export default EditSessionsHeader;
