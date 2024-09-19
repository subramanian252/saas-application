import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createPaymentSession } from "@/actions";

interface Props {}

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: [
      "1 Site",
      "Up to 1000 Visitors",
      "Up to 1000 Visitors",
      "Up to 1000 Visitors",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals.",
    priceTitle: "$29",
    benefits: [
      "Unlimited Sites",
      "Unimlited Visitors",
      "Unimlited Visitors",
      "Unimlited Visitors",
    ],
  },
];

function PaymentCard(props: Props) {
  const {} = props;

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-10 gap-6">
        {PricingPlans.map((plan, i) => (
          <Card
            className={cn(
              plan.priceTitle === "$29" ? "border-primary shadow-xl" : ""
            )}
            key={i}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <>
                  <p
                    className={cn(
                      "text-2xl font-bold",
                      plan.priceTitle === "$29" ? "text-primary" : ""
                    )}
                  >
                    {plan.cardTitle}
                  </p>
                  {plan.priceTitle === "$29" && (
                    <p className="text-sm text-white p-2 bg-primary rounded-2xl">
                      Best Value
                    </p>
                  )}
                </>
              </CardTitle>
              <CardDescription>{plan.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold my-5">{plan.priceTitle}</p>
              <ul className="flex flex-col gap-y-5">
                {plan.benefits.map((benefit, i) => (
                  <li
                    className="text-gray-500 flex items-center gap-x-2"
                    key={i}
                  >
                    <DotIcon className="h-4 w-4 text-primary font-bold" />
                    <p>{benefit}</p>
                  </li>
                ))}
              </ul>
              <form action={createPaymentSession}>
                <Button
                  type="submit"
                  className="mt-10 w-full"
                  variant={plan.priceTitle === "$29" ? "default" : "secondary"}
                >
                  {plan.priceTitle === "$29" ? "Get Started" : "Try for free"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PaymentCard;
