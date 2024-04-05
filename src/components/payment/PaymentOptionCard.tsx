/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { BsArrowRight } from "react-icons/bs";

import { Card } from "../Card";

interface PaymentOptionCardProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const PaymentOptionCard = ({
  onClick,
  title,
  subtitle,
}: PaymentOptionCardProps) => {
  return (
    <Card onClick={onClick} className="relative bg-gray-200 p-5 pt-10">
      <p className="text-xl font-medium">{title}</p>
      <p className="font-medium text-gray-500">{subtitle}</p>
      <BsArrowRight className="absolute bottom-5 right-5 text-3xl" />
    </Card>
  );
};
