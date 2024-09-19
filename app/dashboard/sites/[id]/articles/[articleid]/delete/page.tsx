import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deletePost } from "@/actions";
import SubmitButton from "@/components/submit-button";

interface Props {
  params: {
    articleid: string;
    id: string;
  };
}

function Page(props: Props) {
  const { params } = props;

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Card className="w-[456px] -mt-20">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Delete Post</CardTitle>
          <CardDescription>
            Are you sure you want to delete the post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-x-4">
            <Button type="button" variant={"outline"} asChild>
              <Link href={`/dashboard/sites/${params.id}`}>Cancel</Link>
            </Button>
            <form action={deletePost}>
              <input type="hidden" name="deleteId" value={params.articleid} />
              <input type="hidden" name="siteId" value={params.id} />

              <SubmitButton variant="destructive" text="Delete" />
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
