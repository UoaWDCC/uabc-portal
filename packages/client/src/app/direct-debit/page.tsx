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
    let accountNumber:string = "xx-xxxx-xxxx-xxx"

    return (
        <div className="h-[90vh] flex flex-col p-2"> {/* 90vh accounts for address bar on ios and etc */}

                <Heading>Direct Debit</Heading>
                <PaymentInfoCard amount={15} />

            <div className="pb-7 mt-auto">
                <p className="font-medium text-center">Direct Debit</p>
                <DebitDetailsCard
                    title="Account Number:"
                    text={[accountNumber]}
                    copy={true}
                    onClick={() => {
                        navigator.clipboard.writeText(accountNumber)
                        alert('Copied to clipboard')
                    }}
                />
                <DebitDetailsCard
                    title="Reference:"
                    text={[firstName+" "+lastName]}
                    sessionId={sessionId}
                    copy={true}
                    onClick={() => {
                        navigator.clipboard.writeText(sessionId)
                        alert('Copied to clipboard')
                    }}
                />

                <div className="flex justify-center">
                    <Button
                        label="done" 
                        onClick={() => alert('DONE')}
                        />
                </div>
            </div>
        </div>
    )
}