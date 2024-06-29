"use client";
import React, { useEffect, useState } from "react";

import { getAllProducts } from "@/helpers/api/productApis";
import ProductCard from "@/components/mainComponents/ProductCard";

interface ProductType {
	mainImageUrl: string;
	category: string;
	color: string;
	price: number;
	productId: string;
	otherImages: string[];
}

const ExploreSection = () => {
	const [productData, setProductData] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const allProducts = async () => {
			try {
				const data = await getAllProducts();
				setProductData(data.products);
				console.log(data.products);
			} catch (error) {
				console.error("Error fetching super images:", error);
			}
		};

		allProducts();
	}, []);

	return (
		<div className=" md:px-5">
			<div className=" text-left font-heading1  text-4xl text-black">
				latest Launch
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-5 gap-2 my-6  ">
				{productData.length != 0
					? productData.map((product, index) => (
							<ProductCard
								key={index}
								category={product.category}
								color={product.color}
								mainImageUrl={product.mainImageUrl}
								otherImages={product.otherImages}
								price={product.price}
								productId={product.productId}
							/>
					  ))
					: [1, 2, 3, 4, 5].map((product, index) => (
							<ProductCard key={index} price={300} />
					  ))}
			</div>
		</div>
	);
};

export default ExploreSection;
