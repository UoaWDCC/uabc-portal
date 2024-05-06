import type { HTMLAttributes } from "react";

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

export const ArrowRight = (props: IconProps) => (
  <svg
    width="32"
    height="16"
    viewBox="0 0 32 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M32.7071 8.70711C33.0976 8.31658 33.0976 7.68342 32.7071 7.29289L26.3431 0.928932C25.9526 0.538408 25.3195 0.538408 24.9289 0.928932C24.5384 1.31946 24.5384 1.95262 24.9289 2.34315L30.5858 8L24.9289 13.6569C24.5384 14.0474 24.5384 14.6805 24.9289 15.0711C25.3195 15.4616 25.9526 15.4616 26.3431 15.0711L32.7071 8.70711ZM0 9H32V7H0V9Z" />
  </svg>
);
