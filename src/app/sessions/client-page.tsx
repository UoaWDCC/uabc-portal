/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { twJoin } from "tailwind-merge";

import { NoRemainingSessionsModal } from "@/components/booking/sessions/NoRemainingSessionsModal";
import PendingApprovalAlert from "@/components/booking/sessions/PendingApprovalAlert";
import { SelectSessionList } from "@/components/booking/sessions/SelectSessionList";
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

  const { update, data } = useSession();

  const sessionsSelected = useCartStore((state) => state.cart.length);
  const [remainingSessionsModalVisible, setRemainingSessionsModalVisible] =
    useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (data?.user.verified && prepaidSessionsRemaining === 0) {
      setRemainingSessionsModalVisible(true);
      update({
        member: false,
        verified: false,
      });
    }
  }, [data?.user.verified, prepaidSessionsRemaining, update]);

  const memberMaxSessions = Math.min(
    prepaidSessionsRemaining,
    MEMBER_MAX_SESSIONS
  );
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
        className="mx-4 grow"
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

      {remainingSessionsModalVisible && <NoRemainingSessionsModal />}
    </>
  );
}
