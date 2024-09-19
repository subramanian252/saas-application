import { Button } from "@/components/ui/button";
import { Check, TicketX, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="p-8 shadow-sm  border-2 rounded-lg  flex flex-col text-center items-center gap-y-4">
        <XIcon className="w-14 h-14 text-red-500 bg-red-300/30 p-2 rounded-full" />
        <div className="flex flex-col items-center gap-y-2 w-fit">
          <h1 className="text-3xl font-bold">Payment Failed</h1>
          <p className="text-base font-semibold w-[400px] text-gray-500">
            Your payment failed to complete. Please try again
          </p>
        </div>
        <Button variant={"default"} className="" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

export default Page;
