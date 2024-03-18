/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */
"use client";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import {
  SelectSessionCard,
  SelectSessionCardStatus,
  SelectSessionCardProps,
} from "@/components/booking/SelectSessionCard";
import { useCurrentGameSessions } from "@/lib/useQuery/useGameSessions";
import type { GameSession } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { twJoin } from "tailwind-merge";

const remainingSessions = 11;
const isMember = false;
const firstName = "David";
const maxSessions: number = isMember ? 2 : 1;

export default function SelectSessionPage() {
  const { data } = useCurrentGameSessions();
  const { push } = useRouter();

  const [session, setSession] = useState<Map<number, SelectSessionCardProps>>(
    new Map(),
  );
  const [sessionsSelected, setSessionsSelected] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const sessionMap: Map<number, SelectSessionCardProps> = new Map(
      data?.map((session: GameSession) => {
        return [
          session.id,
          {
            id: session.id,
            startTime: new Date(session.startTime),
            endTime: new Date(session.endTime),
            location: session.location,
            status: SelectSessionCardStatus.DEFAULT,
          },
        ];
      }),
    );
    setSession(sessionMap);
  }, [data]);

  /**
   * Changes the status of the card on click conditionally
   * If number of cards active exceeds the allowed amount, plays error animation
   */
  function sessionClick(e: ChangeEvent<HTMLInputElement>, id: number) {
    if (e.target.checked && sessionsSelected === maxSessions) {
      e.currentTarget.checked = false;
      setShake(true);
    } else {
      const targetSession = session?.get(id)!;
      const updatedSession = {
        ...targetSession,
        status: e.target.checked
          ? SelectSessionCardStatus.SELECTED
          : SelectSessionCardStatus.DEFAULT,
      };
      session?.set(id, updatedSession);

      // On status change, changes the counter of number of sessions selected*/
      const numberActive = Array.from(session.values()).filter((card) => {
        return card.status === SelectSessionCardStatus.SELECTED;
      }).length;

      setSessionsSelected(numberActive);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex pb-4 pl-6 pt-10">
        <Heading>Sessions</Heading>
        <Link href={"/account"} className="ml-auto mr-4">
          <CgProfile size={40} />
        </Link>
      </div>
      <div className="flex h-[4rem] items-center justify-between bg-[#EAEEF3] p-5">
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
            <div className="px-5 text-xs">
              Prepaid Sessions <br />
              Remaining
            </div>
            <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded bg-[#D9D9D9]">
              {remainingSessions}
            </div>
          </div>
        )}
      </div>
      <div className="flex h-[4rem] items-center justify-between p-5">
        <p className="text-s max-w-[70%] font-medium leading-5">
          Please select a badminton session for this week
        </p>
        <div
          className={twJoin(
            "flex h-[2rem] w-[4rem] items-center justify-center rounded bg-[#D9D9D9] font-semibold",
            shake &&
              "error-shake border border-solid border-[#AF3737] text-[#AF3737]",
          )}
          onAnimationEnd={() => setShake(false)}
        >
          {sessionsSelected} / {maxSessions}
        </div>
      </div>

      <div className="scroll-fade flex w-full grow flex-col gap-3 overflow-y-auto overscroll-contain px-5 py-2">
        {Array.from(session.values()).map((session) => {
          return (
            <SelectSessionCard
              startTime={session.startTime}
              endTime={session.endTime}
              location={session.location}
              status={session.status}
              key={session.id}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                sessionClick(e, session.id)
              }
            ></SelectSessionCard>
          );
        })}
      </div>

      <div className="mb-10 mt-5 flex justify-center">
        <Button
          label="next"
          disabled={
            sessionsSelected <= maxSessions && sessionsSelected > 0
              ? false
              : true
          }
          onClick={() => push("/sessions/book")}
        />
      </div>
    </div>
  );
}
