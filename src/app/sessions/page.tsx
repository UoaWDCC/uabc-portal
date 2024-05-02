/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { twJoin } from "tailwind-merge";

import { PrepaidSessionsCounter } from "@/components/booking/PrepaidSessionsCounter";
import { SelectSessionList } from "@/components/booking/SelectSessionList/SelectSessionList";
import { CountIndicator } from "@/components/CountIndicator";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/query/getUser";
import { MEMBER_MAX_SESSIONS, NON_MEMBER_MAX_SESSIONS } from "@/lib/constants";
import { useCartStore } from "@/stores/useCartStore";

//const remainingSessions = 11;
//const isMember = true;
//const firstName = "David";

export default function SelectSessionPage() {
  const { push } = useRouter();

  const sessionsSelected = useCartStore((state) => state.cart.length);
  const { data, isLoading } = useUser("123");
  const [shake, setShake] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [remainingSessions, setRemainingSessions] = useState(0);
  const maxSessions = isMember ? MEMBER_MAX_SESSIONS : NON_MEMBER_MAX_SESSIONS;

  useEffect(() => {
    if (!isLoading && data) {
      setFirstName(data.firstName);
      setIsMember(data.member);
      setRemainingSessions(data.remainingSessions);
    }
  }, [isLoading, data]);

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex p-4">
        <Heading>Sessions</Heading>
        <Link href={"/account"} className="ml-auto">
          <CgProfile size={40} />
        </Link>
      </div>
      <div className="flex h-16 items-center justify-between bg-secondary/70 p-4">
        <div className="flex items-center">
          <span className="pr-1 font-medium">Hey {firstName}!</span>
          <Image
            src="/images/BadmintonRacketLogo.png"
            alt="Badminton Racket Logo"
            className="pointer-events-none select-none"
            width={20}
            height={20}
          />
        </div>
        {isMember && (
          <PrepaidSessionsCounter remainingSessions={remainingSessions} />
        )}
      </div>
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
