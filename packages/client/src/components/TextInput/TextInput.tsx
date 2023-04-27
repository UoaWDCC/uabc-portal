// Author: aguo921 (Angela Guo)

import TextInputProps from "./TextInputProps"
import { useState } from "react";

const TextInput = (props: TextInputProps) => {
    const [active, setActive] = useState(false)

    const borderColour =  active ? "blue-500" : "blue-400"

    return (
        <div className="mx-8 my-4 relative">
            <label
                htmlFor="input"
                className={
                    `absolute left-3 transition-all
                    ${active || props.value != "" ?
                    `top-[-0.75rem] bg-white text-sm px-2 text-${borderColour}` : 
                    `top-1.5 text-gray-500 cursor-text`}`
                }
            >
                {props.label}
            </label>
            <input
                id="input"
                type="text"
                defaultValue={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                className={`ring-2 ring-${borderColour} focus:ring-${borderColour} border-none outline-none w-full rounded-md p-2`}
            />
        </div>
    )
}

export default TextInput