import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
	mainImageUrl?: string;
	category?: string;
	color?: string;
	price?: number;
	productId?: string;
	otherImages?: Array<string>;
}

const ProductCard = ({
	mainImageUrl,
	category,
	color,
	price,
	productId,
	otherImages,
}: ProductCardProps) => {
	if (!mainImageUrl || !price) {
		return (
			<div className=" group flex flex-col gap-3 backdrop-blur-sm overflow-hidden w-full  ">
				<Skeleton className="w-full h-[330px] bg-accent" />

				<div className="flex flex-col text-left gap-1">
					<Skeleton className="rounded-xl h-5 w-3/4 mr-auto" />
					<Skeleton className="rounded-xl h-5  w-1/4 mr-auto" />
				</div>
				<Skeleton className="rounded-xl h-5 bg-accent  w-1/4 mr-auto" />

				<div className="my-2 flex flex-row justify-start">
					<Skeleton className="mr-2 size-7 bg-accent-foreground rounded-full" />
					<Skeleton className="mr-2 size-7 bg-accent-foreground rounded-full" />
					<Skeleton className="mr-2 size-7 bg-accent-foreground rounded-full" />
				</div>
			</div>
		);
	}
	return (
		<div className="   group flex flex-col gap-3 overflow-hidden  ">
			{mainImageUrl ? (
				<div>
					<Image src={mainImageUrl} alt="product" width={247} height={330} />
				</div>
			) : (
				<Skeleton className="w-[247px] h-[330px] bg-accent" />
			)}
			<div className="flex flex-col text-left gap-1">
				<div className="text-2xl">product Name</div>
				<div className="text-lg text-muted-foreground">artist name</div>
			</div>
			<div className="text-accent group-hover:text-muted text-2xl">{price}</div>
			<div className="my-2 flex flex-row justify-start">
				<div className="border-1 border-black/20 bg-red-600 rounded-full w-7 h-7 mr-2"></div>
				<div className="border-1 border-black/20 bg-blue-400 rounded-full w-7 h-7 mr-2"></div>
				<div className="border-1 border-black/20 bg-yellow-300 rounded-full w-7 h-7 mr-2"></div>
				<div className="border-1 border-black/20 bg-white rounded-full w-7 h-7 mr-2"></div>
			</div>
		</div>
	);
};
export default ProductCard;
