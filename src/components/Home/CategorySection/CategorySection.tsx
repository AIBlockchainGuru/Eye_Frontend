import React, { useState } from "react";
import CategoryCard from "@/components/Home/CategorySection/CategoryCardNew";

interface Category {
	title: string;
	imageUrl: string;
	href: string;
}

const categoriesData: Category[] = [
	{ title: "t-shirts", imageUrl: "/tshirt.png", href: "/" },
	{ title: "shirt", imageUrl: "/shirt.png", href: "/" },
	{ title: "Z-Hoodies", imageUrl: "/hoodie.png", href: "/" },
	{ title: "hoodie", imageUrl: "/hoodie.png", href: "/" },
	{ title: "stickers", imageUrl: "/sticker.png", href: "/" },
];

const CategorySection = () => {
	return (
		<div className="bg-secondaryBackground p-3">
			<div className="flex justify-center gap-3 m-0 text-start text-[28px] md:text-[34px] mb-1  leading-tight">
				{/* <div className="bg-black w-2 h-full">.</div> */}
				<div>
					<p className="text-4xl text-white font-semibold">Categories</p>
				</div>
			</div>

			<div className=" grid lg:grid-cols-5 gap-10  ">
				{/* <Slider {...settings}> */}

				{categoriesData.map((category, index) => (
					<div key={index} className="w-fit h-full mx-auto">
						<CategoryCard
							categoryId={category.title}
							imageUrl={category.imageUrl}
							title={category.title}
						/>
					</div>
				))}
				{/* </Slider> */}
			</div>
		</div>
	);
};

export default CategorySection;
