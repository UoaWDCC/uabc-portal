import Image from "next/image";

export const UabcLogo = () => (
  <>
    <Image
      src="/svgs/logoDM.svg"
      alt="uabc logo"
      className="dark:block hidden"
      width={225}
      height={225}
      draggable={false}
    />
    <Image
      src="/svgs/logo.svg"
      alt="uabc logo"
      className="dark:hidden block"
      width={225}
      height={225}
      draggable={false}
    />
  </>
);
