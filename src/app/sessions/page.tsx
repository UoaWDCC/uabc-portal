import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

import { PrepaidSessionsCounter } from "@/components/booking/PrepaidSessionsCounter";
import { Heading } from "@/components/Heading";
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
  const user = await getCurrentUser();
  const userdata = await fetchUserInfo(user!.id);
  return (
    <div>
      <div className="flex p-4">
        <Heading>Sessions</Heading>
        <Link href={"/account"} className="ml-auto">
          <CgProfile size={40} />
        </Link>
      </div>
      <div className="flex h-16 items-center justify-between bg-secondary/70 p-4">
        <div className="flex items-center">
          <span className="pr-1 font-medium">Hey {userdata.firstName}!</span>
          <Image
            src="/images/BadmintonRacketLogo.png"
            alt="Badminton Racket Logo"
            className="pointer-events-none select-none"
            width={20}
            height={20}
          />
        </div>
        {userdata.member && (
          <PrepaidSessionsCounter
            remainingSessions={userdata.remainingSessions}
          />
        )}
      </div>
      <ClientSessionPage isMember={userdata.member} />
    </div>
  );
}
