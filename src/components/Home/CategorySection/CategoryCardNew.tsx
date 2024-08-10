import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  imageUrl: string;
  title: string;
  categoryId: string;
};

const CategoryCard = (props: Props) => {
  return (
    <Link
      href={props.categoryId}
      className="w-fit h-full rounded-lg flex flex-col gap-1 group  "
    >
      <Image
        src={props.imageUrl}
        alt={props.title}
        width={350}
        height={250}
        style={{ objectFit: "fill" }}
        className="shadow-md group-hover:shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
      />
      <div className="text-bold text-2xl md:text-3xl lg:text-4xl font-heading1 text-white text-opacity-65">
        {props.title}
      </div>

      <div className="absolute z-50 left-[-90px] bg-red-800/[0.9] h-1/4"></div>
    </Link>
  );
};

export default CategoryCard;
