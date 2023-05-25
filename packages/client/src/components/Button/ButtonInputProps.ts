/**
 * Type for the button component parameters.
 * @author Lia Arroyo <liayzabel@gmail.com>
 */
type ButtonInputProps = {
  className?: string;
  label: string;
  disabled?: boolean;
  widthFull?: boolean;
  onClick: () => void;
};
