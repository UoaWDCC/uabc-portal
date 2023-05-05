/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import PaymentInfoCard from "@/components/PaymentInfoCard/PaymentInfoCard";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";

export default function DirectDebitPage (firstName:string, lastName:string, sessionId:string) {
    firstName = "John"
    lastName = "Smith"
    sessionId = "rn3498"

    return (
        <div className="h-screen flex flex-col">
            <Heading>Direct Debit</Heading>
            <PaymentInfoCard amount={15} />

            <div className="left-0 w-full p-2 pb-3 mt-auto">
                <p className="font-medium text-center">Direct Debit:</p>
                <DebitDetailsCard
                    onClick={() => alert('Direct debit')}
                    title="Account Number:"
                    text={["xx-xxxx-xxxx-xxx"]}
                    sessionId={null}
                    copy={true}
                />
                <DebitDetailsCard
                    onClick={() => alert('Pay now')}
                    title="Reference:"
                    text={[firstName, lastName]}
                    sessionId = {sessionId}
                    copy = {false}
                />
            </div>
        </div>
    )
}