/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import ScrollShadow from "@/components/ScrollShadow";
import {
  SessionCard,
  SessionCardStatus,
  SessionCardProps,
} from "@/components/SessionCard";
import { useGameSessions } from "@/lib/useQuery/useGameSessions";
import type { GameSession } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { twJoin } from "tailwind-merge";

const remainingSessions = 11;
const isMember = true;
const firstName = "David";
const maxSessions: number = isMember ? 2 : 1;

export default function SelectSessionPage() {
  const { data } = useGameSessions();
  const { push } = useRouter();

  const [isOverflown, setIsOverflown] = useState(false);
  const [session, setSession] = useState<Map<number, SessionCardProps>>(
    new Map(),
  );
  const [sessionsSelected, setSessionsSelected] = useState(0);
  const [shake, setShake] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sessionMap: Map<number, SessionCardProps> = new Map(
      data?.map((session: GameSession) => {
        return [
          session.id,
          {
            id: session.id,
            startTime: new Date(session.startTime),
            endTime: new Date(session.endTime),
            location: session.location,
            status: SessionCardStatus.DEFAULT,
          },
        ];
      }),
    );
    setSession(sessionMap);
  }, [data]);

  /**
   * Doesn't show bouncing arrow if there is no overflow
   * Session dependency to show arrow after initial session cards load
   */
  useEffect(() => {
    if (ref.current && ref.current.scrollHeight > ref.current.clientHeight) {
      setIsOverflown(true);
    }
  }, [session]);

  /**
   * Changes the status of the card on click conditionally
   * If number of cards active exceeds the allowed amount, plays error animation
   */
  function sessionClick(e: ChangeEvent<HTMLInputElement>, id: number) {
    if (e.target.checked && sessionsSelected === maxSessions) {
      e.currentTarget.checked = false;
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 480);
    } else {
      const targetSession = session?.get(id)!;
      const updatedSession = {
        ...targetSession,
        status: e.target.checked
          ? SessionCardStatus.SELECTED
          : SessionCardStatus.DEFAULT,
      };
      session?.set(id, updatedSession);

      // On status change, changes the counter of number of sessions selected*/
      const numberActive = Array.from(session.values()).filter((card) => {
        return card.status === SessionCardStatus.SELECTED;
      }).length;

      setSessionsSelected(numberActive);
      // setSessionsSelected(sessionsSelected + (e.target.checked ? 1 : -1));
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
      <div
        className={twJoin(
          "flex min-h-[66px] bg-[#EAEEF3]",
          !isMember && "justify-center",
        )}
      >
        <p className="text-md flex items-center p-5 pr-1 font-medium">
          Hey {isMember ? firstName : "Guest"}!
        </p>
        <div className="flex items-center">
          <Image
            src="/images/BadmintonRacketLogo.png"
            alt="Badminton Racket Logo"
            className="pointer-events-none select-none"
            width={20}
            height={20}
          ></Image>
        </div>
        {isMember && (
          <>
            <div className="flex grow"></div>
            <div className="flex flex-col justify-center text-left text-xs">
              <p>Prepaid Sessions</p>
              <p>Remaining</p>
            </div>
          </>
        )}
        {isMember && (
          <p className="m-4 flex h-[35px] w-[35px] items-center justify-center rounded bg-[#D9D9D9]">
            {remainingSessions}
          </p>
        )}
      </div>
      <div
        className={twJoin(
          "flex min-h-[76px] items-center p-5",
          !isMember && "justify-center text-center",
        )}
      >
        <p className={`text-s max-w-[70%] font-medium leading-5`}>
          Please select a badminton session for this week
        </p>
        {isMember && (
          <div className="flex grow flex-row-reverse">
            <p
              className={twJoin(
                "flex h-[34px] w-[63px] items-center justify-center rounded bg-[#D9D9D9] font-semibold",
                shake &&
                  "error-shake border border-solid border-[#AF3737] text-[#AF3737]",
              )}
            >
              {sessionsSelected} / {maxSessions}
            </p>
          </div>
        )}
      </div>

      {/* TODO: check whether to use this or mask with: <scroll-fade py-4> */}
      <ScrollShadow>
        <div
          className="flex h-[calc(100dvh-329px)] w-full flex-col gap-3 overflow-y-auto px-5"
          onScroll={() => setScrollIndicator(false)}
          ref={ref}
        >
          {Array.from(session.values()).map((session) => {
            return (
              <SessionCard
                startTime={session.startTime}
                endTime={session.endTime}
                location={session.location}
                status={session.status}
                key={session.id}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  sessionClick(e, session.id)
                }
              ></SessionCard>
            );
          })}
        </div>
      </ScrollShadow>

      {scrollIndicator && isOverflown && (
        <AiFillCaretDown
          className="pointer-events-none absolute bottom-[105px] z-10 w-full animate-bounce opacity-20"
          size={80}
        />
      )}

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
