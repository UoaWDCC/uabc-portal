"use client";

import Image from "next/image";

import { UabcLogo } from "@/components/UabcLogo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <div className="-z-50 mt-4 flex w-dvw justify-center bg-background">
        <div className="rect top-0 aspect-square w-[600px] -translate-y-[50%]" />
        <div className="relative mt-10 flex w-[1440px] flex-col items-center">
          {/* Nav */}
          <div className="navShadow flex h-20 w-[900px] items-center justify-between rounded-full bg-white p-8">
            <p className="font-proxima text-[3rem] font-bold">UABC</p>
            <Button className="rounded-full px-8">Login</Button>
          </div>
          {/* hero */}
          <div className="mt-10 flex items-center justify-center gap-48">
            <h1 className="-rotate-3 font-proxima text-5xl font-black italic">
              Welcome to the
              <br /> UABC booking portal
            </h1>
            <UabcLogo />
          </div>
          {/* booking */}
          <div className="mb-8 mt-8 flex max-w-[500px] flex-col items-center">
            <p className="mb-4 text-center text-lg">
              Easily book your badminton sessions with the University of
              Auckland Badminton Club.
            </p>
            <Button className="rounded-full px-12 py-6">Book a session</Button>
            <a className="text-xs underline" href="/">
              Privacy policy
            </a>
          </div>
          {/* about card */}
          <div className="aboutCardShadow grid w-[800px] grid-cols-2 justify-center gap-8 rounded-[4rem] p-8">
            <div>
              <h3>We are the University of Auckland Badminton Club</h3>
              <p>
                Whether you are looking to socialise, get fit or challenge
                competitive players, this is the club for you! So come chill out
                and meet some new people at our weekly club nights!
              </p>
            </div>
            <Image
              className="w-full rounded-[2rem]"
              width={400}
              height={250}
              src="/images/uabc.png"
              alt=""
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
