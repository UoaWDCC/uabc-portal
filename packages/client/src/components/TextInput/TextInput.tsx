import TextInputProps from "./TextInputProps"

// TODO: fix border colour issue when focused 
// TODO: ask about placeholder label

const TextInput = (props: TextInputProps) => {
    return (
        <div className="mx-8 my-4 relative">
            <label htmlFor="input" className="absolute top-[-0.75rem] left-3 bg-white text-sm px-2">{props.label}</label>
            <input
                id="input"
                type="text"
                defaultValue={props.value}
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
                className="border border-blue-600 active:border-blue-600 w-full rounded-md p-2"
            />
        </div>
    )
}

export default TextInput