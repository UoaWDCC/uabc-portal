/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import { Heading } from "@/components/Heading";
import { PaymentInfoCard } from "@/components/PaymentInfoCard";
import { DebitDetailsCard } from "@/components/DebitDetailsCard";
import { Button } from "@/components/Button";
import ScrollShadow from "@/components/ScrollShadow";

export default function DirectDebitPage() {
  const firstName: string = "John";
  const lastName: string = "Smith";
  const sessionId: string = "rn3498";
  const accountNumber: string = "xx-xxxx-xxxx-xxx";

  return (
    // TODO: Add functionality for DONE button
    // TODO: Link name, payment components to backend
    <div className="flex h-[100dvh] flex-col p-10">
      <div className="-translate-x-3 pb-10">
        <Heading>Payment</Heading>
      </div>
      <PaymentInfoCard amount={15} />
      <p className="mt-auto flex grow flex-col-reverse p-3 text-center font-medium">
        Direct Debit
      </p>
      <ScrollShadow>
        <div className="flex h-[calc(100dvh-460px)] max-h-[248px] w-full flex-col gap-4 overflow-y-auto bg-bottom">
          <DebitDetailsCard
            title="Account Number:"
            subtitle={accountNumber}
            copyText={accountNumber}
          />

          <DebitDetailsCard
            title="Reference:"
            subtitle={`${firstName} ${lastName}`}
            sessionId={sessionId}
            copyText={sessionId}
          />
        </div>
      </ScrollShadow>

      <div className="mt-8 flex justify-center">
        <Button label="done" widthFull={true} onClick={() => alert("DONE")} />
      </div>
    </div>
  );
}
