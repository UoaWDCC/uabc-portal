"use client";

import { useSession } from "next-auth/react";

export default function OnboardPage() {
  const { data } = useSession();
  return (
    <div>
      <p>Welcome to UABC Booking Portal, {data?.user?.name}</p>
    </div>
  );
}
