import PaymentCard from "@/components/paymentCard";
import SubmitButton from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

async function Page(props: Props) {
  noStore();

  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const data = await getData(user.id);

  async function createCustomerPortal() {
    "use server";

    const session = await stripe.billingPortal.sessions.create({
      customer: data?.User?.customerId as string,
      return_url:
        process.env.NODE_ENV === "production"
          ? "https://saas-application-one.vercel.app/dashboard/pricing"
          : `http://localhost:3000/dashboard/pricing`,
    });

    return redirect(session.url);
  }

  if (data && data.status === "active") {
    return (
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Click on the button below. This will allow you to change the
              payment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createCustomerPortal}>
              <SubmitButton text="Edit Subscription" />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-y-2">
        <h2 className="text-lg text-primary font-bold mb-4">Pricing</h2>
        <h1 className="text-4xl font-semibold text-center">
          Pricing Plans for everone and every budget
        </h1>
        <p className="text-sm text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
          reiciendis repellat nisi, repellendus est deleniti quis porro nesciunt
          autem, at quia odio fuga ullam ut facilis cum quae voluptatibus
          laudantium.
        </p>
      </div>
      <PaymentCard />
    </div>
  );
}

export default Page;
