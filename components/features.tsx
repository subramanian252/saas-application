import { CloudRain } from "lucide-react";
import React from "react";

interface Props {}

const features = [
  {
    name: "Sign up for free",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
  {
    name: "Balzing fast",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
  {
    name: "Super secure with Kinde",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
    icon: CloudRain,
  },
];

function Features(props: Props) {
  const {} = props;

  return (
    <div className=" p-32 flex  flex-col items-center justify-center">
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-lg font-semibold w-fit text-primary mb-6">
          Blog faster
        </h1>
        <h1 className="text-5xl font-bold">
          Get your Blog up and running in minutes
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Right here you can create a blog in minutes. we make it easy for you
          to create a blog in minutes. The blog is very fast and easy to use
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-20 gap-y-10 px-20">
        {features.map((feature) => (
          <div className="flex gap-3   p-10 h-40" key={feature.name}>
            <feature.icon className="w-20 h-10 text-white px-2 py-2 bg-blue-600 rounded-xl" />
            <div className="flex flex-col gap-y-2">
              <h2 className="text-2xl font-semibold">{feature.name}</h2>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
