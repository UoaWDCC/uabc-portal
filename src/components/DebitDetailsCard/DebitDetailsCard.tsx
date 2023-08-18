/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import DebitDetailsCardProps from "./DebitDetailsCardProps";
import { MdContentCopy } from "react-icons/md";

const DebitDetailsCard = ({
  title,
  subtitle,
  sessionId,
  onClick,
}: DebitDetailsCardProps) => {
  return (
    <Card className="bg-gray-200 font-normal p-5 mt-0 pt-50 relative">
      <p className="font-medium text-xl top-5">{title}</p>
      <p className="text-gray-500">{subtitle}</p>

      {sessionId && (
        <p className="pt-5 blueGray-200">
          SessionID: <span className="font-bold">{sessionId}</span>
        </p>
      )}
      {/* Clipboard button is positioned absolute relative to the parent card container */}
      <button
        onPointerDown={onClick}
        className="absolute right-4 top-1/2 translate-y-[-50%] p-2 rounded-lg"
      >
        <MdContentCopy className="text-3xl" />
      </button>
    </Card>
  );
};

export default DebitDetailsCard;
