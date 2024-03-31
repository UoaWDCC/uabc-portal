import { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<SVGElement>;

export const ConfirmationBanner = (props: IconProps) => (
  <svg
    preserveAspectRatio="none"
    height="135"
    viewBox="0 0 393 155"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M392.256 127.187C235.154 177.559 65.2927 148.175 0 127.187V0H392.256V127.187Z"
      fill="#DCE1E9"
    />
  </svg>
);
