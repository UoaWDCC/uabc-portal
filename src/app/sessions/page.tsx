/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { SelectSessionList } from "@/components/booking/SelectSessionList";
import { useCurrentGameSessions } from "@/hooks/query/useGameSessions";
import { useCartStore } from "@/store/useCartStore";
import { GameSessionDto } from "@/types/GameSessionDto";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { twJoin } from "tailwind-merge";

const remainingSessions = 11;
const isMember = true;
const firstName = "David";
const maxSessions: number = isMember ? 2 : 1;

export default function SelectSessionPage() {
  const { data } = useCurrentGameSessions();
  const { push } = useRouter();

  const sessionsSelected = useCartStore((state) => state.cart.length);

  const [sessions, setSessions] = useState<Map<number, GameSessionDto>>(
    new Map(),
  );
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const sessionMap: Map<number, GameSessionDto> = new Map(
      data?.map((session, index) => {
        return [
          session.id,
          {
            id: session.id,
            weekday: new Date(session.startTime).getDay(),
            startTime: new Date(session.startTime).toLocaleTimeString("en-NZ", {
              timeStyle: "short",
            }),
            endTime: new Date(session.endTime).toLocaleTimeString("en-NZ", {
              timeStyle: "short",
            }),
            locationName: session.locationName,
            locationAddress: session.locationAddress,
            status: index % 3 === 0 ? "disabled" : "default",
          },
        ];
      }),
    );
    setSessions(sessionMap);
  }, [data]);

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex py-4 pl-6">
        <Heading>Sessions</Heading>
        <Link href={"/account"} className="ml-auto mr-4">
          <CgProfile size={40} />
        </Link>
      </div>
      <div className="flex h-16 items-center justify-between bg-secondary p-5">
        <div className="flex items-center">
          <span className="text-md pr-1 font-medium">Hey {firstName}!</span>
          <Image
            src="/images/BadmintonRacketLogo.png"
            alt="Badminton Racket Logo"
            className="pointer-events-none select-none"
            width={20}
            height={20}
          />
        </div>
        {isMember && (
          <div className="flex items-center">
            <div className="px-5 text-xs font-semibold">
              Prepaid Sessions <br />
              Remaining
            </div>
            <div className="flex size-8 items-center justify-center rounded bg-neutral font-semibold">
              {remainingSessions}
            </div>
          </div>
        )}
      </div>
      <div className="flex h-16 items-center justify-between p-5">
        <p className="text-s max-w-[70%] font-medium leading-5">
          Please select a badminton session for this week
        </p>
        <div
          className={twJoin(
            "flex h-8 w-16 items-center justify-center rounded bg-neutral font-semibold",
            shake &&
              "error-shake border border-solid border-destructive text-destructive",
          )}
          onAnimationEnd={() => setShake(false)}
        >
          {sessionsSelected} / {maxSessions}
        </div>
      </div>

      <SelectSessionList
        sessions={sessions}
        onLimitReached={() => setShake(true)}
        isMember={isMember}
        className="px-5"
      />

      <div className="my-3 flex justify-center">
        <Button
          disabled={
            sessionsSelected <= maxSessions && sessionsSelected > 0
              ? false
              : true
          }
          onClick={() => push("/sessions/book")}
        >
          next
        </Button>
      </div>
    </div>
  );
}
