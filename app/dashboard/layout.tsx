import React from "react";
import Sidebar from "./_components/sidebar";
import Logo from "@/components/logo";
import Topbar from "./_components/topbar";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <div className="h-full flex flex-col ">
      <Topbar />
      <div className="flex w-full h-full">
        <div className="w-3/12">
          <Sidebar />
        </div>
        <div className="w-9/12 p-6 bg-background">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
