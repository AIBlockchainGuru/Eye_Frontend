import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  iconUrl: string;
};

const About = () => {
  const props: Props = {
    title:
      "Empower Your Style, Personalize Your World with Deauth: Where Designers Thrive and Your Imagination Comes Alive!",
    description:
      "Empower Your Style, Personalize Your World with Deauth: Where Designers Thrive and Your Imagination Comes Alive!",
    buttonText: "upload your design here",
    iconUrl: "/deauthCircleIcon.png",
  };

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8 mx-3 justify-center items-center flex flex-col gap-10">
      <div className="flex flex-col gap-5 col-span-3 my-auto text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl  font-bold ">
          {props.title}
        </h1>
        <p className="text-xl font-light"> {props.description}</p>
        <Button className="px-3 text-md text-white text-center flex gap-3 justify-between py-1 mx-auto md:mx-0 md:mr-auto rounded-full">
          {props.buttonText}
          <ArrowRightIcon />
        </Button>
      </div>

      <div className="mx-auto md:mx-0 ">
        <Image
          className="sm:mt-5 md:mt-6 mt-0"
          src={props.iconUrl}
          alt="deauth"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default About;
