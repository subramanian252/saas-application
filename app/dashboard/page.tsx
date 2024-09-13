import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Sidebar from "./_components/sidebar";

interface Props {}

async function Page(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // console.log(user);

  return <div className="h-full">hello</div>;
}

export default Page;
