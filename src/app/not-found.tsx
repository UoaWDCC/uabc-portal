import Link from "next/link";

import { BackButton } from "@/components/BackButton";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogoNotFound } from "@/components/UabcLogoNotFound";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col justify-evenly items-center overflow-hidden bg-background">
      <UabcHeaderText />
      <div>
        <div className="w-72 aspect-square grid place-items-center">
          <UabcLogoNotFound className="absolute min-w-[250px]" />
          <h1 className="text-9xl font-bold text-foreground z-10 select-none">
            404
          </h1>
        </div>
        <p className="text-foreground text-center w-full font-bold">
          Page not found
        </p>
      </div>
      <div className="w-dvw p-4 gap-4 flex flex-col">
        <Link href="/sessions">
          <Button className="w-full">Return to sessions page</Button>
        </Link>
        <BackButton className="text-foreground" variant="outline">
          Go back
        </BackButton>
      </div>
    </div>
  );
};

export default page;
