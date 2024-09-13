import { ModeToggle } from "@/components/dark-mode-toggle";
import Logo from "@/components/logo";
import React from "react";
import UserButton from "./user-button";

interface Props {}

function Topbar(props: Props) {
  const {} = props;

  return (
    <div className="border-b border-b-white/10 w-full bg-muted flex">
      <div className="w-3/12 border-r border-r-white/10 p-5">
        <Logo />
      </div>
      <div className="flex items-center justify-end gap-x-6 w-9/12 ml-auto p-4">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Topbar;
