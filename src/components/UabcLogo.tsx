import Image from "next/image";

interface UabcLogoProps {
  className?: string;
  size?: number;
}

export const UabcLogo = ({ className, size = 250 }: UabcLogoProps) => (
  <div className={className}>
    <Image
      src="/svgs/logo-darkmode.svg"
      alt="uabc logo"
      className="hidden dark:block"
      width={size}
      height={size}
      draggable={false}
    />
    <Image
      src="/svgs/logo.svg"
      alt="uabc logo"
      className="block dark:hidden"
      width={size}
      height={size}
      draggable={false}
    />
  </div>
);
