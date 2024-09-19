import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return <div className="flex h-full justify-center p-10">{children}</div>;
}

export default Layout;
