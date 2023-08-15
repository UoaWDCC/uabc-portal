/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import DebitDetailsCardProps from "./DebitDetailsCardProps";
import { MdContentCopy } from "react-icons/md";

const DebitDetailsCard = ({title, text, sessionId, onClick, copy}: DebitDetailsCardProps) => {
  return (
    <Card className="bg-gray-200 p-5 mt-0 pt-50 relative">
      <p className="font-medium text-xl top-5">{title}</p>

      {text.map((text, index) => {
        return (
          <p className="font-normal text-gray-500" key={index}>
            {text}
          </p>
        );
      })}

      {sessionId && (
        <>
          <br />
          <p className="font-normal blueGray-200 inline">SessionID: </p>
          <p className="font-bold blueGray-200 inline">{sessionId}</p>
        </>
      )}

      {copy && (
        <button
          onPointerDown={onClick}
          className="absolute right-4 top-1/2 translate-y-[-50%] p-2 rounded-lg"
        >
          <MdContentCopy className="text-3xl" />
        </button>
      )}
    </Card>
  );
};

export default DebitDetailsCard;
