/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import PaymentInfoCard from "@/components/PaymentInfoCard/PaymentInfoCard";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";
import Button from "@/components/Button/Button";

export default function DirectDebitPage() {
  const firstName: string = "John";
  const lastName: string = "Smith";
  const sessionId: string = "rn3498";
  const accountNumber: string = "xx-xxxx-xxxx-xxx";

  return (
    <div className="h-[100dvh] flex flex-col p-5">
      <Heading>Direct Debit</Heading>
      <PaymentInfoCard amount={15} />
      <p className="mt-auto font-medium text-center flex flex-col-reverse grow pt-3">
        Direct Debit
      </p>
      <div className="flex flex-col overflow-y-auto w-full gap-4 bg-bottom py-3 scroll-fade">
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
