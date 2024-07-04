import React from "react";
import Image from "next/image";

import { PrepaidSessionsCounter } from "@/components/booking/PrepaidSessionsCounter";
import { Heading } from "@/components/Heading";
import { LogOutButton } from "@/components/LogOutButton";
import type { CurrentUserProps } from "@/lib/hoc/withCurrentUser";
import withCurrentUser from "@/lib/hoc/withCurrentUser";
import { getUserFromId } from "@/services/user";
import ClientSessionPage from "./client-page";

export const metadata = {
  title: "Book Session - UABC Booking Portal",
};

async function SelectSessionPage({ currentUser }: CurrentUserProps) {
  const user = (await getUserFromId(currentUser.id))!;

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex items-center justify-between p-4">
        <Heading>Sessions</Heading>
        <LogOutButton />
      </div>
      <div className="flex h-16 items-center justify-between bg-secondary/70 p-4">
        <div className="flex items-center">
          <span className="pr-1 font-medium">Hey {user?.firstName}!</span>
          <Image
            src="/images/BadmintonRacketLogo.png"
            alt="Badminton Racket Logo"
            className="pointer-events-none select-none"
            width={20}
            height={20}
          />
        </div>
        {user?.member && (
          <PrepaidSessionsCounter remainingSessions={user.remainingSessions} />
        )}
      </div>
      <ClientSessionPage isMember={user.member!} />
    </div>
  );
}

export default withCurrentUser(SelectSessionPage);
