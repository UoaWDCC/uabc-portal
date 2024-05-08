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
}

export default function ClientSessionPage({
  isMember,
}: ClientSessionPageProps) {
  const { push } = useRouter();

  const sessionsSelected = useCartStore((state) => state.cart.length);
  const [shake, setShake] = useState(false);
  const maxSessions = isMember ? MEMBER_MAX_SESSIONS : NON_MEMBER_MAX_SESSIONS;

  return (
    <div className="flex flex-col grow">
      <div className="flex h-16 items-center justify-between p-4">
        <p className="max-w-[70%] font-medium text-sm">
          Please select a badminton session for this week
        </p>
        <CountIndicator
          className={twJoin(
            "w-16",
            shake &&
              "error-shake border-2 border-solid border-destructive text-destructive",
          )}
          onAnimationEnd={() => setShake(false)}
        >
          {sessionsSelected} / {maxSessions}
        </CountIndicator>
      </div>

      <SelectSessionList
        onLimitReached={() => setShake(true)}
        isMember={isMember}
        className="mx-4"
      />

      <div className="mt-6 mb-8 mx-4 flex justify-center">
        <Button
          large
          disabled={sessionsSelected === 0}
          onClick={() => push("/sessions/book")}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
