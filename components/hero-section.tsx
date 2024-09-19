import React from "react";

interface Props {}

import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import HeroImage from "../public/hero.png";

async function HeroSection(props: Props) {
  const {} = props;

  return (
    <section className="flex flex-col gap-y-5 items-center mt-20 text-center  px-40">
      <h1 className="text-sm text-center font-bold bg-blue-300 p-2 rounded-xl text-blue-600">
        Ultimate Blogging Saas for Startups
      </h1>
      <div className="flex flex-col mt-4 gap-y-6">
        <h1 className="text-9xl font-medium">
          Setup your Blog <span className="text-primary">in Minutes</span>
        </h1>
        <p className="text-gray-500">
          Settting up your blog is hard and time consuming. we make it easy for
          you to create a blog in minutes
        </p>
      </div>
      <div className="flex gap-x-4 mt-8">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="tracking-wide"
          asChild
        >
          <LoginLink>Try for free</LoginLink>
        </Button>
        <Button
          size={"lg"}
          variant={"default"}
          className="tracking-wide order-3"
          asChild
        >
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
      <div className="relative h-[800px] mt-10 w-full py-12 ">
        <svg
          className="absolute -mt-30 blur-3xl -z-40"
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#03FFE0"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#7C87F8"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#4C65E4"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#043AFF"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <Image
          src={HeroImage}
          alt="hero image"
          fill
          priority
          className="border-rounded-2xl shadow-2xl z-20 mx-auto object-cover"
        />
      </div>
    </section>
  );
}

export default HeroSection;
