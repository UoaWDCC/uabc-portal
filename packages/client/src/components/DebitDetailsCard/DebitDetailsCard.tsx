/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import DebitDetailsCardProps from "./DebitDetailsCardProps";
import { MdContentCopy } from "react-icons/md";

const DebitDetailsCard = (props: DebitDetailsCardProps) => {
  return (
    <Card className="bg-gray-200 p-5 mt-0 pt-50 relative">
      <p className="font-medium text-xl top-5">{props.title}</p>

      {props.text.map((text, index) => {
        return (
          <p className="font-normal text-gray-500" key={index}>
            {text}
          </p>
        );
      })}

      {props.sessionId && (
        <>
          <br />
          <p className="font-normal blueGray-200 inline">SessionID: </p>
          <p className="font-bold blueGray-200 inline">{props.sessionId}</p>
        </>
      )}

      {props.copy && (
        <button
          onPointerDown={props.onClick}
          className="absolute right-4 top-1/2 translate-y-[-50%] p-2 rounded-lg active:bg-gray-300"
        >
          <MdContentCopy className="text-3xl" />
        </button>
      )}
    </Card>
  );
};

export default DebitDetailsCard;
