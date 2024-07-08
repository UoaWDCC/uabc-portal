"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import SectionHeader from "@/components/landingPage/SectionHeader";
import SocialCard from "@/components/landingPage/SocialCard";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogo } from "@/components/UabcLogo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const handleToPrivacy = () => {
    router.push("/privacy");
  };
  return (
    <div className="flex min-h-dvh flex-col items-center overflow-x-hidden bg-background">
      <div className="between flex w-full border-y-2 border-border p-4">
        <UabcHeaderText className="text-foreground *:text-4xl" />
      </div>
      <div className="m-4 mb-8 flex flex-col gap-4 text-center">
        <p className="flex justify-center font-proxima text-3xl font-black text-foreground">
          Welcome to the UABC Booking Portal
        </p>
        <span className="text-tertiary">
          Easily book your badminton sessions with the University of Auckland
          Badminton Club.
        </span>
      </div>
      <Button className="w-[250px] bg-gradient-to-r from-primary to-[#658CC7] p-6">
        Book a session
      </Button>
      <a
        className="z-10 mt-1 cursor-pointer text-xs text-tertiary underline"
        onClick={handleToPrivacy}
      >
        Privacy Policy
      </a>
      <Image
        className="heroImage my-8 rounded-lg"
        src="/images/image.png"
        width={350}
        height={250}
        alt="hero image"
      />
      <span className="text-center text-tertiary">
        Whether you are looking to socialise, get fit or challenge competitive
        players, this is the club for you! So come chill out and meet some new
        people at our weekly club nights!
      </span>
      <SectionHeader className="my-4 items-center justify-center">
        <p className="font-proxima text-3xl text-foreground">Recent post</p>
      </SectionHeader>
      <SectionHeader className="my-4 items-center justify-center">
        <p className="font-proxima text-3xl text-foreground">Socials</p>
      </SectionHeader>
      <div className="flex w-full flex-col items-center gap-4 px-4">
        <SocialCard
          text="Linktr.ee"
          image="/svgs/linktree.svg"
          className="bg-black text-white"
          link=""
        />
        <div className="flex w-full gap-4">
          <SocialCard
            text="uoa.badminton"
            image="/images/instagramIcon.png"
            className="bg-gradient-to-r from-[#9F36BA] to-[#FED371]"
            link=""
          />
          <SocialCard
            text="uoabadminton"
            image="/images/facebookIcon.png"
            className="bg-gradient-to-r from-white to-[#0080FF]"
            link=""
          />
        </div>
        <UabcLogo />
      </div>
      <SectionHeader className="mt-4 items-center justify-center">
        <p className=""> University of Auckland Badminton Club</p>
      </SectionHeader>
    </div>
  );
}
