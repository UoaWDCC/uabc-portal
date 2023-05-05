/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import PaymentInfoCard from "@/components/PaymentInfoCard/PaymentInfoCard";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";
import Button from "@/components/Button/Button";

export default function DirectDebitPage () {
    let firstName:string = "John"
    let lastName:string = "Smith"
    let sessionId:string = "rn3498"

    return (
        <div className="h-screen flex flex-col p-2">
                <Heading>Direct Debit</Heading>
                <PaymentInfoCard amount={15} />                 

            <div className="pb-7 mt-auto">
                <p className="font-medium text-center">Direct Debit</p>
                <DebitDetailsCard
                    onClick={() => alert('Direct debit')}
                    title="Account Number:"
                    text={["xx-xxxx-xxxx-xxx"]}
                    copy={true}
                />
                <DebitDetailsCard
                    onClick={() => alert('Pay now')}
                    title="Reference:"
                    text={[firstName+" "+lastName]}
                    sessionId={sessionId}
                />
            </div>
        </div>
    )
}