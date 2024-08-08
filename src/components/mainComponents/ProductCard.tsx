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
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedVariant = colorVariants[selectedColorIndex];

  const [image, setImage] = useState(selectedVariant.mainImageUrl);

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

  return (
    <div className="group flex flex-col gap-1 overflow-hidden relative">
      <Link href="">
        <div onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
          <Image src={image} alt="product" width={247} height={330} />
        </div>
      </Link>
      <div className="flex flex-col text-left gap-1">
        <div className="text-2xl font-bold">{productName}</div>
        <div className="text-lg text-muted-foreground">
          {designs[0]?.designerName || "Unknown Artist"}
        </div>
      </div>
      <div className="text-accent group-hover:text-muted-foreground transition-all duration-200 text-2xl">
        ${selectedVariant.price}
      </div>
      <div className="flex flex-row justify-start">
        {colorVariants.map((variant, index) => (
          <div
            key={variant.color}
            className={`rounded-full w-7 h-7 mr-2 hover:scale-105 focus:scale-95 cursor-pointer ${
              index === selectedColorIndex ? "ring-2 ring-black" : ""
            }`}
            style={{ backgroundColor: variant.color }}
            onClick={() => setSelectedColorIndex(index)}
          ></div>
        ))}
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
