import TextInputProps from "./TextInputProps"

// TODO: remove input border when focused
// TODO: tailwind theme

const TextInput = (props: TextInputProps) => {
    return (
        <fieldset style={{border: "solid", borderRadius: "5px", padding: "0px 10px"}}>
            <legend style={{fontSize: "10px"}}>{props.label}</legend>
            <input
                type="text"
                defaultValue={props.value}
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
                style={{width: "100%", border: "none"}}
            />
        </fieldset>
    )
}

export default TextInput