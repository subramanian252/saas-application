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
    <div className="flex flex-col h-full">
      <Topbar />
      <div className="flex w-full h-full">
        <div className="w-3/12 h-full ">
          <Sidebar />
        </div>
        <div className="w-9/12 p-6 bg-background overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
