/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

"use client";

import { Heading } from "@/components/Heading";
import { PaymentInfoCard } from "@/components/payment/PaymentInfoCard";
import { PaymentOptionCard } from "@/components/payment/PaymentOptionCard";

export default function PaymentOptionsPage() {
  return (
    <div className="flex h-dvh flex-col">
      <Heading className="pb-4 pl-6 pt-10">Payment</Heading>

      <PaymentInfoCard amount={15} className="mx-10" />

      <p className="flex grow flex-col-reverse py-3 text-center font-medium">
        Please select a payment method:
      </p>
      <div className="mx-10 flex flex-col gap-3 overflow-y-auto overscroll-contain py-2 pb-10">
        <PaymentOptionCard
          onClick={() => alert("Direct debit")}
          title="Direct Debit"
          subtitle="Pay via Bank Transfer"
        />
        <PaymentOptionCard
          onClick={() => alert("Pay now")}
          title="Pay Now"
          subtitle="Pay via a Debit or Credit Card"
        />
      </div>
    </div>
  );
}
