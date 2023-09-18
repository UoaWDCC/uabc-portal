/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

"use client";

import Heading from "../../../../components/Heading/Heading";
import PaymentInfoCard from "../../../../components/PaymentInfoCard/PaymentInfoCard";
import PaymentOptionCard from "../../../../components/PaymentOptionCard/PaymentOptionCard";

export default function PaymentOptionsPage() {
  return (
    <div>
      <Heading>Payment</Heading>

      <div className="p-2">
        <PaymentInfoCard amount={15} />
      </div>

      <div className="absolute bottom-5 left-0 w-full p-2">
        <p className="font-medium text-center">
          Please select a payment method:
        </p>
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
