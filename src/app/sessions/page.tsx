import React from "react";
import Image from "next/image";

import { PrepaidSessionsCounter } from "@/components/booking/PrepaidSessionsCounter";
import { Heading } from "@/components/Heading";
import LogOutButton from "@/components/LogOutButton";
import { env } from "@/env";
import { getCurrentUser } from "@/lib/session";
import ClientSessionPage from "./client-page";

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

export default async function SelectSessionPage() {
  const currentUser = await getCurrentUser();

  const user = await fetchUserInfo(currentUser!.id);
  return (
    <div className="h-dvh flex flex-col">
      <div className="flex p-4 items-center justify-between">
        <Heading>Sessions</Heading>
        <LogOutButton />
      </div>
      <div className="flex h-16 items-center justify-between bg-secondary/70 p-4">
        <div className="flex items-center">
          <span className="pr-1 font-medium">Hey {user.firstName}!</span>
          <Image
            src="/images/BadmintonRacketLogo.png"
            alt="Badminton Racket Logo"
            className="pointer-events-none select-none"
            width={20}
            height={20}
          />
        </div>
        {user.member && (
          <PrepaidSessionsCounter remainingSessions={user.remainingSessions} />
        )}
      </div>
      <ClientSessionPage isMember={user.member} />
    </div>
  );
}
