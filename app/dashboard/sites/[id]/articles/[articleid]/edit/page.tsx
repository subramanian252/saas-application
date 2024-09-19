import { Button } from "@/components/ui/button";
import prisma from "@/prisma/prisma";
import { ArrowLeftIcon, PencilRuler } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditForm from "./_components/edit-form";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    articleid: string;
    id: string;
  };
}

async function getArticle(id: string) {
  const article = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return article;
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const article = await getArticle(params.articleid);

  if (!article)
    return (
      <div>
        <div>Loading</div>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-4">
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
        <h1 className="text-lg font-semibold">Edit Article</h1>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Edit Article</CardTitle>
          <CardDescription>
            Edit your Article here and re-publish.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditForm article={article} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
