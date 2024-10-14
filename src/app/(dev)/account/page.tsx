import React from "react";
import { redirect } from "next/navigation";

import type { CurrentUserProps } from "@/lib/hoc/withCurrentUser";
import withCurrentUser from "@/lib/hoc/withCurrentUser";
import { getUserFromId } from "@/services/user";
import type { PlayLevel } from "@/types/types";
import ClientAccountPage from "./client-page";

export const metadata = {
  title: "Account Settings - UABC Booking Portal",
};

async function AccountPage({ currentUser }: CurrentUserProps) {
  const user = await getUserFromId(currentUser.id);

  // Check if the user or any required fields are missing
  if (!user || !user.firstName || !user.lastName || !user.email) {
    // Redirect to login if any required fields are missing
    redirect("/auth/login");
  }

  const playLevel: PlayLevel = user?.playLevel ?? "beginner";

  return (
    <div className="flex h-dvh flex-col">
      <ClientAccountPage
        firstName={user?.firstName || ""}
        lastName={user?.lastName || ""}
        email={user?.email || ""}
        playLevel={playLevel}
        member={user?.member || false}
      />
    </div>
  );
}

export default withCurrentUser(AccountPage);
