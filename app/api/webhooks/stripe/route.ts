import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/prisma";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Error", { status: 500 });
  }

  if (!event) {
    return new Response("Event is undefined", { status: 500 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const customerId = session.customer as string;

    const user = await prisma.user.findUnique({
      where: {
        customerId: customerId,
      },
    });

    if (!user) throw new Error("User not found");

    await prisma.subscription.create({
      data: {
        stripeId: subscription.id,
        userId: user.id,
        currentPeriodEnd: subscription.current_period_end,
        currentPeriodStart: subscription.current_period_start,
        status: subscription.status,
        planId: subscription.items.data[0].plan.id,
        inteval: String(subscription.items.data[0].plan.interval),
      },
    });
  } else if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const customerId = session.customer as string;

    await prisma.subscription.update({
      where: {
        stripeId: subscription.id,
      },
      data: {
        planId: subscription.items.data[0].plan.id,
        currentPeriodEnd: subscription.current_period_end,
        currentPeriodStart: subscription.current_period_start,
        status: subscription.status,
      },
    });
  }

  return new Response("Success", { status: 200 });
}
