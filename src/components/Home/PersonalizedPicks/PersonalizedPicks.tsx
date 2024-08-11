"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/helpers/api/productApis";
import {
  ProductCard,
  LoadingCard,
} from "@/components/mainComponents/ProductCard";

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

const PersonalizedPicks = () => {
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
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
    <div className="md:px-5">
      <div className="text-center font-heading1 text-4xl text-black">
        Picks For You
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 gap-2 my-6 mx-3">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, index) => <LoadingCard key={index} />)
          : productData.map((product, index) => (
              <ProductCard
                key={`${product.productName}-${index}`}
                productName={product.productName}
                baseProductName={product.baseProductName}
                category={product.category}
                colorVariants={product.colors}
                designs={product.designs}
              />
            ))}
      </div>
    </div>
  );
};

export default PersonalizedPicks;
