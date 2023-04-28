// Author: aguo921 (Angela Guo)

// TODO: Make shadow surround entire div

import HeadingProps from "./HeadingProps";

const Heading = (props: HeadingProps) => {

    return (
        <div className="font-bold text-3xl m-5 mt-10">
            {props.children}
        </div>
    )
}

export default Heading