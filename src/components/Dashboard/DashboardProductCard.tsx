"use client";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface dashboardCardProps {
	mainImageUrl?: string;
	productId?: string;
}

const DashboardProductCard = ({
	mainImageUrl,
	productId,
}: dashboardCardProps) => {
	const [image, setImage] = useState(
		mainImageUrl ? mainImageUrl : "/shirt.png"
	);

	if (!mainImageUrl) {
		return <LoadingCard />;
	}
	return (
		<div className="group flex flex-col gap-1 overflow-hidden  ">
			<Link href="">
				<Image src={image} alt="product" width={247} height={330} />
			</Link>

			<div className="flex flex-col text-left gap-1">
				<div className="text-2xl font-bold">product Name</div>
			</div>
			<div className="text-muted-foreground group-hover:text-accent transition-all duration-200 text-sm flex gap-5">
				<h2>revenue: 300$</h2>
				<h2>orders: 32</h2>
			</div>
		</div>
	);
};
const LoadingCard = () => {
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
};

export default DashboardProductCard;
