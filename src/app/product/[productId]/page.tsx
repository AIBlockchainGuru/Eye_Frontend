"use client";
import { ProductDetails } from "@/components/ProductPage/ProductDetails";
import { getProduct } from "@/helpers/api/productApis";
import { useProduct } from "@/hooks/useProduct";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const staticProduct = {
	product_id: "12341241234",
	name: "buhahahah",
	designer_name: "deauth",
	designer_id: "61239803412984",
	colours: ["blue", "gray", "red"],
	sizes: ["xl", "x", "m", "l"],
	price: 399,
	imageUrls: [
		"https://images.unsplash.com/photo-1587274342427-c0b2e7f7d1a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
	],
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quas.",
};

export default function Page({ params }: { params: { productId: string } }) {
	const { product, loading } = useProduct(params.productId);

	return (
		<div className="lg:grid lg:grid-cols-12 lg:gap-5 mt-24">
			<div className="col-span-9  grid grid-cols-6 gap-5 p-2">
				{[1, 2, 3, 4, 5].map((i, index) => (
					<div
						className={cn(
							index === 0 || index === 1
								? "col-span-3 h-96"
								: "col-span-2 h-96",
							"bg-gray-700 rounded-lg shadow-md p-5"
						)}
						key={i}
					></div>
				))}
			</div>
			{/* Additional divs or components can be added here */}
			<div className="col-span-3">
				{" "}
				<ProductDetails
					product_id={staticProduct.product_id}
					colours={staticProduct.colours}
					description={staticProduct.description}
					designer_id={staticProduct.designer_id}
					designer_name={staticProduct.designer_name}
					sizes={staticProduct.sizes}
					imageUrls={staticProduct.imageUrls}
					name={staticProduct.name}
					price={staticProduct.price}
				/>
			</div>
		</div>
	);
}
