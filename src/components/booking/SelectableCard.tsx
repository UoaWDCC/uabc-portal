import { ChangeEvent, useRef } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { twJoin } from "tailwind-merge";
import { SelectSessionCard, SelectSessionCardProps } from "./SelectSessionCard";

export interface SelectableCardProps
  extends Omit<SelectSessionCardProps, "status"> {
  disabled?: boolean;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SelectableCard = ({
  disabled,
  checked,
  onChange,
  ...props
}: SelectableCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isSelected = checked || inputRef.current?.checked;
  return (
    <label className={twJoin("relative", !disabled && "cursor-pointer")}>
      {isSelected && (
        <IoCheckmarkCircle
          className="absolute right-5 top-1/2 -translate-y-1/2"
          color="white"
          size={30}
        />
      )}
      <input
        className="hidden"
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        ref={inputRef}
      />
      <SelectSessionCard
        status={disabled ? "disabled" : checked ? "selected" : "default"}
        {...props}
      />
    </label>
  );
};
