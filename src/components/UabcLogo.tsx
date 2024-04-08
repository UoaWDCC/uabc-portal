import Image from "next/image";

export const UabcLogo = ({ className }: { className?: string }) => (
  <div className={className}>
    <Image
      src="/svgs/logoDM.svg"
      alt="uabc logo"
      className="dark:block hidden"
      width={250}
      height={250}
      draggable={false}
    />
    <Image
      src="/svgs/logo.svg"
      alt="uabc logo"
      className="dark:hidden block"
      width={250}
      height={250}
      draggable={false}
    />
  </div>
);
