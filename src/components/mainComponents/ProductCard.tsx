"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductSideviewSheet } from "./ProductSideviewSheet";
import Link from "next/link";
import { ProductCardProps } from "@/types/types";

interface ColorVariant {
  color: string;
  productId: string;
  mainImageUrl: string;
  otherImages: string[];
  price: number;
}

interface UpdatedProductCardProps {
  productName: string;
  baseProductName: string;
  category: string;
  colorVariants: ColorVariant[];
  designs: {
    designId: string;
    designName: string;
    designerName: string;
    position: "front" | "back";
    appliedImageUrl: string;
  }[];
}

const ProductCard = ({
  productName,
  baseProductName,
  category,
  colorVariants,
  designs,
}: UpdatedProductCardProps) => {
  const defaultColour = 0;
  const [selectedColorIndex, setSelectedColorIndex] = useState(defaultColour);
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant>(
    colorVariants[defaultColour],
  );

  const [image, setImage] = useState(selectedVariant.mainImageUrl);

  const handleColour = (index: number) => {
    setSelectedColorIndex(index);
    setSelectedVariant(colorVariants[index]);
    setImage(colorVariants[index].mainImageUrl);
  };

  const handleHover = () => {
    if (selectedVariant.otherImages[0])
      setImage(selectedVariant.otherImages[0]);
  };

  const handleMouseLeave = () => {
    setImage(selectedVariant.mainImageUrl);
  };

  if (!selectedVariant || !selectedVariant.price) {
    return <LoadingCard />;
  }

  interface SizeMap {
    [key: string]: string;
  }
  const imageSize: SizeMap = {
    small: "w-fit h-44", // e.g., mobile size
    medium: "w-72 h-80", // e.g., tablet size
    large: "w-72 h-80", // e.g., desktop size
  };
  const cardWidth: SizeMap = {
    small: "w-full ", // e.g., mobile size
    medium: "w-full ", // e.g., tablet size
    large: "w-full ", // e.g., desktop size
  };

  return (
    <div
      className={`group flex flex-col gap-1 overflow-hidden  relative mx-auto md:mx-0 ${cardWidth.small} md:${cardWidth.medium} lg:${cardWidth.large} rounded-lg bg-black text-white`}
    >
      <Link href="">
        <div onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
          <Image
            src={image}
            alt="product"
            width={247}
            height={330}
            className={`${imageSize.small} md:${imageSize.medium} lg:${imageSize.large} object-cover mx-auto`}
          />
        </div>
      </Link>

      {/* product details  */}
      <div className="flex flex-col text-left gap-[1px] px-2">
        <div className="text-lg md:text-xl font-bold">{productName}</div>
        <div className="text-md md:text-lg text-muted">
          {designs[0]?.designerName || "Unknown Artist"}
        </div>

        <div className="text-muted group-hover:text-accent transition-all duration-200 text-lg text-opacity-">
          ${selectedVariant.price}
        </div>

        <div className="flex flex-row justify-start md:py-1 py-3">
          {colorVariants.map((variant, index) => (
            <div
              key={variant.color}
              className={`rounded-full w-5 h-5 mr-2 hover:scale-105 focus:scale-95 cursor-pointer ring-1 ${
                index === selectedColorIndex ? "ring-2 ring-white" : ""
              }`}
              style={{ backgroundColor: variant.color }}
              onClick={() => handleColour(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 ">
        <ProductSideviewSheet
          category={category}
          imageUrl={image}
          title={productName}
          artistName={designs[0]?.designerName || "Unknown Artist"}
          price={selectedVariant.price.toString()}
          productId={selectedVariant.productId}
          colors={colorVariants.map((v) => v.color)}
          sizes={["M", "S"]} // You might want to add sizes to your data structure
        />
      </div>
    </div>
  );
};

export { ProductCard, LoadingCard };

const LoadingCard = () => {
  return (
    <div className=" group flex flex-col gap-3 backdrop-blur-sm overflow-hidden w-full  ">
      <Skeleton className="w-full h-[330px] bg-accent" />
      <div className="flex flex-col text-left gap-1 ">
        <Skeleton className="rounded-xl h-5 w-3/4 mr-auto bg-gray-300" />
        <Skeleton className="rounded-xl h-5  w-1/4 mr-auto bg-gray-300" />
      </div>
      <Skeleton className="rounded-xl h-5 bg-accent  w-1/4 mr-auto" />
      <div className="my-2 flex flex-row justify-start">
        <Skeleton className="mr-2 size-7 bg-accent-foreground rounded-full" />
        <Skeleton className="mr-2 size-7 bg-accent-foreground rounded-full" />
        <Skeleton className="mr-2 size-7 bg-accent-foreground rounded-full" />
      </div>
    </div>
  );
};
