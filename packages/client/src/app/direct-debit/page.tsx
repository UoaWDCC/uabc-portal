/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import PaymentInfoCard from "@/components/PaymentInfoCard/PaymentInfoCard";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";
import Button from "@/components/Button/Button";
import React, { useState } from "react";

export default function DirectDebitPage() {
  const firstName: string = "John";
  const lastName: string = "Smith";
  const sessionId: string = "rn3498";
  const accountNumber: string = "xx-xxxx-xxxx-xxx";

  const [top, setTop] = useState(0);
  const [bot, setBot] = useState(61);

  const handleScroll = (e: any) => {
    setBot(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight);
    setTop(e.target.scrollTop);
    console.log(top);
    console.log(bot);
  };

  return (
    <div className="h-[100dvh] flex flex-col p-5">
      <Heading>Direct Debit</Heading>
      <PaymentInfoCard amount={15} />
      <p className="mt-auto font-medium text-center flex flex-col-reverse grow py-3">
        Direct Debit {bot} {top}
      </p>
      <div
        className={
          `flex flex-col overflow-y-auto gap-5 ` +
          (bot < 1 ? "ttop" : top < 1 ? "bbot" : "mmid")
        }
        onScroll={handleScroll}
      >
        <DebitDetailsCard
          title="Account Number:"
          text={[accountNumber]}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(accountNumber);
          }}
        />
        <DebitDetailsCard
          title="Account Number:"
          text={[accountNumber]}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(accountNumber);
          }}
        />
        <DebitDetailsCard
          title="Account Number:"
          text={[accountNumber]}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(accountNumber);
          }}
        />
        <DebitDetailsCard
          title="Account Number:"
          text={[accountNumber]}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(accountNumber);
          }}
        />
        <DebitDetailsCard
          title="Account Number:"
          text={[accountNumber]}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(accountNumber);
          }}
        />

        <DebitDetailsCard
          title="Reference:"
          text={[firstName + " " + lastName]}
          sessionId={sessionId}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(sessionId);
          }}
        />
      </div>
      <div className="flex justify-center mt-5">
        <Button label="done" widthFull={true} onClick={() => null} />
      </div>
    </div>
  );
}
