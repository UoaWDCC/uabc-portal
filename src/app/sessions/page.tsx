/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import ScrollShadow from "@/components/ScrollShadow";
import SessionCard from "@/components/SessionCard/SessionCard";
import SessionCardProps from "@/components/SessionCard/SessionCardProps";
import { SessionCardStatus } from "@/components/SessionCard/SessionCardStatusEnum";
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
  const [session, setSession] = useState<Map<string, SessionCardProps>>(
    new Map(),
  );
  const [sessionsSelected, setSessionsSelected] = useState(0);
  const [shake, setShake] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sessionMap: Map<string, SessionCardProps> = new Map(
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
  function sessionClick(e: ChangeEvent<HTMLInputElement>, id: string) {
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
      const numberActive = Array.from(session.values()).filter(
        (card: SessionCardProps) => {
          return card.status === SessionCardStatus.SELECTED;
        },
      ).length;

      setSessionsSelected(numberActive);
      // setSessionsSelected(sessionsSelected + (e.target.checked ? 1 : -1));
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex pb-4 pt-10 pl-6">
        <Heading>Sessions</Heading>
        <Link href={"/account"} className="ml-auto mr-4">
          <CgProfile
            size={40}
          />
        </Link>
      </div>
      <div
        className={twJoin(
          "bg-[#EAEEF3] min-h-[66px] flex",
          !isMember && "justify-center",
        )}
      >
        <p className="p-5 pr-1 text-md flex items-center font-medium">
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
            <div className="text-xs flex flex-col justify-center text-left">
              <p>Prepaid Sessions</p>
              <p>Remaining</p>
            </div>
          </>
        )}
        {isMember && (
          <p className="flex m-4 justify-center items-center rounded bg-[#D9D9D9] h-[35px] w-[35px]">
            {remainingSessions}
          </p>
        )}
      </div>
      <div
        className={twJoin(
          "flex min-h-[76px] p-5 items-center",
          !isMember && "justify-center text-center",
        )}
      >
        <p className={`max-w-[70%] text-s leading-5 font-medium`}>
          Please select a badminton session for this week
        </p>
        {isMember && (
          <div className="flex grow flex-row-reverse">
            <p
              className={twJoin(
                "flex items-center justify-center rounded bg-[#D9D9D9] h-[34px] w-[63px] font-semibold",
                shake &&
                "error-shake text-[#AF3737] border-[#AF3737] border-solid border",
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
          className="flex flex-col overflow-y-auto w-full h-[calc(100dvh-329px)] gap-3 px-5"
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
          className="absolute bottom-[105px] w-full z-10 opacity-20 animate-bounce pointer-events-none"
          size={80}
        />
      )}

      <div className="flex justify-center mt-5 mb-10">
        <Button
          label="next"
          disabled={
            sessionsSelected <= maxSessions && sessionsSelected > 0
              ? false
              : true
          }
          onClick={() =>
            push("/sessions/book")
          }
        />
      </div>
    </div>
  );
}
