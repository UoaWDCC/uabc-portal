import { env } from "process";

import EditSessionsHeader from "@/components/admin/EditSessionsHeader";
import { SemesterDetailCard } from "@/components/admin/SessionCard";
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
    <div className="relative flex px-4 min-h-dvh max-w-dvw flex-col bg-background dark overflow-x-hidden">
      <EditSessionsHeader />
      <div className="gap-4 flex flex-col mb-4">
        <SemesterDetailCard />
        <SemesterDetailCard />
        <SemesterDetailCard />
      </div>
    </div>
  );
};

export default page;
