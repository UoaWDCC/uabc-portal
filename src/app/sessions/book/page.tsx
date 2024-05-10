"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";

// import gameSessions from "@/types/game-session";

export default function BookSessionPage() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleNextButtonClick = () => {
    router.push("/sessions/book/payment");
  };

  const cart = useCartStore((state) => state.cart);
  const isPlayLevelSelected = cart.every(
    (session) => session.playLevel !== undefined,
  );

  return (
    <div className="flex flex-col h-dvh mx-4 gap-y-4">
      <div className="flex mt-4 align-middle text-tertiary">
        <Button
          variant={"ghost"}
          className="grid place-items-center mr-4 size-8"
          size={"icon"}
          onClick={handleBackButtonClick}
        >
          <IoArrowBackOutline size={24} />
        </Button>
        <span className="text-lg font-medium leading-none self-center">
          Select your membership type
        </span>
      </div>

      <div className="mx-5">
        {cart.map((session) => (
          <div key={session.id} className="mb-4">
            <ExpandedSessionCard gameSession={session} />
          </div>
        ))}
      </div>

      <div className="mb-10 flex flex-grow">
        <Button
          className="w-full self-end"
          onClick={handleNextButtonClick}
          disabled={!isPlayLevelSelected}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
