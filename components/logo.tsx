import Image from "next/image";
import React from "react";
import LogoIcon from "../public/logo.svg";
import Link from "next/link";

interface Props {}

function Logo(props: Props) {
  const {} = props;

  return (
    <Link href="/" className="flex gap-x-2">
      <div className="relative w-10 h-10">
        <Image
          src={LogoIcon}
          alt="logo"
          fill
          className="object-contain w-full h-full"
        />
      </div>
      <h1 className="font-extrabold text-3xl">
        Blog<span className="text-primary">Marshal</span>
      </h1>
    </Link>
  );
}

export default Logo;
