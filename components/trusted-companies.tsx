import Image from "next/image";
import React from "react";

import NextLogo from "../public/logos/nextjs.svg";
import VercelLogo from "../public/logos/vercel.svg";

import KindeLogo from "../public/logos/kinde.svg";

interface Props {}

function TrustedCompanies(props: Props) {
  const {} = props;

  return (
    <div className="w-full h-full flex flex-col items-center pt-40">
      <h1 className="text-3xl font-bold">
        Trusted by the best companies in the world
      </h1>
      <div className="flex items-center justify-center gap-x-20">
        <div className="relative w-40 h-40">
          <Image src={NextLogo} alt="vercel" fill />
        </div>
        <div className="relative w-40 h-40">
          <Image src={VercelLogo} alt="vercel" fill />
        </div>
        <div className="relative w-36 h-40">
          <Image src={KindeLogo} alt="vercel" fill />
        </div>
        <div className="relative w-40 h-40 ">
          <Image
            src={VercelLogo}
            alt="vercel"
            fill
            className="object-contain w-full h-full"
          />
        </div>
        <div className="relative w-40 h-40">
          <Image src={NextLogo} alt="vercel" fill />
        </div>
      </div>
    </div>
  );
}

export default TrustedCompanies;
