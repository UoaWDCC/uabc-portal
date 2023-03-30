import TextInputProps from "./TextInputProps"

const TextInput = (props: TextInputProps) => {
    return (
        <div>
            <label>
                {props.label}
                <input
                    type="text"
                    defaultValue={props.value}
                    placeholder={props.placeholder}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </label>
        </div>
    )
}

export default TextInput