"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { toast } from "../ui/use-toast";
import { addToCart } from "@/app/store/features/cart/cartSlice";

export interface ProductDetailsType {
	product_id: string;
	name: string;
	designer_name: string;
	designer_id: string;
	colours: string[];
	sizes: string[];
	price: number;
	imageUrls: string[];
	description: string;
}

export const ProductDetails = ({
	product_id,
	name,
	designer_name,
	designer_id,
	colours,
	sizes,
	price,
	description,
}: ProductDetailsType) => {
	const [selectedColour, setColour] = useState<string | null>(null);
	const [selectedSize, setSize] = useState<string | null>(null);
	const [showError, setShowError] = useState(false);
	const dispatch = useDispatch();
	const addToCartHandler = () => {
		if (!selectedSize) {
			setShowError(true);
		} else {
			dispatch(
				addToCart({
					id: product_id,
					attributes: {
						size: selectedSize,
						color: selectedColour as string,
						price: price,
					},
					oneQuantityPrice: price,
					quantity: 1,
				})
			);
			notify();
		}
	};

	const notify = () => {
		toast({
			title: "Added to cart",
			description: `Product added successfully`,
		});
	};

	return (
		<div className=" w-full flex flex-col gap-10">
			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold ">{name}</h1>
				<Link href={`designer/${designer_id}`}>
					Designed And Sold ~ By {designer_name}
				</Link>
			</div>
			<hr />
			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold ">${price}</h1>
				<div>Incl of all taxes</div>
			</div>
			<div className="flex gap-5 ">
				{colours.map((colour, index) => {
					console.log(colour);
					return (
						<div
							onClick={() => setColour(colour)}
							key={index}
							className={cn(
								`size-10 rounded-full bg-${colour}-600 hover:cursor-pointer ${
									selectedColour === colour ? "border-accent border-[1px]" : ""
								}`
							)}
						></div>
					);
				})}
			</div>

			<div className="">
				<div className="font-bold text-md text-center mx-auto">sizes</div>
				<div className="grid grid-cols-4 gap-1">
					{sizes.map((size, index) => {
						return (
							<div
								onClick={() => {
									setSize(size);
									setShowError(false);
								}}
								key={index}
								className={cn(
									`rounded-md  hover:cursor-pointer w-full text-center px-3 font-semibold py-2 text-white transition-all duration-150 ${
										selectedSize === size ? "bg-accent" : "bg-black"
									}`
								)}
							>
								<div className=" ">{size}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Button
					onClick={addToCartHandler}
					className="bg-black w-full rounded-full text-center font-bold text-xl text-white"
				>
					Buy Now
				</Button>
				<Button
					onClick={addToCartHandler}
					className="bg-black w-full rounded-full text-center font-bold text-xl text-white"
				>
					Add To Cart
				</Button>
			</div>
			<div>
				<h1 className="text-2xl font-bold ">Description and fit</h1>
				<p>{description}</p>
			</div>
		</div>
	);
};
