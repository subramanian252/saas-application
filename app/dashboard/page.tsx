import prisma from "@/prisma/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SiteCard from "./sites/new/_components/SiteCard";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId,
      },
      take: 4,
    }),
    prisma.post.findMany({
      where: {
        userId,
      },
      take: 4,
    }),
  ]);

  return {
    sites,
    articles,
  };
}

async function Page(props: Props) {
  noStore();
  const {} = props;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { sites, articles } = await getData(user.id);

  return (
    <div className="h-full flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-semibold">Your Sites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-semibold">Your Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article) => (
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
                    <Link
                      href={`/dashboard/sites/${article.siteId}/articles/${article.id}/edit`}
                    >
                      Edit Site
                    </Link>
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
