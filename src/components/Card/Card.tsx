/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { PropsWithChildren } from "react";
import CardProps from "./CardProps";

const Card = (props: PropsWithChildren<CardProps>) => {
  return (
    <div
      onClick={props.onClick}
      className={`rounded-md drop-shadow-2xl ` + props.className}
    >
      {props.children}
    </div>
  );
};

export default Card;
