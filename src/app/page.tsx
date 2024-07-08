import Link from "next/link";

import { Card } from "@/components/Card";
import { UabcLogo } from "@/components/UabcLogo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <Card
        variant="card"
        className="relative flex h-1/2 w-2/3 justify-between p-6"
      >
        <div className="flex h-full w-1/2 flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="mb-4 text-4xl font-bold">UABC Booking Portal</h1>
            <p>🏸 Welcome to the UABC Booking Portal 🏸</p>
            <p>
              Easily book your badminton sessions with the University of
              Auckland Badminton Club.
            </p>
            <p>
              Enjoy quick, hassle-free reservations and get on the court in no
              time. Join our vibrant community and play your best game today!
            </p>

            <p>
              Learn more about UABC{" "}
              <Link
                href="https://linktr.ee/uoa.badminton"
                className="text-primary underline"
              >
                here
              </Link>
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/sessions">Book a session!</Link>
          </Button>
          <div className="flex flex-col gap-4">
            <Link href="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>{" "}
          </div>
        </div>
        <div className="grid place-items-center">
          <UabcLogo size={400}></UabcLogo>
        </div>
      </Card>
    </div>
  );
}
