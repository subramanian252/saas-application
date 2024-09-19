import { Button } from "@/components/ui/button";
import prisma from "@/prisma/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { File, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import SiteCard from "./new/_components/SiteCard";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getSites(userId: string) {
  const sites = await prisma.site.findMany({
    where: {
      userId,
    },
  });

  return sites;
}

async function Page(props: Props) {
  noStore();
  const {} = props;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const sites = await getSites(user.id);

  if (!sites || sites.length === 0)
    return (
      <div className="h-full ">
        <div className="flex justify-end mb-8">
          <Button variant={"default"} className="" asChild>
            <Link href="/dashboard/sites/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Site
            </Link>
          </Button>
        </div>
        <div className=" w-full flex border border-white/10 p-20 items-center justify-center flex-col gap-y-6">
          <div className="p-5 bg-muted rounded-full flex items-center justify-center ">
            <File className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold">
              You don&apos;t have any sites yet.
            </p>
            <span className="block">
              You currently have no sites. Please create some by clicking the
              button above.
            </span>
          </div>
          <Button variant={"default"} className="" asChild>
            <Link href="/dashboard/sites/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Site
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex justify-end mb-8">
        <Button variant={"default"} className="" asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Site
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
}

export default Page;
