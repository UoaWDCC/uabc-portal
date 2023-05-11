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
    <div className="h-[100dvh] flex flex-col p-2">
      <Heading>Direct Debit</Heading>
      <PaymentInfoCard amount={15} />
      <div className="pb-7 mt-auto grow flex flex-col-reverse">
        <DebitDetailsCard
          title="Reference:"
          text={[firstName + " " + lastName]}
          sessionId={sessionId}
          copy={true}
          onClick={() => {
            navigator.clipboard.writeText(sessionId);
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
        <p className="font-medium text-center">Direct Debit</p>
      </div>
      <div className="flex justify-center">
        <Button label="done" onClick={() => alert("DONE")} />
      </div>
    </div>
  );
}
