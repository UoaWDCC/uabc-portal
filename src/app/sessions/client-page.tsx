/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { twJoin } from "tailwind-merge";

import { PendingApprovalAlert } from "@/components/booking/sessions/PendingApprovalAlert";
import { SelectSessionList } from "@/components/booking/sessions/SelectSessionList";
import { CountIndicator } from "@/components/CountIndicator";
import { Button } from "@/components/ui/button";
import { MEMBER_MAX_SESSIONS, NON_MEMBER_MAX_SESSIONS } from "@/lib/constants";
import { useCartStore } from "@/stores/useCartStore";

interface ClientSessionPageProps {
  isMember: boolean;
  prepaidSessions: number;
}

export default function ClientSessionPage({
  isMember,
  prepaidSessions,
}: ClientSessionPageProps) {
  const { push } = useRouter();

  const { update, data } = useSession();

  const sessionsSelected = useCartStore((state) => state.cart.length);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (data?.user.verified && prepaidSessions === 0) {
      update({
        member: false,
        verified: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user.verified, prepaidSessions]);

  const memberMaxSessions = Math.min(prepaidSessions, MEMBER_MAX_SESSIONS);
  const maxSessions = isMember ? memberMaxSessions : NON_MEMBER_MAX_SESSIONS;
  const accountPendingApproval = isMember && !!data && !data.user.verified;

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
      {accountPendingApproval && (
        <div className="mx-4 mb-4 text-center">
          <PendingApprovalAlert />
        </div>
      )}
      <SelectSessionList
        onLimitReached={() => setShake(true)}
        isMember={isMember}
        maxSessions={maxSessions}
        className="mx-4 grow empty:grow empty:after:grid empty:after:h-full empty:after:w-full empty:after:grow empty:after:place-items-center empty:after:text-lg empty:after:font-medium empty:after:text-tertiary empty:after:content-['No_more_sessions_for_this_week']"
      />

      <div className="mx-4 mb-10 mt-6 flex justify-center">
        <Button
          disabled={sessionsSelected === 0 || accountPendingApproval}
          onClick={() => push("/sessions/select-play-level")}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </>
  );
}
