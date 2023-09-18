/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import PaymentInfoCard from "@/components/PaymentInfoCard/PaymentInfoCard";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";
import Button from "@/components/Button/Button";
import ScrollShadow from "@/components/ScrollShadow";

export default function DirectDebitPage() {
  const firstName: string = "John";
  const lastName: string = "Smith";
  const sessionId: string = "rn3498";
  const accountNumber: string = "xx-xxxx-xxxx-xxx";

  return (
    // TODO: Add functionality for DONE button
    // TODO: Link name, payment components to backend
    <div className="h-[100dvh] flex flex-col p-10">
      <div className="pb-10 -translate-x-3">
        <Heading>Payment</Heading>
      </div>
      <PaymentInfoCard amount={15} />
      <p className="mt-auto font-medium text-center flex flex-col-reverse grow p-3">
        Direct Debit
      </p>
      <ScrollShadow>
        <div className="flex flex-col overflow-y-auto w-full gap-4 bg-bottom h-[calc(100dvh-460px)] max-h-[248px]">
          <DebitDetailsCard
            title="Account Number:"
            subtitle={accountNumber}
            onClick={() => {
              navigator.clipboard.writeText(accountNumber);
            }}
          />

          <DebitDetailsCard
            title="Reference:"
            subtitle={`${firstName} ${lastName}`}
            sessionId={sessionId}
            onClick={() => {
              navigator.clipboard.writeText(sessionId);
            }}
          />
        </div>
      </ScrollShadow>

      <div className="flex justify-center mt-8">
        <Button label="done" widthFull={true} onClick={() => alert("DONE")} />
      </div>
    </div>
  );
}