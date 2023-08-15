/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { PropsWithChildren } from "react";
import CardProps from "./CardProps";

const Card = ({onClick, className, children} : PropsWithChildren<CardProps>) => {
  return (
    <div onClick={onClick} className={`rounded-md ` + className}>
      {children}
    </div>
  );
};

export default Card;
