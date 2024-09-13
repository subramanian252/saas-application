import { Button } from "@/components/ui/button";
import { File, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

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
}

export default Page;
