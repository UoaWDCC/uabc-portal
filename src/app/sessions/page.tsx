import React from "react";

import { getCurrentUser } from "@/lib/session";
import ClientSessionPage from "./client-page";

export default async function SelectSessionPage() {
  const user = await getCurrentUser();
  return <ClientSessionPage user={user!.id}></ClientSessionPage>;
}
