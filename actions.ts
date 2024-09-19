"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { parseWithZod } from "@conform-to/zod";
import { postSchema, siteCreationSchema } from "./zodSchemas";
import prisma from "./prisma/prisma";
import { redirect } from "next/navigation";
import { stripe } from "./lib/stripe";

export async function createSite(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const [subStatus, sites] = await Promise.all([
    prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        status: true,
      },
    }),
    prisma.site.findMany({ where: { userId: user.id } }),
  ]);

  if (!subStatus || subStatus.status !== "active") {
    if (sites.length < 1) {
      await createSiteNew();
    } else {
      redirect(`/dashboard/pricing`);
    }
  } else if (subStatus.status === "active") {
    await createSiteNew();
  }

  async function createSiteNew() {
    const submission = parseWithZod(formData, {
      schema: siteCreationSchema({
        isSubDirectoryUnique: () => {
          if (
            sites.some(
              (site) => site.subdirectory === formData.get("subdirectory")
            )
          ) {
            return false;
          }
          return true;
        },
      }),
    });

    if (submission.status !== "success") {
      return submission.reply();
    }

    const site = await prisma.site.create({
      data: {
        name: submission.value.name,
        description: submission.value.description,
        subdirectory: submission.value.subdirectory,
        userId: user.id,
      },
    });
  }
  return redirect(`/dashboard/sites`);
}

export async function createPost(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const post = await prisma.post.create({
    data: {
      title: submission.value.title,
      image: submission.value.image,
      smallDescription: submission.value.smallDescription,
      articleContent: submission.value.articleContent,
      slug: submission.value.slug,
      userId: user.id,
      siteId: submission.value.siteId,
    },
  });

  return redirect(`/dashboard/sites/${submission.value.siteId}`);
}

export async function editPost(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const post = await prisma.post.update({
    where: {
      id: formData.get("editId") as string,
    },
    data: {
      title: submission.value.title,
      image: submission.value.image,
      smallDescription: submission.value.smallDescription,
      articleContent: submission.value.articleContent,
      slug: submission.value.slug,
      userId: user.id,
      siteId: submission.value.siteId,
    },
  });

  return redirect(`/dashboard/sites/${submission.value.siteId}`);
}

export async function deletePost(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const siteId = formData.get("siteId");

  const post = await prisma.post.delete({
    where: {
      id: formData.get("deleteId") as string,
      userId: user.id,
    },
  });

  return redirect(`/dashboard/sites/${siteId}`);
}

export async function uploadImage(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const siteId = formData.get("siteId");

  const image = formData.get("imageUrl");

  const site = await prisma.site.update({
    where: {
      id: siteId as string,
      userId: user.id,
    },
    data: {
      imageUrl: image as string,
    },
  });

  return redirect(`/dashboard/sites`);
}

export async function deleteSite(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const siteId = formData.get("siteId");

  const site = await prisma.site.delete({
    where: {
      id: siteId as string,
      userId: user.id,
    },
  });

  return redirect(`/dashboard/sites`);
}

export async function createPaymentSession() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: `${stripeUserId?.firstName}`,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId?.customerId as string,
    customer_update: {
      address: "auto",
      name: "auto",
    },
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID as string,
        quantity: 1,
      },
    ],
    billing_address_collection: "auto",
    success_url: "http://localhost:3000/dashboard/payment/success",
    cancel_url: "http://localhost:3000/dashboard/payment/cancel",
  });

  return redirect(session.url!);
}
