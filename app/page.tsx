import { ModeToggle } from "@/components/dark-mode-toggle";
import Logo from "@/components/logo";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import HeroSection from "@/components/hero-section";
import TrustedCompanies from "@/components/trusted-companies";
import Features from "@/components/features";
import PaymentCard from "@/components/paymentCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="p-10 ">
      <div className="flex justify-between">
        <Logo />
        <div className="flex gap-x-3 items-center">
          <ModeToggle />
          <Button variant={"default"} className="tracking-wide order-3" asChild>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
          <Button variant={"secondary"} className="tracking-wide" asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
        </div>
      </div>
      <HeroSection />
      <TrustedCompanies />
      <Features />
      <div className="flex flex-col items-center gap-y-2 pt-28 pb-36">
        <h2 className="text-lg text-primary font-bold mb-6">Pricing</h2>
        <h1 className="text-4xl font-semibold text-center">
          Pricing Plans for everone and every budget
        </h1>
        <div className="w-4/5 mx-auto ">
          <PaymentCard />
        </div>
      </div>
    </div>
  );
}
