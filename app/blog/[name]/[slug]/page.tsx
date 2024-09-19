import { ModeToggle } from "@/components/dark-mode-toggle";
import { RenderArticle } from "@/components/render-article";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    name: string;
    slug: string;
  };
}

async function getData(name: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: name,
    },
  });
  return data;
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const data = await getData(params.slug);

  if (!data) return;

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex justify-start gap-x-4 items-center">
        <Button
          type="button"
          variant={"outline"}
          className=""
          size={"icon"}
          asChild
        >
          <>
            <Link href={`/blog/${params.name}`}>
              <ArrowLeftIcon className="h-4 w-4 " />
            </Link>
          </>
        </Button>
        <p>Go back</p>
      </div>
      <div className="flex flex-col gap-y-5 items-center justify-center mt-10 ">
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-gray-500">
            {new Date(data.createdAt).toDateString()}
          </p>
          <h1 className="text-6xl font-bold">{data?.title}</h1>
          <p className="text-gray-500 text-lg">{data?.smallDescription}</p>
        </div>
        <div className="relative h-[500px] w-[800px] rounded-xl">
          <Image
            src={data?.image || "/default.png"}
            className="object-cover translate-x-5 rounded-xl"
            fill
            alt={data?.title}
          />
        </div>
      </div>
      <div className="flex justify-start w-full py-10">
        <RenderArticle jsonNew={data.articleContent as JSONContent} />
      </div>
    </div>
  );
}

export default Page;
