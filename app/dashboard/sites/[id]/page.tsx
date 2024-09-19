import { Button } from "@/components/ui/button";
import prisma from "@/prisma/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { File, MoreHorizontal, PlusCircle, Settings, View } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

async function getArticles(id: string, userId: string) {
  const [articles, site] = await Promise.all([
    prisma.post.findMany({
      where: {
        siteId: id,
        userId: userId,
      },
      select: {
        image: true,
        title: true,
        createdAt: true,
        id: true,
        Site: {
          select: {
            subdirectory: true,
          },
        },
      },
    }),

    prisma.site.findUnique({
      where: {
        id,
        userId,
      },
      select: {
        subdirectory: true,
      },
    }),
  ]);

  return { articles, site };
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { articles, site } = await getArticles(params.id, user.id);

  return (
    <div className="h-full ">
      <div className="flex justify-start mb-8 gap-x-2 flex-row-reverse">
        <Button type="button" variant={"default"} className="" asChild>
          <Link href={`/dashboard/sites/${params.id}/create`}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Article
          </Link>
        </Button>
        <Button variant={"secondary"} className="" asChild>
          <Link href={`/dashboard/sites/${params.id}/settings`}>
            <Settings className="h-4 w-4 mr-2" />
            settings
          </Link>
        </Button>
        <Button variant={"secondary"} className="" asChild>
          <Link href={`/blog/${site?.subdirectory}`}>
            <View className="h-4 w-4 mr-2" />
            View Blog
          </Link>
        </Button>
      </div>
      <div>
        {articles.length === 0 && (
          <div className=" w-full flex border border-white/10 p-20 items-center justify-center flex-col gap-y-6">
            <div className="p-5 bg-muted rounded-full flex items-center justify-center ">
              <File className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-4">
              <p className="text-2xl font-semibold">
                You don&apos;t have any articles yet.
              </p>
              <span className="block">
                You currently have no articles. Please create some by clicking
                the button above.
              </span>
            </div>
          </div>
        )}
      </div>
      {articles.length > 0 && (
        <>
          <div className="flex py-20 items-center justify-center w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Your articles
                </CardTitle>
                <CardDescription>
                  you can manage your articles here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="space-y-6">
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          <div className="relative w-28 h-16">
                            <Image
                              fill
                              src={article.image}
                              alt="image"
                              className="object-cover rounded-lg"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/dashboard/sites/${params.id}/articles/${article.id}`}
                          >
                            {article.title}
                          </Link>
                        </TableCell>
                        <TableCell className="font-extrabold">
                          <div className="w-fit text-sm bg-green-200/80 text-green-500 p-1.5 rounded-lg">
                            Published
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(article.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant={"secondary"} size={"icon"}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-24">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/sites/${params.id}/articles/${article.id}/edit`}
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link
                                  href={`/dashboard/sites/${params.id}/articles/${article.id}/delete`}
                                >
                                  Delete
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
