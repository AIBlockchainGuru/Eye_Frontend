"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/mainComponents/ProductCard";

import { getAllProducts } from "@/helpers/api/productApis";

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
		<>
			<div className=" mb-[1.4em] flex gap-3  justify-center   text-4xl text-[#595957] ">
				Explore the latest Products
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-5 gap-2 my-6 md:px-5 ">
				{productData.map((product, index) => (
					<ProductCard
						key={index}
						category={product.category}
						color={product.color}
						mainImageUrl={product.mainImageUrl}
						otherImages={product.otherImages}
						price={product.price}
						productId={product.productId}
					/>
				))}
				{/* {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
					<ProductCard key={index} />
				))} */}
			</div>
		</>
	);
};

export default ExploreSection;
