"use client";

import Image from "next/image";

import { UabcLogo } from "@/components/UabcLogo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative -z-50 flex w-full flex-col items-center overflow-hidden pt-4">
      <svg
        className="absolute top-0 -z-10 origin-top -translate-y-[15%] scale-y-90"
        width="3000"
        height="495"
        viewBox="0 0 3000 495"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M394.218 0C394.218 0 718.955 294.5 1500 294.5C2281.04 294.5 2605.78 0 2605.78 0H3000C3000 0 2776 211.285 2446.12 321.5C2089.49 440.655 1871.65 495 1500 495C1128.35 495 910.51 440.655 553.876 321.5C323 244.362 0 0 0 0H394.218Z"
          fill="#0065FF"
        />
      </svg>
      <div className="rect -z-20 aspect-square w-[600px] -translate-y-[50%] " />
      {/* Nav */}
      <div className="navShadow mx-8 flex h-20 w-full min-w-[300px] max-w-[900px] items-center justify-between rounded-full bg-white p-8">
        <p className="font-proxima text-[3rem] font-bold">UABC</p>
        <Button className="rounded-full px-8">Login</Button>
      </div>
      {/* hero */}
      <div className="mt-10 flex items-center justify-center gap-48">
        <h1 className="-rotate-3 whitespace-nowrap font-proxima text-5xl font-black italic">
          Welcome to the
          <br /> UABC booking portal
        </h1>
        <UabcLogo />
      </div>
      {/* booking */}
      <div className="mb-8 mt-8 flex max-w-[500px] flex-col items-center">
        <p className="mb-4 text-center text-lg">
          Easily book your badminton sessions with the University of Auckland
          Badminton Club.
        </p>
        <Button className="rounded-full px-12 py-6">Book a session</Button>
        <a className="text-xs underline" href="/">
          Privacy policy
        </a>
      </div>
      {/* about card */}
      <div className="aboutCardShadow grid w-[800px] grid-cols-2 justify-center gap-8 rounded-[4rem] p-8 pl-10">
        <div>
          <h3 className="mb-4 text-xl font-bold">
            We are the University of Auckland Badminton Club
          </h3>
          <p>
            Whether you are looking to socialise, get fit or challenge
            competitive players, this is the club for you! So come chill out and
            meet some new people at our weekly club nights!
          </p>
        </div>
        <Image
          className="w-full rounded-[2rem]"
          width={400}
          height={250}
          src="/images/uabc.png"
          alt=""
        />
      </div>
      <h1 className="mb-8 mt-8 -rotate-3 font-proxima text-5xl font-black italic">
        Recent Events
      </h1>
      <div className="mb-24 flex gap-16 *:rounded-[1rem]">
        <Image
          className="eventShadow"
          width={250}
          height={250}
          src="/images/event1.png"
          alt=""
        />
        <Image
          className="eventShadow"
          width={250}
          height={250}
          src="/images/event2.png"
          alt=""
        />
        <Image
          className="eventShadow"
          width={250}
          height={250}
          src="/images/event3.png"
          alt=""
        />
      </div>
      <div className="flex h-16 w-full items-center justify-center gap-2 bg-[#0065FF] align-bottom">
        <div className="grid h-12 place-items-center rounded-xl bg-black px-8 text-white">
          Linktr.ee
        </div>
        <div className="grid h-12 place-items-center rounded-xl bg-pink-400 px-8 text-white">
          Instagram
        </div>
        <div className="grid h-12 place-items-center rounded-xl bg-blue-400 px-8 text-white">
          Facebook
        </div>
      </div>
      <div className="grid h-8 w-full place-items-center border-b-2 bg-background text-xs text-tertiary">
        University of Auckland Badminton Club, 2024
      </div>
      <div className="rect bottom-0 -z-20 aspect-square w-[600px] translate-y-[30%] " />
    </div>
  );
}
