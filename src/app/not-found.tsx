import Link from "next/link";

import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogoNotFound } from "@/components/UabcLogoNotFound";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-evenly overflow-hidden bg-background">
      <UabcHeaderText />
      <div>
        <div className="mb-2 grid aspect-square w-72 place-items-center opacity-70">
          <UabcLogoNotFound className="absolute min-w-[250px]" />
          {/* doubled because of weird font stroke */}
          <h1 className="textStroke absolute z-10 select-none text-9xl font-bold text-white">
            404
          </h1>
          <h1 className="z-10 select-none text-9xl font-bold text-background ">
            404
          </h1>
        </div>
        <p className="w-full text-center text-2xl font-bold text-foreground/70">
          Page not found :(
        </p>
      </div>
      <div className="flex w-dvw flex-col gap-4 p-4">
        <Link href="/">
          <Button className="w-full font-bold">Back to home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
