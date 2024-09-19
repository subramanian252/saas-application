import { ModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../../../public/logo.svg";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    name: string;
  };
}

async function getData(name: string) {
  const data = await prisma.site.findFirst({
    where: {
      subdirectory: name,
    },
    select: {
      id: true,
      name: true,
      posts: true,
    },
  });
  return data;
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const data = await getData(params.name);

  return (
    <div className="w-full flex flex-col gap-y-10">
      <div className="flex items-center">
        <div className="flex gap-x-4 items-center  text-2xl font-bold justify-center flex-1">
          <div className="relative w-10 h-10">
            <Image
              src={LogoIcon}
              alt="logo"
              fill
              className="object-contain w-full h-full"
            />
          </div>
          <h1 className="capitalize">{data?.name} Blog</h1>
        </div>
        <div className="self-end">
          <ModeToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data?.posts.map((article) => (
          <Card key={article.id} className="w-full rounded-md">
            <CardContent className="flex flex-col gap-2 p-0 ">
              <div className="relative w-full h-48 ">
                <Image
                  src={article.image || "/default.png"}
                  className="w-full h-full object-cover object-center rounded-md"
                  alt="logo"
                  fill
                />
              </div>
              <div className="flex flex-col gap-y-1 p-2">
                <h3 className="text-2xl font-semibold truncate">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 h-10">
                  {article.smallDescription}
                </p>
              </div>
              <CardFooter className="px-2">
                <Button variant="default" asChild className="w-full">
                  <Link href={`/blog/${params.name}/${article.slug}`}>
                    View Article
                  </Link>
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
