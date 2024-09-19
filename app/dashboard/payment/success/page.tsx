import { Button } from "@/components/ui/button";
import { Check, TicketX } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="p-8 shadow-sm border-2 rounded-lg  flex flex-col text-center items-center gap-y-4">
        <Check className="w-14 h-14 text-green-500 bg-green-300/30 p-2 rounded-full" />
        <div className="flex flex-col items-center gap-y-2 w-fit">
          <h1 className="text-3xl font-bold">Payment Successful</h1>
          <p className="text-base font-semibold w-[400px] text-gray-500">
            Thank you for your payment. You can now enjoy the premium access
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
