import { Button } from "@/components/ui/button";
import prisma from "@/prisma/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import UploadImageForm from "./_components/upload-image-form";
import SubmitButton from "@/components/submit-button";
import { deleteSite } from "@/actions";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    id: string;
  };
}

async function getSite(id: string) {
  const site = await prisma.site.findUnique({
    where: {
      id: id,
    },
  });
  return site;
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const site = await getSite(params.id);
  if (!site) return <div></div>;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-start gap-x-4 items-center">
        <Button
          type="button"
          variant={"secondary"}
          className=""
          size={"icon"}
          asChild
        >
          <Link href={`/dashboard/sites/${params.id}`}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Site Settings</h1>
      </div>

      <div>
        <UploadImageForm imageUrl={site.imageUrl} />
      </div>
      <div className="p-5 w-full border-red-500 border bg-red-500/20 rounded-lg flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold text-red-500">Danger</h1>
          <p className="text-xm">
            Are you sure you want to delete this site?, this will also delete
            all the posts asscociated with it!
          </p>
        </div>
        <form action={deleteSite}>
          <input type="hidden" name="siteId" value={params.id} />

          <SubmitButton variant={"destructive"} text="Delete Site" />
        </form>
      </div>
    </div>
  );
}

export default Page;
