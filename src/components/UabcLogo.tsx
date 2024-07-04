import Image from "next/image";

export const UabcLogo = ({ className }: { className?: string }) => (
  <div className={className}>
    <Image
      src="/svgs/logo-darkmode.svg"
      alt="uabc logo"
      className="hidden dark:block"
      width={250}
      height={250}
      draggable={false}
    />
    <Image
      src="/svgs/logo.svg"
      alt="uabc logo"
      className="block dark:hidden"
      width={250}
      height={250}
      draggable={false}
    />
  </div>
);
