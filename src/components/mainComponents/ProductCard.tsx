import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
//TODO: tshirt animations vertical, pnHover: show backside image
//later on TODO: add humanmodels in conjunction with clothes on hover
import { motion } from "framer-motion";
import { ProductSideviewSheet } from "@/components/mainComponents/ProductSideviewSheet";

interface ProductCardProps {
	mainImageUrl: string;
	category: string;
	color: string;
	price: number;
	productId: string;
	otherImages: Array<string>;
}

const ProductCard = ({
	mainImageUrl,
	category,
	color,
	price,
	productId,
	otherImages,
}: ProductCardProps) => {
	// console.log("prod iamge url", otherImages[2])
	// if (card_type === "dashboard") {
	// 	return <DashboardProductCard data="" />;

	// }

	const [image, setImage] = useState(
		mainImageUrl ? mainImageUrl : "/shirt.png"
	);

	const handleHover = () => {
		setImage(otherImages[2]);
	};

	const handleMouseLeave = () => {
		setImage(mainImageUrl ? mainImageUrl : "/shirt.png");
	};

	return (
		<div className="transform overflow-hidden  border-2 border-black md duration-200  cursor-pointer rounded-[20px] backdrop-blur-md shadow-sm bg-white relative">
			<div className="md:h-[350px]  ">
				<Link href="">
					<div
						className="mt-3	 mx-2 rounded-lg flex-row flex justify-center w-[250px] h-[300px]   "
						onMouseEnter={handleHover}
						onMouseLeave={handleMouseLeave}
					>
						{mainImageUrl ? (
							<Image
								width={250}
								height={250}
								src={image}
								alt="shirt"
								className="object-contain"
							/>
						) : (
							<Image width={300} height={300} src="/shirt.png" alt="shirt" />
						)}

						<div className="flex flex-col md:flex-col absolute bottom-48 right-4 justify-center p-1"></div>
					</div>
				</Link>
			</div>

			<div className="absolute top-3 right-3 z-10">
				<ProductSideviewSheet imageUrl={mainImageUrl} />
			</div>

			<div className="p-2 -mt-5 px-3 shadow-md">
				<h3 className="text-xs  text-black/[0.4]">T-Shirt</h3>
				<h2 className="text-[0.9em] font-extrabold">
					Game Over Black Men T-Shirt
				</h2>
				<h2 className="text-xs text-black/60 ">designed by jatt</h2>
				<div className="my-2 flex flex-row justify-start">
					<div className="border-1 border-black/20 bg-red-600 rounded-full w-7 h-7 mr-2"></div>
					<div className="border-1 border-black/20 bg-blue-400 rounded-full w-7 h-7 mr-2"></div>
					<div className="border-1 border-black/20 bg-yellow-300 rounded-full w-7 h-7 mr-2"></div>
					<div className="border-1 border-black/20 bg-white rounded-full w-7 h-7 mr-2"></div>
				</div>
				<div className="flex items-center text-black/[0.5] mb-2 ">
					<p className="mr-2 text-lg font-semibold bg-[#bdcd5b] px-1 skew-x-3 ">
						&#8377; 1234
					</p>

					{true && (
						<>
							<p className="text-base  font-medium line-through">&#8377;3468</p>

							<button className="skew-x-1 text-sm ml-auto px-2  text-black/90 rounded-md py-1 border border-black/90 hover:bg-black/[0.05] transition-all duration-200 ">
								Add to cart
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

// const DashboardProductCard = ({
// 	data,
// 	product_photo,
// 	product_colors,
// 	product_price,
// 	product_stock,
// }) => {
// 	return (
// 		<Link
// 			href="/productDetails"
// 			className="transform overflow-hidden  "
// 		>
// 			<div className="h-[250px] w-[200px]">
// 				<div className="mt-2 mx-2 rounded-lg flex-row flex justify-center ">
// 					{product_photo ? (
// 						<Image
// 							width={250}
// 							height={250}
// 							src={product_photo}
// 							alt="shirt"
// 							className="object-cover"
// 						/>
// 					) : (
// 						<Image width={200} height={200} src="/shirt.png" alt="shirt" />
// 					)}
// 				</div>
// 			</div>

// 			<div className="p-2 -mt-5 px-3 shadow-md grid grid-cols-3">
// 				<div className="text-xs text-black/60 text-wrap mx-auto">
// 					<div className="text-md mx-auto text-center">sales</div>
// 					<div className="text-xl mx-auto text-center">
// 						{data.sales || "$400"}
// 					</div>
// 				</div>
// 				<div className="text-xs text-black/60 text-wrap mx-auto">
// 					<div className="text-md mx-auto text-center">revenue</div>
// 					<div className="text-xl mx-auto text-center">
// 						{data.sales || "$200"}
// 					</div>
// 				</div>
// 				<div className="text-xs text-black/60 text-wrap mx-auto">
// 					<div className="text-md mx-auto text-center">profit</div>
// 					<div className="text-xl mx-auto text-center">
// 						{data.sales || "$100"}
// 					</div>
// 				</div>
// 				<div className="my-2 flex flex-row justify-start"></div>
// 				<div className="flex items-center text-black/[0.5] "></div>
// 			</div>
// 		</Link>
// 	);
// };

export default ProductCard;
