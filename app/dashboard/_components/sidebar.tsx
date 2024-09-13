"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DollarSign, Globe2, Home } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

interface Props {}

const navlinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: Home,
  },
  {
    name: "Sites",
    href: "/dashboard/sites",
    Icon: Globe2,
  },
  {
    name: "Users",
    href: "/dashboard/pricing",
    Icon: DollarSign,
  },
];

function Sidebar(props: Props) {
  const {} = props;

  const pathname = usePathname();

  console.log(pathname);

  return (
    <aside className="flex flex-col gap-y-3 border-r border-r-white/10 h-full p-5 bg-muted">
      {navlinks.map((link, index) => (
        <Link key={index} href={link.href} className="w-full ">
          <Button
            className={cn(
              "flex justify-start w-full gap-x-4 items-center rounded-md h-14",
              pathname === link.href ? "bg-primary/70 text-white" : ""
            )}
            variant={"ghost"}
          >
            <link.Icon />
            <p>{link.name}</p>
          </Button>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
