import React from "react";
import Image from "next/image";

import EmailLogin from "./EmailLogin";

const AuthLoginMobile = () => {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-[#0A172A] grid place-items-center">
      <div className="w-[375px] flex-col outline-white h-full outline flex items-center justify-center">
        <Image src="/svgs/logo2.svg" alt="uabc logo" width={250} height={250} />
        <div className="mt-10 flex flex-col">
          <p className="text-white text-center">Login into your account</p>
          <EmailLogin />
        </div>
      </div>
    </div>
  );
};

export default AuthLoginMobile;
