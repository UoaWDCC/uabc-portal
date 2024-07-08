/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

import { SelectSessionList } from "@/components/booking/SelectSessionList/SelectSessionList";
import { CountIndicator } from "@/components/CountIndicator";
import { Button } from "@/components/ui/button";
import { MEMBER_MAX_SESSIONS, NON_MEMBER_MAX_SESSIONS } from "@/lib/constants";
import { useCartStore } from "@/stores/useCartStore";

interface ClientSessionPageProps {
  isMember: boolean;
  prepaidSessionsRemaining: number;
}

export default function ClientSessionPage({
  isMember,
  prepaidSessionsRemaining,
}: ClientSessionPageProps) {
  const { push } = useRouter();

  const sessionsSelected = useCartStore((state) => state.cart.length);
  const [shake, setShake] = useState(false);
  const memberMaxSessions = Math.min(
    prepaidSessionsRemaining,
    MEMBER_MAX_SESSIONS
  );
  const maxSessions = isMember ? memberMaxSessions : NON_MEMBER_MAX_SESSIONS;

  return (
    <>
      <div className="flex h-16 items-center justify-between p-4">
        <p className="max-w-[70%] text-sm font-medium">
          Please select a badminton session for this week
        </p>
        <CountIndicator
          className={twJoin(
            "w-16",
            shake &&
              "error-shake border-2 border-solid border-destructive text-destructive"
          )}
          onAnimationEnd={() => setShake(false)}
        >
          {sessionsSelected} / {maxSessions}
        </CountIndicator>
      </div>

      <SelectSessionList
        onLimitReached={() => setShake(true)}
        isMember={isMember}
        maxSessions={maxSessions}
        className="mx-4 grow"
      />

      <div className="mx-4 mb-10 mt-6 flex justify-center">
        <Button
          disabled={sessionsSelected === 0}
          onClick={() => push("/sessions/book")}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </>
  );
}
