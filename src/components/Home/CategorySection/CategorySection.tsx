import React, { useState } from "react";
import CategoryCard from "../../mainComponents/CategoryCard";

const categoriesData = [
	{ item: "t-shirts", color: "red" },
	{ item: "shirt", color: "blue" },
	{ item: "Z-Hoodies", color: "red" },

	{ item: "hoodie", color: "purple" },
	{ item: "Z-Shirts", color: "blue" },
	{ item: "Bottles", color: "" },
	{ item: "Stickers", color: "" },
	{ item: "Tote Bags", color: "" },
	{ item: "Phone Covers", color: "" },
];

const CategorySection = () => {
	return (
		<>
			<div className="flex justify-center gap-3 m-0 text-start text-[28px] md:text-[34px] mb-1  leading-tight">
				{/* <div className="bg-black w-2 h-full">.</div> */}
				<div>
					<p className="text-4xl text-[#595957]">
						Unleash The Unique Style Categories
					</p>
				</div>
			</div>

			<div className=" flex  flex-wrap gap-[40px] mt-[60px] justify-center bg-white/80 py-[70px] shadow-sm border  rounded-lg  ">
				{/* <Slider {...settings}> */}

				{categoriesData.map((category, index) => (
					<div
						key={index}
						className="mt-[30px]"
						// onClick={handleCategoryPage}
					>
						<CategoryCard
							key={index}
							name={category.item}
							color={category.color}
							category={category.item}
						/>
					</div>
				))}
				{/* </Slider> */}
			</div>
		</>
	);
};

export default CategorySection;
