/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import PaymentInfoCardProps from "./PaymentInfoCardProps";

const PaymentInfoCard = (props: PaymentInfoCardProps) => {
  const dollarAmount = "$" + (Math.round(props.amount * 100) / 100).toFixed(2);

  return (
    // TODO: Change colours to official ones
    <Card className="text-center p-8 pt-12 bg-[#3767af] text-white shadow-xl">
      <p className="text-[#AFCFFF] text-xs">Your total for this session:</p>
      <p className="text-3xl font-bold mb-5">{dollarAmount}</p>
      <p className="text-xs">Casual Badminton Session</p>
    </Card>
  );
};

export default PaymentInfoCard;
