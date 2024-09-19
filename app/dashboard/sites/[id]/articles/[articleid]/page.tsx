import prisma from "@/prisma/prisma";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    articleid: string;
  };
}

async function getArticle(id: string) {
  const article = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      articleContent: true,
      createdAt: true,
      id: true,
    },
  });

  return article;
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const article = await getArticle(params.articleid);

  if (!article) return <div></div>;

  return <div>hello from the overview {article.id}</div>;
}

export default Page;
