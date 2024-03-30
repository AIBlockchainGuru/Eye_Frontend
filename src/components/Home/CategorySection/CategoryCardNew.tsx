import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	imageUrl: string;
	title: string;
	categoryId: string;
};

const CategoryCard = (props: Props) => {
	console.log("HELLO THESE ARE MY PROPS", props);
	return (
		<Link href={props.categoryId} className="w-fit h-full rounded-lg group  ">
			<Image
				src={props.imageUrl}
				alt={props.title}
				width={350}
				height={250}
				style={{ objectFit: "fill" }}
			/>

			<div className="absolute z-50 left-[-90px] bg-red-800/[0.9] h-1/4"></div>
		</Link>
	);
};

export default CategoryCard;
