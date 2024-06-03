interface InputMessageProps {
  isError?: boolean;
  isSuccess?: boolean;
  inputText?: string;
}

const InputMessage = ({
  inputText: inputText,
  isError,
  isSuccess,
}: InputMessageProps) => {
  return (
    <div className={"w-full h-4 mt-1 mb-3"}>
      <span className={"text-xs text-destructive"}>
        {isError ? inputText : ""}
      </span>
      <span className={"text-xs text-green-600"}>
        {isSuccess ? inputText : ""}
      </span>
    </div>
  );
};

export default InputMessage;
