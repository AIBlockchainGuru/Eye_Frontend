"use client";
import { ProductDetailsType } from "@/components/ProductPage/ProductDetails";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductCard,
  LoadingCard,
} from "@/components/mainComponents/ProductCard";
import { getLatestProducts } from "@/helpers/api/productApis";
import React, { useEffect, useState } from "react";

interface ColorVariant {
  color: string;
  productId: string;
  mainImageUrl: string;
  otherImages: string[];
  price: number;
}

interface ProductType {
  productName: string;
  baseProductName: string;
  category: string;
  sales: number;
  designs: {
    designId: string;
    designName: string;
    designerName: string;
    position: "front" | "back";
    appliedImageUrl: string;
  }[];
  colors: ColorVariant[];
}

const BestSellingSection = () => {
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getLatestProducts();
        setProductData(data.products);
        setLoading(false);
        console.log(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="h-fit">
      <div>
        <p className="lg:text-5xl md:text-4xl text-3xl font-heading1 text-black text-left mx-auto w-fit md:mx-0 ">
          BestSellers
        </p>
      </div>

      <div className="flex justify-center gap-2  py-3 pb-[4em] rounded-lg  shadow-sm  w-full">
        <Carousel className="w-full">
          <CarouselContent className="justify-center items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-5 gap-2 mx-3">
            {loading
              ? // Show loading placeholders
                Array(5)
                  .fill(0)
                  .map((_, index) => <LoadingCard key={index} />)
              : // Show actual product data
                productData.map((product, index) => (
                  <ProductCard
                    key={`${product.productName}-${index}`}
                    category={product.category}
                    colorVariants={product.colors}
                    productName={product.productName}
                    baseProductName={product.baseProductName}
                    designs={product.designs}
                  />
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default BestSellingSection;
