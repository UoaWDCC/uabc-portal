import Link from "next/link";

import { Card } from "@/components/Card";
import { UabcLogo } from "@/components/UabcLogo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-card sm:bg-primary">
      <Card
        variant="card"
        className="relative flex min-w-fit justify-between border-none p-6 sm:border sm:p-12"
      >
        <div className="flex max-w-[500px] flex-col justify-between gap-4 text-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">UABC Booking Portal</h1>
            <div className="grid place-items-center lg:hidden">
              <UabcLogo size={200}></UabcLogo>
            </div>
            <p>🏸 Welcome to the UABC Booking Portal 🏸</p>
            <p>
              Easily book your badminton sessions with the University of
              Auckland Badminton Club.
            </p>
            <p>
              Enjoy quick, hassle-free reservations and get on the court in no
              time. Join our vibrant community and play your best game today!
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/sessions">Book a session!</Link>
          </Button>
          <Link href="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>{" "}
        </div>
        <div className="ml-12 hidden place-items-center lg:grid">
          <UabcLogo size={350}></UabcLogo>
        </div>
      </Card>
    </div>
  );
}
