import Link from "next/link";

import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogoNotFound } from "@/components/UabcLogoNotFound";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col justify-evenly items-center overflow-hidden bg-background">
      <UabcHeaderText />
      <div>
        <div className="w-72 aspect-square grid place-items-center opacity-70 mb-2">
          <UabcLogoNotFound className="absolute min-w-[250px]" />
          {/* doubled because of weird font stroke */}
          <h1 className="absolute text-9xl font-bold z-10 select-none textStroke text-white">
            404
          </h1>
          <h1 className="text-9xl font-bold z-10 select-none text-background ">
            404
          </h1>
        </div>
        <p className="text-foreground/70 text-center w-full font-bold text-2xl">
          Page not found :(
        </p>
      </div>
      <div className="w-dvw p-4 gap-4 flex flex-col">
        <Link href="/sessions">
          <Button className="w-full font-bold">Back to home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
