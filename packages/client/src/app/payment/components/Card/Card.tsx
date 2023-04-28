// Author: aguo921 (Angela Guo)

// TODO: Make shadow surround entire div

import { PropsWithChildren } from "react";
import CardProps from "./CardProps";

const Card = (props: PropsWithChildren<CardProps>) => {

    return (
        <div onClick={props.onClick} className={`rounded-md shadow-xl m-5 ` + props.className}>
            {props.children}
        </div>
    )
}

export default Card