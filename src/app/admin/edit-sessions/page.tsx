import { env } from "process";

import EditSessionsHeader from "@/components/admin/EditSessionsHeader";
import { SemesterDetailCard } from "@/components/admin/SemesterDetailCard";
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
  const currentUser = await getCurrentUser();

  const user = await fetchUserInfo(currentUser!.id);

  console.log(user);
  return (
    <div className="relative flex px-4 min-h-dvh max-w-dvw flex-col bg-background dark overflow-x-hidden">
      <EditSessionsHeader />
      <div className="gap-4 flex flex-col grow mb-4 empty:after:content-['No_semesters_set'] empty:after:text-tertiary empty:after:w-full empty:after:h-full empty:after:grid empty:after:place-items-center empty:after:grow">
        <SemesterDetailCard
          id={1}
          name="Semester 1 (2024)"
          startDate="13/02/24"
          endDate="03/06/24"
          breakStart="31/03/24"
          breakEnd="16/04/24"
        />
        <SemesterDetailCard
          id={2}
          name="Semester 2 (2024)"
          startDate="13/08/24"
          endDate="22/11/24"
          breakStart="31/09/24"
          breakEnd="16/10/24"
        />
      </div>
    </div>
  );
};

export default page;
