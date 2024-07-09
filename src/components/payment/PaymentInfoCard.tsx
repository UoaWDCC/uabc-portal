/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { cn } from "@/lib/utils";
import { Card } from "../Card";

interface PaymentInfoCardProps {
  amount: number;
  className?: string;
}

export const PaymentInfoCard = ({
  amount,
  className,
}: PaymentInfoCardProps) => {
  const dollarAmount = "$" + (Math.round(amount * 100) / 100).toFixed(2);

  return (
    //TODO: colours
    <Card
      className={cn(
        "bg-[#3767af] p-8 pt-12 text-center text-white shadow-xl",
        className
      )}
    >
      <p className="text-xs text-[#AFCFFF]">Your total for this session:</p>
      <p className="mb-5 text-3xl font-bold">{dollarAmount}</p>
      <p className="text-xs">Casual Badminton Session</p>
    </Card>
  );
};
