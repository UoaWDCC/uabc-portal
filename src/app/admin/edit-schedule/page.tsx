import { env } from "process";
import Link from "next/link";
import { ArrowLeft, Ellipsis, Plus, SquarePen, Trash2 } from "lucide-react";

import EditDialogue from "@/admin/EditDialogue";
import { SessionCard } from "@/admin/SessionCard";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";

type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  member: boolean;
  verified: boolean;
  remainingSessions: number;
};

const fetchUserInfo = async (id: string): Promise<UserResponse> => {
  const response = await fetch(`${env.APP_URL}/api/users/${id}`, {
    cache: "no-store",
  });
  return response.json();
};

const page = async () => {
  // FOR TESTING ONLY, NOT ACTUAL DATA
  const currentUser = await getCurrentUser();

  const user = await fetchUserInfo(currentUser!.id);
  return (
    <>
      <EditDialogue />
      <div className="flex px-4 h-dvh w-dvw flex-col bg-background dark">
        <div className="py-4 flex justify-between">
          <div className="flex items-center">
            <Link
              href="/admin"
              className="h-full aspect-square grid place-items-center rounded-full hover:bg-tertiary/10 bg-[#0000] transition-color"
            >
              <ArrowLeft className="stroke-tertiary" />
            </Link>
            <div className="ml-3 text-tertiary text-lg font-medium">
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
        <div className="gap-4 flex flex-col">
          <SessionCard />
          <SessionCard />
        </div>
      </div>
    </>
  );
};

export default page;
