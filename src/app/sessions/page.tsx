import React from "react";

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
  const response = await fetch(`${env.APP_URL}/api/user/${id}`, {
    cache: "no-store",
  });
  return response.json();
};
export default async function SelectSessionPage() {
  const user = await getCurrentUser();
  const userdata = await fetchUserInfo(user!.id);
  return (
    <ClientSessionPage
      firstName={userdata.firstName}
      isMember={userdata.member}
      remainingSessions={userdata.remainingSessions}
    ></ClientSessionPage>
  );
}
