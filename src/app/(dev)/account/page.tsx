import React from "react";

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
  const playLevel: PlayLevel = user?.playLevel ?? "beginner";

  return (
    <div className="flex h-dvh flex-col">
      <ClientAccountPage
        firstName={user?.firstName || ""}
        lastName={user?.lastName || ""}
        email={user?.email || ""}
        playLevel={playLevel || "beginner"}
        member={user?.member || false}
      />
    </div>
  );
}

export default withCurrentUser(AccountPage);
