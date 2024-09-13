import Image from "next/image";
import React from "react";

interface Props {}

function Logo(props: Props) {
  const {} = props;

  return (
    <div className="flex gap-x-1">
      <div className="relative w-10 h-10">
        <Image src={"./logo.svg"} fill alt="logo" />
      </div>
      <h1 className="font-extrabold text-3xl">
        Blog<span className="text-primary">Marshal</span>
      </h1>
    </div>
  );
}

export default Logo;
